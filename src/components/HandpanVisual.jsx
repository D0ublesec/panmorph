import React, { useState } from 'react';
import './HandpanVisual.css';

const HandpanVisual = ({ ding, topNotes = [], bottomNotes = [], onNoteClick, activeNotes = [] }) => {
  const [hoveredNote, setHoveredNote] = useState(null);

  const centerX = 200;
  const centerY = 200;
  // Top notes inside the pan, bottom notes outside
  const topNoteRadius = 120; // Inside the pan
  const bottomNoteRadius = 170; // Outside the pan
  const panRadius = 155; // Edge of the pan
  const dingRadius = 35;

  const getNotePosition = (position, radius) => {
    // Convert position (0-360) to angle in radians
    const angle = ((position - 90) * Math.PI) / 180; // -90 to start at top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const renderNote = (note, index, radius, isBottom = false) => {
    const { x, y } = getNotePosition(note.position, radius);
    const isActive = activeNotes.includes(note.note);
    const noteKey = `${isBottom ? 'bottom' : 'top'}-${index}`;
    const isHovered = hoveredNote === noteKey;

    return (
      <g key={noteKey}>
        <circle
          cx={x}
          cy={y}
          r={isActive ? 18 : isHovered ? 16 : 14}
          fill={
            isActive
              ? '#e74c3c'
              : isHovered
              ? '#3498db'
              : isBottom
              ? '#95a5a6' // Different color for bottom notes
              : '#ecf0f1'
          }
          stroke={isActive ? '#c0392b' : isBottom ? '#7f8c8d' : '#bdc3c7'}
          strokeWidth="2"
          strokeDasharray={isBottom ? '3,2' : 'none'} // Dashed border for bottom notes
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
          fontSize={isBottom ? '10' : '11'}
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
          r={panRadius}
          fill="#34495e"
          stroke="#2c3e50"
          strokeWidth="4"
        />
        
        {/* Inner rim */}
        <circle
          cx={centerX}
          cy={centerY}
          r={panRadius - 5}
          fill="none"
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Top notes - inside the pan */}
        {topNotes.map((note, index) => renderNote(note, index, topNoteRadius, false))}

        {/* Bottom notes - outside the pan */}
        {bottomNotes.map((note, index) => renderNote(note, index, bottomNoteRadius, true))}

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

