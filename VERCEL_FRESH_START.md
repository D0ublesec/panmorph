# Fresh Vercel Deployment - Step by Step

## Step 1: Delete Old Project (Optional)

If you want to completely start fresh:

1. Go to https://vercel.com/dashboard
2. Find your old `panmorph` project
3. Click on it → Settings → Delete Project
4. Confirm deletion

## Step 2: Create New Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. **Import Git Repository:**
   - Select your GitHub repository (`panmorph` or whatever it's named)
   - Click **"Import"**

## Step 3: Configure Project

Vercel should auto-detect Vite, but verify:

1. **Project Name:** `panmorph` (or any name you prefer)
2. **Framework Preset:** Should auto-detect as **"Vite"**
3. **Root Directory:** `./` (leave as default)
4. **Build Command:** `npm run build` (should be auto-filled)
5. **Output Directory:** `dist` (should be auto-filled)
6. **Install Command:** `npm install` (should be auto-filled)

## Step 4: Environment Variables (Optional)

If you need `VITE_API_URL`:
- Click **"Environment Variables"**
- Add: `VITE_API_URL` = `https://your-api-url.vercel.app/api/transcribe`
- (You can add this later after the API is deployed)

## Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your app will be live at: `https://panmorph-xxx.vercel.app`

## Step 6: Get Your Production URL

After deployment:
1. Go to your project dashboard
2. Copy the **Production URL** (not the preview URL)
3. It should look like: `https://panmorph.vercel.app` or `https://panmorph-xxx.vercel.app`

## Step 7: Update GitHub Secret (For GitHub Pages)

If you're using GitHub Pages for the frontend:
1. Go to GitHub → Your Repo → Settings → Secrets → Actions
2. Update `VITE_API_URL` to your new Vercel API URL: `https://your-vercel-url.vercel.app/api/transcribe`

## Troubleshooting

### Build Fails?
- Check the build logs in Vercel dashboard
- Make sure `package-lock.json` is committed
- Verify Node version (should be 18+)

### API Not Working?
- Make sure `api/transcribe.js` is in the root `api/` folder
- Check Vercel Functions tab to see if the function is deployed
- Test the API endpoint: `https://your-url.vercel.app/api/transcribe`

### CORS Errors?
- The API function should handle CORS automatically
- Make sure the API is deployed and accessible
- Check browser console for specific error messages

