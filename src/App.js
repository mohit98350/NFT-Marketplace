import './App.css';
import { useEffect,useState } from 'react';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import Landing from './components/Landing';

import {
  BrowserRouter,
  Routes,
  Route,
 
} from "react-router-dom";



function App() {

  

 
  
  
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/marketplace" element={<Marketplace />}/>
        <Route path="/sellNFT" element={<SellNFT />}/> 
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/profile" element={<Profile />}/> 
      </Routes>
    
    </div>
  );
}

export default App;
