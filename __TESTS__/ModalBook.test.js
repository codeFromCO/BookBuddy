import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalBook from '../src/components/ModalBook';

describe('Modal Book', () => {
  const mockDeleteBook = jest.fn();
  const mockUpdateBook = jest.fn();
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays the title, author and notes of an existing book', () => {
    render(
      <ModalBook
        title='Sample Title'
        author='Sample Author'
        value='Sample Note'
        onChange={mockOnChange}
        save={mockUpdateBook}
        delete={mockDeleteBook}
      />
    );

    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Author/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Note/i)).toBeInTheDocument();
  });

  test('displays cancel, save and delete buttons which can be clicked', () => {
    render(
      <ModalBook
        title='Sample Title'
        author='Sample Author'
        value='Sample Note'
        onChange={mockOnChange}
        save={mockUpdateBook}
        onClickDelete={mockDeleteBook}
      />
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    expect(mockUpdateBook).toHaveBeenCalled();

    const deleteButton = screen.getByLabelText('Delete');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(mockDeleteBook).toHaveBeenCalled();
  });
});
