import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Typography, Tabs, Avatar, Badge,
  Tag, Timeline, Statistic, Modal, Form, Input, Select, Rate, Slider,
  Space, Divider, Alert, Result, Switch, Tooltip, Steps, Carousel,
  message, Spin, List, Empty, Drawer, Radio, Checkbox, DatePicker,
  Upload, Table, Collapse, Tree, Descriptions, Image
} from 'antd';
import {
  RocketOutlined, TrophyOutlined, FireOutlined, StarFilled, BulbOutlined,
  ThunderboltFilled, EyeOutlined, HeartFilled, ClockCircleOutlined,
  UserOutlined, TeamOutlined, LineChartOutlined, SafetyOutlined,
  CheckCircleOutlined, WarningOutlined, SmileOutlined, BookOutlined,
  LaptopOutlined, PhoneOutlined, MessageOutlined, CameraOutlined,
  SoundOutlined, WifiOutlined, GlobalOutlined, CalendarOutlined,
  BankOutlined, CarOutlined, MedicineBoxOutlined, ShopOutlined,
  CodeOutlined, DesignOutlined, DollarOutlined, BarChartOutlined,
  PieChartOutlined, FundOutlined, RiseOutlined, ArrowRightOutlined,
  NodeIndexOutlined, BranchesOutlined, AimOutlined, CompassOutlined,
  ExperimentOutlined, FlagOutlined, GiftOutlined, IdcardOutlined,
  InteractionOutlined, KeyOutlined, LayoutOutlined, MailOutlined,
  NumberOutlined, PartitionOutlined, QuestionCircleOutlined,
  RadarChartOutlined, ScheduleOutlined, SettingOutlined,
  SyncOutlined, UnorderedListOutlined, VerticalAlignTopOutlined,
  ZoomInOutlined, AppstoreOutlined, CloudOutlined, DatabaseOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Panel } = Collapse;

