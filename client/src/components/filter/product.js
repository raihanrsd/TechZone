import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './filter-css/product.css';
import './filter-css/products.scss';
import Card from './product-card';


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

export default function Product({ isAuthenticated, props }) { // array of products
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
            <Fragment>                
                <div class="wrapper">
                        <div class="box-wrap">
                            <div class="box one"></div>
                            <div class="box two"></div>
                            <div class="box three"></div>
                            <div class="box four"></div>
                            <div class="box five"></div>
                            <div class="box six"></div>
                        </div>
                </div>                    
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div className="product-box-container">
               
                <div className="product-box">
                    {pageProduct && pageProduct[currentPage - 1] && chunkArray(pageProduct[currentPage - 1], 4).map((row, index) =>  (
                        <div key={index} className="row">
                            {row.map(item => (
                                <div key={item.id} className='col-md-3' >
                                    <Card key={item.id} item={item}  />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
               

                <div className='pageination-container'>
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