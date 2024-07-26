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
      /Search for a book title/i
    );
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('renders a close button to close displaying the modal', () => {
    render(
      <ModalSearch
        close={mockOnClick}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('renders clickable books if books are found during search', () => {
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

  test('displays an error message in the event there were no books found during the search', () => {
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
