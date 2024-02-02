import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import "../css/product.css";

export default function ProductCard(props) {

    var settings = {
        dots: true,
        infinite: false,
        slidesToShow: props.item.images.length,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        initialSlide: 0,
        
        // need further checking [responsive]
    };
    return(
        <div class="card" style={{width: '18rem', padding : 10, borderRadius: 10}}>

            {/* <Slider {...settings}>
            {

                props.item.images.map((image) => (
                    <img class="card-img-top " src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}` + image.image_url}  alt="Card image"/>
                ))
            }
            fix the image problem
            </Slider> */}
            
            
            <div class="card-body">
                <h6 class="card-title" style={{fontWeight : 700, fontSize : 18}}>{props.item.name}</h6>

                <ul className="specs">
                {
                    props.item.specs.map(spec => (
                        spec.base_spec?<li className="spec">{spec.attribute_name}: {spec._value}</li>: null
                    ))
                }
                </ul>

                <hr/>
                <h5 class="text-danger mt-3 text-center" style={{fontWeight : 700, fontSize : 26}}>${props.item.price}</h5>
                <hr/>

                <button className="btn btn-lg btn-warning w-100 fs-6" style={{height: '50px', border: '1px solid black'}}><i class="fa-solid fa-cart-shopping"></i> Purchase </button>
            </div>
        </div>
    )
}