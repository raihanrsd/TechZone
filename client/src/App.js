import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, getCart, getTotalItems } from './components/Cart/cartUtils';


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';


import Home from './components/ReUse/Home';

import Navbar from './components/ReUse/Navbar';
import AddPage from './components/Admin/AddPage';
import TechProduct from './components/Products/TechProduct';
import Dashboard from './components/Products/Dashboard';


import Search from './components/Products/Search';
import Wishlist from './components/Wishlist/wishlist';
import Cart from './components/Cart/Cart';
import Checkout from './components/Order/Checkout';
import Product from './components/Products/product';
import UserPage from './components/Users/user_page';
import OrderPage from './components/Order/order';

import ErrorPage from './components/ReUse/Error';
import TrackerPage from './components/Order/Tracker';
import LoadingIndicator from './components/ReUse/LoadingIndicator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCounter, setCartCounter] = useState(getTotalItems());
  const [reRender, setReRender] = useState(false);
  const cart = getCart();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  // setReRender(!reRender);

  async function isAuth(){
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/is-verify`, {
        method: "GET",
        headers: {token: localStorage.token}
      });
      
      const parseRes = await response.json();
      // console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
      // console.log("Error in isAuth")
    }
  }

  useEffect(() => {
    console.log('it is happenning');
    isAuth();
  }, []);
  // Wait until authentication check is complete before rendering
  if (isAuthenticated === undefined) {
    return <LoadingIndicator />; // or loading indicator
  }

  return (

    <Fragment>

      <ToastContainer />
      
      <Router>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} cartCounter={cartCounter} reRender={reRender} />
        <Routes>
          <Route exact path="/login" element={!isAuthenticated?  <Login setAuth={setAuth} /> : <Navigate to ="/" />} />
          <Route exact path="/register" element={!isAuthenticated?  <Register setAuth={setAuth} /> : <Navigate to ="/" />} />
          <Route exact path="/order/:order_id" element={isAuthenticated?  <OrderPage isAuthenticated={isAuthenticated} /> : <Navigate to ="/login" />} />
          <Route exact path="/dashboard" element={isAuthenticated?  <Dashboard setAuth={setAuth} /> : <Navigate to ="/login" />} />
          <Route exact path="/checkout" element={isAuthenticated?  <Checkout setAuth={setAuth} setReRender={setReRender} reRender={reRender} /> : <Navigate to ="/login" />} />
          {/* <Route exact path="/" element={<Navigate to="/login"/>} /> */}
          <Route exact path="/admin" element={<AddPage />}/>
          <Route exact path="/error" element={<ErrorPage />}/>
          <Route exact path="/techProducts" element={<TechProduct isAuthenticated={isAuthenticated} setCartCounter={setCartCounter} />}/>       
          <Route exact path="/product/:id" element={<Product isAuthenticated={isAuthenticated} />}/>
          
          <Route exact path="/tracker/:tracker_id" element={isAuthenticated?  <TrackerPage isAuthenticated={isAuthenticated} /> : <Navigate to ="/login" />} />
          <Route exact path="/" element={<Home isAuthenticated={isAuthenticated} setAuth={setAuth} />}/>
          <Route exact path="/search" element={<Search isAuthenticated={isAuthenticated} />}/>
          <Route exact path="/wishlist" element={<Wishlist isAuthenticated={isAuthenticated} setCartCounter={setCartCounter} />}/>
          <Route exact path="/cart" element={<Cart isAuthenticated={isAuthenticated} setCartCounter={setCartCounter} setReRender={setReRender} />}/>
          <Route exact path="/user" element={isAuthenticated?  <UserPage isAuthenticated={isAuthenticated}  /> : <Navigate to ="/login" />} />
          <Route path="/*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
