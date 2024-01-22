import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';



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
        <div className="container">
        <Routes>
          <Route exact path="/login" element={!isAuthenticated?  <Login setAuth={setAuth} /> : <Navigate to ="/dashboard" />} />
          <Route exact path="/register" element={!isAuthenticated?  <Register setAuth={setAuth} /> : <Navigate to ="/dashboard" />} />
          <Route exact path="/dashboard" element={isAuthenticated?  <Dashboard setAuth={setAuth} /> : <Navigate to ="/login" />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" Redirect to="/login" />
        </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
