import React from 'react';

const Accessibility = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #101522 60%, #246bfd 100%)', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      background: 'rgba(24,28,42,0.92)',
      borderRadius: '32px',
      boxShadow: '0 8px 32px 0 #246bfd55, 0 1.5px 8px 0 #0008',
      backdropFilter: 'blur(12px)',
      border: '1.5px solid rgba(36,107,253,0.18)',
      padding: '48px 32px',
      maxWidth: 700,
      width: '95%',
      color: '#fff',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, color: '#52c41a', marginBottom: 16, textShadow: '0 2px 12px #246bfd88' }}>Accessibility</h1>
      <p style={{ color: '#b0e1ff', fontSize: 20, marginBottom: 24, fontWeight: 500 }}>
        At CVScanner AI, we are committed to making our platform accessible to everyone.
      </p>
      <ul style={{ color: '#b0b3c7', fontSize: 18, textAlign: 'left', maxWidth: 600, margin: '0 auto 24px auto', lineHeight: 1.7 }}>
        <li>We follow <b>WCAG 2.1</b> guidelines for color contrast, keyboard navigation, and screen reader support.</li>
        <li>All interactive elements are accessible by keyboard and have clear focus indicators.</li>
        <li>Images include descriptive <code>alt</code> text for screen readers.</li>
        <li>We regularly test our site with assistive technologies.</li>
        <li>If you encounter any accessibility barriers, please contact us at <a href="mailto:support@cvscannerai.com" style={{ color: '#246bfd' }}>support@cvscannerai.com</a>.</li>
      </ul>
      <div style={{ color: '#b0e1ff', fontSize: 16, marginTop: 24 }}>
        <b>Continuous Improvement:</b> We welcome feedback to help us improve accessibility for all users.
      </div>
    </div>
  </div>
);

export default Accessibility;
