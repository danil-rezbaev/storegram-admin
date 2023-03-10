import React from 'react';
import './App.css';
import Base from "./components/Base";
import { Route, Routes } from 'react-router-dom'
import Orders from "./pages/Orders";
import Error from "./pages/Error";

function App() {
  return (
    <div className="app">
      <Base>
        <Routes>
          <Route index path='/orders' element={<Orders/>} />
          <Route path='*' element={<Error title="404" description="Страница не найдена"/>} />
        </Routes>
      </Base>
    </div>
  );
}

export default App;
