import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Row, Col, Typography, Statistic, Upload, Avatar, Rate, Progress } from 'antd';
import { UserOutlined, CameraOutlined, EditOutlined, StarFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ProfessionalBranding = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? '#FF6B6B' : '#FFD93D'
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
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

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
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
              borderRadius: '50%',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)'
            }}>
              <UserOutlined style={{ fontSize: '60px', color: '#fff' }} />
            </div>

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              margin: '0 0 24px 0',
              background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Professional Branding
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Build a powerful professional brand that stands out. Increase your profile views 
              by 5x with AI-optimized personal branding strategies.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Profile Views</span>}
                  value={5}
                  suffix="x"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Brand Score</span>}
                  value={95}
                  suffix="%"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Network Growth</span>}
                  value={300}
                  suffix="%"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Opportunities</span>}
                  value={85}
                  suffix="%"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ color: '#fff', marginBottom: '40px' }}>
              Build Your Professional Brand
            </Title>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '40px'
            }}>
              <Avatar size={120} icon={<UserOutlined />} style={{ marginBottom: '24px' }} />
              <Upload>
                <Button icon={<CameraOutlined />} style={{
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  border: 'none',
                  color: '#fff'
                }}>
                  Upload Professional Photo
                </Button>
              </Upload>
            </div>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <Card style={{
                  background: 'rgba(255, 107, 107, 0.1)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  borderRadius: '16px',
                  height: '200px'
                }}>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <EditOutlined style={{ fontSize: '40px', color: '#FF6B6B', marginBottom: '16px' }} />
                    <Title level={4} style={{ color: '#fff' }}>LinkedIn Optimization</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Optimize your LinkedIn profile for maximum visibility
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card style={{
                  background: 'rgba(255, 217, 61, 0.1)',
                  border: '1px solid rgba(255, 217, 61, 0.3)',
                  borderRadius: '16px',
                  height: '200px'
                }}>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <StarFilled style={{ fontSize: '40px', color: '#FFD93D', marginBottom: '16px' }} />
                    <Title level={4} style={{ color: '#fff' }}>Personal Brand</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Craft compelling personal brand messaging
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card style={{
                  background: 'rgba(78, 205, 196, 0.1)',
                  border: '1px solid rgba(78, 205, 196, 0.3)',
                  borderRadius: '16px',
                  height: '200px'
                }}>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <UserOutlined style={{ fontSize: '40px', color: '#4ECDC4', marginBottom: '16px' }} />
                    <Title level={4} style={{ color: '#fff' }}>Portfolio Building</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Create stunning professional portfolios
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>

            <Button
              type="primary"
              size="large"
              style={{
                borderRadius: '25px',
                padding: '12px 48px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
                border: 'none',
                marginTop: '40px'
              }}
            >
              Start Building Your Brand
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBranding; 