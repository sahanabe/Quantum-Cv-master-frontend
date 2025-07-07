import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const partnerLogos = [
  { name: 'Microsoft', src: process.env.PUBLIC_URL + '/partner-microsoft.png' },
  { name: 'Google', src: process.env.PUBLIC_URL + '/partner-google.png' },
  { name: 'Amazon', src: process.env.PUBLIC_URL + '/partner-amazon.png' },
  { name: 'Meta', src: process.env.PUBLIC_URL + '/partner-meta.png' },
  { name: 'Tesla', src: process.env.PUBLIC_URL + '/partner-tesla.png' },
];

const PartnerCompanies = () => (
  <div style={{ margin: '48px 0', textAlign: 'center' }}>
    <Title level={3} style={{ color: '#fff', marginBottom: 32, letterSpacing: 1 }}>
      Our Valuable Partner Companies — Quantum Cv Lens
    </Title>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
      {partnerLogos.map(logo => (
        <div key={logo.name} style={{ background: '#23263a', borderRadius: 16, padding: 18, margin: 8, minWidth: 120, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px #246bfd22' }}>
          <img
            src={logo.src}
            alt={logo.name}
            style={{ maxWidth: 100, maxHeight: 48, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default PartnerCompanies;
