import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Typography, Statistic, Timeline,
  Tag, Steps, Tree, Select, Form, Input, Space, Divider, List, Rate
} from 'antd';
import {
  RocketOutlined, BranchesOutlined, TrophyOutlined, BookOutlined,
  UserOutlined, TeamOutlined, BarChartOutlined, StarFilled,
  AimOutlined, LineChartOutlined, BulbOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const CareerPathAnalysis = () => {
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [experience, setExperience] = useState('');
  const [pathResults, setPathResults] = useState(null);
  const canvasRef = useRef(null);

  // Particle animation
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

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? '#4ECDC4' : '#FFD93D'
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

  const generateCareerPath = async () => {
    setAnalysisStarted(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPathResults({
      currentLevel: "Mid-Level Software Engineer",
      targetLevel: "Senior Technical Lead",
      timeframe: "18-24 months",
      milestones: [
        { title: "Master Advanced React Patterns", status: "current", duration: "3 months" },
        { title: "Lead a Cross-functional Project", status: "next", duration: "6 months" },
        { title: "Obtain System Design Certification", status: "future", duration: "4 months" },
        { title: "Mentor Junior Developers", status: "future", duration: "6 months" },
        { title: "Transition to Tech Lead Role", status: "goal", duration: "2 months" }
      ],
      skills: {
        current: ["React", "JavaScript", "Node.js", "Docker"],
        needed: ["System Design", "Leadership", "Architecture", "Mentoring"],
        recommended: ["AWS", "Docker", "Kubernetes", "Microservices"]
      },
      salaryProjection: {
        current: "$95,000",
        target: "$140,000",
        increase: "47%"
      }
    });
  };

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
          
          {/* Hero Section */}
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
              background: 'linear-gradient(135deg, #FFD93D, #FFAB00)',
              borderRadius: '50%',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(255, 217, 61, 0.3)'
            }}>
              <AimOutlined style={{ fontSize: '60px', color: '#fff' }} />
            </div>

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              margin: '0 0 24px 0',
              background: 'linear-gradient(135deg, #FFD93D, #FFAB00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Career Path Analysis
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Get AI-powered career roadmaps tailored to your goals. Plan your next career move 
              with personalized milestones and skill recommendations.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Career Paths</span>}
                  value={50}
                  suffix="K+"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                  value={92}
                  suffix="%"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Salary Increase</span>}
                  value={35}
                  suffix="%"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Time to Goal</span>}
                  value={18}
                  suffix="mo"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Analysis Interface */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            marginBottom: '60px'
          }}>
            {!pathResults ? (
              <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <Title level={2} style={{ color: '#fff', marginBottom: '40px' }}>
                  Analyze Your Career Path
                </Title>
                
                <Row gutter={[24, 24]} style={{ marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
                  <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ color: '#fff' }}>Current Role</span>}>
                      <Input 
                        placeholder="e.g. Software Engineer"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        size="large"
                        style={{ borderRadius: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ color: '#fff' }}>Target Role</span>}>
                      <Input 
                        placeholder="e.g. Senior Tech Lead"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        size="large"
                        style={{ borderRadius: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ color: '#fff' }}>Experience</span>}>
                      <Select 
                        placeholder="Years of experience"
                        value={experience}
                        onChange={setExperience}
                        size="large"
                        style={{ width: '100%' }}
                      >
                        <Option value="0-2">0-2 years</Option>
                        <Option value="3-5">3-5 years</Option>
                        <Option value="6-10">6-10 years</Option>
                        <Option value="10+">10+ years</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={generateCareerPath}
                  loading={analysisStarted}
                  style={{
                    borderRadius: '25px',
                    padding: '12px 48px',
                    height: 'auto',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FFD93D, #FFAB00)',
                    border: 'none'
                  }}
                >
                  {analysisStarted ? 'Analyzing...' : 'Generate Career Path'}
                </Button>
              </div>
            ) : (
              <div style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>
                    🚀 Your Personalized Career Path
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
                    From {pathResults.currentLevel} to {pathResults.targetLevel}
                  </Text>
                </div>

                {/* Timeline */}
                <Card style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  marginBottom: '40px'
                }}>
                  <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                    Career Milestones ({pathResults.timeframe})
                  </Title>
                  
                  <Timeline
                    items={pathResults.milestones.map((milestone, index) => ({
                      color: milestone.status === 'current' ? '#4ECDC4' : 
                             milestone.status === 'next' ? '#FFD93D' :
                             milestone.status === 'goal' ? '#FF6B6B' : '#8E8E93',
                      children: (
                        <div style={{ color: '#fff' }}>
                          <Text strong style={{ color: '#fff', fontSize: '16px' }}>
                            {milestone.title}
                          </Text>
                          <br />
                          <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Duration: {milestone.duration}
                          </Text>
                          <br />
                          <Tag 
                            color={
                              milestone.status === 'current' ? 'cyan' : 
                              milestone.status === 'next' ? 'gold' :
                              milestone.status === 'goal' ? 'red' : 'default'
                            }
                            style={{ marginTop: '8px' }}
                          >
                            {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                          </Tag>
                        </div>
                      )
                    }))}
                  />
                </Card>

                {/* Skills Analysis */}
                <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
                  <Col xs={24} lg={8}>
                    <Card style={{
                      background: 'rgba(82, 196, 26, 0.1)',
                      border: '1px solid rgba(82, 196, 26, 0.3)',
                      borderRadius: '16px',
                      height: '300px'
                    }}>
                      <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                        Current Skills
                      </Title>
                      <Space wrap>
                        {pathResults.skills.current.map(skill => (
                          <Tag key={skill} color="green">{skill}</Tag>
                        ))}
                      </Space>
                    </Card>
                  </Col>
                  
                  <Col xs={24} lg={8}>
                    <Card style={{
                      background: 'rgba(255, 107, 107, 0.1)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      borderRadius: '16px',
                      height: '300px'
                    }}>
                      <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>
                        <BulbOutlined style={{ color: '#FF6B6B', marginRight: '8px' }} />
                        Skills Needed
                      </Title>
                      <Space wrap>
                        {pathResults.skills.needed.map(skill => (
                          <Tag key={skill} color="red">{skill}</Tag>
                        ))}
                      </Space>
                    </Card>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Card style={{
                      background: 'rgba(255, 217, 61, 0.1)',
                      border: '1px solid rgba(255, 217, 61, 0.3)',
                      borderRadius: '16px',
                      height: '300px'
                    }}>
                      <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>
                        <StarFilled style={{ color: '#FFD93D', marginRight: '8px' }} />
                        Recommended
                      </Title>
                      <Space wrap>
                        {pathResults.skills.recommended.map(skill => (
                          <Tag key={skill} color="gold">{skill}</Tag>
                        ))}
                      </Space>
                    </Card>
                  </Col>
                </Row>

                {/* Salary Projection */}
                <Card style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                    Salary Projection
                  </Title>
                  <Row gutter={[32, 32]} justify="center">
                    <Col xs={8}>
                      <Statistic
                        title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Current</span>}
                        value={pathResults.salaryProjection.current}
                        valueStyle={{ color: '#8E8E93', fontSize: '24px' }}
                      />
                    </Col>
                    <Col xs={8}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #52c41a, #389e0d)',
                          borderRadius: '20px',
                          padding: '12px 24px'
                        }}>
                          <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
                            +{pathResults.salaryProjection.increase}
                          </Text>
                        </div>
                      </div>
                    </Col>
                    <Col xs={8}>
                      <Statistic
                        title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Target</span>}
                        value={pathResults.salaryProjection.target}
                        valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          </Card>

          {/* Features */}
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <BranchesOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Multiple Pathways
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Explore different career routes and find the path that 
                    best aligns with your interests and market demands.
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <LineChartOutlined style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Market Insights
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Get real-time market data including salary ranges, 
                    job demand, and emerging skill requirements.
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <BookOutlined style={{ fontSize: '48px', color: '#FFD93D', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Learning Resources
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Access curated learning materials, courses, and 
                    certifications to achieve your career milestones.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CareerPathAnalysis; 