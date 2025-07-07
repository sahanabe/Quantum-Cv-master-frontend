import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { FileAddOutlined, CheckCircleOutlined, CloudDownloadOutlined, PieChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const steps = [
  {
    icon: <FileAddOutlined style={{ fontSize: 32, color: '#246bfd' }} />,
    title: 'Upload Your Resume',
    desc: 'Easily upload your resume in PDF or DOCX format to get started with your analysis.'
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
    title: 'AI Analysis',
    desc: 'Our AI scans your resume for skills, keywords, formatting, and job alignment.'
  },
  {
    icon: <CloudDownloadOutlined style={{ fontSize: 32, color: '#00bfff' }} />,
    title: 'Get Actionable Feedback',
    desc: 'Receive detailed suggestions to improve your resume and boost your job prospects.'
  },
  {
    icon: <PieChartOutlined style={{ fontSize: 32, color: '#faad14' }} />,
    title: 'Download Optimized Resume',
    desc: 'Apply the feedback and download your optimized resume, ready for applications.'
  },
];

const StepsSection = () => (
  <div style={{ margin: '48px 0' }}>
    <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>How Quantum Cv Lens Works</Title>
    <Row gutter={32} justify="center">
      {steps.map((step, idx) => (
        <Col key={step.title} xs={24} sm={12} md={6} style={{ marginBottom: 24 }}>
          <Card style={{ background: '#181c2a', borderRadius: 12, textAlign: 'center', minHeight: 200 }}>
            <div style={{ marginBottom: 16 }}>{step.icon}</div>
            <Title level={4} style={{ color: '#fff', marginBottom: 8 }}>{step.title}</Title>
            <Text style={{ color: '#b0b3c7' }}>{step.desc}</Text>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default StepsSection;
