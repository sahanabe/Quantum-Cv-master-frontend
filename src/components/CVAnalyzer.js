import React, { useState, useEffect } from 'react';
import { Card, Typography, Upload, Button, Input, Spin, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [roleTemplates, setRoleTemplates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/role-templates')
      .then(res => res.json())
      .then(data => setRoleTemplates(data.templates || []));
  }, []);

  const handleAnalyze = async () => {
    if (!file) return message.error('Please upload a CV file.');
    setLoading(true);
    setReport(null);

    try {
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('jobDesc', jobDesc || role);

      const res = await fetch('http://localhost:5000/api/analyze-cv-gemini', {

        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Analysis failed');

      setReport(data.analysis);
    } catch (err) {
      message.error(err.message || 'Failed to analyze CV.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={<Title level={3}>AI Resume Analyzer</Title>} styles={{ body: { padding: 24 } }}>
      <Paragraph>Upload your CV and get an instant AI-powered analysis and job-fit report.</Paragraph>

      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        maxCount={1}
        showUploadList={{ showRemoveIcon: true }}
        onRemove={() => setFile(null)}
      >
        <Button icon={<UploadOutlined />}>Select CV File</Button>
      </Upload>

      <Select
        style={{ width: '100%', marginTop: 16 }}
        placeholder="Select a job role template (optional)"
        onChange={(val) => setRole(val)}
        options={roleTemplates.map(t => ({ label: t.title, value: t.title }))}
        allowClear
      />

      <Input.TextArea
        rows={3}
        style={{ marginTop: 16 }}
        placeholder="Or enter a custom job description (optional)"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <Button type="primary" style={{ marginTop: 16 }} onClick={handleAnalyze} loading={loading} disabled={!file}>
        Analyze CV
      </Button>

      {loading && <Spin style={{ marginLeft: 16 }} />}

      {report && (
        <div style={{ marginTop: 32 }}>
          <Title level={4}>AI Report</Title>
          {report.summary && <Paragraph><b>Summary:</b> {report.summary}</Paragraph>}
          {report.textAnalysis && <Paragraph><b>Text Analysis:</b> {report.textAnalysis}</Paragraph>}
          {report.improvements && Array.isArray(report.improvements) && (
            <>
              <b>Suggestions for Improvement:</b>
              <ul>{report.improvements.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </>
          )}
          {report.matchScore !== undefined && (
            <Paragraph><b>Resume Score:</b> {report.matchScore} / 100</Paragraph>
          )}
        </div>
      )}
    </Card>
  );
};

export default CVAnalyzer;
