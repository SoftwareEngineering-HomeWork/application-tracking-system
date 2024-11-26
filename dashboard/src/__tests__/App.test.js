import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

// Mock components and API calls
jest.mock('../components/profile/ProfilePage', () => ({ profile, updateProfile }) => {
  const handleUpdate = () => {
    updateProfile({ name: 'Updated Name', email: 'updated@example.com' });
  };

  return (
    <div>
      ProfilePage Component
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
});
jest.mock('../components/MatchesPage', () => () => <div>MatchesPage Component</div>);
jest.mock('../components/LoginPage', () => () => <div>LoginPage Component</div>);
jest.mock('../components/Header', () => () => <div>Header Component</div>);
jest.mock('../components/Footer', () => () => <div>Footer Component</div>);
jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    cleanup();
  });

  test('renders login page if not logged in', () => {
    render(<App />);
    expect(screen.getByText('LoginPage Component')).toBeInTheDocument();
  });

  test('redirects to /main when logged in and accessing root route', async () => {
    localStorage.setItem('token', 'test-token');
    render(<App />);
    expect(await screen.findByText('Header Component')).toBeInTheDocument();
  });


  test('renders ProfilePage when on /main route and logged in', async () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userId', 'test-user-id');

    axios.get.mockResolvedValueOnce({
      data: { name: 'Test User', email: 'test@example.com' },
    });

    // Set the initial route to '/main'
    window.history.pushState({}, 'Test page', '/main');

    render(<App />);

    expect(await screen.findByText('ProfilePage Component')).toBeInTheDocument();
  });

  test('updates profile when updateProfile is called in ProfilePage', async () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userId', 'test-user-id');

    axios.get.mockResolvedValueOnce({
      data: { name: 'Test User', email: 'test@example.com' },
    });

    // Set the initial route to '/main'
    window.history.pushState({}, 'Test page', '/main');

    render(<App />);

    // Ensure the profile is loaded
    expect(await screen.findByText('ProfilePage Component')).toBeInTheDocument();

    // Simulate clicking the update button
    const updateButton = screen.getByText('Update Profile');
    act(() => {
      updateButton.click();
    });

    // Validate that the updated profile was handled
    expect(await screen.findByText('ProfilePage Component')).toBeInTheDocument();
  });

  test('renders MatchesPage when on /matches route and logged in', () => {
    localStorage.setItem('token', 'test-token');

    // Set the initial route to '/matches'
    window.history.pushState({}, 'Test page', '/matches');

    render(<App />);

    expect(screen.getByText('MatchesPage Component')).toBeInTheDocument();
  });

  test('redirects to login if accessing /main or /matches while logged out', () => {
    // Test for /main
    window.history.pushState({}, 'Test page', '/main');
    render(<App />);

    const loginComponentsMain = screen.getAllByText('LoginPage Component');
    expect(loginComponentsMain).toHaveLength(1);
    expect(loginComponentsMain[0]).toBeInTheDocument();

    // Test for /matches
    cleanup(); // Clears DOM to ensure no residual renders
    window.history.pushState({}, 'Test page', '/matches');
    render(<App />);

    const loginComponentsMatches = screen.getAllByText('LoginPage Component');
    expect(loginComponentsMatches).toHaveLength(1);
    expect(loginComponentsMatches[0]).toBeInTheDocument();
  });

  test('renders Header and Footer when logged in', () => {
    localStorage.setItem('token', 'test-token');
    render(<App />);
    expect(screen.getByText('Header Component')).toBeInTheDocument();
    expect(screen.getByText('Footer Component')).toBeInTheDocument();
  });

  test('handles logout when storage changes', () => {
    localStorage.setItem('token', 'test-token');
    const { getByText } = render(<App />);

    expect(getByText('Header Component')).toBeInTheDocument();

    act(() => {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('storage'));
    });

    expect(screen.getByText('LoginPage Component')).toBeInTheDocument();
  });

  test('renders loading state while fetching profile', async () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userId', 'test-user-id');

    axios.get.mockResolvedValueOnce(new Promise(() => {})); // Simulate pending API call

    // Set the initial route to '/main'
    window.history.pushState({}, 'Test page', '/main');

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles API error gracefully when fetching profile fails', async () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userId', 'test-user-id');

    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    // Set the initial route to '/main'
    window.history.pushState({}, 'Test page', '/main');

    render(<App />);

    expect(await screen.findByText('LoginPage Component')).toBeInTheDocument();
  });
});