import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdAdd } from 'react-icons/io';

const Searchbar = (props) => {
  return (
    <div
      className={`items-center flex py-1 px-3 border-2 w-full h-[48px]   text-textOnLight  ${
        props.modal
          ? 'bg-primaryOnWhite border-primaryOnWhite'
          : 'bg-primary border-primary'
      } sm:rounded-3xl rounded-md`}
    >
      <HiMagnifyingGlass className='size-5' />
      <input
        className={`border-none focus:outline-none pl-3 w-full ${
          props.modal ? 'bg-primaryOnWhite' : 'bg-primary'
        } placeholder-primaryFocus`}
        placeholder={
          props.modal ? 'Search by title' : 'Search existing books by title'
        }
        value={props.value}
        onChange={props.onChange}
        disabled={props.isModalSearchVisible}
      />
      {props.value !== '' && (
        <button className='w-5 h-5' onClick={props.onClear}>
          <IoMdAdd className='size-5 rotate-45' />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
