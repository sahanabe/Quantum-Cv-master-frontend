
import React, { useState } from 'react';
import { Typography, Card, message } from 'antd';
import JobApplicationModal from './JobApplicationModal';

const { Title, Paragraph } = Typography;



const demoJobs = [
  {
    title: 'Frontend Developer',
    company: 'QuantumCV',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful React interfaces for AI-powered resume tools.',
    posted: '2025-05-20',
  },
  {
    title: 'Backend Engineer',
    company: 'QuantumCV',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design scalable Node.js/Express APIs for resume analysis.',
    posted: '2025-05-18',
  },
  {
    title: 'AI Research Intern',
    company: 'QuantumCV',
    location: 'Remote',
    type: 'Internship',
    description: 'Work with NLP models to improve resume parsing and scoring.',
    posted: '2025-05-10',
  },
  {
    title: 'Product Manager',
    company: 'QuantumCV',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead the roadmap for next-gen AI career products.',
    posted: '2025-05-05',
  },
];


const Jobs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem('jwtToken');

  const handleApply = (job) => {
    if (!token) {
      message.error('Please log in to apply for a job.');
      return;
    }
    setSelectedJob(job.title);
    setModalOpen(true);
  };

  return (
    <Card style={{ margin: '32px 0', borderRadius: 16 }}>
      <Title level={2}>Jobs</Title>
      <Paragraph>
        Discover job opportunities and career resources tailored for you. Browse the latest openings and find your next career move!
      </Paragraph>
      <div style={{ marginTop: 32 }}>
        {demoJobs.map((job, idx) => (
          <Card key={idx} style={{ marginBottom: 24, borderRadius: 12, background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <Title level={4} style={{ margin: 0 }}>{job.title}</Title>
                <Paragraph style={{ margin: 0, color: '#246bfd', fontWeight: 600 }}>{job.company}</Paragraph>
                <Paragraph style={{ margin: 0, color: '#888' }}>{job.location} &bull; {job.type}</Paragraph>
              </div>
              <div style={{ textAlign: 'right', minWidth: 120 }}>
                <span style={{ color: '#52c41a', fontWeight: 600 }}>Posted: {job.posted}</span>
              </div>
            </div>
            <Paragraph style={{ marginTop: 12 }}>{job.description}</Paragraph>
            <div style={{ textAlign: 'right' }}>
              <button
                style={{ background: '#246bfd', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => handleApply(job)}
              >
                Apply Now
              </button>
            </div>
          </Card>
        ))}
      </div>
      <JobApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        jobTitle={selectedJob}
        token={token}
      />
    </Card>
  );
};

export default Jobs;
