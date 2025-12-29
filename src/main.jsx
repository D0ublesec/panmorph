// Suppress AudioContext warnings BEFORE importing Tone.js
// These warnings are expected and harmless - browsers require user interaction
const originalWarn = console.warn;
const originalError = console.error;
const originalLog = console.log;

const shouldSuppress = (message) => {
  if (typeof message !== 'string') return false;
  const msg = message.toLowerCase();
  return msg.includes('audiocontext') || 
         msg.includes('user gesture') ||
         msg.includes('must be resumed') ||
         msg.includes('must be created') ||
         msg.includes('autoplay') ||
         msg.includes('tone.js v');
};

console.warn = function(...args) {
  const message = args[0]?.toString() || '';
  if (shouldSuppress(message)) {
    return; // Suppress AudioContext warnings
  }
  originalWarn.apply(console, args);
};

console.error = function(...args) {
  const message = args[0]?.toString() || '';
  if (shouldSuppress(message)) {
    return; // Suppress AudioContext errors
  }
  originalError.apply(console, args);
};

console.log = function(...args) {
  const message = args[0]?.toString() || '';
  // Suppress Tone.js version log and AudioContext logs
  if (shouldSuppress(message)) {
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

