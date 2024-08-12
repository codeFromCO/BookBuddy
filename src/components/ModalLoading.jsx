import React from 'react';
import { FaWorm } from 'react-icons/fa6';

const ModalLoading = () => {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-background z-30'>
      <FaWorm className='size-10 m-3 animate-bounce' />
      <h2 className='text-xl font-bold'>Loading...</h2>
      <p>This may take a few seconds.</p>
    </div>
  );
};

export default ModalLoading;
