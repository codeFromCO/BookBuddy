// TO-DO
// display alphabetically? most recently updated?
// distinguish between finished and still reading?
// scroll to top functionality
// better error handling
// stop unnecessary re-renders of child components when updating or deleting book
// more isFetching
// consider moving functions to seperate file

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import BookCard from '../components/BookCard';
import BookCardSearch from '../components/BookCardSearch';
import ButtonLoading from '../components/ButtonLoading';
import Error from '../components/Error';
import ModalBook from '../components/ModalBook';
import ModalAlert from '../components/ModalAlert';
import ModalSearch from '../components/ModalSearch';
import Button from '../components/Button';

const bookSearchAPI = 'https://openlibrary.org/search.json?q=';
const bookcoverAPI = 'https://covers.openlibrary.org/b/id/';

const getBooks = async () => {
  const response = await fetch('api/book/findAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const jsonData = await response.json();
  console.log('this is the data', jsonData.data);
  return jsonData.data;
};

const searchBooks = async (input) => {
  const searchString = input.replace(/ /g, '+');
  const response = await fetch(`${bookSearchAPI}${searchString}`);

  const allData = await response.json();

  if (allData.docs.length < 6) {
    const firstBooks = allData.docs;
    return firstBooks;
  }
  const firstFiveBooks = allData.docs.slice(0, 6);

  return firstFiveBooks;
};

const addBook = async (book) => {
  const response = await fetch('api/book/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  const jsonData = await response.json();
  return jsonData;
};

const updateBook = async ({ _id, notes }) => {
  const response = await fetch('/api/book/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id, notes }),
  });

  const jsonData = await response.json();
  return jsonData;
};

const deleteBook = async ({ _id }) => {
  const response = await fetch('/api/book/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id }),
  });

  const jsonData = await response.json();
  return jsonData.data;
};

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [existingBookSearchInput, setExistingSearchBookInput] = useState('');
  const [bookExists, setBookExists] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [notesInput, setNotesInput] = useState('');

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'], // unique identifier for query,
    queryFn: getBooks,
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooks', searchInput],
    queryFn: () => searchBooks(searchInput),
    enabled: false, // disabled automatically running
  });

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      queryClient.invalidateQueries('[searchBooks');
      setSearchInput('');
    },
    onError: (error) => {
      console.error('Error adding book:', error);
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['books']);
      setSelectedBook(null);
      setNotesInput('');
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setSelectedBook(null);
    },
  });

  const handleSearch = () => {
    // check if searchInput is empty
    if (searchInput.trim() === '') {
      return;
    }

    const normalizedSearchInput = searchInput.trim().toLowerCase();

    // check if book already exists
    const existingBook = booksQuery.data?.find(
      (book) => book.title.toLowerCase() === normalizedSearchInput
    );

    if (existingBook) {
      setBookExists(true);
      return;
    } else {
      setBookExists(false);
      searchQuery.refetch();
    }
  };

  const handleViewNotes = (title, author_name, notes, _id) => {
    setSelectedBook({ title, author: author_name, notes, _id });
    setNotesInput(notes);
  };

  const handleCloseNotes = () => {
    setSelectedBook(null);
    setNotesInput('');
    setShowModalAlert(false);
  };

  const handleDisplayAlertModal = () => {
    setShowModalAlert(true);
  };

  const handleCloseAlertModal = () => {
    setShowModalAlert(false);
  };

  const handleDisplaySearchModal = () => {
    setShowModalSearch(true);
  };

  const handleCloseSearchModal = () => {
    setShowModalSearch(false);
    setBookExists(false);
    setSearchInput('');
  };

  const handleAddBook = (title, author, cover_i) => {
    console.log('in add book');
    console.log('this is the data', title, author, cover_i);

    const book = {
      title,
      author,
      cover_i,
    };

    addBookMutation.mutate(book);
    setSearchInput('');
    setShowModalSearch(false);
  };

  const handleSaveNotes = () => {
    if (selectedBook) {
      updateBookMutation.mutate({ _id: selectedBook._id, notes: notesInput });
    }
    setSelectedBook(null);
    setNotesInput('');
  };

  const handleDelete = () => {
    if (selectedBook) {
      deleteBookMutation.mutate({ _id: selectedBook._id });

      setShowModalAlert(false);
      setNotesInput('');
    }
  };

  const handleFindExistingBook = (inputValue) => {
    setExistingSearchBookInput(inputValue);
  };

  const filteredBooks = booksQuery.data?.filter((book) =>
    book.title
      .toLowerCase()
      .includes(existingBookSearchInput.trim().toLowerCase())
  );

  return (
    <div className='flex flex-row h-screen'>
      <SideBar active='home' />
      <div className='pl-20 px-7 w-full'>
        <Header title='BookBuddy' />

        <div>
          <div className='mt-5 mb-0 flex justify-end space-x-3'>
            <div
              className={`items-center flex p-1 border-2 w-inputSearchWidth border-baseSidebar  text-black  bg-baseSidebar rounded-3xl`}
            >
              <HiMagnifyingGlass />
              <input
                className='border-none focus:outline-none pl-3 w-full bg-baseSidebar placeholder-baseBackgroundSecondary '
                placeholder='Search existing books by title'
                onChange={(e) => handleFindExistingBook(e.target.value)}
              />
            </div>
            <button
              className='text-white bg-black p-3 rounded-md'
              onClick={handleDisplaySearchModal}
            >
              + Add new book
            </button>
          </div>

          <div className='flex flex-wrap mt-3'>
            {booksQuery.data &&
              booksQuery.data.length > 0 &&
              !filteredBooks &&
              booksQuery.data.map((book, index) => (
                <BookCard
                  title={book?.title}
                  author={book?.author}
                  key={index} // Provide a unique key for each item
                  src={
                    book?.cover_i > 0
                      ? `${bookcoverAPI}${book?.cover_i}-L.jpg`
                      : ''
                  }
                  onClick={() =>
                    handleViewNotes(
                      book.title,
                      book.author,
                      book.notes,
                      book._id
                    )
                  }
                />
              ))}
          </div>
          <div className='flex flex-wrap mt-3'>
            {filteredBooks && filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <BookCard
                  title={book?.title}
                  author={book?.author}
                  key={index} // Provide a unique key for each item
                  src={
                    book?.cover_i > 0
                      ? `${bookcoverAPI}${book?.cover_i}-L.jpg`
                      : ''
                  }
                  onClick={() =>
                    handleViewNotes(
                      book.title,
                      book.author,
                      book.notes,
                      book._id
                    )
                  }
                />
              ))
            ) : (
              <Error alert='No books found' />
            )}
          </div>

          {booksQuery.isFetching && !booksQuery.data && <ButtonLoading />}
          {booksQuery.isError && <h1>{JSON.stringify(booksQuery.error)}</h1>}

          {/* show book cover, option to show book cover + note in card */}
        </div>
      </div>
      {selectedBook && (
        <ModalBook
          title={selectedBook.title}
          author={selectedBook.author}
          value={notesInput}
          onChange={(event) => setNotesInput(event.target.value)}
          onClickDelete={handleDisplayAlertModal}
          cancel={handleCloseNotes}
          save={handleSaveNotes}
        />
      )}
      {showModalAlert && selectedBook && (
        <ModalAlert
          heading='Please confirm'
          subheading={`Are you sure that you want to delete your notes on ${selectedBook.title}? This cannnot be undone.`}
          cancel={handleCloseAlertModal}
          confirm={handleDelete}
        />
      )}
      {showModalSearch && (
        <ModalSearch
          cancel={handleCloseSearchModal}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          search={handleSearch}
          books={searchQuery.data}
          bookExists={bookExists}
          onClick={handleAddBook}
          searching={searchQuery.isFetching}
        />
      )}
    </div>
  );
};

export default HomePage;
