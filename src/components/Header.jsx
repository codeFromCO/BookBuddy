import React from 'react';
import { FaWorm } from 'react-icons/fa6';
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
      <div className='flex items-center gap-x-2 text-baseTextPrimary h-12 font-semibold'>
        <h1 className='text-4xl'>{props.title}</h1>
        <FaWorm className='size-8 ml-2 hidden sm:block' />
      </div>
      <button
        className={`w-10 h-10 bg-black hover:bg-baseButtonFocus flex items-center justify-center rounded-md ${
          !props.savedBooksExist && 'animate-pulse hover:animate-none'
        }`}
        onClick={props.displaySearchModal}
      >
        <IoMdAdd size='1.5em' className='text-white' />
      </button>
    </header>
  );
};

export default Header;
