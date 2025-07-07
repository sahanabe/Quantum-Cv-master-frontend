import React, { useState, useRef, useEffect } from 'react';
import {
  Card, Button, Row, Col, Table, Tag, Avatar, Typography, Statistic, Select, Input, Space, Dropdown, Menu, Modal, Form, Switch, Tabs, Timeline, List, Divider, Alert, Tooltip, Drawer, Calendar, Progress, Badge
} from 'antd';
import {
  TeamOutlined, UserOutlined, SettingOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MoreOutlined, BarChartOutlined, ProjectOutlined, CalendarOutlined, LockOutlined, ApiOutlined, BellOutlined, RocketOutlined, CloudOutlined, UserAddOutlined, SearchOutlined, DashboardOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'HR Manager', department: 'HR', status: 'Active', lastLogin: '2 hours ago', permissions: ['view_all', 'edit_candidates'] },
  { id: 2, name: 'Mike Chen', email: 'mike@company.com', role: 'Recruiter', department: 'Talent', status: 'Active', lastLogin: '5 min ago', permissions: ['view_assigned'] },
  { id: 3, name: 'Emily Davis', email: 'emily@company.com', role: 'Team Lead', department: 'Engineering', status: 'Inactive', lastLogin: '2 days ago', permissions: ['view_tech'] }
];
const mockProjects = [
  { id: 1, name: 'AI Resume Parser', status: 'In Progress', members: ['Sarah', 'Mike'], progress: 70 },
  { id: 2, name: 'Bulk Hiring Drive', status: 'Completed', members: ['Emily'], progress: 100 },
  { id: 3, name: 'Onboarding Automation', status: 'Pending', members: ['Mike'], progress: 10 }
];
const mockIntegrations = [
  { id: 1, name: 'Slack', icon: <CloudOutlined /> },
  { id: 2, name: 'Google Calendar', icon: <CalendarOutlined /> },
  { id: 3, name: 'Greenhouse', icon: <ApiOutlined /> }
];
const mockTimeline = [
  { color: 'green', children: 'Bulk resume upload completed' },
  { color: 'blue', children: 'New user invited: emily@company.com' },
  { color: 'red', children: 'Failed login attempt detected' },
  { color: 'gray', children: 'Company profile updated' }
];
const mockNotifications = [
  { id: 1, message: 'Interview scheduled for John Doe', time: '5 min ago' },
  { id: 2, message: 'New integration: Slack connected', time: '1 hr ago' }
];

