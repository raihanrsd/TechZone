import React, { Fragment, useState, useEffect } from "react";

import "./filter-css/product-card.css";

import laptop from "../../image/laptop.png";
import phone from "../../image/Iphone.jpg";
import headphone from "../../image/headset2.jpg";

export default function Card(props) {
    // console.log(props.item);

    let categoryImage;

    // Select image based on Parent_Category
    switch (props.item.Parent_Category) {
        case "Laptop":
            categoryImage = laptop;
            break;
        case "SmartPhone":
            categoryImage = phone;
            break;
        case "Headgear":
            categoryImage = headphone;
            break;
        default:
            // Default image if category not matched
            categoryImage = laptop;
            break;
    }

    return(
        <div className="card" style={{width: '18rem', height: '32rem', padding : 10, borderRadius: 10}}> 

            {categoryImage && (
                <img className="card-img-top" src={categoryImage} alt="Card image" style={{ height: '10rem', borderRadius: '10'}} />
            )}             

            <div className="card-body">
                <h6 className="card-title" style={{height: '2.1rem',fontWeight : 700, fontSize : 18}}>{props.item.product_name}</h6>

                <ul className="specs" style={{height: '7rem'}}>
                {
                    props.item.specs.map(spec => (
                        spec.base_spec?<li className="spec">{spec.attribute_name}: {spec._value}</li>: null
                    ))
                }
                </ul>

                <hr/>
                <h5 className="text-danger text-center" style={{fontWeight : 700, fontSize : 26, margin : 0}}>${props.item.price}</h5>
                <hr/>

                <button className="btn btn-lg btn-warning w-100 fs-6" style={{height: '50px', border: '1px solid black'}}><i class="fa-solid fa-cart-shopping"></i> Purchase </button>
            </div>
        </div>
    )
}

// Parent_Category
// : 
// "SmartPhone"
// category_id
// : 
// 5
// category_name
// : 
// "iPhone"
// date_added
// : 
// "2024-02-18T18:00:00.000Z"
// discount
// : 
// 1
// discount_status
// : 
// false
// id
// : 
// 2
// images
// : 
// []
// previous_price
// : 
// 1600
// price
// : 
// 1480
// product_description
// : 
// "This is another text product description which I will use to investigate further into the issue"
// product_exerpt
// : 
// "nom nom"
// product_img
// : 
// "nice.img"
// product_name
// : 
// "iPhone 14 Pro Max"
// product_status
// : 
// "true"
// specs
// : 
// (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// visibility_status
// : 
// true
// wishlist
// : 
// false
// [[Prototype]]
// : 
// Object