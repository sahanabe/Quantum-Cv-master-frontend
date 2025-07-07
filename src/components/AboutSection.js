import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const AboutSection = () => (
  <div style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto' }}>
    <Card>
      <Title level={2}>About Quantum CV</Title>
      <Paragraph>
        Quantum CV is an AI-based resume analyzer and optimizer. It evaluates your resume against specific job roles, providing feedback on formatting, keyword density, and job alignment. Our tool helps you optimize your resume for both ATS and human recruiters, increasing your chances of landing your dream job.
      </Paragraph>
    </Card>
  </div>
);

export default AboutSection;
