import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Typography, Tabs, Avatar, Badge,
  Tag, Timeline, Statistic, Modal, Form, Input, Select, Rate, Slider,
  Space, Divider, Alert, Result, Switch, Tooltip, Steps, Carousel,
  message, Spin, List, Empty, Drawer, Radio, Checkbox, DatePicker,
  Upload, Table, Collapse
} from 'antd';
import {
  PlayCircleOutlined, PauseCircleOutlined, StopOutlined, MicrophoneOutlined,
  VideoCameraOutlined, RobotOutlined, TrophyOutlined, FireOutlined,
  StarFilled, BulbOutlined, ThunderboltFilled, EyeOutlined, HeartFilled,
  ClockCircleOutlined, UserOutlined, TeamOutlined, LineChartOutlined,
  SafetyOutlined, CheckCircleOutlined, WarningOutlined, SmileOutlined,
  AudioOutlined, FileTextOutlined, SettingOutlined, ReloadOutlined,
  BookOutlined, LaptopOutlined, PhoneOutlined, MessageOutlined,
  CameraOutlined, SoundOutlined, WifiOutlined, GlobalOutlined,
  CalendarOutlined, BankOutlined, CarOutlined, MedicineBoxOutlined,
  ShopOutlined, CodeOutlined, DesignOutlined, DollarOutlined,
  BarChartOutlined, PieChartOutlined, FundOutlined, RiseOutlined,
  ArrowLeftOutlined, ArrowRightOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Panel } = Collapse;

