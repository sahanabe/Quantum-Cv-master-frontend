import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Typography, Statistic, Select, DatePicker,
  Table, Progress, List, Tag, Space, Tabs
} from 'antd';
import {
  BarChartOutlined, LineChartOutlined, PieChartOutlined, TrophyOutlined,
  UserOutlined, ClockCircleOutlined, DollarOutlined, TeamOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const canvasRef = useRef(null);

  const mockData = {
    overview: {
      totalApplications: 15420,
      hiredCandidates: 847,
      avgTimeToHire: 23,
      costPerHire: 3250
    },
    reports: [
      { name: 'Hiring Funnel Analysis', type: 'Funnel', lastRun: '2 hours ago' },
      { name: 'Source Effectiveness', type: 'Comparison', lastRun: '1 day ago' },
      { name: 'Team Performance', type: 'Performance', lastRun: '3 hours ago' }
    ]
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: '#FDCB6E'
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
            <BarChartOutlined style={{ 
              fontSize: '80px', 
              color: '#FDCB6E', 
              marginBottom: '32px' 
            }} />

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FDCB6E, #E17055)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Advanced Analytics
            </Title>

            <Text style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'block',
              marginBottom: '40px'
            }}>
              50+ comprehensive analytics reports with real-time insights 
              and data-driven hiring decisions.
            </Text>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Reports Available</span>}
                  value={50}
                  suffix="+"
                  valueStyle={{ color: '#FDCB6E', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Data Points</span>}
                  value={2.3}
                  suffix="M"
                  valueStyle={{ color: '#E17055', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Title level={3} style={{ color: '#fff', margin: 0 }}>
                Analytics Dashboard
              </Title>
              <Space>
                <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
                  <Option value="7d">Last 7 days</Option>
                  <Option value="30d">Last 30 days</Option>
                  <Option value="90d">Last 90 days</Option>
                  <Option value="1y">Last year</Option>
                </Select>
                <RangePicker />
              </Space>
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
              <Col xs={24} sm={6}>
                <Card style={{
                  background: 'rgba(0, 184, 148, 0.1)',
                  border: '1px solid rgba(0, 184, 148, 0.3)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <UserOutlined style={{ fontSize: '32px', color: '#00B894', marginBottom: '12px' }} />
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Applications</span>}
                    value={mockData.overview.totalApplications}
                    valueStyle={{ color: '#fff', fontSize: '24px' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card style={{
                  background: 'rgba(253, 203, 110, 0.1)',
                  border: '1px solid rgba(253, 203, 110, 0.3)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <TrophyOutlined style={{ fontSize: '32px', color: '#FDCB6E', marginBottom: '12px' }} />
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Hired Candidates</span>}
                    value={mockData.overview.hiredCandidates}
                    valueStyle={{ color: '#fff', fontSize: '24px' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card style={{
                  background: 'rgba(225, 112, 85, 0.1)',
                  border: '1px solid rgba(225, 112, 85, 0.3)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <ClockCircleOutlined style={{ fontSize: '32px', color: '#E17055', marginBottom: '12px' }} />
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Time to Hire</span>}
                    value={mockData.overview.avgTimeToHire}
                    suffix="days"
                    valueStyle={{ color: '#fff', fontSize: '24px' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card style={{
                  background: 'rgba(116, 185, 255, 0.1)',
                  border: '1px solid rgba(116, 185, 255, 0.3)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <DollarOutlined style={{ fontSize: '32px', color: '#74B9FF', marginBottom: '12px' }} />
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cost per Hire</span>}
                    value={mockData.overview.costPerHire}
                    prefix="$"
                    valueStyle={{ color: '#fff', fontSize: '24px' }}
                  />
                </Card>
              </Col>
            </Row>

            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              style={{ color: '#fff' }}
              items={[
                {
                  key: 'overview',
                  label: 'Overview',
                  children: (
                    <Row gutter={[24, 24]}>
                      <Col xs={24} lg={12}>
                        <Card style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          height: '300px'
                        }}>
                          <Title level={4} style={{ color: '#fff' }}>Hiring Funnel</Title>
                          <div style={{ padding: '20px 0' }}>
                            <div style={{ marginBottom: '16px' }}>
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Applications</Text>
                              <Progress percent={100} strokeColor="#00B894" />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Screening</Text>
                              <Progress percent={35} strokeColor="#FDCB6E" />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Interviews</Text>
                              <Progress percent={15} strokeColor="#E17055" />
                            </div>
                            <div>
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Offers</Text>
                              <Progress percent={5.5} strokeColor="#74B9FF" />
                            </div>
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Card style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          height: '300px'
                        }}>
                          <Title level={4} style={{ color: '#fff' }}>Top Performing Sources</Title>
                          <List
                            dataSource={[
                              { source: 'LinkedIn', candidates: 245, hires: 67 },
                              { source: 'Indeed', candidates: 189, hires: 34 },
                              { source: 'Referrals', candidates: 123, hires: 45 },
                              { source: 'Company Website', candidates: 98, hires: 23 }
                            ]}
                            renderItem={(item) => (
                              <List.Item style={{ border: 'none', padding: '8px 0' }}>
                                <div style={{ width: '100%' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#fff' }}>{item.source}</Text>
                                    <Text style={{ color: '#FDCB6E' }}>{item.hires} hires</Text>
                                  </div>
                                  <Progress 
                                    percent={Math.round((item.hires / item.candidates) * 100)} 
                                    size="small"
                                    strokeColor="#00B894"
                                    showInfo={false}
                                  />
                                </div>
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>
                    </Row>
                  )
                },
                {
                  key: 'reports',
                  label: 'Reports',
                  children: (
                    <List
                      dataSource={mockData.reports}
                      renderItem={(report) => (
                        <List.Item style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px',
                          margin: '12px 0',
                          padding: '20px'
                        }}>
                          <List.Item.Meta
                            avatar={<BarChartOutlined style={{ fontSize: '24px', color: '#FDCB6E' }} />}
                            title={<span style={{ color: '#fff' }}>{report.name}</span>}
                            description={
                              <div>
                                <Tag color="blue">{report.type}</Tag>
                                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                  Last run: {report.lastRun}
                                </Text>
                              </div>
                            }
                          />
                          <Button type="primary">View Report</Button>
                        </List.Item>
                      )}
                    />
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

export default AdvancedAnalytics; 