import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookCardSearch from '../components/BookCardSearch';
import ButtonLoading from '../components/ButtonLoading';
import Button from '../components/Button';
import Error from '../components/Error';
import { FaHourglass } from 'react-icons/fa6';

// sample query keys because must be unique
// e.g. if /posts => ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1 => ["posts", {authorId: 1}]
// /posts/2/comments => ["posts", post.id, "comments"]

const bookSearchAPI = 'https://openlibrary.org/search.json?q=';
const bookcoverAPI = 'https://covers.openlibrary.org/b/id/';

const getBooksFunction = async () => {
  const response = await fetch('api/book/findAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const jsonData = await response.json();

  return jsonData.data;
};

const searchBooks = async (input) => {
  const searchString = input.replace(/ /g, '+');
  const response = await fetch(`${bookSearchAPI}${searchString}`);

  const dataToReturn = await response.json();

  // check if no data
  if (dataToReturn.numFound === 0) {
    console.log('no book found');
  }

  return dataToReturn;
};

const addBook = async (book) => {
  const response = await fetch('api/book/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error('Response was not okay');
  }

  const jsonData = await response.json();
  return jsonData;
};

const TestHome = () => {
  const [searchInput, setSearchInput] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [bookExists, setBookExists] = useState(false);

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
    }
  };

  // const {data, status} = useQuery('cars', fetchCars)

  //   const newPostMutation = useMutation({
  //     mutationFn: // add function
  //     onSucce ss: () => {
  //       queryClient.invalidateQueries(['posts']);
  //     },
  //     // also onError, onSettled, onMutate NB onMutate is called before function so generally this is where you set your context; mutation won't retry
  //     // when do mutation generally want to invalidate a query, can pass parameter {exact: true} instead of everything starting w/ query key
  //     // can also setQueryData manually in cache
  //   });

  // useQueries hooks allows you to pass array of queries to run
  // use placeholder data not initial data because initial will be makred as fresh

  // this works but should be done react query style
  // const bookObj = {
  //   title: searchQuery.data?.docs[0].title,
  //   author: searchQuery.data?.docs[0].author_name[0],
  //   cover_i: searchQuery.data?.docs[0].cover_i,
  // };

  return (
    <div>
      <Header title='book buddy' />

      <div className='px-3'>
        <div className='my-5 mb-0 flex items-end'>
          <input
            className={`p-2 w-inputSearchWidth border-2 rounded-md focus:outline-none focus:border-basePeach ${
              searchQuery.data ? 'rounded-b-none' : ''
            }`}
            type='text'
            placeholder='Add a new book...'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className='bg-basePeach border-2 border-basePeach text-baseMidGray rounded-md px-4 py-2 flex items-center '
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
                src={`${bookcoverAPI}${searchQuery.data?.docs[0].cover_i}-M.jpg`}
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
            searchQuery.data.numFound === 0 && <Error alert='Book not found' />}
        </div>

        {booksQuery.data && booksQuery.data.length > 0 ? (
          booksQuery.data.map((book, index) => (
            <BookCard
              key={index} // Provide a unique key for each item
              src={`${bookcoverAPI}${book?.cover_i}-M.jpg`}
              title={book?.title}
              author={book?.author}
              notes={book?.notes}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}

        {booksQuery.isFetching && !booksQuery.data && <ButtonLoading />}
        {booksQuery.isError && <h1>{JSON.stringify(booksQuery.error)}</h1>}

        {/* show book cover, option to show book cover + note in card */}
      </div>
    </div>
  );
};

export default TestHome;
