import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

const sampleNotes =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nam quis asperiores quia, aliquid odio et? Inventore eveniet quae accusamus!';

const HomePage = () => {
  // search for book

  //openlibrary.org/search.json?q=the+lord+of+the+rings

  https: return (
    <div>
      <Header title='book buddy' />

      <div className='bg-blue-500 my-5'>
        <input
          className='p-2 w-inputSearchWidth border-2 rounded-md focus:outline-none focus:border-orange-500'
          type='text'
          placeholder='Add a new book...'
        />
        <button className='bg-yellow-500 border-2 border-yellow-800 rounded-md px-4 py-2'>
          Add
        </button>
      </div>

      <BookCard
        title='Placeholder title'
        author='Placeholder author'
        notes={sampleNotes}
      />

      {/* show book cover, option to show book cover + note in card */}
    </div>
  );
};

export default HomePage;
