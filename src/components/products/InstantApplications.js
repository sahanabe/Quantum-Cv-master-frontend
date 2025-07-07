import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Row, Col, Typography, Statistic, List, Avatar, Tag, Progress, Tooltip, Modal, Input, message, Select, Slider, Space, Divider } from 'antd';
import { ThunderboltFilled, SendOutlined, RocketOutlined, ClockCircleOutlined, CheckCircleFilled, StarFilled, UserOutlined, SearchOutlined, BarChartOutlined, SmileOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Software Engineer at Google',
    text: 'QuantumCV Instant Applications got me 5 interviews in 2 weeks! The one-click apply is a game changer.',
    avatar: '👩‍💻',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Netflix',
    text: 'The AI job matching is incredibly accurate. I landed my dream job faster than ever.',
    avatar: '👨‍💼',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Scientist at Tesla',
    text: 'Revolutionary platform. The application tracker and analytics are next level.',
    avatar: '👩‍🔬',
    rating: 5
  }
];

const mockJobs = [
  { id: 1, title: "Software Engineer", company: "TechCorp", location: "Remote", match: 98, applied: false, type: "Full-time", salary: "$120k-150k", experience: "3-5 years" },
  { id: 2, title: "Product Manager", company: "InnovateCo", location: "San Francisco, CA", match: 92, applied: false, type: "Full-time", salary: "$140k-180k", experience: "5-7 years" },
  { id: 3, title: "Data Scientist", company: "DataFlow", location: "New York, NY", match: 89, applied: false, type: "Full-time", salary: "$130k-160k", experience: "2-4 years" },
  { id: 4, title: "UX Designer", company: "Designify", location: "Remote", match: 87, applied: false, type: "Contract", salary: "$90k-120k", experience: "3-6 years" },
  { id: 5, title: "DevOps Engineer", company: "CloudOps", location: "Austin, TX", match: 85, applied: false, type: "Full-time", salary: "$110k-140k", experience: "4-6 years" },
  { id: 6, title: "Frontend Developer", company: "WebTech", location: "Remote", match: 83, applied: false, type: "Full-time", salary: "$100k-130k", experience: "2-4 years" },
  { id: 7, title: "Backend Developer", company: "ServerPro", location: "Seattle, WA", match: 81, applied: false, type: "Full-time", salary: "$115k-145k", experience: "3-5 years" },
  { id: 8, title: "Mobile Developer", company: "AppStudio", location: "Los Angeles, CA", match: 79, applied: false, type: "Contract", salary: "$95k-125k", experience: "2-5 years" },
  { id: 9, title: "QA Engineer", company: "TestLab", location: "Remote", match: 77, applied: false, type: "Full-time", salary: "$85k-110k", experience: "2-4 years" },
  { id: 10, title: "System Administrator", company: "InfraTech", location: "Chicago, IL", match: 75, applied: false, type: "Full-time", salary: "$90k-120k", experience: "4-7 years" }
];

const userStats = [
  { label: 'Applications Sent', value: 42, icon: <SendOutlined />, color: '#4ECDC4' },
  { label: 'Interviews', value: 7, icon: <RocketOutlined />, color: '#FFD93D' },
  { label: 'Success Rate', value: '87%', icon: <CheckCircleFilled />, color: '#6BCF7F' },
  { label: 'Avg. Response Time', value: '2.1d', icon: <ClockCircleOutlined />, color: '#FF6B6B' }
];

const aiFeatures = [
  {
    icon: <SearchOutlined style={{ fontSize: 32, color: '#4ECDC4' }} />,
    title: 'AI Job Matching',
    description: 'Get matched to jobs that fit your skills and preferences instantly.'
  },
  {
    icon: <BarChartOutlined style={{ fontSize: 32, color: '#FFD93D' }} />,
    title: 'Smart Analytics',
    description: 'Track your application stats, interview rates, and optimize your strategy.'
  },
  {
    icon: <SmileOutlined style={{ fontSize: 32, color: '#6BCF7F' }} />,
    title: 'Auto-Filled Forms',
    description: 'No more repetitive typing. Instantly apply with your optimized profile.'
  },
  {
    icon: <StarFilled style={{ fontSize: 32, color: '#FFA07A' }} />,
    title: 'Personalized Recommendations',
    description: 'Get job and company suggestions tailored just for you.'
  }
];

