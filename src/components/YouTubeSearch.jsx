import React, { useState } from 'react';
import './YouTubeSearch.css';

const YouTubeSearch = ({ onSearch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <div className="youtube-search">
      <h3>🎵 Transcribe from YouTube</h3>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="search-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? '⏳ Processing...' : '🎼 Transcribe'}
        </button>
      </form>
      <p className="search-hint">
        Paste any YouTube URL to automatically extract and convert the music to handpan notes
      </p>
    </div>
  );
};

export default YouTubeSearch;

