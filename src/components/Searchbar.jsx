import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdAdd } from 'react-icons/io';

const Searchbar = ({
  value,
  modal,
  isModalSearchVisible,
  isModalBookVisible,
  onChange,
  onClear,
}) => {
  return (
    <div
      className={`items-center flex py-1 px-3 border-2 w-full h-[48px]   text-textOnLight  ${
        modal
          ? 'bg-primaryOnWhite border-primaryOnWhite'
          : 'bg-primary border-primary'
      } sm:rounded-3xl rounded-md`}
    >
      <HiMagnifyingGlass className='size-5' />
      <input
        className={`border-none focus:outline-none pl-3 w-full ${
          modal ? 'bg-primaryOnWhite' : 'bg-primary'
        } placeholder-primaryFocus`}
        placeholder={
          modal ? 'Search by title' : 'Search existing books by title'
        }
        value={value}
        onChange={onChange}
        disabled={isModalSearchVisible || isModalBookVisible}
      />
      {value !== '' && (
        <button className='w-5 h-5' onClick={onClear}>
          <IoMdAdd className='size-5 rotate-45' />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
