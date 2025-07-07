import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';

const { Title, Paragraph } = Typography;

const AnalyseMyCV = () => {
  const [report, setReport] = useState(null);
  const [fileName, setFileName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const result = sessionStorage.getItem('quantumcv_analyzeResult');
      const fileName = sessionStorage.getItem('quantumcv_cvFileName');
      const originalName = sessionStorage.getItem('quantumcv_cvOriginalName');
      const fileUrl = sessionStorage.getItem('quantumcv_cvFileUrl');
      if (result) setReport(JSON.parse(result));
      if (fileName) setFileName(fileName);
      if (originalName) setOriginalName(originalName);
      if (fileUrl) setFileUrl(fileUrl);
    } catch (e) {
      setReport(null);
    }
    setLoading(false);
  }, []);

  if (loading) return <Spin style={{ margin: 40 }} />;

  return (
    <div style={{ minHeight: '100vh', background: '#101522', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 0' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        <Card style={{ borderRadius: 18, background: '#23263a', boxShadow: '0 4px 32px #246bfd33', padding: '32px 32px 24px 32px', color: '#fff' }}>
          <Title level={2} style={{ color: '#246bfd', textAlign: 'left', marginBottom: 24 }}>Resume Full ATS Analysis Report</Title>
          {!report ? (
            <Alert message="No analysis report found. Please upload and analyze your resume first." type="warning" showIcon style={{ margin: 24 }} />
          ) : (
            <div style={{ color: '#fff' }}>
              {Object.entries(report).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <b style={{ textTransform: 'capitalize' }}>{key}:</b>{' '}
                  {typeof value === 'string' || typeof value === 'number' ? (
                    <span>{value}</span>
                  ) : Array.isArray(value) ? (
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {value.map((v, i) => <li key={i}>{typeof v === 'object' ? JSON.stringify(v) : v}</li>)}
                    </ul>
                  ) : typeof value === 'object' && value !== null ? (
                    <pre style={{ background: '#181c2a', borderRadius: 8, padding: 8, color: '#b0e1ff', margin: 0 }}>{JSON.stringify(value, null, 2)}</pre>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AnalyseMyCV;
