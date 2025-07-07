import React, { useEffect, useState } from 'react';
import { Table, Spin, Typography, Tag } from 'antd';

const { Title } = Typography;

const AllUserResumesPanel = ({ token }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/all-resumes', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          setResumes(data.resumes || []);
        } else {
          setResumes([]);
        }
      } catch (err) {
        setResumes([]);
      }
      setLoading(false);
    };
    fetchResumes();
  }, [token]);

  const columns = [
    { title: 'User', dataIndex: 'userName', key: 'userName' },
    { title: 'Email', dataIndex: 'userEmail', key: 'userEmail' },
    { title: 'Resume Name', dataIndex: 'name', key: 'name' },
    { title: 'Date Uploaded', dataIndex: 'date', key: 'date', render: d => d ? new Date(d).toLocaleString() : '-' },
    { title: 'Score', dataIndex: 'score', key: 'score', render: s => s !== undefined && s !== null ? <Tag color={s > 70 ? 'green' : s > 40 ? 'orange' : 'red'}>{s}</Tag> : '-' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'File', dataIndex: 'filePath', key: 'filePath', render: fp => fp ? <a href={fp} target="_blank" rel="noopener noreferrer">Download</a> : '-' },
  ];

  return (
    <div>
      {loading ? <Spin fullscreen /> :
        <Table
          columns={columns}
          dataSource={resumes.map((r, i) => ({ ...r, key: i }))}
          pagination={{ pageSize: 10 }}
        />
      }
    </div>
  );
};

export default AllUserResumesPanel;
