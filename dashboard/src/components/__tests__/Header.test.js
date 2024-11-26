// Header.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  let setIsLoggedIn;

  beforeEach(() => {
    setIsLoggedIn = jest.fn(); // Mock function for setIsLoggedIn
    localStorage.clear(); // Clear any items in localStorage before each test
  });

  test('renders the header with the title and logout button', () => {
    render(<Header setIsLoggedIn={setIsLoggedIn} />);
    
    // Check if the title and logout button are rendered
    expect(screen.getByText(/jtracker - recruiter/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    // Mock the navigate function
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    // Set items in localStorage to simulate a logged-in user
    localStorage.setItem('token', 'fakeToken');
    localStorage.setItem('userId', 'fakeUserId');

    render(<Header setIsLoggedIn={setIsLoggedIn} />);

    // Simulate clicking the logout button
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    // Assert localStorage items are removed
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();

    // Assert setIsLoggedIn is called with false
    expect(setIsLoggedIn).toHaveBeenCalledWith(false);

    // Assert navigate function is called with '/'
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
