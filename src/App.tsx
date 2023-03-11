import React from 'react';
import './App.css';
import Base from "./components/Base";
import { Route, Routes } from 'react-router-dom'
import Orders from "./pages/Orders";
import Error from "./pages/Error";
import ProductsList from "./pages/ProductsList";
import Product from "./pages/Product";

function App() {
  return (
    <div className="app">
      <Base>
        <Routes>
          <Route index path='/orders' element={<Orders/>} />
          <Route index path='/products-list' element={<ProductsList/>} />
          <Route index path='/product' element={<Product/>} />
          <Route path='*' element={<Error title="404" description="Страница не найдена"/>} />
        </Routes>
      </Base>
    </div>
  );
}

export default App;
