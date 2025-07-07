import React, { useEffect, useState } from 'react';
import { Table, Card, Typography, Tag, Spin, message, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { CrownFilled, ThunderboltFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import MyAccount from './MyAccount';
import AdminApplications from './AdminApplications';
import Sidebar from './Sidebar';
import JobsAdmin from './JobsAdmin';
import AnalyticsAdmin from './AnalyticsAdmin';
import UserResumesPanel from './UserResumesPanel';
import AllUserResumesPanel from './AllUserResumesPanel';

const { Title } = Typography;



const AdminPage = ({ token, loggedInUser, setLoggedInUser, setToken }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountModal, setAccountModal] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedSection, setSelectedSection] = useState('users');
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  // Logout logic (same as Navbar)
  const handleLogout = () => {
    setLogoutConfirm(true);
  };
  const confirmLogout = () => {
    if (typeof setLoggedInUser === 'function') setLoggedInUser(null);
    if (typeof setToken === 'function') setToken(null);
    setLogoutConfirm(false);
    navigate('/');
  };

  // Get admin user info from localStorage
  useEffect(() => {
    // No localStorage: must pass user as prop or context
    setAdminUser(null);
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Use token from props
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: (token ? { Authorization: `Bearer ${token}` } : {})
      });
      if (!res.ok) return; // Silently ignore errors
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      // Silently ignore errors
    }
    setLoading(false);
  };
  useEffect(() => { fetchUsers(); }, [token]);

  // Optional: Friendly feedback when switching sections
  useEffect(() => {
    if (selectedSection === 'users') message.info('Viewing all registered users.');
    if (selectedSection === 'applications') message.info('Viewing applications.');
    if (selectedSection === 'jobs') message.info('Viewing job postings.');
    if (selectedSection === 'analytics') message.info('Viewing analytics dashboard.');
  }, [selectedSection]);

  const handleDelete = async (userId) => {
    if (!token) return message.error('No admin token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete user');
      message.success('User deleted');
      fetchUsers();
    } catch (err) {
      message.error('Could not delete user');
    }
  };

  const handleAddAdmin = async (values) => {
    setAddAdminLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ ...values, role: 'admin' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add admin');
      message.success('Admin created successfully');
      setAddAdminModal(false);
      form.resetFields();
      fetchUsers();
    } catch (err) {
      message.error(err.message || 'Could not add admin');
    }
    setAddAdminLoading(false);
  };

  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName', render: v => v || 'N/A' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName', render: v => v || 'N/A' },
    { title: 'Email', dataIndex: 'email', key: 'email', render: v => v || 'N/A' },
    { title: 'Role', dataIndex: 'role', key: 'role', render: role => <Tag color={role === 'admin' ? 'volcano' : 'blue'}>{role || 'N/A'}</Tag> },
    { title: 'Verified', dataIndex: 'isVerified', key: 'isVerified', render: v => v ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag> },
    { title: 'Registered', dataIndex: 'createdAt', key: 'createdAt', render: d => d ? new Date(d).toLocaleString() : 'N/A' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record?._id)} okText="Delete" cancelText="Cancel">
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #101522 60%, #246bfd 100%)', position: 'relative' }}>
      <Sidebar selectedKey={selectedSection} onSelect={setSelectedSection} />
      <div style={{ flex: 1, minHeight: '100vh', padding: 0, position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(90deg, #23263a 60%, #246bfd33 100%)',
          borderRadius: '0 0 32px 32px',
          boxShadow: '0 8px 48px #246bfd33',
          padding: '48px 48px 32px 48px',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div style={{ fontSize: 64, color: '#ffe066', filter: 'drop-shadow(0 2px 16px #246bfd88)' }}>
          <CrownFilled spin />
        </div>
        <div style={{ flex: 1 }}>
          <Title level={1} style={{ color: '#fff', marginBottom: 0, fontWeight: 900, letterSpacing: 1, fontSize: 38 }}>
            Welcome, Admin!
            <ThunderboltFilled style={{ color: '#52c41a', marginLeft: 16, fontSize: 32, verticalAlign: 'middle' }} />
          </Title>
          <div style={{ color: '#b0e1ff', fontSize: 20, marginTop: 8, fontWeight: 500 }}>
            Manage users, applications, and jobs with superpowers.<br/>
            <span style={{ color: '#ffe066', fontSize: 18 }}>If you need help, just ask the chatbot in the corner!</span>
          </div>
        </div>
          <div style={{ position: 'absolute', right: 32, top: 32, opacity: 0.12, fontSize: 180, pointerEvents: 'none' }}>
            <ThunderboltFilled />
          </div>
        </div>

        {/* Top right controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginBottom: 24, paddingRight: 48 }}>
          <Button
            type="primary"
            style={{ borderRadius: 18, fontWeight: 700, paddingLeft: 24, paddingRight: 24 }}
            onClick={() => setAddAdminModal(true)}
            hidden={selectedSection !== 'users'}
            title="Create a new admin account"
          >
            Add Admin
          </Button>
          <Button
            onClick={() => setAccountModal(true)}
            type="default"
            style={{ borderRadius: 18, fontWeight: 700 }}
            title="View your account details"
          >
            My Account
          </Button>
          <Button
            onClick={handleLogout}
            type="primary"
            danger
            style={{ borderRadius: 18, fontWeight: 700 }}
            title="Log out of the admin dashboard"
          >
            Log Out
          </Button>
        </div>
        <Modal
          open={logoutConfirm}
          onCancel={() => setLogoutConfirm(false)}
          onOk={confirmLogout}
          okText="Log Out"
          cancelText="Cancel"
          centered
          title="Are you sure you want to log out?"
        >
          <p>You'll be logged out of the admin dashboard and returned to the homepage.</p>
        </Modal>
        <Modal
          open={accountModal}
          onCancel={() => setAccountModal(false)}
          footer={null}
          centered
          width={520}
          destroyOnHidden={true}
          styles={{ body: { padding: 0, background: 'transparent' } }}
        >
          <MyAccount user={adminUser || {}} />
        </Modal>
        <Modal
          open={addAdminModal}
          onCancel={() => setAddAdminModal(false)}
          footer={null}
          centered
          width={420}
          destroyOnHidden
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddAdmin}
            style={{ marginTop: 16 }}
          >
            <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Enter first name' }]}> <Input /> </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Enter last name' }]}> <Input /> </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}> <Input /> </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}> <Input.Password /> </Form.Item>
            <Button type="primary" htmlType="submit" loading={addAdminLoading} block style={{ marginTop: 8 }}>Add Admin</Button>
          </Form>
        </Modal>

        {/* Main content area based on sidebar selection */}
        <div style={{ padding: '0 48px 48px 48px' }}>
          {selectedSection === 'users' && (
            <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: '0 4px 32px #246bfd22', backdropFilter: 'blur(4px)', background: 'rgba(24,28,42,0.98)' }}>
              <Title level={2} style={{ marginBottom: 24, color: '#246bfd', fontWeight: 800, letterSpacing: 1 }}>Registered Users</Title>
              {loading ? <Spin /> : (
                <Table
                  dataSource={users.map(u => ({ ...u, key: u._id }))}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                />
              )}
            </Card>
          )}
          {selectedSection === 'applications' && (
            <AdminApplications token={token} only="applications" />
          )}
          {selectedSection === 'jobs' && (
            <JobsAdmin token={token} />
          )}
          {selectedSection === 'analytics' && (
            <AnalyticsAdmin token={token} />
          )}
          {/* Render all user resumes if selectedSection is 'user-resumes' */}
          {selectedSection === 'user-resumes' && (
            <div style={{ padding: 48 }}>
              <Title level={2} style={{ color: '#246bfd', marginBottom: 24 }}>All Uploaded Resumes (All Users)</Title>
              <AllUserResumesPanel token={token} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
