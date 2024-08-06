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
        className={`space-x-1 h-10 sm:p-3 w-10 sm:w-auto bg-buttonDark text-textOnDark hover:bg-buttonDarkFocus flex items-center justify-center rounded-md`}
        onClick={props.displayModalSearch}
        aria-label='Add book'
      >
        <IoMdAdd size='1.5em' className='text-textOnDark' />
        <h2 className='sm:flex hidden'>add book</h2>
      </button>
    </header>
  );
};

export default Header;
