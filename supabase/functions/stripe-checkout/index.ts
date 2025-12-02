import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.55.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { productType, productId, packId, trackId, licenseType, price } = await req.json();

    if (!productType || !price) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let productName = "";
    let productDescription = "";
    const metadata= {
      userId: user.id,
      productType,
    };

    if (productType === "pack" && packId) {
      const { data: pack, error: packError } = await supabaseClient
        .from("audio_packs")
        .select("pack_name, pack_description, asset_count, creator_id")
        .eq("id", packId)
        .maybeSingle();

      if (packError || !pack) {
        return new Response(
          JSON.stringify({ error: "Pack not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      productName = pack.pack_name;
      productDescription = `${pack.pack_description} - ${pack.asset_count} assets included`;
      metadata.packId = packId;
      metadata.creatorId = pack.creator_id;
    } else if (productType === "track" && trackId) {
      const { data: track, error: trackError } = await supabaseClient
        .from("audio_snippets")
        .select("title, artist_id, artist")
        .eq("id", trackId)
        .maybeSingle();

      if (trackError || !track) {
        return new Response(
          JSON.stringify({ error: "Track not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      productName = `${licenseType || "Content Creator"} License - ${track.title}`;
      productDescription = `License for track: ${track.title} by ${track.artist}`;
      metadata.trackId = trackId;
      metadata.artistId = track.artist_id;
      metadata.licenseType = licenseType;
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid product configuration" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/license-download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/marketplace`,
      metadata,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});