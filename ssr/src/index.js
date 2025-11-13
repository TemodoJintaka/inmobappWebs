import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(rootElement, (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ));
}

reportWebVitals();