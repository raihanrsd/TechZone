import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <Fragment>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-brand">TechZone</div>
                <div className="navbar-nav">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                </div>
            </div>
        </nav>
    </Fragment>
  );
}
