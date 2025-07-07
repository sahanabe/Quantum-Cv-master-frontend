import React from 'react';
import { Card, Avatar, Typography, Button, Divider } from 'antd';
import { UserOutlined, EditOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MyAccount = ({ user, onEdit }) => {
  const safeUser = user && typeof user === 'object' ? user : {};
  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Card style={{ borderRadius: 18, boxShadow: '0 4px 24px #246bfd22', padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <Avatar size={96} icon={<UserOutlined />} style={{ background: '#246bfd', marginBottom: 12 }} />
          <Title level={3} style={{ marginBottom: 0, textAlign: 'center' }}>
            {(safeUser.firstName || safeUser.lastName)
              ? `${safeUser.firstName || ''} ${safeUser.lastName || ''}`.trim()
              : safeUser.email || 'User'}
          </Title>
          <Text type="secondary" style={{ fontSize: 16, marginBottom: 8 }}>
            <MailOutlined /> {safeUser.email || 'No email'}
          </Text>
        </div>
        <Divider />
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Button type="primary" icon={<EditOutlined />} onClick={onEdit} disabled>
            Edit Profile
          </Button>
        </div>
        <div style={{ color: '#b0b3c7', fontSize: 15, textAlign: 'center' }}>
          <p>Welcome to your account page! Here you can view your profile details. (Editing coming soon)</p>
        </div>
      </Card>
    </div>
  );
};

export default MyAccount;
