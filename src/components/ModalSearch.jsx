// TO-DO
// fix position of cancel button
// handle books without a cover

import React from 'react';
import Button from './Button';
import BookCard from './BookCard';
import Error from './Error';
import Searching from './Searching';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const bookcoverAPI = 'https://covers.openlibrary.org/b/id/';

const ModalSearch = (props) => {
  return (
    <div className='bg-white text-baseTextPrimary h-full flex flex-col w-full sm:w-1/2 fixed top-0 right-0 p-6'>
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
              placeholder='Search for a book to add'
              value={props.value}
              onChange={props.onChange}
            />
          </div>
          <Button name='Search' onClick={props.search} />
        </div>
      </div>
      <div className='h-full flex flex-wrap content-start overflow-scroll'>
        {props.books &&
          props.books.map((book) => (
            <BookCard
              onClick={() =>
                props.onClick(book.title, book.author_name[0], book.cover_i)
              }
              src={`${bookcoverAPI}${book.cover_i}-L.jpg`}
              modalSearch={true}
            />
          ))}
        {props.books?.length === 0 && (
          <Error alert='No luck! Try searching for something else.' />
        )}
        {props.bookExists && <Error alert='Book previously added.' />}
        {props.searching && <Searching />}
      </div>
      <hr className='w-full border border-baseCardBackground my-3' />
      <div className='flex justify-end space-x-3'>
        <Button
          className='fixed bottom-0 right-0'
          name='Cancel'
          tertiary='true'
          onClick={props.cancel}
        />
      </div>
    </div>
  );
};

export default ModalSearch;
