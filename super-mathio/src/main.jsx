/**
 * Import needed files/libraries/ect.
 * App.jsx is where certain files and functions may be called.
 */
import React from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App";
import './GameCanvas.css';

/**
 * Render the game using App.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
