import React, { useState } from 'react';
import { 
  RocketOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
  SendOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  SafetyOutlined,
  GlobalOutlined,
  TeamOutlined,
  StarOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const ModernFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerSections = {
    product: {
      title: 'Product',
      links: [
        { name: 'CV Analyzer', href: '/products', icon: <FileTextOutlined /> },
        { name: 'Job Scan', href: '/jobs', icon: <ThunderboltOutlined /> },
        { name: 'Dashboard', href: '/dashboard', icon: <StarOutlined /> },
        { name: 'Enterprise', href: '/enterprise', icon: <TeamOutlined /> }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: <GlobalOutlined /> },
        { name: 'Careers', href: '/careers', icon: <TeamOutlined /> },
        { name: 'Contact', href: '/contact', icon: <MailOutlined /> },
        { name: 'Blog', href: '/blog', icon: <FileTextOutlined /> }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help', icon: <QuestionCircleOutlined /> },
        { name: 'Documentation', href: '/docs', icon: <FileTextOutlined /> },
        { name: 'API Reference', href: '/api', icon: <ThunderboltOutlined /> },
        { name: 'Status', href: '/status', icon: <StarOutlined /> }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy', icon: <SafetyOutlined /> },
        { name: 'Terms of Service', href: '/terms', icon: <FileTextOutlined /> },
        { name: 'Cookie Policy', href: '/cookies', icon: <SafetyOutlined /> },
        { name: 'GDPR', href: '/gdpr', icon: <GlobalOutlined /> }
      ]
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedinOutlined />, href: '#', color: '#0077B5' },
    { name: 'Twitter', icon: <TwitterOutlined />, href: '#', color: '#1DA1F2' },
    { name: 'Instagram', icon: <InstagramOutlined />, href: '#', color: '#E4405F' }
  ];

  return (
    <footer className="modern-footer" style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      overflow: 'hidden',
      marginTop: '100px'
    }}>
      {/* Quantum Grid Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(78, 205, 196, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(78, 205, 196, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 1
      }} />

      {/* Main Footer Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 24px 0'
      }}>
        {/* Newsletter Section */}
        <div className="newsletter-section" style={{
          textAlign: 'center',
          marginBottom: '80px',
          padding: '60px 40px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <RocketOutlined style={{
              fontSize: '32px',
              color: '#4ECDC4',
              filter: 'drop-shadow(0 0 10px rgba(78, 205, 196, 0.6))'
            }} />
            <h2 style={{
              color: '#fff',
              fontSize: '32px',
              fontWeight: 900,
              margin: 0,
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Stay Quantum
            </h2>
          </div>

          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '18px',
            fontWeight: 500,
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Get the latest insights on AI-powered career optimization, job market trends, and exclusive features.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{
            display: 'flex',
            gap: '16px',
            maxWidth: '500px',
            margin: '0 auto',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: 1,
              position: 'relative',
              minWidth: '250px'
            }}>
              <input
                className="newsletter-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '25px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            
            <button
              className="newsletter-button"
              type="submit"
              style={{
                padding: '16px 24px',
                borderRadius: '25px',
                border: 'none',
                background: subscribed 
                  ? 'linear-gradient(135deg, #52C41A, #73D13D)'
                  : 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                minWidth: '120px',
                justifyContent: 'center'
              }}
            >
              {subscribed ? '✓ Subscribed' : (
                <>
                  <SendOutlined /> Subscribe
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '60px',
          marginBottom: '80px'
        }}>
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="footer-section" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '32px 24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{
                color: '#fff',
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '24px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {section.title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {section.links.map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.href}
                      className="footer-link"
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontSize: '15px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 0',
                        transition: 'all 0.3s ease',
                        borderRadius: '8px'
                      }}
                    >
                      {link.icon}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info & Social Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(15px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Contact Information */}
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <MailOutlined style={{ color: '#4ECDC4', fontSize: '24px' }} />
              Get In Touch
            </h3>
            
            <div>
              <a href="mailto:contact@quantumcv.com" className="footer-contact-item" style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <MailOutlined /> contact@quantumcv.com
              </a>
              <a href="tel:+1234567890" className="footer-contact-item" style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <PhoneOutlined /> +1 (234) 567-890
              </a>
              <div style={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px'
              }}>
                <EnvironmentOutlined /> Niigata, Leopalace Nuttari, Japan
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <GlobalOutlined style={{ color: '#4ECDC4', fontSize: '24px' }} />
              Follow Us
            </h3>
            <div className="footer-social-container" style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer-social-link"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '20px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '40px',
          paddingBottom: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Quantum Logo Mini */}
            <div style={{
              position: 'relative',
              width: '32px',
              height: '32px'
            }}>
              <div className="quantum-logo-mini" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '2px solid #4ECDC4',
                borderRadius: '50%'
              }} />
              <div className="quantum-logo-mini-core" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                borderRadius: '50%'
              }} />
            </div>
            <div>
              <div style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: '18px',
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                QUANTUM CV
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px',
                fontWeight: 500
              }}>
                AI-Powered Career Optimization
              </div>
            </div>
          </div>

          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            © 2024 Quantum CV. All rights reserved. | Made with ❤️ for your career success
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px'
            }}>
              Powered by AI
            </span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#52C41A',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter; 