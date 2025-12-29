import React, { useState } from 'react';
import './HandpanVisual.css';

const HandpanVisual = ({ ding, topNotes = [], bottomNotes = [], onNoteClick, activeNotes = [] }) => {
  const [hoveredNote, setHoveredNote] = useState(null);

  const centerX = 200;
  const centerY = 200;
  const topRadius = 120;
  const bottomRadius = 100;
  const dingRadius = 30;

  const getNotePosition = (position, radius) => {
    const angle = (position * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const renderNote = (note, index, radius, isTop) => {
    const { x, y } = getNotePosition(note.position, radius);
    const isActive = activeNotes.includes(note.note);
    const noteKey = `${isTop ? 'top' : 'bottom'}-${index}`;
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
          y={y + 4}
          textAnchor="middle"
          fontSize="10"
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
          r={topRadius + 30}
          fill="#2c3e50"
          stroke="#34495e"
          strokeWidth="3"
        />
        
        {/* Top notes circle (outer ring) */}
        {topNotes.map((note, index) => renderNote(note, index, topRadius, true))}

        {/* Bottom notes circle (inner ring) */}
        {bottomNotes.map((note, index) => renderNote(note, index, bottomRadius, false))}

        {/* Ding (center note) */}
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
              y={centerY + 6}
              textAnchor="middle"
              fontSize="14"
              fill={isDingActive ? 'white' : '#2c3e50'}
              fontWeight="700"
              pointerEvents="none"
            >
              {ding.note}
            </text>
            <text
              x={centerX}
              y={centerY - 15}
              textAnchor="middle"
              fontSize="9"
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

