import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWorm } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';

const Header = (props) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className='flex items-center justify-between gap-x-2 text-baseTextPrimary h-12 font-semibold'>
      <div className='flex items-center'>
        <h1 className='text-4xl'>{props.title}</h1>
        <FaWorm className='size-8 ml-2' />
      </div>
      {props.homeButton && (
        <FaHome
          className='size-5 mr-3 hover:cursor-pointer hover:text-baseButtonFocus'
          onClick={handleHomeClick}
          aria-label='Home'
        />
      )}
    </header>
  );
};

export default Header;
