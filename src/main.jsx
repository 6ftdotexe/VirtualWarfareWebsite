import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Developer from './pages/Developer';
import Docs from './pages/App';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/VirtualWarfareWebsite">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/docs/*" element={<Docs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);