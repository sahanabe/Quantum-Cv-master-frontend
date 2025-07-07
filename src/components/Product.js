import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Statistic, 
  Avatar, 
  Badge,
  Tag,
  Divider,
  Progress,
  Switch,
  Slider,
  Input,
  Select,
  Modal,
  Tooltip,
  Timeline,
  Rate,
  notification
} from 'antd';
import {
  RocketOutlined,
  ThunderboltFilled,
  TeamOutlined,
  UserOutlined,
  CrownOutlined,
  SafetyOutlined,
  BulbOutlined,
  TrophyOutlined,
  LineChartOutlined,
  DatabaseOutlined,
  CloudOutlined,
  LockOutlined,
  CheckCircleOutlined,
  StarFilled,
  ArrowRightOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  HeartFilled,
  EyeOutlined,
  BarChartOutlined,
  GlobalOutlined,
  ApiOutlined,
  SettingOutlined,
  MobileOutlined,
  DesktopOutlined,
  TabletOutlined,
  FileTextOutlined,
  MailOutlined,
  PhoneOutlined,
  ZoomInOutlined,
  FilterOutlined,
  SyncOutlined,
  ExportOutlined,
  ImportOutlined,
  SearchOutlined,
  NotificationOutlined,
  DashboardOutlined,
  AreaChartOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Product = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('individual');
  const [selectedPlan, setSelectedPlan] = useState('enterprise');
  const [demoModalVisible, setDemoModalVisible] = useState(false);
  const [freeTrialModalVisible, setFreeTrialModalVisible] = useState(false);
  const [trialActivated, setTrialActivated] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  const canvasRef = useRef(null);

  // Check if user already has an active trial
  useEffect(() => {
    const savedTrialData = localStorage.getItem('quantumCV_trial');
    if (savedTrialData) {
      const trialData = JSON.parse(savedTrialData);
      const endDate = new Date(trialData.endDate);
      const now = new Date();
      
      if (now < endDate) {
        setTrialActivated(true);
        setTrialEndDate(endDate);
      } else {
        // Trial expired, remove from localStorage
        localStorage.removeItem('quantumCV_trial');
      }
    }
  }, []);

  const activateFreeTrial = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // 30 days from now
    
    const trialData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      activated: true
    };
    
    localStorage.setItem('quantumCV_trial', JSON.stringify(trialData));
    setTrialActivated(true);
    setTrialEndDate(endDate);
    setFreeTrialModalVisible(false);
    
    // Show success notification
    notification.success({
      message: '🎉 Free Trial Activated!',
      description: 'Welcome to QuantumCV! Your 30-day free trial has started. Enjoy unlimited access to all premium features.',
      duration: 5,
      placement: 'topRight',
      style: {
        background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
        border: '1px solid #4ECDC4',
        color: '#fff'
      }
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleStartFreeTrial = () => {
    if (trialActivated) {
      // If trial is already active, go to dashboard
      navigate('/dashboard');
    } else {
      // Show trial activation modal
      setFreeTrialModalVisible(true);
    }
  };

  const getDaysRemaining = () => {
    if (!trialEndDate) return 0;
    const now = new Date();
    const diffTime = trialEndDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Particle animation effect
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

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
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
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Animation cycle for features
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const enterpriseFeatures = [
    {
      icon: <DatabaseOutlined />,
      title: 'Bulk Resume Processing',
      description: 'Process thousands of resumes simultaneously with AI-powered analysis',
      stats: '10,000+ resumes/hour',
      color: '#FF6B6B',
      route: '/bulk-processing'
    },
    {
      icon: <TeamOutlined />,
      title: 'Multi-User Dashboard',
      description: 'Collaborative workspace for HR teams with role-based permissions',
      stats: 'Unlimited users',
      color: '#4ECDC4',
      route: '/multi-user-dashboard'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Advanced Analytics',
      description: 'Deep insights into hiring patterns, candidate quality metrics',
      stats: '50+ analytics reports',
      color: '#FFD93D',
      route: '/advanced-analytics'
    },
    {
      icon: <ApiOutlined />,
      title: 'API Integration',
      description: 'Seamlessly integrate with your existing ATS and HR systems',
      stats: 'RESTful API',
      color: '#6BCF7F',
      route: '/api-integration'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with advanced encryption and data protection',
      stats: 'Bank-level security',
      color: '#A8E6CF',
      route: '/enterprise-security'
    },
    {
      icon: <CloudOutlined />,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solution with 99.9% uptime guarantee',
      stats: '99.9% uptime',
      color: '#FFA07A',
      route: '/cloud-infrastructure'
    }
  ];

  const individualFeatures = [
    {
      icon: <FileTextOutlined />,
      title: 'AI Resume Optimization',
      description: 'Get personalized suggestions to improve your resume for any job',
      stats: '95% improvement rate',
      color: '#FF6B6B',
      route: '/ai-resume-optimization'
    },
    {
      icon: <SearchOutlined />,
      title: 'Job Matching Engine',
      description: 'Find perfect job matches based on your skills and experience',
      stats: '3x more interviews',
      color: '#4ECDC4',
      route: '/jobs'
    },
    {
      icon: <TrophyOutlined />,
      title: 'Interview Preparation',
      description: 'AI-powered interview coaching and practice sessions',
      stats: '80% success rate',
      color: '#FFD93D',
      route: '/interview-prep'
    },
    {
      icon: <LineChartOutlined />,
      title: 'Career Path Analysis',
      description: 'Discover optimal career trajectories and skill development plans',
      stats: 'Personalized roadmap',
      color: '#6BCF7F',
      route: '/career-analysis'
    },
    {
      icon: <StarFilled />,
      title: 'Professional Branding',
      description: 'Build a compelling professional brand across all platforms',
      stats: '5x profile views',
      color: '#A8E6CF',
      route: '/professional-branding'
    },
    {
      icon: <ThunderboltFilled />,
      title: 'Instant Applications',
      description: 'Apply to multiple jobs instantly with auto-customized materials',
      stats: '10x faster applications',
      color: '#FFA07A',
      route: '/instant-applications'
    }
  ];

  const pricingPlans = {
    individual: [
      {
        name: 'Starter',
        price: 'Free',
        description: 'Perfect for job seekers getting started',
        features: [
          'Basic resume analysis',
          '5 job applications per month',
          'Standard templates',
          'Email support'
        ],
        color: '#4ECDC4',
        popular: false
      },
      {
        name: 'Professional',
        price: '$29',
        period: '/month',
        description: 'For serious job seekers',
        features: [
          'Advanced AI analysis',
          'Unlimited applications',
          'Premium templates',
          'Interview coaching',
          'Priority support'
        ],
        color: '#FF6B6B',
        popular: true
      },
      {
        name: 'Career Pro',
        price: '$79',
        period: '/month',
        description: 'For career changers and executives',
        features: [
          'Everything in Professional',
          'Personal career coach',
          'Executive templates',
          'LinkedIn optimization',
          'Salary negotiation tools'
        ],
        color: '#FFD93D',
        popular: false
      }
    ],
    enterprise: [
      {
        name: 'Team',
        price: '$299',
        period: '/month',
        description: 'For small to medium teams',
        features: [
          'Up to 25 users',
          'Bulk resume processing',
          'Team analytics',
          'API access',
          'Dedicated support'
        ],
        color: '#4ECDC4',
        popular: false
      },
      {
        name: 'Business',
        price: '$899',
        period: '/month',
        description: 'For growing companies',
        features: [
          'Up to 100 users',
          'Advanced analytics',
          'Custom integrations',
          'White-label options',
          'Phone support'
        ],
        color: '#FF6B6B',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations',
        features: [
          'Unlimited users',
          'Full customization',
          'On-premise deployment',
          'SLA guarantees',
          '24/7 support'
        ],
        color: '#FFD93D',
        popular: false
      }
    ]
  };

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Head of Talent Acquisition, TechCorp',
      avatar: '👩‍💼',
      rating: 5,
      text: 'QuantumCV transformed our hiring process. We reduced time-to-hire by 60% and improved candidate quality significantly.',
      company: 'TechCorp',
      results: '60% faster hiring'
    },
    {
      name: 'Marcus Johnson',
      role: 'Software Engineer',
      avatar: '👨‍💻',
      rating: 5,
      text: 'Got 3 job offers in 2 weeks using QuantumCV. The AI suggestions were spot-on and the application process was seamless.',
      company: 'Individual User',
      results: '3 offers in 2 weeks'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Chief People Officer, HealthTech Inc',
      avatar: '👩‍⚕️',
      rating: 5,
      text: 'The analytics insights helped us identify the best talent sources and optimize our recruitment strategy.',
      company: 'HealthTech Inc',
      results: '40% better hires'
    }
  ];

  const stats = [
    { title: 'Resumes Processed', value: '2.5M+', icon: <FileTextOutlined />, color: '#FF6B6B' },
    { title: 'Job Placements', value: '150K+', icon: <TrophyOutlined />, color: '#4ECDC4' },
    { title: 'Enterprise Clients', value: '500+', icon: <TeamOutlined />, color: '#FFD93D' },
    { title: 'Success Rate', value: '94%', icon: <StarFilled />, color: '#6BCF7F' }
  ];

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

      {/* Hero Section */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        padding: '120px 24px 80px',
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '60px 40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '80px'
        }}>
          <h1 style={{
            fontSize: '72px',
            fontWeight: 900,
            margin: '0 0 24px 0',
            background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFD93D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(78, 205, 196, 0.3)'
          }}>
            Quantum Products
          </h1>
          
          <p style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            Revolutionary AI-powered solutions for enterprises and individuals. 
            Transform your recruitment process or accelerate your career with next-generation technology.
          </p>

          {/* User Type Selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <Button
              size="large"
              type={userType === 'individual' ? 'primary' : 'default'}
              icon={<UserOutlined />}
              onClick={() => setUserType('individual')}
              style={{
                borderRadius: '25px',
                padding: '12px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 600,
                background: userType === 'individual' 
                  ? 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                boxShadow: userType === 'individual' 
                  ? '0 8px 25px rgba(255, 107, 107, 0.3)' 
                  : 'none'
              }}
            >
              Individual Users
            </Button>
            <Button
              size="large"
              type={userType === 'enterprise' ? 'primary' : 'default'}
              icon={<TeamOutlined />}
              onClick={() => setUserType('enterprise')}
              style={{
                borderRadius: '25px',
                padding: '12px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 600,
                background: userType === 'enterprise' 
                  ? 'linear-gradient(135deg, #4ECDC4, #FFD93D)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                boxShadow: userType === 'enterprise' 
                  ? '0 8px 25px rgba(78, 205, 196, 0.3)' 
                  : 'none'
              }}
            >
              Enterprise Solutions
            </Button>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              size="large"
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => setDemoModalVisible(true)}
              style={{
                borderRadius: '25px',
                padding: '16px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                border: 'none',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)'
              }}
            >
              Watch Demo
            </Button>
            <Button
              size="large"
              icon={<RocketOutlined />}
              onClick={handleStartFreeTrial}
              style={{
                borderRadius: '25px',
                padding: '16px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 700,
                background: trialActivated 
                  ? 'linear-gradient(135deg, #52C41A, #73D13D)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff'
              }}
            >
              {trialActivated ? `Trial Active (${getDaysRemaining()} days left)` : 'Start Free Trial'}
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <Row gutter={[32, 32]} style={{ marginBottom: '80px' }}>
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <Card
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  textAlign: 'center'
                }}
                bodyStyle={{ padding: '32px 16px' }}
              >
                <div style={{ 
                  color: stat.color, 
                  fontSize: '40px', 
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 0 10px rgba(78, 205, 196, 0.6))'
                }}>
                  {stat.icon}
                </div>
                <Statistic
                  value={stat.value}
                  valueStyle={{ 
                    color: '#fff', 
                    fontSize: '32px', 
                    fontWeight: 900,
                    marginBottom: '8px'
                  }}
                />
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '16px' }}>
                  {stat.title}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Features Section */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        padding: '80px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '60px',
          color: '#fff',
          textShadow: '0 0 20px rgba(78, 205, 196, 0.3)'
        }}>
          {userType === 'enterprise' ? 'Enterprise Solutions' : 'Individual Features'}
        </h2>

        <Row gutter={[32, 32]}>
          {(userType === 'enterprise' ? enterpriseFeatures : individualFeatures).map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                onClick={() => feature.route && navigate(feature.route)}
                style={{
                  height: '320px',
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${feature.color}40`,
                  borderRadius: '24px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: feature.route ? 'pointer' : 'default'
                }}
                bodyStyle={{ 
                  padding: '32px 24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                className="feature-card"
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      color: feature.color,
                      marginRight: '16px',
                      filter: `drop-shadow(0 0 10px ${feature.color}60)`
                    }}>
                      {feature.icon}
                    </div>
                    <h3 style={{
                      color: '#fff',
                      fontSize: '20px',
                      fontWeight: 700,
                      margin: 0
                    }}>
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {feature.description}
                  </p>
                </div>

                <div style={{
                  padding: '12px 16px',
                  background: `${feature.color}20`,
                  borderRadius: '12px',
                  border: `1px solid ${feature.color}40`
                }}>
                  <div style={{
                    color: feature.color,
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}>
                    {feature.stats}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Pricing Section */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        padding: '80px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '60px',
          color: '#fff',
          textShadow: '0 0 20px rgba(255, 215, 61, 0.3)'
        }}>
          Choose Your Plan
        </h2>

        <Row gutter={[32, 32]} justify="center">
          {pricingPlans[userType].map((plan, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                style={{
                  height: '480px',
                  background: plan.popular 
                    ? `linear-gradient(135deg, ${plan.color}20 0%, rgba(255, 255, 255, 0.05) 100%)`
                    : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: plan.popular 
                    ? `2px solid ${plan.color}`
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                bodyStyle={{ 
                  padding: '32px 24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: `linear-gradient(135deg, ${plan.color}, #FFD93D)`,
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: `0 4px 15px ${plan.color}40`
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}>
                    {plan.name}
                  </h3>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      color: plan.color,
                      fontSize: '36px',
                      fontWeight: 900
                    }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '16px' }}>
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '16px',
                    marginBottom: '24px'
                  }}>
                    {plan.description}
                  </p>

                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0,
                    marginBottom: '32px'
                  }}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <CheckCircleOutlined style={{ 
                          color: plan.color, 
                          marginRight: '12px',
                          fontSize: '16px'
                        }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={plan.price === 'Free' ? null : 
                          plan.price === 'Custom' ? null : handleStartFreeTrial}
                  style={{
                    borderRadius: '16px',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 700,
                    background: plan.popular 
                      ? `linear-gradient(135deg, ${plan.color}, #FFD93D)`
                      : `linear-gradient(135deg, ${plan.color}, #4ECDC4)`,
                    border: 'none',
                    boxShadow: `0 6px 20px ${plan.color}40`
                  }}
                >
                  {plan.price === 'Free' ? 'Get Started' : 
                   plan.price === 'Custom' ? 'Contact Sales' : 
                   trialActivated ? `Trial Active (${getDaysRemaining()} days left)` : 'Start Free Trial'}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Testimonials */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        padding: '80px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '60px',
          color: '#fff',
          textShadow: '0 0 20px rgba(168, 230, 207, 0.3)'
        }}>
          Success Stories
        </h2>

        <Row gutter={[32, 32]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} lg={8} key={index}>
              <Card
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  height: '320px'
                }}
                bodyStyle={{ 
                  padding: '32px 24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '48px',
                      marginRight: '16px'
                    }}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 style={{ 
                        color: '#fff', 
                        margin: 0, 
                        fontSize: '18px',
                        fontWeight: 600
                      }}>
                        {testimonial.name}
                      </h4>
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        margin: 0,
                        fontSize: '14px'
                      }}>
                        {testimonial.role}
                      </p>
                      <div style={{ marginTop: '8px' }}>
                        <Rate 
                          disabled 
                          defaultValue={testimonial.rating} 
                          style={{ fontSize: '14px' }}
                        />
                      </div>
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                    marginBottom: '20px'
                  }}>
                    "{testimonial.text}"
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '14px'
                  }}>
                    {testimonial.company}
                  </span>
                  <Tag color="success" style={{
                    borderRadius: '12px',
                    padding: '4px 12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #52C41A, #73D13D)'
                  }}>
                    {testimonial.results}
                  </Tag>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Demo Modal */}
      <Modal
        title={
          <div style={{ 
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 700,
            color: '#fff'
          }}>
            🚀 Quantum Products Demo
          </div>
        }
        open={demoModalVisible}
        onCancel={() => setDemoModalVisible(false)}
        footer={null}
        width={800}
        style={{ top: 50 }}
        styles={{
          body: {
            background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
            borderRadius: '16px',
            padding: '40px'
          }
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '48px'
          }}>
            <PlayCircleOutlined />
          </div>
          
          <h3 style={{ color: '#fff', fontSize: '28px', marginBottom: '16px' }}>
            Interactive Demo Coming Soon!
          </h3>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '18px',
            marginBottom: '32px' 
          }}>
            Experience the power of QuantumCV with our interactive demo. 
            See how we're revolutionizing recruitment and career advancement.
          </p>

          <Timeline
            items={[
              {
                color: '#4ECDC4',
                children: <span style={{ color: '#fff' }}>Upload your resume or job description</span>
              },
              {
                color: '#FF6B6B',
                children: <span style={{ color: '#fff' }}>AI analyzes and provides insights</span>
              },
              {
                color: '#FFD93D',
                children: <span style={{ color: '#fff' }}>Get personalized recommendations</span>
              },
              {
                color: '#6BCF7F',
                children: <span style={{ color: '#fff' }}>Apply to jobs or find candidates</span>
              }
            ]}
            style={{ textAlign: 'left', marginBottom: '32px' }}
          />

          <Button
            type="primary"
            size="large"
            icon={<MailOutlined />}
            style={{
              borderRadius: '16px',
              padding: '12px 24px',
              height: 'auto',
              fontSize: '16px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              border: 'none',
              marginRight: '16px'
            }}
          >
            Request Demo
          </Button>
          
          <Button
            size="large"
            icon={<PhoneOutlined />}
            style={{
              borderRadius: '16px',
              padding: '12px 24px',
              height: 'auto',
              fontSize: '16px',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff'
            }}
          >
            Schedule Call
          </Button>
        </div>
      </Modal>

      {/* Free Trial Modal */}
      <Modal
        title={
          <div style={{ 
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 700,
            color: '#fff'
          }}>
            🎉 Start Your 30-Day Free Trial
          </div>
        }
        open={freeTrialModalVisible}
        onCancel={() => setFreeTrialModalVisible(false)}
        footer={null}
        width={600}
        centered
        styles={{
          body: {
            background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
            borderRadius: '16px',
            padding: '40px'
          }
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '40px'
          }}>
            🚀
          </div>
          
          <h3 style={{ color: '#fff', fontSize: '28px', marginBottom: '16px' }}>
            Unlock Full Access to QuantumCV
          </h3>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '18px',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Get 30 days of unlimited access to all premium features. No credit card required!
          </p>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
            border: '1px solid rgba(78, 205, 196, 0.3)'
          }}>
            <h4 style={{ color: '#4ECDC4', marginBottom: '16px', fontSize: '20px' }}>
              What's Included:
            </h4>
            <div style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: '12px', fontSize: '16px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>AI-Powered Resume Analysis & Optimization</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: '12px', fontSize: '16px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Smart Job Matching Engine</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: '12px', fontSize: '16px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Professional Branding Tools</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: '12px', fontSize: '16px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Interview Preparation & Practice</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: '12px', fontSize: '16px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Career Analytics Dashboard</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: '12px', fontSize: '16px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Priority Customer Support</span>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 215, 61, 0.1)',
            border: '1px solid rgba(255, 215, 61, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <StarFilled style={{ color: '#FFD93D' }} />
              <span style={{ color: '#FFD93D', fontWeight: 600 }}>
                Limited Time: No Credit Card Required
              </span>
              <StarFilled style={{ color: '#FFD93D' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={activateFreeTrial}
              style={{
                borderRadius: '16px',
                padding: '12px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                border: 'none',
                minWidth: '200px'
              }}
            >
              Activate Free Trial
            </Button>
            
            <Button
              size="large"
              onClick={() => setFreeTrialModalVisible(false)}
              style={{
                borderRadius: '16px',
                padding: '12px 24px',
                height: 'auto',
                fontSize: '16px',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff'
              }}
            >
              Maybe Later
            </Button>
          </div>

          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: '14px',
            marginTop: '24px',
            marginBottom: 0
          }}>
            Trial automatically expires after 30 days. Cancel anytime.
          </p>
        </div>
      </Modal>

      {/* Floating CTA */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000
      }}>
        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          onClick={handleStartFreeTrial}
          style={{
            borderRadius: '50px',
            padding: '16px 24px',
            height: 'auto',
            fontSize: '16px',
            fontWeight: 700,
            background: trialActivated 
              ? 'linear-gradient(135deg, #52C41A, #73D13D)'
              : 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
            border: 'none',
            boxShadow: trialActivated 
              ? '0 8px 25px rgba(82, 196, 26, 0.4)'
              : '0 8px 25px rgba(255, 107, 107, 0.4)',
            animation: 'pulse 2s infinite'
          }}
        >
          {trialActivated ? `Trial Active (${getDaysRemaining()} days left)` : 'Start Free Trial'}
        </Button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(78, 205, 196, 0.2);
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 48px !important;
          }
          
          h2 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Product;
