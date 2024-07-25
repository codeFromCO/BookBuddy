import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';

const Header = (props) => {
  return (
    <header className='flex justify-between items-center mt-3'>
      <button
        className='w-10 h-10 sm:hidden'
        onClick={props.displayModalHamburger}
      >
        <RxHamburgerMenu className='size-8' />
      </button>
      <h1 className='text-4xl text-textOnLight h-12 font-semibold'>
        {props.title}
      </h1>

      <button
        className={`w-10 h-10 bg-buttonDark hover:bg-buttonDarkFocus flex items-center justify-center rounded-md ${
          !props.savedBooksExist && 'animate-pulse hover:animate-none'
        } ${
          !props.savedBooksExist && props.existingBookSearchInputExists
            ? 'bg-textOnError'
            : ''
        } `}
        onClick={props.displayModalSearch}
      >
        <IoMdAdd size='1.5em' className='text-textOnDark' />
      </button>
    </header>
  );
};

export default Header;
