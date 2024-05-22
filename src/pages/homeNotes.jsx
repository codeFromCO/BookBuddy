import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookCardSearch from '../components/BookCardSearch';

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
  );

  console.log('this was the response', response);

  // need to handle error

  return response.json();
};

const TestHome = () => {
  const [searchInput, setSearchInput] = useState('');

  const queryClient = useQueryClient();
  // can change default options re stale in cache

  const postsQuery = useQuery({
    queryKey: ['books'], // unique identifier for query,
    queryFn: getBook,
  });

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

  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      <Header title='book buddy' />

      <div className='bg-blue-500 my-5'>
        <input
          className='p-2 w-inputSearchWidth border-2 rounded-md focus:outline-none focus:border-orange-500'
          type='text'
          placeholder='Add a new book...'
        />
        <button className='bg-yellow-500 border-2 border-yellow-800 rounded-md px-4 py-2'>
          Add
        </button>
      </div>
      <BookCardSearch
        title={postsQuery.data.docs[0].title}
        author={postsQuery.data.docs[0].author_name}
        src={`https://covers.openlibrary.org/b/id/${postsQuery.data.docs[0].cover_i}-M.jpg`}
      />
      <BookCard
        src={`https://covers.openlibrary.org/b/id/${postsQuery.data.docs[0].cover_i}-M.jpg`}
        title={postsQuery.data.docs[0].title}
        author={postsQuery.data.docs[0].author_name}
        notes={sampleNotes}
      />

      {/* show book cover, option to show book cover + note in card */}
    </div>
  );
};

export default TestHome;
