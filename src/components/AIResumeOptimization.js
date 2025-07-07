import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Upload, message, Spin, Typography,
  Tag, Timeline, Statistic, Modal, Form, Input, Select, Tabs, Rate,
  Avatar, Badge, Tooltip, Space, Divider, Alert, Result
} from 'antd';
import {
  FileTextOutlined, UploadOutlined, RobotOutlined, CheckCircleOutlined,
  StarFilled, TrophyOutlined, BulbOutlined, DownloadOutlined, ShareAltOutlined,
  PlayCircleOutlined, ReloadOutlined, EyeOutlined, EditOutlined,
  ThunderboltFilled, LineChartOutlined, UserOutlined, BranchesOutlined,
  SafetyOutlined, ClockCircleOutlined, FireOutlined, RocketOutlined
} from '@ant-design/icons';
import ModernFooter from './ModernFooter';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AIResumeOptimization = () => {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [improvementModal, setImprovementModal] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [optimizationLevel, setOptimizationLevel] = useState(0);
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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.3,
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

  // Simulate AI analysis
  const handleFileUpload = async (file) => {
    setUploading(true);
    setActiveTab('analyzing');
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(false);
    setAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    setAnalyzing(false);
    
    // Mock analysis results
    const mockResults = {
      overallScore: 78,
      sections: {
        summary: { score: 85, status: 'good', suggestions: 3 },
        experience: { score: 72, status: 'needs-improvement', suggestions: 5 },
        skills: { score: 90, status: 'excellent', suggestions: 1 },
        education: { score: 88, status: 'good', suggestions: 2 },
        formatting: { score: 65, status: 'needs-improvement', suggestions: 4 }
      },
      keywordMatch: 68,
      atsCompatibility: 82,
      suggestions: [
        {
          type: 'critical',
          section: 'Experience',
          issue: 'Use more action verbs and quantify achievements',
          improvement: '+15% ATS score',
          example: 'Changed "Worked on projects" to "Led 5 cross-functional projects, increasing efficiency by 30%"'
        },
        {
          type: 'important',
          section: 'Summary',
          issue: 'Add industry-specific keywords',
          improvement: '+12% keyword match',
          example: 'Include terms like "Agile methodology", "stakeholder management"'
        },
        {
          type: 'formatting',
          section: 'Layout',
          issue: 'Improve visual hierarchy',
          improvement: '+8% readability',
          example: 'Use consistent bullet points and section headers'
        }
      ],
      estimatedImprovement: 95
    };

    setAnalysisResults(mockResults);
    setResumeData({
      fileName: file.name,
      size: file.size,
      uploadDate: new Date()
    });
    setActiveTab('results');
    
    // Animate optimization level
    let level = 0;
    const interval = setInterval(() => {
      level += 5;
      setOptimizationLevel(level);
      if (level >= mockResults.estimatedImprovement) {
        clearInterval(interval);
      }
    }, 100);

    message.success('Resume analysis completed!');
  };

  const uploadProps = {
    name: 'resume',
    accept: '.pdf,.doc,.docx',
    beforeUpload: (file) => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type === 'application/msword' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isValidType) {
        message.error('Please upload a PDF or Word document!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }
      handleFileUpload(file);
      return false;
    }
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
              AI Resume Optimization
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Transform your resume with advanced AI analysis. Get personalized suggestions, 
              improve ATS compatibility, and increase your interview chances by 95%.
            </Paragraph>

            <Row gutter={[32, 16]}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                  value={95}
                  suffix="%"
                  valueStyle={{ color: '#4ECDC4', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Improvement</span>}
                  value={3.2}
                  suffix="x"
                  valueStyle={{ color: '#FF6B6B', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Resumes Analyzed</span>}
                  value={2.5}
                  suffix="M+"
                  valueStyle={{ color: '#FFD93D', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Time Saved</span>}
                  value={24}
                  suffix="hrs"
                  valueStyle={{ color: '#6BCF7F', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Upload Section */}
          <Card style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            marginBottom: '60px',
            textAlign: 'center',
            padding: '60px 40px'
          }}>
            <Title level={2} style={{ color: '#fff', marginBottom: '40px' }}>
              Upload Your Resume for AI Analysis
            </Title>
            
            <Upload.Dragger
              {...uploadProps}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px dashed rgba(78, 205, 196, 0.5)',
                borderRadius: '16px',
                padding: '60px 40px'
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                borderRadius: '50%',
                marginBottom: '24px'
              }}>
                <FileTextOutlined style={{ fontSize: '40px', color: '#fff' }} />
              </div>
              
              <Title level={3} style={{ color: '#fff', marginBottom: '16px' }}>
                Upload Your Resume
              </Title>
              
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                Drag and drop your resume here, or click to browse
                <br />
                Supports PDF, DOC, DOCX files up to 10MB
              </Paragraph>
            </Upload.Dragger>
          </Card>

          {/* Features */}
          <Row gutter={[40, 40]}>
            <Col xs={24} lg={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <ThunderboltFilled style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Instant Analysis
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Get comprehensive results in under 30 seconds with our 
                    advanced AI algorithms analyzing every aspect of your resume.
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
                  <SafetyOutlined style={{ fontSize: '48px', color: '#FF6B6B', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Secure & Private
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Your resume data is encrypted and never stored. We use 
                    enterprise-grade security to protect your personal information.
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
                    Expert Quality
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Our AI is trained on thousands of successful resumes and 
                    follows best practices recommended by HR professionals.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Modern Footer */}
      <ModernFooter />
    </div>
  );
};

export default AIResumeOptimization; 