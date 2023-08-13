import React from 'react';
// import { Counter } from './features/counter/Counter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Connect from './pages/ConnectWallet';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/connectwallet" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
