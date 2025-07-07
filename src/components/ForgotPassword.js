import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const ForgotPassword = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email })
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        message.success('Password reset instructions sent to your email.');
      } else {
        message.error(data.message || 'Failed to send reset email.');
      }
    } catch (err) {
      message.error('Server error');
    }
    setLoading(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      title="Forgot Password"
      destroyOnHidden
    >
      {sent ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p>Check your email for a password reset link.</p>
          <Button type="primary" onClick={onCancel}>Close</Button>
        </div>
      ) : (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Invalid email!' }
            ]}
          >
            <Input autoFocus />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ForgotPassword;
