import React from 'react';
import Button from './Button';
import BookCard from './BookCard';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const ModalSearch = (props) => {
  return (
    <div className='bg-white text-baseTextPrimary p-3 h-full flex flex-col w-full sm:w-1/2 fixed top-0 right-0'>
      <div className='w-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-2xl mb-3'>Add book</h2>
        </div>
        <div className='flex space-x-3'>
          <div
            className={`items-center flex p-1 w-full border-2 border-baseButtonFocus2  text-black bg-baseButtonFocus2 rounded-3xl`}
          >
            <HiMagnifyingGlass />
            <input
              className='border-none focus:outline-none pl-3 w-full bg-baseButtonFocus2 placeholder-baseBackgroundSecondary'
              value={props.value}
              type='text'
              placeholder='Search for a book to add'
              onChange={props.onChange}
            />
          </div>
          <Button name='Search' onClick={props.Search}/>
        </div>
      </div>
      <div className='h-full flex flex-wrap'>
        {props.books &&
          props.books.map((book) => (
            <BookCard onClick={() => props.onClick(book)} src={book.src} />
          ))}
      </div>
      <div className='flex justify-end space-x-3 mt-3'>
        <Button name='Cancel' tertiary='true' onClick={props.cancel} />
      </div>
    </div>
  );
};

export default ModalSearch;
