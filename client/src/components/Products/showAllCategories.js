import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShowAllCategories = () =>{
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/categories", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                // console.log(parseRes);
                setCategories(parseRes);
            } catch (err) {
                console.error(err.message);
            }
        };

        getCategories(); // Call the function to fetch products when the component mounts
    }, []);

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/delete/category/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.token
                }
            });
    
            if (response.ok) {
                // Update the state after successful deletion
                setCategories(prevCategories => {
                    const newCategories = prevCategories.filter(category => category.category_id !== id);
                    console.log(newCategories);
                    return newCategories;
                });
                toast.success(`Category with ID ${id} was deleted successfully`);
            } else {
                toast.error(`Failed to delete category with ID ${id}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center m-5">Categories</h1>
            <div className="container">
                <div className="row">
                    {categories.map(category => (
                        <div className="col-sm-4" key={category.category_id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{category.category_name}</h5>
                                    <p className="card-text">{category.category_description}</p>
                                    <button className="btn btn-danger" onClick={() => deleteCategory(category.category_id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )


}

export default ShowAllCategories;