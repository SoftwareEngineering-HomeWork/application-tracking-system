import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MatchesPage from '../MatchesPage';
import { fetchMatches } from '../../api/matchesApi'; // Assume this is your API call

// Mock the API call
jest.mock('../../api/matchesApi');

describe('MatchesPage', () => {
  const mockMatches = [
    { id: 1, name: 'John Doe', jobTitle: 'Developer' },
    { id: 2, name: 'Jane Smith', jobTitle: 'Designer' },
    { id: 3, name: 'Bob Johnson', jobTitle: 'Manager' },
  ];

  beforeEach(() => {
    fetchMatches.mockResolvedValue(mockMatches);
  });

  test('renders the page title', () => {
    render(<MatchesPage />);
    expect(screen.getByText('Recommended Candidates')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<MatchesPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders match cards after data is loaded', async () => {
    render(<MatchesPage />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    fetchMatches.mockRejectedValue(new Error('API Error'));
    render(<MatchesPage />);
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch matches')).toBeInTheDocument();
    });
  });

  test('renders correct number of match cards', async () => {
    render(<MatchesPage />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('match-card');
      expect(cards).toHaveLength(3);
    });
  });
});
