import React from 'react';
import { FaWorm } from 'react-icons/fa6';

const Searching = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <FaWorm className='size-10 m-3 animate-bounce' />
      <h2 className='text-xl font-bold'>Searching...</h2>
      <p>This may take a few seconds.</p>
    </div>
  );
};

export default Searching;
