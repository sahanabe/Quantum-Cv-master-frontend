import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Typography, Tabs, Avatar, Badge,
  Tag, Timeline, Statistic, Modal, Form, Input, Select, Rate, Slider,
  Space, Divider, Alert, Result, Switch, Tooltip, Steps, Carousel,
  message, Spin, List, Empty, Drawer, Radio, Checkbox, DatePicker,
  Upload, Table, Collapse, Tree, Descriptions, Image, ColorPicker
} from 'antd';
import {
  StarFilled, StarOutlined, BulbOutlined, ThunderboltFilled, EyeOutlined, HeartFilled,
  UserOutlined, TeamOutlined, LineChartOutlined, SafetyOutlined,
  CheckCircleOutlined, WarningOutlined, SmileOutlined, BookOutlined,
  LaptopOutlined, PhoneOutlined, MessageOutlined, CameraOutlined,
  SoundOutlined, WifiOutlined, GlobalOutlined, CalendarOutlined,
  BankOutlined, CarOutlined, MedicineBoxOutlined, ShopOutlined,
  CodeOutlined, DesignOutlined, DollarOutlined, BarChartOutlined,
  PieChartOutlined, FundOutlined, RiseOutlined, ArrowRightOutlined,
  EditOutlined, ShareAltOutlined, DownloadOutlined, UploadOutlined,
  LinkedinOutlined, TwitterOutlined, InstagramOutlined, FacebookOutlined,
  YoutubeOutlined, BehanceOutlined, DribbbleOutlined,
  TrophyOutlined, FireOutlined, RocketOutlined, CrownOutlined,
  GiftOutlined, PlusOutlined, MinusOutlined,
  ZoomInOutlined, ZoomOutOutlined, RotateLeftOutlined, RotateRightOutlined,
  PictureOutlined, FontSizeOutlined, BgColorsOutlined, FormatPainterOutlined,
  HighlightOutlined, ItalicOutlined, BoldOutlined, UnderlineOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;

const ProfessionalBranding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [brandAnalysis, setBrandAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [brandPersonality, setBrandPersonality] = useState([]);
  const [brandColors, setBrandColors] = useState(['#4ECDC4', '#FF6B6B', '#FFD93D']);
  const [brandVoice, setBrandVoice] = useState('professional');
  const [socialProfiles, setSocialProfiles] = useState({});
  const [contentCalendar, setContentCalendar] = useState([]);
  const [brandScore, setBrandScore] = useState(0);
  const [profileOptimization, setProfileOptimization] = useState(null);
  const [contentSuggestions, setContentSuggestions] = useState([]);
  const [brandModal, setBrandModal] = useState(false);
  const [previewMode, setPreviewMode] = useState('linkedin');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    website: ''
  });
  const canvasRef = useRef(null);

  // Advanced particle system with brand-themed elements
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

    // Create brand-themed particles
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 5 + 2,
        opacity: Math.random() * 0.9 + 0.1,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        pulse: Math.random() * Math.PI * 2,
        originalSize: 0,
        shape: ['circle', 'star', 'diamond', 'heart'][Math.floor(Math.random() * 4)]
      });
      particles[i].originalSize = particles[i].size;
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const drawStar = (ctx, x, y, size) => {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawHeart = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size, x, y + size);
      ctx.bezierCurveTo(x, y + size, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Enhanced mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) {
          particle.vx += dx * 0.00005;
          particle.vy += dy * 0.00005;
          particle.size = particle.originalSize * (1 + (250 - distance) / 250);
        } else {
          particle.size = particle.originalSize;
        }
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.04;
        
        // Boundary collision with damping
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;
        
        // Enhanced pulsing effect
        const pulseSize = particle.size + Math.sin(particle.pulse) * 1.5;
        
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'star') {
          drawStar(ctx, particle.x, particle.y, pulseSize);
          ctx.fill();
        } else if (particle.shape === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - pulseSize);
          ctx.lineTo(particle.x + pulseSize, particle.y);
          ctx.lineTo(particle.x, particle.y + pulseSize);
          ctx.lineTo(particle.x - pulseSize, particle.y);
          ctx.closePath();
          ctx.fill();
        } else if (particle.shape === 'heart') {
          drawHeart(ctx, particle.x, particle.y, pulseSize);
          ctx.fill();
        }
        
        ctx.restore();
        
        // Connect nearby particles with brand-colored lines
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              );
              gradient.addColorStop(0, `${particle.color}40`);
              gradient.addColorStop(1, `${otherParticle.color}40`);
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = (150 - distance) / 150 * 3;
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
  }, [brandColors]);

  // Mock brand analysis
  const analyzeBrand = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setBrandAnalysis({
        overallScore: 92,
        consistency: 88,
        visibility: 95,
        engagement: 89,
        authenticity: 94
      });
      setBrandScore(92);
      setProfileOptimization({
        linkedin: { current: 78, potential: 95, improvements: 5 },
        twitter: { current: 65, potential: 88, improvements: 7 },
        linkedin: { current: 82, potential: 96, improvements: 3 }
      });
      setContentSuggestions([
        {
          type: 'LinkedIn Post',
          topic: 'Industry Insights',
          engagement: 'High',
          bestTime: '9:00 AM',
          content: 'Share your thoughts on the latest industry trends...'
        },
        {
          type: 'Twitter Thread',
          topic: 'Career Tips',
          engagement: 'Medium',
          bestTime: '2:00 PM',
          content: 'Thread about professional development...'
        },
        {
          type: 'Blog Article',
          topic: 'Technical Tutorial',
          engagement: 'High',
          bestTime: '10:00 AM',
          content: 'Write a comprehensive guide on...'
        }
      ]);
      message.success('Brand analysis complete!');
    }, 4000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
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
              <CrownOutlined style={{ fontSize: '60px', color: '#fff' }} />
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
              Professional Brand Studio
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Build your personal brand with AI-powered insights, optimize your social presence, 
              and create content that amplifies your professional impact by 5x.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Brand Score</span>}
                  value={brandScore}
                  suffix="/100"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Profile Views</span>}
                  value={5.2}
                  suffix="x"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Engagement</span>}
                  value={89}
                  suffix="%"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Reach</span>}
                  value={12.5}
                  suffix="K"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Main Content */}
          <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
            
            {/* Brand Builder */}
            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '700px'
              }}>
                <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
                  Brand Builder
                </Title>

                <Form layout="vertical">
                  <Form.Item label={<span style={{ color: '#fff' }}>Personal Information</span>}>
                    <Input
                      placeholder="Full Name"
                      value={personalInfo.name}
                      onChange={e => setPersonalInfo({...personalInfo, name: e.target.value})}
                      style={{ marginBottom: '8px' }}
                    />
                    <Input
                      placeholder="Professional Title"
                      value={personalInfo.title}
                      onChange={e => setPersonalInfo({...personalInfo, title: e.target.value})}
                      style={{ marginBottom: '8px' }}
                    />
                    <TextArea
                      placeholder="Professional Bio"
                      rows={3}
                      value={personalInfo.bio}
                      onChange={e => setPersonalInfo({...personalInfo, bio: e.target.value})}
                    />
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Industry</span>}>
                    <Select
                      value={selectedIndustry}
                      onChange={setSelectedIndustry}
                      style={{ width: '100%' }}
                      size="large"
                    >
                      <Option value="technology">Technology</Option>
                      <Option value="finance">Finance</Option>
                      <Option value="healthcare">Healthcare</Option>
                      <Option value="creative">Creative</Option>
                      <Option value="consulting">Consulting</Option>
                      <Option value="education">Education</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Brand Personality</span>}>
                    <Checkbox.Group
                      value={brandPersonality}
                      onChange={setBrandPersonality}
                      style={{ width: '100%' }}
                    >
                      <Row>
                        <Col span={12}><Checkbox value="innovative">Innovative</Checkbox></Col>
                        <Col span={12}><Checkbox value="reliable">Reliable</Checkbox></Col>
                        <Col span={12}><Checkbox value="creative">Creative</Checkbox></Col>
                        <Col span={12}><Checkbox value="analytical">Analytical</Checkbox></Col>
                        <Col span={12}><Checkbox value="collaborative">Collaborative</Checkbox></Col>
                        <Col span={12}><Checkbox value="leadership">Leadership</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Brand Voice</span>}>
                    <Radio.Group
                      value={brandVoice}
                      onChange={e => setBrandVoice(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <Radio.Button value="professional">Professional</Radio.Button>
                      <Radio.Button value="casual">Casual</Radio.Button>
                      <Radio.Button value="authoritative">Authoritative</Radio.Button>
                      <Radio.Button value="friendly">Friendly</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Brand Colors</span>}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      {brandColors.map((color, index) => (
                        <div
                          key={index}
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: color,
                            borderRadius: '8px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            cursor: 'pointer'
                          }}
                        />
                      ))}
                    </div>
                  </Form.Item>

                  <Button
                    type="primary"
                    size="large"
                    icon={<RocketOutlined />}
                    onClick={analyzeBrand}
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
                    {isAnalyzing ? 'Analyzing Brand...' : 'Analyze My Brand'}
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Brand Analysis & Preview */}
            <Col xs={24} lg={10}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '700px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <Title level={3} style={{ color: '#fff', margin: 0 }}>
                    Brand Analysis
                  </Title>
                  <Select
                    value={previewMode}
                    onChange={setPreviewMode}
                    style={{ width: '120px' }}
                  >
                    <Option value="linkedin">LinkedIn</Option>
                    <Option value="twitter">Twitter</Option>
                    <Option value="linkedin">LinkedIn</Option>
                  </Select>
                </div>

                {brandAnalysis ? (
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Scores" key="1">
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              percent={brandAnalysis.overallScore}
                              width={80}
                              strokeColor="#4ECDC4"
                              format={percent => (
                                <div>
                                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{percent}</div>
                                  <div style={{ fontSize: '10px', color: '#ccc' }}>Overall</div>
                                </div>
                              )}
                            />
                          </div>
                        </Col>
                        <Col span={12}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              percent={brandAnalysis.visibility}
                              width={80}
                              strokeColor="#FF6B6B"
                              format={percent => (
                                <div>
                                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{percent}</div>
                                  <div style={{ fontSize: '10px', color: '#ccc' }}>Visibility</div>
                                </div>
                              )}
                            />
                          </div>
                        </Col>
                      </Row>

                      <div style={{ marginTop: '30px' }}>
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ color: '#fff', fontSize: '14px' }}>Consistency: {brandAnalysis.consistency}%</Text>
                          <Progress 
                            percent={brandAnalysis.consistency} 
                            strokeColor="#52c41a" 
                            showInfo={false}
                            size="small"
                          />
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ color: '#fff', fontSize: '14px' }}>Engagement: {brandAnalysis.engagement}%</Text>
                          <Progress 
                            percent={brandAnalysis.engagement} 
                            strokeColor="#1890ff" 
                            showInfo={false}
                            size="small"
                          />
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ color: '#fff', fontSize: '14px' }}>Authenticity: {brandAnalysis.authenticity}%</Text>
                          <Progress 
                            percent={brandAnalysis.authenticity} 
                            strokeColor="#faad14" 
                            showInfo={false}
                            size="small"
                          />
                        </div>
                      </div>
                    </TabPane>

                    <TabPane tab="Profile Preview" key="2">
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                          <Avatar size={64} style={{ backgroundColor: brandColors[0] }}>
                            {personalInfo.name?.charAt(0) || 'U'}
                          </Avatar>
                          <div style={{ marginLeft: '16px' }}>
                            <Title level={4} style={{ color: '#fff', margin: 0 }}>
                              {personalInfo.name || 'Your Name'}
                            </Title>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {personalInfo.title || 'Professional Title'}
                            </Text>
                          </div>
                        </div>
                        
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                          {personalInfo.bio || 'Your professional bio will appear here...'}
                        </Text>

                        <div style={{ marginTop: '20px' }}>
                          <Space wrap>
                            {brandPersonality.map(trait => (
                              <Tag key={trait} color={brandColors[0]}>
                                {trait}
                              </Tag>
                            ))}
                          </Space>
                        </div>
                      </div>
                    </TabPane>

                    <TabPane tab="Optimization" key="3">
                      {profileOptimization && (
                        <div>
                          {Object.entries(profileOptimization).map(([platform, data]) => (
                            <Card
                              key={platform}
                              size="small"
                              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                marginBottom: '16px'
                              }}
                            >
                              <Row gutter={16}>
                                <Col span={8}>
                                  <Statistic
                                    title="Current"
                                    value={data.current}
                                    suffix="%"
                                    valueStyle={{ color: '#ff4d4f', fontSize: '16px' }}
                                  />
                                </Col>
                                <Col span={8}>
                                  <Statistic
                                    title="Potential"
                                    value={data.potential}
                                    suffix="%"
                                    valueStyle={{ color: '#52c41a', fontSize: '16px' }}
                                  />
                                </Col>
                                <Col span={8}>
                                  <Statistic
                                    title="Improvements"
                                    value={data.improvements}
                                    valueStyle={{ color: '#1890ff', fontSize: '16px' }}
                                  />
                                </Col>
                              </Row>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabPane>
                  </Tabs>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <CrownOutlined style={{ fontSize: '64px', color: '#4ECDC4', marginBottom: '20px' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                      Complete your brand information to see detailed analysis and optimization suggestions
                    </Text>
                  </div>
                )}
              </Card>
            </Col>

            {/* Content Strategy */}
            <Col xs={24} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '700px'
              }}>
                <Title level={4} style={{ color: '#fff', textAlign: 'center', marginBottom: '24px' }}>
                  Content Strategy
                </Title>

                {contentSuggestions.length > 0 ? (
                  <List
                    dataSource={contentSuggestions}
                    renderItem={(item, index) => (
                      <List.Item style={{ border: 'none', padding: '12px 0' }}>
                        <Card
                          size="small"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            width: '100%'
                          }}
                        >
                          <div style={{ marginBottom: '8px' }}>
                            <Tag color={brandColors[index % brandColors.length]}>
                              {item.type}
                            </Tag>
                            <Tag color={item.engagement === 'High' ? '#52c41a' : '#faad14'}>
                              {item.engagement}
                            </Tag>
                          </div>
                          
                          <Title level={5} style={{ color: '#fff', margin: '8px 0' }}>
                            {item.topic}
                          </Title>
                          
                          <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                            Best time: {item.bestTime}
                          </Text>
                          
                          <div style={{ marginTop: '12px' }}>
                            <Button size="small" type="primary" style={{ marginRight: '8px' }}>
                              Create
                            </Button>
                            <Button size="small">
                              Schedule
                            </Button>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <BulbOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '16px' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Analyze your brand to get personalized content suggestions
                    </Text>
                  </div>
                )}

                {/* Social Media Links */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '20px'
                }}>
                  <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
                    Social Profiles
                  </Title>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <Button icon={<LinkedinOutlined />} style={{ color: '#0077b5' }}>
                      LinkedIn
                    </Button>
                    <Button icon={<TwitterOutlined />} style={{ color: '#1da1f2' }}>
                      Twitter
                    </Button>
                                    <Button icon={<LinkedinOutlined />} style={{ color: '#0077B5' }}>
                  LinkedIn
                </Button>
                    <Button icon={<InstagramOutlined />} style={{ color: '#e4405f' }}>
                      Instagram
                    </Button>
                  </div>
                </div>

                {/* Brand Metrics */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '16px'
                }}>
                  <Title level={5} style={{ color: '#fff', marginBottom: '12px' }}>
                    This Week
                  </Title>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>Profile Views</Text>
                    <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>+24%</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>Engagement</Text>
                    <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>+18%</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>Followers</Text>
                    <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>+12%</Text>
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
                <StarOutlined style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Brand Identity
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Create a consistent visual identity with AI-generated color palettes, fonts, and design elements.
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
                <ShareAltOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Social Optimization
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Optimize profiles across all platforms with AI-powered suggestions for maximum visibility and engagement.
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
                <EditOutlined style={{ fontSize: '48px', color: '#FFD93D', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Content Creation
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Generate engaging content ideas, posts, and articles tailored to your brand voice and audience.
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
                <BarChartOutlined style={{ fontSize: '48px', color: '#6BCF7F', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Analytics & Insights
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Track your brand performance with detailed analytics and actionable insights for continuous improvement.
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

export default ProfessionalBranding; 