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
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL..."
          className="search-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? 'Processing...' : 'Transcribe'}
        </button>
      </form>
      <p className="search-hint">
        Paste a YouTube URL to convert the song to handpan notes
      </p>
    </div>
  );
};

export default YouTubeSearch;

