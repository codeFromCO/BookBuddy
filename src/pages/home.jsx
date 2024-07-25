import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

import { HiMagnifyingGlass } from 'react-icons/hi2';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import CardBook from '../components/CardBook';
import ModalBook from '../components/ModalBook';
import ModalSearch from '../components/ModalSearch';
import ModalAlert from '../components/ModalAlert';
import ModalJumpToTop from '../components/ModalJumpToTop';
import ModalHamburger from '../components/ModalHamburger';
import ButtonLoading from '../components/ModalLoading';
import Error from '../components/Error';
import Selector from '../components/Selector';
import Searching from '../components/Searching';
import ModalLoading from '../components/ModalLoading';
import EmptyState from '../components/EmptyState';

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

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    onSuccess: (data) => {
      setSortedBooks(data);
    },
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooksByInput', newBookSearchInput],
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

  const handleSearch = useCallback(() => {
    // check if searchInput is empty
    if (newBookSearchInput.trim() === '') {
      return;
    }

    const normalizedSearchInput = normalizeString(newBookSearchInput);

    // check if book already exists
    const existingBook = booksQuery.data?.find(
      (book) => book.title.toLowerCase() === normalizedSearchInput
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

  const handleChangingSearchInput = useCallback(
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

  const handleExistingBookSearch = useCallback((inputValue) => {
    setExistingSearchBookInput(inputValue);
  }, []);

  const handleReOrder = useCallback((selectedOption) => {
    setSelectedSortOption(selectedOption);
  }, []);

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
          <div
            className={`items-center flex p-1 border-2 w-full h-[48px] border-primary  text-textOnLight  bg-primary sm:rounded-3xl rounded-md `}
          >
            <HiMagnifyingGlass />
            <input
              className='border-none focus:outline-none pl-3 w-full bg-primary placeholder-primaryFocus'
              placeholder='Search existing books by title'
              onChange={(e) => handleExistingBookSearch(e.target.value)}
            />
          </div>
          <Selector onChange={(e) => handleReOrder(e.target.value)} />
        </div>

        <div className='flex flex-wrap mt-3'>
          {booksQuery.data &&
            booksQuery.data.length > 0 &&
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
            : booksQuery.isFetched && existingBookSearchInput !== '' && <Error alert='No matching books found' />}
        </div>
        {booksQuery.data && booksQuery.data.length === 0 && <EmptyState />}

        {/* {booksQuery.isLoading && !booksQuery.data && (
          <ButtonLoading text={'Loading...'} />
        )} */}
        {/* <ButtonLoading text={'Loading...'} /> */}
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
          cancel={handleCloseNotesModal}
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
          cancel={handleCloseModalSearch}
          value={newBookSearchInput}
          onChange={(e) => handleChangingSearchInput(e.target.value)}
          search={handleSearch}
          books={searchQuery?.data}
          bookExists={bookAlreadyExists}
          onClick={handleAddBook}
          searching={searchQuery.isFetching}
        />
      )}
      {booksQuery.isLoading && !booksQuery.data && <ModalLoading />}
      <ModalJumpToTop onClick={scrollToTopOfPage} />
    </div>
  );
};

export default HomePage;
