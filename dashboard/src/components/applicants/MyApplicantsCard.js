import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Button } from 'react-bootstrap';

const MyApplicantsCard = ({ recruiterId }) => {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  // For My Applicants Modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);  // For Applicants of a Job

  // Fetch all jobs posted by the recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobResponse = await axios.get('http://localhost:5001/recruiter/jobs', {
          params: { recruiterId },
        });
        console.log("jobResponse: ", jobResponse)
        setJobs(jobResponse.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, [recruiterId]);

  // Fetch applicants for a specific job
  const fetchApplicantsForJob = async (jobId) => {
    try {
      setLoading(true);
      const applicantsResponse = await axios.get('http://localhost:5001/applications/apply', {
        params: { job_id: jobId },
      });
      console.log("applicantsResponse: ", applicantsResponse.data)
      setApplicants(applicantsResponse.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error fetching applicants:', err);
    }
  };

  // Open the Applicants Modal for a specific job
  const handleJobClick = (job) => {
    setSelectedJob(job);
    fetchApplicantsForJob(job.job_id);
    setApplicantModalOpen(true);
  };

  // Close the Applicant Modal
  const handleCloseApplicantModal = () => {
    setApplicantModalOpen(false);
    setSelectedJob(null);
    setApplicants([]);
  };

  // Close the My Applicants Modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Open the My Applicants Modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Handle resume download
  const handleDownloadResume = async (applicantId) => {
    try {
      // Send a request to the backend to download the resume for the applicant
      const response = await axios.get('http://localhost:5001/resume/download', {
        responseType: 'blob', // Important to handle the file response correctly
        headers: {
          userid: applicantId,
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token for authentication
        }
      });
  
      // Create a link to trigger the download
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); // Set the name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the resume', error);
    }
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
        <h5>Applicants</h5>
      </div>

      {/* My Applicants Modal */}
      <Modal show={modalOpen} onHide={handleCloseModal} centered backdrop="static" size="lg">
        <Modal.Header>
          <h5 className="modal-title">My Applicants</h5>
          <button type="button" className="btn-close" onClick={handleCloseModal}></button>
        </Modal.Header>
        <ModalBody>
          {jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            <div>
              <h6>Jobs Posted by You:</h6>
              {jobs.map((job) => (
                <div
                  key={job.job_id}
                  className="card mb-3"
                  style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px' }}
                  onClick={() => handleJobClick(job)}
                >
                  <h6>Job ID: {job.job_id}</h6>
                  <p><strong>Title:</strong> {job.job_title}</p>
                  <p><strong>Description:</strong> {job.job_description}</p>
                </div>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Job Applicants Modal */}
      <Modal show={applicantModalOpen} onHide={handleCloseApplicantModal} centered backdrop="static" size="lg">
        <Modal.Header>
          <h5 className="modal-title">Applicants for {selectedJob ? selectedJob.job_title : ''}</h5>
          <button type="button" className="btn-close" onClick={handleCloseApplicantModal}></button>
        </Modal.Header>
        <ModalBody>
          {loading ? (
            <p>Loading applicants...</p>
          ) : applicants.length === 0 ? (
            <p>No applicants for this job yet.</p>
          ) : (
            applicants.map((applicant) => (
              <div key={applicant._id} className="card mb-3" style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px' }}>
                <p><strong>Name:</strong> {applicant.candidateInfo.fullName}</p>
                <p><strong>Email:</strong> {applicant.candidateInfo.email}</p>
                <p>
                  <strong>LinkedIn:</strong>{' '}
                  {applicant?.candidateInfo?.linkedinId ? (
                    <a href={applicant.candidateInfo.linkedinId} target="_blank" rel="noopener noreferrer">
                      {applicant.candidateInfo.linkedinId}
                    </a>
                  ) : (
                    <span>No LinkedIn profile available</span>
                  )}
                </p>
                <p>
                  <strong>Github:</strong>{' '}
                  {applicant?.candidateInfo?.githubId ? (
                    <a href={applicant.candidateInfo.githubId} target="_blank" rel="noopener noreferrer">
                      {applicant.candidateInfo.githubId}
                    </a>
                  ) : (
                    <span>No Github profile available</span>
                  )}
                </p>
                <p><strong>Phone:</strong> {applicant.candidateInfo.phone_number}</p>
                <p>
                  <strong>Skills: </strong>
                  {applicant.candidateInfo.skills.length > 0 ? (
                    applicant.candidateInfo.skills.map((skill, index) => (
                      <span key={index}>
                        {skill.label}{index < applicant.candidateInfo.skills.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : (
                    <span>No skills listed</span>
                  )}
                </p>
                <Button variant="primary" onClick={() => handleDownloadResume(applicant.userId)}>
                  Download Resume
                </Button>
              </div>
            ))
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseApplicantModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyApplicantsCard;
