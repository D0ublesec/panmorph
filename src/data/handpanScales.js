// Common handpan scales with their notes
// Format: { name, notes: [{ note, frequency, position }] }
// Position is for visual layout on the handpan (0-360 degrees)

export const handpanScales = {
  'd-kurd-19': {
    name: 'D Kurd 19',
    notes: [
      { note: 'D4', frequency: 293.66, position: 0 },
      { note: 'A4', frequency: 440.00, position: 40 },
      { note: 'Bb4', frequency: 466.16, position: 80 },
      { note: 'C5', frequency: 523.25, position: 120 },
      { note: 'D5', frequency: 587.33, position: 160 },
      { note: 'E5', frequency: 659.25, position: 200 },
      { note: 'F5', frequency: 698.46, position: 240 },
      { note: 'A5', frequency: 880.00, position: 280 },
      { note: 'Bb5', frequency: 932.33, position: 320 },
    ],
  },
  'd-kurd-17': {
    name: 'D Kurd 17',
    notes: [
      { note: 'D4', frequency: 293.66, position: 0 },
      { note: 'A4', frequency: 440.00, position: 45 },
      { note: 'Bb4', frequency: 466.16, position: 90 },
      { note: 'C5', frequency: 523.25, position: 135 },
      { note: 'D5', frequency: 587.33, position: 180 },
      { note: 'E5', frequency: 659.25, position: 225 },
      { note: 'F5', frequency: 698.46, position: 270 },
      { note: 'A5', frequency: 880.00, position: 315 },
    ],
  },
  'd-minor-19': {
    name: 'D Minor 19',
    notes: [
      { note: 'D4', frequency: 293.66, position: 0 },
      { note: 'E4', frequency: 329.63, position: 40 },
      { note: 'F4', frequency: 349.23, position: 80 },
      { note: 'A4', frequency: 440.00, position: 120 },
      { note: 'Bb4', frequency: 466.16, position: 160 },
      { note: 'C5', frequency: 523.25, position: 200 },
      { note: 'D5', frequency: 587.33, position: 240 },
      { note: 'E5', frequency: 659.25, position: 280 },
      { note: 'F5', frequency: 698.46, position: 320 },
    ],
  },
  'c-major-19': {
    name: 'C Major 19',
    notes: [
      { note: 'C4', frequency: 261.63, position: 0 },
      { note: 'D4', frequency: 293.66, position: 40 },
      { note: 'E4', frequency: 329.63, position: 80 },
      { note: 'F4', frequency: 349.23, position: 120 },
      { note: 'G4', frequency: 392.00, position: 160 },
      { note: 'A4', frequency: 440.00, position: 200 },
      { note: 'B4', frequency: 493.88, position: 240 },
      { note: 'C5', frequency: 523.25, position: 280 },
      { note: 'D5', frequency: 587.33, position: 320 },
    ],
  },
  'e-minor-19': {
    name: 'E Minor 19',
    notes: [
      { note: 'E4', frequency: 329.63, position: 0 },
      { note: 'F#4', frequency: 369.99, position: 40 },
      { note: 'G4', frequency: 392.00, position: 80 },
      { note: 'B4', frequency: 493.88, position: 120 },
      { note: 'C5', frequency: 523.25, position: 160 },
      { note: 'D5', frequency: 587.33, position: 200 },
      { note: 'E5', frequency: 659.25, position: 240 },
      { note: 'F#5', frequency: 739.99, position: 280 },
      { note: 'G5', frequency: 783.99, position: 320 },
    ],
  },
};

export const defaultScale = 'd-kurd-19';

