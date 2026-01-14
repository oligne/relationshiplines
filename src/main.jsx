import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div style={{ color: 'red', fontSize: 32 }}>MAIN.JSX IS LOADING</div>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);
