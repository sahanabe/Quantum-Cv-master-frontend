import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';
  const token = params.get('token') || '';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          token,
          password: values.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        message.success('Password reset successful! You can now log in.');
      } else {
        message.error(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      message.error('Server error');
    }
    setLoading(false);
  };

  if (!email || !token) {
    return <Card style={{ maxWidth: 400, margin: '48px auto' }}><p>Invalid or expired reset link.</p></Card>;
  }

  return (
    <Card style={{ maxWidth: 400, margin: '48px auto' }}>
      {success ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p>Password reset successful!</p>
          <a href="/">Return to Login</a>
        </div>
      ) : (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
            hasFeedback
          >
            <Input.Password autoFocus />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default ResetPassword;
