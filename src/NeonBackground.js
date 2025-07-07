import React from 'react';
import './theme.css';

const NeonBackground = () => (
  <div className="neon-bg">
    <svg className="neon-wire" viewBox="0 0 1920 1080" preserveAspectRatio="none">
      <path d="M0,800 Q480,200 960,800 T1920,800" />
      <path d="M0,600 Q600,100 1200,600 T1920,600" />
      <path d="M0,1000 Q960,400 1920,1000" />
    </svg>
  </div>
);

export default NeonBackground;
