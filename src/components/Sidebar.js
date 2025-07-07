import React from 'react';
import { Menu, Typography } from 'antd';

const { Title } = Typography;



import { UserOutlined, AppstoreOutlined, TeamOutlined, SettingOutlined, BarChartOutlined, MessageOutlined, FileTextOutlined } from '@ant-design/icons';

const items = [
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: 'applications',
    icon: <AppstoreOutlined />,
    label: 'Applications',
  },
  {
    key: 'jobs',
    icon: <TeamOutlined />,
    label: 'Jobs',
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: 'Analytics',
  },
  {
    key: 'messages',
    icon: <MessageOutlined />,
    label: 'Messages',
  },
  {
    key: 'reports',
    icon: <FileTextOutlined />,
    label: 'Reports',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

const Sidebar = ({ selectedKey, onSelect }) => (
  <aside style={{ minWidth: 220, background: '#181c2a', color: '#fff', padding: '32px 0 0 0', height: '100vh', position: 'sticky', top: 0 }}>
    <div style={{ padding: '0 24px', marginBottom: 32 }}>
      <Title level={4} style={{ color: '#246bfd', margin: 0 }}>Admin Panel</Title>
    </div>
    <div style={{ padding: '0 24px', marginBottom: 16 }}>
      <button
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 16,
          fontWeight: 700,
          fontSize: 16,
          padding: '12px 0',
          marginBottom: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 12px #246bfd44',
          letterSpacing: 1
        }}
        onClick={() => onSelect('user-resumes')}
      >
        Upload Resume
      </button>
    </div>
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
      onClick={({ key }) => onSelect(key)}
      items={items}
      style={{ background: 'transparent', color: '#fff', borderRight: 0, fontWeight: 600, fontSize: 16 }}
    />
  </aside>
);

export default Sidebar;
