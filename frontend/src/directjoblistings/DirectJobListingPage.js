import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Modal, Alert } from 'react-bootstrap';

const DirectJobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // To store job IDs that the user has applied for
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchUserApplications();
  }, []);

  // Fetch all jobs
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

  // Fetch the jobs that the current user has applied for
  const fetchUserApplications = async () => {
    try {
      const response = await fetch('http://localhost:5001/applications/apply', {
        method: 'GET',
        headers: {
          userid: localStorage.getItem('userId'),
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setAppliedJobs(data); // Store applied job IDs
      } else {
        throw new Error(data.error || 'Failed to fetch user applications');
      }
    } catch (err) {
      // setError(err.message);
    }
  };

  // Handle job application
  const handleApply = async (jobId) => {
    try {
      const response = await fetch('http://localhost:5001/applications/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          userid: localStorage.getItem('userId'),
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await response.json();
      if (response.ok) {
        // setSuccessMessage(data.message);
        setAppliedJobs((prev) => [...prev, jobId]); // Add the applied job to the list
      } else {
        throw new Error(data.error || 'Failed to apply for the job');
      }
    } catch (err) {
      // setError(err.message);
    }
  };

  // Check if the user has applied for the job
  const isJobApplied = (jobId) => appliedJobs.includes(jobId);

  return (
    <div className="direct-job-listings-container">
      <h1>Direct Job Listings</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
              <th>Action</th>
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
                <td>
                  {isJobApplied(job.job_id) ? (
                    <Button variant="success" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleApply(job.job_id)}
                    >
                      Apply
                    </Button>
                  )}
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
