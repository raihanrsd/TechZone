import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './filter-css/searchBar.css'; 
import { CiSearch } from "react-icons/ci";

export default function SearchBar({num, setProducts, searchInput, setSearchInput,  sortBy, setSortBy, sortOrder, setSortOrder}) {

    const [searchResults, setSearchResults] = useState('');
   
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
        console.log(inputValue);
    };
    const handleSearchResult = (event) => {
        event.preventDefault();
        setSearchResults(searchInput);
        setSearchInput('');
    };
    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    return(
        <Fragment>
             <div className="search-box">
                <div className="search-container">
                    <input type="text" className="search-input" value = {searchInput} onChange={handleInputChange} placeholder="Search" />
                    <CiSearch className='search-icon' onClick={handleSearchResult}/>
                </div>
                <div className="search-sort">
                    <p>Sort By:</p>
                    <select className="sort-select" value={sortBy} onChange={handleSortByChange}>
                        <option value="default">Default</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                <div className="search-sort">
                    <p>Sort Order:</p>
                    <select className="sort-select" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>
                <div className="search-info">
                    <div className="search-topic">
                        <p> {searchResults} | </p>
                    </div>
                    <div className="search-results">
                        <p>Showing {num} Products</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
