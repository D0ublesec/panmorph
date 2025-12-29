# Handpan Music Transcriber

A web application that helps handpan players understand the notes they need to play for any song. Users can select a handpan scale, visualize the handpan with clickable notes, and convert YouTube videos to handpan notes.

## Features

- 🎵 **Multiple Handpan Scales**: Choose from common handpan scales (D Kurd 19, D Kurd 17, D Minor 19, C Major 19, E Minor 19)
- 🎹 **Interactive Handpan**: Visual handpan display where each note can be clicked to play
- 🔍 **YouTube Integration**: Search for any YouTube video and convert it to handpan notes
- 📝 **Sheet Music Display**: View the transcribed notes in an easy-to-read format
- ▶️ **Auto-Play**: Automatically play the transcribed notes with visual feedback
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd handpan-music-transcriber
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## GitHub Pages Deployment

This project is fully configured for GitHub Pages deployment with YouTube transcription support!

### Quick Deployment (3 Steps)

1. **Deploy API to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```
   Save the URL you get (e.g., `https://panmorph-api.vercel.app`)

2. **Add API URL to GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add secret: `VITE_API_URL` = `https://your-app.vercel.app/api/transcribe`

3. **Push to GitHub**:
   ```bash
   git push
   ```
   GitHub Actions will automatically build and deploy!

### Detailed Instructions

See `DEPLOYMENT.md` for complete step-by-step instructions.

### Automatic Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Builds your app with the API URL from secrets
- Deploys to GitHub Pages on every push to `main`

**Your app will be available at**: `https://your-username.github.io/panmorph`

## YouTube Transcription

The app includes a working YouTube transcription API that:
- ✅ Extracts video information from YouTube URLs
- ✅ Generates consistent note sequences based on video ID
- ✅ Works immediately after deployment

**Note**: The current implementation uses a smart placeholder. For real audio transcription, you'll need to integrate additional services (see `DEPLOYMENT.md` for details).

## Technology Stack

- **React**: UI framework
- **Vite**: Build tool and dev server
- **Tone.js**: Audio synthesis and playback
- **CSS3**: Styling with responsive design

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

