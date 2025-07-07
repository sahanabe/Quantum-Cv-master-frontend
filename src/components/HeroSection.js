import React, { useState } from 'react';
import { Typography, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AnimatedDots } from './HeroAnimations';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;




const HeroSection = ({ loggedInUser, openLoginModal }) => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "bot", text: "Hi! I'm <b>AHRGE</b>, your QuantumCV AI Assistant. Ask me anything or tell me where you want to go!" }
  ]);

  // Simple navigation map for demo
  const navMap = {
    home: "#root",
    products: "/products",
    jobs: "/jobs",
    dashboard: "/dashboard",
    faq: "/faq",
    upload: "#upload"
  };

  async function handleChatSubmit(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatHistory(h => [...h, { from: "user", text: userMsg }]);

    // Navigation logic (client-side)
    let lower = userMsg.toLowerCase();
    if (lower.includes("product")) {
      setChatHistory(h => [...h, { from: "bot", text: "Navigating to Products page..." }]);
      window.location.href = navMap.products;
      setChatInput("");
      return;
    } else if (lower.includes("job")) {
      setChatHistory(h => [...h, { from: "bot", text: "Navigating to Jobs page..." }]);
      window.location.href = navMap.jobs;
      setChatInput("");
      return;
    } else if (lower.includes("dashboard")) {
      setChatHistory(h => [...h, { from: "bot", text: "Taking you to your Dashboard!" }]);
      window.location.href = navMap.dashboard;
      setChatInput("");
      return;
    } else if (lower.includes("faq") || lower.includes("question")) {
      setChatHistory(h => [...h, { from: "bot", text: "Opening FAQ section..." }]);
      window.location.href = navMap.faq;
      setChatInput("");
      return;
    } else if (lower.includes("upload")) {
      setChatHistory(h => [...h, { from: "bot", text: "Scroll to the upload section below!" }]);
      document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
      setChatInput("");
      return;
    } else if (lower.includes("home")) {
      setChatHistory(h => [...h, { from: "bot", text: "Back to the homepage!" }]);
      window.location.href = "/";
      setChatInput("");
      return;
    }

    // AI backend call
    setChatHistory(h => [...h, { from: "bot", text: '<span style="color:#b0e1ff">Thinking...</span>' }]);
    setChatInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setChatHistory(h => {
        // Replace last "Thinking..." message with real reply or error
        const newHist = [...h];
        for (let i = newHist.length - 1; i >= 0; i--) {
          if (newHist[i].from === "bot" && newHist[i].text.includes("Thinking")) {
            if (!res.ok || !data.reply) {
              newHist[i] = { from: "bot", text: "Sorry, the AI service is currently unavailable." };
            } else {
              newHist[i] = { from: "bot", text: data.reply };
            }
            return newHist;
          }
        }
        // fallback: just append
        if (!res.ok || !data.reply) {
          return [...h, { from: "bot", text: "Sorry, the AI service is currently unavailable." }];
        } else {
          return [...h, { from: "bot", text: data.reply }];
        }
      });
    } catch (err) {
      setChatHistory(h => {
        // Replace last "Thinking..." message with error
        const newHist = [...h];
        for (let i = newHist.length - 1; i >= 0; i--) {
          if (newHist[i].from === "bot" && newHist[i].text.includes("Thinking")) {
            newHist[i] = { from: "bot", text: "Sorry, the AI service is currently unavailable." };
            return newHist;
          }
        }
        return [...h, { from: "bot", text: "Sorry, the AI service is currently unavailable." }];
      });
    }
  }

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '80px 0 64px 0',
      minHeight: 520,
      overflow: 'hidden',
      borderRadius: 32,
      boxShadow: '0 8px 48px #246bfd33',
      background: 'linear-gradient(120deg, #181c2a 60%, #246bfd33 100%)',
      marginBottom: 48,
    }}>
      <AnimatedDots />
      <div style={{ flex: 1.5, minWidth: 340, paddingRight: 32, paddingLeft: 32, zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: 20, color: '#246bfd', fontWeight: 800, fontSize: 20, letterSpacing: 2, textTransform: 'uppercase', textShadow: '0 2px 12px #246bfd44' }}>Welcome to the Future of Careers</div>
        <div style={{ color: '#fff', fontSize: 38, fontWeight: 900, marginBottom: 18, lineHeight: 1.1, textShadow: '0 2px 32px #246bfd55' }}>
          Where <span style={{ color: '#246bfd' }}>AI</span> Meets Opportunity
        </div>
        <div style={{ color: '#b0e1ff', fontSize: 20, marginBottom: 32, maxWidth: 520, textShadow: '0 2px 12px #246bfd22', fontWeight: 500 }}>
          Unlock your potential with QuantumCV. Our intelligent platform analyzes your resume, understands your unique strengths, and helps you stand out in a world shaped by technology. <br />
          <span style={{ color: '#246bfd', fontWeight: 700 }}>Step into tomorrow—today.</span>
        </div>
        <Button
          id="upload"
          type="primary"
          size="large"
          icon={<UploadOutlined style={{ fontSize: 28, marginRight: 8 }} />}
          style={{
            fontSize: 22,
            padding: '0 48px',
            height: 64,
            borderRadius: 32,
            boxShadow: '0 4px 24px #246bfd88, 0 2px 8px #52c41a33',
            background: 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)',
            border: 'none',
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onClick={() => {
            if (loggedInUser) {
              navigate('/upload-quantum-resume');
            } else if (openLoginModal) {
              openLoginModal();
            }
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #52c41a 40%, #246bfd 100%)';
            e.currentTarget.style.boxShadow = '0 8px 32px #52c41a88, 0 2px 8px #246bfd33';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #246bfd 60%, #52c41a 100%)';
            e.currentTarget.style.boxShadow = '0 4px 24px #246bfd88, 0 2px 8px #52c41a33';
          }}
        >
          <span style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #fff 60%, #b0e1ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Upload Resume (Classic)
          </span>
        </Button>
      </div>

      <div style={{ flex: 1, minWidth: 340, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2, position: 'relative' }}>
        {/* 3D SVG Design (floating cube and sphere) */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 420, height: 420, zIndex: 1, pointerEvents: 'none' }}>
          <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0, top: 0 }}>
            {/* 3D Cube */}
            <g style={{ filter: 'drop-shadow(0 8px 32px #246bfd66)' }}>
              <rect x="70" y="90" width="110" height="110" rx="18" fill="#246bfd" fillOpacity="0.85"/>
              <rect x="90" y="110" width="110" height="110" rx="18" fill="#52c41a" fillOpacity="0.18"/>
              <rect x="110" y="130" width="110" height="110" rx="18" fill="#fff" fillOpacity="0.10"/>
            </g>
            {/* 3D Sphere */}
            <ellipse cx="320" cy="120" rx="60" ry="60" fill="#52c41a" fillOpacity="0.18"/>
            <ellipse cx="320" cy="120" rx="48" ry="48" fill="#246bfd" fillOpacity="0.13"/>
            <ellipse cx="320" cy="120" rx="36" ry="36" fill="#fff" fillOpacity="0.10"/>
            {/* Animated floating effect */}
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 18; 0 0" dur="4s" repeatCount="indefinite"/>
          </svg>
        </div>
        <img
          src="/Flux_Dev_A_friendly_robot_and_a_-removebg-preview.png"
          alt="AI and Kid"
          style={{ width: 420, height: 420, objectFit: 'contain', animation: 'floatHero 4s ease-in-out infinite alternate', position: 'relative', zIndex: 2 }}
        />
        <style>{`
          @keyframes floatHero {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-18px) scale(1.04); }
          }
        `}</style>
      </div>

      {/* AI Chatbot Floating Button and Panel */}
      <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }}>
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            style={{
              background: 'radial-gradient(circle at 60% 40%, #fff 0%, #b0e1ff 60%, #246bfd 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 76,
              height: 76,
              boxShadow: '0 0 36px 10px #4fd1ff99, 0 4px 24px #246bfd55',
              fontSize: 40,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              animation: 'glowPulse 2.2s infinite alternate',
              transition: 'box-shadow 0.3s',
              overflow: 'hidden',
            }}
            aria-label="Open AI Chatbot"
          >
            {/* New: Futuristic chat bot face with a smile and antenna */}
            <span style={{
              display: 'inline-block',
              position: 'relative',
              width: 44,
              height: 44,
              animation: 'botWiggle 2.5s infinite ease-in-out',
            }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Antenna */}
                <rect x="20.2" y="2" width="3.6" height="10" rx="1.8" fill="#4fd1ff"/>
                <circle cx="22" cy="2.5" r="2.5" fill="#fff" stroke="#4fd1ff" strokeWidth="1.2"/>
                {/* Head */}
                <ellipse cx="22" cy="26" rx="18" ry="16" fill="#fff" fillOpacity="0.13"/>
                <ellipse cx="22" cy="26" rx="18" ry="16" fill="#4fd1ff" fillOpacity="0.18"/>
                <ellipse cx="22" cy="26" rx="18" ry="16" fill="#fff" fillOpacity="0.08"/>
                <ellipse cx="22" cy="26" rx="16" ry="14" fill="#246bfd" fillOpacity="0.18"/>
                <ellipse cx="22" cy="26" rx="14" ry="12" fill="#fff" fillOpacity="0.95"/>
                {/* Eyes */}
                <ellipse cx="16.5" cy="27" rx="2.2" ry="2.7" fill="#4fd1ff"/>
                <ellipse cx="27.5" cy="27" rx="2.2" ry="2.7" fill="#4fd1ff"/>
                <ellipse cx="16.5" cy="27" rx="1.1" ry="1.3" fill="#246bfd"/>
                <ellipse cx="27.5" cy="27" rx="1.1" ry="1.3" fill="#246bfd"/>
                {/* Smile */}
                <path d="M17 33 Q22 37 27 33" stroke="#4fd1ff" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            <style>{`
              @keyframes glowPulse {
                0% { box-shadow: 0 0 36px 10px #4fd1ff99, 0 4px 24px #246bfd55; }
                100% { box-shadow: 0 0 56px 18px #4fd1ffcc, 0 4px 32px #246bfd99; }
              }
              @keyframes botWiggle {
                0% { transform: rotate(-6deg) scale(1); }
                20% { transform: rotate(4deg) scale(1.04); }
                40% { transform: rotate(-2deg) scale(1.01); }
                60% { transform: rotate(3deg) scale(1.03); }
                80% { transform: rotate(-3deg) scale(1.01); }
                100% { transform: rotate(-6deg) scale(1); }
              }
            `}</style>
          </button>
        )}
        {chatOpen && (
          <div style={{ width: 340, background: '#181c2a', borderRadius: 18, boxShadow: '0 8px 32px #246bfd99', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#246bfd', color: '#fff', padding: '16px 20px', fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>AHRGE • QuantumCV AI Chat</div>
            <div style={{ flex: 1, maxHeight: 320, overflowY: 'auto', padding: 16, background: '#23263a' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ marginBottom: 12, textAlign: msg.from === 'bot' ? 'left' : 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: msg.from === 'bot' ? '#246bfd22' : '#246bfd',
                      color: msg.from === 'bot' ? '#fff' : '#fff',
                      borderRadius: 16,
                      padding: '8px 16px',
                      fontSize: 15,
                      maxWidth: 260,
                      wordBreak: 'break-word',
                    }}
                    dangerouslySetInnerHTML={msg.from === 'bot' ? { __html: msg.text } : undefined}
                  >
                    {msg.from !== 'bot' ? msg.text : null}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} style={{ display: 'flex', borderTop: '1px solid #23263a', background: '#23263a' }}>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask me anything or say 'Go to Jobs'..."
                style={{ flex: 1, border: 'none', outline: 'none', padding: 14, fontSize: 16, background: 'transparent', color: '#fff' }}
                autoFocus
              />
              <button type="submit" style={{ background: '#246bfd', color: '#fff', border: 'none', borderRadius: 0, padding: '0 20px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Send</button>
              <button type="button" onClick={() => setChatOpen(false)} style={{ background: 'none', color: '#fff', border: 'none', fontSize: 22, padding: '0 12px', cursor: 'pointer' }} title="Close">×</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
