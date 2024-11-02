import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

describe('Sidebar Component', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('renders all navigation links', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('links have correct href attributes', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Matches').closest('a')).toHaveAttribute('href', '/matches');
  });

  test('applies correct CSS classes', () => {
    renderWithRouter(<Sidebar />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('sidebar-item');
    });
  });
}); 