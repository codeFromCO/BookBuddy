import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/home';
import TestHome from './pages/homeNotes';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/testhome' element={<TestHome/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
