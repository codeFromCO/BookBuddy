import React from 'react';

import { FaBookReader } from "react-icons/fa";

const Header = (props) => {
  return (
    <header className='flex items-center gap-x-2 bg-yellow-500'>
      <h1 className='text-4xl'>{props.title}</h1>
      <FaBookReader className='size-8 text-red-400' />
    </header>
  );
};

export default Header;
