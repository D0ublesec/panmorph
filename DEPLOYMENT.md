# Complete Deployment Guide

This guide will walk you through deploying your Handpan Music Transcriber to GitHub Pages with a working YouTube transcription API.

## Prerequisites

- GitHub account
- Node.js installed (v18 or higher)
- Git installed

## Step 1: Deploy API to Vercel (5 minutes)

### 1.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 1.2 Login to Vercel

```bash
vercel login
```

This will open a browser window for you to authenticate.

### 1.3 Deploy API

From your project directory (`panmorph`):

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → `panmorph-api` (or any name you like)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

Vercel will deploy and give you a URL like:
```
https://panmorph-api.vercel.app
```

**Save this URL!** You'll need it in the next step.

### 1.4 Get Your API Endpoint

Your API will be available at:
```
https://your-app-name.vercel.app/api/transcribe
```

## Step 2: Configure Frontend

### 2.1 Create Environment File

Create a `.env` file in your project root:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 2.2 Add Your API URL

Edit `.env` and add your Vercel URL:

```env
VITE_API_URL=https://your-app-name.vercel.app/api/transcribe
```

Replace `your-app-name` with your actual Vercel app name.

## Step 3: Test Locally

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Test the API Locally (Optional)

If you want to test the API locally:

```bash
vercel dev
```

This runs your API at `http://localhost:3000`. Update `.env` temporarily:
```env
VITE_API_URL=http://localhost:3000/api/transcribe
```

### 3.3 Run Frontend

```bash
npm run dev
```

Open `http://localhost:5173` and test with a YouTube URL.

## Step 4: Deploy to GitHub Pages

### 4.1 Push to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/panmorph.git
git push -u origin main
```

### 4.2 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. Save

### 4.3 Add Environment Variable to GitHub

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_API_URL`
4. Value: `https://your-app-name.vercel.app/api/transcribe`
5. Click **Add secret**

### 4.4 Update GitHub Actions Workflow

The workflow file is already set up at `.github/workflows/deploy.yml`. It will automatically:
- Build your app
- Deploy to GitHub Pages

The workflow will use the `VITE_API_URL` secret you just added.

### 4.5 Trigger Deployment

Push any change to trigger the workflow:

```bash
git add .
git commit -m "Configure for deployment"
git push
```

Or manually trigger it:
1. Go to **Actions** tab in GitHub
2. Click **Deploy to GitHub Pages**
3. Click **Run workflow**

## Step 5: Verify Deployment

1. Wait for the GitHub Actions workflow to complete (2-3 minutes)
2. Go to your GitHub Pages URL: `https://your-username.github.io/panmorph`
3. Test the YouTube transcription feature

## Troubleshooting

### API Not Working

1. **Check Vercel deployment**: Go to [vercel.com/dashboard](https://vercel.com/dashboard) and verify your API is deployed
2. **Test API directly**: 
   ```bash
   curl -X POST https://your-app.vercel.app/api/transcribe \
     -H "Content-Type: application/json" \
     -d '{"youtubeUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
   ```
3. **Check browser console**: Open DevTools and look for errors

### GitHub Pages Not Updating

1. Check the **Actions** tab for errors
2. Verify the workflow completed successfully
3. Clear browser cache and try again

### Environment Variable Not Working

1. Make sure you added `VITE_API_URL` as a GitHub secret
2. The workflow file uses it correctly
3. Rebuild: The variable is baked into the build, so you need to rebuild after changing it

## Next Steps

The current API implementation uses a smart placeholder that generates consistent notes based on video ID. To implement **real transcription**, you'll need to:

1. Integrate a YouTube audio extraction service (yt-dlp, RapidAPI, etc.)
2. Add music transcription (Basic Pitch, Essentia, or transcription API)
3. Update `api/transcribe.js` with the real implementation

See `IMPLEMENTATION_GUIDE.md` for details on implementing real transcription.

## Cost

- **Vercel**: Free tier (100GB bandwidth/month, 100 hours execution)
- **GitHub Pages**: Free
- **Total**: $0 for low to moderate usage!

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Vercel logs: [vercel.com/dashboard](https://vercel.com/dashboard)
3. Check GitHub Actions logs: Repository → Actions tab
