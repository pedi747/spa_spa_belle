import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id "root" not found in HTML document');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
