
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Recommend from './routes/Recommend';
import NotFound from './routes/NotFound';
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/recommend" element={<Recommend/>} />
            <Route component={<NotFound/>} />
          </Routes>  
        </BrowserRouter>
    );  
}

export default App;