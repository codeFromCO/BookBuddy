import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ModalJumpToTop = (props) => {
  return (
    <button
      className='fixed bottom-5 right-6 h-10 w-10 bg-primary hover:bg-primaryFocus rounded-md bg-opacity-50 z-20'
      onClick={props.onClick}
    >
      <div className='flex items-center justify-center'>
        <FaArrowUp size='1.5em' />
      </div>
    </button>
  );
};

export default ModalJumpToTop;
