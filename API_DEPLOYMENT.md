# API Deployment Guide - Fix CORS Issue

## The Problem

The API at `panmorph-5swmmfcyh-liamdouble-9857s-projects.vercel.app` is not responding to OPTIONS requests, which means:
1. The API function might not be deployed
2. The API might be in a different Vercel project
3. The function might not be accessible

## Solution: Deploy API to Vercel

### Option 1: Deploy API as Separate Project (Recommended)

1. **Create a new Vercel project for the API:**
   ```bash
   cd api
   vercel
   ```
   - Follow prompts to create new project
   - Name it something like `panmorph-api`
   - This will deploy ONLY the API functions

2. **Or deploy from root with API folder:**
   ```bash
   # From project root
   vercel
   ```
   - Make sure `api/transcribe.js` is included
   - Vercel should auto-detect it

3. **Get the production URL:**
   - After deployment, Vercel will give you a URL like `https://panmorph-api.vercel.app`
   - Your API will be at: `https://panmorph-api.vercel.app/api/transcribe`

4. **Update GitHub secret:**
   - Go to GitHub → Settings → Secrets → Actions
   - Update `VITE_API_URL` to: `https://panmorph-api.vercel.app/api/transcribe`

### Option 2: Use Same Vercel Project

If you want frontend and API in the same Vercel project:

1. **Deploy entire project to Vercel:**
   ```bash
   vercel
   ```

2. **Configure in Vercel dashboard:**
   - Settings → Functions
   - Make sure `api/transcribe.js` is listed
   - Check that it's being deployed

3. **Get the URL:**
   - Your API will be at: `https://your-project.vercel.app/api/transcribe`

## Test the API

After deployment, test with:

```javascript
// Test OPTIONS
fetch('https://your-api-url.vercel.app/api/transcribe', {
  method: 'OPTIONS'
}).then(r => console.log('OPTIONS:', r.status, [...r.headers.entries()]));

// Test POST
fetch('https://your-api-url.vercel.app/api/transcribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' })
}).then(r => r.json()).then(console.log);
```

## Current Status

- ✅ API code is correct (`api/transcribe.js`)
- ✅ CORS headers are properly set
- ❌ API needs to be deployed/redeployed to Vercel
- ❌ GitHub secret `VITE_API_URL` needs to point to correct URL

## Next Steps

1. Deploy API to Vercel (see above)
2. Update `VITE_API_URL` in GitHub secrets
3. Redeploy frontend (or wait for auto-deploy)
4. Test transcription

