import React, { useState } from 'react';
import { Card, Button, Typography, Row, Col, Divider, Tag, Space, Alert, Input, Select, Switch, message } from 'antd';
import { 
  ApiOutlined, 
  CodeOutlined, 
  KeyOutlined, 
  SafetyCertificateOutlined,
  RocketOutlined,
  DatabaseOutlined,
  CloudOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CopyOutlined,
  PlayCircleOutlined,
  BookOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  SettingOutlined,
  MonitorOutlined,
  BarChartOutlined,
  SyncOutlined
} from '@ant-design/icons';
import './ApiIntegration.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const ApiIntegration = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('resume-analysis');
  const [apiKey, setApiKey] = useState('sk_quantum_cv_1234567890abcdef');
  const [responseFormat, setResponseFormat] = useState('json');
  const [showApiKey, setShowApiKey] = useState(false);

  const endpoints = [
    {
      key: 'resume-analysis',
      name: 'Resume Analysis',
      method: 'POST',
      path: '/api/v1/resume/analyze',
      description: 'Analyze resume content and provide insights',
      color: '#4ECDC4'
    },
    {
      key: 'job-matching',
      name: 'Job Matching',
      method: 'POST',
      path: '/api/v1/jobs/match',
      description: 'Match resume with job opportunities',
      color: '#FF6B6B'
    },
    {
      key: 'career-insights',
      name: 'Career Insights',
      method: 'GET',
      path: '/api/v1/career/insights',
      description: 'Get career development recommendations',
      color: '#45B7D1'
    },
    {
      key: 'skill-analysis',
      name: 'Skill Analysis',
      method: 'POST',
      path: '/api/v1/skills/analyze',
      description: 'Analyze and categorize skills from resume',
      color: '#FFA726'
    },
    {
      key: 'interview-prep',
      name: 'Interview Preparation',
      method: 'POST',
      path: '/api/v1/interview/prepare',
      description: 'Generate interview questions and tips',
      color: '#AB47BC'
    },
    {
      key: 'bulk-processing',
      name: 'Bulk Processing',
      method: 'POST',
      path: '/api/v1/bulk/process',
      description: 'Process multiple resumes in batch',
      color: '#26A69A'
    }
  ];

  const features = [
    {
      icon: <RocketOutlined />,
      title: 'Lightning Fast',
      description: 'Sub-second response times with our optimized infrastructure',
      color: '#FF6B6B'
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: 'Enterprise Security',
      description: 'SOC 2 Type II certified with end-to-end encryption',
      color: '#4ECDC4'
    },
    {
      icon: <GlobalOutlined />,
      title: 'Global CDN',
      description: '99.9% uptime with servers across 6 continents',
      color: '#45B7D1'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Real-time Analytics',
      description: 'Monitor usage, performance, and insights in real-time',
      color: '#FFA726'
    },
    {
      icon: <TeamOutlined />,
      title: '24/7 Support',
      description: 'Expert technical support available around the clock',
      color: '#AB47BC'
    },
    {
      icon: <SyncOutlined />,
      title: 'Auto-scaling',
      description: 'Handles traffic spikes automatically without downtime',
      color: '#26A69A'
    }
  ];

  const codeExamples = {
    'resume-analysis': {
      curl: `curl -X POST https://api.quantumcv.com/v1/resume/analyze \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "resume_text": "Your resume content here...",
    "job_title": "Software Engineer",
    "industry": "Technology"
  }'`,
      javascript: `const response = await fetch('https://api.quantumcv.com/v1/resume/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    resume_text: 'Your resume content here...',
    job_title: 'Software Engineer',
    industry: 'Technology'
  })
});

const data = await response.json();
console.log(data);`,
      python: `import requests

url = "https://api.quantumcv.com/v1/resume/analyze"
headers = {
    "Authorization": f"Bearer {apiKey}",
    "Content-Type": "application/json"
}
data = {
    "resume_text": "Your resume content here...",
    "job_title": "Software Engineer",
    "industry": "Technology"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  const testEndpoint = () => {
    message.loading('Testing endpoint...', 2).then(() => {
      message.success('Endpoint test successful!');
    });
  };

  return (
    <div className="api-integration-bg">
      <div className="api-integration-container">
        {/* Hero Section */}
        <div className="api-hero">
          <Title level={1} className="api-hero-title">
            API Integration
          </Title>
          <Paragraph className="api-hero-subtitle">
            Seamlessly integrate Quantum CV's AI-powered resume analysis into your applications
          </Paragraph>
          <Space size="large" className="api-hero-stats">
            <div className="stat-item">
              <Text className="stat-number">99.9%</Text>
              <Text className="stat-label">Uptime</Text>
            </div>
            <div className="stat-item">
              <Text className="stat-number">&lt;200ms</Text>
              <Text className="stat-label">Response Time</Text>
            </div>
            <div className="stat-item">
              <Text className="stat-number">10M+</Text>
              <Text className="stat-label">API Calls</Text>
            </div>
          </Space>
        </div>

        {/* Features Grid */}
        <Row gutter={[24, 24]} className="features-section">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="feature-card glass-card">
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <Title level={4} className="feature-title">
                  {feature.title}
                </Title>
                <Paragraph className="feature-description">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* API Key Section */}
        <Card className="api-key-section glass-card" variant="borderless">
          <Title level={3}>
            <KeyOutlined /> Your API Key
          </Title>
          <Paragraph>
            Use this API key to authenticate your requests. Keep it secure and never expose it in client-side code.
          </Paragraph>
          <div className="api-key-display">
            <Input.Password
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="api-key-input"
              addonBefore={<KeyOutlined />}
              addonAfter={
                <Button 
                  type="text" 
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(apiKey)}
                />
              }
            />
          </div>
          <Alert
            message="Security Notice"
            description="This is a demo API key. For production use, generate a new key from your dashboard."
            type="warning"
            showIcon
            className="security-alert"
          />
        </Card>

        {/* Endpoints Section */}
        <div className="endpoints-section">
          <Title level={3}>
            <ApiOutlined /> Available Endpoints
          </Title>
          <Row gutter={[16, 16]}>
            {endpoints.map((endpoint) => (
              <Col xs={24} sm={12} lg={8} key={endpoint.key}>
                <Card 
                  className={`endpoint-card glass-card ${selectedEndpoint === endpoint.key ? 'selected' : ''}`}
                  onClick={() => setSelectedEndpoint(endpoint.key)}
                >
                  <div className="endpoint-header">
                    <Tag color={endpoint.color} className="method-tag">
                      {endpoint.method}
                    </Tag>
                    <Title level={5} className="endpoint-name">
                      {endpoint.name}
                    </Title>
                  </div>
                  <Paragraph className="endpoint-path">
                    <CodeOutlined /> {endpoint.path}
                  </Paragraph>
                  <Paragraph className="endpoint-description">
                    {endpoint.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Code Examples */}
        <Card className="code-examples-section glass-card" variant="borderless">
          <Title level={3}>
            <CodeOutlined /> Code Examples
          </Title>
          <Paragraph>
            Here's how to use the {endpoints.find(e => e.key === selectedEndpoint)?.name} endpoint:
          </Paragraph>
          
          <div className="code-tabs">
            <Space className="code-tab-buttons">
              <Button 
                type={responseFormat === 'curl' ? 'primary' : 'default'}
                onClick={() => setResponseFormat('curl')}
              >
                cURL
              </Button>
              <Button 
                type={responseFormat === 'javascript' ? 'primary' : 'default'}
                onClick={() => setResponseFormat('javascript')}
              >
                JavaScript
              </Button>
              <Button 
                type={responseFormat === 'python' ? 'primary' : 'default'}
                onClick={() => setResponseFormat('python')}
              >
                Python
              </Button>
            </Space>
            
            <div className="code-block">
              <div className="code-header">
                <Text className="code-language">{responseFormat.toUpperCase()}</Text>
                <Space>
                  <Button 
                    type="text" 
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(codeExamples[selectedEndpoint]?.[responseFormat] || '')}
                  >
                    Copy
                  </Button>
                  <Button 
                    type="text" 
                    icon={<PlayCircleOutlined />}
                    onClick={testEndpoint}
                  >
                    Test
                  </Button>
                </Space>
              </div>
              <pre className="code-content">
                <code>{codeExamples[selectedEndpoint]?.[responseFormat] || 'Example not available'}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Documentation Links */}
        <Row gutter={[24, 24]} className="documentation-section">
          <Col xs={24} md={8}>
            <Card className="doc-card glass-card">
              <BookOutlined className="doc-icon" />
              <Title level={4}>API Documentation</Title>
              <Paragraph>
                Complete API reference with all endpoints, parameters, and response formats.
              </Paragraph>
              <Button type="primary" block>
                View Documentation
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="doc-card glass-card">
              <SettingOutlined className="doc-icon" />
              <Title level={4}>SDK & Libraries</Title>
              <Paragraph>
                Official SDKs for JavaScript, Python, Java, and other popular languages.
              </Paragraph>
              <Button type="primary" block>
                Download SDKs
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="doc-card glass-card">
              <MonitorOutlined className="doc-icon" />
              <Title level={4}>API Dashboard</Title>
              <Paragraph>
                Monitor your API usage, view analytics, and manage your integration settings.
              </Paragraph>
              <Button type="primary" block>
                Open Dashboard
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Pricing Section */}
        <Card className="pricing-section glass-card" variant="borderless">
          <Title level={3}>
            <ThunderboltOutlined /> Simple Pricing
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="pricing-card">
                <Title level={4}>Starter</Title>
                <div className="price">$29<span>/month</span></div>
                <ul className="pricing-features">
                  <li>1,000 API calls/month</li>
                  <li>Basic endpoints</li>
                  <li>Email support</li>
                  <li>Standard response time</li>
                </ul>
                <Button type="primary" block>
                  Get Started
                </Button>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="pricing-card featured">
                <div className="featured-badge">Most Popular</div>
                <Title level={4}>Professional</Title>
                <div className="price">$99<span>/month</span></div>
                <ul className="pricing-features">
                  <li>10,000 API calls/month</li>
                  <li>All endpoints</li>
                  <li>Priority support</li>
                  <li>Faster response time</li>
                  <li>Custom integrations</li>
                </ul>
                <Button type="primary" block>
                  Choose Professional
                </Button>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="pricing-card">
                <Title level={4}>Enterprise</Title>
                <div className="price">Custom</div>
                <ul className="pricing-features">
                  <li>Unlimited API calls</li>
                  <li>All endpoints + custom</li>
                  <li>24/7 dedicated support</li>
                  <li>Custom SLAs</li>
                  <li>On-premise options</li>
                </ul>
                <Button type="primary" block>
                  Contact Sales
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ApiIntegration; 