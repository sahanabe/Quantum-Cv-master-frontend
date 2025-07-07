import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Input, message, Spin, Typography,
  Tag, Statistic, Modal, Form, Select, Rate, Avatar, Badge, Tooltip,
  Space, Divider, List, Timeline, Tabs, Steps, Alert, Result
} from 'antd';
import {
  PlayCircleOutlined, MicrophoneOutlined, VideoCameraOutlined, StopOutlined,
  StarFilled, TrophyOutlined, BulbOutlined, CheckCircleOutlined,
  RobotOutlined, ReloadOutlined, EyeOutlined, BookOutlined,
  ClockCircleOutlined, FireOutlined, ThunderboltFilled, SafetyOutlined,
  UserOutlined, TeamOutlined, BarChartOutlined, SoundOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const InterviewPreparation = () => {
  const [activeTab, setActiveTab] = useState('practice');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewResults, setInterviewResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [sessionStarted, setSessionStarted] = useState(false);
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

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.3,
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

  const mockQuestions = {
    technical: [
      {
        id: 1,
        question: "Explain the difference between React functional and class components.",
        difficulty: "intermediate",
        expectedAnswer: "Functional components are simpler and use hooks for state management...",
        tips: ["Focus on hooks like useState and useEffect", "Mention performance benefits", "Discuss code readability"]
      },
      {
        id: 2,
        question: "How would you optimize a slow database query?",
        difficulty: "advanced",
        expectedAnswer: "Several approaches: indexing, query optimization, caching...",
        tips: ["Discuss indexing strategies", "Mention query execution plans", "Talk about caching layers"]
      }
    ],
    behavioral: [
      {
        id: 3,
        question: "Tell me about a time when you had to work with a difficult team member.",
        difficulty: "intermediate",
        expectedAnswer: "Use the STAR method: Situation, Task, Action, Result...",
        tips: ["Use STAR methodology", "Focus on conflict resolution", "Highlight positive outcomes"]
      },
      {
        id: 4,
        question: "Describe a project where you had to learn a new technology quickly.",
        difficulty: "intermediate",
        expectedAnswer: "Demonstrate adaptability and learning process...",
        tips: ["Show learning methodology", "Emphasize results achieved", "Mention knowledge retention"]
      }
    ]
  };

  const startInterview = () => {
    setSessionStarted(true);
    setCurrentQuestion(0);
    message.success('Interview session started! Good luck!');
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions[selectedCategory].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeInterview();
    }
  };

  const completeInterview = () => {
    setSessionStarted(false);
    setInterviewResults({
      score: 85,
      strengths: ["Clear communication", "Technical knowledge", "Problem-solving approach"],
      improvements: ["Provide more specific examples", "Speak more confidently", "Elaborate on technical details"],
      overallFeedback: "Great performance! Your technical knowledge is strong and you communicate clearly."
    });
    setActiveTab('results');
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
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              borderRadius: '50%',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)'
            }}>
              <PlayCircleOutlined style={{ fontSize: '60px', color: '#fff' }} />
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
              Interview Preparation
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Master your interviews with AI-powered practice sessions. Get real-time feedback 
              and achieve 80% interview success rate.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                  value={80}
                  suffix="%"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Practice Sessions</span>}
                  value={500}
                  suffix="K+"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Questions Bank</span>}
                  value={10}
                  suffix="K+"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Improvement</span>}
                  value={45}
                  suffix="%"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Main Interface */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            marginBottom: '60px'
          }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              size="large"
              style={{ minHeight: '600px' }}
              items={[
                {
                  key: 'practice',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <PlayCircleOutlined /> Practice Interview
                    </span>
                  ),
                  children: !sessionStarted ? (
                    <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                      <Title level={2} style={{ color: '#fff', marginBottom: '40px' }}>
                        Start Your Interview Practice
                      </Title>
                      
                      <Row gutter={[24, 24]} style={{ marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
                        <Col xs={24} md={8}>
                          <Form.Item label={<span style={{ color: '#fff' }}>Interview Type</span>}>
                            <Select 
                              value={selectedCategory}
                              onChange={setSelectedCategory}
                              size="large"
                              style={{ width: '100%' }}
                            >
                              <Option value="technical">Technical</Option>
                              <Option value="behavioral">Behavioral</Option>
                              <Option value="system-design">System Design</Option>
                              <Option value="leadership">Leadership</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item label={<span style={{ color: '#fff' }}>Difficulty Level</span>}>
                            <Select 
                              value={difficulty}
                              onChange={setDifficulty}
                              size="large"
                              style={{ width: '100%' }}
                            >
                              <Option value="entry">Entry Level</Option>
                              <Option value="intermediate">Intermediate</Option>
                              <Option value="advanced">Advanced</Option>
                              <Option value="senior">Senior Level</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item label={<span style={{ color: '#fff' }}>Duration</span>}>
                            <Select 
                              defaultValue="30"
                              size="large"
                              style={{ width: '100%' }}
                            >
                              <Option value="15">15 minutes</Option>
                              <Option value="30">30 minutes</Option>
                              <Option value="45">45 minutes</Option>
                              <Option value="60">60 minutes</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={startInterview}
                        style={{
                          borderRadius: '25px',
                          padding: '12px 48px',
                          height: 'auto',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                          border: 'none'
                        }}
                      >
                        Start Interview Practice
                      </Button>
                    </div>
                  ) : (
                    <div style={{ padding: '40px' }}>
                      <div style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '16px',
                        padding: '32px',
                        marginBottom: '32px'
                      }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                          <Col>
                            <Title level={4} style={{ color: '#fff', margin: 0 }}>
                              Question {currentQuestion + 1} of {mockQuestions[selectedCategory].length}
                            </Title>
                          </Col>
                          <Col>
                            <Progress 
                              percent={((currentQuestion + 1) / mockQuestions[selectedCategory].length) * 100}
                              strokeColor="#4ECDC4"
                              trailColor="rgba(255, 255, 255, 0.1)"
                              showInfo={false}
                              style={{ width: '200px' }}
                            />
                          </Col>
                        </Row>

                        <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>
                          {mockQuestions[selectedCategory][currentQuestion]?.question}
                        </Title>

                        <div style={{ marginBottom: '24px' }}>
                          <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Tips for this question:</Text>
                          <ul style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: '8px' }}>
                            {mockQuestions[selectedCategory][currentQuestion]?.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100px',
                            height: '100px',
                            background: isRecording ? 'linear-gradient(135deg, #ff4757, #ff3838)' : 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            animation: isRecording ? 'pulse 2s infinite' : 'none'
                          }}
                          onClick={() => setIsRecording(!isRecording)}
                          >
                            {isRecording ? (
                              <StopOutlined style={{ fontSize: '40px', color: '#fff' }} />
                            ) : (
                              <MicrophoneOutlined style={{ fontSize: '40px', color: '#fff' }} />
                            )}
                          </div>
                          <div style={{ marginTop: '16px' }}>
                            <Text style={{ color: '#fff', fontSize: '16px' }}>
                              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
                            </Text>
                          </div>
                        </div>

                        <TextArea
                          placeholder="Type your answer here (optional - you can also record your response)"
                          rows={4}
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            color: '#fff',
                            marginBottom: '24px'
                          }}
                        />

                        <div style={{ textAlign: 'center' }}>
                          <Space size="large">
                            <Button
                              size="large"
                              onClick={nextQuestion}
                              style={{
                                borderRadius: '20px',
                                padding: '8px 32px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#fff'
                              }}
                            >
                              Skip Question
                            </Button>
                            <Button
                              type="primary"
                              size="large"
                              onClick={nextQuestion}
                              style={{
                                borderRadius: '20px',
                                padding: '8px 32px',
                                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                                border: 'none'
                              }}
                            >
                              {currentQuestion === mockQuestions[selectedCategory].length - 1 ? 'Finish Interview' : 'Next Question'}
                            </Button>
                          </Space>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'results',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <BarChartOutlined /> Results & Feedback
                    </span>
                  ),
                  children: interviewResults ? (
                    <div style={{ padding: '40px' }}>
                      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>
                          🎉 Interview Complete!
                        </Title>
                        <div style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #52c41a, #389e0d)',
                          borderRadius: '20px',
                          padding: '20px 40px'
                        }}>
                          <Title level={1} style={{ color: '#fff', margin: 0 }}>
                            {interviewResults.score}%
                          </Title>
                          <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
                            Overall Score
                          </Text>
                        </div>
                      </div>

                      <Row gutter={[32, 32]} style={{ marginBottom: '40px' }}>
                        <Col xs={24} lg={12}>
                          <Card style={{
                            background: 'rgba(82, 196, 26, 0.1)',
                            border: '1px solid rgba(82, 196, 26, 0.3)',
                            borderRadius: '16px'
                          }}>
                            <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>
                              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                              Strengths
                            </Title>
                            <List
                              dataSource={interviewResults.strengths}
                              renderItem={(item) => (
                                <List.Item style={{ border: 'none', padding: '8px 0' }}>
                                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>• {item}</Text>
                                </List.Item>
                              )}
                            />
                          </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                          <Card style={{
                            background: 'rgba(255, 107, 107, 0.1)',
                            border: '1px solid rgba(255, 107, 107, 0.3)',
                            borderRadius: '16px'
                          }}>
                            <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>
                              <BulbOutlined style={{ color: '#FF6B6B', marginRight: '8px' }} />
                              Areas for Improvement
                            </Title>
                            <List
                              dataSource={interviewResults.improvements}
                              renderItem={(item) => (
                                <List.Item style={{ border: 'none', padding: '8px 0' }}>
                                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>• {item}</Text>
                                </List.Item>
                              )}
                            />
                          </Card>
                        </Col>
                      </Row>

                      <Card style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        marginBottom: '40px'
                      }}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                          Overall Feedback
                        </Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                          {interviewResults.overallFeedback}
                        </Text>
                      </Card>

                      <div style={{ textAlign: 'center' }}>
                        <Space size="large">
                          <Button
                            type="primary"
                            size="large"
                            icon={<ReloadOutlined />}
                            onClick={() => {
                              setActiveTab('practice');
                              setSessionStarted(false);
                              setInterviewResults(null);
                              setCurrentQuestion(0);
                            }}
                            style={{
                              borderRadius: '25px',
                              padding: '12px 32px',
                              height: 'auto',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                              border: 'none'
                            }}
                          >
                            Practice Again
                          </Button>
                          <Button
                            size="large"
                            icon={<BookOutlined />}
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
                            View Study Materials
                          </Button>
                        </Space>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '100px 40px' }}>
                      <Title level={3} style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Complete a practice interview to see your results
                      </Title>
                    </div>
                  )
                }
              ]}
            />
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
                  <RobotOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    AI-Powered Feedback
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Get instant, detailed feedback on your responses including 
                    speech patterns, content quality, and confidence levels.
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
                  <VideoCameraOutlined style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Video Practice
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Practice with video recording to improve body language, 
                    eye contact, and overall presentation skills.
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
                    Question Bank
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Access 10,000+ curated interview questions across different 
                    roles, industries, and difficulty levels.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
        }
      `}</style>
    </div>
  );
};

export default InterviewPreparation; 