// TO-DO change conditions in which error msg appears

import React from 'react';
import Button from './Button';
import CardBook from './CardBook';
import Error from './Error';
import Searching from './Searching';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { bookcoverAPI } from '../utils/constants';

const ModalSearch = (props) => {
  return (
    <div className='bg-white text-baseTextPrimary h-full flex flex-col w-full sm:w-1/2 fixed top-0 right-0 p-6 shadow-thick'>
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
              placeholder='Search for a book to add by title'
              value={props.value}
              onChange={props.onChange}
            />
          </div>
          <Button name='Search' onClick={props.search} />
        </div>
      </div>
      <div className='h-full mt-3 flex flex-wrap content-start overflow-scroll'>
        {props.books &&
          props.books.map((book, index) => (
            <CardBook
              title={book.title}
              author={book.author_name[0]}
              key={index}
              onClick={() =>
                props.onClick(book.title, book.author_name[0], book.cover_i)
              }
              src={
                book?.cover_i > 0 ? `${bookcoverAPI}${book?.cover_i}-L.jpg` : ''
              }
              modalSearch={true}
            />
          ))}
        {props.books?.length === 0 && (
          <Error alert='No luck! Try searching for something else.' />
        )}
        {props.bookExists && <Error alert='Book previously added' />}
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
