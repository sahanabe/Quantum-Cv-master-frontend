import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const PrivacyPolicy = () => (
  <div style={{ minHeight: '100vh', background: '#101522', padding: '40px 0' }}>
    <Card style={{ maxWidth: 900, margin: '0 auto', borderRadius: 16, background: '#23263a', color: '#fff', boxShadow: '0 2px 16px #0004', padding: 32 }}>
      <Title level={2} style={{ color: '#246bfd', fontWeight: 900, marginBottom: 24 }}>Privacy Policy</Title>
      <Paragraph style={{ color: '#b0b3c7', fontSize: 16 }}>
        <b>Effective Date:</b> May 30, 2025
      </Paragraph>
      <Paragraph style={{ color: '#b0b3c7', fontSize: 16 }}>
        QuantumCV is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
      </Paragraph>
      <Title level={4} style={{ color: '#52c41a', marginTop: 32 }}>Information We Collect</Title>
      <Paragraph style={{ color: '#b0b3c7' }}>
        We may collect personal information such as your name, email address, uploaded resumes, and any other information you provide when using our services.
      </Paragraph>
      <Title level={4} style={{ color: '#52c41a', marginTop: 32 }}>How We Use Your Information</Title>
      <Paragraph style={{ color: '#b0b3c7' }}>
        We use your information to provide and improve our services, analyze resumes, communicate with you, and ensure the security of our platform. We do not sell your personal information to third parties.
      </Paragraph>
      <Title level={4} style={{ color: '#52c41a', marginTop: 32 }}>Data Security</Title>
      <Paragraph style={{ color: '#b0b3c7' }}>
        We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure.
      </Paragraph>
      <Title level={4} style={{ color: '#52c41a', marginTop: 32 }}>Your Rights</Title>
      <Paragraph style={{ color: '#b0b3c7' }}>
        You may request access to, correction of, or deletion of your personal information by contacting us. We will respond to your request in accordance with applicable laws.
      </Paragraph>
      <Title level={4} style={{ color: '#52c41a', marginTop: 32 }}>Changes to This Policy</Title>
      <Paragraph style={{ color: '#b0b3c7' }}>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
      </Paragraph>
      <Title level={4} style={{ color: '#52c41a', marginTop: 32 }}>Contact Us</Title>
      <Paragraph style={{ color: '#b0b3c7' }}>
        If you have any questions about this Privacy Policy, please contact us at support@quantumcv.com.
      </Paragraph>
    </Card>
  </div>
);

export default PrivacyPolicy;
