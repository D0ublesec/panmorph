import React, { useState, useEffect } from 'react';
import HandpanSelector from './components/HandpanSelector';
import HandpanVisual from './components/HandpanVisual';
import YouTubeSearch from './components/YouTubeSearch';
import SheetMusic from './components/SheetMusic';
import AutoPlayButton from './components/AutoPlayButton';
import { handpanScales, defaultScale } from './data/handpanScales';
import { playNote, playSequence } from './utils/audioPlayer';
import {
  validateYouTubeUrl,
  transcribeYouTubeAudio,
  mapToHandpanNotes,
} from './utils/youtubeExtractor';
import './App.css';

function App() {
  const [selectedScale, setSelectedScale] = useState(defaultScale);
  const [currentNotes, setCurrentNotes] = useState([]);
  const [transcribedNotes, setTranscribedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNotes, setActiveNotes] = useState([]);

  const selectedScaleData = handpanScales[selectedScale] || {};
  const { ding, topNotes = [], bottomNotes = [] } = selectedScaleData;
  // Combine all notes for mapping purposes
  const allHandpanNotes = ding ? [ding, ...topNotes, ...bottomNotes] : [...topNotes, ...bottomNotes];

  // Update transcribed notes when scale changes
  useEffect(() => {
    if (transcribedNotes.length > 0) {
      const mapped = mapToHandpanNotes(transcribedNotes, allHandpanNotes);
      setCurrentNotes(mapped);
    } else {
      setCurrentNotes([]);
    }
  }, [selectedScale, allHandpanNotes]);

  const handleNoteClick = async (note) => {
    setActiveNotes([note.note]);
    await playNote(note.frequency);
    setTimeout(() => setActiveNotes([]), 300);
  };

  const handleScaleChange = (scaleKey) => {
    setSelectedScale(scaleKey);
  };

  const handleYouTubeSearch = async (url) => {
    if (!validateYouTubeUrl(url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);
    try {
      const transcription = await transcribeYouTubeAudio(url);
      setTranscribedNotes(transcription.notes);
      const mapped = mapToHandpanNotes(transcription.notes, allHandpanNotes);
      setCurrentNotes(mapped);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error processing YouTube video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoPlay = async () => {
    if (currentNotes.length === 0) {
      alert('No notes to play. Please search for a YouTube video first.');
      return;
    }

    setIsPlaying(true);
    setActiveNotes([]);

    // Play notes with visual feedback
    for (let i = 0; i < currentNotes.length; i++) {
      const note = currentNotes[i];
      const delay = (note.time || i * 0.5) * 1000;

      setTimeout(() => {
        setActiveNotes([note.note]);
        playNote(note.frequency, 0.5);
        setTimeout(() => {
          setActiveNotes((prev) => prev.filter((n) => n !== note.note));
        }, 500);
      }, delay);
    }

    // Reset playing state after all notes
    const totalDuration =
      currentNotes[currentNotes.length - 1]?.time || currentNotes.length * 0.5;
    setTimeout(() => {
      setIsPlaying(false);
      setActiveNotes([]);
    }, totalDuration * 1000 + 1000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Handpan Music Transcriber</h1>
        <p>Convert any YouTube song to handpan notes</p>
      </header>

      <main className="app-main">
        <HandpanSelector
          selectedScale={selectedScale}
          onScaleChange={handleScaleChange}
          scales={handpanScales}
        />

        <HandpanVisual
          ding={ding}
          topNotes={topNotes}
          bottomNotes={bottomNotes}
          onNoteClick={handleNoteClick}
          activeNotes={activeNotes}
        />

        <YouTubeSearch onSearch={handleYouTubeSearch} isLoading={isLoading} />

        <AutoPlayButton
          onClick={handleAutoPlay}
          disabled={currentNotes.length === 0 || isPlaying}
          isPlaying={isPlaying}
        />

        <SheetMusic notes={currentNotes} handpanNotes={allHandpanNotes} />
      </main>

      <footer className="app-footer">
        <p>
          Click on the handpan notes to play them, or search for a YouTube video
          to get the notes for any song!
        </p>
      </footer>
    </div>
  );
}

export default App;

