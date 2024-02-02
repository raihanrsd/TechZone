import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div class="container">
            <i class="fa-brands fa-slack fa-2x" style={{color: "white", padding: "10px"}}></i>
            <div class="navbar-brand">TechZone</div>
            <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li class="nav-item">
                  <Link to="/register" className="nav-link">Sign Up</Link>
                </li>
                <li class="nav-item">
                  <Link to="/techProducts" className="nav-link">Products</Link>
                </li>
              </ul>
            </div>
          </div>
	      </nav>
        </div>
    )
}


export default Navbar;