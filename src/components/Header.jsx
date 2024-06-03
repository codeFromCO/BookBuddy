import React from 'react';

import { FaBookReader } from 'react-icons/fa';

const Header = (props) => {
  return (
    <header className='flex items-center gap-x-2 bg-baseGreen text-baseDeepBlue drop-shadow-md'>
      <h1 className='text-4xl'>{props.title}</h1>
      <FaBookReader className='size-8' />
    </header>
  );
};

export default Header;
