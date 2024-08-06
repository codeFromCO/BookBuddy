import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import throttle from 'lodash.throttle';

import {
  fetchBooks,
  searchBooksByInput,
  addBook,
  updateBookNotes,
  deleteBook,
} from '../api/api.js';

import {
  normalizeString,
  sortAlphabetically,
  sortAddedNewOld,
  sortAddedOldNew,
  sortUpdatedNewOld,
  sortUpdatedOldNew,
  scrollToTopOfPage,
} from '../utils/functions.js';

import { bookcoverAPI } from '../utils/constants.js';

import ModalLoading from '../components/ModalLoading.jsx';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import ModalHamburger from '../components/ModalHamburger.jsx';
import Searchbar from '../components/Searchbar.jsx';
import Selector from '../components/Selector.jsx';
import EmptyState from '../components/EmptyState.jsx';
import CardBook from '../components/CardBook.jsx';
import ModalBook from '../components/ModalBook.jsx';
import ModalSearch from '../components/ModalSearch.jsx';
import ModalAlert from '../components/ModalAlert.jsx';
import ModalJumpToTop from '../components/ModalJumpToTop.jsx';
import Error from '../components/Error.jsx';

const HomePage = () => {
  const [newBookSearchInput, setNewBookSearchInput] = useState('');
  const [existingBookSearchInput, setExistingSearchBookInput] = useState('');
  const [bookAlreadyExists, setBookAlreadyExists] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notesInput, setNotesInput] = useState('');
  const [isModalSearchVisible, setisModalSearchVisible] = useState(false);
  const [isModalAlertVisible, setisModalAlertVisible] = useState(false);
  const [isModalHamburgerVisible, setModalHamburgerVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('DEFAULT');
  const [isScrolled, setIsScrolled] = useState(false);

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    onError: (error) => {
      console.error('Error fetching books:', error);
    },
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooksByInput', newBookSearchInput, booksQuery.data],
    queryFn: () => searchBooksByInput(newBookSearchInput, booksQuery?.data),
    enabled: false, // disabled automatically running
    onError: (error) => {
      console.error('Error searching books:', error);
    },
  });

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setNewBookSearchInput('');
    },
    onError: (error) => {
      console.error('Error adding book:', error);
    },
  });

  const updateBookNotesMutation = useMutation({
    mutationFn: updateBookNotes,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setSelectedBook(null);
      setNotesInput('');
    },
    onError: (error) => {
      console.error('Error updating book notes:', error);
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setSelectedBook(null);
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
    },
  });

  const handleExistingBookSearch = useCallback((event) => {
    const value = event.target.value;
    setExistingSearchBookInput(value);
  }, []);

  const handleClearExistingBookSearchInput = useCallback(() => {
    setExistingSearchBookInput('');
  }, []);

  const handleClearNewBookSearchInput = useCallback(() => {
    setNewBookSearchInput('');
  }, []);

  const handleReOrder = useCallback((selectedOption) => {
    setSelectedSortOption(selectedOption);
  }, []);

  const handleNewBookSearch = useCallback(() => {
    // check if searchInput is empty
    if (newBookSearchInput.trim() === '') {
      return;
    }

    const normalizedSearchInput = normalizeString(newBookSearchInput);

    // check if book already exists
    const existingBook = booksQuery.data?.find(
      (book) => normalizeString(book.title) === normalizedSearchInput
    );

    if (existingBook) {
      setBookAlreadyExists(true);
      return;
    } else {
      setBookAlreadyExists(false);
      searchQuery.refetch();
    }
  }, [newBookSearchInput, booksQuery.data, searchQuery]);

  const handleDisplayModalSearch = useCallback(() => {
    setExistingSearchBookInput('');
    setisModalSearchVisible(true);
  }, []);

  const handleCloseModalSearch = useCallback(() => {
    setisModalSearchVisible(false);
    setBookAlreadyExists(false);
    setNewBookSearchInput('');
  }, []);

  const handleDisplayNotesModal = useCallback(
    (title, author_name, notes, _id) => {
      setSelectedBook({ title, author: author_name, notes, _id });
      setNotesInput(notes);
      setisModalSearchVisible(false);
      setNewBookSearchInput('');
    },
    []
  );

  const handleCloseNotesModal = useCallback(() => {
    setSelectedBook(null);
    setNotesInput('');
    setisModalAlertVisible(false);
  }, []);

  const handleDisplayAlertModal = useCallback(() => {
    setisModalAlertVisible(true);
  }, []);
  const handleCloseAlertModal = useCallback(() => {
    setisModalAlertVisible(false);
  }, []);

  const handleDisplayModalHamburger = useCallback(() => {
    setModalHamburgerVisible(true);
  }, []);
  const handleCloseModalHamburger = useCallback(() => {
    setModalHamburgerVisible(false);
  }, []);

  const handleChangingNewBookSearchInput = useCallback(
    (inputValue) => {
      if (bookAlreadyExists) {
        setBookAlreadyExists(false);
      }
      setNewBookSearchInput(inputValue);
    },
    [bookAlreadyExists]
  );

  const handleAddBook = useCallback(
    (title, author, cover_i) => {
      const book = {
        title,
        author,
        cover_i,
      };

      addBookMutation.mutate(book);
      setNewBookSearchInput('');
      setisModalSearchVisible(false);
    },
    [addBookMutation]
  );

  const handleSaveNotes = useCallback(() => {
    if (selectedBook) {
      updateBookNotesMutation.mutate({
        _id: selectedBook._id,
        notes: notesInput,
      });
    }
    setSelectedBook(null);
    setNotesInput('');
  }, [selectedBook, notesInput, updateBookNotesMutation]);

  const handleDeleteBook = useCallback(() => {
    if (selectedBook) {
      deleteBookMutation.mutate({ _id: selectedBook._id });
      setisModalAlertVisible(false);
      setNotesInput('');
    }
  }, [selectedBook, deleteBookMutation]);

  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 0);
    }, 300),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const sortedBooks = useMemo(() => {
    let sortedData = [...(booksQuery.data || [])];

    switch (selectedSortOption) {
      case 'title':
        sortAlphabetically(sortedData);
        break;
      case 'addedNewOld':
        sortAddedNewOld(sortedData);
        break;
      case 'addedOldNew':
        sortAddedOldNew(sortedData);
        break;
      case 'updatedNewOld':
        sortUpdatedNewOld(sortedData);
        break;
      case 'updatedOldNew':
        sortUpdatedOldNew(sortedData);
        break;
      default:
        break;
    }
    return sortedData;
  }, [booksQuery.data, selectedSortOption]);

  const filteredBooks = useMemo(() => {
    return sortedBooks.filter((book) =>
      book.title
        .toLowerCase()
        .includes(normalizeString(existingBookSearchInput))
    );
  }, [sortedBooks, existingBookSearchInput]);

  return (
    <div className='flex flex-row h-screen'>
      {booksQuery.isLoading && !booksQuery.data && <ModalLoading />}
      <SideBar active='home' />
      <div
        className={`sm:pl-20 px-5 w-full flex flex-col  mb-5 ${
          isModalSearchVisible || selectedBook ? 'overflow-hidden' : ''
        }`}
      >
        <Header
          title='BookBuddy'
          displayModalHamburger={handleDisplayModalHamburger}
          displayModalSearch={handleDisplayModalSearch}
        />
        <div className='mt-5 mb-0 space-x-0 space-y-3 sm:flex sm:space-x-3 sm:space-y-0'>
          <Searchbar
            value={existingBookSearchInput}
            onChange={handleExistingBookSearch}
            onClear={handleClearExistingBookSearchInput}
            isModalSearchVisible={isModalSearchVisible}
          />
          <Selector onChange={(e) => handleReOrder(e.target.value)} />
        </div>
        <div className={'mt-5 flex flex-wrap gap-5 justify-normal pb-5'}>
          {booksQuery.isError ? (
            <Error alert='Something went wrong' />
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <CardBook
                key={book._id}
                title={book.title}
                author={book.author}
                src={
                  book.cover_i ? `${bookcoverAPI}${book.cover_i}-L.jpg` : null
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
          ) : (
            existingBookSearchInput !== '' && (
              <Error
                alert={
                  booksQuery.data?.length === 0
                    ? `You haven't added any books yet.`
                    : 'No matching books found.'
                }
              />
            )
          )}
        </div>
        {booksQuery.isFetched && booksQuery.data?.length === 0 && (
          <EmptyState />
        )}
      </div>
      {isModalHamburgerVisible && (
        <ModalHamburger
          hideModalHamburger={handleCloseModalHamburger}
          active='home'
        />
      )}
      {selectedBook && (
        <ModalBook
          title={selectedBook.title}
          author={selectedBook.author}
          value={notesInput}
          onChange={(event) => setNotesInput(event.target.value)}
          onClickDelete={handleDisplayAlertModal}
          close={handleCloseNotesModal}
          save={handleSaveNotes}
        />
      )}
      {isModalAlertVisible && selectedBook && (
        <ModalAlert
          heading='Please confirm'
          subheading={`Are you certain you want to delete '${selectedBook.title}'? This action cannot be undone.`}
          cancel={handleCloseAlertModal}
          confirm={handleDeleteBook}
        />
      )}
      {isModalSearchVisible && (
        <ModalSearch
          close={handleCloseModalSearch}
          value={newBookSearchInput}
          onChange={(e) => handleChangingNewBookSearchInput(e.target.value)}
          search={handleNewBookSearch}
          books={searchQuery?.data}
          bookExists={bookAlreadyExists}
          onClick={handleAddBook}
          searching={searchQuery.isFetching}
          onClear={handleClearNewBookSearchInput}
        />
      )}
      {isScrolled && <ModalJumpToTop onClick={scrollToTopOfPage} />}
    </div>
  );
};

export default HomePage;
