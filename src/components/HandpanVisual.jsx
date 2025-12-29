import React, { useState } from 'react';
import './HandpanVisual.css';

const HandpanVisual = ({ ding, topNotes = [], bottomNotes = [], onNoteClick, activeNotes = [] }) => {
  const [hoveredNote, setHoveredNote] = useState(null);

  // Make handpan larger for easier clicking
  const scale = 1.5; // Scale up by 50%
  const centerX = 300;
  const centerY = 300;
  // Top notes inside the pan, bottom notes outside
  const topNoteRadius = 180; // Inside the pan (120 * 1.5)
  const bottomNoteRadius = 255; // Outside the pan (170 * 1.5)
  const panRadius = 232; // Edge of the pan (155 * 1.5)
  const dingRadius = 52; // (35 * 1.5)

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
          r={isActive ? 28 : isHovered ? 26 : 24} // Larger for easier clicking
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
          strokeWidth="3"
          strokeDasharray={isBottom ? '4,3' : 'none'} // Dashed border for bottom notes
          className="note-circle"
          onClick={() => onNoteClick(note)}
          onMouseEnter={() => setHoveredNote(noteKey)}
          onMouseLeave={() => setHoveredNote(null)}
          style={{ cursor: 'pointer' }}
        />
        <text
          x={x}
          y={y + 7}
          textAnchor="middle"
          fontSize={isBottom ? '14' : '16'} // Larger text
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
        width="600"
        height="600"
        viewBox="0 0 600 600"
        className="handpan-svg"
      >
        {/* Outer circle (handpan body) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={panRadius}
          fill="#34495e"
          stroke="#2c3e50"
          strokeWidth="6"
        />
        
        {/* Inner rim */}
        <circle
          cx={centerX}
          cy={centerY}
          r={panRadius - 8}
          fill="none"
          stroke="#2c3e50"
          strokeWidth="3"
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
              strokeWidth="4"
              className="note-circle ding-circle"
              onClick={() => onNoteClick(ding)}
              onMouseEnter={() => setHoveredNote('ding')}
              onMouseLeave={() => setHoveredNote(null)}
              style={{ cursor: 'pointer' }}
            />
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              fontSize="24" // Larger text
              fill={isDingActive ? 'white' : '#2c3e50'}
              fontWeight="700"
              pointerEvents="none"
            >
              {ding.note}
            </text>
            <text
              x={centerX}
              y={centerY - 25}
              textAnchor="middle"
              fontSize="14" // Larger text
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

