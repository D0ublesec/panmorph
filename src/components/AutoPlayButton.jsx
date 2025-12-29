import React from 'react';
import './AutoPlayButton.css';

const AutoPlayButton = ({ onClick, disabled, isPlaying }) => {
  return (
    <div className="autoplay-container">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`autoplay-button ${isPlaying ? 'playing' : ''}`}
      >
        {isPlaying ? (
          <>
            <span className="spinner"></span>
            Playing...
          </>
        ) : (
          <>
            <span className="play-icon">▶</span>
            Auto Play Notes
          </>
        )}
      </button>
    </div>
  );
};

export default AutoPlayButton;

