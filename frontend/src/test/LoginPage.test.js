import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../login/LoginPage';
import { getToken, signUp, storeToken } from '../api/loginHandler';

jest.mock('../api/loginHandler');

describe('LoginPage', () => {
  const mockSideCallback = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login and signup tabs', () => {
    render(<LoginPage side={mockSideCallback} />);
    expect(screen.getByRole('tab', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /signup/i })).toBeInTheDocument();
  });

  describe('Login functionality', () => {
    it('handles successful login', async () => {
      const mockResponse = {
        profile: { id: '123' },
        token: 'test-token'
      };
      getToken.mockResolvedValueOnce(mockResponse);

      render(<LoginPage side={mockSideCallback} />);

      fireEvent.change(screen.getByTestId('login-username'), {
        target: { value: 'testuser' }
      });
      fireEvent.change(screen.getByTestId('login-password'), {
        target: { value: 'password123' }
      });

      fireEvent.click(screen.getByTestId('login-submit'));

      await waitFor(() => {
        expect(getToken).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'password123'
        });
        expect(storeToken).toHaveBeenCalledWith({
          ...mockResponse,
          userId: mockResponse.profile.id
        });
        expect(mockSideCallback).toHaveBeenCalledWith(mockResponse.profile);
      });
    });

    it('handles login error', async () => {
      const mockError = new Error('Wrong username or password');
      getToken.mockRejectedValueOnce(mockError);
      
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<LoginPage side={mockSideCallback} />);

      fireEvent.change(screen.getByTestId('login-username'), {
        target: { value: 'wronguser' }
      });
      fireEvent.change(screen.getByTestId('login-password'), {
        target: { value: 'wrongpass' }
      });

      fireEvent.click(screen.getByTestId('login-submit'));

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Error while login ! Wrong username or password');
      });
    });
  });

  describe('Signup functionality', () => {
    it('handles successful signup', async () => {
      signUp.mockResolvedValueOnce({ success: true });
      
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<LoginPage side={mockSideCallback} />);

      fireEvent.click(screen.getByText('Signup'));

      fireEvent.change(screen.getByTestId('signup-fullname'), {
        target: { value: 'Test User' }
      });
      fireEvent.change(screen.getByTestId('signup-username'), {
        target: { value: 'newuser' }
      });
      fireEvent.change(screen.getByTestId('signup-password'), {
        target: { value: 'newpass123' }
      });

      fireEvent.click(screen.getByText('Sign Up'));

      await waitFor(() => {
        expect(signUp).toHaveBeenCalledWith({
          username: 'newuser',
          password: 'newpass123',
          fullName: 'Test User'
        });
        expect(alertMock).toHaveBeenCalledWith('Sign up successfull! Proceed to Login');
      });
    });
  });

});