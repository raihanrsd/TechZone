import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowUserProducts from "./showUserProducts";

export default function TechProduct({isAuthenticated, setCartCounter}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shop`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                console.log("here");
                setProducts(parseRes);
                
            } catch (err) {
                console.error(err.message);
            }
        };

        getProducts(); // Call the function to fetch products when the component mounts
    }, []); 


    return(
        <Fragment>
            <ShowUserProducts isAuthenticated={isAuthenticated} products={products} setProducts={setProducts} setCartCounter={setCartCounter} />
        </Fragment>
    )
}
