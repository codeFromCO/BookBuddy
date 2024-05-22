import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookCardSearch from '../components/BookCardSearch';

const sampleNotes =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nam quis asperiores quia, aliquid odio et? Inventore eveniet quae accusamus!';

const samplePost = [
  { id: 1, title: 'book 1' },
  { id: 2, title: 'book 2' },
];

// sample query keys because must be unique
// e.g. if /posts => ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1 => ["posts", {authorId: 1}]
// /posts/2/comments => ["posts", post.id, "comments"]

const bookSearchAPI = 'https://openlibrary.org/search.json?q=';

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const TestHome = () => {
  const [searchInput, setSearchInput] = useState('');

  const queryClient = useQueryClient();
  // can change default options re stale in cache

  const postsQuery = useQuery({
    queryKey: ['posts'], // unique identifier for query,
    queryFn: () => wait(1000).then(() => [...samplePost]), // what runs to query the data, must return a promise NB can access queryKey in queryFn by simple writing queryKey
    // refetchInterval: 1000 would refetch every sec
    // can set enabled to true or false e.g. if have userQuery can write enabled: postQuery?.data?.userId !== null ie only run if have a function
  });

  // const {data, status} = useQuery('cars', fetchCars)

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      wait(1000).then(() =>
        samplePost.push({ id: crypto.randomUUID(), title })
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    // also onError, onSettled, onMutate NB onMutate is called before function so generally this is where you set your context; mutation won't retry
    // when do mutation generally want to invalidate a query, can pass parameter {exact: true} instead of everything starting w/ query key
    // can also setQueryData manually in cache
  });

  // useQueries hooks allows you to pass array of queries to run 
  // use placeholder data not initial data because initial will be makred as fresh 

  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  // error object from queryFn will show up here
  // throw errors if using fetch not axios

  // can check if error, loading or success w/ postsQuery.status ===

  // successful if not in loading or error
  return (
    <div>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate('book 3')}
      >
        Add new
      </button>
    </div>
  );

  // search for book

  // sample open library search
  //openlibrary.org/search.json?q=the+lord+of+the+rings

  //remove spaces from search string and replace with +
  // let searchString = searchInut.replace(/ /g, '+');

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
      <BookCardSearch title='Placeholder title' author='Placeholder author' />

      <BookCard
        title='Placeholder title'
        author='Placeholder author'
        notes={sampleNotes}
      />

      {/* show book cover, option to show book cover + note in card */}
    </div>
  );
};

export default TestHome