const InstantApplications = () => {
  const [applications, setApplications] = useState(0);
  const [allJobs, setAllJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [matchRange, setMatchRange] = useState([70, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        color: '#4ECDC4'
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

  // Filter jobs based on search term and filters
  useEffect(() => {
    let filtered = allJobs;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(job => job.location === locationFilter);
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.type === typeFilter);
    }
    
    // Match range filter
    filtered = filtered.filter(job => job.match >= matchRange[0] && job.match <= matchRange[1]);
    
    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, typeFilter, matchRange, allJobs]);

  const applyToJob = (jobId) => {
    setAllJobs(jobs => jobs.map(j => j.id === jobId ? { ...j, applied: true } : j));
    setApplications(prev => prev + 1);
    message.success('Application sent!');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('all');
    setTypeFilter('all');
    setMatchRange([70, 100]);
  };

  const getUniqueLocations = () => {
    const locations = [...new Set(allJobs.map(job => job.location))];
    return locations.map(location => ({ value: location, label: location }));
  };

  const getUniqueTypes = () => {
    const types = [...new Set(allJobs.map(job => job.type))];
    return types.map(type => ({ value: type, label: type }));
  };

  const handleFeedback = () => {
    setShowModal(false);
    setFeedback('');
    message.success('Thank you for your feedback!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none'
      }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '80px 0 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '60px 40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 64px #4ECDC422'
          }}>
            <ThunderboltFilled style={{ fontSize: '80px', color: '#4ECDC4', marginBottom: '32px' }} />
            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 0
            }}>
              Instant Applications
            </Title>
            <Paragraph style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '40px' }}>
              Apply to jobs 10x faster with one-click applications. Smart AI matching, auto-filled forms, and real-time analytics make job hunting effortless.
            </Paragraph>
            <Row gutter={32} justify="center">
              <Col xs={12} sm={6}>
                <Statistic title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Speed Increase</span>} value={10} suffix="x" valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>} value={87} suffix="%" valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg. Response</span>} value={2.1} suffix="days" valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }} />
              </Col>
            </Row>
          </div>

          {/* AI Features */}
          <Row gutter={32} justify="center" style={{ marginBottom: 60 }}>
            {aiFeatures.map((f, i) => (
              <Col xs={24} sm={12} md={6} key={i}>
                <Card variant="borderless" style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 20,
                  minHeight: 180,
                  marginBottom: 24,
                  textAlign: 'center',
                  boxShadow: '0 2px 16px #4ECDC422'
                }}>
                  <div style={{ marginBottom: 16 }}>{f.icon}</div>
                  <Title level={4} style={{ color: '#fff', marginBottom: 8 }}>{f.title}</Title>
                  <Text style={{ color: 'rgba(255,255,255,0.7)' }}>{f.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Quick Apply Dashboard */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            marginBottom: 60,
            boxShadow: '0 4px 32px #4ECDC422'
          }}>
            <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
              Quick Apply Dashboard
            </Title>
            
            {/* Search and Filter Section */}
            <div style={{ marginBottom: '32px' }}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={8}>
                  <Input
                    placeholder="Search jobs, companies, or locations..."
                    prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                    size="large"
                  />
                </Col>
                <Col xs={24} md={4}>
                  <Button
                    type="text"
                    icon={<FilterOutlined />}
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      color: '#4ECDC4',
                      border: '1px solid rgba(78, 205, 196, 0.3)',
                      borderRadius: '12px',
                      height: '40px'
                    }}
                  >
                    Filters
                  </Button>
                </Col>
                <Col xs={24} md={4}>
                  <Button
                    type="text"
                    icon={<ClearOutlined />}
                    onClick={clearFilters}
                    style={{
                      color: '#FF6B6B',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      borderRadius: '12px',
                      height: '40px'
                    }}
                  >
                    Clear
                  </Button>
                </Col>
                <Col xs={24} md={8}>
                  <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    Showing {filteredJobs.length} of {allJobs.length} jobs
                  </Text>
                </Col>
              </Row>
              
              {/* Advanced Filters */}
              {showFilters && (
                <div style={{
                  marginTop: '24px',
                  padding: '24px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Row gutter={[24, 16]}>
                    <Col xs={24} md={8}>
                      <Text style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Location</Text>
                      <Select
                        value={locationFilter}
                        onChange={setLocationFilter}
                        style={{ width: '100%' }}
                        options={[
                          { value: 'all', label: 'All Locations' },
                          ...getUniqueLocations()
                        ]}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Text style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Job Type</Text>
                      <Select
                        value={typeFilter}
                        onChange={setTypeFilter}
                        style={{ width: '100%' }}
                        options={[
                          { value: 'all', label: 'All Types' },
                          ...getUniqueTypes()
                        ]}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Text style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>
                        AI Match Range: {matchRange[0]}% - {matchRange[1]}%
                      </Text>
                      <Slider
                        range
                        value={matchRange}
                        onChange={setMatchRange}
                        min={50}
                        max={100}
                        style={{ marginTop: '8px' }}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </div>
            
            {filteredJobs.length > 0 ? (
              <List
                dataSource={filteredJobs}
                renderItem={(job) => (
                  <List.Item style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    margin: '16px 0',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <List.Item.Meta
                      avatar={<Avatar size={50} style={{ background: '#4ECDC4', fontSize: 28 }}>{job.company[0]}</Avatar>}
                      title={
                        <div>
                          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>{job.title}</span>
                          <div style={{ marginTop: '4px' }}>
                            <Tag color="blue" style={{ marginRight: '8px' }}>{job.type}</Tag>
                            <Tag color="green">{job.salary}</Tag>
                          </div>
                        </div>
                      }
                      description={
                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{job.company} &middot; {job.location}</span>
                          <div style={{ marginTop: '4px' }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                              Experience: {job.experience}
                            </Text>
                          </div>
                        </div>
                      }
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                      <Tooltip title={`AI Match: ${job.match}%`}>
                        <Progress type="circle" percent={job.match} size={60} strokeColor="#4ECDC4" format={p => <span style={{ color: '#fff', fontWeight: 700 }}>{p}%</span>} />
                      </Tooltip>
                      <Button
                        type="primary"
                        icon={job.applied ? <CheckCircleFilled /> : <SendOutlined />}
                        disabled={job.applied}
                        onClick={() => applyToJob(job.id)}
                        style={{
                          background: job.applied ? 'linear-gradient(135deg, #6BCF7F, #44A08D)' : 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                          border: 'none',
                          borderRadius: '20px',
                          fontWeight: 600
                        }}
                      >
                        {job.applied ? 'Applied' : 'Quick Apply'}
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <SearchOutlined style={{ fontSize: '64px', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }} />
                <Title level={4} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                  No jobs found
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Try adjusting your search criteria or filters
                </Text>
                <div style={{ marginTop: '16px' }}>
                  <Button
                    type="text"
                    onClick={clearFilters}
                    style={{ color: '#4ECDC4' }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Text style={{ color: '#fff', fontSize: '18px' }}>
                Applications sent today: <span style={{ color: '#4ECDC4', fontWeight: 'bold' }}>{applications}</span>
              </Text>
            </div>
          </Card>

          {/* User Stats */}
          <Row gutter={32} justify="center" style={{ marginBottom: 60 }}>
            {userStats.map((stat, i) => (
              <Col xs={12} sm={6} key={i}>
                <Card variant="borderless" style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 20,
                  minHeight: 120,
                  marginBottom: 24,
                  textAlign: 'center',
                  boxShadow: '0 2px 16px #4ECDC422'
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8, color: stat.color }}>{stat.icon}</div>
                  <Title level={4} style={{ color: '#fff', marginBottom: 0 }}>{stat.value}</Title>
                  <Text style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.label}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Testimonials */}
          <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>What Users Say</Title>
          <Row gutter={32} justify="center" style={{ marginBottom: 60 }}>
            {testimonials.map((t, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <Card variant="borderless" style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 20,
                  minHeight: 180,
                  marginBottom: 24,
                  textAlign: 'center',
                  boxShadow: '0 2px 16px #4ECDC422'
                }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{t.avatar}</div>
                  <Title level={4} style={{ color: '#fff', marginBottom: 0 }}>{t.name}</Title>
                  <Text style={{ color: 'rgba(255,255,255,0.7)' }}>{t.role}</Text>
                  <Paragraph style={{ color: '#fff', marginTop: 12, fontSize: 16, minHeight: 60 }}>{t.text}</Paragraph>
                  <div>{Array.from({ length: t.rating }).map((_, idx) => <StarFilled key={idx} style={{ color: '#FFD93D', fontSize: 20 }} />)}</div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Feedback Section */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Button type="primary" size="large" style={{
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              border: 'none',
              borderRadius: '20px',
              fontWeight: 600
            }} onClick={() => setShowModal(true)}>
              Share Your Feedback
            </Button>
          </div>
          <Modal
            title="We value your feedback!"
            open={showModal}
            onOk={handleFeedback}
            onCancel={() => setShowModal(false)}
            okText="Submit"
            cancelText="Cancel"
          >
            <Input.TextArea
              rows={4}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Tell us what you love or want to see next..."
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default InstantApplications; 