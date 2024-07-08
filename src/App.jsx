import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/home';
import ErrorPage from './pages/error';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
