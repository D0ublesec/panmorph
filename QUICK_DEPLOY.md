# 🚀 Quick Deploy Guide

Get your app live in 5 minutes!

## Step 1: Deploy API (2 minutes)

```bash
npm install -g vercel
vercel login
vercel
```

**Copy the URL** you get (looks like `https://something.vercel.app`)

## Step 2: Configure GitHub (1 minute)

1. Go to: `https://github.com/your-username/panmorph/settings/secrets/actions`
2. Click **"New repository secret"**
3. Name: `VITE_API_URL`
4. Value: `https://your-vercel-url.vercel.app/api/transcribe` (paste your URL)
5. Click **"Add secret"**

## Step 3: Deploy (2 minutes)

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

Wait 2-3 minutes, then visit: `https://your-username.github.io/panmorph`

**Done!** 🎉

---

## Troubleshooting

**API not working?**
- Check Vercel dashboard: https://vercel.com/dashboard
- Make sure the secret is set correctly in GitHub

**Pages not updating?**
- Check Actions tab in GitHub
- Make sure workflow completed successfully

**Need help?** See `DEPLOYMENT.md` for detailed instructions.