const CareerAnalysis = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [selectedRole, setSelectedRole] = useState('software-engineer');
  const [experienceLevel, setExperienceLevel] = useState(3);
  const [careerGoals, setCareerGoals] = useState([]);
  const [skillsData, setSkillsData] = useState(null);
  const [roadmapModal, setRoadmapModal] = useState(false);
  const [salaryInsights, setSalaryInsights] = useState(null);
  const [marketTrends, setMarketTrends] = useState(null);
  const [personalizedPlan, setPersonalizedPlan] = useState(null);
  const [skillGaps, setSkillGaps] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [mentorRecommendations, setMentorRecommendations] = useState([]);
  const canvasRef = useRef(null);

  // Advanced particle system with career-themed elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let mouseX = 0, mouseY = 0;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create career-themed particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFA07A'][Math.floor(Math.random() * 7)],
        pulse: Math.random() * Math.PI * 2,
        originalSize: 0,
        shape: Math.random() > 0.5 ? 'circle' : 'diamond'
      });
      particles[i].originalSize = particles[i].size;
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Enhanced mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          particle.vx += dx * 0.00008;
          particle.vy += dy * 0.00008;
          particle.size = particle.originalSize * (1 + (200 - distance) / 200);
        } else {
          particle.size = particle.originalSize;
        }
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.03;
        
        // Boundary collision with damping
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.7;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.7;
        
        // Enhanced pulsing effect
        const pulseSize = particle.size + Math.sin(particle.pulse) * 1;
        
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        } else {
          // Diamond shape
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - pulseSize);
          ctx.lineTo(particle.x + pulseSize, particle.y);
          ctx.lineTo(particle.x, particle.y + pulseSize);
          ctx.lineTo(particle.x - pulseSize, particle.y);
          ctx.closePath();
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        ctx.restore();
        
        // Connect nearby particles with gradient lines
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              );
              gradient.addColorStop(0, `${particle.color}30`);
              gradient.addColorStop(1, `${otherParticle.color}30`);
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = (120 - distance) / 120 * 2;
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Advanced Particle Background */}
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

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '40px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            background: 'rgba(255, 255, 255, 0.03)',
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
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              borderRadius: '50%',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <CompassOutlined style={{ fontSize: '60px', color: '#fff' }} />
            </div>

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              margin: '0 0 24px 0',
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              AI Career Navigator
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Discover your perfect career path with AI-powered analysis, personalized roadmaps, 
              and industry insights that adapt to your unique goals.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Career Paths</span>}
                  value={500}
                  suffix="+"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                  value={92}
                  suffix="%"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Industries</span>}
                  value={50}
                  suffix="+"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>AI Accuracy</span>}
                  value={97.5}
                  suffix="%"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Career Assessment Form */}
          <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '600px'
              }}>
                <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
                  Career Assessment
                </Title>

                <Form layout="vertical">
                  <Form.Item label={<span style={{ color: '#fff' }}>Current Industry</span>}>
                    <Select
                      value={selectedIndustry}
                      onChange={setSelectedIndustry}
                      style={{ width: '100%' }}
                      size="large"
                    >
                      <Option value="technology"><LaptopOutlined /> Technology</Option>
                      <Option value="finance"><DollarOutlined /> Finance</Option>
                      <Option value="healthcare"><MedicineBoxOutlined /> Healthcare</Option>
                      <Option value="retail"><ShopOutlined /> Retail</Option>
                      <Option value="automotive"><CarOutlined /> Automotive</Option>
                      <Option value="banking"><BankOutlined /> Banking</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Current Role</span>}>
                    <Select
                      value={selectedRole}
                      onChange={setSelectedRole}
                      style={{ width: '100%' }}
                      size="large"
                    >
                      <Option value="software-engineer">Software Engineer</Option>
                      <Option value="data-scientist">Data Scientist</Option>
                      <Option value="product-manager">Product Manager</Option>
                      <Option value="designer">UI/UX Designer</Option>
                      <Option value="analyst">Business Analyst</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Experience Level (Years)</span>}>
                    <Slider
                      min={0}
                      max={20}
                      value={experienceLevel}
                      onChange={setExperienceLevel}
                      marks={{
                        0: 'Entry',
                        3: 'Junior',
                        6: 'Mid',
                        10: 'Senior',
                        15: 'Lead',
                        20: 'Executive'
                      }}
                      style={{ marginBottom: '20px' }}
                    />
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Career Goals</span>}>
                    <Checkbox.Group
                      value={careerGoals}
                      onChange={setCareerGoals}
                      style={{ width: '100%' }}
                    >
                      <Row>
                        <Col span={24}><Checkbox value="leadership">Leadership Role</Checkbox></Col>
                        <Col span={24}><Checkbox value="salary">Higher Salary</Checkbox></Col>
                        <Col span={24}><Checkbox value="skills">New Skills</Checkbox></Col>
                        <Col span={24}><Checkbox value="industry">Industry Switch</Checkbox></Col>
                        <Col span={24}><Checkbox value="remote">Remote Work</Checkbox></Col>
                        <Col span={24}><Checkbox value="startup">Startup Environment</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>

                  <Button
                    type="primary"
                    size="large"
                    icon={<RocketOutlined />}
                    onClick={() => {
                      setIsAnalyzing(true);
                      setTimeout(() => {
                        setIsAnalyzing(false);
                        setAnalysisResults({
                          careerScore: 87,
                          growthPotential: 94,
                          marketDemand: 89,
                          salaryGrowth: 78
                        });
                        message.success('Career analysis complete!');
                      }, 3000);
                    }}
                    loading={isAnalyzing}
                    style={{
                      borderRadius: '16px',
                      padding: '12px 32px',
                      height: 'auto',
                      fontSize: '16px',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                      border: 'none',
                      width: '100%'
                    }}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze My Career'}
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Career Roadmap Visualization */}
            <Col xs={24} lg={10}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '600px'
              }}>
                <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
                  Your Career Roadmap
                </Title>

                {analysisResults ? (
                  <div>
                    {/* Progress Visualization */}
                    <div style={{ marginBottom: '30px' }}>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              percent={analysisResults.careerScore}
                              width={80}
                              strokeColor="#4ECDC4"
                              format={percent => (
                                <div>
                                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{percent}%</div>
                                  <div style={{ fontSize: '10px', color: '#ccc' }}>Score</div>
                                </div>
                              )}
                            />
                            <Text style={{ color: '#fff', display: 'block', marginTop: '8px' }}>Career Score</Text>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              percent={analysisResults.growthPotential}
                              width={80}
                              strokeColor="#FF6B6B"
                              format={percent => (
                                <div>
                                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{percent}%</div>
                                  <div style={{ fontSize: '10px', color: '#ccc' }}>Growth</div>
                                </div>
                              )}
                            />
                            <Text style={{ color: '#fff', display: 'block', marginTop: '8px' }}>Growth Potential</Text>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Career Path Timeline */}
                    <Timeline
                      items={[
                        {
                          color: '#4ECDC4',
                          children: (
                            <div>
                              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Current Position</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Senior Software Engineer</Text>
                            </div>
                          )
                        },
                        {
                          color: '#FFD93D',
                          children: (
                            <div>
                              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Next Step (6-12 months)</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Tech Lead / Team Lead</Text>
                            </div>
                          )
                        },
                        {
                          color: '#FF6B6B',
                          children: (
                            <div>
                              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Mid-term (2-3 years)</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Engineering Manager</Text>
                            </div>
                          )
                        },
                        {
                          color: '#6BCF7F',
                          children: (
                            <div>
                              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Long-term (5+ years)</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>VP of Engineering</Text>
                            </div>
                          )
                        }
                      ]}
                    />

                    {/* Skills Gap Analysis */}
                    <div style={{ marginTop: '30px' }}>
                      <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
                        Skills to Develop
                      </Title>
                      <Space wrap>
                        <Tag color="#FF6B6B">Leadership</Tag>
                        <Tag color="#4ECDC4">System Design</Tag>
                        <Tag color="#FFD93D">Project Management</Tag>
                        <Tag color="#6BCF7F">Team Building</Tag>
                      </Space>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <CompassOutlined style={{ fontSize: '64px', color: '#4ECDC4', marginBottom: '20px' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                      Complete the assessment to see your personalized career roadmap
                    </Text>
                  </div>
                )}
              </Card>
            </Col>

            {/* Market Insights */}
            <Col xs={24} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '600px'
              }}>
                <Title level={4} style={{ color: '#fff', textAlign: 'center', marginBottom: '24px' }}>
                  Market Insights
                </Title>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff', fontSize: '14px' }}>Market Demand</Text>
                    <Progress 
                      percent={89} 
                      strokeColor="#52c41a" 
                      showInfo={false}
                      size="small"
                    />
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff', fontSize: '14px' }}>Salary Growth</Text>
                    <Progress 
                      percent={78} 
                      strokeColor="#1890ff" 
                      showInfo={false}
                      size="small"
                    />
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff', fontSize: '14px' }}>Job Security</Text>
                    <Progress 
                      percent={94} 
                      strokeColor="#faad14" 
                      showInfo={false}
                      size="small"
                    />
                  </div>
                </div>

                {/* Trending Skills */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <Title level={5} style={{ color: '#fff', marginBottom: '12px' }}>
                    Trending Skills
                  </Title>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>AI/ML</Text>
                      <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>+25%</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>Cloud Computing</Text>
                      <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>+18%</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>DevOps</Text>
                      <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>+22%</Text>
                    </div>
                  </div>
                </div>

                {/* Salary Insights */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <Title level={5} style={{ color: '#fff', marginBottom: '12px' }}>
                    Salary Insights
                  </Title>
                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#4ECDC4', fontSize: '24px', fontWeight: 'bold' }}>$125K</Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', fontSize: '12px' }}>
                      Average for your role
                    </Text>
                    <Text style={{ color: '#52c41a', fontSize: '12px' }}>
                      +15% from last year
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Features Section */}
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                height: '280px'
              }}>
                <RadarChartOutlined style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  AI-Powered Analysis
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Advanced machine learning algorithms analyze 500+ career paths and market trends for personalized insights.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                height: '280px'
              }}>
                <BranchesOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Multiple Pathways
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Discover alternative career routes, lateral moves, and growth opportunities tailored to your skills.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                height: '280px'
              }}>
                <ScheduleOutlined style={{ fontSize: '48px', color: '#FFD93D', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Timeline Planning
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Get realistic timelines with milestones, skill development plans, and achievement tracking.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                height: '280px'
              }}>
                <FundOutlined style={{ fontSize: '48px', color: '#6BCF7F', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Market Intelligence
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Real-time salary data, job market trends, and industry insights to make informed decisions.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default CareerAnalysis; 