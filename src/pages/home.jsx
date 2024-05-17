import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

const sampleNotes = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nam quis asperiores quia, aliquid odio et? Inventore eveniet quae accusamus!'

const HomePage = () => {

  // search for book 

  https://openlibrary.org/search.json?q=the+lord+of+the+rings



  return (
    <div>
      <Header title='book buddy' />
      <BookCard title='Placeholder title' author='Placeholder author' notes={sampleNotes}/>

      {/* show book cover, option to show book cover + note in card */}


    </div>
  );
};

export default HomePage;
