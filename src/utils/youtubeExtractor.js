// YouTube audio extraction and transcription
// Note: This is a simplified version. In production, you'd need a backend service
// to handle YouTube audio extraction due to CORS and API limitations.

// For now, we'll use a placeholder that demonstrates the flow
// In production, you'd integrate with:
// - A backend service that extracts audio from YouTube (e.g., yt-dlp)
// - A music transcription service (e.g., Google Cloud Speech-to-Text, Spotify Basic Pitch, or similar)

export const extractYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const validateYouTubeUrl = (url) => {
  return extractYouTubeVideoId(url) !== null;
};

// Audio transcription function
// In production, this calls a backend API that:
// 1. Extracts audio from YouTube
// 2. Transcribes the audio to MIDI/notes
// 3. Returns the note sequence
export const transcribeYouTubeAudio = async (youtubeUrl) => {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  // Get API URL from environment variable or use default
  // For production: Set VITE_API_URL in your .env file
  // Example: VITE_API_URL=https://your-app.vercel.app/api/transcribe
  const API_URL = import.meta.env.VITE_API_URL || '';

  // If no API URL is configured, use placeholder (demo mode)
  if (!API_URL) {
    console.warn('No API URL configured. Using demo mode. Set VITE_API_URL in .env for production.');
    return new Promise((resolve) => {
      setTimeout(() => {
        // Demo note sequence
        resolve({
          notes: [
            { note: 'D4', time: 0 },
            { note: 'A4', time: 0.5 },
            { note: 'C5', time: 1.0 },
            { note: 'D5', time: 1.5 },
            { note: 'E5', time: 2.0 },
            { note: 'F5', time: 2.5 },
            { note: 'A5', time: 3.0 },
          ],
          duration: 4.0,
        });
      }, 2000);
    });
  }

  // Call the backend API
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ youtubeUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure the response has the expected format
    if (data.notes && Array.isArray(data.notes)) {
      return {
        notes: data.notes,
        duration: data.duration || data.notes[data.notes.length - 1]?.time || 0,
      };
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('API call failed:', error);
    
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
      throw new Error('CORS error: The API may need to be redeployed. Please check the API configuration.');
    }
    
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
};

// Map transcribed notes to handpan notes (find closest match)
export const mapToHandpanNotes = (transcribedNotes, handpanNotes) => {
  const noteMap = {};
  handpanNotes.forEach(hpNote => {
    noteMap[hpNote.note] = hpNote;
  });

  return transcribedNotes.map(transNote => {
    // Try exact match first
    if (noteMap[transNote.note]) {
      return {
        ...noteMap[transNote.note],
        time: transNote.time,
      };
    }

    // Find closest note by frequency
    const targetFreq = getNoteFrequency(transNote.note);
    let closest = handpanNotes[0];
    let minDiff = Math.abs(closest.frequency - targetFreq);

    handpanNotes.forEach(hpNote => {
      const diff = Math.abs(hpNote.frequency - targetFreq);
      if (diff < minDiff) {
        minDiff = diff;
        closest = hpNote;
      }
    });

    return {
      ...closest,
      time: transNote.time,
    };
  });
};

// Get frequency from note name (e.g., 'C4' -> 261.63)
const getNoteFrequency = (noteName) => {
  const noteMap = {
    'C': 261.63, 'C#': 277.18, 'Db': 277.18,
    'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
    'E': 329.63,
    'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
    'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
    'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
    'B': 493.88,
  };

  const match = noteName.match(/([A-G][#b]?)(\d)/);
  if (!match) return 440;

  const [, note, octave] = match;
  const baseFreq = noteMap[note] || 440;
  const octaveMultiplier = Math.pow(2, parseInt(octave) - 4);
  
  return baseFreq * octaveMultiplier;
};

