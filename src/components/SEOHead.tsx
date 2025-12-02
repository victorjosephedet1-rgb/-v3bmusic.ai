import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEOHead({
  title = 'V3BMusic.AI | World\'s First Pack-Based Audio Licensing for Creators',
  description = 'Performance audio for TikTok, Reels, Ads & UGC. Stop deleting videos. Start using legal audio—founded by Victor Joseph Edet, CEO of Victor360 Brand Limited.',
  keywords = 'V3BMusic.AI, audio licensing, TikTok sound effects, Reels audio, viral hooks, creator marketplace, pack-based licensing, copyright-safe audio, Victor360 Brand, audio utility, creator assets',
  image = '/og-image.jpg',
  url = 'https://v3bmusic.ai',
  type = 'website'
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Victor Joseph Edet, CEO - Victor360 Brand Limited" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="V3BMusic.AI" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@V3BMusicAI" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#22C55E" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "V3BMusic.AI",
          "description": description,
          "url": url,
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0.10",
            "priceCurrency": "USD",
            "description": "Pack-based audio licensing for TikTok, Reels, ads, and UGC content creation"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "10000"
          },
          "creator": {
            "@type": "Organization",
            "name": "Victor360 Brand Limited",
            "description": "Global Audio Utility Marketplace for Short-Form Creator Content"
          }
        })}
      </script>
    </Helmet>
  );
}