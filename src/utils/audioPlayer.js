import * as Tone from 'tone';

// Initialize Tone.js audio context
let initialized = false;

export const initAudio = async () => {
  if (!initialized) {
    try {
      await Tone.start();
      initialized = true;
    } catch (error) {
      // AudioContext warnings are expected - browsers require user interaction
      // The context will be started automatically on first user interaction
      console.debug('AudioContext initialization:', error.message);
    }
  }
};

// Play a note at a specific frequency with handpan-like sound
// Handpans have a warm, bell-like metallic sound with rich harmonics
// Based on handpaner.com approach - using tuned oscillators with proper harmonics
export const playNote = async (frequency, duration = 1.2) => {
  await initAudio();
  
  try {
    // Handpan sound characteristics:
    // - Strong fundamental (sine wave)
    // - Rich harmonics (especially 2nd and 3rd harmonics)
    // - Slight inharmonicity for warmth
    // - Long decay with reverb
    
    const reverb = new Tone.Reverb({
      roomSize: 0.9,
      damping: 0.2,
      wet: 0.35,
    }).toDestination();

    // Create a gain node to mix the oscillators
    const gainNode = new Tone.Gain(0.5).connect(reverb);

    // Fundamental frequency (main tone)
    const fundamental = new Tone.Oscillator({
      frequency: frequency,
      type: 'sine',
      volume: 0,
    }).connect(gainNode);

    // Second harmonic (octave) - adds brightness
    const harmonic2 = new Tone.Oscillator({
      frequency: frequency * 2,
      type: 'sine',
      volume: -12, // Quieter than fundamental
    }).connect(gainNode);

    // Third harmonic - adds warmth
    const harmonic3 = new Tone.Oscillator({
      frequency: frequency * 3,
      type: 'sine',
      volume: -18, // Even quieter
    }).connect(gainNode);

    // Slight detuning for warmth (like real handpans)
    const detuned = new Tone.Oscillator({
      frequency: frequency * 1.005, // Very slight detune
      type: 'sine',
      volume: -20,
    }).connect(gainNode);

    // Envelope for natural attack and long decay
    const envelope = new Tone.AmplitudeEnvelope({
      attack: 0.005,
      decay: 0.2,
      sustain: 0.15,
      release: 2.0, // Long release for handpan sustain
    }).connect(gainNode);

    // Start all oscillators
    fundamental.start();
    harmonic2.start();
    harmonic3.start();
    detuned.start();

    // Trigger the envelope
    envelope.triggerAttackRelease(duration);

    // Stop and clean up after note finishes
    const cleanupTime = (duration + 2.5) * 1000;
    setTimeout(() => {
      fundamental.stop();
      harmonic2.stop();
      harmonic3.stop();
      detuned.stop();
      fundamental.dispose();
      harmonic2.dispose();
      harmonic3.dispose();
      detuned.dispose();
      gainNode.dispose();
      envelope.dispose();
      reverb.dispose();
    }, cleanupTime);
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
      }, duration * 1000 + 2000);
    } catch (fallbackError) {
      // Final fallback - basic but clean
      console.warn('FMSynth failed, using basic synth:', fallbackError);
      const synth = new Tone.Synth({
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.01,
          decay: 0.5,
          sustain: 0.1,
          release: 1.5,
        },
      });

      const reverb = new Tone.Reverb({
        roomSize: 0.7,
        damping: 0.3,
        wet: 0.25,
      }).toDestination();

      synth.connect(reverb);
      synth.triggerAttackRelease(frequency, duration);
      
      setTimeout(() => {
        synth.dispose();
        reverb.dispose();
      }, duration * 1000 + 1800);
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

