import React from 'react';
// import { Counter } from './features/counter/Counter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
