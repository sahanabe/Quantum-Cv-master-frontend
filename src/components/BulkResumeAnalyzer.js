import React, { useState } from 'react';
import { Card, Steps, Button, Upload, Input, Typography, message, Spin, List, Tag } from 'antd';
import { UploadOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Step } = Steps;

const BulkResumeAnalyzer = () => {
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [requirement, setRequirement] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const steps = [
    {
      title: 'Upload Resumes',
      content: (
        <Upload.Dragger
          multiple
          accept=".pdf"
          beforeUpload={file => {
            setFileList(prev => [...prev, file]);
            return false;
          }}
          fileList={fileList}
          onRemove={file => {
            setFileList(prev => prev.filter(f => f.uid !== file.uid));
          }}
          directory
          style={{ minHeight: 220, borderRadius: 18, background: '#181c2a', border: '2px dashed #246bfd', color: '#fff', fontSize: 18 }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined style={{ fontSize: 48, color: '#246bfd' }} />
          </p>
          <p style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>Click or drag PDF files or a folder to upload</p>
          <p style={{ color: '#b0b3c7' }}>Supported: Multiple PDFs, or a folder of PDFs</p>
        </Upload.Dragger>
      ),
    },
    {
      title: 'Enter Requirement',
      content: (
        <div style={{ marginTop: 32 }}>
          <Title level={4} style={{ color: '#246bfd' }}>What do you want to analyze for?</Title>
          <Input.TextArea
            rows={6}
            value={requirement}
            onChange={e => setRequirement(e.target.value)}
            placeholder="Describe your requirement for analyzing the resumes (e.g., skills, experience, keywords, etc.)"
            style={{ borderRadius: 12, fontSize: 16, background: '#23263a', color: '#fff', marginTop: 12 }}
          />
        </div>
      ),
    },
    {
      title: 'Analysis Results',
      content: (
        loading ? <Spin fullscreen /> :
        <div style={{ marginTop: 32 }}>
          <Title level={4} style={{ color: '#246bfd' }}>Resumes Matching Requirement</Title>
          <List
            bordered
            dataSource={results}
            renderItem={item => (
              <List.Item>
                <span style={{ color: '#246bfd', fontWeight: 600 }}>{item.name}</span>
                {item.match ? <Tag color="green">OK</Tag> : <Tag color="red">Not Matched</Tag>}
                {item.reason && <span style={{ marginLeft: 16, color: '#b0b3c7' }}>{item.reason}</span>}
              </List.Item>
            )}
            locale={{ emptyText: 'No resumes analyzed yet.' }}
          />
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    if (current === 0) {
      if (fileList.length === 0) return message.error('Please upload at least one PDF resume.');
      setCurrent(1);
    } else if (current === 1) {
      if (!requirement.trim()) return message.error('Please enter your analysis requirement.');
      setLoading(true);
      // Simulate backend call for analysis
      setTimeout(() => {
        // Fake analysis: mark all as OK if filename includes 'ok', else not matched
        setResults(fileList.map(f => ({ name: f.name, match: f.name.toLowerCase().includes('ok'), reason: f.name.toLowerCase().includes('ok') ? '' : 'Does not meet requirement' })));
        setLoading(false);
        setCurrent(2);
      }, 1800);
    }
  };

  const handlePrev = () => setCurrent(current - 1);

  return (
    <div style={{ minHeight: '100vh', background: '#101522', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 900, width: '100%', borderRadius: 20, background: '#23263a', boxShadow: '0 8px 48px #246bfd55', padding: 40 }}>
        <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Bulk Resume Analyzer</Title>
        <Steps current={current} style={{ marginBottom: 40, maxWidth: 700, margin: '0 auto' }}>
          {steps.map((s, i) => <Step key={i} title={<span style={{ color: current === i ? '#246bfd' : '#b0b3c7' }}>{s.title}</span>} />)}
        </Steps>
        <div style={{ minHeight: 220, maxWidth: 700, margin: '0 auto' }}>{steps[current].content}</div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handlePrev}
            disabled={current === 0 || loading}
            style={{ borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '6px 32px', background: '#23263a', color: '#fff', border: 'none', boxShadow: '0 2px 12px #246bfd22' }}
          >
            Previous
          </Button>
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={handleNext}
            loading={loading}
            style={{ borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '6px 32px', background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)', border: 'none', boxShadow: '0 2px 12px #246bfd44' }}
          >
            {current === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BulkResumeAnalyzer;
