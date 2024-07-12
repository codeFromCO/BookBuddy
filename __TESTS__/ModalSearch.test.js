import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalSearch from '../src/components/ModalSearch';

describe('Modal Search', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders an input and clickable search button', () => {
    render(<ModalSearch search={mockOnClick} />);

    const searchInput = screen.getByPlaceholderText(
      /Search for a book to add by title/i
    );
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('renders a cancel button to cancel displaying the modal', () => {
    render(
      <ModalSearch
        cancel={mockOnClick}
      />
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('renders clickable books found during search', () => {
    render(
      <ModalSearch
        books={[
          { title: 'Test title 1', author_name: ['Test author 1'] },
          { title: 'Test title 2', author_name: ['Test author 2'] },
        ]}
        onClick={mockOnClick}
      />
    );

    const book1 = screen.getByText(/Test title 1/i);
    expect(book1).toBeInTheDocument();
    const author1 = screen.getByText(/Test author 1/i);
    expect(author1).toBeInTheDocument();

    const book2 = screen.getByText(/Test title 2/i);
    expect(book2).toBeInTheDocument();
    const author2 = screen.getByText(/Test author 2/i);
    expect(author2).toBeInTheDocument();

    fireEvent.click(book1);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('displays error message in the event there are no books to display', () => {
    render(<ModalSearch books={[]} />);

    const errorMessage = screen.getByText(
      /No luck! Try searching for something else/i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  test('displays searching component while searching for books', () => {
    render(<ModalSearch books={[]} searching={true} />);

    const searchingComponent = screen.getByText(/Searching\.../i);
    expect(searchingComponent).toBeInTheDocument();
  });
});
