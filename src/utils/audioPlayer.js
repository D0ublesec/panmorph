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
export const playNote = async (frequency, duration = 0.5) => {
  await initAudio();
  
  try {
    // Use MetalSynth for a more handpan-like metallic sound
    const synth = new Tone.MetalSynth({
      frequency: frequency,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.1,
        release: 0.5,
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    });

    // Add reverb for more realistic handpan sound
    const reverb = new Tone.Reverb({
      roomSize: 0.5,
      damping: 0.2,
      wet: 0.3,
    }).toDestination();
    
    synth.connect(reverb);

    synth.triggerAttackRelease(frequency, duration);
    
    // Clean up after note finishes
    setTimeout(() => {
      synth.dispose();
      reverb.dispose();
    }, duration * 1000 + 500);
  } catch (error) {
    // Fallback to basic synth if MetalSynth is not available
    console.warn('MetalSynth not available, using basic synth:', error);
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 0.8,
      },
    }).toDestination();

    synth.triggerAttackRelease(frequency, duration);
    
    setTimeout(() => {
      synth.dispose();
    }, duration * 1000 + 100);
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

