import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Typography } from 'antd';

const { Title } = Typography;

const JobsAdmin = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      message.error('Failed to fetch jobs');
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleAddJob = async (values) => {
    setAddLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(values)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add job');
      message.success('Job added successfully');
      setAddModal(false);
      form.resetFields();
      fetchJobs();
    } catch (err) {
      message.error(err.message || 'Could not add job');
    }
    setAddLoading(false);
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Posted', dataIndex: 'postedAt', key: 'postedAt', render: d => d ? new Date(d).toLocaleString() : 'N/A' },
  ];

  return (
    <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: '0 4px 32px #246bfd22', backdropFilter: 'blur(4px)', background: 'rgba(24,28,42,0.98)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ color: '#246bfd', fontWeight: 800, letterSpacing: 1, margin: 0 }}>Job List</Title>
        <Button type="primary" style={{ borderRadius: 16, fontWeight: 700 }} onClick={() => setAddModal(true)}>
          Add Job
        </Button>
      </div>
      <Table
        dataSource={jobs.map(j => ({ ...j, key: j._id }))}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
      <Modal
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        centered
        width={420}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddJob}
          style={{ marginTop: 16 }}
        >
          <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Enter job title' }]}> <Input /> </Form.Item>
          <Form.Item name="company" label="Company" rules={[{ required: true, message: 'Enter company name' }]}> <Input /> </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Enter location' }]}> <Input /> </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Enter job description' }]}> <Input.TextArea rows={3} /> </Form.Item>
          <Button type="primary" htmlType="submit" loading={addLoading} block style={{ marginTop: 8 }}>Add Job</Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default JobsAdmin;