const InterviewPrep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [selectedRole, setSelectedRole] = useState('software-engineer');
  const [difficultyLevel, setDifficultyLevel] = useState(2);
  const [sessionType, setSessionType] = useState('technical');
  const [recordingTime, setRecordingTime] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [clarityScore, setClarityScore] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [aiAnalysisModal, setAiAnalysisModal] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [personalizedPlan, setPersonalizedPlan] = useState(null);
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(null);
  const [avatarExpression, setAvatarExpression] = useState('neutral');
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Advanced particle system
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

    // Create advanced particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)],
        pulse: Math.random() * Math.PI * 2,
        originalSize: 0
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
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
          particle.size = particle.originalSize * (1 + (150 - distance) / 150);
        } else {
          particle.size = particle.originalSize;
        }
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;
        
        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;
        
        // Pulsing effect
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
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

  // Timer for recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused]);

  // Interview questions database
  const questionDatabase = {
    technical: {
      'software-engineer': [
        "Explain the difference between SQL and NoSQL databases.",
        "What are the principles of Object-Oriented Programming?",
        "How would you optimize a slow-performing web application?",
        "Describe your experience with version control systems like SVN or Mercurial.",
        "What's the difference between synchronous and asynchronous programming?"
      ],
      'data-scientist': [
        "Explain the bias-variance tradeoff in machine learning.",
        "How would you handle missing data in a dataset?",
        "What's the difference between supervised and unsupervised learning?",
        "Describe a time when you had to explain complex data to non-technical stakeholders.",
        "Which metrics would you use to evaluate a classification model?"
      ]
    },
    behavioral: [
      "Tell me about a time when you faced a significant challenge at work.",
      "Describe a situation where you had to work with a difficult team member.",
      "How do you handle stress and pressure in the workplace?",
      "Tell me about a time when you had to learn something completely new.",
      "Describe your greatest professional achievement."
    ],
    situational: [
      "If you noticed a colleague making a significant error, how would you handle it?",
      "How would you prioritize tasks when everything seems urgent?",
      "What would you do if you disagreed with your manager's decision?",
      "How would you handle a situation where you made a mistake that affected the team?",
      "If you had to choose between quality and meeting a deadline, what would you do?"
    ]
  };

  const industries = [
    { value: 'technology', label: 'Technology', icon: <LaptopOutlined />, color: '#1890ff' },
    { value: 'finance', label: 'Finance', icon: <DollarOutlined />, color: '#52c41a' },
    { value: 'healthcare', label: 'Healthcare', icon: <MedicineBoxOutlined />, color: '#f5222d' },
    { value: 'retail', label: 'Retail', icon: <ShopOutlined />, color: '#fa8c16' },
    { value: 'automotive', label: 'Automotive', icon: <CarOutlined />, color: '#722ed1' },
    { value: 'banking', label: 'Banking', icon: <BankOutlined />, color: '#13c2c2' }
  ];

  const roles = {
    technology: [
      { value: 'software-engineer', label: 'Software Engineer' },
      { value: 'data-scientist', label: 'Data Scientist' },
      { value: 'product-manager', label: 'Product Manager' },
      { value: 'ui-ux-designer', label: 'UI/UX Designer' }
    ],
    finance: [
      { value: 'financial-analyst', label: 'Financial Analyst' },
      { value: 'investment-banker', label: 'Investment Banker' },
      { value: 'risk-manager', label: 'Risk Manager' }
    ]
  };

  // Mock AI Analysis Results
  const mockAnalysisResults = {
    overallScore: 87,
    strengths: [
      'Clear communication',
      'Good technical knowledge',
      'Confident delivery',
      'Structured thinking'
    ],
    improvements: [
      'Reduce filler words ("um", "uh")',
      'Maintain more eye contact',
      'Provide more specific examples',
      'Slow down speaking pace slightly'
    ],
    emotions: {
      confidence: 85,
      enthusiasm: 78,
      nervousness: 25,
      clarity: 90
    },
    speechAnalysis: {
      wordsPerMinute: 165,
      pauseFrequency: 'Normal',
      volumeLevel: 'Appropriate',
      fillerWords: 12
    },
    bodyLanguage: {
      eyeContact: 'Good',
      posture: 'Excellent',
      handGestures: 'Natural',
      facialExpressions: 'Engaged'
    },
    recommendations: [
      'Practice the STAR method for behavioral questions',
      'Research the company culture more thoroughly',
      'Prepare 3-4 specific examples for common questions',
      'Work on reducing nervous habits'
    ]
  };

  // Start recording session
  const startRecording = async () => {
    try {
      setIsRecording(true);
      setSessionActive(true);
      setRecordingTime(0);
      setCurrentQuestion(0);
      
      // Simulate getting camera/microphone access
      setTimeout(() => {
        message.success('Recording started! AI is analyzing your performance in real-time.');
        simulateRealTimeAnalysis();
      }, 1000);
    } catch (error) {
      message.error('Unable to access camera/microphone. Please check permissions.');
    }
  };

  // Simulate real-time analysis
  const simulateRealTimeAnalysis = () => {
    const analysisInterval = setInterval(() => {
      if (!isRecording) {
        clearInterval(analysisInterval);
        return;
      }
      
      setConfidenceScore(Math.floor(Math.random() * 20) + 70);
      setClarityScore(Math.floor(Math.random() * 15) + 80);
      setSpeedScore(Math.floor(Math.random() * 10) + 85);
      
      // Change avatar expression based on analysis
      const expressions = ['encouraging', 'attentive', 'nodding', 'thinking'];
      setAvatarExpression(expressions[Math.floor(Math.random() * expressions.length)]);
      
      setRealTimeAnalysis({
        suggestion: [
          'Great eye contact! Keep it up.',
          'Try to speak a bit slower.',
          'Excellent use of examples.',
          'Remember to breathe naturally.',
          'Good structure in your answer.'
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date().toLocaleTimeString()
      });
    }, 3000);
  };

  // Stop recording and show analysis
  const stopRecording = () => {
    setIsRecording(false);
    setSessionActive(false);
    setIsPaused(false);
    
    // Simulate AI analysis processing
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults);
      setAiAnalysisModal(true);
      
      // Add to practice history
      const newSession = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        duration: recordingTime,
        score: mockAnalysisResults.overallScore,
        type: sessionType,
        industry: selectedIndustry,
        role: selectedRole
      };
      setPracticeHistory(prev => [newSession, ...prev]);
      
      message.success('Interview analysis complete! Check your detailed results.');
    }, 2000);
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const nextQuestion = () => {
    if (currentQuestion < getCurrentQuestions().length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getCurrentQuestions = () => {
    if (sessionType === 'technical') {
      return questionDatabase.technical[selectedRole] || [];
    }
    return questionDatabase[sessionType] || [];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              <RobotOutlined style={{ fontSize: '60px', color: '#fff' }} />
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
              AI Interview Coach
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Experience the future of interview preparation with AI-powered real-time feedback, 
              emotion analysis, and personalized coaching.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                  value={94}
                  suffix="%"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>AI Accuracy</span>}
                  value={98.7}
                  suffix="%"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Practice Sessions</span>}
                  value={1.2}
                  suffix="M+"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Industries</span>}
                  value={50}
                  suffix="+"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Main Interface */}
          <Row gutter={[32, 32]}>
            
            {/* Left Panel - Setup & Controls */}
            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '600px'
              }}>
                <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
                  Interview Setup
                </Title>

                <Form layout="vertical">
                  <Form.Item label={<span style={{ color: '#fff' }}>Industry</span>}>
                    <Select
                      value={selectedIndustry}
                      onChange={setSelectedIndustry}
                      style={{ width: '100%' }}
                      size="large"
                    >
                      {industries.map(industry => (
                        <Option key={industry.value} value={industry.value}>
                          <Space>
                            {industry.icon}
                            {industry.label}
                          </Space>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Role</span>}>
                    <Select
                      value={selectedRole}
                      onChange={setSelectedRole}
                      style={{ width: '100%' }}
                      size="large"
                    >
                      {(roles[selectedIndustry] || roles.technology).map(role => (
                        <Option key={role.value} value={role.value}>
                          {role.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Interview Type</span>}>
                    <Radio.Group
                      value={sessionType}
                      onChange={e => setSessionType(e.target.value)}
                      size="large"
                      style={{ width: '100%' }}
                    >
                      <Radio.Button value="technical" style={{ flex: 1, textAlign: 'center' }}>
                        Technical
                      </Radio.Button>
                      <Radio.Button value="behavioral" style={{ flex: 1, textAlign: 'center' }}>
                        Behavioral
                      </Radio.Button>
                      <Radio.Button value="situational" style={{ flex: 1, textAlign: 'center' }}>
                        Situational
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#fff' }}>Difficulty Level</span>}>
                    <Slider
                      min={1}
                      max={5}
                      value={difficultyLevel}
                      onChange={setDifficultyLevel}
                      marks={{
                        1: 'Beginner',
                        2: 'Junior',
                        3: 'Mid',
                        4: 'Senior',
                        5: 'Expert'
                      }}
                      style={{ marginBottom: '20px' }}
                    />
                  </Form.Item>

                  <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                  {/* Session Controls */}
                  <div style={{ textAlign: 'center' }}>
                    {!sessionActive ? (
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={startRecording}
                        style={{
                          borderRadius: '16px',
                          padding: '12px 32px',
                          height: 'auto',
                          fontSize: '16px',
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                          border: 'none'
                        }}
                      >
                        Start Interview
                      </Button>
                    ) : (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div style={{ color: '#fff', fontSize: '18px', marginBottom: '16px' }}>
                          Recording: {formatTime(recordingTime)}
                        </div>
                        <Space>
                          <Button
                            icon={isPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                            onClick={pauseRecording}
                            size="large"
                          >
                            {isPaused ? 'Resume' : 'Pause'}
                          </Button>
                          <Button
                            icon={<StopOutlined />}
                            onClick={stopRecording}
                            danger
                            size="large"
                          >
                            Stop
                          </Button>
                        </Space>
                      </Space>
                    )}
                  </div>
                </Form>
              </Card>
            </Col>

            {/* Center Panel - Video & Questions */}
            <Col xs={24} lg={10}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '600px'
              }}>
                {sessionActive ? (
                  <div>
                    {/* Video Preview */}
                    <div style={{
                      width: '100%',
                      height: '200px',
                      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                      borderRadius: '16px',
                      marginBottom: '20px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(78, 205, 196, 0.3)'
                    }}>
                      <VideoCameraOutlined style={{ fontSize: '48px', color: '#4ECDC4' }} />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255, 107, 107, 0.8)',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        color: '#fff',
                        fontSize: '12px'
                      }}>
                        REC {formatTime(recordingTime)}
                      </div>
                    </div>

                    {/* Current Question */}
                    <Card style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <Badge count={`${currentQuestion + 1}/${getCurrentQuestions().length}`} 
                               style={{ backgroundColor: '#4ECDC4' }}>
                          <Avatar icon={<MessageOutlined />} size={48} 
                                 style={{ backgroundColor: '#FF6B6B' }} />
                        </Badge>
                      </div>
                      
                      <Title level={4} style={{ color: '#fff', textAlign: 'center', marginBottom: '16px' }}>
                        Question {currentQuestion + 1}
                      </Title>
                      
                      <Text style={{ 
                        color: 'rgba(255, 255, 255, 0.9)', 
                        fontSize: '16px',
                        display: 'block',
                        textAlign: 'center',
                        lineHeight: '1.6'
                      }}>
                        {getCurrentQuestions()[currentQuestion]}
                      </Text>
                    </Card>

                    {/* Question Navigation */}
                    <div style={{ textAlign: 'center' }}>
                      <Space>
                        <Button
                          icon={<ArrowLeftOutlined />}
                          onClick={previousQuestion}
                          disabled={currentQuestion === 0}
                        >
                          Previous
                        </Button>
                        <Button
                          icon={<ArrowRightOutlined />}
                          onClick={nextQuestion}
                          disabled={currentQuestion === getCurrentQuestions().length - 1}
                        >
                          Next
                        </Button>
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
                    <Avatar
                      size={120}
                      icon={<RobotOutlined />}
                      style={{ 
                        backgroundColor: '#4ECDC4',
                        marginBottom: '24px',
                        margin: '0 auto 24px'
                      }}
                    />
                    <Title level={3} style={{ color: '#fff', marginBottom: '16px' }}>
                      Ready to Start?
                    </Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                      Configure your interview settings and click "Start Interview" to begin your AI-powered practice session.
                    </Text>
                  </div>
                )}
              </Card>
            </Col>

            {/* Right Panel - Real-time Analysis */}
            <Col xs={24} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                height: '600px'
              }}>
                <Title level={4} style={{ color: '#fff', textAlign: 'center', marginBottom: '24px' }}>
                  Real-time Analysis
                </Title>

                {sessionActive ? (
                  <div>
                    {/* AI Avatar */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <Avatar
                        size={80}
                        icon={<RobotOutlined />}
                        style={{ 
                          backgroundColor: avatarExpression === 'encouraging' ? '#52c41a' : 
                                          avatarExpression === 'thinking' ? '#faad14' : '#4ECDC4',
                          marginBottom: '12px'
                        }}
                      />
                      <div style={{ color: '#fff', fontSize: '14px' }}>
                        AI Coach: {avatarExpression}
                      </div>
                    </div>

                    {/* Real-time Scores */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>
                          Confidence: {confidenceScore}%
                        </div>
                        <Progress 
                          percent={confidenceScore} 
                          strokeColor="#52c41a" 
                          showInfo={false}
                          size="small"
                        />
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>
                          Clarity: {clarityScore}%
                        </div>
                        <Progress 
                          percent={clarityScore} 
                          strokeColor="#1890ff" 
                          showInfo={false}
                          size="small"
                        />
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>
                          Pace: {speedScore}%
                        </div>
                        <Progress 
                          percent={speedScore} 
                          strokeColor="#faad14" 
                          showInfo={false}
                          size="small"
                        />
                      </div>
                    </div>

                    {/* Real-time Suggestions */}
                    {realTimeAnalysis && (
                      <Alert
                        message="AI Suggestion"
                        description={realTimeAnalysis.suggestion}
                        type="info"
                        showIcon
                        style={{ 
                          marginBottom: '16px',
                          background: 'rgba(24, 144, 255, 0.1)',
                          border: '1px solid rgba(24, 144, 255, 0.3)'
                        }}
                      />
                    )}

                    {/* Quick Tips */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <Title level={5} style={{ color: '#fff', marginBottom: '12px' }}>
                        Quick Tips
                      </Title>
                      <ul style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                        <li>Maintain eye contact with camera</li>
                        <li>Use the STAR method for examples</li>
                        <li>Take a breath before answering</li>
                        <li>Speak clearly and at a steady pace</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <BulbOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Real-time analysis will appear here during your interview session.
                    </Text>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          {/* Features Section */}
          <Row gutter={[32, 32]} style={{ marginTop: '60px' }}>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                height: '280px'
              }}>
                <ThunderboltFilled style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Real-time Feedback
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Get instant analysis of your speech patterns, confidence levels, and body language during the interview.
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
                <EyeOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Emotion Detection
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Advanced AI analyzes your facial expressions and voice tone to provide insights on emotional state.
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
                <BookOutlined style={{ fontSize: '48px', color: '#FFD93D', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Industry-Specific
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Tailored questions and scenarios for over 50 industries with role-specific interview formats.
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
                <TrophyOutlined style={{ fontSize: '48px', color: '#6BCF7F', marginBottom: '20px' }} />
                <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                  Progress Tracking
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Track your improvement over time with detailed analytics and personalized learning paths.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* AI Analysis Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <TrophyOutlined style={{ fontSize: '32px', color: '#FFD93D', marginRight: '12px' }} />
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Interview Analysis Complete</span>
          </div>
        }
        open={aiAnalysisModal}
        onCancel={() => setAiAnalysisModal(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {analysisResults && (
          <div>
            {/* Overall Score */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Progress
                type="circle"
                percent={analysisResults.overallScore}
                width={120}
                strokeColor={{
                  '0%': '#FF6B6B',
                  '100%': '#4ECDC4',
                }}
                format={percent => (
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{percent}%</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Overall Score</div>
                  </div>
                )}
              />
            </div>

            <Tabs defaultActiveKey="1">
              <TabPane tab="Performance" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Strengths" size="small">
                      <List
                        dataSource={analysisResults.strengths}
                        renderItem={item => (
                          <List.Item>
                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Areas for Improvement" size="small">
                      <List
                        dataSource={analysisResults.improvements}
                        renderItem={item => (
                          <List.Item>
                            <BulbOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Emotions" key="2">
                <Row gutter={[16, 16]}>
                  {Object.entries(analysisResults.emotions).map(([emotion, score]) => (
                    <Col span={12} key={emotion}>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', textTransform: 'capitalize' }}>
                          {emotion}: {score}%
                        </div>
                        <Progress 
                          percent={score} 
                          strokeColor={
                            emotion === 'nervousness' ? '#ff4d4f' : 
                            emotion === 'confidence' ? '#52c41a' : '#1890ff'
                          }
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </TabPane>

              <TabPane tab="Speech Analysis" key="3">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="Words per Minute"
                      value={analysisResults.speechAnalysis.wordsPerMinute}
                      suffix="WPM"
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Filler Words"
                      value={analysisResults.speechAnalysis.fillerWords}
                      suffix="count"
                    />
                  </Col>
                  <Col span={12}>
                    <div>
                      <Text strong>Pause Frequency:</Text> {analysisResults.speechAnalysis.pauseFrequency}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Text strong>Volume Level:</Text> {analysisResults.speechAnalysis.volumeLevel}
                    </div>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Recommendations" key="4">
                <List
                  dataSource={analysisResults.recommendations}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#4ECDC4' }}>{index + 1}</Avatar>}
                        description={item}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Space>
                <Button type="primary" size="large">
                  Practice Again
                </Button>
                <Button size="large">
                  Download Report
                </Button>
                <Button size="large">
                  Share Results
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default InterviewPrep; 