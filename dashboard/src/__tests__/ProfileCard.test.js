import { render, screen } from '@testing-library/react';
import ProfileCard from '../components/ProfileCard';

describe('ProfileCard Component', () => {
  test('renders profile information correctly', () => {
    render(<ProfileCard />);
    expect(screen.getByText('Prithish Samanta')).toBeInTheDocument();
    expect(screen.getByText('North Carolina State University')).toBeInTheDocument();
    expect(screen.getByText('Email: psamant2@ncsu.edu')).toBeInTheDocument();
    expect(screen.getByText('Phone: 919-876-5432')).toBeInTheDocument();
    expect(screen.getByText('Address: Avery Close Apartments')).toBeInTheDocument();
  });

  test('renders profile image', () => {
    render(<ProfileCard />);
    const image = screen.getByAltText('Profile');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('profile-pic');
  });

  test('applies correct CSS classes', () => {
    render(<ProfileCard />);
    expect(screen.getByAltText('Profile').closest('div')).toHaveClass('profile-image');
  });
}); 