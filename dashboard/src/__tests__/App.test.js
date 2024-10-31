import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  test('renders header and footer', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });

  test('renders sidebar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Matches')).toBeInTheDocument();
  });

  test('renders main content on root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Prithish Samanta')).toBeInTheDocument();
  });

  test('renders matches page on /matches path', () => {
    render(
      <MemoryRouter initialEntries={['/matches']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Recommended Candidates')).toBeInTheDocument();
  });
}); 