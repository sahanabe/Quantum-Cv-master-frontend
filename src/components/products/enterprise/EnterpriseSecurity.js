import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Typography, List, Tag, Progress, 
  Timeline, Statistic, Alert, Space, Switch
} from 'antd';
import {
  SafetyOutlined, LockOutlined, ShieldOutlined, EyeOutlined,
  CheckCircleOutlined, WarningOutlined, FileProtectOutlined,
  AuditOutlined, KeyOutlined, GlobalOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const EnterpriseSecurity = () => {
  const [securityStatus, setSecurityStatus] = useState('excellent');
  const canvasRef = useRef(null);

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'AES-256 encryption for all data in transit and at rest',
      status: 'active',
      compliance: 'SOC 2 Type II'
    },
    {
      title: 'Zero-Trust Architecture',
      description: 'Multi-factor authentication and role-based access control',
      status: 'active',
      compliance: 'ISO 27001'
    },
    {
      title: 'Data Residency Control',
      description: 'Choose where your data is stored and processed',
      status: 'active',
      compliance: 'GDPR Compliant'
    },
    {
      title: 'Audit Logging',
      description: 'Complete audit trail of all system activities',
      status: 'active',
      compliance: 'HIPAA Ready'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.3,
        color: '#00CEC9'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '100px 24px 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '60px 40px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <ShieldOutlined style={{ 
              fontSize: '80px', 
              color: '#00CEC9', 
              marginBottom: '32px' 
            }} />

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00CEC9, #00B894)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Enterprise Security
            </Title>

            <Text style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'block',
              marginBottom: '40px'
            }}>
              Bank-level security with enterprise-grade compliance and 
              data protection for your organization.
            </Text>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Security Score</span>}
                  value={99.9}
                  suffix="%"
                  valueStyle={{ color: '#00CEC9', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Uptime SLA</span>}
                  value={99.9}
                  suffix="%"
                  valueStyle={{ color: '#00B894', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
            <Col xs={24} lg={12}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '100%'
              }}>
                <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>
                  Security Features
                </Title>
                
                <List
                  dataSource={securityFeatures}
                  renderItem={(feature) => (
                    <List.Item style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      margin: '12px 0',
                      padding: '20px',
                      border: 'none'
                    }}>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#00B894', fontSize: '24px' }} />}
                        title={<span style={{ color: '#fff', fontSize: '16px' }}>{feature.title}</span>}
                        description={
                          <div>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {feature.description}
                            </Text>
                            <br />
                            <Tag color="green" style={{ marginTop: '8px' }}>
                              {feature.compliance}
                            </Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '100%'
              }}>
                <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>
                  Compliance Certifications
                </Title>
                
                <Row gutter={[16, 16]}>
                  {[
                    { name: 'SOC 2 Type II', status: 'Certified', color: '#00B894' },
                    { name: 'ISO 27001', status: 'Certified', color: '#00B894' },
                    { name: 'GDPR', status: 'Compliant', color: '#00CEC9' },
                    { name: 'HIPAA', status: 'Ready', color: '#74B9FF' },
                    { name: 'PCI DSS', status: 'Level 1', color: '#FDCB6E' },
                    { name: 'CCPA', status: 'Compliant', color: '#00CEC9' }
                  ].map((cert, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card style={{
                        background: `rgba(${cert.color === '#00B894' ? '0, 184, 148' : 
                                           cert.color === '#00CEC9' ? '0, 206, 201' :
                                           cert.color === '#74B9FF' ? '116, 185, 255' :
                                           '253, 203, 110'}, 0.1)`,
                        border: `1px solid rgba(${cert.color === '#00B894' ? '0, 184, 148' : 
                                                  cert.color === '#00CEC9' ? '0, 206, 201' :
                                                  cert.color === '#74B9FF' ? '116, 185, 255' :
                                                  '253, 203, 110'}, 0.3)`,
                        borderRadius: '12px',
                        textAlign: 'center',
                        height: '100px'
                      }}>
                        <Title level={5} style={{ color: '#fff', margin: '8px 0' }}>
                          {cert.name}
                        </Title>
                        <Tag color={cert.color}>{cert.status}</Tag>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px'
          }}>
            <Title level={3} style={{ color: '#fff', marginBottom: '32px', textAlign: 'center' }}>
              Security Infrastructure
            </Title>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center' }}>
                  <LockOutlined style={{ fontSize: '48px', color: '#00CEC9', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Data Encryption</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Military-grade AES-256 encryption for all data, both in transit 
                    and at rest, with regular key rotation.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center' }}>
                  <GlobalOutlined style={{ fontSize: '48px', color: '#00B894', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Global Infrastructure</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Data centers across multiple regions with 99.9% uptime SLA 
                    and automatic failover capabilities.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center' }}>
                  <AuditOutlined style={{ fontSize: '48px', color: '#74B9FF', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Continuous Monitoring</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    24/7 security monitoring with real-time threat detection 
                    and automated incident response.
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSecurity; 