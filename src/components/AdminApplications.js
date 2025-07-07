import React, { useEffect, useState } from 'react';
import { Table as AntTable, Card, Typography, Tag, Spin, message, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const statusColors = {
  pending: 'orange',
  approved: 'green',
  rejected: 'red',
};

// `only` prop: 'applications', 'jobs', or 'users' (for conditional rendering)
const AdminApplications = ({ token, only }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);
  const [form] = Form.useForm();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/applications', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) return; // Silently ignore errors
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      // Silently ignore errors
    }
    setLoading(false);
  };

  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      message.error('Could not load jobs');
    }
    setJobsLoading(false);
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) return; // Silently ignore errors
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      // Silently ignore errors
    }
    setUsersLoading(false);
  };

  useEffect(() => { fetchApplications(); fetchJobs(); fetchUsers(); }, [token]);

  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update application');
      message.success(`Application ${status}`);
      fetchApplications();
    } catch (err) {
      message.error('Could not update application');
    }
  };

  const handleAddJob = async (values) => {
    setJobLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed to add job');
      message.success('Job added!');
      setJobModalOpen(false);
      form.resetFields();
      fetchJobs(); // Refresh the jobs list after adding a job
    } catch (err) {
      message.error('Could not add job');
    }
    setJobLoading(false);
  };

  const columns = [
    { title: 'Applicant', dataIndex: 'userName', key: 'userName', render: v => v || 'N/A' },
    { title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (v, record) => (record.jobId && record.jobId.title) ? record.jobId.title : (v || 'N/A')
    },
    { title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (v, record) => (record.jobId && record.jobId.company) ? record.jobId.company : 'N/A'
    },
    { title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (v, record) => (record.jobId && record.jobId.location) ? record.jobId.location : 'N/A'
    },
    { title: 'CV', dataIndex: 'cvPath', key: 'cvPath', render: path => path ? <a href={`/${path}`} target="_blank" rel="noopener noreferrer">Download</a> : 'N/A' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColors[s] || 'default'}>{s || 'N/A'}</Tag> },
    { title: 'Applied At', dataIndex: 'appliedAt', key: 'appliedAt', render: d => d ? new Date(d).toLocaleString() : 'N/A' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => record && record.status === 'pending' && (
        <>
          <Popconfirm title="Approve this application?" onConfirm={() => handleStatus(record._id, 'approved')} okText="Approve">
            <Button type="primary" size="small" style={{ marginRight: 8 }}>Approve</Button>
          </Popconfirm>
          <Popconfirm title="Reject this application?" onConfirm={() => handleStatus(record._id, 'rejected')} okText="Reject">
            <Button danger size="small">Reject</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  const jobColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Posted At', dataIndex: 'postedAt', key: 'postedAt', render: d => d ? new Date(d).toLocaleString() : 'N/A' },
  ];

  const userColumns = [
    { title: 'Role', dataIndex: 'role', key: 'role', render: v => <Tag color={v === 'admin' ? 'geekblue' : 'gold'}>{v || 'N/A'}</Tag> },
    { title: 'Verified', dataIndex: 'isVerified', key: 'isVerified', render: v => v ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag> },
    { title: 'Registered', dataIndex: 'createdAt', key: 'registered', render: v => v ? new Date(v).toLocaleString() : 'N/A' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => handleDeleteUser(record._id)}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      )
    }
  ];

  const applicationColumns = [
    { title: 'Applicant', dataIndex: 'user', key: 'user', render: u => u ? `${u.firstName || ''} ${u.lastName || ''}`.trim() : 'N/A' },
    { title: 'Email', dataIndex: 'user', key: 'userEmail', render: u => u?.email || 'N/A' },
    { title: 'Role', dataIndex: 'user', key: 'userRole', render: u => u?.role ? <Tag color={u.role === 'admin' ? 'geekblue' : 'gold'}>{u.role}</Tag> : 'N/A' },
    { title: 'Verified', dataIndex: 'user', key: 'userVerified', render: u => u?.isVerified ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag> },
    { title: 'Registered', dataIndex: 'user', key: 'userRegistered', render: u => u?.createdAt ? new Date(u.createdAt).toLocaleString() : 'N/A' },
    { title: 'Job Title', dataIndex: 'jobId', key: 'jobTitle', render: j => j?.title || 'N/A' },
    { title: 'Company', dataIndex: 'jobId', key: 'jobCompany', render: j => j?.company || 'N/A' },
    { title: 'Location', dataIndex: 'jobId', key: 'jobLocation', render: j => j?.location || 'N/A' },
    { title: 'CV', dataIndex: 'cvPath', key: 'cvPath', render: path => path ? <a href={`/${path}`} target="_blank" rel="noopener noreferrer">Download</a> : 'N/A' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColors[s] || 'default'}>{s || 'N/A'}</Tag> },
    { title: 'Applied At', dataIndex: 'appliedAt', key: 'appliedAt', render: d => d ? new Date(d).toLocaleString() : 'N/A' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => record && record.status === 'pending' && (
        <>
          <Popconfirm title="Approve this application?" onConfirm={() => handleStatus(record._id, 'approved')} okText="Approve">
            <Button type="primary" size="small" style={{ marginRight: 8 }}>Approve</Button>
          </Popconfirm>
          <Popconfirm title="Reject this application?" onConfirm={() => handleStatus(record._id, 'rejected')} okText="Reject">
            <Button danger size="small">Reject</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  // Only show the section requested by the `only` prop
  if (only === 'applications') {
    return (
      <Card style={{ borderRadius: 16, marginTop: 32, boxShadow: '0 4px 32px #246bfd22' }}>
        <Title level={2} style={{ marginBottom: 24, color: '#246bfd' }}>Job Applications</Title>
        {loading ? <Spin /> : (
          <AntTable
            dataSource={applications.map(a => ({ ...a, key: a._id }))}
            columns={applicationColumns}
            pagination={{ pageSize: 10 }}
            bordered
            rowClassName={() => 'ant-table-row-striped'}
          />
        )}
      </Card>
    );
  }
  if (only === 'jobs') {
    return (
      <Card style={{ borderRadius: 16, marginTop: 32, boxShadow: '0 4px 32px #246bfd22' }}>
        <Title level={3} style={{ marginBottom: 16, color: '#246bfd' }}>Job List</Title>
        {jobsLoading ? <Spin /> : (
          <AntTable
            dataSource={jobs.map(j => ({ ...j, key: j._id }))}
            columns={jobColumns}
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>
    );
  }
  if (only === 'users') {
    return (
      <Card style={{ borderRadius: 16, marginTop: 32, boxShadow: '0 4px 32px #246bfd22' }}>
        <Title level={3} style={{ marginBottom: 16, color: '#246bfd' }}>Registered Users</Title>
        {usersLoading ? <Spin /> : (
          <AntTable
            dataSource={users.map(u => ({ ...u, key: u._id }))}
            columns={userColumns}
            pagination={{ pageSize: 10 }}
            bordered
            rowClassName={() => 'ant-table-row-striped'}
          />
        )}
      </Card>
    );
  }
  // Default: show all (legacy, not used in new AdminPage)
  return null;
};

export default AdminApplications;
