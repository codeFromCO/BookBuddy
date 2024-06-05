import React from 'react';
import { FaWorm } from 'react-icons/fa6';

const Header = (props) => {
  return (
    <header className='flex items-center pl-3 gap-x-2 bg-baseGreen text-baseDeepBlue drop-shadow-md'>
      <h1 className='text-4xl'>{props.title}</h1>
      <FaWorm className='size-8' />
    </header>
  );
};

export default Header;
