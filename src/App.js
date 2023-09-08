import React from 'react';
// import { Counter } from './features/counter/Counter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Connect from './pages/ConnectWallet';
import Footer from './components/Footer';
import CreateNFT from './pages/CreateNFT';
import Nftpage from './pages/Nftpage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/connectwallet" element={<Connect />} />
          <Route path="/createNft" element={<CreateNFT />} />
          <Route path="/nftpage" element={<Nftpage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
