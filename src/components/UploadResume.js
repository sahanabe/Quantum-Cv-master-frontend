import React, { useState } from 'react';
import { Card, Typography, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const UploadResume = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwtToken');

  const handleCustomRequest = async ({ file }) => {
    const formData = new FormData();
    formData.append('cv', file);

    setUploading(true);

    try {
      const res = await fetch('http://localhost:5000/api/analyze-cv', {
        method: 'POST',
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : undefined,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      sessionStorage.setItem('quantumcv_analyzeResult', JSON.stringify(data.analysis));
      sessionStorage.setItem('quantumcv_cvFileName', data.file.filename);
      sessionStorage.setItem('quantumcv_cvOriginalName', data.file.originalname);
      sessionStorage.setItem('quantumcv_cvFileUrl', `/uploads/${data.file.filename}`);

      message.success('Resume uploaded and analyzed!');
      navigate('/analyse-my-cv');
    } catch (err) {
      console.error(err);
      message.error('Failed to upload and analyze CV.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '48px auto' }}>
      <Card style={{ borderRadius: 16 }}>
        <Title level={2}>Upload Your Resume</Title>
        <Paragraph>
          Upload your resume in PDF or DOCX format for AI-powered analysis.
        </Paragraph>
        <Upload
          customRequest={handleCustomRequest}
          showUploadList={false}
          beforeUpload={(file) => {
            const isPdfOrDocx =
              file.type === 'application/pdf' ||
              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            if (!isPdfOrDocx) {
              message.error('Only PDF or DOCX files are allowed.');
            }
            return isPdfOrDocx || Upload.LIST_IGNORE;
          }}
        >
          <Button type="primary" icon={<UploadOutlined />} loading={uploading}>
            Click to Upload
          </Button>
        </Upload>
      </Card>
    </div>
  );
};

export default UploadResume;
