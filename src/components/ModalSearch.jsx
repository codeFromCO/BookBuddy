import React from 'react';
import Button from './Button.jsx';
import CardBook from './CardBook.jsx';
import Error from './Error.jsx';
import Searching from './Searching.jsx';
import Searchbar from './Searchbar.jsx';

import { bookcoverAPI } from '../utils/constants.js';

const ModalSearch = ({
  value,
  onClick,
  onChange,
  onClear,
  books,
  bookExists,
  searching,
  search,
  close,
}) => {
  return (
    <div className='bg-white text-textOnLight h-full flex flex-col w-full sm:w-1/2 fixed top-0 right-0 p-6 shadow-thick z-40  animate-slide-down-from-top sm:animate-slide-in-from-right'>
      <div className='w-full'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-2xl mb-3'>Add book</h2>
        </div>
        <div className='flex space-x-3'>
          <Searchbar
            value={value}
            onChange={onChange}
            onClear={onClear}
            modal={true}
          />
          <Button name='Search' onClick={search} />
        </div>
      </div>
      <div className='relative h-full mt-6 flex flex-wrap gap-5 content-start overflow-scroll'>
        {books &&
          books.map((book, index) => (
            <CardBook
              title={book.title}
              author={book.author_name[0]}
              alreadyExists={book.alreadyExists}
              key={index}
              onClick={() =>
                onClick(book.title, book.author_name[0], book.cover_i)
              }
              src={
                book?.cover_i > 0 ? `${bookcoverAPI}${book?.cover_i}-L.jpg` : ''
              }
              modalSearch={true}
            />
          ))}
        {books?.length === 0 && (
          <Error alert='No luck! Try searching for something else.' />
        )}
        {bookExists && <Error alert='Book previously added' />}
        {searching && <Searching />}
      </div>
      <hr className='w-full border border-primaryOnWhite my-3' />
      <div className='flex justify-end space-x-3'>
        <Button
          className='fixed bottom-0 right-0'
          name='Close'
          tertiary={true}
          onClick={close}
        />
      </div>
    </div>
  );
};

export default ModalSearch;
