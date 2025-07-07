import React, { useState } from 'react';
import { Card, Typography, Input, Button, Steps, Upload, message, Spin, Row, Col, Modal } from 'antd';
import { FileTextOutlined, CheckCircleTwoTone, CloudUploadOutlined, EditOutlined, DownloadOutlined, BulbOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const demoPrompts = [
  '"I am a software engineer with 5 years of experience in web development, specializing in React and Node.js. I have led teams, built scalable apps, and love solving problems."',
  '"Recent graduate in marketing, skilled in social media, content creation, and analytics. Looking for entry-level roles in digital marketing."',
  '"Experienced project manager in healthcare, PMP certified, with a track record of delivering projects on time and under budget."',
];

const TextToCVGenerator = () => {
  const [step, setStep] = useState(0);
  const [inputText, setInputText] = useState('');
  const [cvResult, setCvResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      message.error('Please enter your career story or LinkedIn text.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setCvResult(
        'John Doe\n\nSoftware Engineer\n\nSummary:\nExperienced software engineer with 5+ years in web development. Skilled in React, Node.js, and leading agile teams. Passionate about building scalable solutions.\n\nExperience:\n- Lead Developer at Quantum Tech (2021-2025)\n- Frontend Engineer at Webify (2019-2021)\n\nEducation:\nB.Sc. in Computer Science, Tech University\n\nSkills:\nReact, Node.js, JavaScript, Leadership, Agile, Problem Solving\n' // Demo output
      );
      setStep(2);
      setLoading(false);
    }, 1800);
  };

  const handleDownload = () => {
    const blob = new Blob([cvResult], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QuantumCV_Generated_CV.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 0' }}>
      <Card style={{ borderRadius: 24, boxShadow: '0 4px 32px #246bfd22', background: '#181c2a', color: '#fff', marginBottom: 32 }}>
        <Title level={1} style={{ color: '#ffe066', fontWeight: 900, letterSpacing: 1, marginBottom: 0 }}>Text to CV Generator</Title>
        <Paragraph style={{ color: '#b0e1ff', fontSize: 18, margin: '16px 0 24px 0' }}>
          Instantly turn your career story, LinkedIn profile, or plain text into a professional, AI-generated CV. <BulbOutlined style={{ color: '#52c41a', marginLeft: 8 }} />
        </Paragraph>
        <Steps current={step} style={{ marginBottom: 32 }}>
          <Step title="Paste Text" icon={<EditOutlined />} />
          <Step title="Generate CV" icon={<FileTextOutlined />} />
          <Step title="Download" icon={<DownloadOutlined />} />
        </Steps>
        {step === 0 && (
          <>
            <Paragraph style={{ color: '#b0b3c7', marginBottom: 8 }}>
              Paste your career story, LinkedIn summary, or job history below. Not sure what to write? <Button size="small" type="link" style={{ color: '#52c41a', padding: 0 }} onClick={() => setShowPromptModal(true)}>See Examples</Button>
            </Paragraph>
            <Input.TextArea
              rows={7}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="E.g. I am a software engineer with 5 years of experience..."
              style={{ marginBottom: 16, background: '#23263a', color: '#fff', borderRadius: 12, border: '1.5px solid #246bfd' }}
            />
            <Button type="primary" size="large" icon={<FileTextOutlined />} style={{ borderRadius: 16, fontWeight: 700 }} onClick={handleGenerate} loading={loading}>
              Generate CV
            </Button>
          </>
        )}
        {step === 1 && (
          <div style={{ textAlign: 'center', margin: '48px 0' }}>
            <Spin size="large" tip="Generating your CV..." />
          </div>
        )}
        {step === 2 && (
          <>
            <Paragraph style={{ color: '#52c41a', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} /> Your CV is ready!
            </Paragraph>
            <Card style={{ background: '#23263a', color: '#fff', borderRadius: 12, marginBottom: 16 }}>
              <pre style={{ color: '#fff', fontSize: 16, whiteSpace: 'pre-wrap' }}>{cvResult}</pre>
            </Card>
            <Button type="primary" icon={<DownloadOutlined />} size="large" style={{ borderRadius: 16, fontWeight: 700, marginRight: 16 }} onClick={handleDownload}>
              Download as TXT
            </Button>
            <Button type="default" size="large" style={{ borderRadius: 16, fontWeight: 700 }} onClick={() => { setStep(0); setInputText(''); setCvResult(''); }}>
              Generate Another
            </Button>
          </>
        )}
      </Card>
      <Modal
        open={showPromptModal}
        onCancel={() => setShowPromptModal(false)}
        footer={null}
        centered
        title={<span style={{ color: '#246bfd', fontWeight: 700, fontSize: 20 }}><BulbOutlined style={{ marginRight: 8 }} />Example Prompts</span>}
      >
        <ul style={{ paddingLeft: 20 }}>
          {demoPrompts.map((p, i) => (
            <li key={i} style={{ marginBottom: 12, color: '#181c2a', fontSize: 16 }}>{p}</li>
          ))}
        </ul>
      </Modal>
      <Card style={{ background: '#fffbe6', borderRadius: 16, marginTop: 32, color: '#181c2a', boxShadow: '0 2px 12px #ffe06655', textAlign: 'center' }}>
        <SmileOutlined style={{ fontSize: 32, color: '#246bfd', marginBottom: 8 }} />
        <Paragraph style={{ fontSize: 16, margin: 0 }}>
          <b>Pro Tip:</b> The more details you provide, the better your CV! Include your skills, achievements, and job history for best results.
        </Paragraph>
      </Card>
    </div>
  );
};

export default TextToCVGenerator;