export default function MultiUserDashboard() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [projects] = useState(mockProjects);
  const [integrations] = useState(mockIntegrations);
  const [notifications] = useState(mockNotifications);
  const [timeline] = useState(mockTimeline);
  const canvasRef = useRef(null);

  // Animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: '#00B894'
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // Table columns for Team Management
  const userColumns = [
    { title: 'User', dataIndex: 'name', key: 'name', render: (text, record) => (
      <Space>
        <Avatar size={40} style={{ backgroundColor: '#00B894' }}>{text.split(' ').map(n => n[0]).join('')}</Avatar>
        <div>
          <div style={{ color: '#fff', fontWeight: 'bold' }}>{text}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{record.email}</div>
        </div>
      </Space>
    ) },
    { title: 'Role', dataIndex: 'role', key: 'role', render: text => <Tag color="blue">{text}</Tag> },
    { title: 'Department', dataIndex: 'department', key: 'department', render: text => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{text}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> },
    { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin', render: text => <span style={{ color: 'rgba(255,255,255,0.7)' }}>{text}</span> },
    { title: 'Actions', key: 'actions', render: (_, record) => (
      <Dropdown overlay={<Menu>
        <Menu.Item key="view" icon={<EyeOutlined />}>View Details</Menu.Item>
        <Menu.Item key="edit" icon={<EditOutlined />}>Edit User</Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />} danger>Remove User</Menu.Item>
      </Menu>}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ) }
  ];

  // Project columns
  const projectColumns = [
    { title: 'Project', dataIndex: 'name', key: 'name', render: (text, record) => <span style={{ color: '#fff', fontWeight: 500 }}>{text}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'orange'}>{status}</Tag> },
    { title: 'Members', dataIndex: 'members', key: 'members', render: members => <Avatar.Group maxCount={3}>{members.map(m => <Avatar key={m}>{m[0]}</Avatar>)}</Avatar.Group> },
    { title: 'Progress', dataIndex: 'progress', key: 'progress', render: progress => <Progress percent={progress} size="small" /> },
    { title: 'Actions', key: 'actions', render: () => <Button size="small" icon={<EyeOutlined />}>View</Button> }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '60px 0 60px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Card style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 32, marginBottom: 32, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <Row gutter={32} align="middle">
              <Col xs={24} md={16}>
                <Title level={1} style={{ color: '#fff', fontWeight: 900, fontSize: 48, marginBottom: 0 }}>{t('Welcome')}</Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20 }}>{t('All-in-one workspace for your team, hiring, analytics, and more.')}</Text>
              </Col>
              <Col xs={24} md={8} style={{ textAlign: 'right' }}>
                <Button type="primary" icon={<PlusOutlined />} size="large" style={{ background: 'linear-gradient(135deg, #00B894, #00CEC9)', border: 'none', borderRadius: 20 }} onClick={() => setModalVisible(true)}>{t('Invite User')}</Button>
              </Col>
            </Row>
          </Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" size="large" style={{ marginBottom: 32, color: '#fff' }}>
            <TabPane tab={<span><DashboardOutlined /> Overview</span>} key="overview">
              <Row gutter={32}>
                <Col xs={24} md={16}>
                                     <Card bordered={false} style={{ marginBottom: 24, background: 'rgba(255,255,255,0.03)' }}>
                     <Row gutter={32}>
                       <Col span={8}><Statistic title={<span style={{ color: '#fff' }}>{t('Active Users')}</span>} value={47} valueStyle={{ color: '#00B894' }} /></Col>
                       <Col span={8}><Statistic title={<span style={{ color: '#fff' }}>{t('Projects')}</span>} value={12} valueStyle={{ color: '#00CEC9' }} /></Col>
                       <Col span={8}><Statistic title={<span style={{ color: '#fff' }}>{t('Integrations')}</span>} value={5} valueStyle={{ color: '#0984e3' }} /></Col>
                     </Row>
                   </Card>
                  <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <Title level={4} style={{ color: '#fff' }}>{t('Activity Timeline')}</Title>
                    <Timeline items={timeline} />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card bordered={false} style={{ marginBottom: 24, background: 'rgba(255,255,255,0.03)' }}>
                    <Title level={4} style={{ color: '#fff' }}>{t('Notifications')}</Title>
                    <List dataSource={notifications} renderItem={item => (
                      <List.Item>
                        <List.Item.Meta avatar={<BellOutlined style={{ color: '#00B894', fontSize: 20 }} />} title={<span style={{ color: '#fff' }}>{item.message}</span>} description={<span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.time}</span>} />
                      </List.Item>
                    )} />
                  </Card>
                  <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <Title level={4} style={{ color: '#fff' }}>{t('Quick Actions')}</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Button icon={<UserAddOutlined />} block>{t('Invite New User')}</Button>
                      <Button icon={<ProjectOutlined />} block>{t('Start New Project')}</Button>
                      <Button icon={<CloudOutlined />} block>{t('Connect Integration')}</Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={<span><TeamOutlined /> Team Management</span>} key="team">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                                 <Row gutter={16} style={{ marginBottom: 16 }}>
                   <Col xs={24} sm={8}><Input prefix={<SearchOutlined />} placeholder={t('Search users...')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} /></Col>
                   <Col xs={24} sm={8}><Select placeholder={t('Filter by role')} style={{ width: '100%' }}><Option value="all">{t('All Roles')}</Option><Option value="admin">{t('Admin')}</Option><Option value="manager">{t('Manager')}</Option><Option value="recruiter">{t('Recruiter')}</Option></Select></Col>
                   <Col xs={24} sm={8}><Select placeholder={t('Filter by status')} style={{ width: '100%' }}><Option value="all">{t('All Status')}</Option><Option value="active">{t('Active')}</Option><Option value="inactive">{t('Inactive')}</Option></Select></Col>
                 </Row>
                <Table columns={userColumns} dataSource={users} rowKey="id" style={{ background: 'transparent' }} pagination={{ style: { color: '#fff' } }} />
              </Card>
            </TabPane>
            <TabPane tab={<span><BarChartOutlined /> Analytics</span>} key="analytics">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                <Title level={4} style={{ color: '#fff' }}>{t('Hiring & Engagement Analytics')}</Title>
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 24 }}>
                  [Charts Placeholder]
                </div>
              </Card>
            </TabPane>
            <TabPane tab={<span><ProjectOutlined /> Projects</span>} key="projects">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                <Table columns={projectColumns} dataSource={projects} rowKey="id" style={{ background: 'transparent' }} />
              </Card>
            </TabPane>
            <TabPane tab={<span><CalendarOutlined /> Scheduling</span>} key="scheduling">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                <Calendar fullscreen={false} style={{ background: 'rgba(255,255,255,0.03)' }} />
                <Divider />
                <List header={<div style={{ color: '#fff' }}>{t('Upcoming Events')}</div>} dataSource={[{ title: 'Interview: John Doe', date: '2024-06-10' }, { title: 'Team Meeting', date: '2024-06-12' }]} renderItem={item => <List.Item><span style={{ color: '#fff' }}>{item.title}</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.date}</span></List.Item>} />
              </Card>
            </TabPane>
            <TabPane tab={<span><LockOutlined /> Security</span>} key="security">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                <Title level={4} style={{ color: '#fff' }}>{t('Access Logs')}</Title>
                <List dataSource={[{ user: 'Sarah', action: 'Login', time: '2 hours ago' }, { user: 'Mike', action: '2FA Enabled', time: '1 day ago' }]} renderItem={item => <List.Item><span style={{ color: '#fff' }}>{item.user}</span> <span style={{ color: '#00B894', margin: '0 8px' }}>{item.action}</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.time}</span></List.Item>} />
                <Divider />
                <Alert message={t('2FA is enabled for all admins.')} type="success" showIcon style={{ marginBottom: 16 }} />
                <Button icon={<SettingOutlined />}>{t('Manage Permissions')}</Button>
              </Card>
            </TabPane>
            <TabPane tab={<span><ApiOutlined /> Integrations</span>} key="integrations">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                <List itemLayout="horizontal" dataSource={integrations} renderItem={item => <List.Item actions={[<Button danger size="small">{t('Remove')}</Button>]}><List.Item.Meta avatar={item.icon} title={<span style={{ color: '#fff' }}>{item.name}</span>} /></List.Item>} />
                <Divider />
                <Button icon={<PlusOutlined />}>{t('Add Integration')}</Button>
              </Card>
            </TabPane>
            <TabPane tab={<span><SettingOutlined /> Settings</span>} key="settings">
              <Card bordered={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
                <Title level={4} style={{ color: '#fff' }}>{t('Company Profile')}</Title>
                <Form layout="vertical" style={{ maxWidth: 400 }}>
                  <Form.Item label={t('Company Name')}><Input defaultValue="Quantum Corp" /></Form.Item>
                  <Form.Item label={t('Industry')}><Input defaultValue="Technology" /></Form.Item>
                  <Form.Item label={t('Location')}><Input defaultValue="San Francisco, CA" /></Form.Item>
                  <Form.Item label={t('Contact Email')}><Input defaultValue="admin@company.com" /></Form.Item>
                  <Form.Item><Button type="primary">{t('Save Changes')}</Button></Form.Item>
                </Form>
                <Divider />
                <Button onClick={() => setDrawerVisible(true)}>{t('Send Feedback')}</Button>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </div>
             <Modal 
         title={t('Invite New User')} 
         open={modalVisible} 
         onCancel={() => setModalVisible(false)} 
         footer={null}
         styles={{
           content: {
             background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
             backdropFilter: 'blur(30px)',
             borderRadius: '24px',
             border: '1px solid rgba(255,255,255,0.1)'
           }
         }}
       >
        <Form layout="vertical">
          <Form.Item label={t('Full Name')} required><Input placeholder={t('Enter full name')} /></Form.Item>
          <Form.Item label={t('Email')} required><Input placeholder={t('Enter email address')} /></Form.Item>
          <Form.Item label={t('Role')} required><Select placeholder={t('Select role')}><Option value="admin">{t('Administrator')}</Option><Option value="manager">{t('HR Manager')}</Option><Option value="recruiter">{t('Recruiter')}</Option><Option value="interviewer">{t('Interviewer')}</Option></Select></Form.Item>
          <Form.Item label={t('Department')}><Select placeholder={t('Select department')}><Option value="hr">{t('Human Resources')}</Option><Option value="engineering">{t('Engineering')}</Option><Option value="sales">{t('Sales')}</Option><Option value="marketing">{t('Marketing')}</Option></Select></Form.Item>
          <Form.Item><Space><Switch /> {t('Send invitation email')}</Space></Form.Item>
          <Form.Item><Space><Button type="primary">{t('Create User')}</Button><Button onClick={() => setModalVisible(false)}>{t('Cancel')}</Button></Space></Form.Item>
        </Form>
      </Modal>
             <Drawer 
         title={t('Feedback')} 
         open={drawerVisible} 
         onClose={() => setDrawerVisible(false)} 
         width={400}
         styles={{
           content: {
             background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
             backdropFilter: 'blur(30px)'
           }
         }}
       >
         <Form layout="vertical">
           <Form.Item label={t('Your Feedback')}><Input.TextArea rows={5} placeholder={t('Share your thoughts...')} /></Form.Item>
           <Form.Item><Button type="primary" block>{t('Submit')}</Button></Form.Item>
         </Form>
       </Drawer>

       {/* Global Styles for White Text */}
       <style>{`
         .ant-tabs-tab {
           color: rgba(255, 255, 255, 0.7) !important;
         }
         
         .ant-tabs-tab-active {
           color: #fff !important;
         }
         
         .ant-tabs-ink-bar {
           background: linear-gradient(135deg, #00B894, #00CEC9) !important;
         }
         
         .ant-input, .ant-input-password {
           background: rgba(255,255,255,0.1) !important;
           border: 1px solid rgba(255,255,255,0.2) !important;
           color: #fff !important;
         }
         
         .ant-input::placeholder,
         .ant-input-password input::placeholder {
           color: rgba(255,255,255,0.5) !important;
         }
         
         .ant-select .ant-select-selector {
           background: rgba(255,255,255,0.1) !important;
           border: 1px solid rgba(255,255,255,0.2) !important;
           color: #fff !important;
         }
         
         .ant-select-selection-item {
           color: #fff !important;
         }
         
         .ant-select-selection-placeholder {
           color: rgba(255,255,255,0.5) !important;
         }
         
         .ant-table {
           background: transparent !important;
         }
         
         .ant-table-thead > tr > th {
           background: rgba(255,255,255,0.05) !important;
           color: #fff !important;
           border-bottom: 1px solid rgba(255,255,255,0.1) !important;
         }
         
         .ant-table-tbody > tr > td {
           background: transparent !important;
           border-bottom: 1px solid rgba(255,255,255,0.05) !important;
         }
         
         .ant-table-tbody > tr:hover > td {
           background: rgba(255,255,255,0.05) !important;
         }
         
         .ant-pagination-item {
           background: rgba(255,255,255,0.1) !important;
           border: 1px solid rgba(255,255,255,0.2) !important;
         }
         
         .ant-pagination-item a {
           color: #fff !important;
         }
         
         .ant-pagination-item-active {
           background: linear-gradient(135deg, #00B894, #00CEC9) !important;
           border-color: #00B894 !important;
         }
         
         .ant-pagination-prev button,
         .ant-pagination-next button {
           color: #fff !important;
         }
         
         .ant-form-item-label > label {
           color: #fff !important;
         }
         
         .ant-modal-title {
           color: #fff !important;
         }
         
         .ant-drawer-title {
           color: #fff !important;
         }
         
         .ant-calendar {
           background: rgba(255,255,255,0.03) !important;
         }
         
         .ant-calendar-header {
           background: rgba(255,255,255,0.05) !important;
         }
         
         .ant-calendar-date {
           color: #fff !important;
         }
         
         .ant-calendar-date:hover {
           background: rgba(255,255,255,0.1) !important;
         }
         
         .ant-calendar-today .ant-calendar-date {
           border-color: #00B894 !important;
         }
         
         .ant-list-item {
           border-bottom: 1px solid rgba(255,255,255,0.1) !important;
         }
         
         .ant-timeline-item-content {
           color: #fff !important;
         }
         
         .ant-statistic-title {
           color: rgba(255,255,255,0.7) !important;
         }
         
         .ant-card-head-title {
           color: #fff !important;
         }
         
         .ant-menu {
           background: rgba(15,15,35,0.95) !important;
           border: 1px solid rgba(255,255,255,0.1) !important;
         }
         
         .ant-menu-item {
           color: #fff !important;
         }
         
         .ant-menu-item:hover {
           background: rgba(255,255,255,0.1) !important;
         }
         
         .ant-dropdown-menu {
           background: rgba(15,15,35,0.95) !important;
           border: 1px solid rgba(255,255,255,0.1) !important;
         }
         
         .ant-dropdown-menu-item {
           color: #fff !important;
         }
         
         .ant-dropdown-menu-item:hover {
           background: rgba(255,255,255,0.1) !important;
         }
       `}</style>
     </div>
   );
 } 