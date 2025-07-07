import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const CountdownSection = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 186);
  targetDate.setHours(targetDate.getHours() + 22);
  targetDate.setMinutes(targetDate.getMinutes() + 0);
  targetDate.setSeconds(targetDate.getSeconds() + 45);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{ margin: '48px 0', textAlign: 'center' }}>
      <Row justify="center">
        <Col xs={24} sm={16} md={12}>
          <Card style={{ background: '#181c2a', borderRadius: 16 }}>
            <div style={{ marginTop: 32, textAlign: 'left' }}>
              <Title level={4} style={{ color: '#246bfd', marginBottom: 8 }}>Our Vision — Quantum Cv Lens</Title>
              <Text style={{ color: '#b0b3c7', fontSize: 16 }}>
                To empower every job seeker with AI-driven insights, making resume optimization accessible, effective, and tailored for the future of work, powered by Quantum Cv Lens.
              </Text>
              <Title level={4} style={{ color: '#246bfd', margin: '24px 0 8px 0' }}>Our Mission — Quantum Cv Lens</Title>
              <Text style={{ color: '#b0b3c7', fontSize: 16 }}>
                To provide intelligent, actionable feedback that helps users craft outstanding resumes, bridge the gap between talent and opportunity, and succeed in a competitive job market — with Quantum Cv Lens.
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CountdownSection;
