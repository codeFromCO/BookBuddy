import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdAdd } from 'react-icons/io';

const Searchbar = (props) => {
  return (
    <div
      className={`items-center flex py-1 px-3 border-2 w-full h-[48px] border-primary  text-textOnLight  bg-primary sm:rounded-3xl rounded-md`}
    >
      <HiMagnifyingGlass className='size-5' />
      <input
        className={`border-none focus:outline-none pl-3 w-full bg-primary placeholder-primaryFocus`}
        placeholder='Search existing books by title'
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

// <div
//             className={`items-center flex p-1 border-2 w-full h-[48px] border-primary  text-textOnLight  bg-primary sm:rounded-3xl rounded-md `}
//             >
//             <HiMagnifyingGlass />
//             <input
//               className='border-none focus:outline-none pl-3 w-full bg-primary placeholder-primaryFocus'
//               placeholder='Search existing books by title'
//               onChange={(e) => handleExistingBookSearch(e.target.value)}
//             />
//           </div>
