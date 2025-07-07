import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Row, Col, Modal, Upload, message, Spin } from 'antd';
import { SearchOutlined, FileTextOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

// Jobs state, fetched from backend
const JobScan = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([
    {
      title: 'Special Needs Caregiver',
      company: 'Bright Horizons Care',
      location: 'New York, NY',
      description: 'Provide care and support for children and adults with special needs. Develop individualized care plans, coordinate with families, and ensure a safe environment.',
    },
    {
      title: 'Early Childhood Development Specialist',
      company: 'Sunrise Learning Center',
      location: 'Brooklyn, NY',
      description: 'Design and implement educational programs for children with diverse needs. Collaborate with teachers and parents to support child development.',
    },
    {
      title: 'Adult Client Employment Coordinator',
      company: 'Empowerment Works',
      location: 'Remote',
      description: 'Manage work placement for adults with special needs. Track employment outcomes and provide counseling to clients and employers.',
    },
    {
      title: 'Special Education Teacher',
      company: 'City Public Schools',
      location: 'Queens, NY',
      description: 'Teach and support students with special needs in a classroom setting. Develop IEPs and collaborate with multidisciplinary teams.',
    },
    {
      title: 'Care Program Planner',
      company: 'Hopeful Futures',
      location: 'Jersey City, NJ',
      description: 'Plan and manage care programs for children and adults with disabilities. Oversee staff and ensure compliance with care standards.',
    },
  ]);


  const [descModal, setDescModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState('');
  const [resumeContent, setResumeContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      if (res.data && Array.isArray(res.data.jobs)) {
        setJobs(res.data.jobs);
      }
    } catch (err) {
      message.error('Failed to fetch jobs');
    }
  };

  const handleShowDesc = (job) => {
    setSelectedJob(job);
    setDescModal(true);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase()) ||
    job.description.toLowerCase().includes(search.toLowerCase())
  );

  // Upload config
  const uploadProps = {
    name: 'cv',
    multiple: false,
    accept: '.pdf,.doc,.docx',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('analysisType', 'ats'); // Always send analysisType

      try {
        const res = await axios.post('/api/analyze-cv-gemini', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data?.analysis) {
          setResumeContent(
            `Summary: ${res.data.analysis.summary || 'N/A'}\n\n` +
            `Keywords: ${(res.data.analysis.keywords || []).join(', ')}\n\n` +
            `Formatting: ${res.data.analysis.formatting || 'N/A'}\n\n` +
            `Improvements:\n- ${(res.data.analysis.improvements || []).join('\n- ')}\n\n` +
            `Job-Fit Score: ${res.data.analysis.matchScore ?? 'N/A'}`
          );
        } else {
          setResumeContent('No content extracted.');
        }
        message.success('Resume analyzed successfully!');
        onSuccess('ok');
      } catch (err) {
        message.error('Failed to analyze resume.');
        setResumeContent(null);
        onError(err);
      } finally {
        setLoading(false);
      }
    },
  };

  return (
    <div style={{ maxWidth: 1100, margin: '48px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button
          type="primary"
          style={{ borderRadius: 18, fontWeight: 700, background: '#246bfd', color: '#fff' }}
          onClick={() => navigate('/all-jobs')}
        >
          All Jobs
        </Button>
      </div>
      <Card
        style={{
          borderRadius: 24,
          boxShadow: '0 4px 32px #246bfd22',
          background: 'linear-gradient(120deg, #f7faff 60%, #e6f0ff 100%)',
          padding: 32,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
          <SearchOutlined style={{ fontSize: 48, color: '#246bfd' }} />
          <Title level={1} style={{ margin: 0, color: '#246bfd', fontWeight: 900, letterSpacing: 1 }}>
            Job Scan
          </Title>
        </div>
        <Paragraph style={{ fontSize: 18, color: '#333', marginBottom: 32 }}>
          Instantly analyze your resume against any job description. Get AI-powered feedback and optimization tips to boost your chances of landing interviews!
        </Paragraph>
      </Card>

      {/* Resume Upload Section */}
      <Card
        style={{
          border: '2px solid #246bfd',
          borderRadius: 18,
          background: '#fff',
          marginBottom: 32,
          boxShadow: '0 2px 16px #246bfd11',
        }}
      >
        <Title level={3} style={{ color: '#246bfd', marginBottom: 8 }}>
          1. Upload Your Resume
        </Title>
        <Paragraph style={{ color: '#333', marginBottom: 16 }}>
          Upload your resume (PDF, DOC, or DOCX). The AI will extract and analyze your details.
        </Paragraph>
        <Dragger {...uploadProps} disabled={loading}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#246bfd', fontSize: 36 }} />
          </p>
          <p className="ant-upload-text" style={{ color: '#246bfd', fontWeight: 600 }}>
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint" style={{ color: '#888' }}>
            Only PDF, DOC, or DOCX files are supported.
          </p>
        </Dragger>
        {loading && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Spin tip="Analyzing resume..." />
          </div>
        )}
        {resumeContent && (
          <div
            style={{
              background: '#fff',
              color: '#111',
              border: '1px solid #eee',
              borderRadius: 12,
              padding: 24,
              marginTop: 24,
              fontSize: 16,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              boxShadow: '0 1px 8px #246bfd11',
            }}
          >
            <Title level={4} style={{ color: '#246bfd', marginBottom: 12 }}>
              Extracted Resume Content
            </Title>
            <div>{resumeContent}</div>
          </div>
        )}
      </Card>

      {/* Only show job search and job list after resume is uploaded and analyzed */}
      {resumeContent && (
        <>
          <Card
            style={{
              borderRadius: 18,
              boxShadow: '0 2px 16px #246bfd11',
              marginBottom: 32,
              background: '#f7faff',
            }}
          >
            <Title level={4} style={{ color: '#246bfd', marginBottom: 16 }}>
              2. Find Jobs You Can Apply For
            </Title>
            <div style={{ maxWidth: 400, margin: '0 auto 32px auto', textAlign: 'center' }}>
              <input
                type="text"
                placeholder="Search jobs by title, company, location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 16,
                  border: '1px solid #d9d9d9',
                  fontSize: 16,
                  marginBottom: 24,
                  outline: 'none',
                }}
              />
            </div>
            <Row gutter={[32, 32]}>
              {filteredJobs.length === 0 ? (
                <Col span={24} style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>
                  No jobs found.
                </Col>
              ) : (
                filteredJobs.map((job, idx) => (
                  <Col xs={24} md={12} lg={8} key={idx}>
                    <Card
                      style={{ borderRadius: 18, boxShadow: '0 2px 16px #246bfd11', marginBottom: 16 }}
                      title={<span style={{ color: '#246bfd', fontWeight: 700 }}>{job.title}</span>}
                      extra={<Text type="secondary">{job.company}</Text>}
                      actions={[
                        <Button type="link" icon={<EyeOutlined />} onClick={() => handleShowDesc(job)} key="desc">See Description</Button>
                      ]}
                    >
                      <div style={{ marginBottom: 8 }}><Text strong>Location:</Text> {job.location}</div>
                      <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Button
                          type="primary"
                          icon={<FileTextOutlined />}
                          style={{
                            width: '100%',
                            fontWeight: 700,
                            background: 'none',
                            color: '#FFD700',
                            border: '2px solid #FFD700',
                            textShadow: '0 1px 2px #bfa100',
                            letterSpacing: 0.5,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onClick={() => window.location.href = '/pricing'}
                        >
                          <span role="img" aria-label="lock" style={{ marginRight: 8, color: '#FFD700' }}>🔒</span>
                          <span style={{ color: '#FFD700', fontWeight: 700 }}>Apply</span>
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Card>
        </>
      )}

      <Modal
        open={descModal}
        onCancel={() => setDescModal(false)}
        footer={null}
        centered
        title={selectedJob ? selectedJob.title : ''}
      >
        <Paragraph><Text strong>Company:</Text> {selectedJob?.company}</Paragraph>
        <Paragraph><Text strong>Location:</Text> {selectedJob?.location}</Paragraph>
        <Paragraph><Text strong>Description:</Text> {selectedJob?.description}</Paragraph>
      </Modal>
    </div>
  );
};

export default JobScan;