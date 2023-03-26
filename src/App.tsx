import React, { useEffect } from 'react';
import Base from "./components/Base";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Orders from "./pages/Orders";
import Error from "./pages/Error";
import ProductsList from "./pages/ProductsList";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import Categories from "./pages/Categories";
import EditCategory from "./pages/EditCategory";
import CreateCategory from "./pages/CreateCategory";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FloatAlert from "./components/FloatAlert";
import { fetchAuthMe } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks/redux";
import { fetchGetStore, initializeStores } from "./store/slices/storeSlice";
import { StoreShort } from "./types/Store";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const location = pathname.split('/')[1]
  const { auth, store } = useAppSelector(store => store)
  const userStores: StoreShort[] = auth.data?.stores || []

  useEffect(() => {
    if(!auth.status) {
      // @ts-ignore
      dispatch(fetchAuthMe())
    }
  }, [])

  useEffect(() => {
    dispatch(initializeStores({data: userStores}))

    if(!auth.status) {
      if(location !== 'login' && location !== 'signup') {
        navigate('/login')
      }
    }
  }, [auth])

  useEffect(() => {
    const currentStoreId: string | undefined = store.current?.id

    if(currentStoreId) {
      // @ts-ignore
      dispatch(fetchGetStore({id: currentStoreId}))
    }
  }, [store.current])

  return (
    <div className="app">
      <Base>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />

          <Route index path='/' element={<Orders/>} />
          <Route index path='/orders' element={<Orders/>} />
          <Route path='/products-list' element={<ProductsList/>} />
          <Route path='/edit-product' element={<EditProduct/>} />
          <Route path='/create-product' element={<CreateProduct/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/edit-category' element={<EditCategory/>} />
          <Route path='/create-category' element={<CreateCategory/>} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='*' element={<Error title="404" description="Страница не найдена"/>} />
        </Routes>
      </Base>

      <FloatAlert />
    </div>
  );
}

export default App;
