import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const ButtonSmallAdd = (props) => {
  return (
    <div className='fixed'>
      <button
        className={`w-10 h-10 bg-buttonDark hover:bg-buttonDarkFocus flex items-center justify-center rounded-md ${
          !props.savedBooksExist && 'animate-pulse hover:animate-none'
        }`}
        onClick={props.onClick}
      >
        <IoMdAdd size='1.5em' className='text-textOnDark' />
      </button>
    </div>
  );
};

export default ButtonSmallAdd;
