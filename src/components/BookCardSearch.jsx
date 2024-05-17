import React from 'react';

const BookCardSearch = (props) => {
  return (
    <div className='bg-green-500 p-3 rounded-md'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-sm'>{props.title}</h2>
      </div>
      <h3 className='text-sm'>{props.author}</h3>
    </div>
  );
};

export default BookCardSearch;
