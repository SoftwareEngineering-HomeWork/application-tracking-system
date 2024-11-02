// frontend/src/test/ProfilePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../profile/ProfilePage';

const mockProfile = {
    fullName: 'John Doe',
    email: 'john.doe@example.com'
};

describe('ProfilePage Component', () => {
    beforeEach(() => {
      render(<ProfilePage profile={mockProfile} />);
    });
  
    test('renders profile page with user information', () => {
      const fullNameElement = screen.getByText(/John Doe/i);
      expect(fullNameElement).toBeInTheDocument();
    });

});