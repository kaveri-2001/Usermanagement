import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditUser from './EditUser/EditUser';

describe('EditUser Component', () => {
  const mockOnClose = jest.fn();
  const mockOnUpdateUser = jest.fn();
  const selectedUserDetails = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  test('renders form fields with user details', () => {
    render(<EditUser onClose={mockOnClose} onUpdateUser={mockOnUpdateUser} selectedUserDetails={selectedUserDetails} />);

    expect(screen.getByLabelText(/Name:/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Email:/i)).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText(/Phone:/i)).toHaveValue("123-456-7890");
  });

  test('validates email field', () => {
    render(<EditUser onClose={mockOnClose} onUpdateUser={mockOnUpdateUser} selectedUserDetails={selectedUserDetails} />);

    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/Email is Invalid/i)).toBeInTheDocument();
  });

  test('validates phone field', () => {
    render(<EditUser onClose={mockOnClose} onUpdateUser={mockOnUpdateUser} selectedUserDetails={selectedUserDetails} />);

    const phoneInput = screen.getByLabelText(/Phone:/i);
    fireEvent.change(phoneInput, { target: { value: '1234567890' } }); // Incorrect format
    fireEvent.blur(phoneInput);

    expect(screen.getByText(/Phone number is invalid/i)).toBeInTheDocument();
  });

  test('validates name field', () => {
    render(<EditUser onClose={mockOnClose} onUpdateUser={mockOnUpdateUser} selectedUserDetails={selectedUserDetails} />);

    const nameInput = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInput, { target: { value: 'John123' } });
    fireEvent.blur(nameInput);

    expect(screen.getByText(/Name should only contain letters and spaces/i)).toBeInTheDocument();
  });


  test('calls onClose when cancel button is clicked', () => {
    render(<EditUser onClose={mockOnClose} onUpdateUser={mockOnUpdateUser} selectedUserDetails={selectedUserDetails} />);

    fireEvent.click(screen.getByText(/Cancel/i));
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});