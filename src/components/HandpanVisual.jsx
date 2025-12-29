import React, { useState } from 'react';
import './HandpanVisual.css';

const HandpanVisual = ({ ding, topNotes = [], bottomNotes = [], onNoteClick, activeNotes = [] }) => {
  const [hoveredNote, setHoveredNote] = useState(null);

  const centerX = 200;
  const centerY = 200;
  // All notes arranged in a circle around the ding, like a real handpan
  const noteRadius = 130;
  const dingRadius = 35;

  // Combine all notes into one array for display (like handpaner.com)
  const allNotes = [...topNotes, ...bottomNotes];

  const getNotePosition = (position) => {
    // Convert position (0-360) to angle in radians
    const angle = ((position - 90) * Math.PI) / 180; // -90 to start at top
    const x = centerX + noteRadius * Math.cos(angle);
    const y = centerY + noteRadius * Math.sin(angle);
    return { x, y };
  };

  const renderNote = (note, index) => {
    const { x, y } = getNotePosition(note.position);
    const isActive = activeNotes.includes(note.note);
    const noteKey = `note-${index}`;
    const isHovered = hoveredNote === noteKey;

    return (
      <g key={noteKey}>
        <circle
          cx={x}
          cy={y}
          r={isActive ? 20 : isHovered ? 18 : 16}
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
          onMouseEnter={() => setHoveredNote(noteKey)}
          onMouseLeave={() => setHoveredNote(null)}
          style={{ cursor: 'pointer' }}
        />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="11"
          fill={isActive ? 'white' : '#2c3e50'}
          fontWeight="600"
          pointerEvents="none"
        >
          {note.note}
        </text>
      </g>
    );
  };

  const isDingActive = ding && activeNotes.includes(ding.note);
  const dingHovered = hoveredNote === 'ding';

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
          r={noteRadius + 25}
          fill="#34495e"
          stroke="#2c3e50"
          strokeWidth="4"
        />
        
        {/* Inner rim */}
        <circle
          cx={centerX}
          cy={centerY}
          r={noteRadius + 15}
          fill="none"
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* All notes arranged in a circle around the ding */}
        {allNotes.map((note, index) => renderNote(note, index))}

        {/* Ding (center note) - larger and more prominent */}
        {ding && (
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r={isDingActive ? dingRadius + 5 : dingHovered ? dingRadius + 3 : dingRadius}
              fill={
                isDingActive
                  ? '#e74c3c'
                  : dingHovered
                  ? '#3498db'
                  : '#f39c12'
              }
              stroke={isDingActive ? '#c0392b' : '#d68910'}
              strokeWidth="3"
              className="note-circle ding-circle"
              onClick={() => onNoteClick(ding)}
              onMouseEnter={() => setHoveredNote('ding')}
              onMouseLeave={() => setHoveredNote(null)}
              style={{ cursor: 'pointer' }}
            />
            <text
              x={centerX}
              y={centerY + 7}
              textAnchor="middle"
              fontSize="16"
              fill={isDingActive ? 'white' : '#2c3e50'}
              fontWeight="700"
              pointerEvents="none"
            >
              {ding.note}
            </text>
            <text
              x={centerX}
              y={centerY - 18}
              textAnchor="middle"
              fontSize="10"
              fill={isDingActive ? 'white' : '#7f8c8d'}
              fontWeight="500"
              pointerEvents="none"
            >
              DING
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default HandpanVisual;

