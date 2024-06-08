import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWorm } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <header className='flex items-center justify-between px-3 gap-x-2 bg-baseGreen text-baseDeepBlue drop-shadow-md h-12'>
      <div className='flex items-center'>
        <h1 className='text-4xl'>{props.title}</h1>
        <FaWorm className='size-8' />
      </div>
      {props.homeButton && (
        <FaHome
          className='size-5 hover:cursor-pointer hover:text-basePeach'
          onClick={() => navigate('/')}
        />
      )}
    </header>
  );
};

export default Header;
