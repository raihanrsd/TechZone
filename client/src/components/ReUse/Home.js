import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ".././css/home.css";

import laptop from "../../image/laptop.png";
import phone from "../../image/Iphone.jpg";
import headphone from "../../image/headset5.jpg";


import ProductSlider from "../Products/productSlider";
import PageFooter from "./PageFooter";
import FilterPage from "../filter/filterPage";

export default function Home({isAuthenticated}) {
  const [products, setProducts] = useState([]);
  const number = 5;
  useEffect(() =>{
    const getFeaturedProduct = async() =>{
        try{
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/featured_product/price/${number}`,{
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

const handleClick = (category) => {
  console.log(category);
}

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
                <h5 className="animated bounceInRight" style={{ animationDelay: '0.4s'}}>Laptop</h5>
                <p class="animated bounceInLeft d-none d-md-block" style={{ animationDelay: '0.8s' }}>Tech Elegance, Unleashed Power. Your Ideal Laptop Journey Begins.</p>
                <p class="animated bounceInRight" style={{ animationDelay: '1.2s'}}><a href="/filter" onClick={() => handleClick('Laptop')}>Explore</a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img alt="..." class="d-block w-100 dark-shadow" src={phone} />
              <div class="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '0.4s' }}>SmartPhone</h5>
                <p class="animated bounceInLeft d-none d-md-block" style={{ animationDelay: '0.8s' }}>Smart Style, Brilliant Tech. Your Perfect Smartphone Awaits.</p>
                <p class="animated bounceInRight" style={{ animationDelay: '1.2s' }}><a href="/filter" onClick={() => handleClick('SmartPhone')}>Explore</a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img alt="..." class="d-block w-100 dark-shadow" src={headphone} />
              <div class="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '0.4s' }}>HeadGear</h5>
                <p class="animated bounceInLeft d-none d-md-block" style={{ animationDelay: '0.8s' }}>Elevate Your Look. Command Your Style. Headgear Redefined at Its Finest.</p>
                <p class="animated bounceInRight" style={{ animationDelay: '1.2s' }}><a href="/filter" onClick={() => handleClick('Headgear')}>Explore</a></p>
              </div>
            </div>
          </div><button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleIndicators" type="button"><span aria-hidden="true" class="carousel-control-prev-icon"></span> <span class="visually-hidden">Previous</span></button> <button class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleIndicators" type="button"><span aria-hidden="true" class="carousel-control-next-icon"></span> <span class="visually-hidden">Next</span></button>
        </div>



        {/* Product Categories */}
        <section class="container">

        <div class="text-center custom-shadow bg-white " style={{width: 'auto', height: '100px',backgroundColor: 'white', marginTop:'10px', borderRadius: 20}}>
            <h1 class="display-1 font-weight-bold">Featured Products</h1>
        </div>
        
        <div class = "featured-Laptops" >
          <h5 class="display-6 font-weight-bold pt-3 text-center" style={{width: 'auto', height: '80px',backgroundColor: 'white', marginTop:'10px', borderRadius: 20}} > LAPTOP </h5>
          <div class="row"> <ProductSlider item = {products}/> </div>
        </div>

        <div class = "featured-Mobiles">
          <h5 class="display-6 font-weight-bold pt-3 text-center" style={{width: 'auto', height: '80px',backgroundColor: 'white', marginTop:'10px', borderRadius: 20}}> SMARTPHONE </h5>
          <div class="row"> <ProductSlider item = {products}/> </div>
        </div>

        <div class = "featured-headgears">
          <h5 class="display-6 font-weight-bold pt-3 text-center" style={{width: 'auto', height: '80px',backgroundColor: 'white', marginTop:'10px', borderRadius: 20}}> HEADGEAR </h5>
          <div class="row"> <ProductSlider item = {products}/> </div>
        </div>
        </section>

        <h5 class="display-6 font-weight-bold pt-3 text-center container" style={{width: 'auto', height: '80px',backgroundColor: 'white', marginTop:'10px', borderRadius: 20}} > FAQ </h5>
        <div class="accordion accordion-flush container" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Accordion Item #1
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Accordion Item #2
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Accordion Item #3
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
            </div>
          </div>
        </div>


        {/* Footer --> subject to change */}
        <PageFooter />
        
    </Fragment>
  );
}