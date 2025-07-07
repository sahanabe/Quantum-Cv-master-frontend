
import React from 'react';
import { Card, Row, Col, Typography, Button, Tag, List } from 'antd';
import { CheckCircleTwoTone, StarFilled, ThunderboltFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const plans = [
  {
    name: 'Free',
    price: 'Free',
    color: '#52c41a',
    features: [
      'AI Resume Scoring (basic)',
      'Cover Letter Generator (limited)',
      'Access to Resume Templates',
      'Basic ATS Analysis',
      '1 Resume Upload',
      'Community Support',
    ],
    cta: 'Start for Free',
    highlight: false,
  },
  {
    name: 'Lite',
    price: '$9/mo',
    color: '#246bfd',
    features: [
      'Everything in Free',
      'Unlimited Resume Uploads',
      'Full Cover Letter Generator',
      'LinkedIn Review',
      'Advanced ATS Analysis',
      'Job Scan & Tracking',
      'Priority Support',
    ],
    cta: 'Upgrade to Lite',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19/mo',
    color: '#ffe066',
    features: [
      'Everything in Lite',
      'Text to CV Generator (unlimited)',
      'Image Background Remover (unlimited)',
      'Role Template Library (full access)',
      'AI-Powered Job Fit Scoring',
      'Advanced Resume Analytics',
      'Priority AI Support',
      'Early Access to New Features',
      '1:1 Expert Review (quarterly)',
      'Enterprise Dashboard',
    ],
    cta: 'Go Pro',
    highlight: true,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  const handleUpgrade = (plan) => {
    navigate(`/payment?plan=${plan}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 60% 40%, #101522 60%, #246bfd 100%)', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
    {/* Animated background sparkles */}
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      background: 'radial-gradient(circle at 80% 20%, #ffe06633 0%, transparent 60%), radial-gradient(circle at 20% 80%, #52c41a33 0%, transparent 60%)',
      animation: 'pricingBgAnim 8s linear infinite alternate',
    }} />
    <style>{`
      @keyframes pricingBgAnim {
        0% { filter: blur(0px); }
        100% { filter: blur(8px); }
      }
      .plan-card:hover { transform: scale(1.045) rotate(-1deg); box-shadow: 0 12px 48px #246bfd55; }
      .plan-card-pro { box-shadow: 0 12px 48px #ffe06699, 0 2px 16px #246bfd22; border: 3px solid #ffe066; }
    `}</style>
    <div style={{
      background: 'rgba(24,28,42,0.96)',
      borderRadius: '32px',
      boxShadow: '0 8px 32px 0 #246bfd55, 0 1.5px 8px 0 #0008',
      backdropFilter: 'blur(12px)',
      border: '1.5px solid rgba(36,107,253,0.18)',
      padding: '48px 32px',
      maxWidth: 1200,
      width: '97%',
      color: '#fff',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      <ThunderboltFilled style={{ fontSize: 64, color: '#ffe066', filter: 'drop-shadow(0 2px 16px #246bfd88)' }} spin />
      <Title style={{ color: '#fff', fontWeight: 900, margin: '16px 0 0 0', letterSpacing: 2, fontSize: 44, textShadow: '0 2px 16px #246bfd55' }}>Choose Your Quantum CV Plan</Title>
      <Paragraph style={{ color: '#b0e1ff', fontSize: 22, margin: '16px 0 32px 0', fontWeight: 500, textShadow: '0 1px 8px #246bfd22' }}>
        <span style={{ color: '#ffe066', fontWeight: 700 }}>Unlock your career potential.</span> Start free, upgrade anytime.<br/>
        <Tag color="#ffe066" style={{ color: '#181c2a', fontWeight: 700, borderRadius: 8, marginLeft: 6, fontSize: 16 }}>No credit card required</Tag>
      </Paragraph>
      <Row gutter={[32, 32]} justify="center" style={{ marginTop: 16 }}>
        {plans.map(plan => (
          <Col xs={24} sm={12} md={8} key={plan.name}>
            <Card
              bordered={false}
              className={`plan-card${plan.highlight ? ' plan-card-pro' : ''}`}
              style={{
                borderRadius: 28,
                background: plan.highlight ? 'linear-gradient(120deg, #ffe066 0%, #246bfd 100%)' : 'linear-gradient(120deg, #23263a 60%, #181c2a 100%)',
                color: plan.highlight ? '#181c2a' : '#fff',
                minHeight: 440,
                marginTop: plan.highlight ? -32 : 0,
                zIndex: plan.highlight ? 2 : 1,
                position: 'relative',
                textAlign: 'center',
                border: plan.highlight ? '3px solid #ffe066' : 'none',
                transition: 'transform 0.2s',
                boxShadow: plan.highlight ? '0 12px 48px #ffe06699, 0 2px 16px #246bfd22' : '0 2px 16px #246bfd22',
                overflow: 'hidden',
              }}
              styles={{ body: { padding: 36 } }}
            >
              <div style={{ fontSize: 44, marginBottom: 8, marginTop: 8 }}>
                {plan.highlight ? <StarFilled style={{ color: '#246bfd', fontSize: 44, filter: 'drop-shadow(0 2px 8px #246bfd55)' }} /> : <CheckCircleTwoTone twoToneColor={plan.color} style={{ fontSize: 38 }} />}
              </div>
              <Title level={3} style={{ color: plan.highlight ? '#246bfd' : plan.color, fontWeight: 900, marginBottom: 0, letterSpacing: 1 }}>{plan.name}</Title>
              <Paragraph style={{ fontSize: 32, fontWeight: 700, margin: '8px 0 18px 0', color: plan.highlight ? '#181c2a' : plan.color }}>{plan.price}</Paragraph>
              <List
                dataSource={plan.features}
                renderItem={item => (
                  <List.Item style={{ color: plan.highlight ? '#fff' : '#fff', fontSize: 17, border: 'none', padding: '6px 0', background: 'none' }}>
                    <CheckCircleTwoTone twoToneColor={plan.highlight ? '#246bfd' : plan.color} style={{ marginRight: 10, fontSize: 20 }} /> {item}
                  </List.Item>
                )}
                style={{ marginBottom: 22, background: 'none' }}
              />
              {plan.name === 'Lite' && (
                <Button type="primary" size="large" style={{ borderRadius: 18, fontWeight: 700, width: '100%', background: '#246bfd', color: '#fff', marginTop: 8, fontSize: 18, boxShadow: '0 2px 16px #246bfd55' }} onClick={() => handleUpgrade('lite')}>
                  {plan.cta}
                </Button>
              )}
              {plan.name === 'Pro' && (
                <Button type="primary" size="large" style={{ borderRadius: 18, fontWeight: 700, width: '100%', background: '#ffe066', color: '#181c2a', marginTop: 8, fontSize: 18, boxShadow: '0 2px 16px #ffe06655' }} onClick={() => handleUpgrade('pro')}>
                  {plan.cta}
                </Button>
              )}
              {plan.name === 'Free' && (
                <Button type="default" size="large" style={{ borderRadius: 18, fontWeight: 700, width: '100%', marginTop: 8, fontSize: 18 }}>
                  {plan.cta}
                </Button>
              )}
              {plan.highlight && <Tag color="#246bfd" style={{ color: '#fff', fontWeight: 700, borderRadius: 8, marginTop: 14, fontSize: 15, letterSpacing: 1 }}>Most Popular</Tag>}
            </Card>
          </Col>
        ))}
      </Row>
      {/* Decorative bottom wave */}
      <svg width="100%" height="60" viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 48 }}>
        <path d="M0 30 Q300 60 600 30 T1200 30 V60 H0 V30 Z" fill="#246bfd" fillOpacity="0.12" />
      </svg>
    </div>
    {/* Call to action below cards */}
    <div style={{ marginTop: 32, textAlign: 'center', zIndex: 2 }}>
      <Title level={4} style={{ color: '#ffe066', fontWeight: 800, marginBottom: 8, textShadow: '0 2px 8px #246bfd55' }}>Not sure which plan is right for you?</Title>
      <Paragraph style={{ color: '#fff', fontSize: 18, marginBottom: 0 }}>Start with <b>Free</b> and upgrade anytime. <span style={{ color: '#52c41a' }}>No risk, just results!</span></Paragraph>
    </div>
  </div>
  );
}

export default Pricing;
