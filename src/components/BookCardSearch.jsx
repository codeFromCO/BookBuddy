import React from 'react';
import { IoAddOutline } from 'react-icons/io5';

// TO-DO: 1) check if long title's affect position of + 2) add search / shadow feature

const BookCardSearch = (props) => {
  return (
    <div className='p-1 w-inputSearchWidth flex border-x-2 border-b-2 border-white bg-white'>
      <img className='h-20' src={props.src}></img>
      <div className='flex-column pl-3 w-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-sm'>{props.title}</h2>
          <IoAddOutline
            className='size-5 hover:cursor-pointer hover:text-baseButtonFocus'
            onClick={props.onClick}
          />
        </div>
        <h3 className='text-sm mb-2'>{props.author}</h3>
      </div>
    </div>
  );
};

export default BookCardSearch;
