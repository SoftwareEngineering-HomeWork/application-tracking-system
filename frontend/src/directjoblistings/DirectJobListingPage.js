import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Modal } from 'react-bootstrap';

const DirectJobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:5001/recruiter/jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      } else {
        throw new Error(data.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="direct-job-listings-container">
      <h1>Direct Job Listings</h1>
      {isLoading && <Spinner animation="border" />}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && jobs.length === 0 && <p>No jobs found.</p>}
      {jobs.length > 0 && (
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Location</th>
              <th>Experience Level</th>
              <th>Salary Range</th>
              <th>Skills Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.job_title}</td>
                <td>{job.job_location || 'N/A'}</td>
                <td>{job.experience_level || 'Not specified'}</td>
                <td>
                  {job.salary_range
                    ? `$${job.salary_range.min} - $${job.salary_range.max}`
                    : 'Not specified'}
                </td>
                <td>
                  {job.skills_required && job.skills_required.length > 0
                    ? job.skills_required.join(', ')
                    : 'None'}
                </td>
                <td>
                  <Button variant="info" onClick={() => setSelectedJob(job)}>
                    View Description
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedJob && (
        <Modal
          show={!!selectedJob}
          onHide={() => setSelectedJob(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob.job_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Job Description</h5>
            <p>{selectedJob.job_description}</p>
            <hr />
            <p>
              <strong>Location:</strong> {selectedJob.job_location || 'N/A'}
            </p>
            <p>
              <strong>Job Type:</strong> {selectedJob.job_type || 'N/A'}
            </p>
            <p>
              <strong>Experience Level:</strong>{' '}
              {selectedJob.experience_level || 'Not specified'}
            </p>
            <p>
              <strong>Salary Range:</strong>{' '}
              {selectedJob.salary_range
                ? `$${selectedJob.salary_range.min} - $${selectedJob.salary_range.max}`
                : 'Not specified'}
            </p>
            <p>
              <strong>Skills Required:</strong>{' '}
              {selectedJob.skills_required && selectedJob.skills_required.length > 0
                ? selectedJob.skills_required.join(', ')
                : 'None'}
            </p>
            <p>
              <strong>Application:</strong>{' '}
              {selectedJob.application_url_or_email || 'N/A'}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedJob(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DirectJobListingPage;
