import { render, screen, waitFor } from '@testing-library/react';
import MatchesPage from '../components/MatchesPage';

describe('MatchesPage Component', () => {
  test('shows loading state initially', () => {
    render(<MatchesPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders matches after loading', async () => {
    render(<MatchesPage />);
    await waitFor(() => {
      expect(screen.getByText('Recommended Candidates')).toBeInTheDocument();
      expect(screen.getAllByTestId('match-card')).toHaveLength(7);
    });
  });

  test('displays match details correctly', async () => {
    render(<MatchesPage />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText(/JavaScript, React/)).toBeInTheDocument();
      expect(screen.getByText(/Experience: Senior/)).toBeInTheDocument();
    });
  });

  test('renders resume links', async () => {
    render(<MatchesPage />);
    await waitFor(() => {
      const resumeLinks = screen.getAllByRole('link');
      expect(resumeLinks[0]).toHaveAttribute('href', 'https://example.com/resume1.pdf');
      expect(resumeLinks[0]).toHaveAttribute('target', '_blank');
    });
  });

  test('handles error state', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    render(<MatchesPage />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch matches/)).toBeInTheDocument();
    });
  });
}); 