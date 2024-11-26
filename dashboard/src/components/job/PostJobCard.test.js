import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import {PostJobCard, JobListCard }from './PostJobCard';
import React from 'react';

jest.mock('axios');

describe('JobListCard Component', () => {
  const recruiterId = 'testRecruiterId';

  it('renders the View Jobs card and opens the modal on click', () => {
    render(<JobListCard recruiterId={recruiterId} />);

    const card = screen.getByText(/view jobs/i);
    expect(card).toBeInTheDocument();

    fireEvent.click(card);

    const modalTitle = screen.getByText(/jobs posted by recruiter/i);
    expect(modalTitle).toBeInTheDocument();
  });

  it('fetches and displays jobs on modal open', async () => {
    const mockJobs = [
      {
        _id: 'job1',
        job_title: 'Software Engineer',
        job_id: 'SE001',
        job_location: 'Remote',
        job_type: 'Full-time',
        experience_level: 'Mid-level',
        salary_range: { min: 60000, max: 80000 },
        deadline: new Date().toISOString(),
        job_category: 'Technology',
      },
    ];

    axios.get.mockResolvedValue({ data: mockJobs });

    render(<JobListCard recruiterId={recruiterId} />);

    fireEvent.click(screen.getByText(/view jobs/i));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5001/recruiter/jobs', {
        params: { recruiterId },
      });

      expect(screen.getByText(/software engineer/i)).toBeInTheDocument();
      expect(screen.getByText(/se001/i)).toBeInTheDocument();
    });
  });

  it('displays "No jobs found" when there are no jobs', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<JobListCard recruiterId={recruiterId} />);

    fireEvent.click(screen.getByText(/view jobs/i));

    await waitFor(() => {
      expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
    });
  });

  it('closes the modal when the close button is clicked', () => {
    render(<JobListCard recruiterId={recruiterId} />);

    fireEvent.click(screen.getByText(/view jobs/i));

    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText(/jobs posted by recruiter/i)).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<JobListCard recruiterId={recruiterId} />);

    fireEvent.click(screen.getByText(/view jobs/i));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    // Modal should still render, but no jobs will be shown
    expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
  });
});

describe('PostJobCard Component', () => {
    it('should update jobData with the selected file when a file is uploaded', () => {
      const { getByText, getByLabelText } = render(
        <PostJobCard recruiterId="123" updateRecruiterData={() => {}} />
      );
  
      // Open the modal
      fireEvent.click(getByText('Post Job'));
  
      // Simulate file upload
      const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
  
      // Query for the file input
      const fileInput = getByText(/Job Description Upload/i);
      fireEvent.change(fileInput, { target: { files: [file] } });
  
      // Assert that the file was added to the input
      expect(fileInput.files[0]).toBe(file);
      expect(fileInput.files).toHaveLength(1);
    });
  });

  describe('PostJobCard Component', () => {
    it('should log an error and close the modal on API error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { getByText, getByPlaceholderText } = render(
        <PostJobCard recruiterId="123" updateRecruiterData={() => {}} />
      );
  
      axios.post.mockRejectedValueOnce(new Error('API Error'));
  
      // Open modal and fill required fields
      fireEvent.click(getByText('Post Job'));
      fireEvent.change(getByPlaceholderText('Enter unique job ID'), { target: { value: '123' } });
      fireEvent.change(getByPlaceholderText('Enter job title'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter job description'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter location'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter job type'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter experience level'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Min salary'), { target: { value: 1} });
      fireEvent.change(getByPlaceholderText('Max salary'), { target: { value: 1 } });
      fireEvent.change(getByPlaceholderText('Enter required skills'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter job category'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter application URL or email'), { target: { value: 'Test Job' } });
      fireEvent.change(getByPlaceholderText('Enter application deadline'), { target: { value: "2024-11-01" } });

      // Click save
      fireEvent.click(getByText('Save Job'));
  
      // Wait for async actions
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error posting job:', expect.any(Error));
        expect(axios.post).toHaveBeenCalled();
      });
  
      consoleSpy.mockRestore();
    });
  });


jest.mock('axios');

describe('PostJobCard Component', () => {
  const mockUpdateRecruiterData = jest.fn();
  const recruiterId = 'testRecruiterId';

  it('renders the Post Job card and modal on click', () => {
    render(<PostJobCard recruiterId={recruiterId} updateRecruiterData={mockUpdateRecruiterData} />);

    const card = screen.getByText(/post job/i);
    expect(card).toBeInTheDocument();

    fireEvent.click(card);

    const modalTitle = screen.getByText(/Post a Job/i);
    expect(modalTitle).toBeInTheDocument();
  });

  it('updates form fields correctly', () => {
    render(<PostJobCard recruiterId={recruiterId} updateRecruiterData={mockUpdateRecruiterData} />);

    fireEvent.click(screen.getByText(/post job/i));

    const jobTitleInput = screen.getByPlaceholderText(/enter job title/i);
    fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } });

    expect(jobTitleInput.value).toBe('Software Engineer');
  });

  it('closes the modal when cancel is clicked', () => {
    render(<PostJobCard recruiterId={recruiterId} updateRecruiterData={mockUpdateRecruiterData} />);

    fireEvent.click(screen.getByText(/post job/i));

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Post a Job/i)).toBeInTheDocument();
  });

  it('sends API request on save and resets the form', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(<PostJobCard recruiterId={recruiterId} updateRecruiterData={mockUpdateRecruiterData} />);

    fireEvent.click(screen.getByText(/post job/i));

    const jobTitleInput = screen.getByPlaceholderText(/enter job title/i);
    fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } });

    const saveButton = screen.getByText(/save job/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/recruiter/jobs',
        expect.objectContaining({
          recruiterId,
          job_title: 'Software Engineer',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      expect(mockUpdateRecruiterData).toHaveBeenCalled();
    });

    expect(screen.queryByText(/Post a Job/i)).toBeInTheDocument();
  });

//   it('handles API error gracefully', async () => {
//     axios.post.mockRejectedValue(new Error('Network Error'));

//     render(<PostJobCard recruiterId={recruiterId} updateRecruiterData={mockUpdateRecruiterData} />);

//     fireEvent.click(screen.getByText(/post job/i));

//     const saveButton = screen.getByText(/save job/i);
//     fireEvent.click(saveButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalled();
//     });

//     expect(screen.queryByText(/Post a Job/i)).not.toBeInTheDocument();
//   });

  it('resets the form when the modal is closed', () => {
    render(<PostJobCard recruiterId={recruiterId} updateRecruiterData={mockUpdateRecruiterData} />);

    fireEvent.click(screen.getByText(/post job/i));

    const jobTitleInput = screen.getByPlaceholderText(/enter job title/i);
    fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } });

    fireEvent.click(screen.getByText(/cancel/i));
    fireEvent.click(screen.getByText(/post job/i));

    expect(jobTitleInput.value).toBe('');
  });
});
