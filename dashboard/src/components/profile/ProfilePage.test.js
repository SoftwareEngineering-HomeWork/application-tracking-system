import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import ProfileModal from './CustomProfileModal';
import { CONSTANTS } from '../data/Constants';

jest.mock('./CustomProfileModal', () => jest.fn(() => <div data-testid="profile-modal">Profile Modal</div>));
jest.mock('../job/PostJobCard', () => ({
  PostJobCard: jest.fn(() => <div data-testid="post-job-card">Post Job Card</div>),
  JobListCard: jest.fn(() => <div data-testid="job-list-card">Job List Card</div>),
}));
jest.mock('../applicants/MyApplicantsCard', () => jest.fn(() => <div data-testid="my-applicants-card">My Applicants Card</div>));

const mockProfile = {
  [CONSTANTS.PROFILE.NAME]: 'John Doe',
  [CONSTANTS.PROFILE.UNIVERSITY]: 'XYZ University',
  [CONSTANTS.PROFILE.EMAIL]: 'john.doe@example.com',
  [CONSTANTS.PROFILE.CONTACT]: '123-456-7890',
  [CONSTANTS.PROFILE.ADDRESS]: '123 Main St, Anytown, USA',
  [CONSTANTS.PROFILE.USERNAME]: 'john_doe',
  fullName: 'John Doe',
};

describe('ProfilePage Component', () => {
  it('renders the profile information correctly', () => {
    render(<ProfilePage profile={mockProfile} updateProfile={jest.fn()} />);

    // Check name, university, and profile details
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('XYZ University')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();

    // Check PostJobCard, JobListCard, and MyApplicantsCard rendering
    expect(screen.getByTestId('post-job-card')).toBeInTheDocument();
    expect(screen.getByTestId('job-list-card')).toBeInTheDocument();
    expect(screen.getByTestId('my-applicants-card')).toBeInTheDocument();
  });

  it('renders the profile modal when edit icon is clicked', () => {
    const { getByRole, queryByTestId } = render(<ProfilePage profile={mockProfile} updateProfile={jest.fn()} />);

    expect(queryByTestId('profile-modal')).not.toBeInTheDocument();

    const editIcon = getByRole('button', { hidden: true }); // `FontAwesomeIcon` renders as a button
    fireEvent.click(editIcon);

    expect(screen.getByTestId('profile-modal')).toBeInTheDocument();
  });

  it('calls getUserInitials correctly', () => {
    render(<ProfilePage profile={mockProfile} updateProfile={jest.fn()} />);

    const initials = screen.getByText('JD');
    expect(initials).toBeInTheDocument();
  });

  it('calls getUserInitials correctly for only first name', () => {
    const mockProfile_only_first_name = {
        [CONSTANTS.PROFILE.NAME]: 'John Doe',
        [CONSTANTS.PROFILE.UNIVERSITY]: 'XYZ University',
        [CONSTANTS.PROFILE.EMAIL]: 'john.doe@example.com',
        [CONSTANTS.PROFILE.CONTACT]: '123-456-7890',
        [CONSTANTS.PROFILE.ADDRESS]: '123 Main St, Anytown, USA',
        [CONSTANTS.PROFILE.USERNAME]: 'john_doe',
        fullName: 'John',
      };
    render(<ProfilePage profile={mockProfile_only_first_name} updateProfile={jest.fn()} />);
    const initials = screen.getByText('J');
    expect(initials).toBeInTheDocument();
  });

  it('handles missing fullName gracefully in getUserInitials', () => {
    const { fullName, ...mockProfileWithoutFullName } = mockProfile;
    const profileWithoutFullName = mockProfileWithoutFullName;
    render(<ProfilePage profile={profileWithoutFullName} updateProfile={jest.fn()} />);

    const userIcons = screen.getAllByRole('img', { hidden: true });

    expect(userIcons.length).toBeGreaterThan(0);
  });
});