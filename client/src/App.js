import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

import Navbar from './components/Navbar';
import AddPage from './components/Admin/AddPage';
import TechProduct from './components/TechProduct';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
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
    isAuth();
  }, []);

  return (

    <Fragment>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/login" element={!isAuthenticated?  <Login setAuth={setAuth} /> : <Navigate to ="/dashboard" />} />
          <Route exact path="/register" element={!isAuthenticated?  <Register setAuth={setAuth} /> : <Navigate to ="/dashboard" />} />
          <Route exact path="/dashboard" element={isAuthenticated?  <Dashboard setAuth={setAuth} /> : <Navigate to ="/login" />} />
          {/* <Route exact path="/" element={<Navigate to="/login"/>} /> */}
          <Route exact path="/admin" element={<AddPage />}/>

          <Route exact path="/techProducts" element={<TechProduct />}/>        

          <Route exact path="/" element={<Home />}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
