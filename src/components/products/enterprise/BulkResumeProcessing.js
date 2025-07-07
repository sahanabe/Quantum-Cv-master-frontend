import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Button, Row, Col, Progress, Upload, message, Typography,
  Statistic, Table, Tag, Tabs, List, Spin, Steps, Alert, Select, Slider, Input
} from 'antd';
import {
  CloudUploadOutlined, FileTextOutlined, CheckCircleOutlined,
  DatabaseOutlined, BarChartOutlined, DownloadOutlined,
  FilterOutlined, SearchOutlined, TeamOutlined, CalendarOutlined,
  SettingOutlined, BellOutlined, HistoryOutlined, UserOutlined,
  ClockCircleOutlined, TrophyOutlined, SafetyOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const BulkResumeProcessing = () => {
  const [processing, setProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processedResults, setProcessedResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [batchHistory, setBatchHistory] = useState([]);
  const [scheduledJobs, setScheduledJobs] = useState([]);
  const [processingSettings, setProcessingSettings] = useState({
    priority: 'normal',
    notificationEmail: '',
    autoExport: false,
    qualityThreshold: 80
  });
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
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? '#6C5CE7' : '#A29BFE'
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

  const handleBulkUpload = async (files) => {
    setProcessing(true);
    setActiveTab('processing');
    
    // Simulate bulk processing
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const mockResults = {
      totalProcessed: files.length || 1500,
      successful: files.length ? Math.floor(files.length * 0.95) : 1425,
      failed: files.length ? Math.floor(files.length * 0.05) : 75,
      processingTime: '2.3 minutes',
      topCandidates: [
        { name: 'John Smith', score: 95, role: 'Senior Developer', experience: '8 years' },
        { name: 'Sarah Johnson', score: 92, role: 'Product Manager', experience: '6 years' },
        { name: 'Mike Chen', score: 89, role: 'Data Scientist', experience: '5 years' }
      ]
    };
    
    setProcessedResults(mockResults);
    setProcessing(false);
    setActiveTab('results');
    message.success('Bulk processing completed successfully!');
  };

  // Mock data for enterprise features
  useEffect(() => {
    setBatchHistory([
      { id: 1, name: 'Q4 Hiring Batch', date: '2024-01-15', files: 2500, status: 'completed', successRate: 98.5 },
      { id: 2, name: 'Engineering Roles', date: '2024-01-10', files: 1800, status: 'completed', successRate: 97.2 },
      { id: 3, name: 'Sales Team Expansion', date: '2024-01-05', files: 1200, status: 'completed', successRate: 99.1 }
    ]);
    
    setScheduledJobs([
      { id: 1, name: 'Weekly Resume Sync', schedule: 'Every Monday 9 AM', files: 'Auto-import', status: 'active' },
      { id: 2, name: 'Monthly Cleanup', schedule: 'First day of month', files: 'Archive old', status: 'active' }
    ]);
  }, []);

  const uploadProps = {
    name: 'resumes',
    multiple: true,
    accept: '.pdf,.doc,.docx,.txt,.rtf',
    beforeUpload: () => false,
    onChange: (info) => {
      setUploadedFiles(info.fileList);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
              borderRadius: '50%',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(108, 92, 231, 0.3)'
            }}>
              <DatabaseOutlined style={{ fontSize: '60px', color: '#fff' }} />
            </div>

            <Title level={1} style={{
              color: '#fff',
              fontSize: '64px',
              fontWeight: 900,
              margin: '0 0 24px 0',
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Bulk Resume Processing
            </Title>

            <Paragraph style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Process thousands of resumes in minutes. Enterprise-grade AI analysis 
              with 10,000+ resumes per hour processing capacity.
            </Paragraph>

            <Row gutter={[32, 32]} justify="center" style={{ marginTop: '40px' }}>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Processing Speed</span>}
                  value={10000}
                  suffix="+ /hr"
                  valueStyle={{ color: '#6C5CE7', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Accuracy</span>}
                  value={99.2}
                  suffix="%"
                  valueStyle={{ color: '#00B894', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>File Formats</span>}
                  value={15}
                  suffix="+"
                  valueStyle={{ color: '#FDCB6E', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Uptime</span>}
                  value={99.9}
                  suffix="%"
                  valueStyle={{ color: '#00CEC9', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          {/* Main Interface */}
          <Card 
            styles={{
              body: {
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                marginBottom: '60px'
              }
            }}
          >
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              size="large"
              style={{ minHeight: '600px' }}
              items={[
                {
                  key: 'upload',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <CloudUploadOutlined /> Bulk Upload
                    </span>
                  ),
                  children: (
                    <div style={{ padding: '40px' }}>
                      <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
                        Upload Resume Files
                      </Title>
                      
                      <Dragger {...uploadProps} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px dashed rgba(108, 92, 231, 0.5)',
                        borderRadius: '16px',
                        padding: '60px 40px',
                        marginBottom: '40px'
                      }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100px',
                          height: '100px',
                          background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                          borderRadius: '50%',
                          marginBottom: '24px'
                        }}>
                          <FileTextOutlined style={{ fontSize: '50px', color: '#fff' }} />
                        </div>
                        
                        <Title level={3} style={{ color: '#fff', marginBottom: '16px' }}>
                          Drop files here or click to browse
                        </Title>
                        
                        <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                          Support for PDF, DOC, DOCX files • Up to 10,000 files per batch
                          <br />
                          Maximum file size: 50MB each • Total batch size: 5GB
                        </Text>
                      </Dragger>

                      {uploadedFiles.length > 0 && (
                        <div style={{ marginBottom: '40px' }}>
                          <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>
                            Files Ready for Processing ({uploadedFiles.length})
                          </Title>
                          <List
                            dataSource={uploadedFiles.slice(0, 5)}
                            renderItem={(file) => (
                              <List.Item style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                margin: '8px 0',
                                padding: '12px'
                              }}>
                                <List.Item.Meta
                                  avatar={<FileTextOutlined style={{ color: '#6C5CE7' }} />}
                                  title={<span style={{ color: '#fff' }}>{file.name}</span>}
                                  description={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </span>}
                                />
                                <Tag color="blue">Ready</Tag>
                              </List.Item>
                            )}
                          />
                          {uploadedFiles.length > 5 && (
                            <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              ... and {uploadedFiles.length - 5} more files
                            </Text>
                          )}
                        </div>
                      )}

                      <div style={{ textAlign: 'center' }}>
                        <Button
                          type="primary"
                          size="large"
                          icon={<DatabaseOutlined />}
                          onClick={() => handleBulkUpload(uploadedFiles)}
                          disabled={uploadedFiles.length === 0}
                          style={{
                            borderRadius: '25px',
                            padding: '12px 48px',
                            height: 'auto',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                            border: 'none'
                          }}
                        >
                          Start Bulk Processing
                        </Button>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'processing',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <BarChartOutlined /> Processing
                    </span>
                  ),
                  children: processing ? (
                    <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                      <Spin size="large" />
                      <Title level={3} style={{ color: '#fff', marginTop: '32px' }}>
                        Processing Resumes...
                      </Title>
                      
                      <Steps
                        current={2}
                        direction="vertical"
                        size="small"
                        style={{ 
                          marginTop: '40px',
                          maxWidth: '500px',
                          margin: '40px auto'
                        }}
                        items={[
                          {
                            title: <span style={{ color: '#fff' }}>File Upload Complete</span>,
                            status: 'finish',
                            description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {uploadedFiles.length || 1500} files uploaded successfully
                            </span>
                          },
                          {
                            title: <span style={{ color: '#fff' }}>Text Extraction</span>,
                            status: 'finish',
                            description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              Extracting content from all resume formats
                            </span>
                          },
                          {
                            title: <span style={{ color: '#fff' }}>AI Analysis</span>,
                            status: 'process',
                            description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              Analyzing skills, experience, and qualifications
                            </span>
                          },
                          {
                            title: <span style={{ color: '#fff' }}>Data Structuring</span>,
                            status: 'wait',
                            description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              Organizing results into searchable database
                            </span>
                          },
                          {
                            title: <span style={{ color: '#fff' }}>Report Generation</span>,
                            status: 'wait',
                            description: <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              Creating comprehensive analysis reports
                            </span>
                          }
                        ]}
                      />
                      
                      <Progress
                        percent={65}
                        strokeColor={{
                          from: '#6C5CE7',
                          to: '#A29BFE'
                        }}
                        trailColor="rgba(255, 255, 255, 0.1)"
                        size={[300, 20]}
                        style={{ marginTop: '40px' }}
                      />
                      
                      <Text style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '20px', display: 'block' }}>
                        Estimated completion: 2 minutes remaining
                      </Text>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '100px 40px' }}>
                      <Title level={3} style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Start bulk upload to begin processing
                      </Title>
                    </div>
                  )
                },
                {
                  key: 'results',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <CheckCircleOutlined /> Results
                    </span>
                  ),
                  children: processedResults ? (
                    <div style={{ padding: '40px' }}>
                      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>
                          🎉 Processing Complete!
                        </Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
                          {processedResults.totalProcessed} resumes processed in {processedResults.processingTime}
                        </Text>
                      </div>

                      <Row gutter={[32, 32]} style={{ marginBottom: '40px' }}>
                        <Col xs={24} md={8}>
                          <Card variant="borderless" style={{
                            background: 'rgba(0, 184, 148, 0.1)',
                            border: '1px solid rgba(0, 184, 148, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Successfully Processed</span>}
                              value={processedResults.successful}
                              valueStyle={{ color: '#00B894', fontSize: '32px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} md={8}>
                          <Card variant="borderless" style={{
                            background: 'rgba(231, 76, 60, 0.1)',
                            border: '1px solid rgba(231, 76, 60, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Failed Processing</span>}
                              value={processedResults.failed}
                              valueStyle={{ color: '#E74C3C', fontSize: '32px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} md={8}>
                          <Card variant="borderless" style={{
                            background: 'rgba(108, 92, 231, 0.1)',
                            border: '1px solid rgba(108, 92, 231, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</span>}
                              value={(processedResults.successful / processedResults.totalProcessed * 100).toFixed(1)}
                              suffix="%"
                              valueStyle={{ color: '#6C5CE7', fontSize: '32px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                      </Row>

                      <Card variant="borderless" style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        marginBottom: '40px'
                      }}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                          Top Candidates
                        </Title>
                        <List
                          dataSource={processedResults.topCandidates}
                          renderItem={(candidate, index) => (
                            <List.Item style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              borderRadius: '12px',
                              margin: '12px 0',
                              padding: '20px'
                            }}>
                              <List.Item.Meta
                                avatar={
                                  <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                  }}>
                                    {index + 1}
                                  </div>
                                }
                                title={<span style={{ color: '#fff', fontSize: '18px' }}>{candidate.name}</span>}
                                description={
                                  <div>
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{candidate.role}</Text>
                                    <br />
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{candidate.experience}</Text>
                                  </div>
                                }
                              />
                              <div style={{
                                background: `linear-gradient(135deg, ${candidate.score >= 90 ? '#00B894' : '#FDCB6E'}, rgba(255,255,255,0.1))`,
                                borderRadius: '12px',
                                padding: '12px 20px',
                                textAlign: 'center'
                              }}>
                                <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
                                  {candidate.score}%
                                </Text>
                                <br />
                                <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>
                                  Match
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </Card>

                      <div style={{ textAlign: 'center' }}>
                        <Button
                          type="primary"
                          size="large"
                          icon={<DownloadOutlined />}
                          style={{
                            borderRadius: '25px',
                            padding: '12px 32px',
                            height: 'auto',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                            border: 'none',
                            marginRight: '16px'
                          }}
                        >
                          Download Results
                        </Button>
                        <Button
                          size="large"
                          icon={<SearchOutlined />}
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
                          Search Database
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '100px 40px' }}>
                      <Title level={3} style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Complete processing to view results
                      </Title>
                    </div>
                  )
                },
                {
                  key: 'batch-management',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <HistoryOutlined /> Batch History
                    </span>
                  ),
                  children: (
                    <div style={{ padding: '40px' }}>
                      <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
                        Batch Processing History
                      </Title>
                      
                      <List
                        dataSource={batchHistory}
                        renderItem={(batch) => (
                          <List.Item style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            margin: '16px 0',
                            padding: '24px'
                          }}>
                            <List.Item.Meta
                              avatar={
                                <div style={{
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '50%',
                                  background: batch.status === 'completed' ? 'linear-gradient(135deg, #00B894, #00CEC9)' : 'linear-gradient(135deg, #FDCB6E, #FF7675)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#fff',
                                  fontSize: '24px'
                                }}>
                                  <DatabaseOutlined />
                                </div>
                              }
                              title={<span style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>{batch.name}</span>}
                              description={
                                <div>
                                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Processed on {batch.date} • {batch.files.toLocaleString()} files
                                  </Text>
                                  <br />
                                  <Text style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                    Success Rate: {batch.successRate}%
                                  </Text>
                                </div>
                              }
                            />
                            <div style={{ textAlign: 'right' }}>
                              <Tag color={batch.status === 'completed' ? 'green' : 'orange'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                                {batch.status}
                              </Tag>
                              <br />
                              <Button
                                type="text"
                                size="small"
                                style={{ color: '#6C5CE7', marginTop: '8px' }}
                              >
                                View Details
                              </Button>
                            </div>
                          </List.Item>
                        )}
                      />
                    </div>
                  )
                },
                {
                  key: 'scheduling',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <CalendarOutlined /> Scheduling
                    </span>
                  ),
                  children: (
                    <div style={{ padding: '40px' }}>
                      <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
                        Automated Job Scheduling
                      </Title>
                      
                      <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                          <Card variant="borderless" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px'
                          }}>
                            <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                              Active Scheduled Jobs
                            </Title>
                            <List
                              dataSource={scheduledJobs}
                              renderItem={(job) => (
                                <List.Item style={{
                                  background: 'rgba(255, 255, 255, 0.02)',
                                  borderRadius: '12px',
                                  margin: '8px 0',
                                  padding: '16px'
                                }}>
                                  <List.Item.Meta
                                    avatar={<ClockCircleOutlined style={{ color: '#6C5CE7', fontSize: '20px' }} />}
                                    title={<span style={{ color: '#fff' }}>{job.name}</span>}
                                    description={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{job.schedule}</span>}
                                  />
                                  <Tag color="green">{job.status}</Tag>
                                </List.Item>
                              )}
                            />
                          </Card>
                        </Col>
                        
                        <Col xs={24} md={12}>
                          <Card variant="borderless" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px'
                          }}>
                            <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                              Processing Settings
                            </Title>
                            <div style={{ marginBottom: '16px' }}>
                              <Text style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Priority Level</Text>
                              <Select
                                value={processingSettings.priority}
                                onChange={(value) => setProcessingSettings({...processingSettings, priority: value})}
                                style={{ width: '100%' }}
                                options={[
                                  { value: 'low', label: 'Low Priority' },
                                  { value: 'normal', label: 'Normal Priority' },
                                  { value: 'high', label: 'High Priority' },
                                  { value: 'urgent', label: 'Urgent Priority' }
                                ]}
                              />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <Text style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Notification Email</Text>
                              <Input
                                value={processingSettings.notificationEmail}
                                onChange={(e) => setProcessingSettings({...processingSettings, notificationEmail: e.target.value})}
                                placeholder="Enter email for notifications"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                              />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <Text style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Quality Threshold: {processingSettings.qualityThreshold}%</Text>
                              <Slider
                                value={processingSettings.qualityThreshold}
                                onChange={(value) => setProcessingSettings({...processingSettings, qualityThreshold: value})}
                                min={50}
                                max={100}
                                style={{ marginTop: '8px' }}
                              />
                            </div>
                            <Button
                              type="primary"
                              style={{
                                background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                                border: 'none',
                                borderRadius: '12px',
                                width: '100%'
                              }}
                            >
                              Save Settings
                            </Button>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  )
                },
                {
                  key: 'analytics',
                  label: (
                    <span style={{ color: '#fff', fontSize: '16px' }}>
                      <BarChartOutlined /> Analytics
                    </span>
                  ),
                  children: (
                    <div style={{ padding: '40px' }}>
                      <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
                        Processing Analytics & Insights
                      </Title>
                      
                      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
                        <Col xs={12} sm={6}>
                          <Card style={{
                            background: 'rgba(0, 184, 148, 0.1)',
                            border: '1px solid rgba(0, 184, 148, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Processed</span>}
                              value={5500}
                              valueStyle={{ color: '#00B894', fontSize: '28px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={12} sm={6}>
                          <Card style={{
                            background: 'rgba(108, 92, 231, 0.1)',
                            border: '1px solid rgba(108, 92, 231, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg. Success Rate</span>}
                              value={98.3}
                              suffix="%"
                              valueStyle={{ color: '#6C5CE7', fontSize: '28px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={12} sm={6}>
                          <Card style={{
                            background: 'rgba(253, 203, 110, 0.1)',
                            border: '1px solid rgba(253, 203, 110, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Processing Time</span>}
                              value={2.1}
                              suffix=" min"
                              valueStyle={{ color: '#FDCB6E', fontSize: '28px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={12} sm={6}>
                          <Card style={{
                            background: 'rgba(0, 206, 201, 0.1)',
                            border: '1px solid rgba(0, 206, 201, 0.3)',
                            borderRadius: '16px',
                            textAlign: 'center'
                          }}>
                            <Statistic
                              title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Top Candidates</span>}
                              value={247}
                              valueStyle={{ color: '#00CEC9', fontSize: '28px', fontWeight: 'bold' }}
                            />
                          </Card>
                        </Col>
                      </Row>
                      
                      <Card variant="borderless" style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px'
                      }}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                          Recent Processing Trends
                        </Title>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <BarChartOutlined style={{ fontSize: '64px', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }} />
                            <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                              Processing volume has increased by 23% this month
                            </Text>
                            <br />
                            <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
                              Average processing time reduced by 15%
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                }
              ]}
            />
          </Card>

          {/* Features */}
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <Card variant="borderless" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <CloudUploadOutlined style={{ fontSize: '48px', color: '#6C5CE7', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Massive Scale
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Process up to 10,000 resumes per hour with enterprise-grade 
                    infrastructure and parallel processing capabilities.
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card variant="borderless" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <FilterOutlined style={{ fontSize: '48px', color: '#00B894', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Smart Filtering
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Advanced AI algorithms automatically categorize and rank 
                    candidates based on your specific requirements and criteria.
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card variant="borderless" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <TeamOutlined style={{ fontSize: '48px', color: '#FDCB6E', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Team Collaboration
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Share results with your hiring team, add notes, and 
                    collaborate on candidate evaluation in real-time.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Additional Enterprise Features */}
          <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
            <Col xs={24} lg={8}>
              <Card variant="borderless" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <CalendarOutlined style={{ fontSize: '48px', color: '#00CEC9', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Automated Scheduling
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Schedule recurring processing jobs, set up automated imports, 
                    and never miss a batch with intelligent scheduling.
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card variant="borderless" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <SafetyOutlined style={{ fontSize: '48px', color: '#FF7675', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Enterprise Security
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    SOC 2 compliant with end-to-end encryption, role-based access 
                    control, and comprehensive audit trails for compliance.
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card variant="borderless" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                height: '280px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <BarChartOutlined style={{ fontSize: '48px', color: '#A29BFE', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                    Advanced Analytics
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Deep insights into processing efficiency, candidate quality 
                    trends, and hiring pipeline optimization with detailed reports.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BulkResumeProcessing; 