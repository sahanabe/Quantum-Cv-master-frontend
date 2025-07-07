import React, { useState, useEffect } from 'react';
import ForgotPassword from './ForgotPassword';
import { Layout, Menu, Modal, Tabs, Form, Input, Button, Select, Dropdown, Drawer, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MenuOutlined, 
  RocketOutlined, 
  UserOutlined, 
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  CloseOutlined,
  BellOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Header } = Layout;

// Modern Logo Component
const QuantumLogo = ({ isScrolled, isMobile }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '8px' : '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }}>
    {/* 3D Quantum Logo */}
    <div style={{
      position: 'relative',
      width: isMobile ? '40px' : isScrolled ? '45px' : '50px',
      height: isMobile ? '40px' : isScrolled ? '45px' : '50px',
      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
    }}>
      {/* Outer Ring */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '2px solid #4ECDC4',
        borderRadius: '50%',
        animation: 'spin 20s linear infinite'
      }} />
      
      {/* Inner Ring */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '15%',
        width: '70%',
        height: '70%',
        border: '2px solid #FF6B6B',
        borderRadius: '50%',
        animation: 'spin 15s linear infinite reverse'
      }} />
      
      {/* Central Quantum Dot */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '12px',
        height: '12px',
        background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
        borderRadius: '50%',
        boxShadow: '0 0 20px rgba(78, 205, 196, 0.8)',
        animation: 'pulse 2s ease-in-out infinite'
      }} />
      
      {/* Quantum Particles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '4px',
        height: '4px',
        background: '#45B7D1',
        borderRadius: '50%',
        animation: 'float 3s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '3px',
        height: '3px',
        background: '#96CEB4',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse'
      }} />
    </div>
    
    {/* Brand Text */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }}>
      <span style={{
        fontSize: isMobile ? '18px' : isScrolled ? '20px' : '24px',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '1px',
        transition: 'all 0.3s ease'
      }}>
        QUANTUM
      </span>
      <span style={{
        fontSize: isMobile ? '10px' : isScrolled ? '11px' : '12px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: '2px',
        marginTop: '-2px'
      }}>
        CV
      </span>
    </div>
  </div>
);

