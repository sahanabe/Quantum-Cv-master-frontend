import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography, Button, Form, Input, Row, Col, Alert, message } from 'antd';
import { CreditCardFilled, CheckCircleTwoTone, LockFilled, ThunderboltFilled } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const plans = {
  lite: {
    name: 'Lite',
    price: 9,
    features: [
      'Unlimited Resume Uploads',
      'Full Cover Letter Generator',
      'LinkedIn Review',
      'Advanced ATS Analysis',
      'Job Scan & Tracking',
      'Priority Support',
    ],
    color: '#246bfd',
  },
  pro: {
    name: 'Pro',
    price: 19,
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
    color: '#ffe066',
  },
};

export default function Payment() {
  const location = useLocation();
  // Get ?plan=lite or ?plan=pro from URL
  function getPlanFromQuery() {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan === 'pro' || plan === 'lite') return plan;
    return 'lite';
  }
  const [selectedPlan, setSelectedPlan] = useState(getPlanFromQuery());

  useEffect(() => {
    setSelectedPlan(getPlanFromQuery());
    // eslint-disable-next-line
  }, [location.search]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePlanChange = plan => setSelectedPlan(plan);

  const handleFinish = values => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      message.success('Payment successful! Welcome to Quantum CV ' + plans[selectedPlan].name + ' plan.');
    }, 1800);
  };

  const plan = plans[selectedPlan];

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 60% 40%, #101522 60%, #246bfd 100%)', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        background: 'rgba(24,28,42,0.96)',
        borderRadius: '32px',
        boxShadow: '0 8px 32px 0 #246bfd55, 0 1.5px 8px 0 #0008',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(36,107,253,0.18)',
        padding: '48px 32px',
        maxWidth: 600,
        width: '97%',
        color: '#fff',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <ThunderboltFilled style={{ fontSize: 54, color: '#ffe066', filter: 'drop-shadow(0 2px 16px #246bfd88)' }} spin />
        <Title style={{ color: '#fff', fontWeight: 900, margin: '16px 0 0 0', letterSpacing: 2 }}>Upgrade Your Plan</Title>
        <Paragraph style={{ color: '#b0e1ff', fontSize: 20, margin: '16px 0 32px 0', fontWeight: 500 }}>
          Secure payment. Instant access. <LockFilled style={{ color: '#52c41a', marginLeft: 8 }} />
        </Paragraph>
        <Row gutter={16} justify="center" style={{ marginBottom: 32 }}>
          {Object.keys(plans).map(p => (
            <Col key={p}>
              <Button
                type={selectedPlan === p ? 'primary' : 'default'}
                style={{
                  borderRadius: 16,
                  fontWeight: 700,
                  fontSize: 18,
                  background: selectedPlan === p ? plans[p].color : undefined,
                  color: selectedPlan === p ? (p === 'pro' ? '#181c2a' : '#fff') : undefined,
                  border: selectedPlan === p ? '2px solid #ffe066' : undefined,
                  marginRight: 8,
                  marginBottom: 8,
                  minWidth: 120,
                }}
                onClick={() => handlePlanChange(p)}
              >
                {plans[p].name}
              </Button>
            </Col>
          ))}
        </Row>
        <Card variant="outlined" styles={{ body: { background: '#23263a', color: '#fff', borderRadius: 18, marginBottom: 32 } }}>
          <Title level={4} style={{ color: plan.color, fontWeight: 800, marginBottom: 0 }}>{plan.name} Plan</Title>
          <Paragraph style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 16px 0', color: plan.color }}>${plan.price}/mo</Paragraph>
          <ul style={{ textAlign: 'left', color: '#fff', fontSize: 16, margin: '0 auto', maxWidth: 340, padding: 0, listStyle: 'none' }}>
            {plan.features.map(f => (
              <li key={f} style={{ marginBottom: 8 }}><CheckCircleTwoTone twoToneColor={plan.color} style={{ marginRight: 8 }} />{f}</li>
            ))}
          </ul>
        </Card>
        {success ? (
          <Alert
            message={<span>Payment successful! <CheckCircleTwoTone twoToneColor="#52c41a" /> <br />You now have access to all {plan.name} features.</span>}
            type="success"
            showIcon
            style={{ margin: '24px 0', fontSize: 18 }}
          />
        ) : (
          <>
            {/* Payment Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <Button
                block
                style={{
                  background: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 12,
                  border: '2px solid #4285f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Pay" style={{ width: 24, height: 24 }} />}
                onClick={() => message.info('Google Pay demo: Payment successful!')}
              >
                Pay with Google Pay
              </Button>
              <Button
                block
                style={{
                  background: '#232f3e',
                  color: '#ff9900',
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 12,
                  border: '2px solid #ff9900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Pay" style={{ width: 32, height: 18, marginRight: 2 }} />}
                onClick={() => message.info('Amazon Pay demo: Payment successful!')}
              >
                Pay with Amazon Pay
              </Button>
            </div>
            <div style={{ margin: '16px 0', color: '#b0e1ff', fontWeight: 500 }}>or pay with credit/debit card</div>
            <Form layout="vertical" onFinish={handleFinish} style={{ marginTop: 8, maxWidth: 400, margin: '0 auto' }}>
              <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true, message: 'Enter your card number' }]}> <Input prefix={<CreditCardFilled />} maxLength={19} placeholder="1234 5678 9012 3456" autoComplete="cc-number" /> </Form.Item>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="expiry" label="Expiry" rules={[{ required: true, message: 'MM/YY' }]}> <Input placeholder="MM/YY" maxLength={5} autoComplete="cc-exp" /> </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="cvc" label="CVC" rules={[{ required: true, message: 'CVC' }]}> <Input placeholder="CVC" maxLength={4} autoComplete="cc-csc" /> </Form.Item>
                </Col>
              </Row>
              <Form.Item name="name" label="Name on Card" rules={[{ required: true, message: 'Enter name on card' }]}> <Input placeholder="Full Name" autoComplete="cc-name" /> </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block style={{ borderRadius: 16, fontWeight: 700, fontSize: 18, marginTop: 8, background: plan.color, color: plan.name === 'Pro' ? '#181c2a' : '#fff' }}>
                Pay ${plan.price} & Upgrade
              </Button>
            </Form>
          </>
        )}
        <Paragraph style={{ color: '#b0e1ff', fontSize: 15, marginTop: 32 }}>
          <LockFilled style={{ color: '#52c41a', marginRight: 6 }} /> 100% secure payment. Cancel anytime.
        </Paragraph>
      </div>
    </div>
  );
}
