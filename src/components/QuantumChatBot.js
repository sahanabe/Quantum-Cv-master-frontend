import React, { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Input, 
  Avatar, 
  Tooltip, 
  Badge,
  Drawer,
  Card,
  Tag,
  Divider,
  Typography,
  Space,
  Progress,
  Rate,
  Modal,
  message
} from 'antd';
import { aiChat } from '../services/aiService';
import {
  RobotOutlined,
  SendOutlined,
  MessageOutlined,
  CloseOutlined,
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  RocketOutlined,
  StarFilled,
  ThunderboltFilled,
  HeartFilled,
  SmileOutlined,
  CustomerServiceOutlined,
  ApiOutlined,
  ClearOutlined,
  CopyOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  SoundOutlined,
  MutedOutlined
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const QuantumChatBot = ({ loggedInUser, openLoginModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [chatSession, setChatSession] = useState(null);
  const [quickActions, setQuickActions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [chatRating, setChatRating] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize chatbot with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      content: `🚀 Welcome to Quantum AI Assistant! I'm here to help you with your career journey. How can I assist you today?`,
      timestamp: new Date(),
      actions: [
        { label: 'Upload Resume', action: 'upload-resume', icon: '📄' },
        { label: 'Find Jobs', action: 'find-jobs', icon: '🔍' },
        { label: 'Career Advice', action: 'career-advice', icon: '💡' },
        { label: 'Product Demo', action: 'product-demo', icon: '🎯' }
      ]
    };
    setMessages([welcomeMessage]);
    setQuickActions([
      { label: 'Resume Analysis', action: 'analyze-resume', icon: '📊' },
      { label: 'Job Search', action: 'job-search', icon: '🔍' },
      { label: 'Interview Prep', action: 'interview-prep', icon: '🎤' },
      { label: 'Salary Info', action: 'salary-info', icon: '💰' }
    ]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update unread count
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    } else {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    if (isSoundEnabled) {
      // Create a subtle notification sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const generateBotResponse = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Use the AI service for more intelligent responses
      const context = `You are Quantum AI, a helpful career assistant for the Quantum CV platform. 
      You help users with resume optimization, job search, interview preparation, and career advice. 
      Be friendly, professional, and provide actionable advice. Keep responses concise but helpful.`;
      
      const aiResponse = await aiChat(userMessage, context);
      
      let response = aiResponse.response || 'I apologize, but I couldn\'t process your request at the moment.';
      let actions = [];
      
      const lowerMessage = userMessage.toLowerCase();
      
      // Add contextual actions based on user input
      if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
        actions = [
          { label: 'Upload Resume', action: 'upload-resume', icon: '📄' },
          { label: 'Resume Tips', action: 'resume-tips', icon: '💡' }
        ];
      } else if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
        actions = [
          { label: 'Browse Jobs', action: 'browse-jobs', icon: '🔍' },
          { label: 'Set Preferences', action: 'set-preferences', icon: '⚙️' }
        ];
      } else if (lowerMessage.includes('interview') || lowerMessage.includes('preparation')) {
        actions = [
          { label: 'Practice Questions', action: 'practice-questions', icon: '❓' },
          { label: 'Mock Interview', action: 'mock-interview', icon: '🎭' }
        ];
      } else if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
        actions = [
          { label: 'Salary Calculator', action: 'salary-calculator', icon: '🧮' },
          { label: 'Negotiation Tips', action: 'negotiation-tips', icon: '🤝' }
        ];
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        actions = [
          { label: 'Get Started', action: 'get-started', icon: '🚀' },
          { label: 'Take Tour', action: 'take-tour', icon: '🎯' }
        ];
      } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        actions = [
          { label: 'Contact Support', action: 'contact-support', icon: '📞' },
          { label: 'FAQ', action: 'faq', icon: '❓' }
        ];
      } else {
        actions = [
          { label: 'Ask About Resumes', action: 'ask-resumes', icon: '📄' },
          { label: 'Ask About Jobs', action: 'ask-jobs', icon: '🔍' }
        ];
      }
      
      const botMessage = {
        id: Date.now(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        actions: actions
      };
      
      setMessages(prev => [...prev, botMessage]);
      playNotificationSound();
      
    } catch (error) {
      console.error('AI Chat Error:', error);
      message.error('Sorry, I encountered an error. Please try again.');
      
      const botMessage = {
        id: Date.now(),
        type: 'bot',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
        timestamp: new Date(),
        actions: []
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatHistory(prev => [...prev, inputValue.trim()]);
    setInputValue('');
    
    await generateBotResponse(inputValue.trim());
  };

  const handleQuickAction = async (action) => {
    let message = '';
    
    switch (action) {
      case 'upload-resume':
        message = 'I want to upload my resume for analysis';
        break;
      case 'find-jobs':
      case 'browse-jobs':
        message = 'Help me find job opportunities';
        break;
      case 'career-advice':
        message = 'I need career advice';
        break;
      case 'product-demo':
        message = 'Show me a product demonstration';
        break;
      case 'analyze-resume':
        message = 'Analyze my resume';
        break;
      case 'job-search':
        message = 'Help with job search';
        break;
      case 'interview-prep':
        message = 'Prepare for interviews';
        break;
      case 'salary-info':
        message = 'Get salary information';
        break;
      default:
        message = action.replace('-', ' ');
    }
    
    setInputValue(message);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setChatHistory([]);
    setChatRating(0);
    // Re-add welcome message
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      content: `🚀 Chat cleared! How can I help you today?`,
      timestamp: new Date(),
      actions: [
        { label: 'Upload Resume', action: 'upload-resume', icon: '📄' },
        { label: 'Find Jobs', action: 'find-jobs', icon: '🔍' }
      ]
    };
    setMessages([welcomeMessage]);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const MessageBubble = ({ message }) => (
    <div style={{
      display: 'flex',
      justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
      marginBottom: '16px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message.type === 'bot' && (
        <Avatar
          icon={<RobotOutlined />}
          style={{
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            marginRight: '8px',
            boxShadow: '0 4px 12px rgba(78, 205, 196, 0.3)'
          }}
          size="small"
        />
      )}
      
      <div style={{
        maxWidth: '75%',
        background: message.type === 'user' 
          ? 'linear-gradient(135deg, #FF6B6B, #FF8E8E)'
          : 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: message.type === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
        padding: '12px 16px',
        position: 'relative'
      }}>
        <Text style={{ 
          color: '#fff', 
          fontSize: '14px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap'
        }}>
          {message.content}
        </Text>
        
        {message.actions && message.actions.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {message.actions.map((action, index) => (
              <Button
                key={index}
                size="small"
                style={{
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: '12px'
                }}
                onClick={() => handleQuickAction(action.action)}
              >
                {action.icon} {action.label}
              </Button>
            ))}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
          opacity: 0.7
        }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {message.type === 'bot' && (
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => copyMessage(message.content)}
              style={{ color: 'rgba(255, 255, 255, 0.6)', padding: '0 4px' }}
            />
          )}
        </div>
      </div>
      
      {message.type === 'user' && (
        <Avatar
          icon={<UserOutlined />}
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
            marginLeft: '8px'
          }}
          size="small"
        />
      )}
    </div>
  );

  const TypingIndicator = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <Avatar
        icon={<RobotOutlined />}
        style={{
          background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
          marginRight: '8px'
        }}
        size="small"
      />
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px 20px 20px 5px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <div className="typing-dot" style={{ 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          background: '#4ECDC4',
          animation: 'typing 1.4s infinite ease-in-out'
        }} />
        <div className="typing-dot" style={{ 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          background: '#4ECDC4',
          animation: 'typing 1.4s infinite ease-in-out 0.2s'
        }} />
        <div className="typing-dot" style={{ 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          background: '#4ECDC4',
          animation: 'typing 1.4s infinite ease-in-out 0.4s'
        }} />
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Chat Button */}
      <div style={{
        position: 'fixed',
        bottom: '150px',
        right: '30px',
        zIndex: 1000
      }}>
        <Badge count={unreadCount} offset={[-5, 5]}>
          <Tooltip title="Chat with Quantum AI Assistant" placement="left">
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<MessageOutlined />}
              onClick={() => setIsOpen(true)}
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                border: 'none',
                boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
                animation: isOnline ? 'pulse 2s infinite' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}
            />
          </Tooltip>
        </Badge>
        
        {/* Online Status Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: isOnline ? '#52C41A' : '#FF4D4F',
          border: '2px solid #fff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }} />
      </div>

      {/* Chat Drawer */}
      <Drawer
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar
                icon={<RobotOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  boxShadow: '0 4px 12px rgba(78, 205, 196, 0.3)'
                }}
              />
              <div>
                <Text style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>
                  Quantum AI Assistant
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isOnline ? '#52C41A' : '#FF4D4F',
                    animation: isOnline ? 'pulse 2s infinite' : 'none'
                  }} />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Text>
                </div>
              </div>
            </div>
            
            <Space>
              <Tooltip title={isSoundEnabled ? 'Mute notifications' : 'Enable notifications'}>
                <Button
                  type="text"
                  size="small"
                  icon={isSoundEnabled ? <SoundOutlined /> : <MutedOutlined />}
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
              </Tooltip>
              
              <Tooltip title="Clear chat">
                <Button
                  type="text"
                  size="small"
                  icon={<ClearOutlined />}
                  onClick={clearChat}
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
              </Tooltip>
              
              <Tooltip title="Settings">
                <Button
                  type="text"
                  size="small"
                  icon={<SettingOutlined />}
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
              </Tooltip>
            </Space>
          </div>
        }
        placement="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={400}
        styles={{
          header: {
            background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          },
          body: {
            background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
            padding: 0
          }
        }}
      >
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Quick Actions */}
          <div style={{ 
            padding: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>
              Quick Actions
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  size="small"
                  style={{
                    borderRadius: '12px',
                    background: 'rgba(78, 205, 196, 0.1)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                    color: '#4ECDC4',
                    fontSize: '12px'
                  }}
                  onClick={() => handleQuickAction(action.action)}
                >
                  {action.icon} {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            padding: '16px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 200px)'
          }}>
            {messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ 
            padding: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <Input.TextArea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: '#fff',
                  resize: 'none'
                }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  border: 'none',
                  height: '32px'
                }}
              />
            </div>
            
            {chatHistory.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                  💬 {messages.length} messages • ⭐ Rate this conversation
                </Text>
                <Rate 
                  size="small" 
                  value={chatRating}
                  onChange={setChatRating}
                  style={{ marginLeft: '8px', fontSize: '12px' }}
                />
              </div>
            )}
          </div>
        </div>
      </Drawer>

      {/* Global Styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 12px 35px rgba(78, 205, 196, 0.6); }
          100% { transform: scale(1); box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        .ant-drawer-content-wrapper {
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3) !important;
        }
        
        .ant-input, .ant-input:focus {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: #fff !important;
        }
        
        .ant-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        .ant-rate {
          color: #FFD93D !important;
        }
      `}</style>
    </>
  );
};

export default QuantumChatBot;