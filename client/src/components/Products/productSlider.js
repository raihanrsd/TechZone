import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "../css/product.css";
import ProductCard from "./productCard";

export default function ProductSlider(props) {
    
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        initialSlide: 0,
        
        // need further checking [responsive]
    };

    return(
        <Slider {...settings}>
        {
            props.item.map((val) => (
                <div><ProductCard key={val.id} item={val} /></div>
            ))
        }       
        </Slider>         
    )
};