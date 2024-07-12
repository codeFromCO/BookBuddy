import React, { useState } from 'react';

const CardBook = (props) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div
      className={`sm:w-44 w-1/2 content-end pr-4 py-2 ${
        props.alreadyExists
          ? 'hover:cursor-not-allowed'
          : 'hover:cursor-pointer'
      } ${
        props.modalSearch
          ? ''
          : 'transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
      }`}
    >
      <div>
        {props.src && !imgError ? (
          <img
            className={`object-contain w-full ${
              props.modalSearch && !props.alreadyExists
                ? 'hover:outline outline-4 outline-offset-[-4px] outline-blue-500'
                : ''
            } ${
              props.alreadyExists
                ? 'outline outline-4 outline-offset-[-4px] outline-baseAlertText opacity-50'
                : ''
            }`}
            onClick={props.alreadyExists ? null : props.onClick}
            src={props.src}
            onError={handleError}
            alt={props.title}
          />
        ) : (
          <div
            className={`bg-baseCardBackground border-l-8 border-black h-64 text-center p-6 ${
              props.modalSearch && !props.alreadyExists
                ? 'hover:outline hover:outline-4 hover:outline-blue-500'
                : ''
            } ${
              props.alreadyExists
                ? 'outline outline-4 outline-offset-[-4px] outline-baseAlertText opacity-50'
                : ''
            }`}
            onClick={props.alreadyExists ? null : props.onClick}
          >
            <h2 className='font-bold'>{props.title}</h2>
            <h3>{props.author}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBook;

//
