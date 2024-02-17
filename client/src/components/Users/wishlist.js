import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ShowProducts from "../Products/showUserProducts";

const Wishlist = ({ isAuthenticated }) =>{
    const [wishlist, setWishlist] = useState([]);
    console.log('isAuthenticated', isAuthenticated);
    useEffect(() => {
        try{
            const getWishlist = async () => {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/wishlist`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                setWishlist(parseRes.wishlist);
            };
            getWishlist();

        }catch(err){
            console.error(err.message);
        }
    }, []);
    return (
        <Fragment>
            <h1>WISHLIST</h1>
            <ShowProducts isAuthenticated={isAuthenticated} products={wishlist} setProducts={setWishlist}  />
        </Fragment>
    );
}

export default Wishlist;