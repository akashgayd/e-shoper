
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Navbar from './componant/header';
import AllProduct from './pages/AllProduct';
import ProductDetail from './pages/ProductDet';
import Cart from './pages/cart';

import './App.css';

function App() {
  return (

     
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<AllProduct />} />
              
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
   
 
  );
}

export default App;