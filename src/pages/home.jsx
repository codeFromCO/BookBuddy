import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookCardSearch from '../components/BookCardSearch';
import ButtonLoading from '../components/ButtonLoading';
import Button from '../components/Button';
import Error from '../components/Error';
import { FaHourglass } from 'react-icons/fa6';
import SideBar from '../components/SideBar';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import ModalBook from '../components/ModalBook';

// TO-DO
// display alphabetically? most recently updated?
// distinguish between finished and still reading?

const bookSearchAPI = 'https://openlibrary.org/search.json?q=';
const bookcoverAPI = 'https://covers.openlibrary.org/b/id/';

const getBooksFunction = async () => {
  const response = await fetch('api/book/findAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const jsonData = await response.json();
  return jsonData.data;
};

const searchBooks = async (input) => {
  const searchString = input.replace(/ /g, '+');
  const response = await fetch(`${bookSearchAPI}${searchString}`);

  const dataToReturn = await response.json();

  return dataToReturn;
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

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [bookExists, setBookExists] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'], // unique identifier for query,
    queryFn: getBooksFunction,
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooks', searchInput],
    queryFn: () => searchBooks(searchInput),
    enabled: false, // disabled automatically running
  });

  const mutation = useMutation({
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

  const clickToSearch = () => {
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
      setButtonClicked(true);
      searchQuery.refetch();
    }
  };

  const handleAddBook = () => {
    if (searchQuery.data?.docs.length > 0) {
      const book = {
        title: searchQuery.data.docs[0].title,
        author: searchQuery.data.docs[0].author_name[0],
        cover_i: searchQuery.data.docs[0].cover_i,
      };

      mutation.mutate(book);
      setSearchInput('');
    }
  };

  const clickToNavigate = (ID) => {
    navigate(`/book/${ID}`);
  };

  return (
    <div className='flex flex-row'>
      <SideBar active='home' />
      <div className='pl-4'>
        <Header title='BookBuddy' />

        <div className='px-3'>
          <div className='mt-5 mb-0 flex justify-end'>
            <div
              className={`items-center flex p-2 w-inputSearchWidth border-2 border-baseSidebar text-black bg-baseSidebar rounded-3xl ${
                searchQuery.data ? 'rounded-b-none' : ''
              }`}
            >
              <HiMagnifyingGlass/>
              <input
                className='border-none focus:outline-none pl-3 bg-baseSidebar placeholder-baseBackgroundSecondary'
                value={searchInput}
                type='text'
                placeholder='Search for a new book...'
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              className='text-white border-2 bg-black border-black rounded-md px-4 py-2 flex items-center  hover:bg-baseButtonFocus hover:border-baseButtonFocus'
              onClick={clickToSearch}
            >
              Search
              {searchQuery.isFetching && (
                <FaHourglass className='ml-2'></FaHourglass>
              )}
            </button>
          </div>

          <div>
            {buttonClicked &&
              !searchQuery.isFetching &&
              searchQuery.data &&
              searchQuery.data.numFound > 0 && (
                // <h1>Success</h1> // even this isn't displaying
                <BookCardSearch
                  title={searchQuery.data?.docs[0].title}
                  author={searchQuery.data?.docs[0].author_name[0]}
                  src={`${bookcoverAPI}${searchQuery.data?.docs[0].cover_i}-S.jpg`}
                  onClick={handleAddBook}
                />
              )}
            {buttonClicked && searchQuery.isError && (
              <pre>{JSON.stringify(searchQuery.isError)}</pre>
            )}
            {bookExists && <Error alert='Book previously added' />}
            {buttonClicked &&
              !searchQuery.isFetching &&
              searchQuery.data &&
              searchQuery.data.numFound === 0 && (
                <Error alert='Book not found' />
              )}
          </div>
          <div className='flex flex-wrap mt-3'>
            {booksQuery.data && booksQuery.data.length > 0 ? (
              booksQuery.data.map((book, index) => (
                <BookCard
                  key={index} // Provide a unique key for each item
                  src={`${bookcoverAPI}${book?.cover_i}-L.jpg`}
                  onClick={() => clickToNavigate(book._id)}
                />
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>

          {booksQuery.isFetching && !booksQuery.data && <ButtonLoading />}
          {booksQuery.isError && <h1>{JSON.stringify(booksQuery.error)}</h1>}

          {/* show book cover, option to show book cover + note in card */}
        </div>
      </div>
      <ModalBook title="Test title" author="Test author"/>
    </div>
  );
};

export default HomePage;
