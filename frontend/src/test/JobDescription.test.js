// frontend/src/Modals/__tests__/JobDescription.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobDescription from '../Modals/JobDescription';

describe('JobDescription Component', () => {
  const mockSetState = jest.fn();
  const mockJob = {
    qualifications: ['Qualification 1', 'Qualification 2'],
    responsibilities: ['Responsibility 1', 'Responsibility 2'],
    benefits: ['Benefit 1', 'Benefit 2'],
  };

  beforeEach(() => {
    render(<JobDescription selectedJob={mockJob} setState={mockSetState} />);
  });

  test('renders qualifications section', () => {
    expect(screen.getByText('Qualifications')).toBeInTheDocument();
    expect(screen.getByText('Qualification 1')).toBeInTheDocument();
    expect(screen.getByText('Qualification 2')).toBeInTheDocument();
  });

  test('renders responsibilities section', () => {
    expect(screen.getByText('Responsibilities')).toBeInTheDocument();
    expect(screen.getByText('Responsibility 1')).toBeInTheDocument();
    expect(screen.getByText('Responsibility 2')).toBeInTheDocument();
  });

  test('renders benefits section', () => {
    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByText('Benefit 1')).toBeInTheDocument();
    expect(screen.getByText('Benefit 2')).toBeInTheDocument();
  });

  test('calls setState with null when close button is clicked', () => {
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockSetState).toHaveBeenCalledWith(null);
  });
});