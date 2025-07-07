import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Input, message, Spin, Typography,
  Tag, Statistic, Modal, Form, Select, Rate, Avatar, Badge, Tooltip,
  Space, Divider, List, Timeline, Slider, Switch, Steps, Alert
} from 'antd';
import {
  SearchOutlined, HeartOutlined, BulbOutlined, SendOutlined,
  StarFilled, TrophyOutlined, UserOutlined, DownloadOutlined,
  FilterOutlined, ReloadOutlined, EyeOutlined, EnvironmentOutlined,
  ClockCircleOutlined, DollarOutlined, TeamOutlined, BookOutlined,
  RocketOutlined, ThunderboltFilled, SafetyOutlined, BranchesOutlined,
  CheckCircleOutlined, WarningOutlined, InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const JobMatchingEngine = () => {
  const [loading, setLoading] = useState(false);
  const [matchResults, setMatchResults] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModal, setJobModal] = useState(false);
  const [step, setStep] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
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

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? '#4ECDC4' : '#FF6B6B'
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

  const mockJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120,000 - $160,000",
      type: "Full-time",
      experience: "5+ years",
      skills: ["React", "Node.js", "Python", "AWS"],
      matchScore: 95,
      logo: "https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=TC",
      description: "Lead development of scalable web applications...",
      posted: "2 days ago",
      applicants: 23,
      remote: true
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "InnovateUX",
      location: "New York, NY",
      salary: "$90,000 - $120,000",
      type: "Full-time",
      experience: "3+ years",
      skills: ["JavaScript", "React", "CSS", "TypeScript"],
      matchScore: 88,
      logo: "https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=IU",
      description: "Create beautiful and intuitive user interfaces...",
      posted: "1 day ago",
      applicants: 45,
      remote: false
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataMinds AI",
      location: "Austin, TX",
      salary: "$110,000 - $140,000",
      type: "Full-time",
      experience: "4+ years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      matchScore: 82,
      logo: "https://via.placeholder.com/60x60/FFD93D/FFFFFF?text=DM",
      description: "Develop ML models for predictive analytics...",
      posted: "3 days ago",
      applicants: 18,
      remote: true
    }
  ];

  const runMatching = async () => {
    setLoading(true);
    setStep(0);
    
    const steps = [
      "Analyzing your profile...",
      "Scanning job market...",
      "Matching skills and requirements...",
      "Calculating compatibility scores...",
      "Generating recommendations..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(i);
    }

    setMatchResults(mockJobs);
    setLoading(false);
    
    // Animate match scores
    let score = 0;
    const interval = setInterval(() => {
      score += 5;
      setMatchScore(score);
      if (score >= 95) {
        clearInterval(interval);
      }
    }, 100);

    message.success('Found 3 perfect matches for your profile!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Particle Background */}
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
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              borderRadius: '50%',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(78, 205, 196, 0.3)'
            }}>
              <SearchOutlined style={{ fontSize: '60px', color: '#fff' }} />
            </div>

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              margin: '0 0 24px 0',
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Job Matching Engine
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              AI-powered job matching that finds your perfect career opportunities. 
              Get 3x more interviews with personalized job recommendations.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Match Accuracy</span>}
                  value={96}
                  suffix="%"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Interview Rate</span>}
                  value={3.2}
                  suffix="x"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Jobs</span>}
                  value={150}
                  suffix="K+"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                  value={89}
                  suffix="%"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Matching Interface */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            marginBottom: '60px'
          }}>
            {!loading && !matchResults ? (
              <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <Title level={2} style={{ color: '#fff', marginBottom: '40px' }}>
                  Find Your Perfect Job Match
                </Title>
                
                <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
                  <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ color: '#fff' }}>Job Title/Role</span>}>
                      <Input 
                        placeholder="e.g. Software Engineer" 
                        size="large"
                        style={{ borderRadius: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ color: '#fff' }}>Location</span>}>
                      <Select 
                        placeholder="Select location" 
                        size="large"
                        style={{ width: '100%' }}
                      >
                        <Option value="remote">Remote</Option>
                        <Option value="sf">San Francisco</Option>
                        <Option value="ny">New York</Option>
                        <Option value="austin">Austin</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ color: '#fff' }}>Experience Level</span>}>
                      <Select 
                        placeholder="Years of experience" 
                        size="large"
                        style={{ width: '100%' }}
                      >
                        <Option value="entry">Entry Level (0-2 years)</Option>
                        <Option value="mid">Mid Level (3-5 years)</Option>
                        <Option value="senior">Senior Level (5+ years)</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={runMatching}
                  style={{
                    borderRadius: '25px',
                    padding: '12px 48px',
                    height: 'auto',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                    border: 'none'
                  }}
                >
                  Find My Perfect Jobs
                </Button>
              </div>
            ) : loading ? (
              <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                <Spin size="large" />
                <Title level={3} style={{ color: '#fff', marginTop: '24px' }}>
                  AI Matching in Progress...
                </Title>
                
                <Steps
                  current={step}
                  direction="vertical"
                  size="small"
                  style={{ 
                    marginTop: '40px',
                    maxWidth: '400px',
                    margin: '40px auto',
                    textAlign: 'left'
                  }}
                  items={[
                    {
                      title: <span style={{ color: '#fff' }}>Analyzing Profile</span>,
                      description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Processing your skills and experience</span>
                    },
                    {
                      title: <span style={{ color: '#fff' }}>Scanning Market</span>,
                      description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Searching 150,000+ active job listings</span>
                    },
                    {
                      title: <span style={{ color: '#fff' }}>Matching Skills</span>,
                      description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Comparing requirements with your profile</span>
                    },
                    {
                      title: <span style={{ color: '#fff' }}>Calculating Scores</span>,
                      description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Computing compatibility percentages</span>
                    },
                    {
                      title: <span style={{ color: '#fff' }}>Generating Results</span>,
                      description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Ranking best opportunities for you</span>
                    }
                  ]}
                />
              </div>
            ) : (
              <div style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>
                    🎯 Perfect Matches Found!
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
                    We found {matchResults.length} jobs that perfectly match your profile
                  </Text>
                </div>

                <List
                  dataSource={matchResults}
                  renderItem={(job) => (
                    <List.Item style={{ 
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      margin: '16px 0',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '24px'
                    }}>
                      <Row style={{ width: '100%' }} align="middle">
                        <Col span={2}>
                          <Avatar size={60} src={job.logo} />
                        </Col>
                        <Col span={14}>
                          <div>
                            <Title level={4} style={{ color: '#fff', margin: '0 0 8px 0' }}>
                              {job.title}
                            </Title>
                            <Text style={{ color: '#4ECDC4', fontSize: '16px', fontWeight: 'bold' }}>
                              {job.company}
                            </Text>
                            <div style={{ marginTop: '8px' }}>
                              <Tag icon={<EnvironmentOutlined />} color="blue">
                                {job.location}
                              </Tag>
                              <Tag icon={<DollarOutlined />} color="green">
                                {job.salary}
                              </Tag>
                              <Tag icon={<ClockCircleOutlined />} color="orange">
                                {job.type}
                              </Tag>
                              {job.remote && (
                                <Tag color="purple">Remote</Tag>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col span={4} style={{ textAlign: 'center' }}>
                          <div style={{
                            background: `linear-gradient(135deg, ${job.matchScore >= 90 ? '#52c41a' : job.matchScore >= 80 ? '#faad14' : '#ff7875'}, rgba(255,255,255,0.1))`,
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '16px'
                          }}>
                            <Title level={3} style={{ color: '#fff', margin: 0 }}>
                              {job.matchScore}%
                            </Title>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              Match
                            </Text>
                          </div>
                        </Col>
                        <Col span={4} style={{ textAlign: 'right' }}>
                          <Space direction="vertical">
                            <Button
                              type="primary"
                              style={{
                                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                                border: 'none',
                                borderRadius: '20px'
                              }}
                              onClick={() => {
                                setSelectedJob(job);
                                setJobModal(true);
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              icon={<HeartOutlined />}
                              style={{
                                borderRadius: '20px',
                                color: '#FF6B6B',
                                borderColor: '#FF6B6B'
                              }}
                            >
                              Save
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <Button
                    size="large"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      setMatchResults(null);
                      setMatchScore(0);
                    }}
                    style={{
                      borderRadius: '25px',
                      padding: '12px 32px',
                      height: 'auto',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff'
                    }}
                  >
                    Search Again
                  </Button>
                </div>
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
                    Smart Filtering
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Advanced AI filters jobs based on your skills, experience, 
                    location preferences, and career goals for precise matches.
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
                  <ThunderboltFilled style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Real-Time Updates
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Get instant notifications when new jobs matching your 
                    profile are posted. Never miss the perfect opportunity.
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
                  <TrophyOutlined style={{ fontSize: '48px', color: '#FFD93D', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Success Tracking
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Monitor your application success rate and get insights 
                    on how to improve your job search strategy.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Job Detail Modal */}
      <Modal
        title={null}
        open={jobModal}
        onCancel={() => setJobModal(false)}
        footer={null}
        width={800}
      >
        {selectedJob && (
          <div>
            <div style={{ 
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              borderRadius: '16px 16px 0 0',
              padding: '24px',
              margin: '-24px -24px 24px -24px',
              color: '#fff'
            }}>
              <Row align="middle">
                <Col span={4}>
                  <Avatar size={80} src={selectedJob.logo} />
                </Col>
                <Col span={16}>
                  <Title level={2} style={{ color: '#fff', margin: '0 0 8px 0' }}>
                    {selectedJob.title}
                  </Title>
                  <Title level={4} style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                    {selectedJob.company}
                  </Title>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center'
                  }}>
                    <Title level={3} style={{ color: '#fff', margin: 0 }}>
                      {selectedJob.matchScore}%
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Match</Text>
                  </div>
                </Col>
              </Row>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={12}>
                <Text strong>Location: </Text>
                <Text>{selectedJob.location}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Salary: </Text>
                <Text>{selectedJob.salary}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Type: </Text>
                <Text>{selectedJob.type}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Experience: </Text>
                <Text>{selectedJob.experience}</Text>
              </Col>
            </Row>

            <div style={{ marginBottom: '24px' }}>
              <Text strong>Required Skills:</Text>
              <div style={{ marginTop: '8px' }}>
                {selectedJob.skills.map(skill => (
                  <Tag key={skill} color="blue" style={{ marginBottom: '8px' }}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Text strong>Description:</Text>
              <Paragraph style={{ marginTop: '8px' }}>
                {selectedJob.description}
              </Paragraph>
            </div>

            <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  style={{
                    background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 32px'
                  }}
                >
                  Apply Now
                </Button>
                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  style={{
                    borderRadius: '20px',
                    padding: '8px 32px'
                  }}
                >
                  Save Job
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobMatchingEngine; 