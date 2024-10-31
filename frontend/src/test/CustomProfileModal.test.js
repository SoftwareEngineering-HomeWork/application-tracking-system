// frontend/src/profile/__tests__/CustomProfileModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomProfileModal from '../profile/CustomProfileModal';
import { CONSTANTS } from '../data/Constants';

jest.mock('axios');

describe('CustomProfileModal Component', () => {
  const mockSetProfile = jest.fn();
  const mockSetModalOpen = jest.fn();
  const mockUpdateProfile = jest.fn();
  const mockProfile = {
    id: '123',
    [CONSTANTS.PROFILE.NAME]: 'John Doe',
    [CONSTANTS.PROFILE.UNIVERSITY]: 'University of Test',
    [CONSTANTS.PROFILE.EMAIL]: 'john.doe@example.com',
    [CONSTANTS.PROFILE.ADDRESS]: '123 Test St',
    [CONSTANTS.PROFILE.CONTACT]: '1234567890',
  };

  beforeEach(() => {
    render(
      <CustomProfileModal
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );
  });

  test('renders modal with correct title', () => {
    expect(screen.getByText('Edit Details')).toBeInTheDocument();
  });

  test('renders form fields with default values', () => {
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('University of Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Test St')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  test('shows error message when name is empty and save is clicked', () => {
    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('calls updateProfile and setModalOpen on successful save', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/updateProfile',
        { ...mockProfile },
        {
          headers: {
            userid: mockProfile.id,
            Authorization: `Bearer ${localStorage.getItem('userId')}`,
          },
        }
      );
    });

    expect(mockUpdateProfile).toHaveBeenCalledWith(mockProfile);
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  test('handles API error gracefully', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockSetModalOpen).toHaveBeenCalledWith(false);
    });
  });

  test('calls setModalOpen with false when close button is clicked', () => {
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});