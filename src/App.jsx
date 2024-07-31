import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.jsx';
import ErrorPage from './pages/error.jsx';

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
