import React, { useState } from 'react';
import { Card, Input, Button, Spin, Typography } from 'antd';
import { RobotFilled, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am Quantum CV Assistant. Ask me anything about resumes, job search, or this website.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.response || 'Sorry, I could not answer that.' }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, there was an error. Please try again.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        width: '100%',
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        borderRadius: 24,
        boxShadow: '0 8px 32px #246bfd55',
        background: 'linear-gradient(135deg, #23263a 60%, #181c2a 100%)',
        color: '#fff',
      }}
      bodyStyle={{ padding: 18, background: 'transparent' }}
      title={<span><RobotFilled style={{ color: '#52c41a', marginRight: 8 }} /> Quantum CV ChatBot</span>}
      headStyle={{ background: 'transparent', color: '#fff', borderBottom: 'none' }}
    >
      <div style={{ minHeight: 120, maxHeight: 260, overflowY: 'auto', marginBottom: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.from === 'user' ? 'right' : 'left',
            margin: '8px 0',
          }}>
            <span style={{
              display: 'inline-block',
              background: msg.from === 'user' ? '#246bfd' : '#52c41a',
              color: '#fff',
              borderRadius: 16,
              padding: '7px 14px',
              maxWidth: 260,
              wordBreak: 'break-word',
              fontSize: 15,
              boxShadow: msg.from === 'user' ? '0 2px 8px #246bfd44' : '0 2px 8px #52c41a44',
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <Spin style={{ margin: '8px 0' }} />}
      </div>
      <TextArea
        value={input}
        onChange={e => setInput(e.target.value)}
        onPressEnter={e => { if (!e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        placeholder="Type your question..."
        autoSize={{ minRows: 1, maxRows: 3 }}
        style={{ borderRadius: 12, marginBottom: 8, background: '#181c2a', color: '#fff' }}
        disabled={loading}
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={sendMessage}
        disabled={loading || !input.trim()}
        style={{ borderRadius: 12, fontWeight: 700, width: '100%' }}
      >
        Send
      </Button>
    </Card>
  );
}
