import React, { useState } from 'react';

const CardBook = ({
  alreadyExists,
  modalSearch,
  src,
  onClick,
  title,
  author,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div
      className={`sm:w-44 w-[calc((100%-40px)/3)] content-end ${
        alreadyExists ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'
      } ${
        modalSearch
          ? ''
          : 'transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
      }`}
    >
      <div>
        {src && !imgError ? (
          <img
            className={`object-contain w-full ${
              modalSearch && !alreadyExists
                ? 'hover:outline outline-4 outline-offset-[-4px] outline-blue-500'
                : ''
            } ${
              alreadyExists
                ? 'outline outline-4 outline-offset-[-4px] outline-textOnError opacity-50'
                : ''
            }`}
            onClick={alreadyExists ? null : onClick}
            src={src}
            onError={handleError}
            alt={title}
          />
        ) : (
          <div
            className={`bg-primary border-l-8 border-black sm:h-64 min-h- h-48 sm:text-center p-6 ${
              modalSearch && !alreadyExists
                ? 'hover:outline hover:outline-4 hover:outline-blue-500'
                : ''
            } ${
              alreadyExists
                ? 'outline outline-4 outline-offset-[-4px] outline-textOnError opacity-50'
                : ''
            }`}
            onClick={alreadyExists ? null : onClick}
          >
            <h2 className='overflow-ellipsis overflow-y-scroll break-words font-bold sm:text-base text-sm max-h-[75%]'>
              {title}
            </h2>
            <h3 className='break-words sm:text-base text-xs'>{author}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBook;
