import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;


const Product = () => (
  <Card style={{ margin: '32px 0', borderRadius: 16 }} styles={{ body: { padding: 24 } }}>
    <Title level={2}>Product</Title>
    <Paragraph>
      Welcome to the Product page! Here you can learn more about our AI-powered resume analyzer and optimizer, its features, and how it can help you land your dream job.
    </Paragraph>
  </Card>
);

export default Product;
