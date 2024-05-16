import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/home';

const App = () => {

    return (
        <div>
            <HomePage/>
        </div>
    )

}

export default App;