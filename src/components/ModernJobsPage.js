import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Input,
  Select,
  Modal,
  Upload,
  message,
  Spin,
  Tag,
  Progress,
  Badge,
  Tooltip,
  Rate,
  Timeline,
  Slider,
  Switch,
  Avatar,
  Statistic,
  Tabs
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  RocketOutlined,
  StarFilled,
  LocationOnOutlined as LocationOutlined,
  BusinessOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  BarChartOutlined,
  TeamOutlined,
  GlobalOutlined,
  SafetyOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  SendOutlined,
  SettingOutlined,
  ApiOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { matchJobs, validateFile, withLoading, handleAIResponse } from '../services/aiService';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Dragger } = Upload;

const ModernJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    location: '',
    company: '',
    experience: '',
    salary: [0, 200000],
    jobType: '',
    remote: false
  });
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [jobDetailModal, setJobDetailModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('1');
  const [aiJobMatching, setAiJobMatching] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(true);
  const canvasRef = useRef(null);

  // Mock job data with rich information
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      remote: true,
      salary: '$120,000 - $180,000',
      experience: '5+ years',
      type: 'Full-time',
      description: 'We are looking for a Senior Full Stack Developer to join our innovative team...',
      requirements: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      benefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
      posted: '2 days ago',
      applications: 45,
      match: 92,
      logo: '🏢',
      verified: true,
      urgent: false
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      company: 'DataMind Inc',
      location: 'New York, NY',
      remote: false,
      salary: '$140,000 - $200,000',
      experience: '3+ years',
      type: 'Full-time',
      description: 'Join our AI team to build cutting-edge machine learning solutions...',
      requirements: ['Python', 'TensorFlow', 'PyTorch', 'ML Ops', 'Statistics'],
      benefits: ['Health Insurance', '401k', 'Learning Budget', 'Flexible Hours'],
      posted: '1 day ago',
      applications: 32,
      match: 88,
      logo: '🤖',
      verified: true,
      urgent: true
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Remote',
      remote: true,
      salary: '$100,000 - $160,000',
      experience: '4+ years',
      type: 'Full-time',
      description: 'Lead product strategy and execution for our flagship products...',
      requirements: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
      benefits: ['Health Insurance', 'Unlimited PTO', 'Remote Work', 'Equity'],
      posted: '3 days ago',
      applications: 67,
      match: 85,
      logo: '💡',
      verified: true,
      urgent: false
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudFirst Technologies',
      location: 'Austin, TX',
      remote: true,
      salary: '$110,000 - $170,000',
      experience: '3+ years',
      type: 'Full-time',
      description: 'Build and maintain scalable infrastructure and deployment pipelines...',
      requirements: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
      benefits: ['Health Insurance', '401k', 'Conference Budget', 'Remote Work'],
      posted: '1 week ago',
      applications: 28,
      match: 90,
      logo: '☁️',
      verified: true,
      urgent: false
    },
    {
      id: 5,
      title: 'UX/UI Designer',
      company: 'DesignForward Studio',
      location: 'Los Angeles, CA',
      remote: true,
      salary: '$80,000 - $130,000',
      experience: '2+ years',
      type: 'Full-time',
      description: 'Create beautiful and intuitive user experiences for our digital products...',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      benefits: ['Health Insurance', 'Creative Budget', 'Flexible Hours', 'Remote Work'],
      posted: '4 days ago',
      applications: 89,
      match: 78,
      logo: '🎨',
      verified: true,
      urgent: false
    }
  ];

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.2
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
        ctx.fillStyle = `rgba(78, 205, 196, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRemote = !filters.remote || job.remote;
      
      return matchesSearch && matchesLocation && matchesRemote;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, filters, jobs]);

  // Resume upload configuration
  const uploadProps = {
    name: 'resume',
    multiple: false,
    accept: '.pdf,.doc,.docx',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Validate file
        validateFile(file);
        
        setLoading(true);
        setAiJobMatching(true);
        
        // Use AI service to match jobs
        const result = await withLoading(setLoading, async () => {
          const jobListings = mockJobs.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            requirements: job.requirements,
            description: job.description,
            experience: job.experience,
            salary: job.salary,
            type: job.type
          }));
          
          return await matchJobs(file, jobListings);
        });
        
        const aiResponse = handleAIResponse(result, 'AI job matching completed!');
        
        if (aiResponse.matches && aiResponse.matches.length > 0) {
          // Sort jobs by match score
          const sortedMatches = aiResponse.matches.sort((a, b) => b.matchScore - a.matchScore);
          
          // Filter jobs to show only matched ones
          const matchedJobIds = sortedMatches.map(match => match.jobId);
          const matchedJobList = mockJobs.filter(job => matchedJobIds.includes(job.id));
          
          // Add match scores to jobs
          const jobsWithScores = matchedJobList.map(job => {
            const match = sortedMatches.find(m => m.jobId === job.id);
            return {
              ...job,
              match: match ? match.matchScore : 0,
              matchDetails: match
            };
          });
          
          setMatchedJobs(jobsWithScores);
          setFilteredJobs(jobsWithScores);
          setShowAllJobs(false);
          
          setResumeAnalysis({
            summary: aiResponse.summary || 'AI analysis completed',
            topMatches: sortedMatches.slice(0, 3),
            skillAlignment: aiResponse.skillAlignment,
            suggestions: sortedMatches.slice(0, 3).map(match => 
              `Consider applying to ${match.jobTitle} at ${match.company} (${match.matchScore}% match)`
            )
          });
          
          message.success(`Found ${jobsWithScores.length} suitable jobs for you!`);
        } else {
          message.warning('No highly suitable jobs found. Showing all jobs instead.');
          setShowAllJobs(true);
          setFilteredJobs(mockJobs);
        }
        
        onSuccess('ok');
      } catch (error) {
        console.error('Job matching error:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        
        let errorMessage = 'Failed to analyze resume and match jobs';
        if (error.message.includes('fetch')) {
          errorMessage = 'Network error: Unable to connect to AI service. Please check your internet connection.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error: AI service is temporarily unavailable. Please try again later.';
        } else if (error.message.includes('400')) {
          errorMessage = 'Invalid request: Please check your resume file format.';
        }
        
        message.error(errorMessage);
        setShowAllJobs(true);
        setFilteredJobs(mockJobs);
        onError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setJobDetailModal(true);
  };

  const handleApplyJob = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    message.success('Application submitted successfully!');
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
        message.info('Job removed from saved');
      } else {
        newSet.add(jobId);
        message.success('Job saved successfully!');
      }
      return newSet;
    });
  };

  const JobCard = ({ job }) => (
    <Card
      hoverable
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      styles={{
        body: {
          padding: '24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }}
      onClick={() => handleJobClick(job)}
    >
      {job.urgent && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          URGENT
        </div>
      )}

      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px', marginRight: '12px' }}>{job.logo}</div>
          <div>
            <h3 style={{ 
              color: '#fff', 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {job.title}
              {job.verified && <CheckCircleOutlined style={{ color: '#4ECDC4', fontSize: '16px' }} />}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '14px' }}>
              {job.company}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Tag 
            color="cyan" 
            style={{ marginBottom: '8px', borderRadius: '12px', fontSize: '12px' }}
          >
            {job.location}
          </Tag>
          {job.remote && (
            <Tag 
              color="green" 
              style={{ marginBottom: '8px', borderRadius: '12px', fontSize: '12px' }}
            >
              Remote
            </Tag>
          )}
          <Tag 
            color="blue" 
            style={{ marginBottom: '8px', borderRadius: '12px', fontSize: '12px' }}
          >
            {job.type}
          </Tag>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
              {job.matchDetails ? 'AI Match Score' : 'Match Score'}
            </span>
            <span style={{ 
              color: job.matchDetails ? 
                job.match > 85 ? '#52C41A' :
                job.match > 70 ? '#FFD93D' : '#FF6B6B' : '#4ECDC4', 
              fontSize: '14px', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {job.matchDetails && <ThunderboltOutlined />}
              {job.match}%
            </span>
          </div>
          <Progress 
            percent={job.match} 
            showInfo={false}
            strokeColor={job.matchDetails ? {
              '0%': '#FF6B6B',
              '50%': '#FFD93D',
              '100%': '#52C41A',
            } : {
              '0%': '#FF6B6B',
              '50%': '#FFD93D',
              '100%': '#4ECDC4',
            }}
            size="small"
          />
          {job.matchDetails && (
            <div style={{ 
              marginTop: '8px',
              padding: '6px 8px',
              background: 'rgba(78, 205, 196, 0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(78, 205, 196, 0.2)'
            }}>
              <div style={{ 
                color: '#4ECDC4', 
                fontSize: '11px', 
                fontWeight: 600,
                marginBottom: '2px'
              }}>
                AI Analysis:
              </div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '11px',
                lineHeight: '1.3'
              }}>
                {job.matchDetails.reasoning ? 
                  job.matchDetails.reasoning.substring(0, 60) + '...' : 
                  'Strong skill alignment detected'
                }
              </div>
            </div>
          )}
        </div>

        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginBottom: '16px' }}>
          <div style={{ marginBottom: '4px' }}>💰 {job.salary}</div>
          <div style={{ marginBottom: '4px' }}>🎯 {job.experience}</div>
          <div>📅 Posted {job.posted}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          type="primary"
          size="small"
          block
          style={{
            borderRadius: '12px',
            background: appliedJobs.has(job.id) 
              ? 'linear-gradient(135deg, #52C41A, #73D13D)'
              : 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
            border: 'none',
            fontWeight: 600
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleApplyJob(job.id);
          }}
          disabled={appliedJobs.has(job.id)}
        >
          {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
        </Button>
        
        <Button
          size="small"
          icon={<HeartOutlined />}
          style={{
            borderRadius: '12px',
            background: savedJobs.has(job.id) ? '#FF6B6B' : 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSaveJob(job.id);
          }}
        />
      </div>
    </Card>
  );

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

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '60px 40px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 900,
            margin: '0 0 24px 0',
            background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFD93D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(78, 205, 196, 0.3)'
          }}>
            Quantum Jobs
          </h1>
          
          <p style={{
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Discover your dream job with AI-powered matching. Upload your resume for personalized recommendations.
          </p>

          {/* Search Bar */}
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto 32px',
            display: 'flex',
            gap: '16px'
          }}>
            <Search
              placeholder="Search for jobs, companies, or skills..."
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: '#fff'
              }}
            />
            <Button
              size="large"
              icon={<CloudUploadOutlined />}
              onClick={() => setUploadModalVisible(true)}
              style={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                border: 'none',
                color: '#fff',
                fontWeight: 600
              }}
            >
              Upload Resume
            </Button>
            
            <Button
              size="large"
              icon={<ApiOutlined />}
              onClick={async () => {
                try {
                  const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/ai/test`);
                  const data = await response.json();
                  console.log('AI Test Response:', data);
                  message.success('AI service connection successful!');
                } catch (error) {
                  console.error('AI Test Error:', error);
                  message.error('AI service connection failed: ' + error.message);
                }
              }}
              style={{
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontWeight: 600
              }}
            >
              Test AI
            </Button>
          </div>

          {/* Quick Stats */}
          <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
            <Col xs={12} sm={6}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Jobs</span>}
                value={filteredJobs.length}
                valueStyle={{ color: '#4ECDC4', fontSize: '28px', fontWeight: 900 }}
                suffix={<RocketOutlined style={{ color: '#4ECDC4' }} />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>New Today</span>}
                value={2}
                valueStyle={{ color: '#FFD93D', fontSize: '28px', fontWeight: 900 }}
                suffix={<StarFilled style={{ color: '#FFD93D' }} />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Remote Jobs</span>}
                value={filteredJobs.filter(job => job.remote).length}
                valueStyle={{ color: '#FF6B6B', fontSize: '28px', fontWeight: 900 }}
                suffix={<GlobalOutlined style={{ color: '#FF6B6B' }} />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>High Match</span>}
                value={filteredJobs.filter(job => job.match > 85).length}
                valueStyle={{ color: '#6BCF7F', fontSize: '28px', fontWeight: 900 }}
                suffix={<TrophyOutlined style={{ color: '#6BCF7F' }} />}
              />
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <Card
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            marginBottom: '40px'
          }}
          styles={{ body: { padding: '24px' } }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={6}>
              <Select
                placeholder="Location"
                size="large"
                style={{ width: '100%' }}
                onChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                allowClear
              >
                <Option value="san francisco">San Francisco</Option>
                <Option value="new york">New York</Option>
                <Option value="remote">Remote</Option>
                <Option value="austin">Austin</Option>
                <Option value="los angeles">Los Angeles</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Experience Level"
                size="large"
                style={{ width: '100%' }}
                onChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}
                allowClear
              >
                <Option value="entry">Entry Level</Option>
                <Option value="mid">Mid Level</Option>
                <Option value="senior">Senior Level</Option>
                <Option value="lead">Lead/Principal</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Job Type"
                size="large"
                style={{ width: '100%' }}
                onChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}
                allowClear
              >
                <Option value="full-time">Full-time</Option>
                <Option value="part-time">Part-time</Option>
                <Option value="contract">Contract</Option>
                <Option value="freelance">Freelance</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>Remote Only</span>
                <Switch
                  checked={filters.remote}
                  onChange={(checked) => setFilters(prev => ({ ...prev, remote: checked }))}
                  style={{ background: filters.remote ? '#4ECDC4' : '#555' }}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* AI Job Matching Toggle */}
        {aiJobMatching && (
          <Card
            style={{
              background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 107, 107, 0.1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
              borderRadius: '20px',
              marginBottom: '40px'
            }}
            styles={{ body: { padding: '24px' } }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '20px', margin: 0, marginBottom: '8px' }}>
                  🤖 AI-Powered Job Matching
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                  {showAllJobs 
                    ? `Showing all ${mockJobs.length} available jobs` 
                    : `Showing ${matchedJobs.length} jobs matched to your resume`
                  }
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Button
                  type={!showAllJobs ? 'primary' : 'default'}
                  size="large"
                  icon={<ThunderboltOutlined />}
                  onClick={() => {
                    setShowAllJobs(false);
                    setFilteredJobs(matchedJobs);
                  }}
                  style={{
                    borderRadius: '12px',
                    background: !showAllJobs 
                      ? 'linear-gradient(135deg, #4ECDC4, #52C41A)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff'
                  }}
                >
                  AI Matched ({matchedJobs.length})
                </Button>
                
                <Button
                  type={showAllJobs ? 'primary' : 'default'}
                  size="large"
                  icon={<EyeOutlined />}
                  onClick={() => {
                    setShowAllJobs(true);
                    setFilteredJobs(mockJobs);
                  }}
                  style={{
                    borderRadius: '12px',
                    background: showAllJobs 
                      ? 'linear-gradient(135deg, #FF6B6B, #FF8E8E)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff'
                  }}
                >
                  All Jobs ({mockJobs.length})
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Resume Analysis Section */}
        {resumeAnalysis && (
          <Card
            style={{
              background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 107, 107, 0.1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
              borderRadius: '20px',
              marginBottom: '40px'
            }}
            styles={{ body: { padding: '32px' } }}
          >
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '24px' }}>
              📊 AI Resume Analysis Results
            </h3>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <h4 style={{ color: '#4ECDC4', marginBottom: '12px' }}>Analysis Summary</h4>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                  {resumeAnalysis.summary}
                </div>
                {resumeAnalysis.skillAlignment && (
                  <div style={{ marginTop: '16px' }}>
                    <h5 style={{ color: '#FFD93D', marginBottom: '8px' }}>Skill Alignment</h5>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {resumeAnalysis.skillAlignment}
                    </div>
                  </div>
                )}
              </Col>
              
              <Col xs={24} md={8}>
                <h4 style={{ color: '#FFD93D', marginBottom: '12px' }}>Top Matches</h4>
                <div>
                  {resumeAnalysis.topMatches && resumeAnalysis.topMatches.map((match, index) => (
                    <div key={index} style={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      marginBottom: '12px',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{ fontWeight: 600, color: '#4ECDC4' }}>
                        {match.jobTitle}
                      </div>
                      <div style={{ fontSize: '14px', marginTop: '4px' }}>
                        {match.company} • {match.matchScore}% match
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              
              <Col xs={24} md={8}>
                <h4 style={{ color: '#FF6B6B', marginBottom: '12px' }}>AI Recommendations</h4>
                <div>
                  {resumeAnalysis.suggestions && resumeAnalysis.suggestions.map((suggestion, index) => (
                    <div key={index} style={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      marginBottom: '12px',
                      padding: '8px 12px',
                      background: 'rgba(255, 107, 107, 0.1)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #FF6B6B'
                    }}>
                      💡 {suggestion}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
        )}

        {/* Jobs Grid */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ 
              color: '#fff', 
              fontSize: '32px', 
              fontWeight: 800, 
              margin: 0 
            }}>
              Available Jobs ({filteredJobs.length})
            </h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <Select
                defaultValue="newest"
                size="large"
                style={{ width: '150px' }}
              >
                <Option value="newest">Newest</Option>
                <Option value="match">Best Match</Option>
                <Option value="salary">Highest Salary</Option>
              </Select>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            {filteredJobs.map(job => (
              <Col xs={24} sm={12} lg={8} key={job.id}>
                <JobCard job={job} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Upload Resume Modal */}
        <Modal
          title={
            <div style={{ 
              textAlign: 'center', 
              fontSize: '24px', 
              fontWeight: 700,
              color: '#fff'
            }}>
              🚀 Upload Your Resume
            </div>
          }
          open={uploadModalVisible}
          onCancel={() => setUploadModalVisible(false)}
          footer={null}
          width={600}
          styles={{
            body: {
              background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
              borderRadius: '16px',
              padding: '40px'
            }
          }}
        >
          <div style={{ textAlign: 'center', color: '#fff', marginBottom: '32px' }}>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>
              Upload your resume to get personalized job recommendations and match scores.
            </p>
          </div>

          <Dragger {...uploadProps} style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: '#4ECDC4', fontSize: '48px' }} />
            </p>
            <p style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>
              Click or drag file to this area to upload
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Support for PDF, DOC, and DOCX files. Maximum file size: 10MB
            </p>
          </Dragger>

          {loading && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Spin size="large" />
              <p style={{ color: '#fff', marginTop: '16px' }}>
                Analyzing your resume with AI...
              </p>
            </div>
          )}
        </Modal>

        {/* Job Detail Modal */}
        <Modal
          open={jobDetailModal}
          onCancel={() => setJobDetailModal(false)}
          footer={null}
          width={800}
          styles={{
            body: {
              background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
              borderRadius: '16px',
              padding: '0'
            }
          }}
        >
          {selectedJob && (
            <div style={{ padding: '40px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '48px', marginRight: '20px' }}>
                  {selectedJob.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ color: '#fff', margin: 0, fontSize: '28px', fontWeight: 800 }}>
                    {selectedJob.title}
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '8px 0', fontSize: '18px' }}>
                    {selectedJob.company}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <Tag color="cyan">{selectedJob.location}</Tag>
                    <Tag color="green">{selectedJob.type}</Tag>
                    {selectedJob.remote && <Tag color="blue">Remote</Tag>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    background: selectedJob.matchDetails ? 
                      selectedJob.match > 85 ? 'linear-gradient(135deg, #52C41A, #73D13D)' :
                      selectedJob.match > 70 ? 'linear-gradient(135deg, #FFD93D, #FFA940)' :
                      'linear-gradient(135deg, #FF6B6B, #FF8E8E)' :
                      'linear-gradient(135deg, #4ECDC4, #52C41A)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {selectedJob.matchDetails && <ThunderboltOutlined />}
                    {selectedJob.match}% Match
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                    {selectedJob.applications} applications
                  </div>
                </div>
              </div>

              <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                style={{ color: '#fff' }}
              >
                <TabPane tab="Job Description" key="1">
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', lineHeight: '1.6' }}>
                    <h3 style={{ color: '#4ECDC4', marginBottom: '16px' }}>About the Role</h3>
                    <p>{selectedJob.description}</p>
                    
                    <h3 style={{ color: '#FFD93D', marginBottom: '16px', marginTop: '24px' }}>
                      Requirements
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {selectedJob.requirements.map((req, index) => (
                        <Tag key={index} color="orange" style={{ marginBottom: '8px' }}>
                          {req}
                        </Tag>
                      ))}
                    </div>

                    <h3 style={{ color: '#FF6B6B', marginBottom: '16px' }}>Benefits</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedJob.benefits.map((benefit, index) => (
                        <Tag key={index} color="purple" style={{ marginBottom: '8px' }}>
                          {benefit}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </TabPane>
                
                <TabPane tab="Company Info" key="2">
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    <h3 style={{ color: '#4ECDC4' }}>About {selectedJob.company}</h3>
                    <p>Leading technology company focused on innovation and growth.</p>
                    
                    <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                      <Col span={8}>
                        <Statistic
                          title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Employees</span>}
                          value="500+"
                          valueStyle={{ color: '#4ECDC4' }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Founded</span>}
                          value="2015"
                          valueStyle={{ color: '#FFD93D' }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Industry</span>}
                          value="Technology"
                          valueStyle={{ color: '#FF6B6B' }}
                        />
                      </Col>
                    </Row>
                  </div>
                </TabPane>
                
                {selectedJob.matchDetails && (
                  <TabPane tab="AI Analysis" key="3">
                    <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      <h3 style={{ color: '#4ECDC4', marginBottom: '16px' }}>
                        🤖 AI Match Analysis
                      </h3>
                      
                      <div style={{ 
                        background: 'rgba(78, 205, 196, 0.1)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid rgba(78, 205, 196, 0.2)',
                        marginBottom: '24px'
                      }}>
                        <h4 style={{ color: '#FFD93D', marginBottom: '12px' }}>Match Score: {selectedJob.match}%</h4>
                        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                          {selectedJob.matchDetails.reasoning || 'Strong skill alignment detected between your resume and this position.'}
                        </div>
                      </div>
                      
                      {selectedJob.matchDetails.skillMatches && (
                        <div style={{ marginBottom: '24px' }}>
                          <h4 style={{ color: '#FF6B6B', marginBottom: '12px' }}>Skill Matches</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {selectedJob.matchDetails.skillMatches.map((skill, index) => (
                              <Tag key={index} color="green" style={{ borderRadius: '8px' }}>
                                {skill}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div style={{ 
                        background: 'rgba(255, 107, 107, 0.1)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 107, 107, 0.2)'
                      }}>
                        <h4 style={{ color: '#FF6B6B', marginBottom: '12px' }}>💡 AI Recommendations</h4>
                        <ul style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, paddingLeft: '20px' }}>
                          <li>Highlight relevant experience in your cover letter</li>
                          <li>Emphasize specific achievements that align with this role</li>
                          <li>Consider updating your resume to include more relevant keywords</li>
                        </ul>
                      </div>
                    </div>
                  </TabPane>
                )}
              </Tabs>

              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  style={{
                    flex: 1,
                    borderRadius: '16px',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 700,
                    background: appliedJobs.has(selectedJob.id)
                      ? 'linear-gradient(135deg, #52C41A, #73D13D)'
                      : 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                    border: 'none'
                  }}
                  onClick={() => handleApplyJob(selectedJob.id)}
                  disabled={appliedJobs.has(selectedJob.id)}
                >
                  {appliedJobs.has(selectedJob.id) ? 'Applied Successfully' : 'Apply Now'}
                </Button>
                
                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  style={{
                    borderRadius: '16px',
                    height: '48px',
                    background: savedJobs.has(selectedJob.id) ? '#FF6B6B' : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff'
                  }}
                  onClick={() => handleSaveJob(selectedJob.id)}
                >
                  {savedJobs.has(selectedJob.id) ? 'Saved' : 'Save'}
                </Button>
                
                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                  style={{
                    borderRadius: '16px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff'
                  }}
                >
                  Share
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>

      <style>{`
        .ant-input, .ant-select-selector {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: #fff !important;
        }
        
        .ant-select-selection-placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        .ant-tabs-tab {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        
        .ant-tabs-tab-active {
          color: #4ECDC4 !important;
        }
        
        .ant-upload-drag {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 2px dashed rgba(255, 255, 255, 0.3) !important;
        }
        
        .ant-upload-drag:hover {
          border-color: #4ECDC4 !important;
        }
      `}</style>
    </div>
  );
};

export default ModernJobsPage; 