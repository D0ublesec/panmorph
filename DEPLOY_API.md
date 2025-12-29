# Deploy API to Vercel - Fix CORS Error

## The Problem

Your API at `panmorph-5swmmfcyh-liamdouble-9857s-projects.vercel.app` is not responding with CORS headers. The OPTIONS preflight request is failing, which means:

1. **The API function isn't deployed** to that Vercel project, OR
2. **The URL is a preview deployment** that requires authentication, OR  
3. **The function isn't accessible** at that path

## Solution: Deploy API to Vercel

### Step 1: Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy the API

From your project root directory:

```bash
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → If you have an existing project, select it. Otherwise, create a new one.
- **What's your project's name?** → `panmorph-api` (or any name you prefer)
- **In which directory is your code located?** → `./` (current directory)

### Step 4: Get Your Production URL

After deployment, Vercel will give you a URL like:
- `https://panmorph-api.vercel.app` (production)
- `https://panmorph-api-xyz.vercel.app` (preview)

**Use the production URL** (the one without the random hash).

Your API endpoint will be: `https://panmorph-api.vercel.app/api/transcribe`

### Step 5: Update GitHub Secret

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Find or create `VITE_API_URL`
4. Set it to: `https://panmorph-api.vercel.app/api/transcribe` (use your actual URL)
5. Save

### Step 6: Test the API

After deployment, test in your browser console:

```javascript
// Test OPTIONS (preflight)
fetch('https://panmorph-api.vercel.app/api/transcribe', {
  method: 'OPTIONS'
}).then(r => {
  console.log('Status:', r.status);
  console.log('CORS Headers:', {
    'Access-Control-Allow-Origin': r.headers.get('Access-Control-Allow-Origin'),
    'Access-Control-Allow-Methods': r.headers.get('Access-Control-Allow-Methods')
  });
});

// Test GET
fetch('https://panmorph-api.vercel.app/api/transcribe')
  .then(r => r.json())
  .then(console.log);
```

If both return 200 with CORS headers, you're good!

### Step 7: Redeploy Frontend

After updating the GitHub secret, push a commit to trigger a new deployment:

```bash
git add .
git commit -m "Update API URL"
git push
```

## Alternative: Deploy API as Part of Main Project

If you want the API in the same Vercel project as your frontend:

1. Make sure `api/transcribe.js` is in your project root
2. Deploy the entire project: `vercel`
3. Your API will be at: `https://your-project.vercel.app/api/transcribe`
4. Update `VITE_API_URL` to this URL

## Troubleshooting

### Still getting CORS errors?

1. **Check Vercel dashboard:**
   - Go to https://vercel.com/dashboard
   - Find your project
   - Go to Functions tab
   - Verify `api/transcribe.js` is listed

2. **Check deployment logs:**
   - In Vercel dashboard → Deployments
   - Click on latest deployment
   - Check Function Logs for errors

3. **Verify the URL:**
   - Make sure you're using the **production URL** (not preview)
   - Production URLs look like: `https://project-name.vercel.app`
   - Preview URLs have random hashes: `https://project-name-xyz123.vercel.app`

4. **Test directly:**
   ```bash
   curl -X OPTIONS https://your-api-url.vercel.app/api/transcribe \
     -H "Origin: https://handpan.liamdouble.com" \
     -v
   ```
   Should return 200 with CORS headers.

### API returns 401 Unauthorized?

This means the function isn't being invoked. Check:
- Is the function deployed?
- Is the path correct? (`/api/transcribe`)
- Is it a preview deployment that requires auth?

## Quick Deploy Command

For future deployments, just run:

```bash
vercel --prod
```

This deploys directly to production.

