

import React, { useState } from 'react';
import { Typography, Upload, Button, message, Spin } from 'antd';
import { CloudUploadOutlined, DeleteOutlined, DownloadOutlined, PictureOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { AnimatedDots } from './HeroAnimations';

const { Title, Paragraph } = Typography;

const ImageBackgroundRemover = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (info) => {
    const img = info.file.originFileObj;
    setFile(img);
    setPreview(URL.createObjectURL(img));
    setResult(null);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleRemoveBg = async () => {
    if (!file) return message.error('Please upload an image first.');
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult(preview); // For demo, just use the same image
      setLoading(false);
      message.success('Background removed! (Demo)');
    }, 1800);
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = 'QuantumCV_Image_NoBG.png';
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #101522 60%, #246bfd 100%)', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <AnimatedDots />
      <div style={{
        background: 'rgba(24,28,42,0.92)',
        borderRadius: '32px',
        boxShadow: '0 8px 32px 0 #246bfd55, 0 1.5px 8px 0 #0008',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(36,107,253,0.18)',
        padding: '48px 32px',
        maxWidth: 700,
        width: '95%',
        color: '#fff',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        <Title level={1} style={{ color: '#ffe066', fontWeight: 900, letterSpacing: 1, marginBottom: 0, textShadow: '0 2px 12px #246bfd88' }}>Image Background Remover</Title>
        <Paragraph style={{ color: '#b0e1ff', fontSize: 18, margin: '16px 0 24px 0', fontWeight: 500 }}>
          Instantly remove the background from your profile or resume photo.<br />Get a clean, professional image in seconds!
        </Paragraph>
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
          disabled={!!file}
        >
          <Button icon={<CloudUploadOutlined />} size="large" style={{ borderRadius: 18, fontWeight: 700, marginBottom: 16, background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)', color: '#fff', boxShadow: '0 2px 12px #246bfd55' }} disabled={!!file}>
            Upload Image
          </Button>
        </Upload>
        {preview && (
          <div style={{ margin: '32px 0', textAlign: 'center', position: 'relative' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(120deg, #246bfd22 60%, #52c41a22 100%)',
              borderRadius: 24,
              boxShadow: '0 2px 16px #246bfd33',
              padding: 16,
              position: 'relative',
            }}>
              <img src={preview} alt="Preview" style={{ maxWidth: 240, maxHeight: 240, borderRadius: 18, boxShadow: '0 2px 16px #246bfd55', border: '2.5px solid #246bfd' }} />
              <div style={{ marginTop: 16 }}>
                <Button icon={<DeleteOutlined />} danger onClick={handleRemove} style={{ borderRadius: 12, marginRight: 8, fontWeight: 700 }}>Remove</Button>
                <Button type="primary" icon={<PictureOutlined />} onClick={handleRemoveBg} style={{ borderRadius: 12, fontWeight: 700, background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)', color: '#fff', boxShadow: '0 2px 12px #246bfd55' }} loading={loading}>
                  Remove Background
                </Button>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <Spin size="large" tip="Processing..." />
          </div>
        )}
        {result && (
          <div style={{ margin: '32px 0', textAlign: 'center', position: 'relative' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(120deg, #52c41a22 60%, #246bfd22 100%)',
              borderRadius: 24,
              boxShadow: '0 2px 16px #52c41a33',
              padding: 16,
              position: 'relative',
            }}>
              <Paragraph style={{ color: '#52c41a', fontWeight: 700, fontSize: 18, marginBottom: 8, textShadow: '0 2px 8px #52c41a55' }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} /> Image ready!
              </Paragraph>
              <img src={result} alt="No BG" style={{ maxWidth: 240, maxHeight: 240, borderRadius: 18, boxShadow: '0 2px 16px #52c41a55', border: '2.5px solid #52c41a' }} />
              <div style={{ marginTop: 16 }}>
                <Button type="primary" icon={<DownloadOutlined />} size="large" style={{ borderRadius: 16, fontWeight: 700, background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)', color: '#fff', boxShadow: '0 2px 12px #246bfd55' }} onClick={handleDownload}>
                  Download Image
                </Button>
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: 40, marginBottom: 0 }}>
          <Card style={{ background: '#fffbe6', borderRadius: 18, color: '#181c2a', boxShadow: '0 2px 12px #ffe06655', textAlign: 'center', display: 'inline-block', minWidth: 320 }}>
            <PictureOutlined style={{ fontSize: 32, color: '#246bfd', marginBottom: 8 }} />
            <Paragraph style={{ fontSize: 16, margin: 0 }}>
              <b>Pro Tip:</b> Use a high-quality, well-lit photo for best results. Supported formats: JPG, PNG.
            </Paragraph>
          </Card>
        </div>
        <div style={{ position: 'absolute', right: -60, bottom: -60, opacity: 0.10, pointerEvents: 'none', zIndex: 0 }}>
          <img src={process.env.PUBLIC_URL + '/cv-with-robot.png'} alt="Creative Robot" style={{ maxWidth: 220, filter: 'drop-shadow(0 2px 16px #246bfd)' }} />
        </div>
      </div>
    </div>
  );
};

export default ImageBackgroundRemover;
