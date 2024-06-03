import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

const BookCard = (props) => {
  return (
    <div className='bg-red-500 p-3 rounded-md my-3'>
      <div className='flex'>
        <img className='max-h-32' src={props.src}></img>
        <div className='pl-3'>
          <div className='flex justify-between'>
            <h2 className='font-bold text-lg'>{props.title}</h2>
            <FaRegEdit
              className='size-5 hover:cursor-pointer'
              onClick={props.onClick}
            />
          </div>
          <h3 className='text-sm mb-2'>{props.author}</h3>
          <p className='text-sm'>{props.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
