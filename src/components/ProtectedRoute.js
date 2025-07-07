import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { LockOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons';

const ProtectedRoute = ({ children, loggedInUser, token, requiredRole, openLoginModal }) => {
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = loggedInUser && token;

  // Check if user has required role (if specified)
  const hasRequiredRole = !requiredRole || (loggedInUser && loggedInUser.role === requiredRole);

  // Special check for company verification
  const isCompanyVerified = requiredRole === 'company' ? 
    (loggedInUser && loggedInUser.companyVerified === true) : true;

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '60px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <Result
            icon={<LockOutlined style={{ color: '#4ECDC4', fontSize: '80px' }} />}
            title={<span style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold' }}>Authentication Required</span>}
            subTitle={
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                You need to login to access this page. Please sign in to continue.
              </span>
            }
            extra={[
              <Button
                key="login"
                type="primary"
                size="large"
                onClick={() => {
                  if (openLoginModal) {
                    openLoginModal();
                  } else {
                    navigate('/');
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 32px',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginRight: '16px'
                }}
              >
                Login Now
              </Button>,
              <Button
                key="home"
                size="large"
                onClick={() => navigate('/')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '0 32px',
                  height: '48px',
                  fontSize: '16px'
                }}
              >
                Go Home
              </Button>
            ]}
          />
        </div>
      </div>
    );
  }

  // If authenticated but doesn't have required role, show access denied
  if (!hasRequiredRole) {
    const getRoleMessage = () => {
      switch (requiredRole) {
        case 'admin':
          return 'This page is restricted to administrators only.';
        case 'company':
          return 'This page is restricted to company accounts only.';
        case 'user':
          return 'This page is restricted to regular user accounts only.';
        default:
          return 'You do not have permission to access this page.';
      }
    };

    const getRoleIcon = () => {
      switch (requiredRole) {
        case 'admin':
          return '👑';
        case 'company':
          return '🏢';
        case 'user':
          return '👤';
        default:
          return '🚫';
      }
    };

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '60px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <Result
            icon={<WarningOutlined style={{ color: '#FF6B6B', fontSize: '80px' }} />}
            title={<span style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold' }}>Access Denied</span>}
            subTitle={
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{getRoleIcon()}</div>
                <p>{getRoleMessage()}</p>
                <p>Your current role: <strong style={{ color: '#4ECDC4' }}>{loggedInUser.role?.toUpperCase() || 'USER'}</strong></p>
                <p>Required role: <strong style={{ color: '#FF6B6B' }}>{requiredRole?.toUpperCase()}</strong></p>
              </div>
            }
            extra={[
              <Button
                key="dashboard"
                type="primary"
                size="large"
                onClick={() => {
                  // Redirect to appropriate dashboard based on user role
                  if (loggedInUser.role === 'admin') {
                    navigate('/admin');
                  } else if (loggedInUser.role === 'company') {
                    navigate('/enterprise-dashboard');
                  } else {
                    navigate('/dashboard');
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 32px',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginRight: '16px'
                }}
              >
                Go to My Dashboard
              </Button>,
              <Button
                key="home"
                size="large"
                onClick={() => navigate('/')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '0 32px',
                  height: '48px',
                  fontSize: '16px'
                }}
              >
                Go Home
              </Button>
            ]}
          />
        </div>
      </div>
    );
  }

  // If company user but not verified, show verification pending
  if (!isCompanyVerified) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '60px',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}>
          <Result
            icon={<UserOutlined style={{ color: '#FFA500', fontSize: '80px' }} />}
            title={<span style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold' }}>Account Verification Pending</span>}
            subTitle={
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                <p>Your company account is currently under review by our admin team.</p>
                <p>You will receive access to the enterprise dashboard once your company is verified.</p>
                <div style={{ 
                  marginTop: '20px',
                  padding: '16px',
                  background: 'rgba(255, 165, 0, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 165, 0, 0.3)'
                }}>
                  <strong>Status:</strong> {loggedInUser.verificationStatus || 'Pending'}
                  {loggedInUser.companyName && (
                    <><br /><strong>Company:</strong> {loggedInUser.companyName}</>
                  )}
                </div>
              </div>
            }
            extra={[
              <Button
                key="home"
                size="large"
                onClick={() => navigate('/')}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 32px',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                Return to Home
              </Button>
            ]}
          />
        </div>
      </div>
    );
  }

  // If authenticated and has required role, render the protected component
  return children;
};

export default ProtectedRoute; 