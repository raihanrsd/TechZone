import React, {Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import ShowUserProducts from './showUserProducts';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [excludeTerm, setExcludeTerm] = useState('');
    const [allSpecs, setAllSpecs] = useState([]);

    
    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                // console.log(parseRes);
                setCategories(parseRes);
                console.log(categories);
            } catch (error) {
                console.log('Error fetching categories');
                console.error(error.message);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() =>{
        const getSpecs = async () => {
            try{
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/attributes`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                console.log(response);
                
                const parseRes = await response.json();
                setAllSpecs(parseRes);
                
            }
            catch (err){
                console.log(err.message)
                console.log('Error fetching specs');
            }
        }

        getSpecs();
    }, []);

    

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP request to search endpoint with searchTerm and selectedCategory
            
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/search?searchTerm=${searchTerm}&category_id=${selectedCategory}`, {
                    method: "GET",
                    headers: { token: localStorage.token },
                });
            const parseRes = await response.json();
            // Process the response as needed
            console.log(parseRes.products)
            setAllProducts(parseRes.products);
            console.log(allProducts);
            setAllSpecs(parseRes.allCommonSpec)
            
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
        
        <div className='container'>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
                <button type="submit" className='btn btn-success'>Search</button>
            </form>
        </div>
        <ShowUserProducts
        products={allProducts}
        setProducts={setAllProducts}
         />
        <div className='container'>
         {
            allSpecs.map((spec) => (
                <p key={spec.attribute_name}>{spec.attribute_name}</p>
            ))
         }
         </div>
        </Fragment>
    );
};

export default Search;
