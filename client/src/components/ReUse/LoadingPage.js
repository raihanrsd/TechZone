import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../filter/filter-css/products.scss';

export default function LoadingPage()
{
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