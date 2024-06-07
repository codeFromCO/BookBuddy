import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BookCardLarge from '../components/BookCardLarge';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const getBookFunction = async ({ _id }) => {
  const response = await fetch('/api/book/findOne', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id }),
  });

  const jsonData = await response.json();
  return jsonData.data;
};

const updateBookFunction = async ({ _id, notes }) => {
  console.log('this came through', _id, notes);

  const response = await fetch('/api/book/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id, notes }),
  });

  const jsonData = await response.json();
  console.log('this was the data', jsonData);
  return jsonData;
};

const deleteBookFunction = async ({ _id }) => {
  const response = await fetch('/api/book/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id }),
  });

  const jsonData = await response.json();
  console.log('this was the data', jsonData);
  return jsonData.data;
};

const BookPage = () => {
  // get book id off url
  const { bookID } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const bookQuery = useQuery({
    queryKey: ['book', bookID],
    queryFn: () => getBookFunction({ _id: bookID }),
  });

  const updateBookMutation = useMutation({
    mutationFn: updateBookFunction,
    onSuccess: (data) => {
      queryClient.setQueryData(['book'], bookID, data);
      queryClient.invalidateQueries(['book', bookID], { exact: true });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: deleteBookFunction,
    onSuccess: () => {
      queryClient.invalidateQueries(['book', bookID], { exact: true });
      navigate(`/`);
    },
  });

  const handleUpdate = (notes) => {
    const data = bookQuery.data;
    queryClient.setQueryData(['book', bookID], { ...data, notes: notes });
  };

  const handleSubmit = () => {
    if (bookQuery.data)
      updateBookMutation.mutate({
        _id: bookQuery.data._id,
        notes: bookQuery.data.notes,
      });
  };

  const handleDelete = () => {
    deleteBookMutation.mutate({
      _id: bookQuery.data._id,
    });
  };

  return (
    <div>
      <Header title='book buddy' />
      <div className='flex items-center justify-center h-5/6 mt-3'>
        {bookQuery.data && (
          <BookCardLarge
            title={bookQuery.data.title}
            author={bookQuery.data.author}
            value={bookQuery.data.notes}
            onSubmit={handleSubmit}
            onChange={(event) => handleUpdate(event.target.value)}
            onClickDelete={handleDelete}
          >
            {' '}
          </BookCardLarge>
        )}
      </div>
    </div>
  );
};

export default BookPage;
