import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/home.css";
import laptop from "../image/laptop.png";
import products from "./Products/data";

import ProductCard from "./Products/productCard";
import ProductSlider from "./Products/productSlider";

export default function Home() {
  console.log("Home");
  return (
    <Fragment>

        {/* Navigation Bar */}
      	<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div class="container">
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
                  <Link to="/products" className="nav-link">Products</Link>
                </li>
              </ul>
            </div>
          </div>
	      </nav>

        {/* image slider */}
        <div class="carousel slide" data-bs-ride="carousel" id="carouselExampleIndicators">
          <div class="carousel-indicators">
            <button aria-label="Slide 1" class="active" data-bs-slide-to="0" data-bs-target="#carouselExampleIndicators" type="button"></button> 
            <button aria-label="Slide 2" data-bs-slide-to="1" data-bs-target="#carouselExampleIndicators" type="button"></button> 
            <button aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#carouselExampleIndicators" type="button"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img alt="..." class="d-block w-100 dark-shadow" src={laptop}/>
              <div class="carousel-caption">
                <h5 className="animated bounceInRight" style={{ animationDelay: '0.5s'}}>Laptop</h5>
                <p class="animated bounceInLeft d-none d-md-block" style={{ animationDelay: '1s' }}>Tech Elegance, Unleashed Power. Your Ideal Laptop Journey Begins.</p>
                <p class="animated bounceInRight" style={{ animationDelay: '1.5s'}}><a href="#" >Discover</a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img alt="..." class="d-block w-100 dark-shadow" src={laptop} />
              <div class="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '0.5s' }}>SmartPhone</h5>
                <p class="animated bounceInLeft d-none d-md-block" style={{ animationDelay: '1s' }}>Smart Style, Brilliant Tech. Your Perfect Smartphone Awaits.</p>
                <p class="animated bounceInRight" style={{ animationDelay: '1.5s' }}><a href="#">Discover</a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img alt="..." class="d-block w-100 dark-shadow" src={laptop} />
              <div class="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '0.5s' }}>HeadGear</h5>
                <p class="animated bounceInLeft d-none d-md-block" style={{ animationDelay: '1s' }}>Elevate Your Look. Command Your Style. Headgear Redefined at Its Finest.</p>
                <p class="animated bounceInRight" style={{ animationDelay: '1.5s' }}><a href="#">Discover</a></p>
              </div>
            </div>
          </div><button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleIndicators" type="button"><span aria-hidden="true" class="carousel-control-prev-icon"></span> <span class="visually-hidden">Previous</span></button> <button class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleIndicators" type="button"><span aria-hidden="true" class="carousel-control-next-icon"></span> <span class="visually-hidden">Next</span></button>
        </div>

        {/* Product Categories */}
        <section class="container">

        <div class="text-center">
            <h1 class="display-1 font-weight-bold pt-5">Featured Products</h1>
        </div>
        
        <div class = "featured-Laptops" >
          <h5 class="display-6 font-weight-bold pt-5 pb-3"> Laptop : </h5>
          <div class="row"> <ProductSlider item = {products}/> </div>
        </div>

        <div class = "featured-Mobiles">
          <h5 class="display-6 font-weight-bold pt-5 pb-3"> Mobile : </h5>
          <div class="row"> <ProductSlider item = {products}/> </div>
        </div>

        <div class = "featured-headgears">
          <h5 class="display-6 font-weight-bold pt-5 pb-3"> HeadGear : </h5>
          <div class="row"> <ProductSlider item = {products}/> </div>
        </div>

        </section>

    </Fragment>
  );
}

