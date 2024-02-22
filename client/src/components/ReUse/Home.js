import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ".././css/home.css";
import laptop from "../../image/laptop.png";


import Navbar from "./Navbar";

import ProductSlider from "../Products/productSlider";

export default function Home({isAuthenticated, setAuth}) {
  const [products, setProducts] = useState([]);
  useEffect(() =>{
    const getFeaturedProduct = async() =>{
        try{
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/featured_product/price/5`,{
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            console.log(parseRes.products);
            setProducts(parseRes.products);
        }
        catch(err){
            console.log(err.message)
        }
    }

    getFeaturedProduct();
}, [])


  return (
    <Fragment>

        {/* Navigation Bar */}


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



        {/* Footer --> subject to change */}
        <footer className="bg-dark text-light p-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>About Us</h5>
                <p>Learn more about our company and mission.</p>
              </div>
              <div className="col-md-4 offset-md-4 text-md-end">
                <h5>Contact Us</h5>
                <p>Email: info@example.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row">
              <div className="col text-center">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 text-md-start">
                <p>Name: Abhishek Roy</p>
                <p>ID: 2105033</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p>Name: Raihan Rashid</p>
                <p>ID: 2105046</p>
              </div>
            </div>
          </div>
        </footer> 
    </Fragment>
  );
}

