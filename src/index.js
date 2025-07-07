import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Import CSS files in order of specificity (most general to most specific)
import 'antd/dist/reset.css';  // Ant Design base styles
import './index.css';          // Global base styles
import './theme.css';          // Theme overrides
import './i18n';

// Version indicator for cache busting
// App version info - removed console.log for cleaner output

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
