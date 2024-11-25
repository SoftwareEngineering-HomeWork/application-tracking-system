// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders the footer with the correct copyright text', () => {
    render(<Footer />);
    
    // Check if the footer contains the expected text
    expect(screen.getByText(/© 2024 JTracker. All Rights Reserved./i)).toBeInTheDocument();
  });

  test('footer contains a <p> tag with copyright information', () => {
    render(<Footer />);
    
    // Check if the <p> tag is present with the correct content
    const paragraph = screen.getByText(/© 2024 JTracker. All Rights Reserved./i);
    expect(paragraph.tagName).toBe('P');
  });
});
