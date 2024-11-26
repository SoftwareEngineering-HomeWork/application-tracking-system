import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomProfileModal from './CustomProfileModal'; // Adjust the path as needed
import axios from 'axios';
import { CONSTANTS } from '../data/Constants';

// Mock axios to avoid actual HTTP requests
jest.mock('axios');

// Mock localStorage
beforeEach(() => {
  localStorage.setItem('userId', 'testUserId');
  localStorage.setItem('token', 'testToken');
});

describe('CustomProfileModal', () => {
  const mockSetProfile = jest.fn();
  const mockSetModalOpen = jest.fn();
  const mockUpdateProfile = jest.fn();

  const initialProfile = {
    [CONSTANTS.PROFILE.NAME]: 'John Doe',
    [CONSTANTS.PROFILE.COMPANY_NAME]: 'XYZ Corp',
    [CONSTANTS.PROFILE.EMAIL]: 'john.doe@example.com',
    [CONSTANTS.PROFILE.ADDRESS]: 'New York',
    [CONSTANTS.PROFILE.CONTACT]: '123-456-7890',
  };

  it('renders the modal with profile data', () => {
    render(
      <CustomProfileModal
        profile={initialProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    expect(screen.getByPlaceholderText('Enter name')).toHaveValue(initialProfile[CONSTANTS.PROFILE.NAME]);
    expect(screen.getByPlaceholderText('Enter company')).toHaveValue(initialProfile[CONSTANTS.PROFILE.COMPANY_NAME]);
    expect(screen.getByPlaceholderText('Enter email')).toHaveValue(initialProfile[CONSTANTS.PROFILE.EMAIL]);
    expect(screen.getByPlaceholderText('Enter city')).toHaveValue(initialProfile[CONSTANTS.PROFILE.ADDRESS]);
    expect(screen.getByPlaceholderText('Enter contact')).toHaveValue(initialProfile[CONSTANTS.PROFILE.CONTACT]);
  });

  it('shows an error message when the name field is empty and save is clicked', async () => {
    const profileWithEmptyName = { ...initialProfile, [CONSTANTS.PROFILE.NAME]: '' };
    
    render(
      <CustomProfileModal
        profile={profileWithEmptyName}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    fireEvent.click(screen.getByText('Save'));

    // Check if the error message is shown
    expect(await screen.findByText('This field is required')).toBeInTheDocument();
  });

  it('calls the save handler when the name field is filled and save is clicked', async () => {
    axios.post.mockRejectedValue(new Error('Network error'));
    
    render(
      <CustomProfileModal
        profile={initialProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'Jane Doe' },
    });

    fireEvent.click(screen.getByText('Save'));

    // Ensure axios POST request is made
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/recruiterprofile',
        {
          ...initialProfile,
          [CONSTANTS.PROFILE.NAME]: 'Jane Doe',
        },
        {
          headers: {
            userid: 'testUserId',
            Authorization: 'Bearer testToken',
          },
        }
      );
    });

    // Ensure the modal is closed after saving
    // expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('handles a successful save operation', async () => {
    // Mock the axios post request to resolve successfully
    axios.post.mockResolvedValue({ data: { success: true } });
    render(
      <CustomProfileModal
        profile={initialProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );
  
    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter company'), {
        target: { value: 'Airbus' },
      });
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
    target: { value: 'Ja@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter contact'), {
    target: { value: '919-9999-999' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter city'), {
    target: { value: 'Raleigh' },
    });

  
    fireEvent.click(screen.getByText('Save'));
  
    // Ensure axios.post is called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/recruiterprofile',
        {
            ...initialProfile,
            [CONSTANTS.PROFILE.NAME]: 'Jane Doe',
            [CONSTANTS.PROFILE.COMPANY_NAME]: 'Airbus',
            [CONSTANTS.PROFILE.EMAIL]: 'Ja@gmail.com',
            [CONSTANTS.PROFILE.CONTACT]: '919-9999-999',
            [CONSTANTS.PROFILE.ADDRESS]: 'Raleigh',
        },
        {
          headers: {
            userid: 'testUserId',
            Authorization: 'Bearer testToken',
          },
        }
      );
    });
  
    // Check if the updateProfile function was called with updated data
    expect(mockUpdateProfile).toHaveBeenCalledWith({
      ...initialProfile,
      [CONSTANTS.PROFILE.NAME]: 'Jane Doe',
      [CONSTANTS.PROFILE.COMPANY_NAME]: 'Airbus',
      [CONSTANTS.PROFILE.EMAIL]: 'Ja@gmail.com',
      [CONSTANTS.PROFILE.CONTACT]: '919-9999-999',
      [CONSTANTS.PROFILE.ADDRESS]: 'Raleigh',
    });
  
    // Check if modal is closed
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
  

  it('closes the modal when the close button is clicked', () => {
    render(
      <CustomProfileModal
        profile={initialProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    fireEvent.click(screen.getByLabelText('Close')); // Close button has aria-label="Close"

    // Check if setModalOpen was called with false
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('handles a failed save operation', async () => {
    // Mock the axios post request to reject (simulate error)
    axios.post.mockRejectedValue(new Error('Network error'));
  
    render(
      <CustomProfileModal
        profile={initialProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );
  
    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'Jane Doe' },
    });
  
    fireEvent.click(screen.getByText('Save'));
  
    // Ensure axios.post is called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/recruiterprofile',
        {
          ...initialProfile,
          [CONSTANTS.PROFILE.NAME]: 'Jane Doe',
        },
        {
          headers: {
            userid: 'testUserId',
            Authorization: 'Bearer testToken',
          },
        }
      );
    });
  
    // Ensure modal is still closed even on error
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});
