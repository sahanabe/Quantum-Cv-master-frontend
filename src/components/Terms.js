

import React, { useEffect } from 'react';
import { Typography, Card } from 'antd';
const { Title, Paragraph } = Typography;

const Terms = () => {
  useEffect(() => {
    sessionStorage.setItem('lastPage', 'terms');
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <Card style={{ borderRadius: 16, background: '#181c2a', color: '#fff' }}>
        <Title level={2} style={{ color: '#246bfd', fontWeight: 900, letterSpacing: 1, marginBottom: 24 }}>Terms and Conditions</Title>
        <Paragraph style={{ color: '#b0b3c7', fontSize: 17, marginBottom: 24 }}>
          Welcome to Quantum CV! By accessing or using our website and services, you agree to be bound by the following terms and conditions. Please read them carefully.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>1. Acceptance of Terms</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          By using Quantum CV, you agree to comply with and be legally bound by these terms. If you do not agree, please do not use our services.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>2. Use of Services</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          You may use our services for personal, non-commercial purposes only. You agree not to misuse the platform or attempt to access it in unauthorized ways.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>3. Intellectual Property</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          All content, trademarks, and data on this site, including but not limited to software, databases, text, graphics, icons, and hyperlinks are the property of Quantum CV or its licensors.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>4. Privacy</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>5. Limitation of Liability</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          Quantum CV is not liable for any damages or losses resulting from your use of our services. All services are provided "as is" without warranties of any kind.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>6. Changes to Terms</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          We may update these terms from time to time. Continued use of the service constitutes acceptance of the new terms.
        </Paragraph>
        <Title level={4} style={{ color: '#52c41a', marginTop: 24 }}>7. Contact</Title>
        <Paragraph style={{ color: '#b0b3c7' }}>
          If you have any questions about these terms, please contact us at info@quantumcv.com.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Terms;
