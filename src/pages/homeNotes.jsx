import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookCardSearch from '../components/BookCardSearch';
import ButtonLoading from '../components/ButtonLoading';
import Button from '../components/Button';

const sampleNotes =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nam quis asperiores quia, aliquid odio et? Inventore eveniet quae accusamus!';

// sample query keys because must be unique
// e.g. if /posts => ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1 => ["posts", {authorId: 1}]
// /posts/2/comments => ["posts", post.id, "comments"]

const bookSearchAPI = 'https://openlibrary.org/search.json?q=';
//remove spaces from search string and replace with +
// let searchString = searchInut.replace(/ /g, '+');

const getBook = async () => {
  const response = await fetch(
    'https://openlibrary.org/search.json?q=fantastic+mr+fox'
    // 'https://openlibrary.org/search.json?q=dune'
  );

  console.log('this was the response', response);

  // need to handle error

  return response.json();
};

const searchBooks = async (input) => {
  let searchString = input.replace(/ /g, '+');

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${searchString}`
  );

  console.log('this is the search function', response);

  // need to handle error

  return response.json();
};

const TestHome = () => {
  const [searchInput, setSearchInput] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'], // unique identifier for query,
    queryFn: getBook,
  });

  const searchQuery = useQuery({
    queryKey: ['searchBooks', searchInput],
    queryFn: () => searchBooks(searchInput),
    enabled: false, // disabled automatically running
  });

  const clickToSearch = () => {
    setButtonClicked(true);
    searchQuery.refetch();
  };

  // const {data, status} = useQuery('cars', fetchCars)

  //   const newPostMutation = useMutation({
  //     mutationFn: // add function
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['posts']);
  //     },
  //     // also onError, onSettled, onMutate NB onMutate is called before function so generally this is where you set your context; mutation won't retry
  //     // when do mutation generally want to invalidate a query, can pass parameter {exact: true} instead of everything starting w/ query key
  //     // can also setQueryData manually in cache
  //   });

  // useQueries hooks allows you to pass array of queries to run
  // use placeholder data not initial data because initial will be makred as fresh

  const addBookFunction = () => {
    console.log('the + button was clicked˝');
  };

  return (
    <div>
      <Header title='book buddy' />

      <div className='bg-blue-500 my-5 mb-0'>
        <input
          className={`p-2 w-inputSearchWidth border-2 rounded-md focus:outline-none focus:border-orange-500 ${
            searchQuery.data ? 'rounded-b-none' : ''
          }`}
          type='text'
          placeholder='Add a new book...'
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className='bg-yellow-500 border-2 border-yellow-800 rounded-md px-4 py-2'
          onClick={clickToSearch}
        >
          Search
        </button>
      </div>

      <div>
        {buttonClicked && !searchQuery.isFetching && searchQuery.data && (
          // <h1>Success</h1> // even this isn't displaying
          <BookCardSearch
            title={searchQuery.data?.docs[0].title}
            author={searchQuery.data?.docs[0].author_name[0]}
            src={`https://covers.openlibrary.org/b/id/${searchQuery.data?.docs[0].cover_i}-M.jpg`}
            onClick={addBookFunction}
          />
        )}
        {buttonClicked && searchQuery.isError && (
          <pre>{JSON.stringify(searchQuery.isError)}</pre>
        )}
      </div>

      {booksQuery.data && (
        <BookCard
          src={`https://covers.openlibrary.org/b/id/${booksQuery.data.docs[0].cover_i}-M.jpg`}
          title={booksQuery.data.docs[0].title}
          author={booksQuery.data.docs[0].author_name}
          notes={sampleNotes}
        />
      )}

      {booksQuery.isFetching && <ButtonLoading />}
      {booksQuery.isError && <h1>{JSON.stringify(booksQuery.error)}</h1>}

      {/* show book cover, option to show book cover + note in card */}
    </div>
  );
};

export default TestHome;
