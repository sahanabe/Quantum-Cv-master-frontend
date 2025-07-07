import React, { useState, useEffect } from 'react';
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
  Timeline,
  Rate,
  notification,
  Modal,
  Form,
  Input,
  Select,
  Checkbox
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
  AreaChartOutlined,
  SecurityScanOutlined,
  InfinityOutlined,
  BankOutlined,
  AuditOutlined,
  UsergroupAddOutlined,
  MonitorOutlined,
  RiseOutlined,
  TruckOutlined,
  VerifiedOutlined,
  BuildOutlined,
  CodeOutlined
} from '@ant-design/icons';

const { Option } = Select;

const EnterpriseLanding = () => {
  const navigate = useNavigate();
  const [trialModalVisible, setTrialModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('enterprise-pro');
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  // Check if user already has an active enterprise trial
  const [trialActivated, setTrialActivated] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState(null);

  useEffect(() => {
    const savedTrialData = localStorage.getItem('quantumCV_enterprise_trial');
    if (savedTrialData) {
      const trialData = JSON.parse(savedTrialData);
      const endDate = new Date(trialData.endDate);
      const now = new Date();
      
      if (now < endDate) {
        setTrialActivated(true);
        setTrialEndDate(endDate);
      } else {
        localStorage.removeItem('quantumCV_enterprise_trial');
      }
    }
  }, []);

  const activateEnterpriseTrial = async (values) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7); // 7 days trial
    
    const trialData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      activated: true,
      plan: selectedPlan,
      companyInfo: values
    };
    
    localStorage.setItem('quantumCV_enterprise_trial', JSON.stringify(trialData));
    setTrialActivated(true);
    setTrialEndDate(endDate);
    setTrialModalVisible(false);
    setIsLoading(false);
    
    notification.success({
      message: '🚀 Enterprise Trial Activated!',
      description: 'Welcome to QuantumCV Enterprise! Your 7-day trial has started. Access your dashboard to explore all enterprise features.',
      duration: 5,
      placement: 'topRight',
      style: {
        background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
        border: '1px solid #FFD700',
        color: '#fff'
      }
    });
    
    setTimeout(() => {
      navigate('/enterprise-dashboard');
    }, 2000);
  };

  const getDaysRemaining = () => {
    if (!trialEndDate) return 0;
    const now = new Date();
    const diffTime = trialEndDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const enterpriseFeatures = [
    {
      icon: <UsergroupAddOutlined style={{ fontSize: '48px', color: '#FFD700' }} />,
      title: 'Multi-User Management',
      description: 'Unlimited team members with role-based access control',
      benefits: ['Unlimited users', 'Custom roles', 'Team analytics', 'Collaborative workspace']
    },
    {
      icon: <AreaChartOutlined style={{ fontSize: '48px', color: '#FF6B6B' }} />,
      title: 'Advanced Analytics',
      description: 'Deep insights and custom reports for hiring optimization',
      benefits: ['Custom dashboards', 'ROI tracking', 'Predictive analytics', 'Export capabilities']
    },
    {
      icon: <ApiOutlined style={{ fontSize: '48px', color: '#4ECDC4' }} />,
      title: 'API Integration',
      description: 'Seamless integration with your existing HR systems',
      benefits: ['REST API access', 'Webhook support', 'SSO integration', 'Custom integrations']
    },
    {
      icon: <SecurityScanOutlined style={{ fontSize: '48px', color: '#9B59B6' }} />,
      title: 'Enterprise Security',
      description: 'Bank-level security with compliance certifications',
      benefits: ['SOC 2 certified', 'GDPR compliant', 'Data encryption', 'Audit logs']
    },
    {
      icon: <CloudOutlined style={{ fontSize: '48px', color: '#3498DB' }} />,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud deployment with 99.9% uptime SLA',
      benefits: ['Auto-scaling', '99.9% uptime', 'Global CDN', 'Backup & recovery']
    },
    {
      icon: <TruckOutlined style={{ fontSize: '48px', color: '#E67E22' }} />,
      title: 'Bulk Processing',
      description: 'Process thousands of resumes simultaneously',
      benefits: ['Batch uploads', 'Async processing', 'Progress tracking', 'Error handling']
    }
  ];

  const pricingPlans = [
    {
      id: 'enterprise-starter',
      name: 'Enterprise Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for growing teams',
      features: [
        'Up to 50 users',
        'Basic analytics',
        'Email support',
        '1,000 CV analyses/month',
        'Standard integrations'
      ],
      recommended: false
    },
    {
      id: 'enterprise-pro',
      name: 'Enterprise Pro',
      price: '$599',
      period: '/month',
      description: 'Most popular for medium enterprises',
      features: [
        'Up to 200 users',
        'Advanced analytics',
        'Priority support',
        '5,000 CV analyses/month',
        'Custom integrations',
        'API access'
      ],
      recommended: true
    },
    {
      id: 'enterprise-scale',
      name: 'Enterprise Scale',
      price: '$1,299',
      period: '/month',
      description: 'For large-scale operations',
      features: [
        'Unlimited users',
        'Custom analytics',
        'Dedicated support',
        'Unlimited CV analyses',
        'White-label option',
        'Custom deployment'
      ],
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'VP of Talent, TechCorp',
      company: 'TechCorp',
      rating: 5,
      quote: 'QuantumCV Enterprise reduced our hiring time by 60% and improved candidate quality significantly.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CHRO, InnovateCo',
      company: 'InnovateCo',
      rating: 5,
      quote: 'The AI-powered insights helped us optimize our entire recruitment process. ROI was evident within the first month.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of HR, ScaleUp Inc',
      company: 'ScaleUp Inc',
      rating: 5,
      quote: 'Seamless integration with our existing systems. The team adoption was incredibly smooth.',
      avatar: '👩‍💻'
    }
  ];

  const stats = [
    { title: '10,000+', subtitle: 'Enterprise Users', icon: <TeamOutlined /> },
    { title: '95%', subtitle: 'Faster Screening', icon: <RocketOutlined /> },
    { title: '$2.5M+', subtitle: 'Cost Savings', icon: <BankOutlined /> },
    { title: '99.9%', subtitle: 'Uptime SLA', icon: <SecurityScanOutlined /> }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 215, 61, 0.05) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }} />

      {/* Hero Section */}
      <div style={{ 
        padding: '120px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <Tag 
              icon={<CrownOutlined />} 
              color="gold" 
              style={{ 
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
                fontWeight: 'bold'
              }}
            >
              ENTERPRISE SOLUTION
            </Tag>
          </div>

          <h1 style={{
            fontSize: '72px',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #4ECDC4 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Transform Your
            <br />
            Hiring Process
          </h1>

          <p style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Enterprise-grade AI recruitment platform trusted by Fortune 500 companies.
            <br />
            <strong style={{ color: '#FFD700' }}>Start your 7-day free trial today.</strong>
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              type="primary"
              size="large"
              icon={trialActivated ? <DashboardOutlined /> : <RocketOutlined />}
              onClick={() => trialActivated ? navigate('/enterprise-dashboard') : setTrialModalVisible(true)}
              style={{
                borderRadius: '16px',
                padding: '16px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 700,
                background: trialActivated 
                  ? 'linear-gradient(135deg, #52C41A, #73D13D)'
                  : 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: 'none',
                color: '#000',
                minWidth: '220px',
                boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)'
              }}
            >
              {trialActivated ? `Continue Trial (${getDaysRemaining()} days left)` : 'Start 7-Day Free Trial'}
            </Button>

            <Button
              size="large"
              icon={<LockOutlined />}
              onClick={() => navigate('/enterprise-dashboard')}
              style={{
                borderRadius: '16px',
                padding: '16px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                border: 'none',
                color: '#fff',
                minWidth: '220px',
                boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)'
              }}
            >
              Enterprise Dashboard Login
            </Button>
            
            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={() => setContactModalVisible(true)}
              style={{
                borderRadius: '16px',
                padding: '16px 32px',
                height: 'auto',
                fontSize: '18px',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                minWidth: '220px'
              }}
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div style={{ marginTop: '64px' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '24px' }}>
              Trusted by leading enterprises worldwide
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              {['Microsoft', 'Amazon', 'Google', 'Tesla', 'Meta'].map(company => (
                <div key={company} style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '16px',
                  fontWeight: 600
                }}>
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ padding: '80px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '32px', color: '#FFD700', marginBottom: '8px' }}>
                    {stat.icon}
                  </div>
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{stat.subtitle}</span>}
                    value={stat.title}
                    valueStyle={{ color: '#fff', fontSize: '36px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '16px'
            }}>
              Enterprise-Grade Features
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to scale your recruitment operations
            </p>
          </div>

          <Row gutter={[32, 32]}>
            {enterpriseFeatures.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card 
                  className="feature-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  hoverable
                >
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    {feature.icon}
                  </div>
                  
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: '24px', 
                    marginBottom: '12px',
                    textAlign: 'center' 
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    fontSize: '16px',
                    textAlign: 'center',
                    marginBottom: '24px' 
                  }}>
                    {feature.description}
                  </p>

                  <div>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <CheckCircleOutlined style={{ 
                          color: '#52C41A', 
                          marginRight: '12px',
                          fontSize: '16px' 
                        }} />
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Pricing Section */}
      <div style={{ padding: '80px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '16px'
            }}>
              Enterprise Pricing
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Flexible plans that scale with your organization
            </p>
          </div>

          <Row gutter={[32, 32]} justify="center">
            {pricingPlans.map((plan, index) => (
              <Col xs={24} sm={12} lg={8} key={plan.id}>
                <Card 
                  className="pricing-card"
                  style={{
                    background: plan.recommended 
                      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 107, 107, 0.1))'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: plan.recommended 
                      ? '2px solid #FFD700'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  hoverable
                >
                  {plan.recommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      color: '#000',
                      padding: '6px 20px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h3 style={{ 
                      color: '#fff', 
                      fontSize: '28px', 
                      marginBottom: '8px' 
                    }}>
                      {plan.name}
                    </h3>
                    
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      marginBottom: '24px' 
                    }}>
                      {plan.description}
                    </p>

                    <div style={{ marginBottom: '24px' }}>
                      <span style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: plan.recommended ? '#FFD700' : '#fff'
                      }}>
                        {plan.price}
                      </span>
                      <span style={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '18px' 
                      }}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '12px'
                      }}>
                        <CheckCircleOutlined style={{ 
                          color: '#52C41A', 
                          marginRight: '12px',
                          fontSize: '16px' 
                        }} />
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type={plan.recommended ? "primary" : "default"}
                    size="large"
                    block
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setTrialModalVisible(true);
                    }}
                    style={{
                      borderRadius: '12px',
                      height: '50px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background: plan.recommended 
                        ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                        : 'rgba(255, 255, 255, 0.1)',
                      border: plan.recommended 
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      color: plan.recommended ? '#000' : '#fff'
                    }}
                  >
                    Start 7-Day Trial
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: '80px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '16px'
            }}>
              What Enterprise Leaders Say
            </h2>
          </div>

          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  height: '100%'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                      fontSize: '48px',
                      marginBottom: '16px'
                    }}>
                      {testimonial.avatar}
                    </div>
                    
                    <Rate 
                      disabled 
                      defaultValue={testimonial.rating} 
                      style={{ color: '#FFD700', marginBottom: '16px' }}
                    />
                    
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px',
                      fontStyle: 'italic',
                      marginBottom: '24px',
                      lineHeight: '1.6'
                    }}>
                      "{testimonial.quote}"
                    </p>
                    
                    <div>
                      <h4 style={{ color: '#fff', marginBottom: '4px' }}>
                        {testimonial.name}
                      </h4>
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '14px',
                        margin: 0 
                      }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Trial Activation Modal */}
      <Modal
        title={null}
        open={trialModalVisible}
        onCancel={() => setTrialModalVisible(false)}
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
        <div style={{ textAlign: 'center', color: '#fff', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px'
          }}>
            🚀
          </div>
          
          <h3 style={{ color: '#fff', fontSize: '32px', marginBottom: '16px' }}>
            Start Your Enterprise Trial
          </h3>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '18px',
            marginBottom: '32px'
          }}>
            Get full access to all enterprise features for 7 days. No credit card required.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={activateEnterpriseTrial}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label={<span style={{ color: '#fff' }}>First Name</span>}
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input 
                  size="large"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#fff'
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label={<span style={{ color: '#fff' }}>Last Name</span>}
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input 
                  size="large"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#fff'
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label={<span style={{ color: '#fff' }}>Work Email</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              size="large"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff'
              }}
            />
          </Form.Item>

          <Form.Item
            name="company"
            label={<span style={{ color: '#fff' }}>Company Name</span>}
            rules={[{ required: true, message: 'Please enter your company name' }]}
          >
            <Input 
              size="large"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff'
              }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employees"
                label={<span style={{ color: '#fff' }}>Company Size</span>}
                rules={[{ required: true, message: 'Please select company size' }]}
              >
                <Select 
                  size="large"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                  dropdownStyle={{
                    background: '#1A1A2E',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Option value="1-50">1-50 employees</Option>
                  <Option value="51-200">51-200 employees</Option>
                  <Option value="201-1000">201-1,000 employees</Option>
                  <Option value="1000+">1,000+ employees</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label={<span style={{ color: '#fff' }}>Your Role</span>}
                rules={[{ required: true, message: 'Please select your role' }]}
              >
                <Select 
                  size="large"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                  dropdownStyle={{
                    background: '#1A1A2E',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Option value="hr-director">HR Director</Option>
                  <Option value="talent-manager">Talent Manager</Option>
                  <Option value="recruiter">Recruiter</Option>
                  <Option value="c-level">C-Level Executive</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{ required: true, message: 'Please agree to the terms' }]}
          >
            <Checkbox style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              I agree to the Terms of Service and Privacy Policy
            </Checkbox>
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              icon={<RocketOutlined />}
              style={{
                flex: 1,
                borderRadius: '12px',
                height: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: 'none',
                color: '#000'
              }}
            >
              {isLoading ? 'Activating Trial...' : 'Start 7-Day Free Trial'}
            </Button>
            
            <Button
              size="large"
              onClick={() => setTrialModalVisible(false)}
              style={{
                borderRadius: '12px',
                height: '50px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff'
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Contact Modal */}
      <Modal
        title={<span style={{ color: '#fff', fontSize: '24px' }}>Schedule a Demo</span>}
        open={contactModalVisible}
        onCancel={() => setContactModalVisible(false)}
        footer={null}
        width={500}
        centered
        styles={{
          body: {
            background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
            borderRadius: '16px',
            padding: '32px'
          }
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <p style={{ fontSize: '18px', marginBottom: '24px' }}>
            Get a personalized demo of QuantumCV Enterprise
          </p>
          
          <Button
            type="primary"
            size="large"
            icon={<MailOutlined />}
            href="mailto:enterprise@quantumcv.com"
            style={{
              borderRadius: '12px',
              padding: '12px 24px',
              height: 'auto',
              fontSize: '16px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              border: 'none',
              marginRight: '12px'
            }}
          >
            Email Us
          </Button>
          
          <Button
            size="large"
            icon={<PhoneOutlined />}
            href="tel:+1-800-QUANTUM"
            style={{
              borderRadius: '12px',
              padding: '12px 24px',
              height: 'auto',
              fontSize: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#fff'
            }}
          >
            Call Us
          </Button>
        </div>
      </Modal>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(78, 205, 196, 0.2);
          border-color: rgba(78, 205, 196, 0.5) !important;
        }
        
        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
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

export default EnterpriseLanding; 