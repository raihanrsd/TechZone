import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowUserProducts from '../Products/showUserProducts';

const WishList = () =>{
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        const getWishList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/wishlist`, {
                    method: "GET",
                    headers: { token: localStorage.token },
                })

                const parseRes = await response.json();
                console.log("This is parse res")
                console.log(parseRes);

                console.log("This is parse wishlist")
                console.log(parseRes.wishlist);

                setWishList(parseRes.wishlist);

            } catch (error) {
                console.error(error.message);
            }
        };

        getWishList();
    }, []);

    return (
        <Fragment>
            <ShowUserProducts products={wishList} setProducts={setWishList} />

        </Fragment>
    )
}

export default WishList;

