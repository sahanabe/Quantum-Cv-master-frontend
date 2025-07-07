import React from 'react';
import './CSSDebug.css';

const CSSDebug = () => {
  return (
    <div className="css-debug-container">
      <h1 className="css-debug-title">CSS Debug Test</h1>
      <p className="css-debug-text">
        If you can see this styled text, CSS is working correctly!
      </p>
      <div className="css-debug-box">
        This is a styled div with CSS classes
      </div>
      <div style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        marginTop: '10px'
      }}>
        This is a styled div with inline styles
      </div>
      <div className="glass-card" style={{ marginTop: '20px', padding: '20px' }}>
        <h3>Glassmorphism Test</h3>
        <p>This should have a glass effect if CSS is working</p>
      </div>
      <button className="quantum-button quantum-button-primary" style={{ marginTop: '20px' }}>
        Quantum Button Test
      </button>
    </div>
  );
};

export default CSSDebug; 