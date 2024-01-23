import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {addToCart, getCart} from '../Cart/cartUtils';



const ShowProducts = ({products, setProducts}) =>{

    // useEffect(() => {
    //     const getProducts = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shop`, {
    //                 method: "GET",
    //                 headers: { token: localStorage.token }
    //             });

    //             const parseRes = await response.json();
    //             console.log(parseRes);
    //             console.log("here");
    //             setProducts(parseRes);
                
    //         } catch (err) {
    //             console.error(err.message);
    //         }
    //     };

    //     getProducts(); // Call the function to fetch products when the component mounts
    // }, []); 


    const addProductToCart = (id) => {
        try{
            addToCart(id, 1);
            toast.success("Product added to cart successfully");
        }
        catch(err){
            toast.error(err.message);
        }
    }
    

    return (
        <Fragment>
            <h1 className="text-center m-5">Products</h1>
            <div className="container">
                <div className="row">

                    
                    {products && products.length > 0 ? (
                    products.map(product => (
                        <div className="col-sm-4" key={product.id}>
                            <div className="card">
                                {
                                    product.images[0]?
                                    <img src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}` + product.images[0].image_url} className="card-img-top" alt="..." />:
                                    <img src="/images/Product/test.png" className="card-img-top" alt="..." />
                                }
                                
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">Category Name: {product.category_name}</p>
                                    <p className="card-text">Price: {product.price}</p>
                                    <p className="card-text">{product.product_description}</p>

                                    {
                                        product.specs.map(spec => (
                                            <p className="card-text">{spec.attribute_name}: {spec._value}</p>
                                        ))
                                    }
                                    <div className="btn_bar">
                                        <button className="btn btn-dark" onClick={() => addProductToCart(product.id)}>Add to Cart</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : (
                        <p>No product to show</p>
                    )
                
                }
                </div>
            </div>
        </Fragment>
    );
}

export default ShowProducts;