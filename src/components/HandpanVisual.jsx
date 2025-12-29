import React, { useState, useEffect } from 'react';
import './HandpanVisual.css';

const HandpanVisual = ({ notes, onNoteClick, activeNotes = [] }) => {
  const [hoveredNote, setHoveredNote] = useState(null);

  const centerX = 200;
  const centerY = 200;
  const radius = 150;

  const getNotePosition = (position) => {
    const angle = (position * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="handpan-container">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="handpan-svg"
      >
        {/* Outer circle (handpan body) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 20}
          fill="#2c3e50"
          stroke="#34495e"
          strokeWidth="3"
        />
        
        {/* Inner circle (center) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 60}
          fill="#34495e"
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Note circles */}
        {notes.map((note, index) => {
          const { x, y } = getNotePosition(note.position);
          const isActive = activeNotes.includes(note.note);
          const isHovered = hoveredNote === index;

          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r={isActive ? 25 : isHovered ? 22 : 20}
                fill={
                  isActive
                    ? '#e74c3c'
                    : isHovered
                    ? '#3498db'
                    : '#ecf0f1'
                }
                stroke={isActive ? '#c0392b' : '#bdc3c7'}
                strokeWidth="2"
                className="note-circle"
                onClick={() => onNoteClick(note)}
                onMouseEnter={() => setHoveredNote(index)}
                onMouseLeave={() => setHoveredNote(null)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize="12"
                fill={isActive ? 'white' : '#2c3e50'}
                fontWeight="600"
                pointerEvents="none"
              >
                {note.note}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default HandpanVisual;

