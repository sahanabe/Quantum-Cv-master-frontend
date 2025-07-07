import React, { useState } from 'react';
import { Card, Typography, Upload, Button, message } from 'antd';
import { InboxOutlined, FilePdfOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

const ImageToPdfConverter = () => {
  const [fileList, setFileList] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const props = {
    name: 'images',
    multiple: true,
    accept: '.jpg,.jpeg,.png,.bmp,.gif',
    fileList,
    beforeUpload: file => {
      setFileList(prev => [...prev, file]);
      return false;
    },
    onRemove: file => {
      setFileList(prev => prev.filter(f => f.uid !== file.uid));
    },
    showUploadList: true,
  };

  const handleConvert = async () => {
    if (fileList.length === 0) {
      message.warning('Please select at least one image.');
      return;
    }
    setLoading(true);
    try {
      // Convert images to PDF client-side using jsPDF
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF();
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const imgData = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, 10, 190, 277);
      }
      const pdfBlob = pdf.output('blob');
      setPdfUrl(URL.createObjectURL(pdfBlob));
      message.success('PDF created!');
    } catch (err) {
      message.error('Failed to convert images to PDF.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '48px auto', padding: '0 16px' }}>
      <Card style={{ borderRadius: 18, boxShadow: '0 4px 24px #246bfd22', padding: 32 }}>
        <Title level={2} style={{ color: '#246bfd', marginBottom: 12 }}>
          Image to PDF Converter
        </Title>
        <Paragraph style={{ color: '#333', marginBottom: 24 }}>
          Upload one or more images (JPG, PNG, etc.) and instantly convert them into a single PDF file. No signup required!
        </Paragraph>
        <Dragger {...props} style={{ marginBottom: 24 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#246bfd', fontSize: 36 }} />
          </p>
          <p className="ant-upload-text" style={{ color: '#246bfd', fontWeight: 600 }}>
            Click or drag image files to this area to upload
          </p>
          <p className="ant-upload-hint" style={{ color: '#888' }}>
            Supported formats: JPG, PNG, BMP, GIF. You can select multiple images.
          </p>
        </Dragger>
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          style={{ borderRadius: 14, fontWeight: 700, width: '100%', marginBottom: 16 }}
          loading={loading}
          onClick={handleConvert}
        >
          Convert to PDF
        </Button>
        {pdfUrl && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href={pdfUrl} download="converted.pdf">
              <Button type="primary" style={{ borderRadius: 14, fontWeight: 700 }} icon={<FilePdfOutlined />}>Download PDF</Button>
            </a>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageToPdfConverter;
