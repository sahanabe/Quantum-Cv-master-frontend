import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;


const FooterBar = () => (
  <Footer style={{ background: '#181c2a', color: '#b0b3c7', padding: '48px 0 24px 0', borderTop: '1px solid #23263a' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 }}>
      <div style={{ flex: 2, minWidth: 260 }}>
        <div style={{ fontWeight: 'bold', fontSize: 22, color: '#fff', marginBottom: 12 }}><span style={{ color: '#246bfd' }}>●</span> QuantumCV</div>
        <div style={{ color: '#b0e1ff', marginBottom: 16 }}>
          QuantumCV empowers job seekers with AI-driven resume analysis and optimization. Our mission is to help you stand out and connect talent with opportunity in the digital age.
        </div>
        <div style={{ marginTop: 12 }}>
          <span style={{ marginRight: 16 }}>Connect with us:</span>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', marginRight: 8 }}>LinkedIn</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', marginRight: 8 }}>Twitter</a>
          <a href="mailto:info@quantumcv.com" style={{ color: '#fff' }}>Email</a>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 8 }}>Navigation</div>
        <div>Home</div>
        <div>Products</div>
        <div>Jobs</div>
        <div>Dashboard</div>
        <div>FAQ</div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 8 }}>Resources</div>
        <div><a href="/resume-tips" style={{ color: '#b0e1ff' }}>Resume Tips</a></div>
        <div><a href="/ai-insights" style={{ color: '#b0e1ff' }}>AI Insights</a></div>
        <div><a href="/blog" style={{ color: '#b0e1ff' }}>Blog</a></div>
        {/* <div><a href="/community" style={{ color: '#b0e1ff' }}>Community</a></div> */}
        <div><a href="/support" style={{ color: '#b0e1ff' }}>Support</a></div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 8 }}>Legal</div>
        <div>
          <a href="/privacy" style={{ color: '#b0e1ff' }}>Privacy Policy</a>
        </div>
        <div>
          <a href="/terms" style={{ color: '#b0e1ff' }}>Terms of Service</a>
        </div>
        <div><a href="/accessibility" style={{ color: '#b0e1ff' }}>Accessibility</a></div>
        <div><a href="/contact" style={{ color: '#b0e1ff' }}>Contact</a></div>
      </div>
    </div>
    <div style={{ textAlign: 'center', color: '#b0e1ff', marginTop: 32, fontSize: 14 }}>
      © {new Date().getFullYear()} QuantumCV. All rights reserved.
      <span style={{ marginLeft: 24 }}>
        <a href="/privacy" style={{ color: '#b0e1ff', marginRight: 12 }}>Privacy Policy</a>
        <a href="/terms" style={{ color: '#b0e1ff' }}>Terms of Service</a>
      </span>
    </div>
  </Footer>
);

export default FooterBar;
