import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWorm } from 'react-icons/fa6';
import Button from './Button';
import { IoMdAdd } from "react-icons/io";

const Header = (props) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className='flex items-center justify-between mt-3'>
      <div className='flex gap-x-2 text-baseTextPrimary h-12 font-semibold'>
        <div className='flex items-center'>
          <h1 className='text-4xl'>{props.title}</h1>
          <FaWorm className='size-8 ml-2' />
        </div>
      </div>
      {/* <Button name='Add book' wide='true' onClick={props.onClick}/> */}
      <button className={`w-10 h-10 bg-black hover:bg-baseButtonFocus flex items-center justify-center rounded-md ${!props.savedBooksExist && 'animate-pulse hover:animate-none'}`} onClick={props.onClick}>
      <IoMdAdd size='1.5em' className='text-white' />
      </button>
    </header>
  );
};

export default Header;
