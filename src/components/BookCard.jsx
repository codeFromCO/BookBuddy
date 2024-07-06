import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

const BookCard = (props) => {
  return (
    <div className={`sm:w-44 w-1/2 content-end hover:cursor-pointer pr-4 py-2 ${props.modalSearch ? '' : 'transition duration-500 ease-in-out transform  hover:-translate-y-1 hover:scale-110'}`}>
      <img
        className={`object-contain w-full  ${props.modalSearch ? 'hover:outline hover:outline-4 hover:outline-blue-500' : ''}`}
        onClick={props.onClick}
        src={props.src}
      ></img>
    </div>
  );
};

export default BookCard;
