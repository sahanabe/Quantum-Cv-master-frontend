
import React from 'react';

// 3D Glassmorphism and floating card effect with animated team avatars
const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'CEO & Founder',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Visionary leader with a passion for AI and career development.'
  },
  {
    name: 'John Smith',
    role: 'CTO',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    bio: 'Tech enthusiast and architect of our AI-driven platform.'
  },
  {
    name: 'Alice Johnson',
    role: 'Lead Designer',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    bio: 'Designs intuitive and beautiful user experiences.'
  },
  {
    name: 'Bob Lee',
    role: 'AI Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
    bio: 'Builds and optimizes our AI resume analysis engine.'
  }
];

const glassStyle = {
  background: 'rgba(24,28,42,0.85)',
  borderRadius: '32px',
  boxShadow: '0 8px 32px 0 #246bfd55, 0 1.5px 8px 0 #0008',
  backdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(36,107,253,0.18)',
  padding: '40px 32px',
  marginBottom: 40,
  color: '#fff',
  position: 'relative',
  overflow: 'visible',
};

const ContactUs = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #101522 60%, #246bfd 100%)', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* 3D Company Card */}
    <div style={{ ...glassStyle, maxWidth: 600, width: '90%', transform: 'rotateY(-8deg) rotateX(4deg)', margin: '0 auto 48px auto', border: '2.5px solid #246bfd55', boxShadow: '0 16px 48px #246bfd55, 0 2px 16px #0008' }}>
      <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: 2, color: '#52c41a', marginBottom: 12, textShadow: '0 2px 12px #246bfd88' }}>Contact Us</h1>
      <p style={{ color: '#b0e1ff', fontSize: 20, marginBottom: 24, fontWeight: 500 }}>We'd love to hear from you! Reach out for support, partnership, or feedback.</p>
      <div style={{ fontSize: 18, marginBottom: 8 }}><b>Email:</b> <a href="mailto:support@cvscannerai.com" style={{ color: '#246bfd' }}>support@cvscannerai.com</a></div>
      <div style={{ fontSize: 18, marginBottom: 8 }}><b>Phone:</b> <span style={{ color: '#b0e1ff' }}>+1 (555) 123-4567</span></div>
      <div style={{ fontSize: 18, marginBottom: 8 }}><b>Address:</b> <span style={{ color: '#b0e1ff' }}>123 AI Avenue, Tech City, USA</span></div>
    </div>

    {/* 3D About Us Card */}
    <div style={{ ...glassStyle, maxWidth: 700, width: '95%', transform: 'rotateY(6deg) rotateX(-2deg)', border: '2.5px solid #52c41a55', boxShadow: '0 12px 36px #52c41a55, 0 1.5px 8px #0008' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#246bfd', marginBottom: 10, textShadow: '0 2px 12px #52c41a88' }}>About Us</h2>
      <p style={{ color: '#b0b3c7', fontSize: 18, fontWeight: 500 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>CVScanner AI</span> empowers job seekers with advanced AI tools for resume analysis and optimization. Our mission is to help you land your dream job by making your CV stand out in today’s competitive market.
      </p>
    </div>

    {/* 3D Team Section with floating avatars */}
    <div style={{ ...glassStyle, maxWidth: 900, width: '98%', marginBottom: 0, background: 'rgba(24,28,42,0.92)', border: '2.5px solid #fff2', boxShadow: '0 8px 32px #246bfd33, 0 1.5px 8px #0008' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#52c41a', marginBottom: 24, textShadow: '0 2px 12px #246bfd88' }}>Our Team</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
        {teamMembers.map((member, idx) => (
          <div key={member.name} style={{
            background: 'linear-gradient(135deg, #246bfd33 60%, #52c41a33 100%)',
            borderRadius: 24,
            boxShadow: '0 4px 24px #246bfd44, 0 1.5px 8px #0008',
            padding: 28,
            minWidth: 220,
            maxWidth: 260,
            margin: '0 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${Math.sin(idx * 1.5) * 12}px) scale(1.04)`,
            transition: 'transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: 16,
              boxShadow: '0 4px 24px #246bfd55',
              border: '3.5px solid #246bfd',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateY(-18px) scale(1.08)`,
              animation: `floatAvatar 2.5s ease-in-out ${0.2 * idx}s infinite alternate`,
            }}>
              <img src={member.avatar} alt={member.name} style={{ width: 80, height: 80, borderRadius: '50%' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 4 }}>{member.name}</div>
            <div style={{ color: '#246bfd', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{member.role}</div>
            <div style={{ color: '#b0b3c7', fontSize: 15, textAlign: 'center' }}>{member.bio}</div>
          </div>
        ))}
      </div>
      {/* 3D floating effect keyframes */}
      <style>{`
        @keyframes floatAvatar {
          0% { transform: translateY(-18px) scale(1.08); }
          100% { transform: translateY(10px) scale(1.08); }
        }
      `}</style>
    </div>
  </div>
);

export default ContactUs;
