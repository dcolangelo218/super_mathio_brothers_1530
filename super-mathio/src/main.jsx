/**
 * Import needed files/libraries/ect.
 * App.jsx is where certain files and functions may be called.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";

/**
 * Render the game using App.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
