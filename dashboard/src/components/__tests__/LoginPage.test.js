import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { getrecruiterToken, recruitersignUp, storeToken } from '../api/loginHandler';

// Mock the API functions
jest.mock('../api/loginHandler', () => ({
  getrecruiterToken: jest.fn(),
  recruitersignUp: jest.fn(),
  storeToken: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));  

describe('LoginPage Component', () => {

    beforeEach(() => {
      render(<LoginPage />);
    });
    
    it('renders login and signup tabs', () => {
      expect(screen.getByRole('tab', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Signup' })).toBeInTheDocument();
    });
  
    it('shows login form by default', () => {
      const loginForm = screen.getByRole('tabpanel', { name: 'Login' });
      expect(within(loginForm).getByPlaceholderText('Enter username')).toBeInTheDocument();
      expect(within(loginForm).getByPlaceholderText('Enter password')).toBeInTheDocument();
    });
  
    it('switches to signup tab when clicked', () => {
      fireEvent.click(screen.getByRole('tab', { name: 'Signup' }));
      const signupForm = screen.getByRole('tabpanel', { name: 'Signup' });
      expect(within(signupForm).getByPlaceholderText('Full name')).toBeInTheDocument();
      expect(within(signupForm).getByPlaceholderText('Enter username')).toBeInTheDocument();
      expect(within(signupForm).getByPlaceholderText('Enter password')).toBeInTheDocument();
    });

    
    test('handles successful login', async () => {
      getrecruiterToken.mockResolvedValue({
          profile: {
              id: '6742c1cb530bc896a5121ba2',
              username: 'Ak98',
              fullName: 'Ak14',
          },
          token: '6742c1cb530bc896a5121ba2.d8d69830-763f-43e2-9527-83fb7f52cef5',
      });
    
      const tablists = screen.getAllByRole('tablist');
      
      const authTabsContainer = tablists[0];
      
      fireEvent.click(within(authTabsContainer).getByRole('tab', { name: /login/i }));
      
      const tabpanels = screen.getAllByRole('tabpanel', { name: /login/i });
      const loginPanel = tabpanels[0];
      
      const usernameInput = within(loginPanel).getByPlaceholderText('Enter username');
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      
      const passwordInput = within(loginPanel).getByPlaceholderText('Enter password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      const loginButton = within(loginPanel).getByRole('button', { name: /login/i });
      fireEvent.click(loginButton);
  
      await waitFor(() => {
          expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
      });
    });
    
    test('handles login failure', async () => {
      // Mock the API call to reject with an error
      getrecruiterToken.mockRejectedValue(new Error('Internal Server Error'));
  
      // Switch to the login tab (if not default)
      fireEvent.click(screen.getByRole('tab', { name: /login/i }));
  
      const loginForm = screen.getByRole('tabpanel', { name: /login/i });
  
      // Simulate user input
      fireEvent.change(
          within(loginForm).getByPlaceholderText('Enter username'),
          { target: { value: 'wrongUser' } }
      );
      fireEvent.change(
          within(loginForm).getByPlaceholderText('Enter password'),
          { target: { value: 'wrongPassword' } }
      );
  
      // Simulate form submission
      fireEvent.click(
          within(loginForm).getByRole('button', { name: /login/i })
      );
  
      // Wait for the error message to appear in the DOM
      await waitFor(() => {
          expect(screen.getByText('Invalid login credentials. Please try again.')).toBeInTheDocument();
      });

    });
    
    test('handles successful signup', async () => {
      recruitersignUp.mockResolvedValue({
          message: "Recruiter created successfully",
          user: {
              id: "6744db278e023ea2fbfb2ca2",
              username: "ak112",
              fullName: "ak112"
          }
      });
  
      // Switch to the signup tab
      fireEvent.click(screen.getByRole('tab', { name: /signup/i }));
  
      const signupForm = screen.getByRole('tabpanel', { name: /signup/i });
  
      // Simulate user input
      fireEvent.change(
          within(signupForm).getByPlaceholderText('Full name'),
          { target: { value: 'Test Name' } }
      );
      fireEvent.change(
          within(signupForm).getByPlaceholderText('Enter username'),
          { target: { value: 'newUser' } }
      );
      fireEvent.change(
          within(signupForm).getByPlaceholderText('Enter password'),
          { target: { value: 'newPassword123' } }
      );
  
      // Simulate form submission
      fireEvent.click(
          within(signupForm).getByRole('button', { name: /sign up/i })
      );
  
      // Wait for the success message to appear
      await waitFor(() => {
          expect(screen.getByText(/signup successful/i)).toBeInTheDocument();
      });
  });
  

  it('handles signup failure', async () => {
    recruitersignUp.mockRejectedValueOnce(new Error('Signup failed'));

    // Switch to signup tab
    fireEvent.click(screen.getByRole('tab', { name: /signup/i }));
  
      const signupForm = screen.getByRole('tabpanel', { name: /signup/i });
  
      // Simulate user input
      fireEvent.change(
          within(signupForm).getByPlaceholderText('Full name'),
          { target: { value: 'Test Name' } }
      );
      fireEvent.change(
          within(signupForm).getByPlaceholderText('Enter username'),
          { target: { value: 'newUser' } }
      );
      fireEvent.change(
          within(signupForm).getByPlaceholderText('Enter password'),
          { target: { value: 'newPassword123' } }
      );
  
      // Simulate form submission
      fireEvent.click(
          within(signupForm).getByRole('button', { name: /sign up/i })
      );

    // Assert error message
    await waitFor(() =>
      expect(screen.getByText('Signup failed. Please try again.')).toBeInTheDocument()
    );
  });
});
