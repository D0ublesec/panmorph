import React from 'react';
import './HandpanSelector.css';

const HandpanSelector = ({ selectedScale, onScaleChange, scales }) => {
  return (
    <div className="handpan-selector">
      <label htmlFor="scale-select">Select Handpan Scale:</label>
      <select
        id="scale-select"
        value={selectedScale}
        onChange={(e) => onScaleChange(e.target.value)}
        className="scale-select"
      >
        {Object.entries(scales).map(([key, scale]) => (
          <option key={key} value={key}>
            {scale.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HandpanSelector;

