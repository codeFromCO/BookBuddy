import React from 'react';
import { FaWorm } from 'react-icons/fa6';

const EmptyState = () => {
  return (
    <div className='flex w-full h-full justify-center items-center mb-5 '>
      <div className='flex flex-col justify-center items-center'>
        <FaWorm className='size-20 mb-3' alt='Empty state icon' />
        <h2 className='text-xl font-semibold'>Nothing here, but me</h2>
        <p>Click on the + button to add your first book</p>
      </div>
    </div>
  );
};

export default EmptyState;
