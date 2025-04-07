
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';

// Render the app with StrictMode for better development experience
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
