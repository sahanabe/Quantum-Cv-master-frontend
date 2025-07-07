import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Modal, 
  Button, 
  Card, 
  Progress, 
  Typography, 
  Statistic,
  Row,
  Col,
  Tag,
  notification
} from 'antd';
import {
  LockOutlined,
  CrownOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const EnterpriseProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [accessGranted, setAccessGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trialStatus, setTrialStatus] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = () => {
    setLoading(true);
    
    // Check for active enterprise trial
    const savedTrialData = localStorage.getItem('quantumCV_enterprise_trial');
    let hasActiveTrial = false;
    let trialInfo = null;

    if (savedTrialData) {
      try {
        const trialData = JSON.parse(savedTrialData);
        const endDate = new Date(trialData.endDate);
        const now = new Date();
        
        if (now < endDate) {
          hasActiveTrial = true;
          const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
          trialInfo = {
            ...trialData,
            daysRemaining,
            endDate
          };
        } else {
          // Trial expired
          localStorage.removeItem('quantumCV_enterprise_trial');
        }
      } catch (error) {
        localStorage.removeItem('quantumCV_enterprise_trial');
      }
    }

    // Check for paid subscription
    const subscriptionData = localStorage.getItem('quantumCV_enterprise_subscription');
    let hasPaidSubscription = false;
    let subscriptionInfo = null;

    if (subscriptionData) {
      try {
        const subData = JSON.parse(subscriptionData);
        const endDate = new Date(subData.endDate);
        const now = new Date();
        
        if (now < endDate && subData.status === 'active') {
          hasPaidSubscription = true;
          subscriptionInfo = subData;
        } else {
          // Subscription expired or cancelled
          localStorage.removeItem('quantumCV_enterprise_subscription');
        }
      } catch (error) {
        localStorage.removeItem('quantumCV_enterprise_subscription');
      }
    }

    setTrialStatus(trialInfo);
    setSubscriptionStatus(subscriptionInfo);

    // Grant access if user has active trial or paid subscription
    if (hasActiveTrial || hasPaidSubscription) {
      setAccessGranted(true);
      
      // Show trial warning if trial is about to expire
      if (hasActiveTrial && !hasPaidSubscription && trialInfo.daysRemaining <= 2) {
        notification.warning({
          message: '⚠️ Trial Ending Soon',
          description: `Your enterprise trial expires in ${trialInfo.daysRemaining} day(s). Upgrade now to continue access.`,
          duration: 10,
          placement: 'topRight',
          style: {
            background: 'linear-gradient(135deg, rgba(250, 173, 20, 0.95), rgba(255, 193, 7, 0.95))',
            color: '#000'
          }
        });
      }
    } else {
      setAccessGranted(false);
      setShowUpgradeModal(true);
    }

    setLoading(false);
  };

  const simulatePayment = async (plan) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription
    
    const subscriptionData = {
      plan: plan,
      status: 'active',
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      amount: plan === 'enterprise-starter' ? 299 : plan === 'enterprise-pro' ? 599 : 1299,
      currency: 'USD'
    };
    
    localStorage.setItem('quantumCV_enterprise_subscription', JSON.stringify(subscriptionData));
    
    // Remove trial data if exists
    localStorage.removeItem('quantumCV_enterprise_trial');
    
    notification.success({
      message: '🎉 Payment Successful!',
      description: 'Welcome to QuantumCV Enterprise! Your subscription is now active.',
      duration: 5,
      placement: 'topRight',
      style: {
        background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.95), rgba(115, 209, 61, 0.95))',
        color: '#fff'
      }
    });
    
    setShowUpgradeModal(false);
    checkAccess(); // Recheck access
  };

  const pricingPlans = [
    {
      id: 'enterprise-starter',
      name: 'Enterprise Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for growing teams',
      features: [
        'Up to 50 users',
        'Basic analytics',
        'Email support',
        '1,000 CV analyses/month',
        'Standard integrations'
      ],
      color: '#4ECDC4'
    },
    {
      id: 'enterprise-pro',
      name: 'Enterprise Pro',
      price: '$599',
      period: '/month',
      description: 'Most popular for medium enterprises',
      features: [
        'Up to 200 users',
        'Advanced analytics',
        'Priority support',
        '5,000 CV analyses/month',
        'Custom integrations',
        'API access'
      ],
      color: '#FFD700',
      recommended: true
    },
    {
      id: 'enterprise-scale',
      name: 'Enterprise Scale',
      price: '$1,299',
      period: '/month',
      description: 'For large-scale operations',
      features: [
        'Unlimited users',
        'Custom analytics',
        'Dedicated support',
        'Unlimited CV analyses',
        'White-label option',
        'Custom deployment'
      ],
      color: '#9B59B6'
    }
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)'
      }}>
        <Card style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          color: '#fff',
          minWidth: '300px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <Title level={3} style={{ color: '#fff' }}>Checking Access...</Title>
          <Progress percent={100} showInfo={false} strokeColor="#4ECDC4" />
        </Card>
      </div>
    );
  }

  if (!accessGranted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 215, 61, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }} />

        {/* Access Denied Content */}
        <div style={{
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              fontSize: '60px'
            }}>
              🔒
            </div>

            <Title level={1} style={{
              color: '#fff',
              fontSize: '48px',
              fontWeight: 900,
              marginBottom: '16px'
            }}>
              Enterprise Access Required
            </Title>

            <Paragraph style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Access to the Enterprise Dashboard requires an active subscription or trial.
              <br />
              <strong style={{ color: '#FFD700' }}>Upgrade now to unlock all enterprise features!</strong>
            </Paragraph>

            <div style={{ marginBottom: '40px' }}>
              <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                <Col xs={24} sm={8}>
                  <Card style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '32px', color: '#4ECDC4', marginBottom: '8px' }}>
                      <CheckCircleOutlined />
                    </div>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Advanced Analytics</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '32px', color: '#FFD700', marginBottom: '8px' }}>
                      <CrownOutlined />
                    </div>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Team Management</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '32px', color: '#FF6B6B', marginBottom: '8px' }}>
                      <RocketOutlined />
                    </div>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>API Integration</Text>
                  </Card>
                </Col>
              </Row>
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                type="primary"
                size="large"
                icon={<CreditCardOutlined />}
                onClick={() => setShowUpgradeModal(true)}
                style={{
                  borderRadius: '16px',
                  padding: '16px 32px',
                  height: 'auto',
                  fontSize: '18px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  border: 'none',
                  color: '#000',
                  minWidth: '220px',
                  boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)'
                }}
              >
                Upgrade to Enterprise
              </Button>

              <Button
                size="large"
                icon={<RocketOutlined />}
                onClick={() => navigate('/enterprise')}
                style={{
                  borderRadius: '16px',
                  padding: '16px 32px',
                  height: 'auto',
                  fontSize: '18px',
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: '#fff',
                  minWidth: '220px'
                }}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade Modal */}
        <Modal
          title={null}
          open={showUpgradeModal}
          onCancel={() => setShowUpgradeModal(false)}
          footer={null}
          width={900}
          centered
          styles={{
            body: {
              background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
              borderRadius: '16px',
              padding: '40px'
            }
          }}
        >
          <div style={{ textAlign: 'center', color: '#fff', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '32px'
            }}>
              👑
            </div>
            
            <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>
              Choose Your Enterprise Plan
            </Title>
            
            <Paragraph style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '18px' 
            }}>
              Select the perfect plan for your organization's needs
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {pricingPlans.map((plan) => (
              <Col xs={24} sm={8} key={plan.id}>
                <Card style={{
                  background: plan.recommended 
                    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 107, 107, 0.1))'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: plan.recommended 
                    ? '2px solid #FFD700'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  height: '100%',
                  position: 'relative'
                }}>
                  {plan.recommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      color: '#000',
                      padding: '4px 16px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      RECOMMENDED
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Title level={4} style={{ color: '#fff', marginBottom: '8px' }}>
                      {plan.name}
                    </Title>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: plan.recommended ? '#FFD700' : '#fff'
                      }}>
                        {plan.price}
                      </span>
                      <span style={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '16px' 
                      }}>
                        {plan.period}
                      </span>
                    </div>

                    <Paragraph style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      marginBottom: '16px',
                      fontSize: '14px' 
                    }}>
                      {plan.description}
                    </Paragraph>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <CheckCircleOutlined style={{ 
                          color: '#52C41A', 
                          marginRight: '8px',
                          fontSize: '14px' 
                        }} />
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px' 
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type={plan.recommended ? "primary" : "default"}
                    block
                    onClick={() => simulatePayment(plan.id)}
                    style={{
                      borderRadius: '12px',
                      height: '44px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background: plan.recommended 
                        ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                        : 'rgba(255, 255, 255, 0.1)',
                      border: plan.recommended 
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      color: plan.recommended ? '#000' : '#fff'
                    }}
                  >
                    Upgrade Now
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show trial status banner for active trial users
  const trialBanner = trialStatus && !subscriptionStatus && (
    <div style={{
      background: trialStatus.daysRemaining <= 2 
        ? 'linear-gradient(135deg, #FF6B6B, #FF8E53)' 
        : 'linear-gradient(135deg, #4ECDC4, #44A08D)',
      color: '#fff',
      padding: '12px 24px',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      {trialStatus.daysRemaining <= 2 ? (
        <>
          <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
          Trial ending in {trialStatus.daysRemaining} day(s)! 
          <Button 
            size="small" 
            style={{ 
              marginLeft: '12px',
              background: '#fff',
              color: '#FF6B6B',
              fontWeight: 'bold',
              border: 'none'
            }}
            onClick={() => setShowUpgradeModal(true)}
          >
            Upgrade Now
          </Button>
        </>
      ) : (
        <>
          <ClockCircleOutlined style={{ marginRight: '8px' }} />
          Enterprise Trial Active - {trialStatus.daysRemaining} days remaining
        </>
      )}
    </div>
  );

  return (
    <>
      {trialBanner}
      <div style={{ marginTop: trialStatus && !subscriptionStatus ? '60px' : '0' }}>
        {children}
      </div>
    </>
  );
};

export default EnterpriseProtectedRoute; 