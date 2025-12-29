import React from 'react';
import './SheetMusic.css';

const SheetMusic = ({ notes, handpanNotes }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="sheet-music">
        <h3>Sheet Music</h3>
        <p className="empty-message">No notes to display. Search for a YouTube video to get started!</p>
      </div>
    );
  }

  // Create a map of handpan notes for quick lookup
  const handpanNoteMap = {};
  handpanNotes.forEach(note => {
    handpanNoteMap[note.note] = note;
  });

  return (
    <div className="sheet-music">
      <h3>Sheet Music</h3>
      <div className="notes-display">
        {notes.map((note, index) => {
          const handpanNote = handpanNoteMap[note.note] || note;
          return (
            <div
              key={index}
              className="note-item"
              style={{
                animationDelay: `${note.time || index * 0.1}s`,
              }}
            >
              <span className="note-name">{note.note}</span>
              <span className="note-time">
                {note.time !== undefined ? `${note.time.toFixed(1)}s` : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SheetMusic;

