import React from 'react';
import { Card, Row, Col, Typography, Button, Tag, Tooltip } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { ThunderboltOutlined, BarChartOutlined, RiseOutlined, DownloadOutlined, BulbOutlined } from '@ant-design/icons';
import './AdvancedAnalytics.css';

const { Title, Text } = Typography;

// Mock Data
const resumeScores = [
  { date: 'Jan', score: 62 },
  { date: 'Feb', score: 70 },
  { date: 'Mar', score: 75 },
  { date: 'Apr', score: 80 },
  { date: 'May', score: 85 },
  { date: 'Jun', score: 90 },
];

const skillDistribution = [
  { name: 'Python', value: 30 },
  { name: 'React', value: 25 },
  { name: 'SQL', value: 20 },
  { name: 'Leadership', value: 15 },
  { name: 'Communication', value: 10 },
];

const COLORS = ['#4ECDC4', '#FF6B6B', '#45B7D1', '#FFD166', '#A259F7'];

const aiInsights = [
  {
    icon: <BulbOutlined style={{ color: '#FFD166', fontSize: 24 }} />,
    title: 'Add Python to Skills',
    description: 'Adding Python to your skills could increase your ATS score by 12%.',
  },
  {
    icon: <BulbOutlined style={{ color: '#4ECDC4', fontSize: 24 }} />,
    title: 'Improve Resume Formatting',
    description: 'Optimizing your resume formatting can boost readability and ATS compatibility.',
  },
  {
    icon: <BulbOutlined style={{ color: '#FF6B6B', fontSize: 24 }} />,
    title: 'Highlight Leadership',
    description: 'Showcasing leadership experience can improve your interview rate.',
  },
];

const industryComparison = [
  { name: 'You', score: 90 },
  { name: 'Industry Avg', score: 75 },
  { name: 'Top 10%', score: 95 },
];

export default function AdvancedAnalytics() {
  return (
    <div className="advanced-analytics-bg">
      <div className="advanced-analytics-container">
        {/* Hero Section */}
        <div className="analytics-hero">
          <Title level={1} className="gradient-text" style={{ marginBottom: 0 }}>Advanced Analytics</Title>
          <Text className="analytics-subtitle">
            Unlock deep insights into your resume and job search performance
          </Text>
        </div>

        {/* Key Metrics */}
        <Row gutter={[24, 24]} justify="center" style={{ marginTop: 32 }}>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass-card analytics-metric-card" variant="borderless">
              <BarChartOutlined style={{ fontSize: 32, color: '#4ECDC4' }} />
              <Title level={3} style={{ margin: '12px 0 0 0' }}>6</Title>
              <Text>Total Resumes Analyzed</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass-card analytics-metric-card" variant="borderless">
              <RiseOutlined style={{ fontSize: 32, color: '#FF6B6B' }} />
              <Title level={3} style={{ margin: '12px 0 0 0' }}>90</Title>
              <Text>Best ATS Score</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass-card analytics-metric-card" variant="borderless">
              <ThunderboltOutlined style={{ fontSize: 32, color: '#FFD166' }} />
              <Title level={3} style={{ margin: '12px 0 0 0' }}>4</Title>
              <Text>Top Skills Detected</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass-card analytics-metric-card" variant="borderless">
              <BarChartOutlined style={{ fontSize: 32, color: '#A259F7' }} />
              <Title level={3} style={{ margin: '12px 0 0 0' }}>67%</Title>
              <Text>Interview Rate</Text>
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
          <Col xs={24} md={16}>
            <Card className="glass-card analytics-chart-card" variant="borderless">
              <Title level={4} style={{ marginBottom: 16 }}>Resume Score Over Time</Title>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={resumeScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#23263a" />
                  <XAxis dataKey="date" stroke="#fff" />
                  <YAxis stroke="#fff" domain={[50, 100]} />
                  <RechartsTooltip contentStyle={{ background: '#181c2a', border: 'none', color: '#fff' }} />
                  <Line type="monotone" dataKey="score" stroke="#4ECDC4" strokeWidth={3} dot={{ r: 6, fill: '#FF6B6B' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="glass-card analytics-chart-card" variant="borderless">
              <Title level={4} style={{ marginBottom: 16 }}>Skill Distribution</Title>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={skillDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* AI Insights Section */}
        <div style={{ marginTop: 48 }}>
          <Title level={3} className="gradient-text">AI Insights</Title>
          <Row gutter={[24, 24]}>
            {aiInsights.map((insight, idx) => (
              <Col xs={24} md={8} key={idx}>
                <Card className="glass-card analytics-insight-card" variant="borderless">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {insight.icon}
                    <div>
                      <Text strong style={{ fontSize: 16 }}>{insight.title}</Text>
                      <div style={{ color: '#fff', marginTop: 4 }}>{insight.description}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Comparison Panel */}
        <div style={{ marginTop: 48 }}>
          <Title level={3} className="gradient-text">Compare to Industry</Title>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={industryComparison} margin={{ top: 16, right: 32, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#23263a" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" domain={[60, 100]} />
              <RechartsTooltip contentStyle={{ background: '#181c2a', border: 'none', color: '#fff' }} />
              <Bar dataKey="score" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', margin: '56px 0 24px 0' }}>
          <Tooltip title="Let AI optimize your resume for you!">
            <Button type="primary" size="large" icon={<ThunderboltOutlined />} style={{ marginRight: 16, background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)', border: 'none' }}>
              Optimize My Resume
            </Button>
          </Tooltip>
          <Tooltip title="Download your full analytics report as PDF">
            <Button size="large" icon={<DownloadOutlined />}>
              Download Full Report
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
} 