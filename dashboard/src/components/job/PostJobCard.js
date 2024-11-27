import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import axios from 'axios';

const PostJobCard = ({ recruiterId, updateRecruiterData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState({
    job_id: '', // Add job_id field
    job_title: '',
    job_description: '',
    job_location: '',
    job_type: '',
    experience_level: '',
    salary_min: '',
    salary_max: '',
    skills_required: '',
    job_category: '',
    application_url_or_email: '',
    deadline: '',
    jd_upload: null,
  });

  const handleOpenModal = () => {
    resetForm(); // Reset form data
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    resetForm(); // Reset form on close
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setJobData({ ...jobData, jd_upload: file });
  };

  const handleSave = () => {
    const jobDataToSend = {
      recruiterId: recruiterId,
      ...jobData,
    };

    axios
      .post('http://localhost:5001/recruiter/jobs', jobDataToSend, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        updateRecruiterData(res.data);
        setModalOpen(false);
        resetForm();
      })
      .catch((err) => {
        console.error('Error posting job:', err);
        setModalOpen(false);
      });
  };

  const resetForm = () => {
    setJobData({
      job_id: '',
      job_title: '',
      job_description: '',
      job_location: '',
      job_type: '',
      experience_level: '',
      salary_min: '',
      salary_max: '',
      skills_required: '',
      job_category: '',
      application_url_or_email: '',
      deadline: '',
      jd_upload: null,
    });
  };

  return (
    <div>
      <div
        className="card"
        style={{
          width: '18rem',
          padding: '20px',
          margin: '10px',
          textAlign: 'center',
          cursor: 'pointer',
          border: '1px solid #ccc',
        }}
        onClick={handleOpenModal}
      >
        <h5>Post Job</h5>
      </div>

      <Modal show={modalOpen} onHide={handleCloseModal} centered backdrop="static" size="lg">
        <ModalHeader>
          <h5 className="modal-title">Post a Job</h5>
          <button type="button" className="btn-close" onClick={handleCloseModal}></button>
        </ModalHeader>
        <ModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Job ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter unique job ID"
                value={jobData.job_id}
                onChange={(e) => setJobData({ ...jobData, job_id: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={jobData.job_title}
                onChange={(e) => setJobData({ ...jobData, job_title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter job description"
                value={jobData.job_description}
                onChange={(e) =>
                  setJobData({ ...jobData, job_description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={jobData.job_location}
                onChange={(e) => setJobData({ ...jobData, job_location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job type"
                value={jobData.job_type}
                onChange={(e) => setJobData({ ...jobData, job_type: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter experience level"
                value={jobData.experience_level}
                onChange={(e) => setJobData({ ...jobData, experience_level: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary Range</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min salary"
                value={jobData.salary_min}
                onChange={(e) => setJobData({ ...jobData, salary_min: e.target.value })}
              />
              <Form.Control
                type="number"
                placeholder="Max salary"
                value={jobData.salary_max}
                onChange={(e) => setJobData({ ...jobData, salary_max: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter required skills"
                value={jobData.skills_required}
                onChange={(e) => setJobData({ ...jobData, skills_required: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job category"
                value={jobData.job_category}
                onChange={(e) => setJobData({ ...jobData, job_category: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Application URL or Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter application URL or email"
                value={jobData.application_url_or_email}
                onChange={(e) =>
                  setJobData({ ...jobData, application_url_or_email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter application deadline"
                value={jobData.deadline}
                onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Description Upload</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} data-testid="job-description-upload"/>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Job
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

// JobListCard Component - To display jobs posted by a recruiter
const JobListCard = ({ recruiterId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Fetch jobs when the modal opens, using query params
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/recruiter/jobs`, {
        params: {
          recruiterId: recruiterId, // Use query param for recruiterId
        },
      });
      setJobs(response.data); // Set the jobs list from the response
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleOpenModal = () => {
    fetchJobs(); // Fetch jobs when modal is opened
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div
        className="card"
        style={{
          width: '18rem',
          padding: '20px',
          margin: '10px',
          textAlign: 'center',
          cursor: 'pointer',
          border: '1px solid #ccc',
        }}
        onClick={handleOpenModal}
      >
        <h5>View Jobs</h5>
      </div>

      <Modal show={modalOpen} onHide={handleCloseModal} centered backdrop="static" size="lg">
        <ModalHeader>
          <h5 className="modal-title">Jobs Posted by Recruiter</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleCloseModal}
          ></button>
        </ModalHeader>
        <ModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="card mb-3"
                style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px' }}
              >
                
                <h5>{job.job_title}</h5>
                <p><strong>Job ID:</strong> {job.job_id}</p>
                <p><strong>Location:</strong> {job.job_location}</p>
                <p><strong>Job Type:</strong> {job.job_type}</p>
                <p><strong>Experience Level:</strong> {job.experience_level}</p>
                <p><strong>Salary Range:</strong> ${job.salary_range?.min} - ${job.salary_range?.max}</p>
                <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
                <p><strong>Job Category:</strong> {job.job_category}</p>
              </div>
            ))
          )}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { PostJobCard, JobListCard };
