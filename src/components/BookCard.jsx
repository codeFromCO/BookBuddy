import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

const BookCard = (props) => {
  return (
    <div className='sm:w-44 w-1/2 content-end hover:cursor-pointer pr-3 pb-4 ransition duration-500 ease-in-out transform  hover:-translate-y-1 hover:scale-110'>
      <img
        className='object-contain w-full'
        onClick={props.onClick}
        src={props.src}
      ></img>
    </div>
  );
};

export default BookCard;
