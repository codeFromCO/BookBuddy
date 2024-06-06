import React from 'react';
import { useParams } from 'react-router-dom';

const BookPage = () => {
  // get book id off url
  const { bookID } = useParams();

  return (
    <div>
      <h1>This is the book</h1>;
    </div>
  );
};

export default BookPage;
