import { message } from 'antd';
import { api } from '../config/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://quantumcv-backend-efbjdecdhpawckfp.japanwest-01.azurewebsites.net';

/**
 * Generic API request function
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    message.error(error.message || 'An error occurred while processing your request');
    throw error;
  }
}

/**
 * Upload file and make API request
 */
async function uploadFileAndRequest(endpoint, file, additionalData = {}) {
  try {
    console.log('Making API request to:', `${API_BASE_URL}${endpoint}`);
    console.log('File:', file.name, file.size, file.type);
    console.log('Additional data:', additionalData);
    
    const formData = new FormData();
    formData.append('resume', file);
    
    // Add additional data to form
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Response:', result);
    return result;
  } catch (error) {
    console.error('File Upload Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      endpoint: `${API_BASE_URL}${endpoint}`
    });
    message.error(error.message || 'An error occurred while uploading your file');
    throw error;
  }
}

// ===== RESUME ANALYSIS SERVICES =====

/**
 * ATS Resume Analysis
 */
export const analyzeATS = async (file) => {
  return await uploadFileAndRequest('/api/ai/analyze-ats', file);
};

/**
 * Skills Analysis
 */
export const analyzeSkills = async (file) => {
  return await uploadFileAndRequest('/api/ai/analyze-skills', file);
};

/**
 * Career Path Analysis
 */
export const analyzeCareerPath = async (file) => {
  return await uploadFileAndRequest('/api/ai/analyze-career-path', file);
};

/**
 * Resume Optimization
 */
export const optimizeResume = async (file, targetJob = '') => {
  return await uploadFileAndRequest('/api/ai/optimize-resume', file, { targetJob });
};

// ===== INTERVIEW PREPARATION SERVICES =====

/**
 * Generate Interview Questions
 */
export const generateInterviewQuestions = async (file, jobDescription = '') => {
  return await uploadFileAndRequest('/api/ai/generate-questions', file, { jobDescription });
};

/**
 * Mock Interview Feedback
 */
export const getMockInterviewFeedback = async (file, question, answer) => {
  return await uploadFileAndRequest('/api/ai/mock-interview', file, { question, answer });
};

// ===== JOB MATCHING SERVICES =====

/**
 * Job Matching Analysis
 */
export const matchJobs = async (file, jobListings) => {
  return await uploadFileAndRequest('/api/ai/match-jobs', file, { 
    jobListings: JSON.stringify(jobListings) 
  });
};

/**
 * Generate Cover Letter
 */
export const generateCoverLetter = async (file, jobDescription) => {
  return await uploadFileAndRequest('/api/ai/generate-cover-letter', file, { jobDescription });
};

// ===== CAREER COACHING SERVICES =====

/**
 * Career Advice
 */
export const getCareerAdvice = async (question, file = null) => {
  if (file) {
    return await uploadFileAndRequest('/api/ai/career-advice', file, { question });
  } else {
    return await apiRequest('/api/ai/career-advice', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  }
};

/**
 * Salary Negotiation Advice
 */
export const getSalaryNegotiationAdvice = async (file, jobOffer) => {
  return await uploadFileAndRequest('/api/ai/salary-negotiation', file, { jobOffer });
};

// ===== GENERAL AI SERVICES =====

/**
 * AI Chat
 */
export const aiChat = async (message, context = '') => {
  return await apiRequest('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, context }),
  });
};

/**
 * Text Analysis
 */
export const analyzeText = async (text, analysisType) => {
  return await apiRequest('/api/ai/analyze-text', {
    method: 'POST',
    body: JSON.stringify({ text, analysisType }),
  });
};

/**
 * AI Health Check
 */
export const checkAIHealth = async () => {
  return await apiRequest('/api/ai/health');
};

// ===== UTILITY FUNCTIONS =====

/**
 * Validate file before upload
 */
export const validateFile = (file) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    throw new Error('Please select a file to upload');
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a PDF, DOCX, or TXT file');
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 10MB');
  }

  return true;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Loading state management
 */
export const withLoading = async (loadingSetter, asyncFunction) => {
  try {
    loadingSetter(true);
    const result = await asyncFunction();
    return result;
  } catch (error) {
    throw error;
  } finally {
    loadingSetter(false);
  }
};

/**
 * Success/Error message handling
 */
export const handleAIResponse = (response, successMessage = 'Analysis completed successfully!') => {
  if (response.success) {
    message.success(successMessage);
    return response;
  } else {
    message.error(response.message || 'Analysis failed');
    throw new Error(response.message || 'Analysis failed');
  }
};

export default {
  // Resume Analysis
  analyzeATS,
  analyzeSkills,
  analyzeCareerPath,
  optimizeResume,
  
  // Interview Preparation
  generateInterviewQuestions,
  getMockInterviewFeedback,
  
  // Job Matching
  matchJobs,
  generateCoverLetter,
  
  // Career Coaching
  getCareerAdvice,
  getSalaryNegotiationAdvice,
  
  // General AI
  aiChat,
  analyzeText,
  checkAIHealth,
  
  // Utilities
  validateFile,
  formatFileSize,
  withLoading,
  handleAIResponse
}; 