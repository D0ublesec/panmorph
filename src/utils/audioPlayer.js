import * as Tone from 'tone';

// Initialize Tone.js audio context
// Note: AudioContext warnings are suppressed in main.jsx before Tone.js loads
let initialized = false;
let initAttempted = false;

export const initAudio = async () => {
  if (!initialized && !initAttempted) {
    initAttempted = true;
    try {
      // Only try to start if we have user interaction
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      initialized = true;
    } catch (error) {
      // AudioContext warnings are expected - browsers require user interaction
      // The context will be started automatically on first user interaction
      // Silently handle this - it's not an error
    }
  }
};

// Play a note at a specific frequency with handpan-like sound
// Handpans have a warm, bell-like metallic sound with rich harmonics
export const playNote = async (frequency, duration = 0.8) => {
  await initAudio();
  
  try {
    // Use FMSynth for better handpan-like sound - cleaner and more realistic
    const synth = new Tone.FMSynth({
      harmonicity: 2.5,
      modulationIndex: 2.5,
      detune: 0,
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.01,
        decay: 0.15,
        sustain: 0.1,
        release: 0.6, // Shorter release - ~1 second total
      },
      modulation: {
        type: 'sine',
      },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.05,
        release: 0.3,
      },
    });

    // Light reverb for resonance
    const reverb = new Tone.Reverb({
      roomSize: 0.6,
      damping: 0.4,
      wet: 0.2, // Less reverb for cleaner sound
    }).toDestination();

    synth.connect(reverb);
    synth.triggerAttackRelease(frequency, duration);
    
    // Clean up after note finishes (duration + release time)
    setTimeout(() => {
      synth.dispose();
      reverb.dispose();
    }, (duration + 0.7) * 1000);
  } catch (error) {
    // Fallback: Use a simpler but still handpan-like approach
    console.warn('Multi-oscillator setup failed, using simplified synth:', error);
    try {
      // Use FMSynth with careful modulation for handpan-like sound
      const synth = new Tone.FMSynth({
        harmonicity: 2.5,
        modulationIndex: 3,
        detune: 0,
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0.2,
          release: 1.8,
        },
        modulation: {
          type: 'sine',
        },
        modulationEnvelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.1,
          release: 0.5,
        },
      });

      const reverb = new Tone.Reverb({
        roomSize: 0.8,
        damping: 0.25,
        wet: 0.3,
      }).toDestination();

      synth.connect(reverb);
      synth.triggerAttackRelease(frequency, duration);
      
      setTimeout(() => {
        synth.dispose();
        reverb.dispose();
      }, (duration + 0.7) * 1000);
    } catch (fallbackError) {
      // Final fallback - basic but clean
      console.warn('FMSynth failed, using basic synth:', fallbackError);
      const synth = new Tone.Synth({
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.1,
          release: 0.5, // Shorter release
        },
      });

      const reverb = new Tone.Reverb({
        roomSize: 0.6,
        damping: 0.4,
        wet: 0.2,
      }).toDestination();

      synth.connect(reverb);
      synth.triggerAttackRelease(frequency, duration);
      
      setTimeout(() => {
        synth.dispose();
        reverb.dispose();
      }, (duration + 0.6) * 1000);
    }
  }
};

// Play multiple notes in sequence
export const playSequence = async (notes, tempo = 120) => {
  await initAudio();
  
  const delay = 60 / tempo; // Convert BPM to seconds per beat
  
  for (let i = 0; i < notes.length; i++) {
    setTimeout(() => {
      playNote(notes[i].frequency, notes[i].duration || 0.3);
    }, i * delay * 1000);
  }
};

