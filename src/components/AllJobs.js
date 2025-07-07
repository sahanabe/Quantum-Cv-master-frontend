
import React, { useState } from 'react';
import { Card, Typography, Tag, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

const jobs = [
  { title: 'Special Needs Caregiver', company: 'Bright Horizons Care', location: 'New York, NY', description: 'Provide care and support for children and adults with special needs. Develop individualized care plans, coordinate with families, and ensure a safe environment.' },
  { title: 'Early Childhood Development Specialist', company: 'Sunrise Learning Center', location: 'Brooklyn, NY', description: 'Design and implement educational programs for children with diverse needs. Collaborate with teachers and parents to support child development.' },
  { title: 'Adult Client Employment Coordinator', company: 'Empowerment Works', location: 'Remote', description: 'Manage work placement for adults with special needs. Track employment outcomes and provide counseling to clients and employers.' },
  { title: 'Special Education Teacher', company: 'City Public Schools', location: 'Queens, NY', description: 'Teach and support students with special needs in a classroom setting. Develop IEPs and collaborate with multidisciplinary teams.' },
  { title: 'Care Program Planner', company: 'Hopeful Futures', location: 'Jersey City, NJ', description: 'Plan and manage care programs for children and adults with disabilities. Oversee staff and ensure compliance with care standards.' },
  { title: 'Rehabilitation Counselor', company: 'Pathways Support', location: 'Newark, NJ', description: 'Counsel and support individuals with disabilities to achieve personal and employment goals.' },
  { title: 'Child Life Specialist', company: 'Children’s Hospital', location: 'Manhattan, NY', description: 'Support children and families in healthcare settings, focusing on developmental and emotional needs.' },
  { title: 'Disability Services Coordinator', company: 'AccessAbility', location: 'Remote', description: 'Coordinate services and resources for clients with disabilities. Liaise with agencies and families.' },
  { title: 'Therapeutic Program Assistant', company: 'TheraCare', location: 'Bronx, NY', description: 'Assist in the delivery of therapeutic programs for children and adults with special needs.' },
  { title: 'Vocational Trainer', company: 'WorkReady', location: 'Staten Island, NY', description: 'Train and support adults with disabilities in workplace skills and job readiness.' },
  { title: 'Family Support Specialist', company: 'Family First', location: 'Hoboken, NJ', description: 'Provide resources and counseling to families of children with special needs.' },
  { title: 'Community Integration Specialist', company: 'Inclusion Works', location: 'Remote', description: 'Facilitate community participation and inclusion for individuals with disabilities.' },
  { title: 'Behavioral Health Technician', company: 'Mindful Steps', location: 'Brooklyn, NY', description: 'Support behavioral health plans for children and adults with developmental challenges.' },
  { title: 'Transition Coordinator', company: 'NextSteps', location: 'Queens, NY', description: 'Help students with special needs transition from school to employment or further education.' },
  { title: 'Assistive Technology Specialist', company: 'Tech4All', location: 'Remote', description: 'Implement and train clients on assistive technology solutions.' },
  { title: 'Residential Program Manager', company: 'Safe Haven Homes', location: 'Newark, NJ', description: 'Oversee residential programs for adults with disabilities, ensuring quality care and compliance.' },
  { title: 'Speech Therapy Assistant', company: 'SpeakUp', location: 'Jersey City, NJ', description: 'Assist speech-language pathologists in delivering therapy to children and adults.' },
  { title: 'Life Skills Instructor', company: 'EmpowerU', location: 'Brooklyn, NY', description: 'Teach daily living and independence skills to individuals with special needs.' },
  { title: 'Case Manager', company: 'Supportive Pathways', location: 'Manhattan, NY', description: 'Manage cases and coordinate services for clients with disabilities.' },
  { title: 'Inclusive Recreation Leader', company: 'Fun4All', location: 'Queens, NY', description: 'Lead recreational activities designed for children and adults of all abilities.' },
  // Additional jobs for pagination demo
  { title: 'Occupational Therapist', company: 'Therapy Plus', location: 'Brooklyn, NY', description: 'Provide occupational therapy services to children and adults with disabilities.' },
  { title: 'Job Coach', company: 'Career Pathways', location: 'Remote', description: 'Support individuals with special needs in finding and maintaining employment.' },
  { title: 'Recreation Therapist', company: 'Active Life', location: 'Queens, NY', description: 'Plan and lead recreational therapy sessions for clients with disabilities.' },
  { title: 'Direct Support Professional', company: 'Supportive Living', location: 'Jersey City, NJ', description: 'Assist clients with daily living activities and community integration.' },
  { title: 'Educational Aide', company: 'Learning Together', location: 'Manhattan, NY', description: 'Support teachers in classrooms for students with special needs.' },
  { title: 'Mobility Specialist', company: 'MoveForward', location: 'Newark, NJ', description: 'Train clients in mobility and orientation skills.' },
  { title: 'Personal Care Assistant', company: 'CareCompanions', location: 'Brooklyn, NY', description: 'Provide personal care and companionship to individuals with disabilities.' },
  { title: 'Program Director', company: 'Ability First', location: 'Remote', description: 'Oversee and develop programs for people with disabilities.' },
  { title: 'Mental Health Counselor', company: 'MindCare', location: 'Queens, NY', description: 'Provide counseling and support for clients with mental health needs.' },
  { title: 'Respite Worker', company: 'Family Relief', location: 'Hoboken, NJ', description: 'Offer temporary relief and care for families of children with special needs.' },
  { title: 'Adaptive Sports Coach', company: 'AllStars', location: 'Staten Island, NY', description: 'Coach adaptive sports for children and adults with disabilities.' },
  { title: 'Resource Navigator', company: 'ConnectNow', location: 'Remote', description: 'Help clients and families find and access disability resources.' },
  { title: 'Peer Support Specialist', company: 'PeerBridge', location: 'Newark, NJ', description: 'Provide peer support and mentoring for individuals with disabilities.' },
  { title: 'IEP Coordinator', company: 'School Success', location: 'Brooklyn, NY', description: 'Coordinate Individualized Education Programs for students.' },
  { title: 'Community Outreach Worker', company: 'ReachOut', location: 'Queens, NY', description: 'Engage with the community to promote inclusion and support.' },
  { title: 'Support Group Facilitator', company: 'TogetherStrong', location: 'Manhattan, NY', description: 'Lead support groups for families and individuals.' },
  { title: 'Transportation Aide', company: 'SafeRide', location: 'Jersey City, NJ', description: 'Assist with safe transportation for clients with special needs.' },
  { title: 'Nutrition Specialist', company: 'HealthySteps', location: 'Remote', description: 'Develop nutrition plans for clients with disabilities.' },
  { title: 'Paraprofessional', company: 'City Public Schools', location: 'Queens, NY', description: 'Assist teachers in special education classrooms.' },
  { title: 'Job Developer', company: 'WorkLink', location: 'Brooklyn, NY', description: 'Develop job opportunities for clients with disabilities.' },
];

const AllJobs = () => {
  const pageSize = 12;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase()) ||
    job.description.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const pagedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 if search changes and current page is out of range
  React.useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
    if (totalPages === 0 && page !== 1) setPage(1);
  }, [search, totalPages]);

  return (
    <div style={{ maxWidth: 1200, margin: '48px auto', padding: '0 16px' }}>
      <Title level={2} style={{ color: '#246bfd', fontWeight: 900, marginBottom: 32, textAlign: 'center' }}>All Jobs</Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: 350,
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #d9d9d9',
            fontSize: 16,
            outline: 'none',
            boxShadow: '0 2px 8px #246bfd11'
          }}
        />
      </div>
      <Row gutter={[24, 24]}>
        {pagedJobs.length > 0 ? pagedJobs.map((job, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={job.title + idx}>
            <Card
              title={<span style={{ color: '#246bfd', fontWeight: 700 }}>{job.title}</span>}
              styles={{
                body: { borderRadius: 18, boxShadow: '0 2px 16px #246bfd11', minHeight: 220 },
                header: { background: '#f5f8ff', borderRadius: '18px 18px 0 0' }
              }}
              variant="outlined"
            >
              <Text strong>{job.company}</Text>
              <br />
              <Tag color="blue" style={{ margin: '8px 0' }}>{job.location}</Tag>
              <Paragraph style={{ margin: '8px 0 0 0' }}>{job.description}</Paragraph>
            </Card>
          </Col>
        )) : (
          <Col span={24} style={{ textAlign: 'center', marginTop: 40 }}>
            <Paragraph style={{ fontSize: 18, color: '#888' }}>No jobs found.</Paragraph>
          </Col>
        )}
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{
            marginRight: 16,
            padding: '8px 20px',
            borderRadius: 8,
            border: 'none',
            background: page === 1 ? '#f0f0f0' : '#246bfd',
            color: page === 1 ? '#aaa' : '#fff',
            fontWeight: 600,
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            fontSize: 16
          }}
        >
          Previous
        </button>
        <span style={{ alignSelf: 'center', fontWeight: 600, fontSize: 16, color: '#fff', background: '#246bfd', borderRadius: 8, padding: '4px 16px' }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{
            marginLeft: 16,
            padding: '8px 20px',
            borderRadius: 8,
            border: 'none',
            background: page === totalPages ? '#f0f0f0' : '#246bfd',
            color: page === totalPages ? '#aaa' : '#fff',
            fontWeight: 600,
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
            fontSize: 16
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
