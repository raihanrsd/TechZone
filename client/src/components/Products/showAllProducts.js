import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShowProducts = () =>{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/shop", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                // console.log(parseRes);
                setProducts(parseRes);
            } catch (err) {
                console.error(err.message);
            }
        };

        getProducts(); // Call the function to fetch products when the component mounts
    }, []); 

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/delete/product/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.token
                }
            });
    
            if (response.ok) {
                // Update the state after successful deletion
                setProducts(prevProducts => {
                    const newProducts = prevProducts.filter(product => product.id !== id);
                    console.log(newProducts);
                    return newProducts;
                });
                toast.success(`Product with ID ${id} was deleted successfully`);
            } else {
                toast.error(`Failed to delete product with ID ${id}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    

    return (
        <Fragment>
            <h1 className="text-center m-5">Products</h1>
            <div className="container">
                <div className="row">
                    {products.map(product => (
                        <div className="col-sm-4" key={product.id}>
                            <div className="card">
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

                                    <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default ShowProducts;