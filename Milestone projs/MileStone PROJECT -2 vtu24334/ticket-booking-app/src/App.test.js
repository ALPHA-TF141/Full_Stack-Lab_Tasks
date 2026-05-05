import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/ticket booking for department events/i);
  expect(linkElement).toBeInTheDocument();
});
