import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Statistic, Progress, Button, Table, Tag, Avatar, Tooltip, Badge, Timeline, Modal, Form, Input, Upload, message, Dropdown, List } from 'antd';
import axios from 'axios';
import { TeamOutlined, BarChartOutlined, RiseOutlined, UserOutlined, ApartmentOutlined, CheckCircleTwoTone, CrownFilled, ThunderboltFilled, BellFilled, PlusCircleFilled, DownloadOutlined, UserAddOutlined, TrophyFilled, EditOutlined, UploadOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const demoStats = [
  { label: 'Total Employees', value: 128, icon: <TeamOutlined style={{ color: '#246bfd' }} /> },
  { label: 'Active Job Posts', value: 12, icon: <BarChartOutlined style={{ color: '#52c41a' }} /> },
  { label: 'Applications', value: 432, icon: <RiseOutlined style={{ color: '#faad14' }} /> },
  { label: 'Departments', value: 7, icon: <ApartmentOutlined style={{ color: '#ff7875' }} /> },
];

const team = [
  { name: 'Alice Smith', role: 'HR Manager', avatar: '', status: 'online' },
  { name: 'Bob Lee', role: 'Recruiter', avatar: '', status: 'offline' },
  { name: 'Jane Doe', role: 'Talent Lead', avatar: '', status: 'online' },
  { name: 'John Carter', role: 'Sourcer', avatar: '', status: 'away' },
];

// Remove hardcoded jobs, use state

const statusColors = { Open: 'green', Closed: 'red' };


// Mocked data for new features
const notifications = [
  { id: 1, text: 'Alice Smith posted a new job: Product Designer', time: '2m ago' },
  { id: 2, text: 'Bob Lee invited a new team member', time: '10m ago' },
  { id: 3, text: 'Jane Doe closed a job opening', time: '1h ago' },
];

const topTalent = [
  { name: 'Emily Zhang', score: 98, avatar: '', badge: 'Top Performer' },
  { name: 'Carlos Rivera', score: 95, avatar: '', badge: 'Rising Star' },
  { name: 'Priya Patel', score: 93, avatar: '', badge: 'Consistent' },
];

const recentActivity = [
  { color: '#246bfd', text: 'New job posted: Senior Backend Engineer', time: 'Today, 09:30' },
  { color: '#52c41a', text: 'Offer accepted by John Carter', time: 'Yesterday, 16:10' },
  { color: '#faad14', text: 'Team meeting scheduled', time: 'Yesterday, 11:00' },
  { color: '#ffe066', text: 'Job closed: Data Scientist', time: '2 days ago' },
];


const defaultCompanyProfile = {
  name: 'Quantum Innovations Inc.',
  logo: '',
  industry: 'AI & Technology',
  location: 'San Francisco, CA',
  website: 'www.quantuminnovations.com',
  employees: 128,
  founded: 2017,
};


const EnterpriseDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [jobModal, setJobModal] = useState(false);
  const [jobForm] = Form.useForm();
  const [jobLoading, setJobLoading] = useState(false);
  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      if (res.data && Array.isArray(res.data.jobs)) {
        setJobs(res.data.jobs.map(j => ({
          ...j,
          key: j._id,
          applicants: j.applicants || 0, // fallback for now
          status: 'Open', // fallback, backend does not have status
          posted: j.postedAt ? j.postedAt.slice(0, 10) : '',
        })));
      }
    } catch (err) {
      message.error('Failed to fetch jobs');
    }
  };

  // Post new job
  const handlePostJob = async (values) => {
    setJobLoading(true);
    try {
      // For demo, assume admin token is in localStorage as 'token'
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/admin/jobs', values, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined }
      });
      if (res.data && res.data.job) {
        message.success('Job posted!');
        setJobModal(false);
        jobForm.resetFields();
        fetchJobs();
      }
    } catch (err) {
      message.error('Failed to post job');
    } finally {
      setJobLoading(false);
    }
  };
  const [companyProfile, setCompanyProfile] = useState(() => {
    // Try to load from localStorage for demo persistence
    try {
      const saved = localStorage.getItem('companyProfile');
      return saved ? JSON.parse(saved) : defaultCompanyProfile;
    } catch {
      return defaultCompanyProfile;
    }
  });
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const [logoPreview, setLogoPreview] = useState(companyProfile.logo || '');

  // Save to localStorage for demo persistence
  const saveProfile = (profile) => {
    setCompanyProfile(profile);
    try {
      localStorage.setItem('companyProfile', JSON.stringify(profile));
    } catch {}
  };

  // Sidebar menu items
  const sidebarItems = [
    { key: 'overview', label: 'Overview', icon: <ThunderboltFilled /> },
    { key: 'team', label: 'HR & Talent Team', icon: <TeamOutlined /> },
    { key: 'jobs', label: 'Job Openings', icon: <BarChartOutlined /> },
    { key: 'analytics', label: 'Hiring Analytics', icon: <RiseOutlined /> },
    { key: 'talent', label: 'Top Talent', icon: <TrophyFilled /> },
    { key: 'activity', label: 'Recent Activity', icon: <BellFilled /> },
    { key: 'bulk-analyzer', label: 'Bulk Resume Analyzer', icon: <FileTextOutlined /> },
  ];

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 60% 40%, #101522 60%, #246bfd 100%)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Glassmorphic/animated background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0,
        background: 'radial-gradient(circle at 80% 20%, #ffe06633 0%, transparent 60%), radial-gradient(circle at 20% 80%, #52c41a33 0%, transparent 60%)',
        animation: 'dashboardBgAnim 8s linear infinite alternate',
        filter: 'blur(2px)',
      }} />
      <style>{`
        @keyframes dashboardBgAnim {
          0% { filter: blur(2px); }
          100% { filter: blur(8px); }
        }
      `}</style>
      <div style={{
        background: 'rgba(24,28,42,0.96)',
        borderRadius: 32,
        boxShadow: '0 8px 48px #246bfd33',
        border: '1.5px solid rgba(36,107,253,0.18)',
        padding: '48px 56px',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        color: '#fff',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        minHeight: 800,
        overflow: 'visible',
      }}>
        {/* Sidebar */}
        <div style={{
          minWidth: 260,
          maxWidth: 300,
          background: 'rgba(18,22,34,0.98)',
          borderRadius: 24,
          marginRight: 36,
          padding: '18px 0 18px 0',
          boxShadow: '0 4px 24px #246bfd22',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 0,
          height: '100%',
          border: '1.5px solid #1a233a',
          position: 'relative',
          overflow: 'visible',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <ThunderboltFilled style={{ fontSize: 32, color: '#246bfd', filter: 'drop-shadow(0 2px 8px #246bfd88)' }} />
            <Title level={4} style={{ color: '#fff', fontWeight: 900, margin: '10px 0 0 0', letterSpacing: 1, fontSize: 18, textTransform: 'uppercase', letterSpacing: 2 }}>Dashboard</Title>
            <Button
              onClick={handleLogout}
              style={{ marginTop: 16, width: '80%', background: '#fff', color: '#246bfd', fontWeight: 700, borderRadius: 8 }}
              block
            >
              Logout
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {sidebarItems.map(item => (
              <Button
                key={item.key}
                type="text"
                icon={item.icon}
                onClick={() => {
                  if (item.key === 'bulk-analyzer') {
                    window.location.href = '/bulk-resume-analyzer';
                  } else {
                    setSelectedSection(item.key);
                  }
                }}
                style={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  fontWeight: selectedSection === item.key ? 900 : 600,
                  fontSize: 15,
                  color: selectedSection === item.key ? '#246bfd' : '#b0e1ff',
                  background: selectedSection === item.key ? 'linear-gradient(90deg, #e6f0ff 0%, #246bfd22 100%)' : 'none',
                  borderRadius: 0,
                  margin: 0,
                  padding: '16px 28px',
                  marginBottom: 0,
                  borderLeft: selectedSection === item.key ? '4px solid #246bfd' : '4px solid transparent',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderBottom: 'none',
                  boxShadow: selectedSection === item.key ? '0 2px 8px #246bfd22' : 'none',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  outline: 'none',
                }}
              >
                {item.icon} {item.label}
              </Button>
            ))}
          </div>
          <div style={{ position: 'absolute', left: -18, bottom: 12, opacity: 0.08, fontSize: 90, pointerEvents: 'none' }}>
            <ThunderboltFilled />
          </div>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
          {/* Header + Company Profile + Notifications */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
            {/* Company Profile Card */}
            <Card style={{ minWidth: 320, maxWidth: 340, borderRadius: 24, background: 'rgba(36,107,253,0.10)', color: '#fff', boxShadow: '0 2px 16px #246bfd22', border: '1.5px solid #246bfd', marginBottom: 0 }} bodyStyle={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 12 }}>
                {companyProfile.logo ? (
                  <Avatar size={64} src={companyProfile.logo} style={{ background: '#fff', fontWeight: 900, fontSize: 32 }} />
                ) : (
                  <Avatar size={64} style={{ background: '#246bfd', fontWeight: 900, fontSize: 32 }}>Q</Avatar>
                )}
                <div>
                  <Title level={3} style={{ color: '#246bfd', margin: 0, fontWeight: 900 }}>{companyProfile.name}</Title>
                  <Tag color="#ffe066" style={{ color: '#181c2a', fontWeight: 700, borderRadius: 8, marginLeft: 6, fontSize: 13 }}>{companyProfile.industry}</Tag>
                </div>
                <Tooltip title="Edit Company Profile">
                  <Button icon={<EditOutlined />} size="small" style={{ marginLeft: 'auto', borderRadius: 12, background: '#fff', color: '#246bfd', fontWeight: 700 }} onClick={() => {
                    setLogoPreview(companyProfile.logo || '');
                    form.setFieldsValue(companyProfile);
                    setEditModal(true);
                  }} />
                </Tooltip>
              </div>
              <div style={{ color: '#b0e1ff', fontSize: 15, marginBottom: 8 }}>{companyProfile.location}</div>
              <div style={{ color: '#b0e1ff', fontSize: 15, marginBottom: 8 }}>Website: <a href={`https://${companyProfile.website}`} style={{ color: '#ffe066' }} target="_blank" rel="noopener noreferrer">{companyProfile.website}</a></div>
              <div style={{ color: '#b0e1ff', fontSize: 15 }}>Employees: <b>{companyProfile.employees}</b> | Founded: <b>{companyProfile.founded}</b></div>
            </Card>
            {/* Edit Company Modal */}
            <Modal
              open={editModal}
              onCancel={() => setEditModal(false)}
              footer={null}
              centered
              width={420}
              destroyOnClose
              title={<span style={{ color: '#246bfd', fontWeight: 800, fontSize: 22 }}>Edit Company Profile</span>}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={companyProfile}
                onFinish={values => {
                  const updated = { ...companyProfile, ...values, logo: logoPreview };
                  saveProfile(updated);
                  setEditModal(false);
                  message.success('Company profile updated!');
                }}
              >
                <Form.Item label="Logo" style={{ textAlign: 'center' }}>
                  <Upload
                    showUploadList={false}
                    accept="image/*"
                    beforeUpload={file => {
                      const reader = new FileReader();
                      reader.onload = e => {
                        setLogoPreview(e.target.result);
                      };
                      reader.readAsDataURL(file);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload Logo</Button>
                  </Upload>
                  {logoPreview && (
                    <div style={{ marginTop: 12 }}>
                      <Avatar src={logoPreview} size={64} style={{ background: '#fff', border: '2px solid #246bfd' }} />
                      <Button size="small" style={{ marginLeft: 12 }} onClick={() => setLogoPreview('')}>Remove</Button>
                    </div>
                  )}
                </Form.Item>
                <Form.Item name="name" label="Company Name" rules={[{ required: true, message: 'Enter company name' }]}> <Input /> </Form.Item>
                <Form.Item name="industry" label="Industry" rules={[{ required: true, message: 'Enter industry' }]}> <Input /> </Form.Item>
                <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Enter location' }]}> <Input /> </Form.Item>
                <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Enter website' }]}> <Input /> </Form.Item>
                <Form.Item name="employees" label="Employees" rules={[{ required: true, message: 'Enter number of employees' }]}> <Input type="number" min={1} /> </Form.Item>
                <Form.Item name="founded" label="Founded" rules={[{ required: true, message: 'Enter founding year' }]}> <Input type="number" min={1800} max={new Date().getFullYear()} /> </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block style={{ borderRadius: 12, fontWeight: 700 }}>Save</Button>
                </Form.Item>
              </Form>
            </Modal>
            {/* Dashboard Title & Notifications */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
                <ThunderboltFilled style={{ fontSize: 54, color: '#ffe066', filter: 'drop-shadow(0 2px 16px #246bfd88)' }} spin />
                <Title level={1} style={{ color: '#fff', fontWeight: 900, letterSpacing: 2, margin: 0 }}>Enterprise Dashboard</Title>
                <Dropdown
                  placement="bottomRight"
                  trigger={["click"]}
                  overlay={
                    <Card style={{ borderRadius: 18, background: '#23263a', color: '#fff', minWidth: 280, boxShadow: '0 2px 16px #246bfd22', border: '1.5px solid #246bfd', marginTop: 8 }} bodyStyle={{ padding: 0 }}>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid #246bfd22', background: '#181c2a', borderRadius: '18px 18px 0 0' }}>
                        <Title level={5} style={{ color: '#ffe066', margin: 0, fontWeight: 800 }}>Notifications</Title>
                      </div>
                      <List
                        dataSource={notifications}
                        renderItem={n => (
                          <List.Item style={{ padding: '14px 20px', borderBottom: '1px solid #23263a', color: '#fff', fontWeight: 500, fontSize: 15 }}>
                            <BellFilled style={{ color: '#ffe066', marginRight: 8 }} /> {n.text}
                            <span style={{ color: '#b0e1ff', fontSize: 13, marginLeft: 8 }}>{n.time}</span>
                          </List.Item>
                        )}
                        locale={{ emptyText: <span style={{ color: '#b0e1ff' }}>No notifications</span> }}
                        style={{ background: '#23263a', borderRadius: '0 0 18px 18px' }}
                        bordered={false}
                      />
                    </Card>
                  }
                >
                  <Badge count={notifications.length} offset={[0, 8]} style={{ background: '#faad14', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                    <Button icon={<BellFilled />} size="large" style={{ borderRadius: 16, background: '#23263a', color: '#ffe066', marginLeft: 12, fontSize: 22, boxShadow: '0 2px 8px #ffe06655' }} />
                  </Badge>
                </Dropdown>
              </div>
              <Paragraph style={{ color: '#b0e1ff', fontSize: 20, margin: 0, fontWeight: 500 }}>
                Manage your company’s hiring, teams, and analytics in one powerful, modern dashboard.
              </Paragraph>
              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
                <Button icon={<PlusCircleFilled />} type="primary" style={{ borderRadius: 16, fontWeight: 700, background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)', color: '#fff', boxShadow: '0 2px 12px #246bfd55' }} onClick={() => setJobModal(true)}>Post Job</Button>
                <Button icon={<UserAddOutlined />} style={{ borderRadius: 16, fontWeight: 700, background: '#23263a', color: '#ffe066', border: '2px solid #ffe066' }}>Invite Team</Button>
                <Button icon={<DownloadOutlined />} style={{ borderRadius: 16, fontWeight: 700, background: '#23263a', color: '#52c41a', border: '2px solid #52c41a' }}>Download Report</Button>
              </div>
              {/* Post Job Modal */}
              <Modal
                open={jobModal}
                onCancel={() => setJobModal(false)}
                footer={null}
                centered
                title={<span style={{ color: '#246bfd', fontWeight: 800, fontSize: 22 }}>Post New Job</span>}
              >
                <Form
                  form={jobForm}
                  layout="vertical"
                  onFinish={handlePostJob}
                >
                  <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Enter job title' }]}> <Input /> </Form.Item>
                  <Form.Item name="company" label="Company" rules={[{ required: true, message: 'Enter company name' }]}> <Input /> </Form.Item>
                  <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Enter location' }]}> <Input /> </Form.Item>
                  <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Enter job description' }]}> <Input.TextArea rows={4} /> </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={jobLoading} style={{ borderRadius: 12, fontWeight: 700 }}>Post Job</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
          {/* Notifications Dropdown removed (now handled by Dropdown button above) */}
          {/* Section Content */}
          {selectedSection === 'talent' && (
            <Card style={{ borderRadius: 20, marginBottom: 40, background: '#fff', color: '#181c2a', boxShadow: '0 2px 16px #246bfd22' }}>
              <Title level={3} style={{ color: '#246bfd', fontWeight: 800, marginBottom: 24 }}>Top Talent Leaderboard</Title>
              <Row gutter={[32, 32]} justify="center">
                {topTalent.map((talent, idx) => (
                  <Col xs={24} sm={12} md={8} key={talent.name}>
                    <div style={{ textAlign: 'center', padding: 18 }}>
                      <Avatar size={72} icon={<UserOutlined />} style={{ background: '#ffe066', color: '#246bfd', marginBottom: 12, boxShadow: '0 2px 12px #246bfd55', fontWeight: 900, fontSize: 32 }} />
                      <div style={{ fontWeight: 700, fontSize: 20 }}>{talent.name}</div>
                      <div style={{ color: '#b0e1ff', fontWeight: 500, fontSize: 16 }}>Score: <b>{talent.score}</b></div>
                      <Tag color={idx === 0 ? 'gold' : idx === 1 ? 'blue' : 'green'} style={{ marginTop: 8, fontWeight: 700 }}>{talent.badge}</Tag>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          )}
          {selectedSection === 'activity' && (
            <Card style={{ borderRadius: 20, marginBottom: 40, background: '#23263a', color: '#fff', boxShadow: '0 2px 16px #246bfd22' }}>
              <Title level={3} style={{ color: '#52c41a', fontWeight: 800, marginBottom: 24 }}>Recent Activity</Title>
              <Timeline mode="left" style={{ marginTop: 16 }}>
                {recentActivity.map((item, idx) => (
                  <Timeline.Item key={idx} color={item.color} label={<span style={{ color: '#b0e1ff', fontWeight: 600 }}>{item.time}</span>}>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{item.text}</span>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          )}

          {/* Section Content */}
          {selectedSection === 'overview' && (
            <>
              {/* Stats Row */}
              <Row gutter={[32, 32]} justify="center" style={{ marginBottom: 40 }}>
                {demoStats.map((stat, idx) => (
                  <Col xs={24} sm={12} md={6} key={stat.label}>
                    <Card style={{ borderRadius: 18, background: '#181c2a', color: '#fff', textAlign: 'center', boxShadow: '0 2px 16px #246bfd22' }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>{stat.icon}</div>
                      <Statistic title={<span style={{ color: '#b0e1ff', fontWeight: 600 }}>{stat.label}</span>} value={stat.value} valueStyle={{ color: '#fff', fontWeight: 900, fontSize: 32 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
          {selectedSection === 'team' && (
            <Card style={{ borderRadius: 20, marginBottom: 40, background: '#23263a', color: '#fff', boxShadow: '0 2px 16px #246bfd22' }}>
              <Title level={3} style={{ color: '#246bfd', fontWeight: 800, marginBottom: 24 }}>HR & Talent Team</Title>
              <Row gutter={[32, 32]} justify="center">
                {team.map((member, idx) => (
                  <Col xs={24} sm={12} md={6} key={member.name}>
                    <div style={{ textAlign: 'center', padding: 12 }}>
                      <Avatar size={72} icon={<UserOutlined />} style={{ background: '#246bfd', marginBottom: 12, boxShadow: '0 2px 12px #246bfd55' }} />
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{member.name}</div>
                      <div style={{ color: '#b0e1ff', fontWeight: 500 }}>{member.role}</div>
                      <Tag color={member.status === 'online' ? 'green' : member.status === 'away' ? 'orange' : 'red'} style={{ marginTop: 8 }}>{member.status}</Tag>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          )}
          {selectedSection === 'jobs' && (
            <Card style={{ borderRadius: 20, marginBottom: 40, background: '#fff', color: '#181c2a', boxShadow: '0 2px 16px #246bfd22' }}>
              <Title level={3} style={{ color: '#246bfd', fontWeight: 800, marginBottom: 24 }}>Job Openings</Title>
              <Table
                dataSource={jobs}
                columns={[
                  { title: 'Title', dataIndex: 'title', key: 'title', render: t => <b>{t}</b> },
                  { title: 'Company', dataIndex: 'company', key: 'company', align: 'center' },
                  { title: 'Location', dataIndex: 'location', key: 'location', align: 'center' },
                  { title: 'Applicants', dataIndex: 'applicants', key: 'applicants', align: 'center' },
                  { title: 'Status', dataIndex: 'status', key: 'status', align: 'center', render: s => <Tag color={statusColors[s] || 'blue'}>{s}</Tag> },
                  { title: 'Posted', dataIndex: 'posted', key: 'posted', align: 'center' },
                  { title: 'Action', key: 'action', align: 'center', render: (_, record) => <Button type="link" style={{ color: '#246bfd', fontWeight: 700 }} onClick={() => setSelectedJob(record)}>View</Button> },
                ]}
                pagination={false}
                bordered
                style={{ background: '#fff', borderRadius: 12 }}
              />
              {/* Job Description Modal */}
              <Modal
                open={!!selectedJob}
                onCancel={() => setSelectedJob(null)}
                footer={null}
                centered
                title={selectedJob ? selectedJob.title : ''}
              >
                <Paragraph><Text strong>Company:</Text> {selectedJob?.company}</Paragraph>
                <Paragraph><Text strong>Location:</Text> {selectedJob?.location}</Paragraph>
                <Paragraph><Text strong>Description:</Text> {selectedJob?.description}</Paragraph>
              </Modal>
            </Card>
          )}
          {selectedSection === 'analytics' && (
            <Card style={{ borderRadius: 20, background: '#23263a', color: '#fff', marginBottom: 0, boxShadow: '0 2px 16px #246bfd22' }}>
              <Title level={3} style={{ color: '#52c41a', fontWeight: 800, marginBottom: 24 }}>Hiring Analytics</Title>
              <Row gutter={[32, 32]} justify="center">
                <Col xs={24} sm={12} md={8}>
                  <div style={{ fontWeight: 600, color: '#b0e1ff', marginBottom: 8 }}>Application Success Rate</div>
                  <Progress percent={78} strokeColor="#246bfd" trailColor="#23263a" strokeWidth={14} style={{ marginBottom: 12 }} />
                  <Text style={{ color: '#fff', fontWeight: 700 }}>78%</Text>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ fontWeight: 600, color: '#b0e1ff', marginBottom: 8 }}>Avg. Time to Hire</div>
                  <Progress percent={62} strokeColor="#52c41a" trailColor="#23263a" strokeWidth={14} style={{ marginBottom: 12 }} />
                  <Text style={{ color: '#fff', fontWeight: 700 }}>21 days</Text>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ fontWeight: 600, color: '#b0e1ff', marginBottom: 8 }}>Offer Acceptance Rate</div>
                  <Progress percent={91} strokeColor="#faad14" trailColor="#23263a" strokeWidth={14} style={{ marginBottom: 12 }} />
                  <Text style={{ color: '#fff', fontWeight: 700 }}>91%</Text>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
