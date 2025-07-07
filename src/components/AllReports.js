import React, { useState } from 'react';
import { Upload, Button, Card, Menu, Spin, Typography, Image, message } from 'antd';
import { InboxOutlined, FilePdfOutlined, FileImageOutlined, CheckCircleTwoTone, FileTextOutlined } from '@ant-design/icons';
import './AllReports.css';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const ANALYSIS_OPTIONS = [
  { key: 'ats', label: 'ATS Resume Analysis', icon: <CheckCircleTwoTone twoToneColor="#52c41a" /> },
  { key: 'gap', label: 'Gap Analysis', icon: <FilePdfOutlined style={{ color: '#faad14' }} /> },
  { key: 'skill', label: 'Skill & Experience Match', icon: <FileImageOutlined style={{ color: '#1890ff' }} /> },
  { key: 'fit', label: 'Job Fit Score', icon: <FileTextOutlined style={{ color: '#52c41a' }} /> },
  { key: 'lang', label: 'Language Proficiency', icon: <FileTextOutlined style={{ color: '#722ed1' }} /> },
];


export default function AllReports() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState('ats');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  // Store all analysis results by type
  const [allResults, setAllResults] = useState({});
  // Chat messages state (for chatbot, if needed)
  const [messages, setMessages] = useState([]);

  const beforeUpload = (file) => {
    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');
    if (!isPdf && !isImage) {
      message.error('You can only upload PDF or image files!');
      return Upload.LIST_IGNORE;
    }
    setFile(file);
    setPreviewType(isPdf ? 'pdf' : 'image');
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAnalysisResult('');
    return false;
  };

  const handleMenuClick = async (e) => {
    setSelectedAnalysis(e.key);
    setLoading(true);
    setAnalysisResult('');
    if (allResults[e.key]) {
      setAnalysisResult(allResults[e.key]);
      setLoading(false);
      return;
    }
    if (!file) {
      setLoading(false);
      message.error('Please upload a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('analysisType', e.key);
    try {
      const response = await fetch('http://localhost:5000/api/analyze-cv-gemini', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      let resultNode;
      if (response.ok && data.analysis) {
        const report = data.analysis;
        // Render different report types
        if (e.key === 'ats') {
          resultNode = (
            <div style={{ color: '#fff', fontSize: 16 }}>
              {report.summary && <p><b>Summary:</b> {report.summary}</p>}
              {report.missingKeywords && Array.isArray(report.missingKeywords) && report.missingKeywords.length > 0 && (
                <p><b>Missing Keywords:</b> {report.missingKeywords.join(', ')}</p>
              )}
              {report.formattingIssues && Array.isArray(report.formattingIssues) && report.formattingIssues.length > 0 && (
                <div style={{ marginBottom: 8 }}>
                  <b>Formatting Issues:</b>
                  <ul style={{ margin: '6px 0 0 18px' }}>
                    {report.formattingIssues.map((issue, idx) => (
                      <li key={idx}>{typeof issue === 'object' ? JSON.stringify(issue) : String(issue)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {report.atsScore !== undefined && (
                <p><b>ATS Score:</b> {report.atsScore} / 100</p>
              )}
            </div>
          );
        } else if (e.key === 'gap') {
          resultNode = (
            <div style={{ color: '#fff', fontSize: 16 }}>
              {report.summary && <p><b>Summary:</b> {report.summary}</p>}
              {report.gaps && Array.isArray(report.gaps) && report.gaps.length > 0 && (
                <div><b>Detected Gaps:</b><ul>{report.gaps.map((g, i) => (
                  <li key={i}>{typeof g === 'object' ? JSON.stringify(g) : String(g)}</li>
                ))}</ul></div>
              )}
              {report.suggestions && Array.isArray(report.suggestions) && report.suggestions.length > 0 && (
                <div><b>Suggestions:</b><ul>{report.suggestions.map((s, i) => (
                  <li key={i}>{typeof s === 'object' ? JSON.stringify(s) : String(s)}</li>
                ))}</ul></div>
              )}
            </div>
          );
        } else if (e.key === 'skill') {
          resultNode = (
            <div style={{ color: '#fff', fontSize: 16 }}>
              {report.summary && <p><b>Summary:</b> {report.summary}</p>}
              {report.skills && Array.isArray(report.skills) && report.skills.length > 0 && (
                <div><b>Skills:</b> {report.skills.map((skill, i) => typeof skill === 'object' ? JSON.stringify(skill) : String(skill)).join(', ')}</div>
              )}
              {report.experience && Array.isArray(report.experience) && report.experience.length > 0 && (
                <div><b>Experience Highlights:</b><ul>{report.experience.map((e, i) => (
                  <li key={i}>{typeof e === 'object' ? JSON.stringify(e) : String(e)}</li>
                ))}</ul></div>
              )}
              {report.suggestions && Array.isArray(report.suggestions) && report.suggestions.length > 0 && (
                <div><b>Suggestions:</b><ul>{report.suggestions.map((s, i) => (
                  <li key={i}>{typeof s === 'object' ? JSON.stringify(s) : String(s)}</li>
                ))}</ul></div>
              )}
            </div>
          );
        } else if (e.key === 'fit') {
          resultNode = (
            <div style={{ color: '#fff', fontSize: 16 }}>
              {report.summary && <p><b>Summary:</b> {report.summary}</p>}
              {report.jobFitScore !== undefined && (
                <div><b>Job Fit Score:</b> {report.jobFitScore} / 100</div>
              )}
              {report.reasons && Array.isArray(report.reasons) && report.reasons.length > 0 && (
                <div><b>Reasons:</b><ul>{report.reasons.map((r, i) => (
                  <li key={i}>{typeof r === 'object' ? JSON.stringify(r) : String(r)}</li>
                ))}</ul></div>
              )}
            </div>
          );
        } else if (e.key === 'lang') {
          resultNode = (
            <div style={{ color: '#fff', fontSize: 16 }}>
              {report.summary && <p><b>Summary:</b> {report.summary}</p>}
              {report.languages && Array.isArray(report.languages) && report.languages.length > 0 && (
                <div><b>Languages:</b> {report.languages.map((lang, i) => typeof lang === 'object' ? JSON.stringify(lang) : String(lang)).join(', ')}</div>
              )}
              {report.proficiency && Array.isArray(report.proficiency) && report.proficiency.length > 0 && (
                <div><b>Proficiency Levels:</b> {report.proficiency.map((prof, i) => typeof prof === 'object' ? JSON.stringify(prof) : String(prof)).join(', ')}</div>
              )}
              {report.suggestions && Array.isArray(report.suggestions) && report.suggestions.length > 0 && (
                <div><b>Suggestions:</b><ul>{report.suggestions.map((s, i) => (
                  <li key={i}>{typeof s === 'object' ? JSON.stringify(s) : String(s)}</li>
                ))}</ul></div>
              )}
            </div>
          );
        } else if (e.key === 'faq') {
          // Example FAQ rendering with black text
          resultNode = (
            <div style={{ color: '#000', fontSize: 16 }}>
              <b>Frequently Asked Questions</b>
              <ul>
                <li><b>Q:</b> How do I upload my resume?<br /><b>A:</b> Click or drag your file to the upload area above.</li>
                <li><b>Q:</b> What file types are supported?<br /><b>A:</b> PDF and image files are supported.</li>
                <li><b>Q:</b> How do I view different analysis reports?<br /><b>A:</b> Select a report type from the menu on the right.</li>
              </ul>
            </div>
          );
        } else {
          resultNode = <div style={{ color: '#fff' }}>No report data.</div>;
        }
        setAllResults(prev => ({ ...prev, [e.key]: resultNode }));
        setAnalysisResult(resultNode);
        // If this is a chat bot message, add to messages at the top
        if (e.key === 'chat' && resultNode) {
          setMessages(prev => [resultNode, ...prev]);
        }
      } else if (data.rawOutput) {
        setAnalysisResult(data.rawOutput);
        setAllResults(prev => ({ ...prev, [e.key]: data.rawOutput }));
        if (e.key === 'chat' && data.rawOutput) {
          setMessages(prev => [data.rawOutput, ...prev]);
        }
      } else {
        setAnalysisResult(data.message || 'No analysis result returned.');
        setAllResults(prev => ({ ...prev, [e.key]: data.message || 'No analysis result returned.' }));
        if (e.key === 'chat' && (data.message || 'No analysis result returned.')) {
          setMessages(prev => [(data.message || 'No analysis result returned.'), ...prev]);
        }
      }
    } catch (err) {
      setAnalysisResult('Error: Could not get analysis result.');
      setAllResults(prev => ({ ...prev, [e.key]: 'Error: Could not get analysis result.' }));
      if (e.key === 'chat') {
        setMessages(prev => ['Error: Could not get analysis result.', ...prev]);
      }
    }
    setLoading(false);
  };
  return (
    <div className="all-reports-container">
      <Card className="all-reports-card" variant="outlined">
        <Title level={2} className="all-reports-title">All Reports</Title>
        <div className="all-reports-content">
          <div className="all-reports-left-panel">
            <Dragger
              accept=".pdf,image/*"
              beforeUpload={beforeUpload}
              showUploadList={false}
              className="all-reports-uploader"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to upload</p>
              <p className="ant-upload-hint">PDF or image only</p>
            </Dragger>
            {previewUrl && previewType === 'image' && (
              <Image src={previewUrl} alt="Resume Preview" className="all-reports-preview" />
            )}
            {previewUrl && previewType === 'pdf' && (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="all-reports-preview"
                frameBorder="0"
                width="100%"
                height="400px"
              />
            )}
          </div>
          <div className="all-reports-right-panel">
            <Menu
              mode="vertical"
              selectedKeys={[selectedAnalysis]}
              onClick={handleMenuClick}
              className="all-reports-menu"
              items={ANALYSIS_OPTIONS.map(opt => ({
                key: opt.key,
                icon: opt.icon,
                label: opt.label
              }))}
            />
            <div className="all-reports-analysis-result">
              {loading ? <Spin fullscreen><span>Analyzing...</span></Spin> : (
                analysisResult && (
                  <Card
                    type="inner"
                    className="all-reports-result-card"
                    style={{
                      borderRadius: 18,
                      background: '#23263a',
                      color: '#fff',
                      marginTop: 18,
                      minWidth: 340,
                      maxWidth: 600,
                      width: '100%',
                      alignSelf: 'center',
                      boxShadow: '0 2px 16px #246bfd22',
                      paddingBottom: 32,
                      paddingLeft: 32,
                      paddingRight: 32,
                    }}
                  >
                    {analysisResult}
                  </Card>
                )
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
