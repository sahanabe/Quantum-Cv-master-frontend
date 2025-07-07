import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, Row, Col, Typography, Button, Progress, Avatar, Tag, 
  Statistic, Timeline, Modal, Form, Input, Upload, message,
  Tabs, Space, Badge, Tooltip, Switch, Slider, Rate, Divider,
  List, Calendar, Alert, Dropdown, Menu, notification, Spin
} from 'antd';
import {
  UserOutlined, TrophyOutlined, RocketOutlined, StarFilled,
  EyeOutlined, HeartFilled, ThunderboltFilled, BulbOutlined,
  UploadOutlined, DownloadOutlined, ShareAltOutlined, SettingOutlined,
  BellOutlined, GiftOutlined, CrownOutlined, FireOutlined,
  EditOutlined, CameraOutlined, CloudUploadOutlined, FileTextOutlined,
  BarChartOutlined, CalendarOutlined, MessageOutlined, TeamOutlined,
  SafetyOutlined, CheckCircleOutlined, ClockCircleOutlined,
  PlusOutlined, DeleteOutlined, SyncOutlined, ExportOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const QuantumUserDashboard = ({ loggedInUser, setLoggedInUser, token }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  // State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [profileModal, setProfileModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [achievementModal, setAchievementModal] = useState(false);
  const [aiInsightModal, setAiInsightModal] = useState(false);
  
  // Dashboard Data
  const [dashboardStats, setDashboardStats] = useState({
    totalResumes: 0,
    profileViews: 0,
    successRate: 0,
    aiScore: 0,
    streak: 0,
    level: 1,
    xp: 0,
    nextLevelXp: 1000
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        
        // Fetch all dashboard data in parallel
        const [statsRes, activityRes, achievementsRes, insightsRes] = await Promise.all([
          fetch('http://localhost:5000/api/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/dashboard/activity', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/dashboard/achievements', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/dashboard/insights', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setDashboardStats(statsData.stats);
        }

        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setRecentActivity(activityData.activities);
        }

        if (achievementsRes.ok) {
          const achievementsData = await achievementsRes.json();
          setAchievements(achievementsData.achievements);
        }

        if (insightsRes.ok) {
          const insightsData = await insightsRes.json();
          setAiInsights(insightsData.insights);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        message.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Particle Animation System
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const initParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 5)]
        });
      }
      setParticles(newParticles);
    };

    initParticles();

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Welcome Animation
  useEffect(() => {
    notification.open({
      message: '🎉 Welcome Back!',
      description: `Hello ${loggedInUser?.firstName || 'User'}! Your dashboard is ready with new insights and opportunities.`,
      icon: <RocketOutlined style={{ color: '#4ECDC4' }} />,
      placement: 'topRight',
      duration: 4,
      style: {
        background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(69, 183, 209, 0.1))',
        border: '1px solid rgba(78, 205, 196, 0.3)',
        borderRadius: '12px'
      }
    });
  }, [loggedInUser]);

  const handleProfileUpdate = async (values) => {
    try {
      const res = await fetch('http://localhost:5000/api/dashboard/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });

      if (res.ok) {
        const data = await res.json();
        message.success('Profile updated successfully!');
        setProfileModal(false);
        
        // Update the logged in user data
        if (setLoggedInUser) {
          setLoggedInUser(prev => ({ ...prev, ...data.user }));
        }
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      message.error('Failed to update profile');
    }
  };

  const handleFileUpload = (info) => {
    if (info.file.status === 'done') {
      message.success('Resume uploaded successfully!');
      setUploadModal(false);
      // Update stats
      setDashboardStats(prev => ({
        ...prev,
        totalResumes: prev.totalResumes + 1,
        xp: prev.xp + 100
      }));
    }
  };

  const levelProgress = (dashboardStats.xp / dashboardStats.nextLevelXp) * 100;

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" style={{ marginBottom: '20px' }} />
          <Title level={3} style={{ color: '#fff' }}>Loading Your Dashboard...</Title>
          <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Preparing your personalized experience
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Particles */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              opacity: particle.opacity,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        padding: '40px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
            borderRadius: '24px 24px 0 0'
          }} />

          <Row gutter={[32, 24]} align="middle">
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <Avatar 
                    size={80} 
                    style={{ 
                      background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
                      fontSize: '32px',
                      fontWeight: 'bold',
                      border: '4px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {loggedInUser?.firstName?.[0] || 'U'}
                  </Avatar>
                  <Badge 
                    count={`Lvl ${dashboardStats.level}`} 
                    style={{ 
                      backgroundColor: '#52C41A',
                      position: 'absolute',
                      bottom: -5,
                      right: -5,
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }} 
                  />
                </div>
                <div>
                  <Title level={2} style={{ color: '#fff', margin: 0, fontSize: '28px' }}>
                    Welcome back, {loggedInUser?.firstName || 'User'}!
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                    {loggedInUser?.email}
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Progress 
                      percent={levelProgress} 
                      showInfo={false}
                      strokeColor={{
                        '0%': '#4ECDC4',
                        '100%': '#45B7D1',
                      }}
                      style={{ width: '200px' }}
                    />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {dashboardStats.xp}/{dashboardStats.nextLevelXp} XP to Level {dashboardStats.level + 1}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={16}>
              <Row gutter={[24, 16]}>
                <Col xs={12} sm={6}>
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>AI Score</span>}
                    value={dashboardStats.aiScore}
                    suffix="/100"
                    valueStyle={{ 
                      color: '#4ECDC4', 
                      fontSize: '24px', 
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
                    }}
                    prefix={<TrophyOutlined />}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Profile Views</span>}
                    value={dashboardStats.profileViews}
                    valueStyle={{ 
                      color: '#45B7D1', 
                      fontSize: '24px', 
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(69, 183, 209, 0.5)'
                    }}
                    prefix={<EyeOutlined />}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                    value={dashboardStats.successRate}
                    suffix="%"
                    valueStyle={{ 
                      color: '#96CEB4', 
                      fontSize: '24px', 
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(150, 206, 180, 0.5)'
                    }}
                    prefix={<StarFilled />}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Statistic
                    title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Day Streak</span>}
                    value={dashboardStats.streak}
                    valueStyle={{ 
                      color: '#FFEAA7', 
                      fontSize: '24px', 
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(255, 234, 167, 0.5)'
                    }}
                    prefix={<FireOutlined />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Quick Actions */}
          <div style={{ marginTop: '24px' }}>
            <Space size="large" wrap>
              <Button 
                type="primary" 
                icon={<UploadOutlined />}
                onClick={() => setUploadModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
                  border: 'none',
                  borderRadius: '12px',
                  height: '40px',
                  fontWeight: 'bold'
                }}
              >
                Upload Resume
              </Button>
              <Button 
                icon={<UserOutlined />}
                onClick={() => setProfileModal(true)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  borderRadius: '12px',
                  height: '40px',
                  fontWeight: 'bold'
                }}
              >
                Edit Profile
              </Button>
              <Button 
                icon={<BulbOutlined />}
                onClick={() => setAiInsightModal(true)}
                style={{
                  background: 'rgba(255, 234, 167, 0.1)',
                  border: '1px solid rgba(255, 234, 167, 0.3)',
                  color: '#FFEAA7',
                  borderRadius: '12px',
                  height: '40px',
                  fontWeight: 'bold'
                }}
              >
                AI Insights
              </Button>
              <Button 
                icon={<CrownOutlined />}
                onClick={() => setAchievementModal(true)}
                style={{
                  background: 'rgba(255, 107, 107, 0.1)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  color: '#FF6B6B',
                  borderRadius: '12px',
                  height: '40px',
                  fontWeight: 'bold'
                }}
              >
                Achievements
              </Button>
            </Space>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px'
          }}
        >
          <TabPane tab={<span><BarChartOutlined /> Overview</span>} key="overview">
            <Row gutter={[24, 24]}>
              {/* AI Insights Card */}
              <Col xs={24} lg={8}>
                <Card
                  title={
                    <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BulbOutlined style={{ color: '#FFEAA7' }} />
                      AI Insights
                    </span>
                  }
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    height: '400px'
                  }}
                  styles={{ body: { padding: '16px' } }}
                >
                  <div style={{ height: '300px', overflowY: 'auto' }}>
                    {aiInsights.map((insight, index) => (
                      <div 
                        key={index}
                        style={{
                          background: insight.priority === 'urgent' ? 'rgba(255, 107, 107, 0.1)' :
                                     insight.priority === 'high' ? 'rgba(255, 234, 167, 0.1)' :
                                     'rgba(78, 205, 196, 0.1)',
                          border: `1px solid ${insight.priority === 'urgent' ? 'rgba(255, 107, 107, 0.3)' :
                                                 insight.priority === 'high' ? 'rgba(255, 234, 167, 0.3)' :
                                                 'rgba(78, 205, 196, 0.3)'}`,
                          borderRadius: '12px',
                          padding: '16px',
                          marginBottom: '12px'
                        }}
                      >
                        <Title level={5} style={{ color: '#fff', margin: '0 0 8px 0' }}>
                          {insight.title}
                        </Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                          {insight.description}
                        </Text>
                        <div style={{ marginTop: '8px' }}>
                          <Tag color={insight.priority === 'urgent' ? 'red' : insight.priority === 'high' ? 'orange' : 'blue'}>
                            {insight.priority.toUpperCase()}
                          </Tag>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>

              {/* Recent Activity */}
              <Col xs={24} lg={8}>
                <Card
                  title={
                    <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ClockCircleOutlined style={{ color: '#45B7D1' }} />
                      Recent Activity
                    </span>
                  }
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    height: '400px'
                  }}
                  styles={{ body: { padding: '16px' } }}
                >
                  <Timeline 
                    style={{ height: '300px', overflowY: 'auto' }}
                    items={recentActivity.map((activity, index) => ({
                      key: index,
                      dot: activity.type === 'resume' ? <FileTextOutlined style={{ color: '#4ECDC4' }} /> :
                            activity.type === 'achievement' ? <TrophyOutlined style={{ color: '#FFEAA7' }} /> :
                            activity.type === 'analysis' ? <BarChartOutlined style={{ color: '#45B7D1' }} /> :
                            <UserOutlined style={{ color: '#96CEB4' }} />,
                      children: (
                        <div style={{ color: '#fff' }}>
                          <Text strong style={{ color: '#fff' }}>{activity.title}</Text>
                          <br />
                          <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                            {activity.time}
                          </Text>
                          {activity.score && (
                            <Tag color="green" style={{ marginLeft: '8px' }}>
                              Score: {activity.score}
                            </Tag>
                          )}
                        </div>
                      )
                    }))}
                  />
                </Card>
              </Col>

              {/* Achievements Preview */}
              <Col xs={24} lg={8}>
                <Card
                  title={
                    <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CrownOutlined style={{ color: '#FF6B6B' }} />
                      Achievements
                    </span>
                  }
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    height: '400px'
                  }}
                  styles={{ body: { padding: '16px' } }}
                >
                  <div style={{ height: '300px', overflowY: 'auto' }}>
                    <Row gutter={[16, 16]}>
                      {achievements.slice(0, 6).map(achievement => (
                        <Col xs={12} key={achievement.id}>
                          <div style={{
                            background: achievement.earned ? 'rgba(82, 196, 26, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${achievement.earned ? 'rgba(82, 196, 26, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center',
                            opacity: achievement.earned ? 1 : 0.5,
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                              {achievement.icon}
                            </div>
                            <Text style={{ 
                              color: achievement.earned ? '#52C41A' : 'rgba(255, 255, 255, 0.7)',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {achievement.name}
                            </Text>
                            {achievement.earned && (
                              <CheckCircleOutlined style={{ color: '#52C41A', marginTop: '4px', display: 'block' }} />
                            )}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab={<span><FileTextOutlined /> Resumes</span>} key="resumes">
            <div style={{ color: '#fff' }}>
              <Title level={3} style={{ color: '#fff' }}>Resume Management</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Manage your resumes, track performance, and get AI-powered optimization suggestions.
              </Paragraph>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                size="large"
                onClick={() => navigate('/cv-analysis')}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
                  border: 'none',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}
              >
                Upload New Resume
              </Button>

              {/* Resume Grid would go here */}
              <div style={{ marginTop: '24px' }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Your uploaded resumes will appear here. Start by uploading your first resume!
                </Text>
              </div>
            </div>
          </TabPane>

          <TabPane tab={<span><CalendarOutlined /> Career Path</span>} key="career">
            <div style={{ color: '#fff' }}>
              <Title level={3} style={{ color: '#fff' }}>Career Development</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Track your career journey, set goals, and get personalized recommendations.
              </Paragraph>

              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card
                    title="Career Goals"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px'
                    }}
                  >
                    <div style={{ color: '#fff' }}>
                                          <Timeline
                      items={[
                        {
                          color: 'green',
                          children: (
                            <>
                              <Text style={{ color: '#fff' }}>Complete profile optimization</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>Completed</Text>
                            </>
                          )
                        },
                        {
                          color: 'blue',
                          children: (
                            <>
                              <Text style={{ color: '#fff' }}>Upload 5 tailored resumes</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>In Progress (3/5)</Text>
                            </>
                          )
                        },
                        {
                          color: 'gray',
                          children: (
                            <>
                              <Text style={{ color: '#fff' }}>Land dream job interview</Text>
                              <br />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>Pending</Text>
                            </>
                          )
                        }
                      ]}
                    />
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24} lg={12}>
                  <Card
                    title="Skill Development"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px'
                    }}
                  >
                    <div style={{ color: '#fff' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>React.js</Text>
                        <Progress percent={90} strokeColor="#4ECDC4" />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Node.js</Text>
                        <Progress percent={75} strokeColor="#45B7D1" />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Python</Text>
                        <Progress percent={60} strokeColor="#96CEB4" />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane tab={<span><SettingOutlined /> Settings</span>} key="settings">
            <div style={{ color: '#fff' }}>
              <Title level={3} style={{ color: '#fff' }}>Account Settings</Title>
              
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card
                    title="Preferences"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px'
                    }}
                  >
                    <div style={{ color: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Email Notifications</Text>
                        <Switch defaultChecked />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>AI Insights</Text>
                        <Switch defaultChecked />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Career Recommendations</Text>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24} lg={12}>
                  <Card
                    title="Privacy"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px'
                    }}
                  >
                    <div style={{ color: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Public Profile</Text>
                        <Switch />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Show Activity</Text>
                        <Switch defaultChecked />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Text style={{ color: '#fff' }}>Analytics Tracking</Text>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>

        {/* Modals */}
        
        {/* Profile Edit Modal */}
        <Modal
          title="Edit Profile"
          open={profileModal}
          onCancel={() => setProfileModal(false)}
          footer={null}
          width={600}
          style={{
            background: 'rgba(15, 15, 35, 0.95)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <Form layout="vertical" onFinish={handleProfileUpdate}>
            <Form.Item name="firstName" label={<span style={{ color: '#fff' }}>First Name</span>}>
              <Input placeholder="Enter first name" defaultValue={loggedInUser?.firstName} />
            </Form.Item>
            <Form.Item name="lastName" label={<span style={{ color: '#fff' }}>Last Name</span>}>
              <Input placeholder="Enter last name" defaultValue={loggedInUser?.lastName} />
            </Form.Item>
            <Form.Item name="bio" label={<span style={{ color: '#fff' }}>Professional Bio</span>}>
              <TextArea rows={4} placeholder="Tell us about yourself..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{
                background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
                border: 'none',
                borderRadius: '8px'
              }}>
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Upload Modal */}
        <Modal
          title="Upload Resume"
          open={uploadModal}
          onCancel={() => setUploadModal(false)}
          footer={null}
          width={500}
        >
          <Upload.Dragger
            name="file"
            multiple={false}
            onChange={handleFileUpload}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px dashed rgba(78, 205, 196, 0.5)'
            }}
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined style={{ color: '#4ECDC4', fontSize: '48px' }} />
            </p>
            <p className="ant-upload-text" style={{ color: '#fff' }}>
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Support for PDF, DOC, DOCX files. Maximum file size: 10MB
            </p>
          </Upload.Dragger>
        </Modal>

        {/* AI Insights Modal */}
        <Modal
          title="AI Career Insights"
          open={aiInsightModal}
          onCancel={() => setAiInsightModal(false)}
          footer={null}
          width={800}
        >
          <div style={{ color: '#fff' }}>
            <Title level={4} style={{ color: '#fff' }}>Personalized Recommendations</Title>
            <List
              dataSource={aiInsights}
              renderItem={insight => (
                <List.Item>
                  <Card style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Title level={5} style={{ color: '#fff' }}>{insight.title}</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{insight.description}</Text>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Modal>

        {/* Achievements Modal */}
        <Modal
          title="Your Achievements"
          open={achievementModal}
          onCancel={() => setAchievementModal(false)}
          footer={null}
          width={600}
        >
          <Row gutter={[16, 16]}>
            {achievements.map(achievement => (
              <Col xs={12} sm={8} key={achievement.id}>
                <Card style={{
                  background: achievement.earned ? 'rgba(82, 196, 26, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${achievement.earned ? 'rgba(82, 196, 26, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  textAlign: 'center',
                  opacity: achievement.earned ? 1 : 0.5
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {achievement.icon}
                  </div>
                  <Text style={{ 
                    color: achievement.earned ? '#52C41A' : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 'bold'
                  }}>
                    {achievement.name}
                  </Text>
                  {achievement.earned && achievement.date && (
                    <div style={{ marginTop: '8px' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                        Earned: {achievement.date}
                      </Text>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Modal>
      </div>

      {/* Floating Action Button */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}>
        <Dropdown
          overlay={
            <Menu style={{ background: 'rgba(15, 15, 35, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Menu.Item key="upload" icon={<UploadOutlined />} onClick={() => setUploadModal(true)}>
                <span style={{ color: '#fff' }}>Upload Resume</span>
              </Menu.Item>
              <Menu.Item key="analyze" icon={<BarChartOutlined />} onClick={() => navigate('/cv-analysis')}>
                <span style={{ color: '#fff' }}>Analyze Resume</span>
              </Menu.Item>
              <Menu.Item key="jobs" icon={<TeamOutlined />} onClick={() => navigate('/jobs')}>
                <span style={{ color: '#fff' }}>Browse Jobs</span>
              </Menu.Item>
            </Menu>
          }
          placement="topRight"
        >
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<PlusOutlined />}
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
              border: 'none',
              boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
              fontSize: '20px'
            }}
          />
        </Dropdown>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.3); }
          50% { box-shadow: 0 0 30px rgba(78, 205, 196, 0.6); }
        }
        
        .floating-card {
          animation: float 3s ease-in-out infinite;
        }
        
        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuantumUserDashboard; 