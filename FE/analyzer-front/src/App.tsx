import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from '@components/Navbar';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Mypage from '@pages/Mypage';
import Learn from '@pages/Learn';
import Community from '@pages/Community';
import Market from '@pages/Market';
import Cryptocurrency from '@pages/Cryptocurrency';
import CryptocurrencyItem from '@pages/CryptocurrencyItem';
import MarketConsole from '@pages/MarketConsole';
import MypageItem from '@pages/MypageItem';
import { useUserStore } from '@stores/UserStore';

// import './style.scss'; scss 비활성화

const App = () => (
  <div id="App">
    <BrowserRouter>
      <ToastContainer theme="colored" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cryptocurrency" element={<Cryptocurrency />} />
        <Route path="/cryptocurrency/:coin" element={<CryptocurrencyItem />} />

        <Route path="/market" element={<Market />} />
        <Route path="/market/:coin" element={<MarketConsole />} />

        <Route path="/community" element={<Community />} />
        <Route path="/learn" element={<Learn />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path={`/mypage/:page`} element={<MypageItem />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
