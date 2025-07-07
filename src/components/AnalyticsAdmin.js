import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Statistic, Spin } from 'antd';
import { UserOutlined, FileTextOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AnalyticsAdmin = ({ token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Example: Replace with your real analytics API endpoint
        const res = await fetch('http://localhost:5000/api/admin/analytics', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setStats(null);
      }
      setLoading(false);
    };
    fetchStats();
  }, [token]);

  if (loading) return <Spin style={{ margin: 48 }} size="large" />;

  return (
    <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: '0 4px 32px #246bfd22', backdropFilter: 'blur(4px)', background: 'rgba(24,28,42,0.98)' }}>
      <Title level={2} style={{ color: '#246bfd', fontWeight: 800, letterSpacing: 1, marginBottom: 32 }}>Site Analytics</Title>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12} lg={6}>
          <Statistic title="Total Users" value={stats?.totalUsers ?? 0} prefix={<UserOutlined />} valueStyle={{ color: '#246bfd', fontWeight: 700 }} />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Statistic title="Total Jobs" value={stats?.totalJobs ?? 0} prefix={<TeamOutlined />} valueStyle={{ color: '#52c41a', fontWeight: 700 }} />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Statistic title="Total Applications" value={stats?.totalApplications ?? 0} prefix={<FileTextOutlined />} valueStyle={{ color: '#ff7875', fontWeight: 700 }} />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Statistic title="Active Sessions" value={stats?.activeSessions ?? 0} prefix={<BarChartOutlined />} valueStyle={{ color: '#faad14', fontWeight: 700 }} />
        </Col>
      </Row>
      {/* Add more analytics here as needed */}
    </Card>
  );
};

export default AnalyticsAdmin;
