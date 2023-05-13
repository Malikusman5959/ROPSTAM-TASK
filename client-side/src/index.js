import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextStore from "./store/Context.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ContextStore>
      <App/>
    </ContextStore>
  // </React.StrictMode>
);
