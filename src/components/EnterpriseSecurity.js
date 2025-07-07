import React, { useState } from 'react';
import { Card, Button, Typography, Row, Col, Divider, Tag, Space, Alert, Progress, Switch, message, Timeline, Badge, Statistic, Tabs } from 'antd';
import { 
  SafetyCertificateOutlined,
  LockOutlined,
  EyeOutlined,
  KeyOutlined,
  DatabaseOutlined,
  CloudOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  TeamOutlined,
  SettingOutlined,
  MonitorOutlined,
  BarChartOutlined,
  SyncOutlined,
  AuditOutlined,
  FileProtectOutlined,
  ApiOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import './EnterpriseSecurity.css';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const EnterpriseSecurity = () => {
  const [securityStatus, setSecurityStatus] = useState({
    encryption: true,
    mfa: true,
    audit: true,
    backup: true,
    monitoring: true,
    compliance: true
  });

  const [selectedCompliance, setSelectedCompliance] = useState('soc2');

  const securityMetrics = {
    uptime: 99.99,
    responseTime: 45,
    threatsBlocked: 15420,
    dataBreaches: 0,
    complianceScore: 98.5,
    encryptionStrength: 256
  };

  const complianceFrameworks = [
    {
      key: 'soc2',
      name: 'SOC 2 Type II',
      status: 'Certified',
      color: 'green',
      description: 'Service Organization Control 2 compliance for security, availability, and confidentiality',
      icon: <SafetyCertificateOutlined />
    },
    {
      key: 'gdpr',
      name: 'GDPR',
      status: 'Compliant',
      color: 'blue',
      description: 'General Data Protection Regulation compliance for EU data protection',
      icon: <FileProtectOutlined />
    },
    {
      key: 'hipaa',
      name: 'HIPAA',
      status: 'Compliant',
      color: 'purple',
      description: 'Health Insurance Portability and Accountability Act compliance',
      icon: <UserOutlined />
    },
    {
      key: 'iso27001',
      name: 'ISO 27001',
      status: 'Certified',
      color: 'orange',
      description: 'Information Security Management System certification',
      icon: <SecurityScanOutlined />
    },
    {
      key: 'pci',
      name: 'PCI DSS',
      status: 'Compliant',
      color: 'red',
      description: 'Payment Card Industry Data Security Standard compliance',
      icon: <CreditCardOutlined />
    }
  ];

  const securityFeatures = [
    {
      icon: <LockOutlined />,
      title: 'End-to-End Encryption',
      description: 'AES-256 encryption for data at rest and in transit',
      status: 'Active',
      color: '#4ECDC4'
    },
    {
      icon: <KeyOutlined />,
      title: 'Multi-Factor Authentication',
      description: 'SMS, email, and authenticator app support',
      status: 'Active',
      color: '#FF6B6B'
    },
    {
      icon: <DatabaseOutlined />,
      title: 'Data Residency',
      description: 'Choose your data storage region for compliance',
      status: 'Active',
      color: '#45B7D1'
    },
    {
      icon: <CloudOutlined />,
      title: 'Backup & Recovery',
      description: 'Automated daily backups with 30-day retention',
      status: 'Active',
      color: '#FFA726'
    },
    {
      icon: <MonitorOutlined />,
      title: 'Real-time Monitoring',
      description: '24/7 security monitoring and threat detection',
      status: 'Active',
      color: '#AB47BC'
    },
    {
      icon: <AuditOutlined />,
      title: 'Audit Logs',
      description: 'Comprehensive audit trail for all activities',
      status: 'Active',
      color: '#26A69A'
    }
  ];

  const recentSecurityEvents = [
    {
      time: '2 minutes ago',
      event: 'Login attempt from new device',
      user: 'john.doe@company.com',
      location: 'New York, US',
      status: 'success',
      icon: <CheckCircleOutlined />
    },
    {
      time: '15 minutes ago',
      event: 'API key rotation completed',
      user: 'System',
      location: 'Automated',
      status: 'info',
      icon: <KeyOutlined />
    },
    {
      time: '1 hour ago',
      event: 'Suspicious activity detected',
      user: 'unknown@external.com',
      location: 'Unknown',
      status: 'warning',
      icon: <WarningOutlined />
    },
    {
      time: '3 hours ago',
      event: 'Backup completed successfully',
      user: 'System',
      location: 'Automated',
      status: 'success',
      icon: <CloudOutlined />
    }
  ];

  const securityPolicies = [
    {
      title: 'Password Policy',
      description: 'Minimum 12 characters, uppercase, lowercase, numbers, and special characters',
      status: 'Enforced'
    },
    {
      title: 'Session Timeout',
      description: 'Automatic logout after 30 minutes of inactivity',
      status: 'Enforced'
    },
    {
      title: 'IP Whitelisting',
      description: 'Restrict access to specific IP addresses or ranges',
      status: 'Optional'
    },
    {
      title: 'Data Retention',
      description: 'Automatic deletion of old data after 7 years',
      status: 'Enforced'
    }
  ];

  const toggleSecurityFeature = (feature) => {
    setSecurityStatus(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
    message.success(`${feature} ${!securityStatus[feature] ? 'enabled' : 'disabled'}`);
  };

  const generateSecurityReport = () => {
    message.loading('Generating security report...', 2).then(() => {
      message.success('Security report generated and sent to your email!');
    });
  };

  return (
    <div className="enterprise-security-bg">
      <div className="enterprise-security-container">
        {/* Hero Section */}
        <div className="security-hero">
          <Title level={1} className="security-hero-title">
            <SafetyCertificateOutlined /> Enterprise Security
          </Title>
          <Paragraph className="security-hero-subtitle">
            Military-grade security infrastructure protecting your sensitive data with industry-leading compliance standards
          </Paragraph>
          <Space size="large" className="security-hero-stats">
            <div className="stat-item">
              <Text className="stat-number">{securityMetrics.uptime}%</Text>
              <Text className="stat-label">Uptime</Text>
            </div>
            <div className="stat-item">
              <Text className="stat-number">{securityMetrics.responseTime}ms</Text>
              <Text className="stat-label">Response Time</Text>
            </div>
            <div className="stat-item">
              <Text className="stat-number">{securityMetrics.threatsBlocked.toLocaleString()}</Text>
              <Text className="stat-label">Threats Blocked</Text>
            </div>
            <div className="stat-item">
              <Text className="stat-number">{securityMetrics.dataBreaches}</Text>
              <Text className="stat-label">Data Breaches</Text>
            </div>
          </Space>
        </div>

        {/* Security Status Overview */}
        <Card className="security-overview glass-card" variant="borderless">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Statistic
                title="Compliance Score"
                value={securityMetrics.complianceScore}
                suffix="%"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
              <Progress percent={securityMetrics.complianceScore} showInfo={false} />
            </Col>
            <Col xs={24} md={8}>
              <Statistic
                title="Encryption Strength"
                value={securityMetrics.encryptionStrength}
                suffix="bit"
                prefix={<LockOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
              <Text type="secondary">AES-256 encryption</Text>
            </Col>
            <Col xs={24} md={8}>
              <Statistic
                title="Security Status"
                value="All Systems"
                suffix="Secure"
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
              <Text type="secondary">6/6 features active</Text>
            </Col>
          </Row>
        </Card>

        {/* Security Features Grid */}
        <Row gutter={[24, 24]} className="features-section">
          {securityFeatures.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="feature-card glass-card">
                <div className="feature-header">
                  <div className="feature-icon" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <Tag color="green" className="status-tag">
                    {feature.status}
                  </Tag>
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

        {/* Compliance Section */}
        <Card className="compliance-section glass-card" variant="borderless">
          <Title level={3}>
            <SafetyCertificateOutlined /> Compliance & Certifications
          </Title>
          <Paragraph>
            Quantum CV maintains the highest security standards and compliance certifications in the industry.
          </Paragraph>
          <Row gutter={[16, 16]}>
            {complianceFrameworks.map((framework) => (
              <Col xs={24} sm={12} lg={8} key={framework.key}>
                <Card 
                  className={`compliance-card glass-card ${selectedCompliance === framework.key ? 'selected' : ''}`}
                  onClick={() => setSelectedCompliance(framework.key)}
                >
                  <div className="compliance-header">
                    <div className="compliance-icon" style={{ color: framework.color }}>
                      {framework.icon}
                    </div>
                    <Badge status={framework.color} text={framework.status} />
                  </div>
                  <Title level={4} className="compliance-title">
                    {framework.name}
                  </Title>
                  <Paragraph className="compliance-description">
                    {framework.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Security Monitoring */}
        <Row gutter={[24, 24]} className="monitoring-section">
          <Col xs={24} lg={16}>
            <Card className="events-card glass-card" variant="borderless">
              <Title level={3}>
                <MonitorOutlined /> Recent Security Events
              </Title>
              <Timeline>
                {recentSecurityEvents.map((event, index) => (
                  <Timeline.Item 
                    key={index}
                    dot={event.icon}
                    color={event.status === 'success' ? 'green' : event.status === 'warning' ? 'orange' : 'blue'}
                  >
                    <div className="event-item">
                      <div className="event-header">
                        <Text strong>{event.event}</Text>
                        <Text type="secondary">{event.time}</Text>
                      </div>
                      <div className="event-details">
                        <Text type="secondary">User: {event.user}</Text>
                        <Text type="secondary">Location: {event.location}</Text>
                      </div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card className="policies-card glass-card" variant="borderless">
              <Title level={3}>
                <SettingOutlined /> Security Policies
              </Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                {securityPolicies.map((policy, index) => (
                  <div key={index} className="policy-item">
                    <div className="policy-header">
                      <Text strong>{policy.title}</Text>
                      <Tag color={policy.status === 'Enforced' ? 'green' : 'orange'}>
                        {policy.status}
                      </Tag>
                    </div>
                    <Text type="secondary">{policy.description}</Text>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Security Controls */}
        <Card className="controls-section glass-card" variant="borderless">
          <Title level={3}>
            <SecurityScanOutlined /> Security Controls
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <div className="control-item">
                <div className="control-header">
                  <Text strong>Encryption</Text>
                  <Switch 
                    checked={securityStatus.encryption}
                    onChange={() => toggleSecurityFeature('encryption')}
                  />
                </div>
                <Text type="secondary">Enable AES-256 encryption</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <div className="control-item">
                <div className="control-header">
                  <Text strong>Multi-Factor Auth</Text>
                  <Switch 
                    checked={securityStatus.mfa}
                    onChange={() => toggleSecurityFeature('mfa')}
                  />
                </div>
                <Text type="secondary">Require 2FA for all users</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <div className="control-item">
                <div className="control-header">
                  <Text strong>Audit Logging</Text>
                  <Switch 
                    checked={securityStatus.audit}
                    onChange={() => toggleSecurityFeature('audit')}
                  />
                </div>
                <Text type="secondary">Log all security events</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <div className="control-item">
                <div className="control-header">
                  <Text strong>Backup & Recovery</Text>
                  <Switch 
                    checked={securityStatus.backup}
                    onChange={() => toggleSecurityFeature('backup')}
                  />
                </div>
                <Text type="secondary">Automated daily backups</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <div className="control-item">
                <div className="control-header">
                  <Text strong>Real-time Monitoring</Text>
                  <Switch 
                    checked={securityStatus.monitoring}
                    onChange={() => toggleSecurityFeature('monitoring')}
                  />
                </div>
                <Text type="secondary">24/7 threat detection</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <div className="control-item">
                <div className="control-header">
                  <Text strong>Compliance Checks</Text>
                  <Switch 
                    checked={securityStatus.compliance}
                    onChange={() => toggleSecurityFeature('compliance')}
                  />
                </div>
                <Text type="secondary">Automated compliance validation</Text>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Call to Action */}
        <Card className="cta-section glass-card" variant="borderless">
          <div className="cta-content">
            <Title level={2}>
              Ready to Secure Your Enterprise?
            </Title>
            <Paragraph>
              Get a comprehensive security assessment and customized security plan for your organization.
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<SecurityScanOutlined />}
                onClick={generateSecurityReport}
              >
                Generate Security Report
              </Button>
              <Button 
                size="large" 
                icon={<TeamOutlined />}
              >
                Contact Security Team
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnterpriseSecurity; 