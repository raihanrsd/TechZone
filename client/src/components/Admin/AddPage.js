import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  AddProduct from './AddProduct';
import ShowProducts from '../Products/showAllProducts';
import ShowAllCategories from '../Products/showAllCategories';
import AddCategory from './AddCategories';

const AddPage = () =>{
    
    return (
        <Fragment>
            <ShowProducts />
            <AddProduct />
            <ShowAllCategories  />
            <AddCategory  />
        </Fragment>
    );
}

export default AddPage;