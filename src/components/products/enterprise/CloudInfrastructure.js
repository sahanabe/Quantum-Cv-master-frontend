import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Typography, Statistic, Progress, 
  Timeline, List, Tag, Space, Alert, Tooltip
} from 'antd';
import {
  CloudOutlined, GlobalOutlined, DatabaseOutlined, ThunderboltFilled,
  CheckCircleOutlined, BarChartOutlined, SafetyOutlined, RocketOutlined,
  ClusterOutlined, MonitorOutlined, ApiOutlined, LockOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const CloudInfrastructure = () => {
  const [systemStatus, setSystemStatus] = useState('operational');
  const [uptime, setUptime] = useState(99.97);
  const canvasRef = useRef(null);

  const infrastructureMetrics = [
    { name: 'Load Balancers', status: 'operational', uptime: 100, region: 'Global' },
    { name: 'Database Clusters', status: 'operational', uptime: 99.98, region: 'Multi-Region' },
    { name: 'API Gateways', status: 'operational', uptime: 99.95, region: 'Global' },
    { name: 'CDN Network', status: 'operational', uptime: 99.99, region: 'Worldwide' }
  ];

  const regions = [
    { name: 'US East (N. Virginia)', code: 'us-east-1', status: 'active', latency: '12ms' },
    { name: 'US West (Oregon)', code: 'us-west-2', status: 'active', latency: '8ms' },
    { name: 'Europe (Ireland)', code: 'eu-west-1', status: 'active', latency: '15ms' },
    { name: 'Asia Pacific (Singapore)', code: 'ap-southeast-1', status: 'active', latency: '22ms' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: '#81ECEC'
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
            <CloudOutlined style={{ 
              fontSize: '80px', 
              color: '#81ECEC', 
              marginBottom: '32px' 
            }} />

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #81ECEC, #74B9FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Cloud Infrastructure
            </Title>

            <Text style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'block',
              marginBottom: '40px'
            }}>
              Enterprise-grade cloud infrastructure with 99.9% uptime guarantee 
              and global scale capabilities.
            </Text>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Current Uptime</span>}
                  value={uptime}
                  suffix="%"
                  precision={2}
                  valueStyle={{ color: '#81ECEC', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Global Regions</span>}
                  value={12}
                  valueStyle={{ color: '#74B9FF', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Data Centers</span>}
                  value={24}
                  valueStyle={{ color: '#00B894', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Processing Power</span>}
                  value={500}
                  suffix="+ cores"
                  valueStyle={{ color: '#FDCB6E', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* System Status */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Title level={3} style={{ color: '#fff', margin: 0 }}>
                System Status
              </Title>
              <Tag color="green" style={{ padding: '4px 12px', fontSize: '14px' }}>
                All Systems Operational
              </Tag>
            </div>
            
            <List
              dataSource={infrastructureMetrics}
              renderItem={(metric) => (
                <List.Item style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  margin: '12px 0',
                  padding: '20px',
                  border: 'none'
                }}>
                  <Row style={{ width: '100%' }} align="middle">
                    <Col span={6}>
                      <Space>
                        <CheckCircleOutlined style={{ color: '#00B894', fontSize: '20px' }} />
                        <Text style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                          {metric.name}
                        </Text>
                      </Space>
                    </Col>
                    <Col span={6}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {metric.region}
                      </Text>
                    </Col>
                    <Col span={8}>
                      <Progress 
                        percent={metric.uptime} 
                        strokeColor="#00B894"
                        trailColor="rgba(255, 255, 255, 0.1)"
                        size="small"
                        format={(percent) => `${percent}% uptime`}
                      />
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                      <Tag color="green">Operational</Tag>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card>

          <Row gutter={[32, 32]} style={{ marginBottom: '40px' }}>
            <Col xs={24} lg={12}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '400px'
              }}>
                <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>
                  Global Regions
                </Title>
                
                <List
                  dataSource={regions}
                  renderItem={(region) => (
                    <List.Item style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      margin: '8px 0',
                      padding: '16px',
                      border: 'none'
                    }}>
                      <Row style={{ width: '100%' }} align="middle">
                        <Col span={12}>
                          <div>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                              {region.name}
                            </Text>
                            <br />
                            <Text code style={{ color: '#81ECEC', fontSize: '12px' }}>
                              {region.code}
                            </Text>
                          </div>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                          <Tag color="green">{region.status}</Tag>
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                          <Text style={{ color: '#FDCB6E', fontWeight: 'bold' }}>
                            {region.latency}
                          </Text>
                        </Col>
                      </Row>
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
                height: '400px'
              }}>
                <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>
                  Performance Metrics
                </Title>
                
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>CPU Usage</Text>
                      <Text style={{ color: '#00B894' }}>23%</Text>
                    </div>
                    <Progress percent={23} strokeColor="#00B894" trailColor="rgba(255, 255, 255, 0.1)" />
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Memory Usage</Text>
                      <Text style={{ color: '#74B9FF' }}>45%</Text>
                    </div>
                    <Progress percent={45} strokeColor="#74B9FF" trailColor="rgba(255, 255, 255, 0.1)" />
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Network I/O</Text>
                      <Text style={{ color: '#FDCB6E' }}>67%</Text>
                    </div>
                    <Progress percent={67} strokeColor="#FDCB6E" trailColor="rgba(255, 255, 255, 0.1)" />
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Storage Usage</Text>
                      <Text style={{ color: '#FF7675' }}>34%</Text>
                    </div>
                    <Progress percent={34} strokeColor="#FF7675" trailColor="rgba(255, 255, 255, 0.1)" />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Infrastructure Features */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px'
          }}>
            <Title level={3} style={{ color: '#fff', marginBottom: '32px', textAlign: 'center' }}>
              Infrastructure Features
            </Title>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <RocketOutlined style={{ fontSize: '48px', color: '#81ECEC', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Auto Scaling</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Automatic horizontal and vertical scaling based on demand 
                    to ensure optimal performance.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <ClusterOutlined style={{ fontSize: '48px', color: '#74B9FF', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Load Balancing</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Intelligent load distribution across multiple servers 
                    for maximum availability.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <MonitorOutlined style={{ fontSize: '48px', color: '#00B894', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>24/7 Monitoring</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Continuous monitoring with real-time alerts and 
                    automated failover mechanisms.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <DatabaseOutlined style={{ fontSize: '48px', color: '#FDCB6E', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Data Backup</Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Automated daily backups with point-in-time recovery 
                    and cross-region replication.
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

export default CloudInfrastructure; 