// Mobile Menu Component
const MobileMenu = ({ visible, onClose, menuItems, onMenuClick, notifications, notificationCount, handleNotificationClick, clearAllNotifications, currentLanguage, handleLanguageChange }) => (
  <Drawer
    placement="right"
    onClose={onClose}
    open={visible}
    width={300}
    styles={{
      body: { 
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)', 
        padding: 0 
      },
      header: { 
        background: 'transparent', 
        borderBottom: '1px solid rgba(255,255,255,0.1)' 
      }
    }}
    closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: '18px' }} />}
    title={
      <span style={{ color: '#fff', fontWeight: 700 }}>
        Navigation
      </span>
    }
  >
    <div style={{ padding: '20px 0' }}>
      {menuItems.map((item, index) => (
        <div
          key={item.key}
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'transparent'
          }}
          onClick={() => {
            onMenuClick({ key: item.key });
            onClose();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.paddingLeft = '32px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.paddingLeft = '24px';
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 500
          }}>
            {item.icon && <span style={{ fontSize: '18px' }}>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        </div>
      ))}

      {/* Notifications Section for Mobile */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600
          }}>
            <BellOutlined />
            <span>Notifications</span>
            {notificationCount > 0 && (
              <div style={{
                background: '#FF6B6B',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '10px',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {notificationCount}
              </div>
            )}
          </div>
          {notifications.length > 0 && (
            <Button
              type="text"
              size="small"
              onClick={clearAllNotifications}
              style={{
                color: '#ff4d4f',
                fontSize: '12px',
                height: 'auto',
                padding: '4px 8px'
              }}
            >
              Clear All
            </Button>
          )}
        </div>
        {notifications.length > 0 ? (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {notifications.map(notification => (
              <div
                key={notification.id}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer'
                }}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}>
                  {notification.type === 'success' && <CheckCircleOutlined style={{ color: '#52c41a', marginTop: '2px', fontSize: '14px' }} />}
                  {notification.type === 'info' && <InfoCircleOutlined style={{ color: '#1890ff', marginTop: '2px', fontSize: '14px' }} />}
                  {notification.type === 'warning' && <ExclamationCircleOutlined style={{ color: '#faad14', marginTop: '2px', fontSize: '14px' }} />}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: '14px', marginBottom: '2px' }}>
                      {notification.message}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            textAlign: 'center',
            padding: '12px 0'
          }}>
            No new notifications
          </div>
        )}
      </div>

      {/* Language Section for Mobile */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          color: '#fff',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <GlobalOutlined />
          <span>Language</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { key: 'en', flag: '🇺🇸', label: 'English' },
            { key: 'es', flag: '🇪🇸', label: 'Español' },
            { key: 'fr', flag: '🇫🇷', label: 'Français' }
          ].map(lang => (
            <div
              key={lang.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: currentLanguage === lang.key ? 'rgba(78, 205, 196, 0.2)' : 'transparent',
                border: currentLanguage === lang.key ? '1px solid rgba(78, 205, 196, 0.4)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleLanguageChange(lang.key)}
            >
              <span style={{ fontSize: '20px' }}>{lang.flag}</span>
              <span style={{
                color: currentLanguage === lang.key ? '#4ECDC4' : 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                fontWeight: currentLanguage === lang.key ? 600 : 400
              }}>
                {lang.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Drawer>
);

const ModernNavbar = ({ loggedInUser, setLoggedInUser, setToken, modalVisible, setModalVisible, activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Welcome to Quantum CV!', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New AI features available', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'Update your profile for better matches', time: '3 hours ago' }
  ]);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [forgotVisible, setForgotVisible] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reset form when modal opens
  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
    }
  }, [modalVisible, form]);

  // Build menu items
  const menuItems = [
    {
      key: 'products',
      label: 'Products',
      icon: <BulbOutlined />,
      link: '/products'
    },
    {
      key: 'jobs',
      label: 'Job Scan',
      icon: <ThunderboltOutlined />,
      link: '/jobs'
    }
  ];

  if (loggedInUser) {
    if (loggedInUser.role === 'admin') {
      menuItems.push({
        key: 'admin',
        label: 'Admin Dashboard',
        icon: <SettingOutlined />,
        link: '/admin'
      });
    } else if (loggedInUser.role === 'company') {
      menuItems.push({
        key: 'enterprise-dashboard',
        label: 'Enterprise',
        icon: <DashboardOutlined />,
        link: '/enterprise-dashboard'
      });
    } else {
      menuItems.push({
        key: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlined />,
        link: '/dashboard'
      });
    }
  }

  if (!loggedInUser) {
    menuItems.push({
      key: 'login',
      label: 'Sign In',
      icon: <UserOutlined />
    });
  }

  const handleMenuClick = (e) => {
    if (e.key === 'login') {
      setActiveTab('login');
      setModalVisible(true);
    } else if (e.key === 'jobs') {
      navigate('/jobs');
    } else {
      const item = menuItems.find(item => item.key === e.key);
      if (item && item.link) {
        navigate(item.link);
      }
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('quantumCV_user');
    localStorage.removeItem('quantumCV_token');
    
    console.log('User logged out, localStorage cleared');
    navigate('/');
  };

  // Language change handler
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    message.success(`Language changed to ${language === 'en' ? 'English' : language === 'es' ? 'Español' : 'Français'}`);
    // Here you would typically integrate with i18n library
  };

  // Notification handlers
  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    message.success('All notifications cleared');
  };

  const onFinishSignUp = async (values) => {
    setLoading(true);
    try {
      const requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role
      };

      // Add company details if registering as company
      if (values.role === 'company') {
        requestBody.companyName = values.companyName;
        requestBody.companyRegistration = values.companyRegistration;
        requestBody.companyWebsite = values.companyWebsite;
      }

      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      
      if (res.ok) {
        message.success(data.message || 'Account created successfully!');
        form.resetFields();
        setActiveTab('login');
      } else {
        message.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishLogin = async (values) => {
    setLoading(true);
    try {
      console.log('Attempting login with:', { email: values.email });
      
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      console.log('Login response status:', res.status);
      
      const data = await res.json();
      console.log('Login response data:', data);
      
      if (res.ok) {
        message.success('Login successful!');
        setLoggedInUser(data.user);
        setToken(data.token);
        setModalVisible(false);
        form.resetFields();
        
        // Store login state in localStorage for persistence
        localStorage.setItem('quantumCV_user', JSON.stringify(data.user));
        localStorage.setItem('quantumCV_token', data.token);
        
        console.log('Login successful, user:', data.user);
        
        // Redirect based on user role
        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else if (data.user.role === 'company') {
            navigate('/enterprise-dashboard');
          } else {
            // Regular user - redirect to account/profile page
            navigate('/account');
          }
        }, 1000); // Small delay to show success message
        
      } else {
        console.error('Login failed:', data.message);
        message.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Language dropdown items
  const languageItems = [
    {
      key: 'en',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
          <span>🇺🇸</span>
          <span>English</span>
        </div>
      ),
      onClick: () => handleLanguageChange('en')
    },
    {
      key: 'es',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
          <span>🇪🇸</span>
          <span>Español</span>
        </div>
      ),
      onClick: () => handleLanguageChange('es')
    },
    {
      key: 'fr',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
          <span>🇫🇷</span>
          <span>Français</span>
        </div>
      ),
      onClick: () => handleLanguageChange('fr')
    }
  ];



  // User dropdown menu for desktop
  const userDropdownItems = loggedInUser ? [
    {
      key: 'profile',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
          <UserOutlined />
          <span>Profile</span>
        </div>
      ),
      onClick: () => navigate('/account')
    },
    {
      key: 'logout',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4757' }}>
          <LogoutOutlined />
          <span>Logout</span>
        </div>
      ),
      onClick: handleLogout
    }
  ] : [];

  return (
    <>
      <Header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: isScrolled ? '70px' : '80px',
        background: isScrolled 
          ? 'rgba(15, 15, 35, 0.95)' 
          : 'rgba(15, 15, 35, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isScrolled ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <QuantumLogo isScrolled={isScrolled} isMobile={isMobile} />
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}>
            {/* Navigation Links */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}>
              {menuItems.slice(0, -1).map((item) => (
                <Link
                  key={item.key}
                  to={item.link || '#'}
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '15px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Notification and Language Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
                          {/* Notification Button */}
            <Dropdown
              open={notificationDropdownOpen}
              onOpenChange={setNotificationDropdownOpen}
              placement="bottomRight"
              trigger={['click']}
              dropdownRender={() => (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  minWidth: '300px',
                  padding: '16px'
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#000',
                      fontSize: '16px',
                      fontWeight: 600
                    }}>
                      <BellOutlined style={{ color: '#000' }} />
                      <span style={{ color: '#000' }}>Notifications</span>
                      {notificationCount > 0 && (
                        <div style={{
                          background: '#FF6B6B',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '10px',
                          minWidth: '18px',
                          textAlign: 'center'
                        }}>
                          {notificationCount}
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <Button
                        type="text"
                        size="small"
                        onClick={clearAllNotifications}
                        style={{
                          color: '#ff4d4f',
                          fontSize: '12px',
                          height: 'auto',
                          padding: '4px 8px'
                        }}
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Notifications List */}
                  {notifications.length > 0 ? (
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          style={{
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            color: '#000'
                          }}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px'
                          }}>
                            {notification.type === 'success' && <CheckCircleOutlined style={{ color: '#52c41a', marginTop: '2px' }} />}
                            {notification.type === 'info' && <InfoCircleOutlined style={{ color: '#1890ff', marginTop: '2px' }} />}
                            {notification.type === 'warning' && <ExclamationCircleOutlined style={{ color: '#faad14', marginTop: '2px' }} />}
                            <div style={{ flex: 1 }}>
                              <div 
                                className="force-black-text"
                                style={{ 
                                  color: '#000 !important', 
                                  fontSize: '14px', 
                                  marginBottom: '4px', 
                                  fontWeight: '500',
                                  textShadow: 'none !important',
                                  background: 'transparent !important'
                                }}
                              >
                                {notification.message}
                              </div>
                              <div 
                                className="force-gray-text"
                                style={{ 
                                  color: 'rgba(0,0,0,0.6) !important', 
                                  fontSize: '12px',
                                  textShadow: 'none !important',
                                  background: 'transparent !important'
                                }}
                              >
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      color: 'rgba(0,0,0,0.6)',
                      fontSize: '14px',
                      textAlign: 'center',
                      padding: '12px 0'
                    }}>
                      No new notifications
                    </div>
                  )}
                </div>
              )}
            >
                <div style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <BellOutlined style={{ 
                    color: '#fff', 
                    fontSize: '16px'
                  }} />
                  {notificationCount > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.4)'
                    }}>
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </div>
                  )}
                </div>
              </Dropdown>

              {/* Language Button */}
              <Dropdown
                menu={{ items: languageItems }}
                placement="bottomRight"
                trigger={['click']}
                popupRender={(menu) => (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
                  }}>
                    {menu}
                  </div>
                )}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <GlobalOutlined style={{ 
                    color: '#fff', 
                    fontSize: '16px'
                  }} />
                </div>
              </Dropdown>
            </div>

            {/* User Section */}
            {loggedInUser ? (
              <Dropdown
                menu={{ items: userDropdownItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '14px'
                  }}>
                    {(loggedInUser.firstName?.[0] || loggedInUser.email?.[0] || 'U').toUpperCase()}
                  </div>
                  <span style={{
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}>
                    {loggedInUser.firstName || loggedInUser.email?.split('@')[0] || 'User'}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setActiveTab('login');
                  setModalVisible(true);
                }}
                style={{
                  height: '45px',
                  padding: '0 24px',
                  borderRadius: '25px',
                  background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  boxShadow: '0 4px 15px rgba(255,107,107,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,107,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,107,107,0.3)';
                }}
              >
                Get Started
              </Button>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(true)}
            style={{
              color: '#fff',
              fontSize: '20px',
              width: '45px',
              height: '45px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        )}
      </Header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        visible={mobileMenuVisible}
        onClose={() => setMobileMenuVisible(false)}
        menuItems={[
          ...menuItems,
          ...(loggedInUser ? [{
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />
          }] : [])
        ]}
        onMenuClick={(e) => {
          if (e.key === 'logout') {
            handleLogout();
          } else {
            handleMenuClick(e);
          }
          setMobileMenuVisible(false);
        }}
        notifications={notifications}
        notificationCount={notificationCount}
        handleNotificationClick={handleNotificationClick}
        clearAllNotifications={clearAllNotifications}
        currentLanguage={currentLanguage}
        handleLanguageChange={handleLanguageChange}
      />

      {/* Login/Signup Modal */}
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={480}
        styles={{
          content: {
            background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
            backdropFilter: 'blur(30px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden'
          }
        }}
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <QuantumLogo isScrolled={false} isMobile={false} />
            <h2 style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '24px',
              marginTop: '20px',
              marginBottom: '8px'
            }}>
              Welcome to Quantum CV
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              margin: 0
            }}>
              Transform your career with AI-powered insights
            </p>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            items={[
              {
                key: 'login',
                label: 'Sign In',
                children: (
                  <Form form={form} onFinish={onFinishLogin} layout="vertical">
                    <Form.Item
                      name="email"
                      rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                      <Input 
                        placeholder="Email address" 
                        size="large"
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff'
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                      <Input.Password 
                        placeholder="Password" 
                        size="large"
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff'
                        }}
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      block
                      style={{
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '16px',
                        marginTop: '10px'
                      }}
                    >
                      Sign In
                    </Button>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                      <Button
                        type="link"
                        onClick={() => setForgotVisible(true)}
                        style={{ color: '#4ECDC4', padding: 0 }}
                      >
                        Forgot password?
                      </Button>
                    </div>
                  </Form>
                )
              },
              {
                key: 'signup',
                label: 'Sign Up',
                children: (
                  <Form form={form} onFinish={onFinishSignUp} layout="vertical">
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'First name required' }]}
                        style={{ flex: 1 }}
                      >
                        <Input 
                          placeholder="First name" 
                          size="large"
                          style={{
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff'
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Last name required' }]}
                        style={{ flex: 1 }}
                      >
                        <Input 
                          placeholder="Last name" 
                          size="large"
                          style={{
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff'
                          }}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      name="email"
                      rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                      <Input 
                        placeholder="Email address" 
                        size="large"
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff'
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}
                    >
                      <Input.Password 
                        placeholder="Password" 
                        size="large"
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff'
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="role" initialValue="user">
                      <Select 
                        size="large"
                        style={{
                          borderRadius: '12px'
                        }}
                        onChange={(value) => {
                          // Reset company fields when role changes
                          if (value !== 'company') {
                            form.setFieldsValue({
                              companyName: undefined,
                              companyRegistration: undefined,
                              companyWebsite: undefined
                            });
                          }
                        }}
                        options={[
                          { value: 'user', label: 'Job Seeker' },
                          { value: 'company', label: 'Company' }
                        ]}
                      />
                    </Form.Item>
                    
                    {/* Company-specific fields */}
                    <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}>
                      {({ getFieldValue }) => {
                        return getFieldValue('role') === 'company' ? (
                          <>
                            <Form.Item
                              name="companyName"
                              rules={[{ required: true, message: 'Company name is required' }]}
                            >
                              <Input 
                                placeholder="Company name" 
                                size="large"
                                style={{
                                  borderRadius: '12px',
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: '#fff'
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              name="companyRegistration"
                              rules={[{ required: true, message: 'Company registration number is required' }]}
                            >
                              <Input 
                                placeholder="Company registration number" 
                                size="large"
                                style={{
                                  borderRadius: '12px',
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: '#fff'
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              name="companyWebsite"
                              rules={[
                                { required: true, message: 'Company website is required' },
                                { type: 'url', message: 'Please enter a valid URL' }
                              ]}
                            >
                              <Input 
                                placeholder="Company website (https://example.com)" 
                                size="large"
                                style={{
                                  borderRadius: '12px',
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: '#fff'
                                }}
                              />
                            </Form.Item>
                            <div style={{ 
                              color: 'rgba(255,255,255,0.7)', 
                              fontSize: '12px', 
                              marginBottom: '16px',
                              padding: '8px 12px',
                              background: 'rgba(255,193,7,0.1)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,193,7,0.2)'
                            }}>
                              ⚠️ Company accounts require verification before accessing the enterprise dashboard
                            </div>
                          </>
                        ) : null;
                      }}
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      block
                      style={{
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '16px',
                        marginTop: '10px'
                      }}
                    >
                      Create Account
                    </Button>
                  </Form>
                )
              }
            ]}
            style={{
              '& .ant-tabs-tab': {
                color: 'rgba(255,255,255,0.7) !important'
              },
              '& .ant-tabs-tab-active': {
                color: '#fff !important'
              }
            }}
          />
        </div>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        open={forgotVisible}
        onCancel={() => setForgotVisible(false)}
        footer={null}
        centered
        width={400}
        styles={{
          content: {
            background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
            backdropFilter: 'blur(30px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <ForgotPassword onClose={() => setForgotVisible(false)} />
      </Modal>

      {/* Global Styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        .ant-input, .ant-input-password {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #fff !important;
        }
        
        .ant-input::placeholder,
        .ant-input-password input::placeholder {
          color: rgba(255,255,255,0.5) !important;
        }
        
        .ant-select .ant-select-selector {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #fff !important;
        }
        
        .ant-tabs-tab {
          color: rgba(255,255,255,0.7) !important;
        }
        
        .ant-tabs-tab-active {
          color: #fff !important;
        }
        
        .ant-tabs-ink-bar {
          background: linear-gradient(135deg, #FF6B6B, #4ECDC4) !important;
        }

        /* Notification dropdown overrides */
        .ant-dropdown-menu {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
        }

        .ant-dropdown-menu-item {
          color: #000 !important;
          background: transparent !important;
        }

        .ant-dropdown-menu-item:hover {
          background: rgba(0, 0, 0, 0.05) !important;
          color: #000 !important;
        }

        .ant-dropdown-menu-item-selected {
          background: rgba(0, 0, 0, 0.1) !important;
          color: #000 !important;
        }

        .notification-item {
          color: #000 !important;
        }

        .notification-item .ant-typography {
          color: #000 !important;
        }

        .ant-dropdown-menu-item .ant-dropdown-menu-title-content {
          color: #000 !important;
        }

        .ant-dropdown-menu-item:hover .ant-dropdown-menu-title-content {
          color: #000 !important;
        }

        .ant-dropdown-menu-item .ant-dropdown-menu-title-content span {
          color: #000 !important;
        }

        .ant-dropdown-menu-item:hover .ant-dropdown-menu-title-content span {
          color: #000 !important;
        }

        /* Additional overrides for notification text */
        .ant-dropdown-menu-item * {
          color: #000 !important;
        }

        .ant-dropdown-menu-item:hover * {
          color: #000 !important;
        }

        .notification-item * {
          color: #000 !important;
        }

        .notification-item div {
          color: #000 !important;
        }

        .notification-item span {
          color: #000 !important;
        }

        /* Force text visibility in dropdown */
        .ant-dropdown-menu-item .ant-dropdown-menu-title-content {
          color: #000 !important;
          background: transparent !important;
        }

        .ant-dropdown-menu-item .ant-dropdown-menu-title-content > div {
          color: #000 !important;
          background: transparent !important;
        }

        .ant-dropdown-menu-item .ant-dropdown-menu-title-content > div > div {
          color: #000 !important;
          background: transparent !important;
        }

        /* Override any inherited text colors */
        .ant-dropdown-menu-item * {
          color: inherit !important;
        }

        .notification-item, .notification-item * {
          color: #000 !important;
          background: transparent !important;
        }

        /* Target the specific dropdown structure */
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content {
          color: #000 !important;
        }

        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content div {
          color: #000 !important;
        }

        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content div div {
          color: #000 !important;
        }

        /* Ensure all text elements are black */
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item,
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item *,
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content,
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content * {
          color: #000 !important;
        }

        /* Custom notification classes */
        .custom-notification {
          color: #000 !important;
        }

        .custom-notification * {
          color: #000 !important;
        }

        .notification-message {
          color: #000 !important;
        }

        .notification-time {
          color: rgba(0,0,0,0.6) !important;
        }

        /* Force override for all notification elements */
        .custom-notification,
        .custom-notification div,
        .custom-notification span,
        .notification-message,
        .notification-time {
          color: #000 !important;
          background: transparent !important;
        }

        /* Super strong overrides for local development */
        .ant-dropdown-menu-item div,
        .ant-dropdown-menu-item span,
        .ant-dropdown-menu-item * {
          color: #000 !important;
          text-shadow: none !important;
        }

        /* Force all dropdown content to be black */
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content div,
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content span,
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .ant-dropdown-menu-title-content * {
          color: #000 !important;
          background: transparent !important;
        }

        /* Override any inherited styles from parent components */
        .ant-dropdown-menu-item .ant-dropdown-menu-title-content > div > div > div {
          color: #000 !important;
        }

        /* Make sure the dropdown background is light */
        .ant-dropdown-menu {
          background: #ffffff !important;
        }

        /* Force text visibility with specific classes */
        .force-black-text,
        .force-black-text *,
        .force-gray-text,
        .force-gray-text * {
          color: #000 !important;
          text-shadow: none !important;
          background: transparent !important;
        }

        .force-gray-text,
        .force-gray-text * {
          color: rgba(0,0,0,0.6) !important;
        }
      `}</style>
    </>
  );
};

export default ModernNavbar; 