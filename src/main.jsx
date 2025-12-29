// Suppress AudioContext warnings BEFORE importing Tone.js
// These warnings are expected and harmless - browsers require user interaction
const originalWarn = console.warn;
const originalError = console.error;
const originalLog = console.log;

const shouldSuppress = (message) => {
  if (typeof message !== 'string') return false;
  return message.includes('AudioContext') || 
         message.includes('user gesture') ||
         message.includes('must be resumed') ||
         message.includes('must be created') ||
         message.includes('autoplay');
};

console.warn = (...args) => {
  const message = args[0]?.toString() || '';
  if (shouldSuppress(message)) {
    return; // Suppress AudioContext warnings
  }
  originalWarn.apply(console, args);
};

console.error = (...args) => {
  const message = args[0]?.toString() || '';
  if (shouldSuppress(message)) {
    return; // Suppress AudioContext errors
  }
  originalError.apply(console, args);
};

console.log = (...args) => {
  const message = args[0]?.toString() || '';
  // Suppress Tone.js version log and AudioContext logs
  if (shouldSuppress(message) || message.includes('Tone.js v')) {
    return;
  }
  originalLog.apply(console, args);
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

