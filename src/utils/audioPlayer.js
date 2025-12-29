import * as Tone from 'tone';

// Initialize Tone.js audio context
let initialized = false;

export const initAudio = async () => {
  if (!initialized) {
    await Tone.start();
    initialized = true;
  }
};

// Play a note at a specific frequency with handpan-like sound
// Handpans have a warm, bell-like metallic sound - not snare-like
export const playNote = async (frequency, duration = 1.0) => {
  await initAudio();
  
  try {
    // Use a combination of oscillators to create a handpan-like sound
    // Handpans have a rich harmonic content with a warm, resonant quality
    const reverb = new Tone.Reverb({
      roomSize: 0.8,
      damping: 0.3,
      wet: 0.4,
    }).toDestination();

    // Create a handpan-like sound using multiple oscillators
    // Main oscillator - sine wave for the fundamental
    const mainOsc = new Tone.Oscillator({
      frequency: frequency,
      type: 'sine',
    });

    // Harmonic oscillator - adds warmth and richness
    const harmonicOsc = new Tone.Oscillator({
      frequency: frequency * 2.01, // Slightly detuned for warmth
      type: 'sine',
      volume: -8, // Quieter harmonic
    });

    // Envelope for natural attack and decay
    const envelope = new Tone.AmplitudeEnvelope({
      attack: 0.01,
      decay: 0.3,
      sustain: 0.2,
      release: 1.5,
    }).connect(reverb);

    // Low-pass filter for warmth
    const filter = new Tone.Filter({
      frequency: frequency * 4,
      type: 'lowpass',
      Q: 1,
    }).connect(envelope);

    mainOsc.connect(filter);
    harmonicOsc.connect(filter);

    // Start oscillators
    mainOsc.start();
    harmonicOsc.start();

    // Trigger envelope
    envelope.triggerAttackRelease(duration);

    // Stop and clean up
    setTimeout(() => {
      mainOsc.stop();
      harmonicOsc.stop();
      mainOsc.dispose();
      harmonicOsc.dispose();
      filter.dispose();
      envelope.dispose();
      reverb.dispose();
    }, duration * 1000 + 2000);
  } catch (error) {
    // Fallback to MembraneSynth which is better for handpan-like sounds
    console.warn('Oscillator setup failed, using MembraneSynth:', error);
    try {
      const synth = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 2,
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 1.4,
        },
      });

      const reverb = new Tone.Reverb({
        roomSize: 0.7,
        damping: 0.2,
        wet: 0.3,
      }).toDestination();

      synth.connect(reverb);
      synth.triggerAttackRelease(frequency, duration);
      
      setTimeout(() => {
        synth.dispose();
        reverb.dispose();
      }, duration * 1000 + 1500);
    } catch (fallbackError) {
      // Final fallback to basic synth
      console.warn('MembraneSynth failed, using basic synth:', fallbackError);
      const synth = new Tone.Synth({
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.01,
          decay: 0.4,
          sustain: 0.1,
          release: 1.2,
        },
      }).toDestination();

      synth.triggerAttackRelease(frequency, duration);
      
      setTimeout(() => {
        synth.dispose();
      }, duration * 1000 + 1500);
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

