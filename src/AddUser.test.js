import { render, screen, fireEvent } from '@testing-library/react';
import AddUser from './AddUser/AddUser';

describe('AddUser Component', () => {
  test('renders form inputs and button', () => {
    render(<AddUser />);
    
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Department/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add User/i })).toBeInTheDocument();
  });

  test('validates name fields for alphabetic characters only', () => {
    render(<AddUser />);
    
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John123' } });
    fireEvent.blur(firstNameInput);
    
    expect(screen.getByText(/Name is Invalid/i)).toBeInTheDocument();
  });

  test('validates email field', () => {
    render(<AddUser />);
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    expect(screen.getByText(/Email is Invalid/i)).toBeInTheDocument();
  });

  test('does not submit form with invalid inputs', () => {
    render(<AddUser />);
    
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John123' } });
    
    const submitButton = screen.getByRole('button', { name: /Add User/i });
    expect(submitButton).toBeDisabled();
  });

  test('submits form successfully when all inputs are valid', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1 }),
      })
    );

    render(<AddUser />);

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Department/i), { target: { value: 'Engineering' } });

    const submitButton = screen.getByRole('button', { name: /Add User/i });
    expect(submitButton).not.toBeDisabled();
    
    fireEvent.click(submitButton);
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );

    global.fetch.mockRestore();
  });
});