import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


import EditProductForm from './EditProductForm';
import UploadForm from './UploadForm';


const ShowProducts = () =>{
    const [products, setProducts] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [uploadImages, setUploadImages] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shop`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                // console.log(parseRes);
                setProducts(parseRes);
                console.log(products);
            } catch (err) {
                console.error(err.message);
            }
        };

        getProducts(); // Call the function to fetch products when the component mounts
    }, []); 

    const onUpload = async (id, urls) => {
        try {
            const body = {product_id : id, image_urls: urls};
            console.log(body);
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/upload/product/images`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            

            const parseRes = await response.json();
            console.log(parseRes.message);
            console.log(parseRes);
            if(parseRes.addStatus){
                toast.success("Images Uploaded Successfully");
                setUploadImages(false);
            }
            else{
                toast.error(parseRes.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/delete/product/${id}`, {
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


    const editProduct = (id) => {
        // Find the product to edit based on the id
        const productToEdit = products.find((product) => product.id === id);
        setEditedProduct(productToEdit);
        setShowEditForm(true);
    };

    const closeEditForm = () => {
        setEditedProduct(null);
        setShowEditForm(false);
    };


    const submitEditedProduct = async (editedData) => {
        // Make the API call or update the state with the edited data
        try{
            const body = editedData;
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/update/product/${editedData.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            console.log(parseRes);
            console.log(parseRes.message);
            if(parseRes.updateStatus){
                toast.success("Product Updated Successfully");
                setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === editedData.id ? { ...product, ...editedData } : product
                )
            );
            closeEditForm(); 
            }
            else{
                toast.error(parseRes.message);
            }
        }catch(err){
            console.error(err.message);
        }
        // ... rest of the logic
    };
    

    return (
        <Fragment>
            <h1 className="text-center m-5">Products</h1>
            <div className="container">
                <div className="row">
                    {products.map(product => (
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
                                        <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                                        <button className="btn btn-primary" onClick={() => editProduct(product.id)}>Update</button>
                                        <button className="btn btn-light" onClick={()=>setUploadImages(!uploadImages)}>Upload Images</button>
                                        {
                                            uploadImages && <UploadForm id={product.id} onUpload={onUpload} key={product.id} type='products'/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showEditForm && (
        <EditProductForm
          product={editedProduct}
          onClose={closeEditForm}
          onSubmit={submitEditedProduct}
        />
      )}
        </Fragment>
    );
}

export default ShowProducts;