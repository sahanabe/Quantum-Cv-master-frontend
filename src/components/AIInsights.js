import React from 'react';

const AIInsights = () => (
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
      <h1 style={{ fontSize: 36, fontWeight: 900, color: '#246bfd', marginBottom: 16, textShadow: '0 2px 12px #246bfd88' }}>AI Insights</h1>
      <p style={{ color: '#b0e1ff', fontSize: 20, marginBottom: 24, fontWeight: 500 }}>
        Discover how AI is transforming the job search and recruitment process.
      </p>
      <ul style={{ color: '#b0b3c7', fontSize: 18, textAlign: 'left', maxWidth: 600, margin: '0 auto 24px auto', lineHeight: 1.7 }}>
        <li>AI-powered resume screening for faster hiring.</li>
        <li>Personalized job recommendations using machine learning.</li>
        <li>Automated feedback to improve your resume instantly.</li>
        <li>Trends in AI-driven recruitment and talent matching.</li>
      </ul>
    </div>
  </div>
);

export default AIInsights;
