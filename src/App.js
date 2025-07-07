import ImageToPdfConverter from './components/ImageToPdfConverter';
import JobScan from './components/JobScan';
import ModernJobsPage from './components/ModernJobsPage';
import AllJobs from './components/AllJobs';
import React, { useState, useEffect } from 'react';
// GoToTopButton component
function GoToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return visible ? (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 50,
        left: 36,
        zIndex: 10000,
        background: '#246bfd',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: 48,
        height: 48,
        boxShadow: '0 4px 24px #246bfd55',
        fontSize: 28,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s',
        opacity: visible ? 1 : 0,
      }}
      aria-label="Go to top"
      title="Go to top"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="14" fill="#246bfd" />
        <path d="M9 16l5-5 5 5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  ) : null;
}
import NeonBackground from './NeonBackground';
// Modern AI Chatbot is now handled by QuantumChatBot component

import { Layout, Card, Typography } from 'antd';

import Navbar from './components/Navbar';
import ResetPassword from './components/ResetPassword';
import ModernHomePage from './components/ModernHomePage';
import CVAnalysis from './components/CVAnalysis';
import StatsPanel from './components/StatsPanel';
import StepsSection from './components/StepsSection';
import CountdownSection from './components/CountdownSection';
import FAQSection from './components/FAQSection';
import PartnerCompanies from './components/PartnerCompanies';
import FooterBar from './components/FooterBar';
import UploadQuantumResume from './components/UploadQuantumResume';
import AnalyseMyCV from './components/AnalyseMyCV';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Payment from './components/Payment';
import EnterpriseDashboard from './components/EnterpriseDashboard';
import Product from './components/Product';
import Pricing from './components/Pricing';
import TextToCVGenerator from './components/TextToCVGenerator';
import ImageBackgroundRemover from './components/ImageBackgroundRemover';
import Dashboard from './components/Dashboard';
import ModernAdminPage from './components/ModernAdminPage';
import MyAccount from './components/MyAccount';
import CVAnalyzer from './components/CVAnalyzer';
import AllReports from './components/AllReports';
import BulkResumeAnalyzer from './components/BulkResumeAnalyzer';
import QuantumChatBot from './components/QuantumChatBot';
import ProtectedRoute from './components/ProtectedRoute';
import AIResumeOptimization from './components/AIResumeOptimization';
import InterviewPrep from './components/InterviewPrep';
import CareerAnalysis from './components/CareerAnalysis';
import ProfessionalBranding from './components/ProfessionalBranding';
import LoginDebug from './components/LoginDebug';
import QuantumUserDashboard from './components/QuantumUserDashboard';
import InstantApplications from './components/products/InstantApplications';
import BulkResumeProcessing from './components/products/enterprise/BulkResumeProcessing';
import MultiUserDashboard from './components/products/enterprise/MultiUserDashboard';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import ApiIntegration from './components/ApiIntegration';
import EnterpriseSecurity from './components/EnterpriseSecurity';
import EnterpriseLanding from './components/EnterpriseLanding';
import EnterpriseProtectedRoute from './components/EnterpriseProtectedRoute';

const { Content } = Layout;
const { Title, Paragraph } = Typography;



import { useNavigate, useLocation } from 'react-router-dom';


