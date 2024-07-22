import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const ButtonSmallAdd = (props) => {
  return (
    <div className='fixed'>
      <button
        className={`w-10 h-10 bg-black hover:bg-baseButtonFocus flex items-center justify-center rounded-md ${
          !props.savedBooksExist && 'animate-pulse hover:animate-none'
        }`}
        onClick={props.onClick}
      >
        <IoMdAdd size='1.5em' className='text-white' />
      </button>
    </div>
  );
};

export default ButtonSmallAdd;
