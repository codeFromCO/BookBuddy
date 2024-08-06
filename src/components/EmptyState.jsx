import React from 'react';
import { FaWorm } from 'react-icons/fa6';

const EmptyState = () => {
  return (
    <div
      className={`flex flex-col w-full h-full justify-center items-center mb-5`}
    >
      <div className='flex flex-col justify-center items-center text-center'>
        <FaWorm className='size-14 mb-3' alt='Empty state icon' />
        <h2 className='text-xl font-bold'>Nothing here, but me</h2>
        <p className='text-sm mt-2 sm:flex hidden'>
          Click on the 'add book' button to get started.
        </p>
        <p className='text-sm mt-2 sm:hidden'>
          Click on the '+' button to get started.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
