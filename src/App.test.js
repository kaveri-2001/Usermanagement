
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders User Management task', () => {
  render(<App />);
  const linkElement = screen.getByText(/User Management/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Add User and List Users buttons', () => {
  render(<App />);
  
  const addButton = screen.getByText(/Add User/i);
  expect(addButton).toBeInTheDocument();
  
  const listButton = screen.getByText(/List Users/i);
  expect(listButton).toBeInTheDocument();
});