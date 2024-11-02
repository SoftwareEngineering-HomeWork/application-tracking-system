import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Skills from '../components/Skills';

describe('Skills Component', () => {
  test('renders skills section with title', () => {
    render(<Skills />);
    expect(screen.getByText('Skills Required')).toBeInTheDocument();
  });

  test('displays initial skills after loading', async () => {
    render(<Skills />);
    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('C#')).toBeInTheDocument();
    });
  });

  test('allows adding new skill', async () => {
    render(<Skills />);
    const input = screen.getByPlaceholderText('Add a new skill');
    const button = screen.getByText('Add Skill');

    fireEvent.change(input, { target: { value: 'Python' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument();
    });
  });

  test('clears input after adding skill', async () => {
    render(<Skills />);
    const input = screen.getByPlaceholderText('Add a new skill');
    const button = screen.getByText('Add Skill');

    fireEvent.change(input, { target: { value: 'Ruby' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  test('prevents adding empty skill', async () => {
    render(<Skills />);
    const initialSkillsCount = (await screen.findAllByClassName('tag')).length;
    const button = screen.getByText('Add Skill');

    fireEvent.click(button);

    const finalSkillsCount = (await screen.findAllByClassName('tag')).length;
    expect(finalSkillsCount).toBe(initialSkillsCount);
  });
}); 