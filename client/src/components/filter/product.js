import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './filter-css/product.css';
import './filter-css/products.scss';

import Card from './product-card';
import LoadingPage from '../ReUse/LoadingPage';

// Function to chunk array into smaller arrays
function chunkArray(array, size) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
}

// Function to paginate products
function ChunkpageProducts(array, size){
    const pageArr = [];
    for (let i = 0; i < array.length; i += size) {
        pageArr.push(array.slice(i, i + size));
    }
    return pageArr;
}

export default function Product({ isAuthenticated, props, setCartCounter }) { // array of products
    // console.log(props);
    console.log(isAuthenticated);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);
    
    // divide products into pages with itemsPerPage items each
    const pageProduct = ChunkpageProducts(props, itemsPerPage);
    // console.log(pageProduct);

    // Function to handle pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Function to handle previous and next click
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };    
    const handleNextClick = () => {
        if (currentPage < Math.ceil(props.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    if(!isAuthenticated){
        return (
           <LoadingPage/>
        );
    }

    return (
        <Fragment>
            <div className="product-box-container">
               <div className='product-box-inner-div'>
                <div className="product-box">
                    {pageProduct && pageProduct[currentPage - 1] && chunkArray(pageProduct[currentPage - 1], 4).map((row, index) =>  (
                        
                            row.map(item => (
                                
                                <Card key={item.id} item={item} setCartCounter={setCartCounter}  />
                                
                            ))
                        
                    ))}
                </div>
                </div>
               

                <div className='pagination-container'>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a onClick={handlePreviousClick} className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        {Array.from({ length: Math.ceil(props.length / itemsPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <a onClick={() => paginate(index + 1)} className="page-link" href="#">
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(props.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <a onClick={handleNextClick} className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </div>
            </div>    
        </Fragment>
    );
}