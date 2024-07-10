// TO-DO
// change display options e.g. alphabetically, recently added, recently updated
// consider adding unread, reading and read status indicators

// Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ["books"]

import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchBooks,
  searchBooksByInput,
  addBook,
  updateBookNotes,
  deleteBook,
} from '../api/api';

import { normalizeString } from '../utils/functions';

import { bookcoverAPI } from '../utils/constants';

import { HiMagnifyingGlass } from 'react-icons/hi2';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import CardBook from '../components/CardBook';
import ModalBook from '../components/ModalBook';
import ModalAlert from '../components/ModalAlert';
import ModalSearch from '../components/ModalSearch';
import ButtonLoading from '../components/ButtonLoading';
import Error from '../components/Error';

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [existingBookSearchInput, setExistingSearchBookInput] = useState('');
  const [bookExists, setBookExists] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalSearchVisible, setisModalSearchVisible] = useState(false);
  const [isModalAlertVisible, setisModalAlertVisible] = useState(false);
  const [notesInput, setNotesInput] = useState('');

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'], // unique identifier for query,
    queryFn: fetchBooks,
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooksByInput', searchInput],
    queryFn: () => searchBooksByInput(searchInput),
    enabled: false, // disabled automatically running
  });

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      queryClient.invalidateQueries('[searchBooksByInput');
      setSearchInput('');
    },
  });

  const updateBookNotesMutation = useMutation({
    mutationFn: updateBookNotes,
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

  const handleSearch = useCallback(() => {
    // check if searchInput is empty
    if (searchInput.trim() === '') {
      return;
    }

    const normalizedSearchInput = normalizeString(searchInput);

    // check if book already exists
    const existingBook = booksQuery.data.find(
      (book) => book.title.toLowerCase() === normalizedSearchInput
    );

    if (existingBook) {
      setBookExists(true);
      return;
    } else {
      setBookExists(false);
      searchQuery.refetch();
    }
  }, [searchInput, booksQuery.data, searchQuery]);

  const handleDisplaySearchModal = () => {
    setisModalSearchVisible(true);
  };

  const handleCloseSearchModal = () => {
    setisModalSearchVisible(false);
    setBookExists(false);
    setSearchInput('');
  };

  const handleDisplayNotesModal = (title, author_name, notes, _id) => {
    setSelectedBook({ title, author: author_name, notes, _id });
    setNotesInput(notes);
  };

  const handleCloseNotesModal = () => {
    setSelectedBook(null);
    setNotesInput('');
    setisModalAlertVisible(false);
  };

  const handleDisplayAlertModal = () => {
    setisModalAlertVisible(true);
  };

  const handleCloseAlertModal = () => {
    setisModalAlertVisible(false);
  };

  const handleAddBook = (title, author, cover_i) => {
    const book = {
      title,
      author,
      cover_i,
    };

    addBookMutation.mutate(book);
    setSearchInput('');
    setisModalSearchVisible(false);
  };

  const handleSaveNotes = () => {
    if (selectedBook) {
      updateBookNotesMutation.mutate({
        _id: selectedBook._id,
        notes: notesInput,
      });
    }
    setSelectedBook(null);
    setNotesInput('');
  };

  const handleDeleteBook = () => {
    if (selectedBook) {
      deleteBookMutation.mutate({ _id: selectedBook._id });

      setisModalAlertVisible(false);
      setNotesInput('');
    }
  };

  const handleFindExistingBook = (inputValue) => {
    setExistingSearchBookInput(inputValue);
  };

  const filteredBooks = useMemo(() => {
    return booksQuery.data?.filter((book) =>
      book.title
        .toLowerCase()
        .includes(normalizeString(existingBookSearchInput))
    );
  }, [booksQuery.data, existingBookSearchInput]);

  return (
    <div className='flex flex-row h-screen'>
      <SideBar active='home' />
      <div className='pl-20 px-7 w-full'>
        <Header title='BookBuddy' />
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
              <CardBook
                title={book?.title}
                author={book?.author}
                key={index} // Provide a unique key for each item
                src={
                  book?.cover_i > 0
                    ? `${bookcoverAPI}${book?.cover_i}-L.jpg`
                    : ''
                }
                onClick={() =>
                  handleDisplayNotesModal(
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
          {filteredBooks && filteredBooks.length > 0
            ? filteredBooks.map((book, index) => (
                <CardBook
                  title={book?.title}
                  author={book?.author}
                  key={index} // Provide a unique key for each item
                  src={
                    book?.cover_i > 0
                      ? `${bookcoverAPI}${book?.cover_i}-L.jpg`
                      : ''
                  }
                  onClick={() =>
                    handleDisplayNotesModal(
                      book.title,
                      book.author,
                      book.notes,
                      book._id
                    )
                  }
                />
              ))
            : booksQuery.isFetched && <Error alert='No books found' />}
        </div>
        {booksQuery.isFetching && !booksQuery.data && <ButtonLoading />}
      </div>
      {selectedBook && (
        <ModalBook
          title={selectedBook.title}
          author={selectedBook.author}
          value={notesInput}
          onChange={(event) => setNotesInput(event.target.value)}
          onClickDelete={handleDisplayAlertModal}
          cancel={handleCloseNotesModal}
          save={handleSaveNotes}
        />
      )}
      {isModalAlertVisible && selectedBook && (
        <ModalAlert
          heading='Please confirm'
          subheading={`Are you certain you want to delete your notes on '${selectedBook.title}'? This action cannot be undone.`}
          cancel={handleCloseAlertModal}
          confirm={handleDeleteBook}
        />
      )}
      {isModalSearchVisible && (
        <ModalSearch
          cancel={handleCloseSearchModal}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          search={handleSearch}
          books={searchQuery?.data}
          bookExists={bookExists}
          onClick={handleAddBook}
          searching={searchQuery.isFetching}
        />
      )}
    </div>
  );
};

export default HomePage;
