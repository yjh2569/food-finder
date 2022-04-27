
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Recommend from './routes/Recommend';
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/recommend" element={<Recommend/>} />
          </Routes>  
        </BrowserRouter>
    );  
}

export default App;