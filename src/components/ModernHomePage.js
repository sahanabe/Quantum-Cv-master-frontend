import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Typography, Modal, Progress, Divider } from 'antd';
import { 
  RocketOutlined, 
  ThunderboltOutlined, 
  StarOutlined, 
  UploadOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModernFooter from './ModernFooter';

const { Title, Paragraph, Text } = Typography;

const ModernHomePage = ({ loggedInUser, openLoginModal }) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particlesVisible, setParticlesVisible] = useState(true);
  const [demoModalVisible, setDemoModalVisible] = useState(false);
  const canvasRef = useRef(null);
  const sectionsRef = useRef([]);

  // Particle System Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`
      });
    }
    
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 35, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.01;
          particle.y -= dy * 0.01;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 * (100 - distance) / 100})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <RocketOutlined />,
      title: 'AI Resume Optimization',
      description: '95% improvement rate - Transform your resume with advanced AI analysis and personalized suggestions',
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      route: '/ai-resume-optimization'
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Job Matching Engine',
      description: '3x more interviews - Find perfect job matches using quantum-powered algorithms',
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
      route: '/jobs'
    },
    {
      icon: <StarOutlined />,
      title: 'Interview Preparation',
      description: '80% success rate - Practice with AI-powered mock interviews and personalized feedback',
      color: '#45B7D1',
      gradient: 'linear-gradient(135deg, #45B7D1, #2196F3)',
      route: '/interview-prep'
    },
    {
      icon: <TrophyOutlined />,
      title: 'Career Path Analysis',
      description: 'Personalized roadmap - Get detailed insights into your career progression opportunities',
      color: '#96CEB4',
      gradient: 'linear-gradient(135deg, #96CEB4, #FFECD2)',
      route: '/career-analysis'
    },
    {
      icon: <BulbOutlined />,
      title: 'Professional Branding',
      description: '5x profile views - Optimize your LinkedIn and professional profiles for maximum visibility',
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
      route: '/professional-branding'
    },
    {
      icon: <CheckCircleOutlined />,
      title: 'Instant Applications',
      description: '10x faster applications - One-click apply to thousands of jobs with optimized profiles',
      color: '#52C41A',
      gradient: 'linear-gradient(135deg, #52C41A, #4ECDC4)',
      route: '/instant-applications'
    }
  ];

  const stats = [
    { number: '250K+', label: 'Resumes Analyzed', icon: '📄' },
    { number: '94%', label: 'Success Rate', icon: '🎯' },
    { number: '3.2s', label: 'Avg. Analysis Time', icon: '⚡' },
    { number: '4.9/5', label: 'User Rating', icon: '⭐' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer at Google',
      text: 'QuantumCV transformed my career trajectory. I got 5 interviews in 2 weeks!',
      avatar: '👩‍💻',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager at Netflix',
      text: 'The AI insights were incredibly detailed. My resume score jumped from 65% to 96%!',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist at Tesla',
      text: 'Revolutionary platform. The ATS optimization feature alone is worth everything.',
      avatar: '👩‍🔬',
      rating: 5
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 25%, #16213E 50%, #0E3E5C 75%, #0F0F23 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: particlesVisible ? 0.6 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />

      {/* Hero Section */}
      <section style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,107,107,0.1) 0%, transparent 50%)`
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          padding: '0 20px',
          transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
        }}>
          {/* 3D Holographic Logo */}
          <div style={{
            width: '200px',
            height: '200px',
            margin: '0 auto 40px auto',
            position: 'relative',
            transform: `rotateX(${scrollY * 0.1}deg) rotateY(${mousePosition.x * 0.02}deg)`,
            transition: 'transform 0.1s ease'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
              borderRadius: '50%',
              animation: 'pulse 4s ease-in-out infinite',
              filter: 'blur(20px)',
              opacity: 0.3
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '80px',
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(255,107,107,0.5))'
            }}>
              🚀
            </div>
          </div>

          <Title style={{
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '30px',
            fontWeight: 900,
            letterSpacing: '-2px',
            textShadow: '0 0 60px rgba(255,107,107,0.3)',
            animation: 'glow 3s ease-in-out infinite alternate'
          }}>
            QUANTUM CV
          </Title>

          <Paragraph style={{
            fontSize: '1.8rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '50px',
            fontWeight: 300,
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 50px auto'
          }}>
            Experience the <span style={{ color: '#4ECDC4', fontWeight: 600 }}>quantum leap</span> in career optimization. 
            Our AI doesn't just analyze—it <span style={{ color: '#FF6B6B', fontWeight: 600 }}>revolutionizes</span> your professional future.
          </Paragraph>

          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => loggedInUser ? navigate('/upload-quantum-resume') : openLoginModal()}
              style={{
                height: '70px',
                padding: '0 50px',
                fontSize: '20px',
                borderRadius: '35px',
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                border: 'none',
                boxShadow: '0 15px 40px rgba(255,107,107,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(255,107,107,0.6), 0 0 0 1px rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,107,107,0.4), 0 0 0 1px rgba(255,255,255,0.1)';
              }}
            >
              Launch Analysis
            </Button>

            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={() => setDemoModalVisible(true)}
              style={{
                height: '70px',
                padding: '0 50px',
                fontSize: '20px',
                borderRadius: '35px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255,255,255,0.2)',
                color: '#fff',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                fontWeight: 600
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              Watch Demo
            </Button>
          </div>

          {/* Live Stats Counter */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                <Title level={3} style={{ 
                  color: '#4ECDC4', 
                  margin: '0 0 5px 0',
                  fontSize: '1.8rem'
                }}>
                  {stat.number}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '150px 20px',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(78,205,196,0.05) 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            fontSize: '4rem',
            background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '80px',
            fontWeight: 900
          }}>
            Revolutionary Features
          </Title>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: hoveredCard === index 
                    ? `linear-gradient(135deg, ${feature.color}15, rgba(255,255,255,0.08))`
                    : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '30px',
                  padding: '50px 40px',
                  border: `2px solid ${hoveredCard === index ? feature.color + '40' : 'rgba(255,255,255,0.1)'}`,
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredCard === index ? 'translateY(-20px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === index 
                    ? `0 30px 80px ${feature.color}30, 0 0 0 1px ${feature.color}20`
                    : '0 10px 40px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(feature.route)}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: feature.gradient,
                  opacity: hoveredCard === index ? 0.1 : 0,
                  transition: 'opacity 0.5s ease'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: '60px',
                    color: feature.color,
                    marginBottom: '30px',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                    transform: hoveredCard === index ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}>
                    {feature.icon}
                  </div>
                  
                  <Title level={3} style={{
                    color: '#fff',
                    marginBottom: '20px',
                    fontSize: '1.8rem',
                    fontWeight: 700
                  }}>
                    {feature.title}
                  </Title>
                  
                  <Paragraph style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '30px'
                  }}>
                    {feature.description}
                  </Paragraph>

                  <Button
                    type="text"
                    style={{
                      color: feature.color,
                      fontWeight: 600,
                      padding: '8px 20px',
                      borderRadius: '20px',
                      background: hoveredCard === index ? `${feature.color}15` : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(feature.route);
                    }}
                  >
                    Get Started →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '150px 20px',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(135deg, rgba(69,183,209,0.05) 0%, rgba(255,107,107,0.05) 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            fontSize: '4rem',
            color: '#fff',
            marginBottom: '80px',
            fontWeight: 900
          }}>
            Success Stories
          </Title>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '30px',
                  padding: '50px 40px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    fontSize: '80px',
                    marginBottom: '20px',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
                  }}>
                    {testimonial.avatar}
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#FFD700', fontSize: '20px' }}>⭐</span>
                    ))}
                  </div>
                </div>

                <Paragraph style={{
                  color: '#fff',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginBottom: '30px',
                  lineHeight: '1.6'
                }}>
                  "{testimonial.text}"
                </Paragraph>

                <div style={{ textAlign: 'center' }}>
                  <Title level={4} style={{
                    color: '#4ECDC4',
                    margin: '0 0 5px 0',
                    fontWeight: 700
                  }}>
                    {testimonial.name}
                  </Title>
                  <Text style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '14px'
                  }}>
                    {testimonial.role}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '150px 20px',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(78,205,196,0.1) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2} style={{
            fontSize: '3.5rem',
            color: '#fff',
            marginBottom: '40px',
            fontWeight: 900
          }}>
            Ready to Transform Your Career?
          </Title>
          
          <Paragraph style={{
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '60px',
            lineHeight: '1.6'
          }}>
            Join thousands of professionals who have already revolutionized their careers with QuantumCV. 
            Your dream job is just one analysis away.
          </Paragraph>

          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            onClick={() => loggedInUser ? navigate('/upload-quantum-resume') : openLoginModal()}
            style={{
              height: '80px',
              padding: '0 60px',
              fontSize: '22px',
              borderRadius: '40px',
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              border: 'none',
              boxShadow: '0 20px 50px rgba(255,107,107,0.4)',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 30px 70px rgba(255,107,107,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(255,107,107,0.4)';
            }}
          >
            Start Your Quantum Journey
          </Button>
        </div>
      </section>

      {/* Demo Modal */}
      <Modal
        open={demoModalVisible}
        onCancel={() => setDemoModalVisible(false)}
        footer={null}
        centered
        width={800}
        styles={{
          content: {
            background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(26,26,46,0.95))',
            backdropFilter: 'blur(30px)',
            borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.2)',
            overflow: 'hidden'
          }
        }}
      >
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: '30px' }}>
            Experience QuantumCV in Action
          </Title>
          
          <div style={{
            width: '100%',
            height: '400px',
            background: 'linear-gradient(135deg, #FF6B6B15, #4ECDC415)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <PlayCircleOutlined style={{ fontSize: '80px', color: '#4ECDC4', marginBottom: '20px' }} />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>
                Interactive Demo Coming Soon
              </Text>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={() => {
              setDemoModalVisible(false);
              if (loggedInUser) {
                navigate('/upload-quantum-resume');
              } else {
                openLoginModal();
              }
            }}
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              border: 'none',
              borderRadius: '25px',
              padding: '0 40px',
              height: '60px',
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            Try It Now
          </Button>
        </div>
      </Modal>

      {/* Modern Footer */}
      <ModernFooter />

      {/* Global Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 60px rgba(255,107,107,0.3); }
          50% { text-shadow: 0 0 80px rgba(78,205,196,0.4), 0 0 100px rgba(255,107,107,0.3); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        .ant-btn:focus, .ant-btn:hover {
          border-color: transparent !important;
        }
        
        @media (max-width: 768px) {
          canvas {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernHomePage; 