import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Typography, Tabs, Input, Select, 
  Table, Tag, Space, Modal, Form, Switch, Alert, Divider
} from 'antd';
import {
  ApiOutlined, KeyOutlined, CodeOutlined, LinkOutlined,
  CopyOutlined, SettingOutlined, CheckCircleOutlined, PlayCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const APIIntegration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'pk_live_12345...', status: 'Active', created: '2024-01-15' },
    { id: 2, name: 'Development API', key: 'pk_test_67890...', status: 'Active', created: '2024-02-01' }
  ]);
  const canvasRef = useRef(null);

  const endpoints = [
    { method: 'POST', endpoint: '/api/v1/resumes/analyze', description: 'Analyze resume content' },
    { method: 'GET', endpoint: '/api/v1/candidates', description: 'Retrieve candidate data' },
    { method: 'POST', endpoint: '/api/v1/jobs/match', description: 'Match candidates to jobs' },
    { method: 'GET', endpoint: '/api/v1/analytics/reports', description: 'Get analytics reports' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        color: '#74B9FF'
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
            <ApiOutlined style={{ 
              fontSize: '80px', 
              color: '#74B9FF', 
              marginBottom: '32px' 
            }} />

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #74B9FF, #0984E3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              API Integration
            </Title>

            <Text style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'block',
              marginBottom: '40px'
            }}>
              Powerful RESTful API for seamless integration with your existing 
              HR systems and custom applications.
            </Text>
          </div>

          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px'
          }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                {
                  key: 'overview',
                  label: 'API Overview',
                  children: (
                    <div style={{ padding: '20px' }}>
                      <Row gutter={[24, 24]}>
                        <Col xs={24} lg={12}>
                          <Card style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px'
                          }}>
                            <Title level={4} style={{ color: '#fff' }}>Quick Start</Title>
                            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              Get started with our RESTful API in minutes. Use your API key to authenticate 
                              and start processing resumes programmatically.
                            </Paragraph>
                            <div style={{ 
                              background: '#1a1a1a', 
                              padding: '16px', 
                              borderRadius: '8px',
                              marginBottom: '16px'
                            }}>
                              <Text code style={{ color: '#00ff00' }}>
                                {`curl -X POST "https://api.quantumcv.com/v1/resumes/analyze" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@resume.pdf"`}
                              </Text>
                            </div>
                            <Button 
                              type="primary" 
                              icon={<CopyOutlined />}
                              style={{
                                background: 'linear-gradient(135deg, #74B9FF, #0984E3)',
                                border: 'none'
                              }}
                            >
                              Copy Example
                            </Button>
                          </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                          <Card style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px'
                          }}>
                            <Title level={4} style={{ color: '#fff' }}>Available Endpoints</Title>
                            <div>
                              {endpoints.map((endpoint, index) => (
                                <div key={index} style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  padding: '12px 0',
                                  borderBottom: index < endpoints.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                                }}>
                                  <div>
                                    <Tag color={endpoint.method === 'GET' ? 'green' : 'blue'}>
                                      {endpoint.method}
                                    </Tag>
                                    <Text code style={{ color: '#fff', marginLeft: '8px' }}>
                                      {endpoint.endpoint}
                                    </Text>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  )
                },
                {
                  key: 'authentication',
                  label: 'API Keys',
                  children: (
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <Title level={4} style={{ color: '#fff' }}>API Keys</Title>
                        <Button 
                          type="primary"
                          icon={<KeyOutlined />}
                          style={{
                            background: 'linear-gradient(135deg, #74B9FF, #0984E3)',
                            border: 'none'
                          }}
                        >
                          Generate New Key
                        </Button>
                      </div>
                      
                      <Table
                        dataSource={apiKeys}
                        columns={[
                          {
                            title: 'Name',
                            dataIndex: 'name',
                            render: (text) => <span style={{ color: '#fff' }}>{text}</span>
                          },
                          {
                            title: 'API Key',
                            dataIndex: 'key',
                            render: (key) => (
                              <Space>
                                <Text code style={{ color: '#74B9FF' }}>{key}</Text>
                                <Button size="small" icon={<CopyOutlined />} />
                              </Space>
                            )
                          },
                          {
                            title: 'Status',
                            dataIndex: 'status',
                            render: (status) => (
                              <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
                            )
                          },
                          {
                            title: 'Created',
                            dataIndex: 'created',
                            render: (date) => <span style={{ color: 'rgba(255,255,255,0.7)' }}>{date}</span>
                          }
                        ]}
                        style={{ background: 'transparent' }}
                      />
                    </div>
                  )
                },
                {
                  key: 'documentation',
                  label: 'Documentation',
                  children: (
                    <div style={{ padding: '20px' }}>
                      <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                        API Documentation
                      </Title>
                      
                      <Card style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        marginBottom: '24px'
                      }}>
                        <Title level={5} style={{ color: '#fff' }}>Resume Analysis Endpoint</Title>
                        <div style={{ marginBottom: '16px' }}>
                          <Tag color="blue">POST</Tag>
                          <Text code style={{ color: '#74B9FF', marginLeft: '8px' }}>
                            /api/v1/resumes/analyze
                          </Text>
                        </div>
                        
                        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Analyze resume content and extract structured data including skills, 
                          experience, education, and ATS compatibility score.
                        </Paragraph>
                        
                        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                        
                        <Title level={6} style={{ color: '#fff' }}>Request Parameters</Title>
                        <div style={{ 
                          background: '#1a1a1a', 
                          padding: '16px', 
                          borderRadius: '8px',
                          marginBottom: '16px'
                        }}>
                          <Text code style={{ color: '#00ff00' }}>
                            {`{
  "file": "resume.pdf",        // Required: Resume file (PDF/DOC/DOCX)
  "job_description": "...",    // Optional: Target job description
  "analysis_type": "full"      // Optional: 'basic' | 'full' | 'ats'
}`}
                          </Text>
                        </div>
                        
                        <Title level={6} style={{ color: '#fff' }}>Response</Title>
                        <div style={{ 
                          background: '#1a1a1a', 
                          padding: '16px', 
                          borderRadius: '8px'
                        }}>
                          <Text code style={{ color: '#00ff00' }}>
                            {`{
  "success": true,
  "data": {
    "overall_score": 85,
    "ats_compatibility": 92,
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "5 years",
    "recommendations": [...]
  }
}`}
                          </Text>
                        </div>
                      </Card>
                      
                      <Button 
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        size="large"
                        style={{
                          background: 'linear-gradient(135deg, #74B9FF, #0984E3)',
                          border: 'none'
                        }}
                      >
                        Try in API Explorer
                      </Button>
                    </div>
                  )
                }
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default APIIntegration; 