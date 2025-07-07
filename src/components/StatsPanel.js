import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;


const stats = [
  { label: 'Total Resumes Analyzed', value: '100,000+', color: '#00bfff' },
  { label: 'Optimized for ATS', value: '98%', color: '#52c41a' },
  { label: 'Average Score Improvement', value: '+35%', color: '#faad14' },
  { label: 'Supported Job Roles', value: '500+', color: '#ff4d4f' },
];

const StatsPanel = () => (
  <Card style={{ margin: '32px 0', background: '#181c2a', borderRadius: 16, boxShadow: '0 2px 16px #0002' }}>
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <Text style={{ color: '#b0b3c7', fontSize: 16 }}>Quantum Cv Lens At a Glance</Text>
      <Title level={2} style={{ color: '#fff', margin: 0 }}>AI-Powered Resume Insights — Quantum Cv Lens</Title>
    </div>
    <Row gutter={32} justify="center">
      {stats.map((stat) => (
        <Col key={stat.label} xs={12} sm={6} style={{ textAlign: 'center', marginBottom: 16 }}>
          <Title level={4} style={{ color: stat.color, marginBottom: 0 }}>{stat.value}</Title>
          <Text style={{ color: '#b0b3c7', fontSize: 15 }}>{stat.label}</Text>
        </Col>
      ))}
    </Row>
  </Card>
);

export default StatsPanel;
