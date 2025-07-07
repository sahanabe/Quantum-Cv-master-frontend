import React, { useState } from 'react';
import { Card, Steps, Button, Upload, Input, Typography, message, Spin } from 'antd';
import { UploadOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const steps = [
  {
    title: 'Upload Resume',
    content: 'upload',
  },
  {
    title: 'Job Description',
    content: 'jobdesc',
  },
  {
    title: 'Personal Info',
    content: 'personal',
  },
  {
    title: 'Review & Submit',
    content: 'review',
  },
];




// Define step titles for the Steps component and steps array
const stepTitles = [
  'Upload Resume',
  'Job Description',
];

// Step content (move above functions to avoid reference errors)
const getSteps = (cvFile, setCvFile, jobDesc, setJobDesc, message) => ([
  {
    title: stepTitles[0],
    content: (
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Upload.Dragger
          name="cv"
          accept=".pdf,.doc,.docx"
          maxCount={1}
          beforeUpload={file => {
            const isCV =
              file.type === 'application/pdf' ||
              file.type === 'application/msword' ||
              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
              file.name.endsWith('.pdf') ||
              file.name.endsWith('.doc') ||
              file.name.endsWith('.docx');
            if (!isCV) {
              message.error('You can only upload PDF, DOC, or DOCX files!');
              return Upload.LIST_IGNORE;
            }
            setCvFile(file);
            setCurrentStep && setCurrentStep(1); // setCurrentStep will be injected
            return false;
          }}
          showUploadList={false}
          onRemove={() => setCvFile(null)}
          style={{ minHeight: 220, borderRadius: 18, background: '#181c2a', border: '2px dashed #246bfd', color: '#fff', fontSize: 18 }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined style={{ fontSize: 48, color: '#246bfd' }} />
          </p>
          <p style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>Click or drag file to this area to upload</p>
          <p style={{ color: '#b0b3c7' }}>Supported: PDF, DOC, DOCX</p>
        </Upload.Dragger>
        {cvFile && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Card style={{ display: 'inline-block', background: '#23263a', color: '#fff', borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Uploaded Resume:</div>
              <div style={{ fontSize: 16, color: '#b0b3c7' }}>{cvFile.name}</div>
              <div style={{ marginTop: 8 }}>
                <Button onClick={() => setCvFile(null)} size="small" style={{ borderRadius: 8 }}>Remove</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    ),
  },
  {
    title: stepTitles[1],
    content: (
      <div style={{ marginTop: 32 }}>
        <Title level={4} style={{ color: '#246bfd' }}>Paste the Job Description</Title>
        <Input.TextArea
          rows={7}
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          placeholder="Paste the job description here..."
          style={{ borderRadius: 12, fontSize: 16, background: '#23263a', color: '#fff', marginTop: 12 }}
        />
      </div>
    ),
  },
]);




function UploadQuantumResume({ token }) {
  const [current, setCurrent] = useState(0);
  const [cvFile, setCvFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [careerLevel, setCareerLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step content renderers
  const renderStepContent = () => {
    switch (steps[current].content) {
      case 'upload':
        return (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Upload.Dragger
              name="cv"
              accept=".pdf,.doc,.docx"
              maxCount={1}
              beforeUpload={file => {
                const isCV =
                  file.type === 'application/pdf' ||
                  file.type === 'application/msword' ||
                  file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                  file.name.endsWith('.pdf') ||
                  file.name.endsWith('.doc') ||
                  file.name.endsWith('.docx');
                if (!isCV) {
                  message.error('You can only upload PDF, DOC, or DOCX files!');
                  return Upload.LIST_IGNORE;
                }
                setCvFile(file);
                setTimeout(() => setCurrent(current + 1), 0); // Auto-advance to next step
                return false;
              }}
              showUploadList={false}
              onRemove={() => setCvFile(null)}
              style={{ minHeight: 220, borderRadius: 18, background: '#181c2a', border: '2px dashed #246bfd', color: '#fff', fontSize: 18 }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined style={{ fontSize: 48, color: '#246bfd' }} />
              </p>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>Click or drag file to this area to upload</p>
              <p style={{ color: '#b0b3c7' }}>Supported: PDF, DOC, DOCX</p>
            </Upload.Dragger>
            {cvFile && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Card style={{ display: 'inline-block', background: '#23263a', color: '#fff', borderRadius: 12, padding: 16, minWidth: 320 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Uploaded Resume:</div>
                  <div style={{ fontSize: 16, color: '#b0b3c7', marginBottom: 12 }}>{cvFile.name}</div>
                  {/* Preview Section */}
                  <div style={{ marginBottom: 12 }}>
                    {(() => {
                      const fileUrl = cvFile.preview || (cvFile.originFileObj ? URL.createObjectURL(cvFile.originFileObj) : URL.createObjectURL(cvFile));
                      const name = cvFile.name || '';
                      if (/\.(jpg|jpeg|png|gif)$/i.test(name)) {
                        return <img src={fileUrl} alt="Resume Preview" style={{ maxWidth: 260, maxHeight: 320, borderRadius: 8, margin: '0 auto' }} />;
                      } else if (/\.pdf$/i.test(name)) {
                        return <iframe src={fileUrl} title="Resume PDF Preview" width="260" height="320" style={{ border: 'none', borderRadius: 8 }} />;
                      } else {
                        return <a href={fileUrl} download={name} style={{ color: '#246bfd' }}>Download file</a>;
                      }
                    })()}
                  </div>
                  <div>
                    <Button onClick={() => setCvFile(null)} size="small" style={{ borderRadius: 8 }}>Remove</Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        );
      case 'jobdesc':
        return (
          <div style={{ marginTop: 32 }}>
            <Title level={4} style={{ color: '#246bfd' }}>Paste the Job Description</Title>
            <Input.TextArea
              rows={7}
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
              style={{ borderRadius: 12, fontSize: 16, background: '#23263a', color: '#fff', marginTop: 12 }}
            />
          </div>
        );
      case 'personal':
        return (
          <div style={{ marginTop: 32 }}>
            <Title level={4} style={{ color: '#246bfd' }}>Personal Information</Title>
            <Input
              value={personName}
              onChange={e => setPersonName(e.target.value)}
              placeholder="Your Name"
              style={{ marginBottom: 12, borderRadius: 10, fontSize: 16, background: '#181c2a', color: '#fff', border: '1.5px solid #246bfd' }}
            />
            <Input
              value={personEmail}
              onChange={e => setPersonEmail(e.target.value)}
              placeholder="Your Email"
              type="email"
              style={{ marginBottom: 12, borderRadius: 10, fontSize: 16, background: '#181c2a', color: '#fff', border: '1.5px solid #246bfd' }}
            />
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8, marginTop: 8 }}>What best describes you?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Card
                onClick={() => setCareerLevel('entry')}
                style={{
                  background: careerLevel === 'entry' ? 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)' : '#181c2a',
                  color: '#fff',
                  border: careerLevel === 'entry' ? '2px solid #52c41a' : '1.5px solid #246bfd',
                  borderRadius: 14,
                  cursor: 'pointer',
                  boxShadow: careerLevel === 'entry' ? '0 2px 16px #52c41a55' : 'none',
                  transition: 'all 0.2s',
                }}
                styles={{ body: { padding: 16 } }}
                hoverable
              >
                <div style={{ fontWeight: 700, fontSize: 17 }}>Entry-level</div>
                <div style={{ color: '#b0e1ff', fontSize: 15 }}>Students & recent graduates. Less than 2 years of work experience.</div>
              </Card>
              <Card
                onClick={() => setCareerLevel('mid')}
                style={{
                  background: careerLevel === 'mid' ? 'linear-gradient(90deg, #246bfd 60%, #faad14 100%)' : '#181c2a',
                  color: '#fff',
                  border: careerLevel === 'mid' ? '2px solid #faad14' : '1.5px solid #246bfd',
                  borderRadius: 14,
                  cursor: 'pointer',
                  boxShadow: careerLevel === 'mid' ? '0 2px 16px #faad1455' : 'none',
                  transition: 'all 0.2s',
                }}
                styles={{ body: { padding: 16 } }}
                hoverable
              >
                <div style={{ fontWeight: 700, fontSize: 17 }}>Mid-level</div>
                <div style={{ color: '#ffe58f', fontSize: 15 }}>You have between 2 and 10 years of relevant work experience.</div>
              </Card>
              <Card
                onClick={() => setCareerLevel('senior')}
                style={{
                  background: careerLevel === 'senior' ? 'linear-gradient(90deg, #246bfd 60%, #ff4d4f 100%)' : '#181c2a',
                  color: '#fff',
                  border: careerLevel === 'senior' ? '2px solid #ff4d4f' : '1.5px solid #246bfd',
                  borderRadius: 14,
                  cursor: 'pointer',
                  boxShadow: careerLevel === 'senior' ? '0 2px 16px #ff4d4f55' : 'none',
                  transition: 'all 0.2s',
                }}
                styles={{ body: { padding: 16 } }}
                hoverable
              >
                <div style={{ fontWeight: 700, fontSize: 17 }}>Senior-level</div>
                <div style={{ color: '#ffccc7', fontSize: 15 }}>You have more than 10 years of relevant work experience.</div>
              </Card>
            </div>
          </div>
        );
      case 'review':
        return (
          <div style={{ marginTop: 32 }}>
            <Title level={4} style={{ color: '#246bfd' }}>Review Your Submission</Title>
            <Paragraph><b>Resume:</b> {cvFile ? cvFile.name : <span style={{ color: 'red' }}>Not uploaded</span>}</Paragraph>
            <Paragraph><b>Job Description:</b> {jobDesc ? jobDesc.substring(0, 100) + (jobDesc.length > 100 ? '...' : '') : <span style={{ color: 'red' }}>Not provided</span>}</Paragraph>
            <Paragraph><b>Name:</b> {personName || <span style={{ color: 'red' }}>Not provided</span>}</Paragraph>
            <Paragraph><b>Email:</b> {personEmail || <span style={{ color: 'red' }}>Not provided</span>}</Paragraph>
            <Paragraph><b>Career Level:</b> {careerLevel || <span style={{ color: 'red' }}>Not selected</span>}</Paragraph>
          </div>
        );
      default:
        return null;
    }
  };

  // Submission handler
  const handleSubmit = async () => {
    if (!cvFile || !jobDesc.trim() || !personName.trim() || !personEmail.trim() || !careerLevel) {
      message.error('Please complete all steps before submitting.');
      return;
    }
    setLoading(true);
    try {
      // First upload the CV
      const formData = new FormData();
      formData.append('cv', cvFile);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (!uploadRes.ok) throw new Error('Failed to upload CV');
      const uploadData = await uploadRes.json();

      // Now analyze the uploaded CV using Gemini endpoint
      const analyzeForm = new FormData();
      analyzeForm.append('cv', cvFile);
      analyzeForm.append('jobDesc', jobDesc);
      // Always send analysisType (default to 'ats')
      analyzeForm.append('analysisType', 'ats');
      const analyzeRes = await fetch('/api/analyze-cv-gemini', {
        method: 'POST',
        body: analyzeForm
      });
      const data = await analyzeRes.json();
      if (!analyzeRes.ok) {
        // Show backend error or raw output if available
        const errorMsg = data.message || 'Failed to analyze CV.';
        if (data.rawOutput) {
          message.error(`${errorMsg} (AI output: ${data.rawOutput.substring(0, 200)}...)`);
        } else {
          message.error(errorMsg);
        }
        setLoading(false);
        return;
      }

      // Save to sessionStorage for AnalyseMyCV
      if (data.analysis) {
        sessionStorage.setItem('quantumcv_analyzeResult', JSON.stringify(data.analysis));
      } else if (data.rawOutput) {
        sessionStorage.setItem('quantumcv_analyzeResult', data.rawOutput);
      } else {
        sessionStorage.setItem('quantumcv_analyzeResult', 'No analysis result.');
      }
      sessionStorage.setItem('quantumcv_cvFileName', uploadData.resume.filename || '');
      sessionStorage.setItem('quantumcv_cvOriginalName', uploadData.resume.originalname || cvFile.name);
      sessionStorage.setItem('quantumcv_cvFileUrl', uploadData.resume.filename ? `/uploads/${uploadData.resume.filename}` : '');

      // Save resume info to user profile after analysis
      if (data.analysis && uploadData.resume) {
        await fetch('/api/user/save-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({
            name: uploadData.resume.originalname || cvFile.name,
            score: data.analysis.atsScore || null,
            filePath: uploadData.resume.filename ? `/uploads/${uploadData.resume.filename}` : '',
            status: 'Analyzed'
          })
        });
      }

      message.success('Resume uploaded and analyzed! Redirecting to analysis...');
      setTimeout(() => {
        navigate('/analysemycv');
      }, 1000);
    } catch (err) {
      message.error('Failed to analyze CV. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#101522', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 900, width: '100%', borderRadius: 20, background: '#23263a', boxShadow: '0 8px 48px #246bfd55', padding: 40 }}>
        <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Upload Quantum Resume</Title>
        <Steps current={current} style={{ marginBottom: 40, maxWidth: 700, margin: '0 auto' }}>
          {steps.map((s, i) => <Step key={i} title={<span style={{ color: current === i ? '#246bfd' : '#b0b3c7' }}>{s.title}</span>} />)}
        </Steps>
        <div style={{ minHeight: 220, maxWidth: 700, margin: '0 auto' }}>{renderStepContent()}</div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0 || loading}
            style={{ borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '6px 32px', background: '#23263a', color: '#fff', border: 'none', boxShadow: '0 2px 12px #246bfd22' }}
          >
            Previous
          </Button>
          {current < steps.length - 1 ? (
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => setCurrent(current + 1)}
              disabled={
                (current === 0 && !cvFile) ||
                (current === 1 && !jobDesc.trim()) ||
                (current === 2 && (!personName.trim() || !personEmail.trim() || !careerLevel)) ||
                loading
              }
              style={{ borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '6px 32px', background: '#246bfd', border: 'none', boxShadow: '0 2px 12px #246bfd55' }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{ borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '6px 32px', background: '#246bfd', border: 'none', boxShadow: '0 2px 12px #246bfd55' }}
            >
              Submit & Analyze
            </Button>
          )}
        </div>
        {/* Show spinner overlaying the card content when loading */}
        <Spin spinning={loading} tip="Analyzing resume...">
          {/* The rest of the Card content is already rendered above */}
        </Spin>
      </Card>
    </div>
  );
}

export default UploadQuantumResume;
