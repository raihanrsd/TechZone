import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addToCart, getCart, removeFromCart} from './cartUtils';


const Cart = () =>{
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        const getAllProducts = async (product_id_list) => {
            try {
                console.log("This is product id list")
                console.log(product_id_list);
                const body = {
                    product_id_list: product_id_list
                }
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/products/cart`, {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        token: localStorage.token 
                    },
                    body: JSON.stringify(body)
                })

                const parseRes = await response.json();
                const products = parseRes.products;
                setCart(products);

                let total = 0;
                products.forEach(product => {
                    total += product.price;
                });
                setTotalPrice(total);

            } catch (error) {
                console.error(error.message);
            }
        }
        console.log("This is cart")
        console.log(getCart());
        console.log(Object.keys(getCart()));
        getAllProducts(Object.keys(getCart()));
    }, []);

    const onChange = (e, product_id) => {
        cart[product_id] = e.target.value;
    }

    const removeProduct = (product_id) => {
        removeFromCart(product_id);
        console.log(cart);
        cart.filter(product => product.id !== product_id);
        setCart(cart);
        // console.log(cart);
    }
    

    return (
        <Fragment>
            <h1>Cart</h1>
            <div className="container">
                <div className="row">
                <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                    {cart && cart.length > 0 ? (
                        
                    cart.map(product => (
                        <tr key={product.id}>
                            <td>
                                
                                <div className='cart-img-div'>
                                    {
                                    product.images[0]?
                                    <img src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}` + product.images[0].image_url} className="card-img-top" alt="..." />:
                                    <img src="/images/Product/test.png" className="card-img-top" alt="..." />
                                    }
                                </div>
                                
                            </td>
                            <td>
                               {product.product_name}
                            </td>
                            <td>
                                <input type="number" name="quantity" min="1" max="100" value={cart[product]} onChange={(e) => onChange(e)} />
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={()=>removeProduct(product.id)}>Remove</button>
                            </td>
                        </tr>                       
                    ))
                    ) : (
                        <h2>No Products</h2>
                    )}
                    </tbody>
                    </table>
                </div>
            </div>

            <div className='container'>
                <div className='row'>
                    <h2>Total Price: {totalPrice}</h2>
                </div>
            </div>
        </Fragment>
    )
}


export default Cart;