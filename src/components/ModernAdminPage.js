import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Avatar,
  Tag,
  Progress,
  Badge,
  Tooltip,
  Drawer,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Space,
  Divider,
  message,
  Popconfirm,
  Alert,
  Timeline,
  Tabs,
  Rate,
  Upload,
  Radio
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  SafetyOutlined,
  RocketOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  ApiOutlined,
  CloudOutlined,
  DatabaseOutlined,
  MonitorOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  StarFilled,
  HeartFilled,
  TrophyFilled,
  FireFilled,
  BulbOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  SyncOutlined,
  ReloadOutlined,
  ThunderboltFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const ModernAdminPage = ({ token, loggedInUser, setLoggedInUser, setToken }) => {
  // State Management
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});
  
  // Modal States
  const [addUserModal, setAddUserModal] = useState(false);
  const [addJobModal, setAddJobModal] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bulkActionsModal, setBulkActionsModal] = useState(false);
  
  // Form instances
  const [userForm] = Form.useForm();
  const [jobForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  
  // Refs and other states
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const dashboardRef = useRef(null);

  // Particle animation state
  const [particles, setParticles] = useState([]);

  // Additional states
  const [selectedSection, setSelectedSection] = useState('overview');
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [verificationModal, setVerificationModal] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState(null);

  // System Analytics states
  const [systemLogs, setSystemLogs] = useState([]);
  const [errorLogs, setErrorLogs] = useState([]);
  const [userActivityLogs, setUserActivityLogs] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [systemSettings, setSystemSettings] = useState({});
  const [backupStatus, setBackupStatus] = useState({});
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [apiUsage, setApiUsage] = useState({});
  const [databaseMetrics, setDatabaseMetrics] = useState({});
  const [logFilter, setLogFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [exportModal, setExportModal] = useState(false);

  // Initialize particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100
      })));
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
    fetchJobs();
    fetchApplications();
    fetchNotifications();
    fetchRecentActivity();
    fetchSystemHealth();
    fetchPendingVerifications();
    
    // Fetch system analytics data
    fetchSystemLogs();
    fetchErrorLogs();
    fetchUserActivityLogs();
    fetchPerformanceMetrics();
    fetchSystemSettings();
    fetchBackupStatus();
    fetchSecurityAlerts();
    fetchApiUsage();
    fetchDatabaseMetrics();
  }, [token]);

  // Real-time updates
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        fetchDashboardData();
        fetchRecentActivity();
        fetchSystemHealth();
        fetchBackupStatus(); // Add backup status to real-time updates
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates, token]);

  // Real-time backup status simulation
  useEffect(() => {
    if (realTimeUpdates && backupStatus.status === 'in_progress') {
      const progressInterval = setInterval(() => {
        setBackupStatus(prev => {
          if (prev.progress && prev.progress < 100) {
            const newProgress = Math.min(prev.progress + Math.random() * 5, 100);
            const newStatus = newProgress >= 100 ? 'completed' : 'in_progress';
            return {
              ...prev,
              progress: newProgress,
              status: newStatus,
              lastCheck: new Date().toISOString()
            };
          }
          return prev;
        });
      }, 2000); // Update progress every 2 seconds

      return () => clearInterval(progressInterval);
    }
  }, [realTimeUpdates, backupStatus.status]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/dashboard-stats', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setDashboardStats(data);
      } else {
        // Mock data for demo
        setDashboardStats({
          totalUsers: 1247,
          totalJobs: 89,
          totalApplications: 3421,
          activeUsers: 156,
          revenue: 45600,
          conversion: 23.4,
          satisfaction: 4.8,
          systemUptime: 99.9
        });
      }
    } catch (error) {
      // Mock data for demo
      setDashboardStats({
        totalUsers: 1247,
        totalJobs: 89,
        totalApplications: 3421,
        activeUsers: 156,
        revenue: 45600,
        conversion: 23.4,
        satisfaction: 4.8,
        systemUptime: 99.9
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/applications', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchNotifications = async () => {
    // Mock notifications for demo
    setNotifications([
      { id: 1, type: 'success', title: 'New User Registration', message: 'John Doe has registered', time: '2 minutes ago' },
      { id: 2, type: 'warning', title: 'High Server Load', message: 'CPU usage at 85%', time: '15 minutes ago' },
      { id: 3, type: 'info', title: 'Backup Completed', message: 'Daily backup successful', time: '1 hour ago' },
      { id: 4, type: 'error', title: 'Payment Failed', message: 'Stripe webhook error', time: '2 hours ago' }
    ]);
  };

  const fetchRecentActivity = async () => {
    // Mock recent activity for demo
    setRecentActivity([
      { id: 1, user: 'Sarah Chen', action: 'Applied for Senior Developer position', time: '5 minutes ago', type: 'application' },
      { id: 2, user: 'Michael Ross', action: 'Updated profile information', time: '12 minutes ago', type: 'profile' },
      { id: 3, user: 'Admin', action: 'Added new job posting for Product Manager', time: '25 minutes ago', type: 'job' },
      { id: 4, user: 'Emma Wilson', action: 'Completed resume analysis', time: '34 minutes ago', type: 'analysis' },
      { id: 5, user: 'David Kim', action: 'Downloaded application report', time: '1 hour ago', type: 'download' }
    ]);
  };

  const fetchSystemHealth = async () => {
    // Mock system health data for demo
    setSystemHealth({
      cpuUsage: Math.floor(Math.random() * 30) + 40,
      memoryUsage: Math.floor(Math.random() * 25) + 45,
      diskUsage: Math.floor(Math.random() * 20) + 60,
      networkLatency: Math.floor(Math.random() * 10) + 15,
      activeConnections: Math.floor(Math.random() * 50) + 150,
      uptime: '15 days, 4 hours'
    });
  };

  // Company verification functions
  const fetchPendingVerifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/pending-verifications', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setPendingVerifications(data.pendingCompanies || []);
      }
    } catch (error) {
      console.error('Error fetching pending verifications:', error);
      message.error('Failed to fetch pending verifications');
    }
  };

  const handleVerification = async (userId, status, notes = '') => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/admin/verify-company/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ status, notes })
      });

      if (res.ok) {
        const data = await res.json();
        message.success(data.message);
        fetchPendingVerifications(); // Refresh the list
        fetchUsers(); // Refresh users list
        setVerificationModal(false);
        setSelectedVerification(null);
      } else {
        const data = await res.json();
        message.error(data.message || 'Failed to update verification');
      }
    } catch (error) {
      console.error('Error updating verification:', error);
      message.error('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchDashboardData(),
      fetchUsers(),
      fetchJobs(),
      fetchApplications(),
      fetchRecentActivity(),
      fetchSystemHealth()
    ]);
    setRefreshing(false);
    message.success('Data refreshed successfully!');
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Logout Confirmation',
      content: 'Are you sure you want to logout from admin panel?',
      okText: 'Logout',
      cancelText: 'Cancel',
      onOk: () => {
        setLoggedInUser(null);
        setToken(null);
        navigate('/');
        message.success('Logged out successfully!');
      }
    });
  };

  const handleAddUser = async (values) => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(values)
      });
      
      if (res.ok) {
        message.success('User added successfully!');
        setAddUserModal(false);
        userForm.resetFields();
        fetchUsers();
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      message.error('Failed to add user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      if (res.ok) {
        message.success('User deleted successfully!');
        fetchUsers();
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      message.error('Failed to delete user: ' + error.message);
    }
  };

  // System Analytics functions
  const fetchSystemLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/system-logs', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setSystemLogs(data);
      } else {
        // Mock data for demo
        setSystemLogs([
          { id: 1, level: 'info', message: 'System backup completed successfully', timestamp: '2024-01-15T10:30:00Z', service: 'backup' },
          { id: 2, level: 'warning', message: 'High CPU usage detected', timestamp: '2024-01-15T10:25:00Z', service: 'monitoring' },
          { id: 3, level: 'error', message: 'Database connection timeout', timestamp: '2024-01-15T10:20:00Z', service: 'database' },
          { id: 4, level: 'info', message: 'New user registration', timestamp: '2024-01-15T10:15:00Z', service: 'auth' },
          { id: 5, level: 'info', message: 'API rate limit reached', timestamp: '2024-01-15T10:10:00Z', service: 'api' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching system logs:', error);
    }
  };

  const fetchErrorLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/error-logs', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setErrorLogs(data);
      } else {
        // Mock data for demo
        setErrorLogs([
          { id: 1, error: 'Database connection failed', stack: 'Error: Connection timeout...', timestamp: '2024-01-15T10:20:00Z', severity: 'high' },
          { id: 2, error: 'API authentication failed', stack: 'Error: Invalid token...', timestamp: '2024-01-15T10:18:00Z', severity: 'medium' },
          { id: 3, error: 'File upload failed', stack: 'Error: File too large...', timestamp: '2024-01-15T10:15:00Z', severity: 'low' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching error logs:', error);
    }
  };

  const fetchUserActivityLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/user-activity', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setUserActivityLogs(data);
      } else {
        // Mock data for demo
        setUserActivityLogs([
          { id: 1, userId: 'user123', action: 'login', ip: '192.168.1.100', timestamp: '2024-01-15T10:30:00Z', userAgent: 'Chrome/120.0' },
          { id: 2, userId: 'user456', action: 'upload_resume', ip: '192.168.1.101', timestamp: '2024-01-15T10:25:00Z', userAgent: 'Firefox/119.0' },
          { id: 3, userId: 'user789', action: 'apply_job', ip: '192.168.1.102', timestamp: '2024-01-15T10:20:00Z', userAgent: 'Safari/17.0' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching user activity logs:', error);
    }
  };

  const fetchPerformanceMetrics = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/performance-metrics', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setPerformanceMetrics(data);
      } else {
        // Mock data for demo
        setPerformanceMetrics({
          cpuUsage: 45.2,
          memoryUsage: 67.8,
          diskUsage: 23.4,
          networkLatency: 12.5,
          responseTime: 245,
          uptime: 99.8,
          activeConnections: 156,
          requestsPerMinute: 234
        });
      }
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
    }
  };

  const fetchSystemSettings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/system-settings', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setSystemSettings(data);
        settingsForm.setFieldsValue(data);
      } else {
        // Mock data for demo
        const mockSettings = {
          maintenanceMode: false,
          autoBackup: true,
          backupFrequency: 'daily',
          maxFileSize: 10,
          sessionTimeout: 30,
          emailNotifications: true,
          securityLevel: 'high',
          apiRateLimit: 1000,
          logRetention: 30,
          debugMode: false
        };
        setSystemSettings(mockSettings);
        settingsForm.setFieldsValue(mockSettings);
      }
    } catch (error) {
      console.error('Error fetching system settings:', error);
    }
  };

  const fetchBackupStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/backup-status', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setBackupStatus(data);
      } else {
        // Real-time mock data for demo
        const now = new Date();
        const lastBackup = new Date(now.getTime() - (2 * 60 * 60 * 1000)); // 2 hours ago
        const nextBackup = new Date(now.getTime() + (22 * 60 * 60 * 1000)); // 22 hours from now
        
        setBackupStatus({
          lastBackup: lastBackup.toISOString(),
          nextBackup: nextBackup.toISOString(),
          backupSize: '2.3 GB',
          status: 'completed',
          retention: '30 days',
          location: 'AWS S3',
          progress: 100,
          speed: '45 MB/s',
          compression: '78%',
          encryption: 'AES-256',
          health: 'excellent',
          lastCheck: new Date().toISOString(),
          backupCount: 156,
          totalSize: '1.2 TB',
          failedBackups: 2,
          successRate: 98.7
        });
      }
    } catch (error) {
      console.error('Error fetching backup status:', error);
    }
  };

  const fetchSecurityAlerts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/security-alerts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setSecurityAlerts(data);
      } else {
        // Mock data for demo
        setSecurityAlerts([
          { id: 1, type: 'failed_login', severity: 'medium', message: 'Multiple failed login attempts detected', timestamp: '2024-01-15T10:30:00Z', ip: '192.168.1.100' },
          { id: 2, type: 'suspicious_activity', severity: 'high', message: 'Unusual API usage pattern detected', timestamp: '2024-01-15T10:25:00Z', ip: '192.168.1.101' },
          { id: 3, type: 'system_breach', severity: 'critical', message: 'Potential security breach detected', timestamp: '2024-01-15T10:20:00Z', ip: '192.168.1.102' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching security alerts:', error);
    }
  };

  const fetchApiUsage = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/api-usage', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setApiUsage(data);
      } else {
        // Mock data for demo
        setApiUsage({
          totalRequests: 15420,
          successfulRequests: 15200,
          failedRequests: 220,
          averageResponseTime: 245,
          peakRequests: 450,
          topEndpoints: [
            { endpoint: '/api/login', requests: 2340, avgTime: 120 },
            { endpoint: '/api/resume/upload', requests: 1890, avgTime: 890 },
            { endpoint: '/api/jobs/search', requests: 1560, avgTime: 180 }
          ]
        });
      }
    } catch (error) {
      console.error('Error fetching API usage:', error);
    }
  };

  const fetchDatabaseMetrics = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/database-metrics', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setDatabaseMetrics(data);
      } else {
        // Mock data for demo
        setDatabaseMetrics({
          totalConnections: 45,
          activeConnections: 23,
          slowQueries: 5,
          cacheHitRate: 87.5,
          databaseSize: '1.2 GB',
          indexUsage: 92.3,
          queryPerformance: 98.7
        });
      }
    } catch (error) {
      console.error('Error fetching database metrics:', error);
    }
  };

  const handleUpdateSettings = async (values) => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/admin/system-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(values)
      });

      if (res.ok) {
        message.success('System settings updated successfully!');
        fetchSystemSettings();
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      message.error('Failed to update settings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportLogs = async (type) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/admin/export-logs?type=${type}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-logs-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        message.success(`${type} logs exported successfully!`);
      } else {
        throw new Error('Failed to export logs');
      }
    } catch (error) {
      message.error('Failed to export logs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulate backup status changes for demo
  const simulateBackupStatus = () => {
    const statuses = ['completed', 'in_progress', 'failed', 'scheduled'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    setBackupStatus(prev => ({
      ...prev,
      status: randomStatus,
      progress: randomStatus === 'in_progress' ? Math.floor(Math.random() * 50) : 
                randomStatus === 'completed' ? 100 : 0,
      lastCheck: new Date().toISOString(),
      speed: randomStatus === 'in_progress' ? `${Math.floor(Math.random() * 100)} MB/s` : prev.speed
    }));
  };

  // Sidebar menu items
  const sidebarItems = [
    { key: 'overview', label: 'Dashboard Overview', icon: <ThunderboltFilled /> },
    { key: 'users', label: 'User Management', icon: <TeamOutlined /> },
    { key: 'verification', label: 'Company Verifications', icon: <SafetyOutlined /> },
    { key: 'analytics', label: 'System Analytics', icon: <BarChartOutlined /> },
    { key: 'reports', label: 'Reports & Logs', icon: <FileTextOutlined /> },
    { key: 'settings', label: 'System Settings', icon: <SettingOutlined /> }
  ];

  // Table columns for users
  const userColumns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => (
        <Avatar 
          size={40}
          style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)' }}
        >
          {record.firstName?.[0]}{record.lastName?.[0]}
        </Avatar>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div>
          <Text strong>{record.firstName} {record.lastName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : role === 'company' ? 'blue' : 'green'}>
          {role?.toUpperCase() || 'USER'}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'isVerified',
      key: 'status',
      render: (verified) => (
        <Badge 
          status={verified ? 'success' : 'warning'} 
          text={verified ? 'Verified' : 'Pending'}
        />
      )
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'joined',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => {
                setSelectedUser(record);
                setUserDetailsModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit User">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete User">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  // Statistics cards for dashboard
  const StatCard = ({ title, value, prefix, suffix, color, trend, icon }) => (
    <Card
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>{title}</Text>
          <div style={{ marginTop: '8px' }}>
            <Text style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold' }}>
              {prefix}{value}{suffix}
            </Text>
            {trend && (
              <div style={{ marginTop: '4px' }}>
                <Text style={{ color: trend > 0 ? '#52C41A' : '#FF4D4F', fontSize: '12px' }}>
                  {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </Text>
              </div>
            )}
          </div>
        </div>
        <div style={{ 
          fontSize: '40px', 
          color: color,
          background: `${color}20`,
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );

  // Render main content based on active section
  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div>
            {/* Stats Grid */}
            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Total Users"
                  value={dashboardStats.totalUsers?.toLocaleString() || '0'}
                  color="#4ECDC4"
                  trend={12.5}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Active Jobs"
                  value={dashboardStats.totalJobs || '0'}
                  color="#FF6B6B"
                  trend={8.2}
                  icon={<TeamOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Applications"
                  value={dashboardStats.totalApplications?.toLocaleString() || '0'}
                  color="#45B7D1"
                  trend={-2.1}
                  icon={<FileTextOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Active Users"
                  value={dashboardStats.activeUsers || '0'}
                  color="#96CEB4"
                  trend={15.3}
                  icon={<GlobalOutlined />}
                />
              </Col>
            </Row>

            {/* Additional Stats */}
            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Revenue"
                  value={dashboardStats.revenue?.toLocaleString() || '0'}
                  prefix="$"
                  color="#FFA726"
                  trend={22.1}
                  icon={<TrophyFilled />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Conversion Rate"
                  value={dashboardStats.conversion || '0'}
                  suffix="%"
                  color="#AB47BC"
                  trend={5.4}
                  icon={<BarChartOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Satisfaction"
                  value={dashboardStats.satisfaction || '0'}
                  suffix="/5"
                  color="#66BB6A"
                  trend={1.2}
                  icon={<StarFilled />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Uptime"
                  value={dashboardStats.systemUptime || '0'}
                  suffix="%"
                  color="#29B6F6"
                  trend={0.1}
                  icon={<RocketOutlined />}
                />
              </Col>
            </Row>

            {/* Recent Activity and Notifications */}
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card
                  title="Recent Activity"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                  bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
                >
                  <Timeline>
                    {recentActivity.map(activity => (
                      <Timeline.Item 
                        key={activity.id}
                        color={
                          activity.type === 'application' ? '#4ECDC4' :
                          activity.type === 'job' ? '#FF6B6B' :
                          activity.type === 'profile' ? '#45B7D1' : '#96CEB4'
                        }
                      >
                        <div>
                          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{activity.user}</Text>
                          <br />
                          <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{activity.action}</Text>
                          <br />
                          <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>{activity.time}</Text>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              </Col>
              
              <Col xs={24} lg={12}>
                <Card
                  title="System Notifications"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                  bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
                >
                  {notifications.map(notification => (
                    <Alert
                      key={notification.id}
                      message={notification.title}
                      description={
                        <div>
                          <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{notification.message}</Text>
                          <br />
                          <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>{notification.time}</Text>
                        </div>
                      }
                      type={notification.type}
                      style={{ marginBottom: '12px', background: 'rgba(255, 255, 255, 0.1)' }}
                    />
                  ))}
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'users':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Title level={2} style={{ color: '#fff', margin: 0 }}>User Management</Title>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setAddUserModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                >
                  Add User
                </Button>
                <Button
                  icon={<ExportOutlined />}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                >
                  Export
                </Button>
              </Space>
            </div>
            
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px'
              }}
            >
              <Table
                dataSource={users.map(user => ({ ...user, key: user._id }))}
                columns={userColumns}
                pagination={{ pageSize: 10, showSizeChanger: true }}
                rowSelection={{
                  selectedRowKeys,
                  onChange: setSelectedRowKeys
                }}
                scroll={{ x: 800 }}
                loading={loading}
              />
            </Card>
          </div>
        );

      case 'verification':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Title level={2} style={{ color: '#fff', margin: 0 }}>Company Verifications</Title>
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchPendingVerifications}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                >
                  Refresh
                </Button>
              </Space>
            </div>
            
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px'
              }}
            >
              <Table
                dataSource={pendingVerifications.map(company => ({ ...company, key: company._id }))}
                columns={[
                  {
                    title: 'Company',
                    dataIndex: 'companyName',
                    key: 'companyName',
                    render: (text, record) => (
                      <div>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{text}</Text>
                        <br />
                        <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                          {record.firstName} {record.lastName}
                        </Text>
                      </div>
                    )
                  },
                  {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    render: text => <Text style={{ color: '#4ECDC4' }}>{text}</Text>
                  },
                  {
                    title: 'Registration',
                    dataIndex: 'companyRegistration',
                    key: 'companyRegistration',
                    render: text => <Text style={{ color: '#fff' }}>{text}</Text>
                  },
                  {
                    title: 'Website',
                    dataIndex: 'companyWebsite',
                    key: 'companyWebsite',
                    render: text => (
                      <a href={text} target="_blank" rel="noopener noreferrer" style={{ color: '#4ECDC4' }}>
                        {text}
                      </a>
                    )
                  },
                  {
                    title: 'Applied',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: date => (
                      <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {new Date(date).toLocaleDateString()}
                      </Text>
                    )
                  },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, record) => (
                      <Space>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => {
                            setSelectedVerification(record);
                            setVerificationModal(true);
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                            border: 'none'
                          }}
                        >
                          Review
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleVerification(record._id, 'approved')}
                          style={{
                            background: 'rgba(82, 196, 26, 0.2)',
                            border: '1px solid #52c41a',
                            color: '#52c41a'
                          }}
                        >
                          Quick Approve
                        </Button>
                        <Button
                          size="small"
                          danger
                          onClick={() => handleVerification(record._id, 'rejected', 'Rejected by admin')}
                          style={{
                            background: 'rgba(255, 77, 79, 0.2)',
                            border: '1px solid #ff4d4f',
                            color: '#ff4d4f'
                          }}
                        >
                          Reject
                        </Button>
                      </Space>
                    )
                  }
                ]}
                pagination={{ pageSize: 10, showSizeChanger: true }}
                loading={loading}
                locale={{
                  emptyText: (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <CheckCircleOutlined style={{ fontSize: '48px', color: '#4ECDC4', marginBottom: '16px' }} />
                      <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        No pending verifications
                      </Text>
                    </div>
                  )
                }}
              />
            </Card>
          </div>
        );

      case 'system':
        return (
          <div>
            <Title level={2} style={{ color: '#fff', marginBottom: '24px' }}>System Health</Title>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card
                  title="Resource Usage"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ marginBottom: '20px' }}>
                    <Text style={{ color: '#fff' }}>CPU Usage</Text>
                    <Progress 
                      percent={systemHealth.cpuUsage} 
                      strokeColor="#4ECDC4"
                      trailColor="rgba(255, 255, 255, 0.1)"
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <Text style={{ color: '#fff' }}>Memory Usage</Text>
                    <Progress 
                      percent={systemHealth.memoryUsage} 
                      strokeColor="#FF6B6B"
                      trailColor="rgba(255, 255, 255, 0.1)"
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <Text style={{ color: '#fff' }}>Disk Usage</Text>
                    <Progress 
                      percent={systemHealth.diskUsage} 
                      strokeColor="#FFA726"
                      trailColor="rgba(255, 255, 255, 0.1)"
                    />
                  </div>
                  <div>
                    <Text style={{ color: '#fff' }}>Network Usage</Text>
                    <Progress 
                      percent={systemHealth.networkLatency} 
                      strokeColor="#45B7D1"
                      trailColor="rgba(255, 255, 255, 0.1)"
                    />
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} lg={12}>
                <Card
                  title="Service Status"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Database</Text>
                    <Badge status="success" text={`${systemHealth.database}% Healthy`} />
                  </div>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>API Server</Text>
                    <Badge status="success" text={`${systemHealth.api}% Operational`} />
                  </div>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Uptime</Text>
                    <Text style={{ color: '#4ECDC4' }}>{systemHealth.uptime}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Last Backup</Text>
                    <Text style={{ color: '#96CEB4' }}>2 hours ago</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'analytics':
        return (
          <div>
            <Title level={2} style={{ color: '#fff', marginBottom: '24px' }}>System Analytics</Title>
            
            {/* Performance Metrics */}
            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="CPU Usage"
                  value={performanceMetrics.cpuUsage || '0'}
                  suffix="%"
                  color="#FF6B6B"
                  icon={<MonitorOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Memory Usage"
                  value={performanceMetrics.memoryUsage || '0'}
                  suffix="%"
                  color="#4ECDC4"
                  icon={<DatabaseOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Response Time"
                  value={performanceMetrics.responseTime || '0'}
                  suffix="ms"
                  color="#FFA726"
                  icon={<ThunderboltOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Active Connections"
                  value={performanceMetrics.activeConnections || '0'}
                  color="#AB47BC"
                  icon={<ApiOutlined />}
                />
              </Col>
            </Row>

            {/* API Usage and Database Metrics */}
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card
                  title="API Usage Statistics"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff' }}>Total Requests: {apiUsage.totalRequests?.toLocaleString() || '0'}</Text>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff' }}>Success Rate: {apiUsage.successfulRequests && apiUsage.totalRequests ? 
                      Math.round((apiUsage.successfulRequests / apiUsage.totalRequests) * 100) : '0'}%</Text>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff' }}>Avg Response Time: {apiUsage.averageResponseTime || '0'}ms</Text>
                  </div>
                  <div>
                    <Text style={{ color: '#fff' }}>Peak Requests: {apiUsage.peakRequests || '0'}/min</Text>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} lg={12}>
                <Card
                  title="Database Performance"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff' }}>Cache Hit Rate: {databaseMetrics.cacheHitRate || '0'}%</Text>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff' }}>Query Performance: {databaseMetrics.queryPerformance || '0'}%</Text>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text style={{ color: '#fff' }}>Slow Queries: {databaseMetrics.slowQueries || '0'}</Text>
                  </div>
                  <div>
                    <Text style={{ color: '#fff' }}>DB Size: {databaseMetrics.databaseSize || '0'}</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'reports':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Title level={2} style={{ color: '#fff', margin: 0 }}>Reports & Logs</Title>
              <Space>
                <Select
                  value={logFilter}
                  onChange={setLogFilter}
                  style={{ width: 120 }}
                  options={[
                    { value: 'all', label: 'All Logs' },
                    { value: 'error', label: 'Errors' },
                    { value: 'warning', label: 'Warnings' },
                    { value: 'info', label: 'Info' }
                  ]}
                />
                <Button
                  icon={<ExportOutlined />}
                  onClick={() => setExportModal(true)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                >
                  Export
                </Button>
              </Space>
            </div>

            <Tabs
              defaultActiveKey="system"
              style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '16px' }}
              items={[
                {
                  key: 'system',
                  label: 'System Logs',
                  children: (
                    <Card
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px'
                      }}
                    >
                      <Table
                        dataSource={systemLogs}
                        columns={[
                          {
                            title: 'Level',
                            dataIndex: 'level',
                            key: 'level',
                            render: level => (
                              <Tag color={
                                level === 'error' ? 'red' :
                                level === 'warning' ? 'orange' :
                                level === 'info' ? 'blue' : 'default'
                              }>
                                {level.toUpperCase()}
                              </Tag>
                            )
                          },
                          {
                            title: 'Message',
                            dataIndex: 'message',
                            key: 'message',
                            render: text => <Text style={{ color: '#fff' }}>{text}</Text>
                          },
                          {
                            title: 'Service',
                            dataIndex: 'service',
                            key: 'service',
                            render: text => <Text style={{ color: '#4ECDC4' }}>{text}</Text>
                          },
                          {
                            title: 'Timestamp',
                            dataIndex: 'timestamp',
                            key: 'timestamp',
                            render: timestamp => (
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                {new Date(timestamp).toLocaleString()}
                              </Text>
                            )
                          }
                        ]}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 800 }}
                      />
                    </Card>
                  )
                },
                {
                  key: 'errors',
                  label: 'Error Logs',
                  children: (
                    <Card
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px'
                      }}
                    >
                      <Table
                        dataSource={errorLogs}
                        columns={[
                          {
                            title: 'Error',
                            dataIndex: 'error',
                            key: 'error',
                            render: text => <Text style={{ color: '#FF6B6B' }}>{text}</Text>
                          },
                          {
                            title: 'Severity',
                            dataIndex: 'severity',
                            key: 'severity',
                            render: severity => (
                              <Tag color={
                                severity === 'critical' ? 'red' :
                                severity === 'high' ? 'orange' :
                                severity === 'medium' ? 'yellow' : 'green'
                              }>
                                {severity.toUpperCase()}
                              </Tag>
                            )
                          },
                          {
                            title: 'Timestamp',
                            dataIndex: 'timestamp',
                            key: 'timestamp',
                            render: timestamp => (
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                {new Date(timestamp).toLocaleString()}
                              </Text>
                            )
                          }
                        ]}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 800 }}
                      />
                    </Card>
                  )
                },
                {
                  key: 'activity',
                  label: 'User Activity',
                  children: (
                    <Card
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px'
                      }}
                    >
                      <Table
                        dataSource={userActivityLogs}
                        columns={[
                          {
                            title: 'User ID',
                            dataIndex: 'userId',
                            key: 'userId',
                            render: text => <Text style={{ color: '#4ECDC4' }}>{text}</Text>
                          },
                          {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: text => <Text style={{ color: '#fff' }}>{text}</Text>
                          },
                          {
                            title: 'IP Address',
                            dataIndex: 'ip',
                            key: 'ip',
                            render: text => <Text style={{ color: '#FFA726' }}>{text}</Text>
                          },
                          {
                            title: 'Timestamp',
                            dataIndex: 'timestamp',
                            key: 'timestamp',
                            render: timestamp => (
                              <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                {new Date(timestamp).toLocaleString()}
                              </Text>
                            )
                          }
                        ]}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 800 }}
                      />
                    </Card>
                  )
                }
              ]}
            />
          </div>
        );

      case 'settings':
        return (
          <div>
            <Title level={2} style={{ color: '#fff', marginBottom: '24px' }}>System Settings</Title>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <Card
                  title="General Settings"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                >
                  <Form
                    form={settingsForm}
                    layout="vertical"
                    onFinish={handleUpdateSettings}
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item name="maintenanceMode" label="Maintenance Mode" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="autoBackup" label="Auto Backup" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="backupFrequency" label="Backup Frequency">
                          <Select>
                            <Option value="hourly">Hourly</Option>
                            <Option value="daily">Daily</Option>
                            <Option value="weekly">Weekly</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="maxFileSize" label="Max File Size (MB)">
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="sessionTimeout" label="Session Timeout (minutes)">
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="apiRateLimit" label="API Rate Limit">
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="logRetention" label="Log Retention (days)">
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="securityLevel" label="Security Level">
                          <Select>
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="emailNotifications" label="Email Notifications" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="debugMode" label="Debug Mode" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      style={{
                        background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                    >
                      Save Settings
                    </Button>
                  </Form>
                </Card>
              </Col>
              
              <Col xs={24} lg={8}>
                <Card
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Backup Status</span>
                      <Badge 
                        status={backupStatus.health === 'excellent' ? 'success' : 
                               backupStatus.health === 'good' ? 'processing' : 'error'} 
                        text={backupStatus.health || 'Unknown'}
                      />
                    </div>
                  }
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                >
                  {/* Real-time Progress */}
                  {backupStatus.progress && backupStatus.progress < 100 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ color: '#fff', fontSize: '12px' }}>Backup Progress</Text>
                        <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>{backupStatus.progress}%</Text>
                      </div>
                      <Progress 
                        percent={backupStatus.progress} 
                        strokeColor="#4ECDC4"
                        trailColor="rgba(255, 255, 255, 0.1)"
                        size="small"
                      />
                    </div>
                  )}

                  {/* Last Backup */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: '12px' }}>Last Backup:</Text>
                      <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>
                        {backupStatus.lastBackup ? 
                          new Date(backupStatus.lastBackup).toLocaleString() : 'Never'}
                      </Text>
                    </div>
                  </div>

                  {/* Next Backup */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: '12px' }}>Next Backup:</Text>
                      <Text style={{ color: '#FFA726', fontSize: '12px' }}>
                        {backupStatus.nextBackup ? 
                          new Date(backupStatus.nextBackup).toLocaleString() : 'Not scheduled'}
                      </Text>
                    </div>
                  </div>

                  {/* Backup Size */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: '12px' }}>Backup Size:</Text>
                      <Text style={{ color: '#96CEB4', fontSize: '12px' }}>{backupStatus.backupSize || '0'}</Text>
                    </div>
                  </div>

                  {/* Transfer Speed */}
                  {backupStatus.speed && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: '12px' }}>Transfer Speed:</Text>
                        <Text style={{ color: '#52C41A', fontSize: '12px' }}>{backupStatus.speed}</Text>
                      </div>
                    </div>
                  )}

                  {/* Compression */}
                  {backupStatus.compression && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: '12px' }}>Compression:</Text>
                        <Text style={{ color: '#722ED1', fontSize: '12px' }}>{backupStatus.compression}</Text>
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: '12px' }}>Status:</Text>
                      <Tag 
                        color={backupStatus.status === 'completed' ? 'green' : 
                               backupStatus.status === 'in_progress' ? 'blue' : 
                               backupStatus.status === 'failed' ? 'red' : 'orange'}
                        size="small"
                      >
                        {backupStatus.status || 'Unknown'}
                      </Tag>
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: '12px' }}>Location:</Text>
                      <Text style={{ color: '#AB47BC', fontSize: '12px' }}>{backupStatus.location || 'Local'}</Text>
                    </div>
                  </div>

                  {/* Encryption */}
                  {backupStatus.encryption && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: '12px' }}>Encryption:</Text>
                        <Text style={{ color: '#13C2C2', fontSize: '12px' }}>{backupStatus.encryption}</Text>
                      </div>
                    </div>
                  )}

                  {/* Success Rate */}
                  {backupStatus.successRate && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: '12px' }}>Success Rate:</Text>
                        <Text style={{ color: '#52C41A', fontSize: '12px' }}>{backupStatus.successRate}%</Text>
                      </div>
                    </div>
                  )}

                  {/* Backup Count */}
                  {backupStatus.backupCount && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: '12px' }}>Total Backups:</Text>
                        <Text style={{ color: '#FA8C16', fontSize: '12px' }}>{backupStatus.backupCount}</Text>
                      </div>
                    </div>
                  )}

                  {/* Last Check */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: '12px' }}>Last Check:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                        {backupStatus.lastCheck ? 
                          new Date(backupStatus.lastCheck).toLocaleTimeString() : 'Unknown'}
                      </Text>
                    </div>
                  </div>

                  {/* Real-time indicator */}
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '8px', 
                    background: 'rgba(78, 205, 196, 0.1)', 
                    borderRadius: '8px',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                    marginBottom: '12px'
                  }}>
                    <SyncOutlined spin style={{ color: '#4ECDC4', marginRight: '8px' }} />
                    <Text style={{ color: '#4ECDC4', fontSize: '12px' }}>Live Data</Text>
                  </div>

                  {/* Demo Controls */}
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      size="small"
                      onClick={simulateBackupStatus}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        fontSize: '11px'
                      }}
                    >
                      Simulate Status Change
                    </Button>
                  </div>
                </Card>

                <Card
                  title="Security Alerts"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    marginTop: '16px'
                  }}
                >
                  {securityAlerts.slice(0, 3).map(alert => (
                    <Alert
                      key={alert.id}
                      message={alert.message}
                      type={
                        alert.severity === 'critical' ? 'error' :
                        alert.severity === 'high' ? 'warning' : 'info'
                      }
                      style={{ marginBottom: '8px' }}
                      showIcon
                    />
                  ))}
                </Card>
              </Col>
            </Row>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <RocketOutlined style={{ fontSize: '64px', color: '#4ECDC4', marginBottom: '16px' }} />
            <Title level={3} style={{ color: '#fff' }}>Coming Soon</Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              This section is under development. More features coming soon!
            </Text>
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Particles Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, #4ECDC4, transparent)',
              borderRadius: '50%',
              opacity: particle.opacity,
              animation: 'pulse 2s infinite ease-in-out'
            }}
          />
        ))}
      </div>

      <Layout style={{ minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
        {/* Sidebar */}
        <Layout.Sider
          width={280}
          collapsed={sidebarCollapsed}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Logo */}
          <div style={{
            padding: '24px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <CrownOutlined style={{ fontSize: '40px', color: '#4ECDC4', marginBottom: '8px' }} />
            {!sidebarCollapsed && (
              <Title level={4} style={{ color: '#fff', margin: 0 }}>
                Quantum Admin
              </Title>
            )}
          </div>

          {/* Navigation Menu */}
          <div style={{ padding: '16px 0' }}>
            {sidebarItems.map(item => (
              <div
                key={item.key}
                onClick={() => setSelectedSection(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 24px',
                  margin: '4px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: selectedSection === item.key ? 'rgba(78, 205, 196, 0.2)' : 'transparent',
                  border: selectedSection === item.key ? '1px solid rgba(78, 205, 196, 0.4)' : '1px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ 
                  fontSize: '18px', 
                  color: selectedSection === item.key ? '#4ECDC4' : 'rgba(255, 255, 255, 0.7)',
                  marginRight: sidebarCollapsed ? '0' : '12px'
                }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <>
                    <span style={{ 
                      flex: 1, 
                      color: selectedSection === item.key ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: selectedSection === item.key ? 'bold' : 'normal'
                    }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge 
                        count={item.badge} 
                        style={{ 
                          backgroundColor: '#4ECDC4',
                          color: '#0F0F23'
                        }} 
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div style={{ 
            position: 'absolute', 
            bottom: '16px', 
            left: '16px', 
            right: '16px' 
          }}>
            {!sidebarCollapsed && (
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '12px', 
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Avatar 
                    style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)' }}
                    size={32}
                  >
                    {loggedInUser?.firstName?.[0]}{loggedInUser?.lastName?.[0]}
                  </Avatar>
                  <div style={{ marginLeft: '8px' }}>
                    <Text style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
                      {loggedInUser?.firstName} {loggedInUser?.lastName}
                    </Text>
                    <br />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                      Super Admin
                    </Text>
                  </div>
                </div>
              </div>
            )}
            
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                width: '100%',
                color: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }}
            >
              {!sidebarCollapsed && 'Logout'}
            </Button>
          </div>
        </Layout.Sider>

        {/* Main Content */}
        <Layout.Content style={{ background: 'transparent' }}>
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                style={{ color: '#fff', marginRight: '16px' }}
              />
              <Title level={3} style={{ color: '#fff', margin: 0 }}>
                {sidebarItems.find(item => item.key === selectedSection)?.label || 'Dashboard'}
              </Title>
            </div>

            <Space>
              <Tooltip title="Real-time Updates">
                <Switch
                  checked={realTimeUpdates}
                  onChange={setRealTimeUpdates}
                  checkedChildren="LIVE"
                  unCheckedChildren="OFF"
                />
              </Tooltip>
              
              <Tooltip title="Refresh Data">
                <Button
                  type="text"
                  icon={<ReloadOutlined spin={refreshing} />}
                  onClick={handleRefresh}
                  style={{ color: '#fff' }}
                />
              </Tooltip>
              
              <Badge count={notifications.filter(n => n.type === 'error').length}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ color: '#fff' }}
                />
              </Badge>
            </Space>
          </div>

          {/* Main Content Area */}
          <div style={{ padding: '32px', minHeight: 'calc(100vh - 80px)' }}>
            {renderContent()}
          </div>
        </Layout.Content>
      </Layout>

      {/* Modals */}
      
      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={addUserModal}
        onCancel={() => setAddUserModal(false)}
        footer={null}
        width={600}
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleAddUser}
          style={{ marginTop: '16px' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label={<span style={{ color: '#fff' }}>First Name</span>}
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label={<span style={{ color: '#fff' }}>Last Name</span>}
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="email"
            label={<span style={{ color: '#fff' }}>Email</span>}
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
          
          <Form.Item
            name="password"
            label={<span style={{ color: '#fff' }}>Password</span>}
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label={<span style={{ color: '#fff' }}>Role</span>}
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select user role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
              <Option value="company">Company</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setAddUserModal(false)}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  border: 'none'
                }}
              >
                Add User
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Details Modal */}
      <Modal
        title="User Details"
        open={userDetailsModal}
        onCancel={() => setUserDetailsModal(false)}
        footer={null}
        width={800}
      >
        {selectedUser && (
          <div style={{ padding: '16px' }}>
            <Row gutter={[24, 24]}>
              <Col span={8} style={{ textAlign: 'center' }}>
                <Avatar size={120} style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)' }}>
                  {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
                </Avatar>
                <Title level={4} style={{ marginTop: '16px', color: '#fff' }}>
                  {selectedUser.firstName} {selectedUser.lastName}
                </Title>
                <Tag color={selectedUser.role === 'admin' ? 'red' : 'blue'}>
                  {selectedUser.role?.toUpperCase()}
                </Tag>
              </Col>
              <Col span={16}>
                <div style={{ color: '#fff' }}>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Status:</strong> {selectedUser.isVerified ? 'Verified' : 'Pending'}</p>
                  <p><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  <p><strong>Last Login:</strong> 2 hours ago</p>
                  <p><strong>Total Applications:</strong> 12</p>
                  <p><strong>Success Rate:</strong> 25%</p>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Company Verification Modal */}
      <Modal
        title="Company Verification Review"
        open={verificationModal}
        onCancel={() => {
          setVerificationModal(false);
          setSelectedVerification(null);
        }}
        footer={null}
        width={800}
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        {selectedVerification && (
          <div style={{ padding: '16px 0' }}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Card
                  title="Company Information"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ color: '#fff' }}>
                    <p><strong>Company Name:</strong> {selectedVerification.companyName}</p>
                    <p><strong>Registration Number:</strong> {selectedVerification.companyRegistration}</p>
                    <p><strong>Website:</strong> 
                      <a 
                        href={selectedVerification.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#4ECDC4', marginLeft: '8px' }}
                      >
                        {selectedVerification.companyWebsite}
                      </a>
                    </p>
                    <p><strong>Applied On:</strong> {new Date(selectedVerification.createdAt).toLocaleDateString()}</p>
                  </div>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card
                  title="Contact Information"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ color: '#fff' }}>
                    <p><strong>Contact Person:</strong> {selectedVerification.firstName} {selectedVerification.lastName}</p>
                    <p><strong>Email:</strong> {selectedVerification.email}</p>
                    <p><strong>Current Status:</strong> 
                      <Tag color="orange" style={{ marginLeft: '8px' }}>
                        {selectedVerification.verificationStatus || 'Pending'}
                      </Tag>
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>

            <Form
              layout="vertical"
              style={{ marginTop: '24px' }}
              onFinish={(values) => {
                handleVerification(selectedVerification._id, values.decision, values.notes);
              }}
            >
              <Form.Item
                name="decision"
                label={<span style={{ color: '#fff' }}>Decision</span>}
                rules={[{ required: true, message: 'Please select a decision' }]}
              >
                <Radio.Group size="large">
                  <Radio value="approved" style={{ color: '#52c41a' }}>
                    <CheckCircleOutlined style={{ marginRight: '8px' }} />
                    Approve Company
                  </Radio>
                  <Radio value="rejected" style={{ color: '#ff4d4f' }}>
                    <CloseCircleOutlined style={{ marginRight: '8px' }} />
                    Reject Company
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="notes"
                label={<span style={{ color: '#fff' }}>Notes (Optional)</span>}
              >
                <TextArea
                  rows={4}
                  placeholder="Add verification notes..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff'
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button 
                    onClick={() => {
                      setVerificationModal(false);
                      setSelectedVerification(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    style={{
                      background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                      border: 'none'
                    }}
                  >
                    Submit Decision
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      {/* Export Logs Modal */}
      <Modal
        title="Export Logs"
        open={exportModal}
        onCancel={() => setExportModal(false)}
        footer={null}
        width={500}
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div style={{ padding: '16px 0' }}>
          <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>Select Log Type to Export</Title>
          
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
              onClick={() => handleExportLogs('system')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>System Logs</Text>
                  <br />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Export all system activity logs
                  </Text>
                </div>
                <DownloadOutlined style={{ color: '#4ECDC4', fontSize: '20px' }} />
              </div>
            </Card>

            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
              onClick={() => handleExportLogs('error')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Error Logs</Text>
                  <br />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Export error and exception logs
                  </Text>
                </div>
                <DownloadOutlined style={{ color: '#FF6B6B', fontSize: '20px' }} />
              </div>
            </Card>

            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
              onClick={() => handleExportLogs('user-activity')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>User Activity Logs</Text>
                  <br />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Export user activity and behavior logs
                  </Text>
                </div>
                <DownloadOutlined style={{ color: '#FFA726', fontSize: '20px' }} />
              </div>
            </Card>

            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
              onClick={() => handleExportLogs('all')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>All Logs</Text>
                  <br />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Export all available logs
                  </Text>
                </div>
                <DownloadOutlined style={{ color: '#AB47BC', fontSize: '20px' }} />
              </div>
            </Card>
          </Space>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Button
              onClick={() => setExportModal(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff'
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Global Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .ant-table {
          background: transparent !important;
        }
        
        .ant-table-thead > tr > th {
          background: rgba(255, 255, 255, 0.1) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: #fff !important;
        }
        
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: transparent !important;
          color: #fff !important;
        }
        
        .ant-table-tbody > tr:hover > td {
          background: rgba(78, 205, 196, 0.1) !important;
        }
        
        .ant-card {
          color: #fff !important;
        }
        
        .ant-card-head {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .ant-card-head-title {
          color: #fff !important;
        }
        
        .ant-modal-content {
          background: rgba(15, 15, 35, 0.95) !important;
          backdrop-filter: blur(10px) !important;
        }
        
        .ant-modal-header {
          background: transparent !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .ant-modal-title {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default ModernAdminPage;