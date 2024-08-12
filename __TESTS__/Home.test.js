import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../src/pages/home';

// mock API function
jest.mock('../src/api/api', () => ({
  fetchBooks: jest.fn(),
}));

// mock components
jest.mock(
  '../src/components/Header',
  () =>
    ({ displayModalSearch, displayModalHamburger }) =>
      (
        <header data-testid='header'>
          <button onClick={displayModalHamburger}>Hamburger</button>
          <button onClick={displayModalSearch}>+</button>
        </header>
      )
);
jest.mock('../src/components/SideBar', () => () => <div>SideBar</div>);
jest.mock('../src/components/Selector', () => () => <div>Selector</div>);
jest.mock('../src/components/ModalLoading', () => () => (
  <div data-testid='modal-loading'>ModalLoading</div>
));
jest.mock('../src/components/CardBook', () => ({ title, author, onClick }) => (
  <div data-testid='card-book' onClick={onClick}>
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
jest.mock(
  '../src/components/ModalHamburger',
  () =>
    ({ hideModalHamburger }) =>
      (
        <div data-testid='modal-hamburger' onClick={hideModalHamburger}>
          ModalHamburger
        </div>
      )
);
jest.mock('../src/components/EmptyState', () => () => (
  <div data-testid='empty-state'>EmptyState</div>
));

// mock data
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
  {
    title: 'Book 3',
    author: 'Author 3',
    cover_i: 3,
    _id: '3',
    notes: 'Notes 3',
  },
];

const emptyMockBooks = [];

const cleanClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHomePage = () =>
  render(
    <QueryClientProvider client={cleanClient}>
      <HomePage />
    </QueryClientProvider>
  );

describe('Home Page', () => {
  beforeEach(() => {
    cleanClient.clear(); // clear query client
    jest.clearAllMocks(); // resets mocks
    cleanup(); // unmounts components
  });

  test('renders the default components (Header, Sidebar, search input and Selector) on the home page', () => {
    // render HomePage component
    renderHomePage();

    // assert that the modal displays the header, sidebar, and search input
    expect(screen.getByTestId(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/SideBar/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search existing books by title/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/selector/i)).toBeInTheDocument();
  });

  test(`does not render ModalBook, ModalSearch and ModalHamburger by default`, async () => {
    // render HomePage component
    renderHomePage();

    // assert that ModalBook is not in the document
    expect(screen.queryByTestId('modal-book')).not.toBeInTheDocument();

    // assert that ModalSearch is not in the document
    expect(screen.queryByTestId('modal-search')).not.toBeInTheDocument();

    // assert that ModalHamburger is not in the document
    expect(screen.queryByTestId('modal-hamburger')).not.toBeInTheDocument();
  });

  test('renders an empty state if there are no books to display', async () => {
    // mock fetckBooks API function
    require('../src/api/api').fetchBooks.mockResolvedValueOnce(emptyMockBooks);

    // render HomePage component
    renderHomePage();

    // assert that an empty state will render
    expect(await screen.findByTestId('empty-state')).toBeInTheDocument();

    // assert that no book cards are in the document
    expect(screen.queryByTestId('card-book')).not.toBeInTheDocument();
  });

  test('renders existing books (if present)', async () => {
    // mock fetckBooks API function
    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBooks);

    // render HomePage component
    renderHomePage();

    // assert that there were be a corresponding CardBook for every book
    expect(await screen.findByText(/Book 1 - Author 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Book 2 - Author 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Book 3 - Author 3/i)).toBeInTheDocument();
  });

  test('opens book modal and display existing book data when an existing book is clicked', async () => {
    // mock fetckBooks API function
    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBooks);

    // render HomePage component
    renderHomePage();

    // wait for the book to appear and simulate a click
    fireEvent.click(await screen.findByText(/Book 1 - Author 1/i));

    // wait for the modal to appear in the document
    expect(await screen.findByTestId('modal-book')).toBeInTheDocument();

    // assert that the modal displays the correct details
    expect(screen.getByText('Title: Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 1')).toBeInTheDocument();
  });

  test('opens search modal when + button is clicked', async () => {
    // render HomePage component
    renderHomePage();

    // simulate clicking the + button
    fireEvent.click(screen.getByText(/\+/i));

    // wait for the modal to appear in the document
    expect(await screen.findByTestId('modal-search')).toBeInTheDocument();
  });

  test('opens hamburger modal when hamburger button in header is clicked, and closes when the hamburger modal cross is clicked', async () => {
    // render HomePage component
    renderHomePage();

    // simulate clicking the hamburger button
    fireEvent.click(screen.getByText(/Hamburger/i));

    // wait for the modal to appear in the document
    expect(await screen.findByTestId(/modal-hamburger/i)).toBeInTheDocument();

    // simulate clicking the hamburger modal
    fireEvent.click(screen.getByTestId(/modal-hamburger/i));

    // assert that the hamburger modal is not in the document
    expect(screen.queryByTestId('modal-Hamburger')).not.toBeInTheDocument();
  });

  test('does not allow the book and search modals to both be displayed at the same time', async () => {
    // mock fetckBooks API function
    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBooks);

    // render HomePage component
    renderHomePage();

    // wait for the book to appear in the document
    expect(await screen.findByText(/Book 1 - Author 1/i)).toBeInTheDocument();

    // simulate clicking the + button
    fireEvent.click(screen.getByText(/\+/i));

    // wait for search modal to appear in the document
    await screen.findByTestId('modal-search');

    // simulate a click of the book
    fireEvent.click(screen.getByText(/Book 1 - Author 1/i));

    // wait for the ModalBook to appear in the document
    await screen.findByTestId('modal-book');

    // assert that the ModalSearch is no longer displayed in the document
    expect(screen.queryByTestId('modal-search')).not.toBeInTheDocument();
  });

  test(`displays only the matching books if a book is searched for and exists`, async () => {
    // mock fetckBooks API function
    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBooks);

    // render HomePage component
    renderHomePage();

    // simulate typing search query into search input
    fireEvent.change(
      screen.getByPlaceholderText(/Search existing books by title/i),
      {
        target: { value: 'Book 1' },
      }
    );

    // assert that the matching book will be displayed
    expect(await screen.findByText(/Book 1 - Author 1/i)).toBeInTheDocument();

    // assert that books not matching the query will not be displayed
    expect(screen.queryByText(/Book 2 - Author 2/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Book 3 - Author 3/)).not.toBeInTheDocument();
  });

  test(`hides existing books and displays a 'No books found' error message if the title search for an existing book yields no results`, async () => {
    // mock fetckBooks API function
    require('../src/api/api').fetchBooks.mockResolvedValueOnce(mockBooks);

    // render HomePage component
    renderHomePage();

    // simulate typing search query into search input
    fireEvent.change(
      screen.getByPlaceholderText(/Search existing books by title/i),
      {
        target: { value: 'Non-existent Book' },
      }
    );

    // assert that an error will appear in the document
    expect(
      await screen.findByText(/No matching books found/i)
    ).toBeInTheDocument();

    // assert that no CardBooks will appear in the document
    expect(screen.queryByTestId('card-book')).not.toBeInTheDocument();
  });

  test('displays a modal loading component while data is being fetched', async () => {
    // simulate the fetching state with no data
    require('../src/api/api').fetchBooks.mockImplementation(
      () => new Promise(() => {})
    );

    // render HomePage component
    renderHomePage();

    // assert that a loading modal will be displayed whilst books are being fetched
    expect(screen.getByTestId('modal-loading')).toBeInTheDocument();
  });
});
