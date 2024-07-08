import React, { useState } from 'react';

const CardBook = (props) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div
      className={`sm:w-44 w-1/2 content-end hover:cursor-pointer pr-4 py-2 ${
        props.modalSearch
          ? ''
          : 'transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
      }`}
    >
      {props.src && !imgError ? (
        <img
          className={`object-contain w-full ${
            props.modalSearch
              ? 'hover:outline hover:outline-4 hover:outline-blue-500'
              : ''
          }`}
          onClick={props.onClick}
          src={props.src}
          onError={handleError}
          alt={props.title}
        />
      ) : (
        <div
          className='bg-baseCardBackground border-l-8 border-black h-64 text-center p-6'
          onClick={props.onClick}
        >
          <h2 className='font-bold'>{props.title}</h2>
          <h3>{props.author}</h3>
        </div>
      )}
    </div>
  );
};

export default CardBook;
