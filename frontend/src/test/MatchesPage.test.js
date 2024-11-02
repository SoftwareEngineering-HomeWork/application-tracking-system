import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Recommendations from '../matches/MatchesPage';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('MatchesPage', () => {
  const mockJobs = [
    {
      companyName: 'Google',
      jobTitle: 'Software Engineer',
      data_share_url: 'https://www.google.com/about/careers/applications/',
      location: 'Mountain View, CA'
    },
    {
      companyName: 'Microsoft',
      jobTitle: 'Frontend Developer',
      data_share_url: 'https://careers.microsoft.com/v2/global/en/',
      location: 'Seattle, WA'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('renders loading spinner initially', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    render(<Recommendations />);
    expect(screen.getByText('Finding most relevant jobs for you!')).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    global.fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<Recommendations />);

    await waitFor(() => {
      expect(screen.getByText(/API Error/)).toBeInTheDocument();
      expect(screen.getByText(/Re-try after updating your profile/)).toBeInTheDocument();
    });
  });

  it('makes API call with correct headers', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockJobs)
    });

    render(<Recommendations />);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/getRecommendations',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer null',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true'
        },
        method: 'GET'
      })
    );
  });
});