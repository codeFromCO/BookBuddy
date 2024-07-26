import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import throttle from 'lodash.throttle';

import {
  fetchBooks,
  searchBooksByInput,
  addBook,
  updateBookNotes,
  deleteBook,
} from '../api/api';

import {
  normalizeString,
  sortAlphabetically,
  sortAddedNewOld,
  sortAddedOldNew,
  sortUpdatedNewOld,
  sortUpdatedOldNew,
  scrollToTopOfPage,
} from '../utils/functions';

import { bookcoverAPI } from '../utils/constants';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import ModalHamburger from '../components/ModalHamburger';
import CardBook from '../components/CardBook';
import ModalBook from '../components/ModalBook';
import ModalSearch from '../components/ModalSearch';
import ModalAlert from '../components/ModalAlert';
import ModalJumpToTop from '../components/ModalJumpToTop';
import Error from '../components/Error';
import Selector from '../components/Selector';
import ModalLoading from '../components/ModalLoading';
import EmptyState from '../components/EmptyState';
import Searchbar from '../components/Searchbar';

const HomePage = () => {
  const [newBookSearchInput, setNewBookSearchInput] = useState('');
  const [existingBookSearchInput, setExistingSearchBookInput] = useState('');
  const [bookAlreadyExists, setBookAlreadyExists] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalSearchVisible, setisModalSearchVisible] = useState(false);
  const [isModalAlertVisible, setisModalAlertVisible] = useState(false);
  const [notesInput, setNotesInput] = useState('');
  const [isModalHamburgerVisible, setModalHamburgerVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('DEFAULT');
  const [isScrolled, setIsScrolled] = useState(false);

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    onSuccess: (data) => {
      setSortedBooks(data);
    },
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooksByInput', newBookSearchInput, booksQuery.data],
    queryFn: () => searchBooksByInput(newBookSearchInput, booksQuery?.data),
    enabled: false, // disabled automatically running
  });

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      queryClient.invalidateQueries(['searchBooksByInput']);
      setNewBookSearchInput('');
    },
  });

  const updateBookNotesMutation = useMutation({
    mutationFn: updateBookNotes,
    onSuccess: () => {
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

  const handleExistingBookSearch = useCallback((event) => {
    const value = event.target.value;
    setExistingSearchBookInput(value);
  }, []);

  const handleClearExistingBookSearchInput = useCallback(() => {
    setExistingSearchBookInput('');
  });

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
    if (booksQuery.data) {
      let sortedData = [...booksQuery.data];

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
      queryClient.setQueryData(['books'], sortedData);
    }
  }, [booksQuery.data, selectedSortOption, queryClient]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
      <div
        // BE CAREFUL OF SETTING HEIGHT
        className={`sm:pl-20 px-5 w-full flex flex-col ${
          isModalSearchVisible || selectedBook ? 'overflow-hidden' : ''
        }`}
      >
        <Header
          title='BookBuddy'
          displayModalHamburger={handleDisplayModalHamburger}
          displayModalSearch={handleDisplayModalSearch}
          savedBooksExist={booksQuery.data && booksQuery.data.length > 0}
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

        <div className='flex flex-wrap mt-3'>
          {booksQuery.data &&
            booksQuery.data?.length > 0 &&
            !filteredBooks &&
            booksQuery.data.map((book, index) => (
              <CardBook
                title={book?.title}
                author={book?.author}
                key={index}
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
        <div className='mt-3 flex flex-wrap gap-5 justify-normal'>
          {filteredBooks && filteredBooks.length > 0
            ? filteredBooks.map((book, index) => (
                <CardBook
                  title={book?.title}
                  author={book?.author}
                  key={index}
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
            : booksQuery.isFetched &&
              booksQuery.data &&
              existingBookSearchInput !== '' && (
                <Error
                  alert={
                    booksQuery.data.length === 0
                      ? `You haven't added any books yet.`
                      : 'No matching books found.'
                  }
                />
              )}
        </div>
        {booksQuery.data && booksQuery.data.length === 0 && <EmptyState />}
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
        />
      )}
      {booksQuery.isLoading && !booksQuery.data && <ModalLoading />}
      {isScrolled && <ModalJumpToTop onClick={scrollToTopOfPage} />}
    </div>
  );
};

export default HomePage;
