import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Progress, List, Modal } from 'antd';
import { FileTextOutlined, CheckCircleTwoTone, BarChartOutlined, CloudUploadOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Removed static recentResumes, will use state

const tips = [
  'Use keywords from the job description.',
  'Keep formatting clean and consistent.',
  'Highlight measurable achievements.',
  'Tailor your resume for each application.',
];

import MyAccount from './MyAccount';

// import UploadResume from './UploadResume';

const Dashboard = ({ loggedInUser, setLoggedInUser, token }) => {
  const navigate = useNavigate();
  const [accountModal, setAccountModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentResumes, setRecentResumes] = useState([]);

  // Fetch resumes from backend
  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/resumes', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setRecentResumes(data.resumes || []);
      } else {
        setRecentResumes([]);
      }
    } catch (err) {
      setRecentResumes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Only fetch resumes if user is logged in and token exists
    // No localStorage: only fetch if token is available (should be passed as prop)
    if (!loggedInUser) {
      setLoading(true);
      const timeout = setTimeout(() => {
        if (!loggedInUser) navigate('/', { replace: true });
        setLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      fetchResumes();
    }
    // eslint-disable-next-line
  }, [loggedInUser]);

  const handleLogout = () => {
    if (setLoggedInUser) setLoggedInUser(null);
    // No localStorage: nothing to remove
    navigate('/');
  };

  // Show email verification alert if not verified

  const isVerified = loggedInUser && typeof loggedInUser === 'object' ? loggedInUser.isVerified : false;

  if (loading) return <div style={{ textAlign: 'center', marginTop: 64 }}>Loading your account...</div>;
  if (!loggedInUser || typeof loggedInUser !== 'object') return null;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 0', position: 'relative' }}>
      {/* Admin Button for Admins - now on the left */}
      {loggedInUser && loggedInUser.role === 'admin' && (
        <Button
          type="primary"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, borderRadius: 18, fontWeight: 700, marginBottom: 16 }}
          onClick={() => navigate('/admin')}
        >
          Admin
        </Button>
      )}
      {/* My Account Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" onClick={() => setAccountModal(true)}>
          My Account
        </Button>
      </div>
      <Modal
        open={accountModal}
        onCancel={() => setAccountModal(false)}
        footer={null}
        centered
        width={520}
        destroyOnHidden={true}
        styles={{ body: { padding: 0, background: 'transparent' } }}
      >
        <MyAccount user={loggedInUser} />
      </Modal>
      {/* Email verification removed: all users are now verified by default */}
      <Row gutter={[32, 32]}>
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: 16, marginBottom: 32 }}>
            <Row align="middle" gutter={24}>
              <Col>
                <FileTextOutlined style={{ fontSize: 48, color: '#246bfd' }} />
              </Col>
              <Col flex="auto">
                <Title level={3} style={{ margin: 0 }}>
                  {loggedInUser && (loggedInUser.firstName || loggedInUser.lastName)
                    ? `Welcome back, ${[loggedInUser.firstName, loggedInUser.lastName].filter(Boolean).join(' ').trim()}!`
                    : loggedInUser && loggedInUser.email
                    ? `Welcome back, ${loggedInUser.email}!`
                    : 'Welcome back!'}
                </Title>
                <Paragraph style={{ color: '#b0b3c7', margin: 0 }}>
                  Here’s a summary of your resume optimization journey. Upload a new resume or review your recent analyses below.
                </Paragraph>
              </Col>
              <Col>
                {/* <UploadResume onUploadSuccess={fetchResumes} /> */}
              </Col>
            </Row>
          </Card>
        <Card style={{ borderRadius: 16, marginBottom: 32 }}>
          <Title level={4} style={{ marginBottom: 16 }}><BarChartOutlined /> Resume Analytics</Title>
          <Row gutter={32}>
            <Col xs={24} sm={12}>
              <Text strong>Total Resumes Analyzed</Text>
              <Title level={2} style={{ margin: 0, color: '#246bfd' }}>{recentResumes.length}</Title>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong>Average Score</Text>
              <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
                {recentResumes.length > 0 ? Math.round(recentResumes.filter(r => typeof r.score === 'number').reduce((sum, r) => sum + r.score, 0) / recentResumes.filter(r => typeof r.score === 'number').length) : 'N/A'}%
              </Title>
            </Col>
          </Row>
          <div style={{ marginTop: 24 }}>
            <Text strong>Latest Resume Score</Text>
            <Progress 
              percent={recentResumes.length > 0 && typeof recentResumes[0].score === 'number' ? recentResumes[0].score : 0}
              status="active"
              strokeColor="#246bfd"
              style={{ maxWidth: 320 }}
            />
          </div>
        </Card>
        <Card style={{ borderRadius: 16 }}>
          <Title level={4} style={{ marginBottom: 16 }}><CheckCircleTwoTone twoToneColor="#52c41a" /> Recent Resumes</Title>
          <List
            itemLayout="horizontal"
            dataSource={Array.isArray(recentResumes) ? recentResumes : []}
            locale={{ emptyText: 'No resumes uploaded yet.' }}
            renderItem={item => (
              <List.Item actions={[<Button size="small" type="link">View Report</Button>]}> 
                <List.Item.Meta
                  title={<span style={{ color: '#246bfd' }}>{item?.name || 'Resume'}</span>}
                  description={<span style={{ color: '#b0b3c7' }}>{item?.date ? new Date(item.date).toLocaleDateString() : 'Unknown date'} &nbsp;|&nbsp; Score: <b>{item?.score ?? 'N/A'}</b> &nbsp;|&nbsp; Status: <b>{item?.status || 'N/A'}</b></span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card style={{ borderRadius: 16, marginBottom: 32 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Calendar</Title>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Calendar
              tileClassName={({ date, view }) => {
                // Example: highlight today
                const today = new Date();
                if (
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear()
                ) {
                  return 'react-calendar-today-highlight';
                }
                return null;
              }}
            />
          </div>
        </Card>
        <Card style={{ borderRadius: 16, marginBottom: 32 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Quick Tips</Title>
          <List
            dataSource={tips}
            renderItem={tip => (
              <List.Item>
                <Text style={{ color: '#246bfd' }}>•</Text> <span style={{ color: '#b0b3c7' }}>{tip}</span>
              </List.Item>
            )}
          />
        </Card>
        <Card style={{ borderRadius: 16 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Account</Title>
          {/* Optionally show name if you have it, else just email */}
          {/* <Text strong>Name:</Text> <Text>{loggedInUser ? loggedInUser.split('@')[0] : ''}</Text><br /> */}
          <Text strong>Email:</Text> <Text>{loggedInUser?.email || 'Not logged in'}</Text><br />
          <Button
            type="default"
            style={{ marginTop: 16 }}
            onClick={handleLogout}
            disabled={!loggedInUser}
          >
            Logout
          </Button>
        </Card>
      </Col>
    </Row>
  <style>{`
    /* Calendar highlight for today */
    .react-calendar-today-highlight {
      background: linear-gradient(90deg, #246bfd 60%, #52c41a 100%) !important;
      color: #fff !important;
      border-radius: 8px !important;
      font-weight: bold;
      box-shadow: 0 2px 8px #246bfd33;
    }
    .react-calendar {
      border-radius: 12px;
      box-shadow: 0 2px 16px #246bfd22;
      background: #181c2a;
      color: #b0b3c7;
      border: none;
      font-family: 'Segoe UI', Arial, sans-serif;
    }
    .react-calendar__tile--active {
      background: #246bfd !important;
      color: #fff !important;
      border-radius: 8px !important;
    }
    .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
      background: #52c41a33 !important;
      color: #246bfd !important;
      border-radius: 8px !important;
    }
    .react-calendar__navigation button {
      color: #246bfd;
      font-weight: 700;
      font-size: 1.1em;
    }
    .react-calendar__month-view__weekdays {
      color: #b0b3c7;
      font-weight: 600;
    }
  `}</style>
  </div>
  );
}

export default Dashboard;
