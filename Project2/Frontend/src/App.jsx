import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Hello from './pages/Hello';
import BattlePage from './pages/BattlePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hello" element={<Hello />} />
      <Route path="/battle" element={<BattlePage />} />
    </Routes>
  );
};

export default App;