import * as Tone from 'tone';

// Initialize Tone.js audio context
let initialized = false;

export const initAudio = async () => {
  if (!initialized) {
    await Tone.start();
    initialized = true;
  }
};

// Play a note at a specific frequency
export const playNote = async (frequency, duration = 0.3) => {
  await initAudio();
  
  const synth = new Tone.Synth({
    oscillator: {
      type: 'sine',
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.3,
      release: 0.5,
    },
  }).toDestination();

  synth.triggerAttackRelease(frequency, duration);
  
  // Clean up after note finishes
  setTimeout(() => {
    synth.dispose();
  }, duration * 1000 + 100);
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

