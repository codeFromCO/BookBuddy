import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BookCardLarge from '../components/BookCardLarge';
import Header from '../components/Header';

const getBookFunction = async ({ _id }) => {
  const response = await fetch('/api/book/findOne', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id }),
  });

  const jsonData = await response.json();
  return jsonData.data;
};

const BookPage = () => {
  // get book id off url
  const { bookID } = useParams();

  const queryClient = useQueryClient();

  const bookQuery = useQuery({
    queryKey: ['book', bookID],
    queryFn: () => getBookFunction({ _id: bookID }),
  });

  return (
    <div>
      <Header title='book buddy'/>
      <div className='flex items-center justify-center h-5/6 mt-3'>
        {bookQuery.data && (
          <BookCardLarge
            title={bookQuery.data.title}
            author={bookQuery.data.author}
            innerText={bookQuery.data.notes}
          />
        )}
      </div>
    </div>
  );
};

export default BookPage;
