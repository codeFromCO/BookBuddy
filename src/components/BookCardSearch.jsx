import React from 'react';
import { IoAddOutline } from 'react-icons/io5';

const BookCardSearch = (props) => {
  return (
    <div className='bg-gray-100 p-1 w-inputSearchWidth flex'>
      <img className='h-20' src={props.src}></img>
      <div className='flex-column pl-3 w-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-sm'>{props.title}</h2>
          <IoAddOutline
            className='size-5 hover:cursor-pointer'
            onClick={props.onClick}
          />
        </div>
        <h3 className='text-sm mb-2'>{props.author}</h3>
      </div>
    </div>
  );
};

export default BookCardSearch;
