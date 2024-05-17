import React from 'react';

const BookCard = (props) => {
  return (
    <div className='bg-red-500 p-3 rounded-md'>
      <h2 className='font-bold text-lg'>{props.title}</h2>
      <h3 className='text-sm mb-2'>{props.author}</h3>
      <p className='text-sm'>{props.notes}</p>
    </div>
  );
};

export default BookCard;
