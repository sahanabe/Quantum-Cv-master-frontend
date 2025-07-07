// Burning Earth animation (emoji version)
export const BurningEarthIcon = () => (
  <div style={{
    position: 'absolute',
    left: '50%',
    top: '60%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    pointerEvents: 'none',
    animation: 'floatEarth 4s ease-in-out infinite alternate',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <span style={{ fontSize: 90, filter: 'drop-shadow(0 0 24px #ff6600cc)' }}>🌎</span>
    <span style={{ fontSize: 48, marginTop: -32, filter: 'drop-shadow(0 0 16px #ff6600cc)' }}>🔥</span>
    <style>{`
      @keyframes floatEarth {
        0% { transform: translate(-50%, -50%) scale(1); }
        100% { transform: translate(-50%, -60%) scale(1.08); }
      }
    `}</style>
  </div>
);
import React from 'react';

// Simple animated dots background
export const AnimatedDots = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none',
  }}>
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: 8 + Math.random() * 8,
          height: 8 + Math.random() * 8,
          borderRadius: '50%',
          background: `rgba(36,107,253,${0.15 + Math.random() * 0.2})`,
          animation: `moveDot${i} 8s linear infinite alternate`,
          filter: 'blur(1px)'
        }}
      />
    ))}
    <style>{`
      ${[...Array(40)].map((_, i) => `
        @keyframes moveDot${i} {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(${Math.random()*40-20}px) scale(${0.8+Math.random()*0.6}); }
        }
      `).join('')}
    `}</style>
  </div>
);

// Simple floating AI icon animation
export const FloatingAIIcon = () => (
  <div style={{
    position: 'absolute',
    left: '50%',
    top: '60%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    pointerEvents: 'none',
    animation: 'floatAI 4s ease-in-out infinite alternate',
  }}>
    <span style={{ fontSize: 80, color: '#246bfd', opacity: 0.25 }}>🤖</span>
    <style>{`
      @keyframes floatAI {
        0% { transform: translate(-50%, -50%) scale(1); }
        100% { transform: translate(-50%, -60%) scale(1.08); }
      }
    `}</style>
  </div>
);
