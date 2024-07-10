import React from 'react';

const ButtonLoading = () => {
  return (
    <div className='bg-baseTextPrimary w-32 flex rounded-md p-3 text-white my-3'>
      <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.75 3.918 2 5.291l2-2z'
        ></path>
      </svg>
      Loading...
    </div>
  );
};

export default ButtonLoading;
