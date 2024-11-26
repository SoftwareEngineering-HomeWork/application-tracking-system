import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MyApplicantsCard from './MyApplicantsCard';
import MockAdapter from 'axios-mock-adapter';


const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset(); // Reset mock data before each test
});

  test('should open and close "My Applicants" modal', () => {
    render(<MyApplicantsCard recruiterId="123" />);

    // Open Modal (Use a query specific to the card's header)
    fireEvent.click(screen.getByText('Applicants', { selector: '.card h5' }));
    expect(screen.getByText('My Applicants', { selector: '.modal-title' })).toBeInTheDocument();
  });

  test('should fetch and display jobs posted by the recruiter', async () => {
    const mockJobs = [
      { job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' },
      { job_id: '2', job_title: 'Data Scientist', job_description: 'Analyze data' },
    ];
    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
  
    render(<MyApplicantsCard recruiterId="123" />);
  
    // Open Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Data Scientist')).toBeInTheDocument();
    });
  });
  
  test('should display "No jobs found" when no jobs are available', async () => {
    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, []);
  
    render(<MyApplicantsCard recruiterId="123" />);
  
    // Open Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    await waitFor(() => {
      expect(screen.getByText('No jobs found.')).toBeInTheDocument();
    });
  });
  
  test('should fetch and display applicants for a specific job', async () => {
    const mockJobs = [{ job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }];
    const mockApplicants = [
      {
        _id: '1',
        candidateInfo: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone_number: '1234567890',
          skills: [{ label: 'JavaScript' }, { label: 'React' }],
          resume_url: 'http://example.com/resume.pdf',
        },
      },
    ];
  
    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
    mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(200, mockApplicants);
  
    render(<MyApplicantsCard recruiterId="123" />);
  
    // Open "My Applicants" Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
  
    // Open Applicants Modal
    fireEvent.click(screen.getByText('Software Engineer'));
  
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  test('should fetch and display applicants for a specific job but no skills', async () => {
    const mockJobs = [{ job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }];
    const mockApplicants = [
      {
        _id: '1',
        candidateInfo: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone_number: '1234567890',
          skills: [],
          resume_url: 'http://example.com/resume.pdf',
        },
      },
    ];
  
    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
    mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(200, mockApplicants);
  
    render(<MyApplicantsCard recruiterId="123" />);
  
    // Open "My Applicants" Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
  
    // Open Applicants Modal
    fireEvent.click(screen.getByText('Software Engineer'));
  
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  test('should display "No applicants for this job yet" when there are no applicants', async () => {
    const mockJobs = [{ job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }];
  
    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
    mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(200, []);
  
    render(<MyApplicantsCard recruiterId="123" />);
  
    // Open "My Applicants" Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
  
    // Open Applicants Modal
    fireEvent.click(screen.getByText('Software Engineer'));
  
    await waitFor(() => {
      expect(screen.getByText('No applicants for this job yet.')).toBeInTheDocument();
    });
  });
  
  test('should close the Applicants modal and reset state', async () => {
  const mockJobs = [{ job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }];
  const mockApplicants = [
    {
      _id: '1',
      candidateInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        skills: [{ label: 'JavaScript' }, { label: 'React' }],
        resume_url: 'http://example.com/resume.pdf',
      },
    },
  ];

  mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
  mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(200, mockApplicants);

  render(<MyApplicantsCard recruiterId="123" />);

  // Open "My Applicants" Modal
  fireEvent.click(screen.getByText('Applicants'));

  await waitFor(() => {
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  // Open Applicants Modal
  fireEvent.click(screen.getByText('Software Engineer'));

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  // Find all close buttons in the modals
  const closeButtons = screen.getAllByRole('button', { name: /close/i });

  // Close the Applicants Modal by clicking the correct "Close" button
  fireEvent.click(closeButtons[1]);  // Close the Applicants Modal (second button)

  // Verify that the modal is closed by checking if the applicant name is no longer in the document
  await waitFor(() => {
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  // Verify that the "My Applicants" modal is still open by checking for the header inside the modal
  const modalHeader = screen.getByRole('heading', { name: /my applicants/i });
  expect(modalHeader).toBeInTheDocument();
});

  

  test('should open and close "My Applicants" modal', () => {
    render(<MyApplicantsCard recruiterId="123" />);
  
    // Open Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    expect(screen.getByText('My Applicants')).toBeInTheDocument();
  
    // Close Modal
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
  });

  test('should handle error when fetching applicants', async () => {
    const mockJobs = [{ job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }];
    
    // Mock jobs endpoint to return valid data
    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
    
    // Mock applicants endpoint to return an error
    mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(500);
    
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    render(<MyApplicantsCard recruiterId="123" />);
    
    // Open "My Applicants" Modal
    fireEvent.click(screen.getByText('Applicants'));
  
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
  
    // Open Applicants Modal (triggering the failing API call)
    fireEvent.click(screen.getByText('Software Engineer'));
  
    await waitFor(() => {
      // Check if loading stopped
      expect(screen.queryByText('Loading applicants...')).not.toBeInTheDocument();
  
      // Ensure that the error message was logged to the console
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching applicants:',
        expect.any(Error) // We expect an Error object to be passed
      );
    });
  
    // Clean up the spy
    consoleErrorSpy.mockRestore();
  });
  
  test('should fetch and display applicants for a specific job', async () => {
    const mockJobs = [
      { job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }
    ];
    const mockApplicants = [
      {
        _id: '1',
        candidateInfo: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone_number: '1234567890',
          skills: [{ label: 'JavaScript' }, { label: 'React' }],
          resume_url: 'http://example.com/resume.pdf',
        }
      }
    ];

    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
    mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(200, mockApplicants);

    render(<MyApplicantsCard recruiterId="123" />);

    // Open "My Applicants" Modal
    fireEvent.click(screen.getByText('Applicants'));

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    // Open Applicants Modal (triggering the applicant data load)
    fireEvent.click(screen.getByText('Software Engineer'));

    // Wait for the applicant data to load in the modal
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();  // This checks if the name appears
      expect(screen.getByText('john@example.com')).toBeInTheDocument();  // Email check
      expect(screen.getByText('1234567890')).toBeInTheDocument();  // Phone number check
    });

    // You can also check if the resume download button is there
    expect(screen.getByRole('button', { name: /Download Resume/i })).toBeInTheDocument();
  });

  test('should handle resume download', async () => {
    const mockJobs = [
      { job_id: '1', job_title: 'Software Engineer', job_description: 'Develop applications' }
    ];
    const mockApplicants = [
      {
        userId: '1',
        candidateInfo: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone_number: '1234567890',
          skills: [{ label: 'JavaScript' }, { label: 'React' }],
          resume_url: 'http://example.com/resume.pdf',
        }
      }
    ];

    mockAxios.onGet('http://localhost:5001/recruiter/jobs').reply(200, mockJobs);
    mockAxios.onGet('http://localhost:5001/applications/apply', { params: { job_id: '1' } }).reply(200, mockApplicants);

    render(<MyApplicantsCard recruiterId="123" />);

    // Open "My Applicants" Modal
    fireEvent.click(screen.getByText('Applicants'));

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    // Open Applicants Modal (triggering the applicant data load)
    fireEvent.click(screen.getByText('Software Engineer'));

    // Wait for the applicant data to load in the modal
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument(); // Check if John Doe is present
    });

    // Mock the axios.get for resume download
    const mockDownload = jest.fn().mockResolvedValue({
      data: new Blob(['dummy resume content'], { type: 'application/pdf' }) // Simulate the resume response
    });

    axios.get = mockDownload;

    // Mock URL.createObjectURL
    const createObjectURLSpy = jest.fn().mockReturnValue('mock-url');  // Directly mock the return value
    
    // Assign the mock to the global window.URL object
    global.URL.createObjectURL = createObjectURLSpy;

    // Simulate clicking the "Download Resume" button
    fireEvent.click(screen.getByRole('button', { name: /Download Resume/i }));

    // Wait for the download function to complete
    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledWith('http://localhost:5001/resume/download', {
        responseType: 'blob',
        headers: {
          userid: '1',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Check that createObjectURL was called (indicating the download was triggered)
      expect(createObjectURLSpy).toHaveBeenCalled();
    });

    // Clean up the mock
    global.URL.createObjectURL.mockRestore();
  });