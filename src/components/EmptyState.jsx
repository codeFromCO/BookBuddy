import React from 'react';
import { FaWorm } from 'react-icons/fa6';

const EmptyState = () => {
  return (
    <div
      className={`flex flex-col w-full h-full justify-center items-center mb-5`}
    >
      <div className='flex flex-col justify-center items-center text-center'>
        <FaWorm className='size-20 mb-3' alt='Empty state icon' />
        <h2 className='text-xl font-semibold'>Nothing here, but me</h2>
        <p className='sm:flex hidden'>
          Click on the 'add book' button to get started.
        </p>
        <p className='sm:hidden'>Click on the '+' button to get started.</p>
      </div>
    </div>
  );
};

export default EmptyState;
