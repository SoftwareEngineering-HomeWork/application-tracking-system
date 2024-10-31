// frontend/src/profile/__tests__/CustomModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CustomModal from '../profile/CustomModal';

jest.mock('axios');

describe('CustomModal Component', () => {
  const mockSetProfile = jest.fn();
  const mockSetModalOpen = jest.fn();
  const mockUpdateProfile = jest.fn();
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];
  const mockProfile = { preferences: ['option1'] };

  beforeEach(() => {
    render(
      <CustomModal
        options={mockOptions}
        name="preferences"
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );
  });

  test('renders modal with correct title', () => {
    expect(screen.getByText('Set preferences')).toBeInTheDocument();
  });

  test('renders select component with default value', () => {
    const selectInput = screen.getByRole('combobox');
    expect(selectInput).toBeInTheDocument();
  });

  test('calls setModalOpen with false when close button is clicked', () => {
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  test('calls updateProfile and setModalOpen on successful save', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/updateProfile',
      { preferences: ['option1'] },
      {
        headers: {
          userid: localStorage.getItem('userId'),
          Authorization: `Bearer ${localStorage.getItem('userId')}`,
        },
      }
    );

    await screen.findByText('Save'); // Wait for the promise to resolve

    expect(mockUpdateProfile).toHaveBeenCalledWith({
      ...mockProfile,
      preferences: ['option1'],
    });
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  test('handles API error gracefully', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await screen.findByText('Save'); // Wait for the promise to resolve

    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});