function App() {
  // Persist login state in localStorage and sync automatically with localStorage changes
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('signup');
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Restore login state from localStorage on app load
  React.useEffect(() => {
    try {
      const savedUser = localStorage.getItem('quantumCV_user');
      const savedToken = localStorage.getItem('quantumCV_token');
      
      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser);
        setLoggedInUser(parsedUser);
        setToken(savedToken);
        // Login state restored from localStorage
      }
    } catch (error) {
      console.error('Error restoring login state:', error);
      // Clear invalid data
      localStorage.removeItem('quantumCV_user');
      localStorage.removeItem('quantumCV_token');
    }
  }, []);

  // Listen for localStorage changes from other tabs
  React.useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'quantumCV_user' || e.key === 'quantumCV_token') {
        try {
          const savedUser = localStorage.getItem('quantumCV_user');
          const savedToken = localStorage.getItem('quantumCV_token');
          
          if (savedUser && savedToken) {
            const parsedUser = JSON.parse(savedUser);
            setLoggedInUser(parsedUser);
            setToken(savedToken);
          } else {
            setLoggedInUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('Error syncing login state:', error);
          setLoggedInUser(null);
          setToken(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Expose a function to open the login modal and set the tab
  const openLoginModal = () => {
    setActiveTab('login');
    setModalVisible(true);
  };

  // Clear localStorage on logout
  React.useEffect(() => {
    if (!loggedInUser && !token) {
      localStorage.removeItem('quantumCV_user');
      localStorage.removeItem('quantumCV_token');
    }
  }, [loggedInUser, token]);

  // Role-based redirect only immediately after login (not on every route change)
  const prevUserRef = React.useRef();
  const prevTokenRef = React.useRef();
  React.useEffect(() => {
    const prevUser = prevUserRef.current;
    const prevToken = prevTokenRef.current;
    // Redirect after login from any page
    if (prevUser === null && prevToken === null && loggedInUser && token) {
      if (loggedInUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (loggedInUser.role === 'company') {
        navigate('/enterprise-dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
    prevUserRef.current = loggedInUser;
    prevTokenRef.current = token;
  }, [loggedInUser, token, navigate, location.pathname]);

  // Make setToken globally accessible for Navbar
  window.setToken = setToken;
  // Pass setLoggedInUser and setToken to Navbar for login/logout
  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
      <Navbar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        setToken={setToken}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Layout style={{ background: 'transparent', minHeight: 'calc(100vh - 64px)', position: 'relative', zIndex: 1 }}>
        <Content style={{ 
          margin: '0 auto', 
          padding: '0', 
          background: 'transparent', 
          width: '100%',
          maxWidth: 'none'
        }}>
          <Routes>
            <Route path="/" element={
              <ModernHomePage loggedInUser={loggedInUser} openLoginModal={openLoginModal} />
            } />
            <Route path="/cv-analysis" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <CVAnalysis />
              </div>
            } />
            <Route path="/upload-quantum-resume" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <UploadQuantumResume />
              </div>
            } />
            <Route path="/analysemycv" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <AnalyseMyCV />
              </div>
            } />
          <Route path="/products" element={
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
              <Product />
            </div>
          } />
          <Route path="/pricing" element={
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
              <Pricing />
            </div>
          } />
          <Route path="/payment" element={
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
              <Payment />
            </div>
          } />
          <Route path="/text-to-cv-generator" element={
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
              <TextToCVGenerator />
            </div>
          } />
          <Route path="/image-background-remover" element={
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
              <ImageBackgroundRemover />
            </div>
          } />
          <Route path="/image-to-pdf-converter" element={
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
              <ImageToPdfConverter />
            </div>
          } />
          <Route path="/enterprise" element={
            <EnterpriseLanding />
          } />
          <Route path="/enterprise-dashboard" element={
            <EnterpriseProtectedRoute>
              <EnterpriseDashboard />
            </EnterpriseProtectedRoute>
          } />
          <Route path="/all-reports" element={
            <ProtectedRoute 
              loggedInUser={loggedInUser} 
              token={token} 
              openLoginModal={openLoginModal}
            >
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <AllReports />
              </div>
            </ProtectedRoute>
          } />
            <Route path="/dashboard" element={
              <ProtectedRoute 
                loggedInUser={loggedInUser} 
                token={token} 
                requiredRole="user"
                openLoginModal={openLoginModal}
              >
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                  <Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} token={token} />
                </div>
              </ProtectedRoute>
            } />


            <Route path="/jobs" element={
              <ModernJobsPage />
            } />
            <Route path="/all-jobs" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <AllJobs />
              </div>
            } />
            <Route path="/admin" element={
              <ProtectedRoute 
                loggedInUser={loggedInUser} 
                token={token} 
                requiredRole="admin"
                openLoginModal={openLoginModal}
              >
                <ModernAdminPage loggedInUser={loggedInUser} token={token} setLoggedInUser={setLoggedInUser} setToken={setToken} />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute 
                loggedInUser={loggedInUser} 
                token={token} 
                openLoginModal={openLoginModal}
              >
                <QuantumUserDashboard 
                  loggedInUser={loggedInUser} 
                  setLoggedInUser={setLoggedInUser} 
                  token={token} 
                />
              </ProtectedRoute>
            } />
            <Route path="/reset-password" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <ResetPassword />
              </div>
            } />
            <Route path="/bulk-resume-analyzer" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <BulkResumeAnalyzer />
              </div>
            } />
            <Route path="/bulk-processing" element={<BulkResumeProcessing />} />
            
            {/* New Feature Routes */}
            <Route path="/ai-resume-optimization" element={<AIResumeOptimization />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/career-analysis" element={<CareerAnalysis />} />
            <Route path="/professional-branding" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <ProfessionalBranding />
              </div>
            } />
            <Route path="/login-debug" element={
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
                <LoginDebug />
              </div>
            } />
            <Route path="/instant-applications" element={<InstantApplications />} />
            <Route path="/multi-user-dashboard" element={<MultiUserDashboard />} />
            <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
            <Route path="/api-integration" element={<ApiIntegration />} />
            <Route path="/enterprise-security" element={<EnterpriseSecurity />} />
            <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
            <Route path="/api-integration" element={<ApiIntegration />} />
            <Route path="/enterprise-security" element={<EnterpriseSecurity />} />
          </Routes>
        </Content>
      </Layout>
      <GoToTopButton />
      <QuantumChatBot loggedInUser={loggedInUser} openLoginModal={openLoginModal} />
    </Layout>
  );
}

export default App;
