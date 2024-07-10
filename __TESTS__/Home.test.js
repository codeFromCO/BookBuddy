import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../src/pages/home';

// mock API function
jest.mock('../src/api/api', () => ({
  fetchBooks: jest.fn(),
}));

// mock components
jest.mock('../src/components/Header', () => () => <div>Header</div>);
jest.mock('../src/components/SideBar', () => () => <div>SideBar</div>);
jest.mock('../src/components/Error', () => ({ alert }) => <div>{alert}</div>);
jest.mock('../src/components/CardBook', () => ({ title, author, onClick }) => (
  <div onClick={onClick}>
    {title} - {author}
  </div>
));
jest.mock('../src/components/ModalSearch', () => () => (
  <div data-testid='modal-search'>ModalSearch</div>
));
jest.mock('../src/components/ModalBook', () => ({ title, author }) => (
  <div data-testid='modal-book'>
    <div>Title: {title}</div>
    <div>Author: {author}</div>
  </div>
));
jest.mock('../src/components/ModalAlert', () => (
  <div data-testid='modal-alert'>ModalAlert</div>
));

const queryClient = new QueryClient();

const renderHomePage = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </QueryClientProvider>
  );

describe('Home Page', () => {
  test('renders the components on the home page', () => {
    renderHomePage();

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/SideBar/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search existing books by title/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\+ Add new book/i)).toBeInTheDocument();
  });

  test('renders error message if there are no existing books', () => {
    const mockEmptyBooks = [];

    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockEmptyBooks);

    renderHomePage();

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();
  });

  test('renders existing books', async () => {
    const mockBooks = [
      {
        title: 'Book 1',
        author: 'Author 1',
        cover_i: 1,
        _id: '1',
        notes: 'Notes 1',
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        cover_i: 2,
        _id: '2',
        notes: 'Notes 2',
      },
    ];

    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBooks);

    renderHomePage();

    await screen.findByText('Book 1 - Author 1');
    await screen.findByText('Book 2 - Author 2');

    // check books are rendered
    expect(screen.getByText(/Book 1 - Author 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 2 - Author 2/i)).toBeInTheDocument();
  });

  test('opens search modal upon clicking + Add new book button', () => {
    renderHomePage();

    fireEvent.click(screen.getByText(/\+ Add new book/i));

    expect(screen.getByTestId('modal-search')).toBeInTheDocument();
  });

  test('opens book modal and display existing book data when an existing book is clicked', async () => {
    const mockBook = [
      {
        title: 'Book 1',
        author: 'Author 1',
        cover_i: 1,
        _id: '1',
        notes: 'Notes 1',
      },
    ];

    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBook);

    renderHomePage();

    fireEvent.click(screen.getByText(/Book 1 - Author 1/i));

    expect(screen.getByTestId('modal-book')).toBeInTheDocument();
    expect(screen.getByText('Title: Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 1')).toBeInTheDocument();
  });

  test(`hides existing books and displays a 'No books found' error message if the title search for an existing book yields no results`, () => {
    const mockBook = [
      {
        title: 'Book 1',
        author: 'Author 1',
        cover_i: 1,
        _id: '1',
        notes: 'Notes 1',
      },
    ];

    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBook);

    renderHomePage();

    fireEvent.change(
      screen.getByPlaceholderText(/Search existing books by title/i),
      {
        target: { value: 'Non-existent Book' },
      }
    );

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();

    expect(screen.queryByText(/Book 1 - Author 1/i)).not.toBeInTheDocument();
  });
});

// display filterd book
// display buttonLoading on fetch
// display modal alert
