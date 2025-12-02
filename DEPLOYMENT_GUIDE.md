# V3B Music - Deployment Guide

## Get Your App Live at V3BMusic.Ai

Follow these steps to deploy your V3B Music platform to production with your custom domain.

---

## Step 1: Purchase Your Domain

1. Go to a domain registrar:
   - **Namecheap** (recommended): https://www.namecheap.com
   - **Cloudflare**: https://www.cloudflare.com/products/registrar/
   - **GoDaddy**: https://www.godaddy.com

2. Search for **V3BMusic.Ai** and purchase it (usually $10-15/year)

3. Keep your registrar login info handy - you'll need it for Step 3

---

## Step 2: Deploy to Vercel (Free)

### 2a. Sign Up for Vercel
1. Go to https://vercel.com
2. Sign up using your GitHub, GitLab, or Bitbucket account (recommended) or email
3. Free tier includes everything you need

### 2b. Push Your Code to GitHub
1. Go to https://github.com and create a new repository called "v3b-music"
2. In your local terminal, run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial V3B Music deployment"
   git remote add origin https://github.com/YOUR_USERNAME/v3b-music.git
   git push -u origin main
   ```

### 2c. Import to Vercel
1. In Vercel dashboard, click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Select your **v3b-music** repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add your environment variables (click "Environment Variables"):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   (Copy these from your .env file)

6. Click **"Deploy"**

7. Wait 2-3 minutes for deployment to complete

8. You'll get a temporary URL like: `v3b-music.vercel.app`

---

## Step 3: Connect Your Custom Domain

### 3a. Add Domain in Vercel
1. In your Vercel project, go to **Settings** → **Domains**
2. Enter **V3BMusic.Ai** and click **"Add"**
3. Vercel will show you DNS records to configure

### 3b. Configure DNS at Your Registrar

**Option A: Use Vercel Nameservers (Easiest)**
1. Vercel will provide nameservers like:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
2. Go to your domain registrar's dashboard
3. Find **"Nameservers"** or **"DNS Settings"**
4. Replace existing nameservers with Vercel's nameservers
5. Save changes

**Option B: Add CNAME Record (If you want to keep current nameservers)**
1. In your registrar's DNS settings, add:
   - **Type**: CNAME
   - **Name**: @ (or leave blank for root domain)
   - **Value**: cname.vercel-dns.com
   - **TTL**: Automatic or 3600

2. For www subdomain, add another CNAME:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com
   - **TTL**: Automatic or 3600

### 3c. Wait for DNS Propagation
- DNS changes can take 5 minutes to 48 hours
- Usually works within 10-30 minutes
- Check status at: https://www.whatsmydns.net

### 3d. Enable HTTPS
1. Once DNS is configured, Vercel automatically provisions SSL certificate
2. Your site will be live at **https://V3BMusic.Ai** within minutes
3. Vercel automatically redirects HTTP to HTTPS

---

## Step 4: Verify Everything Works

1. Visit **https://V3BMusic.Ai**
2. Test these features:
   - ✅ Landing page loads
   - ✅ Registration works
   - ✅ Login works
   - ✅ Audio playback works
   - ✅ Upload functionality works
   - ✅ Payments work (if configured)

---

## Alternative: Deploy to Netlify

If you prefer Netlify instead of Vercel:

1. Go to https://netlify.com and sign up
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in **Site settings** → **Environment variables**
6. Deploy site
7. Add custom domain in **Domain settings**
8. Follow similar DNS configuration steps as above

---

## Troubleshooting

### "Site not found" or 404 errors
- Wait longer for DNS propagation (up to 48 hours)
- Double-check DNS records match exactly what Vercel provided
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)

### Environment variables not working
- Make sure you added them in Vercel dashboard
- Redeploy after adding environment variables
- Check variable names start with `VITE_`

### Audio/uploads not working
- Verify Supabase environment variables are correct
- Check Supabase CORS settings allow your new domain
- Check browser console for specific errors

### Need help?
- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com
- V3B Support: support@V3BMusic.AI

---

## Production Checklist

Before going live, ensure:
- [ ] Domain purchased and DNS configured
- [ ] SSL certificate active (Vercel does this automatically)
- [ ] Environment variables added to hosting platform
- [ ] Supabase database migrated and RLS policies active
- [ ] Test all user flows: register, login, upload, download, payment
- [ ] Analytics configured (if desired)
- [ ] Error monitoring set up (optional: Sentry, LogRocket)
- [ ] Backup strategy for database in place

---

**Congratulations!** Your V3B Music platform will be live at V3BMusic.Ai 🎵
