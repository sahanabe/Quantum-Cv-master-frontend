import React from 'react';
import { Collapse, Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const faqData = [
  {
    key: '1',
    question: 'What is QuantumCV and how does it work?',
    answer: 'QuantumCV is an AI-powered platform that analyzes and optimizes your resume to help you stand out to both recruiters and automated systems. Simply upload your resume, and our AI will provide actionable feedback and suggestions.'
  },
  {
    key: '2',
    question: 'Is my data and resume secure with QuantumCV?',
    answer: 'Yes! We take your privacy seriously. Your resume and personal data are encrypted and never shared with third parties without your consent.'
  },
  {
    key: '3',
    question: 'How do I get the best results from the AI resume optimizer?',
    answer: 'For best results, upload your most recent resume in PDF or DOCX format. The more detailed and up-to-date your information, the more personalized and effective the AI feedback will be.'
  },
  {
    key: '4',
    question: 'Can QuantumCV help me tailor my resume for specific jobs?',
    answer: 'Absolutely! You can specify the type of job or industry you are targeting, and our AI will suggest optimizations to match your resume to those roles.'
  },
  {
    key: '5',
    question: 'Is there a free version of QuantumCV?',
    answer: 'Yes, QuantumCV offers a free tier with basic resume analysis. Premium features, such as advanced optimization and job-matching, are available with a subscription.'
  }
];

const FAQSection = () => (
  <div style={{ margin: '48px 0', position: 'relative' }}>
    {/* 3D Background removed as requested */}
    <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 1 }}>Frequently Asked Questions — Quantum Cv Lens</Title>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: 1, minWidth: 320, maxWidth: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Robot and Human with Resume Image */}
        <div style={{
          background: 'transparent',
          borderRadius: 20,
          boxShadow: 'none',
          padding: 0,
          margin: '32px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 320,
        }}>
          <img
            src={process.env.PUBLIC_URL + '/robot-human-resume.png'}
            alt="Robot and Human with Resume"
            style={{ maxWidth: '100%', maxHeight: 320, width: 'auto', height: '320px', objectFit: 'contain', borderRadius: 0, background: 'transparent' }}
          />
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 320, maxWidth: 600 }}>
        <Collapse
          accordion
          bordered={false}
          style={{ background: '#181c2a', color: '#fff' }}
          items={faqData.map(item => ({
            key: item.key,
            label: item.question.replace(/QuantumCV/gi, 'Quantum Cv Lens'),
            children: <Paragraph style={{ color: '#b0b3c7' }}>{item.answer.replace(/QuantumCV/gi, 'Quantum Cv Lens')}</Paragraph>,
            style: { color: '#fff' }
          }))}
        />
      </div>
    </div>

    {/* Creative Join Us Section */}
    <div style={{
      margin: '48px auto 0',
      maxWidth: 700,
      background: 'linear-gradient(90deg, #23263a 60%, #246bfd33 100%)',
      borderRadius: 24,
      boxShadow: '0 4px 32px #246bfd22',
      padding: '40px 32px',
      textAlign: 'center',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      <Title level={3} style={{ color: '#fff', marginBottom: 16, letterSpacing: 1 }}>
        Would you like to work with us or have creative ideas?
      </Title>
      <Paragraph style={{ color: '#b0b3c7', fontSize: 18, marginBottom: 32 }}>
        At QuantumCV, we believe in the power of innovation and collaboration. If you have fresh ideas, a passion for technology, or want to help shape the future of AI-driven career tools, we want to hear from you! Whether you're a developer, designer, recruiter, or just someone with a vision—let's build something amazing together.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        style={{
          background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)',
          border: 'none',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 18,
          padding: '10px 36px',
          boxShadow: '0 2px 12px #246bfd55',
          transition: 'background 0.2s',
        }}
        onClick={() => window.open('mailto:careers@quantumcv.com?subject=I want to join QuantumCV!')}
      >
        Hire Me Now
      </Button>
      <div style={{
        position: 'absolute',
        right: -60,
        bottom: -40,
        opacity: 0.12,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <img src={process.env.PUBLIC_URL + '/Flux_Dev_A_friendly_robot_and_a_-removebg-preview.png'} alt="Creative Robot" style={{ maxWidth: 260 }} />
      </div>
    </div>
  </div>
);

export default FAQSection;
