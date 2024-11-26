import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomModal from './CustomModal';
import React from 'react';

// Mock axios
jest.mock('axios');

// Mock localStorage
beforeEach(() => {
  localStorage.setItem('userId', 'testUserId');
  localStorage.setItem('token', 'testToken');
});

// Mock functions
const mockSetProfile = jest.fn();
const mockSetModalOpen = jest.fn();
const mockUpdateProfile = jest.fn();

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const mockProfile = {
  preferences: [{ value: 'option1', label: 'Option 1' }],
};

const name = 'preferences';

describe('CustomModal Component', () => {
  it('renders the modal correctly', () => {
    render(
      <CustomModal
        options={mockOptions}
        name={name}
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    // Check if modal header is rendered
    expect(screen.getByText(/set preferences/i)).toBeInTheDocument();

    // Check if Save button is rendered
    expect(screen.getByText(/save/i)).toBeInTheDocument();

    // Check if Select component is rendered
    expect(screen.getByText(/option 1/i)).toBeInTheDocument();
  });

  it('closes the modal when close button is clicked', () => {
    render(
      <CustomModal
        options={mockOptions}
        name={name}
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);

    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('updates the selected options in the state', () => {
    render(
      <CustomModal
        options={mockOptions}
        name={name}
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    const selectInput = screen.getByText(/option 1/i);
    fireEvent.keyDown(selectInput, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.click(screen.getByText(/option 2/i));

    expect(screen.getByText(/option 2/i)).toBeInTheDocument();
  });

  it('calls the API and updates the profile on save', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <CustomModal
        options={mockOptions}
        name={name}
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/profile',
        { preferences: [{ value: 'option1', label: 'Option 1' }] },
        {
          headers: {
            userid: 'testUserId',
            Authorization: 'Bearer testToken',
          },
        }
      );
    });

    expect(mockUpdateProfile).toHaveBeenCalledWith({
      ...mockProfile,
      preferences: [{ value: 'option1', label: 'Option 1' }],
    });

    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('handles API error gracefully', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(
      <CustomModal
        options={mockOptions}
        name={name}
        profile={mockProfile}
        setProfile={mockSetProfile}
        setModalOpen={mockSetModalOpen}
        updateProfile={mockUpdateProfile}
      />
    );

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    // Verify that modal closes even after an error
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});
