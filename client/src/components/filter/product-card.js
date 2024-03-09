import React, { Fragment, useState, useEffect } from "react";

import "./filter-css/product-card.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import laptop from "../../image/laptop.png";
import phone from "../../image/Iphone.jpg";
import headphone from "../../image/headset2.jpg";
import {addToCart, getCart, getTotalItems} from '../Cart/cartUtils';

export default function Card({item, key, setCartCounter }) {
    // console.log(item);

    let categoryImage;

    // Select image based on Parent_Category
    switch (item.Parent_Category) {
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


    

    const addProductToCart = async (id) => {
        try{
            
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/products/cart/${id}`, {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        token: localStorage.token 
                    }
                });
            const parseRes = await response.json();

            const specs = parseRes;
            // console.log("comes here");
            addToCart(id, 1, specs);
            toast.success("Product added to cart successfully");
            setCartCounter(getTotalItems());
        }
        catch(err){
            toast.error(err.message);
        }
    }

    return(
        <div className="card" style={{width: '18rem', height: 'auto', padding : 10, borderRadius: 10}}> 

            {categoryImage && item.images.length > 0? (
                <img src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}` + item.images[0].image_url} style={{ height: '200px', borderRadius: '10', objectFit: 'cover'}} className="cardImg" alt="..." />
            ): (
                item.category_img ? (
                <img className="card-img-top" src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}/images/categories/` + item.category_img} alt="Card image" style={{ height: '10rem', borderRadius: '10'}} />) :
                <img src={categoryImage} style={{ height: '200px', borderRadius: '10', objectFit: 'cover'}} className="cardImg" alt="..." />
            )}             
            
            <div className="card-body">
            <Link to={`/product/${item.id}`} style={{
                textDecoration : 'none'
            }}>
                <h6 className="card-title" style={{fontWeight : 700, fontSize : 18}}>{item.product_name}</h6>
            </Link>
                <ul className="specs" style={{height: '7rem'}}>
                {
                    item.specs && 
                    item.specs.map(spec => (
                        spec.base_spec?<li className="spec">{spec.attribute_name}: {spec._value}</li>: null
                    ))
                }
                </ul>

                <hr/>
                <h5 className="text-danger text-center" style={{fontWeight : 700, fontSize : 26, margin : 0}}>${item.price}</h5>
                <hr/>

                <button className="btn btn-lg btn-warning w-100 fs-6" style={{height: '50px', border: '1px solid black'}} onClick={() => addProductToCart(item.id)}><i class="fa-solid fa-cart-shopping"></i> Purchase </button>
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