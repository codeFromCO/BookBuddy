import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.jsx';
import ErrorPage from './pages/error.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route
          path='/stats'
          element={<ErrorPage errorType='construction' active='stats'/>}
        ></Route>
        <Route
          path='/settings'
          element={<ErrorPage construction errorType='construction' active='settings' />}
        ></Route>
        <Route path='*' element={<ErrorPage errorType='404' />}></Route>
      </Routes>
    </div>
  );
};

export default App;
