import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Upload, 
  Select, 
  Space, 
  Spin, 
  Alert, 
  Divider,
  Tag,
  Progress,
  Collapse,
  List,
  Statistic
} from 'antd';
import { 
  UploadOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined,
  WarningOutlined,
  TrophyOutlined,
  RocketOutlined,
  UserOutlined,
  ToolOutlined,
  AimOutlined,
  StarOutlined
} from '@ant-design/icons';
import { 
  analyzeATS, 
  analyzeSkills, 
  analyzeCareerPath, 
  optimizeResume,
  validateFile,
  withLoading,
  handleAIResponse
} from '../services/aiService';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const CVAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('ats');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [targetJob, setTargetJob] = useState('');

  const analysisTypes = [
    {
      key: 'ats',
      name: 'ATS Optimization',
      description: 'Analyze resume for ATS compatibility and keyword optimization',
      icon: <AimOutlined />,
      color: '#1890ff'
    },
    {
      key: 'skills',
      name: 'Skills Analysis',
      description: 'Extract and analyze skills, experience, and career progression',
      icon: <ToolOutlined />,
      color: '#52c41a'
    },
    {
      key: 'career',
      name: 'Career Path',
      description: 'Analyze career trajectory and suggest growth opportunities',
      icon: <RocketOutlined />,
      color: '#722ed1'
    },
    {
      key: 'optimize',
      name: 'Resume Optimization',
      description: 'Get AI-powered suggestions to improve your resume',
      icon: <StarOutlined />,
      color: '#fa8c16'
    }
  ];

  const handleFileUpload = (info) => {
    const { file } = info;
    
    try {
      validateFile(file);
      setFile(file);
    } catch (error) {
      // Error is handled by validateFile function
    }
  };

  const handleAnalysis = async () => {
    if (!file) {
      return;
    }

    try {
      let result;
      
      await withLoading(setLoading, async () => {
        switch (analysisType) {
          case 'ats':
            result = await analyzeATS(file);
            break;
          case 'skills':
            result = await analyzeSkills(file);
            break;
          case 'career':
            result = await analyzeCareerPath(file);
            break;
          case 'optimize':
            result = await optimizeResume(file, targetJob);
            break;
          default:
            throw new Error('Invalid analysis type');
        }
        
        result = handleAIResponse(result, 'Analysis completed successfully!');
        setResults(result);
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const renderATSResults = (data) => {
    if (!data.analysis) return null;
    
    const { summary, atsScore, missingKeywords, formattingIssues, strengths, recommendations } = data.analysis;
    
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card className="result-card">
              <Title level={4}>ATS Analysis Summary</Title>
              <Paragraph>{summary}</Paragraph>
            </Card>
          </Col>
          
          <Col span={8}>
            <Card className="result-card">
              <Statistic
                title="ATS Score"
                value={atsScore}
                suffix="/100"
                valueStyle={{ color: atsScore >= 80 ? '#3f8600' : atsScore >= 60 ? '#faad14' : '#cf1322' }}
                prefix={<TrophyOutlined />}
              />
              <Progress 
                percent={atsScore} 
                status={atsScore >= 80 ? 'success' : atsScore >= 60 ? 'normal' : 'exception'}
              />
            </Card>
          </Col>
          
          <Col span={8}>
            <Card className="result-card">
              <Title level={5}>Strengths</Title>
              <List
                size="small"
                dataSource={strengths || []}
                renderItem={item => (
                  <List.Item>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          
          <Col span={8}>
            <Card className="result-card">
              <Title level={5}>Recommendations</Title>
              <List
                size="small"
                dataSource={recommendations || []}
                renderItem={item => (
                  <List.Item>
                    <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <WarningOutlined style={{ color: '#faad14', marginRight: 8 }} />
                Missing Keywords
              </Title>
              <div>
                {missingKeywords?.map((keyword, index) => (
                  <Tag key={index} color="orange" style={{ margin: '4px' }}>
                    {keyword}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <WarningOutlined style={{ color: '#faad14', marginRight: 8 }} />
                Formatting Issues
              </Title>
              <List
                size="small"
                dataSource={formattingIssues || []}
                renderItem={item => (
                  <List.Item>
                    <WarningOutlined style={{ color: '#faad14', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const renderSkillsResults = (data) => {
    if (!data.analysis) return null;
    
    const { summary, technicalSkills, softSkills, experience, skillGaps, recommendations } = data.analysis;
    
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card className="result-card">
              <Title level={4}>Skills Analysis Summary</Title>
              <Paragraph>{summary}</Paragraph>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <ToolOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                Technical Skills
              </Title>
              <div>
                {technicalSkills?.map((skill, index) => (
                  <Tag key={index} color="blue" style={{ margin: '4px' }}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <UserOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                Soft Skills
              </Title>
              <div>
                {softSkills?.map((skill, index) => (
                  <Tag key={index} color="green" style={{ margin: '4px' }}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <WarningOutlined style={{ color: '#faad14', marginRight: 8 }} />
                Skill Gaps
              </Title>
              <List
                size="small"
                dataSource={skillGaps || []}
                renderItem={item => (
                  <List.Item>
                    <WarningOutlined style={{ color: '#faad14', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                Recommendations
              </Title>
              <List
                size="small"
                dataSource={recommendations || []}
                renderItem={item => (
                  <List.Item>
                    <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const renderCareerResults = (data) => {
    if (!data.analysis) return null;
    
    const { summary, currentLevel, potentialPaths, skillDevelopment, recommendations } = data.analysis;
    
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card className="result-card">
              <Title level={4}>Career Path Analysis</Title>
              <Paragraph>{summary}</Paragraph>
              <Tag color="blue" style={{ marginTop: 8 }}>
                Current Level: {currentLevel}
              </Tag>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card className="result-card">
              <Title level={5}>
                <RocketOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                Potential Career Paths
              </Title>
              <Collapse>
                {potentialPaths?.map((path, index) => (
                  <Panel 
                    header={path.path} 
                    key={index}
                    extra={<Tag color="purple">{path.timeline}</Tag>}
                  >
                    <Paragraph><strong>Description:</strong> {path.description}</Paragraph>
                    <Paragraph><strong>Requirements:</strong></Paragraph>
                    <List
                      size="small"
                      dataSource={path.requirements || []}
                      renderItem={item => (
                        <List.Item>
                          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                          {item}
                        </List.Item>
                      )}
                    />
                    <Paragraph><strong>Salary Range:</strong> {path.salaryRange}</Paragraph>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <ToolOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                Skill Development
              </Title>
              <Collapse>
                {skillDevelopment?.map((skill, index) => (
                  <Panel header={skill.skill} key={index}>
                    <Paragraph><strong>Importance:</strong> {skill.importance}</Paragraph>
                    <Paragraph><strong>Resources:</strong></Paragraph>
                    <List
                      size="small"
                      dataSource={skill.resources || []}
                      renderItem={item => (
                        <List.Item>
                          <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                          {item}
                        </List.Item>
                      )}
                    />
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                Recommendations
              </Title>
              <List
                size="small"
                dataSource={recommendations || []}
                renderItem={item => (
                  <List.Item>
                    <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const renderOptimizationResults = (data) => {
    if (!data.optimization) return null;
    
    const { summary, optimizedContent, actionVerbs, quantifiableAchievements, overallScore } = data.optimization;
    
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card className="result-card">
              <Title level={4}>Resume Optimization Summary</Title>
              <Paragraph>{summary}</Paragraph>
              <Statistic
                title="Optimization Score"
                value={overallScore}
                suffix="/100"
                valueStyle={{ color: overallScore >= 80 ? '#3f8600' : overallScore >= 60 ? '#faad14' : '#cf1322' }}
                prefix={<StarOutlined />}
              />
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                Action Verbs
              </Title>
              <div>
                {actionVerbs?.map((verb, index) => (
                  <Tag key={index} color="blue" style={{ margin: '4px' }}>
                    {verb}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card className="result-card">
              <Title level={5}>
                <TrophyOutlined style={{ color: '#fa8c16', marginRight: 8 }} />
                Quantifiable Achievements
              </Title>
              <List
                size="small"
                dataSource={quantifiableAchievements || []}
                renderItem={item => (
                  <List.Item>
                    <TrophyOutlined style={{ color: '#fa8c16', marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const renderResults = () => {
    if (!results) return null;

    switch (analysisType) {
      case 'ats':
        return renderATSResults(results);
      case 'skills':
        return renderSkillsResults(results);
      case 'career':
        return renderCareerResults(results);
      case 'optimize':
        return renderOptimizationResults(results);
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '64px auto 0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#1890ff' }}>
        <FileTextOutlined style={{ marginRight: '12px' }} />
        AI-Powered Resume Analysis
      </Title>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="upload-card">
            <Title level={4}>Upload Your Resume</Title>
            <Paragraph>
              Upload your resume (PDF, DOCX, or TXT) and choose the type of analysis you'd like to perform.
            </Paragraph>
            
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Upload
                beforeUpload={() => false}
                onChange={handleFileUpload}
                accept=".pdf,.docx,.txt"
                showUploadList={true}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} size="large">
                  Choose Resume File
                </Button>
              </Upload>

              <div>
                <Title level={5}>Select Analysis Type</Title>
                <Row gutter={[16, 16]}>
                  {analysisTypes.map(type => (
                    <Col span={12} lg={6} key={type.key}>
                      <Card
                        className={`analysis-type-card ${analysisType === type.key ? 'selected' : ''}`}
                        onClick={() => setAnalysisType(type.key)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', color: type.color, marginBottom: '8px' }}>
                            {type.icon}
                          </div>
                          <Title level={5} style={{ margin: '8px 0' }}>
                            {type.name}
                          </Title>
                          <Paragraph style={{ fontSize: '12px', margin: 0 }}>
                            {type.description}
                          </Paragraph>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              {analysisType === 'optimize' && (
                <div>
                  <Title level={5}>Target Job (Optional)</Title>
                  <input
                    type="text"
                    placeholder="e.g., Senior Software Engineer at Google"
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              )}

              <Button
                type="primary"
                size="large"
                onClick={handleAnalysis}
                loading={loading}
                disabled={!file}
                icon={<RocketOutlined />}
                style={{ width: '100%' }}
              >
                {loading ? 'Analyzing...' : 'Start Analysis'}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {results && (
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <Card className="results-card">
              <Title level={3}>Analysis Results</Title>
              {renderResults()}
            </Card>
          </Col>
        </Row>
      )}

      <style jsx>{`
        .upload-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: white;
        }
        
        .upload-card .ant-card-body {
          color: white;
        }
        
        .upload-card .ant-typography {
          color: white !important;
        }
        
        .analysis-type-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .analysis-type-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .analysis-type-card.selected {
          border-color: #1890ff;
          background: rgba(24, 144, 255, 0.05);
        }
        
        .result-card {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .result-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .results-card {
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CVAnalysis;
