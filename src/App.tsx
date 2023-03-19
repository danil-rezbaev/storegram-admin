import React from 'react';
import './App.css';
import Base from "./components/Base";
import { Route, Routes } from 'react-router-dom'
import Orders from "./pages/Orders";
import Error from "./pages/Error";
import ProductsList from "./pages/ProductsList";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import Categories from "./pages/Categories";
import EditCategory from "./pages/EditCategory";
import CreateCategory from "./pages/CreateCategory";

function App() {
  return (
    <div className="app">
      <Base>
        <Routes>
          <Route index path='/orders' element={<Orders/>} />
          <Route index path='/products-list' element={<ProductsList/>} />
          <Route index path='/edit-product' element={<EditProduct/>} />
          <Route index path='/create-product' element={<CreateProduct/>} />
          <Route index path='/categories' element={<Categories/>} />
          <Route index path='/edit-category' element={<EditCategory/>} />
          <Route index path='/create-category' element={<CreateCategory/>} />
          <Route path='*' element={<Error title="404" description="Страница не найдена"/>} />
        </Routes>
      </Base>
    </div>
  );
}

export default App;
