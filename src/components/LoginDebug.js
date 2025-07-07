import React, { useState } from 'react';
import { Card, Button, Form, Input, message, Typography, Space, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const LoginDebug = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);
  const [loginResult, setLoginResult] = useState(null);

  const checkServerStatus = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/health`);
      if (res.ok) {
        const data = await res.json();
        setServerStatus({ status: 'online', data });
        message.success('Backend server is running!');
      } else {
        setServerStatus({ status: 'error', error: 'Server responded with error' });
      }
    } catch (error) {
      setServerStatus({ status: 'offline', error: error.message });
      message.error('Backend server is not running');
    }
  };

  const testLogin = async (values) => {
    setLoading(true);
    setLoginResult(null);
    
    try {
      console.log('Testing login with:', values);
      
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setLoginResult({ success: true, data });
        message.success('Login successful!');
        
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
        }, 2000); // Delay to show the result
        
      } else {
        setLoginResult({ success: false, error: data.message || 'Login failed', data });
        message.error(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginResult({ success: false, error: error.message });
      message.error('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '20px' }}>
      <Title level={2}>🔧 Login Debug Tool</Title>
      
      <Alert
        message="Test Credentials"
        description={
          <div>
            <p><strong>Regular User:</strong></p>
            <p>Email: test@quantumcv.com</p>
            <p>Password: password123</p>
            <br />
            <p><strong>Admin User:</strong></p>
            <p>Email: admin@quantumcv.com</p>
            <p>Password: admin123</p>
          </div>
        }
        type="info"
        style={{ marginBottom: 20 }}
      />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Server Status Check */}
        <Card title="1. Check Backend Server Status">
          <Button onClick={checkServerStatus} type="primary">
            Check Server Status
          </Button>
          {serverStatus && (
            <div style={{ marginTop: 16 }}>
              <Text strong>Status: </Text>
              <Text type={serverStatus.status === 'online' ? 'success' : 'danger'}>
                {serverStatus.status}
              </Text>
              {serverStatus.data && (
                <Paragraph code style={{ marginTop: 8 }}>
                  {JSON.stringify(serverStatus.data, null, 2)}
                </Paragraph>
              )}
              {serverStatus.error && (
                <Paragraph type="danger" style={{ marginTop: 8 }}>
                  Error: {serverStatus.error}
                </Paragraph>
              )}
            </div>
          )}
        </Card>

        {/* Login Test */}
        <Card title="2. Test Login Functionality">
          <Form onFinish={testLogin} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            
            <Button type="primary" htmlType="submit" loading={loading}>
              Test Login
            </Button>
          </Form>

          {loginResult && (
            <div style={{ marginTop: 16 }}>
              <Text strong>Login Result: </Text>
              <Text type={loginResult.success ? 'success' : 'danger'}>
                {loginResult.success ? 'SUCCESS' : 'FAILED'}
              </Text>
              
              {loginResult.success && loginResult.data && (
                <div style={{ marginTop: 8 }}>
                  <Text strong>User Data:</Text>
                  <Paragraph code style={{ marginTop: 4 }}>
                    {JSON.stringify(loginResult.data.user, null, 2)}
                  </Paragraph>
                  <Text strong>Token:</Text>
                  <Paragraph code style={{ marginTop: 4 }}>
                    {loginResult.data.token ? 'Token received ✓' : 'No token ✗'}
                  </Paragraph>
                </div>
              )}
              
              {!loginResult.success && (
                <Paragraph type="danger" style={{ marginTop: 8 }}>
                  Error: {loginResult.error}
                  {loginResult.data && (
                    <pre style={{ marginTop: 8 }}>
                      {JSON.stringify(loginResult.data, null, 2)}
                    </pre>
                  )}
                </Paragraph>
              )}
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card title="3. Troubleshooting Steps">
          <ol>
            <li>First, check if the backend server is running (step 1)</li>
            <li>If server is offline, start it with: <code>cd backend && npm start</code></li>
            <li>Test login with the provided credentials (step 2)</li>
            <li>Check browser console for additional error messages</li>
            <li>Verify MongoDB is running and accessible</li>
          </ol>
        </Card>
      </Space>
    </div>
  );
};

export default LoginDebug; 