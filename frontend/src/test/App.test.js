import { render, screen } from '@testing-library/react';
import App from '../App';

test('application tracking system', () => {
	render(<App />);
	const linkElement = screen.getByText(/Application Tracking System/i);
	expect(linkElement).toBeInTheDocument();
});
