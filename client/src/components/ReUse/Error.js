import React, { Fragment, useState, useEffect } from "react";
import oops from "../../image/oops.png";
import { Link } from "react-router-dom";


const Error = ({message}) => {
    return (
        <Fragment>
            <div className="tracker-page-overlay">
                <div className="tracker-page-container">
                    <img src={oops} alt="error" style={{
                        width: '300px',
                        height: '100px',
                        display: 'block',
                        margin: 'auto',
                    }} />
        
                    <hr></hr>
                   <h6 className="error-text">{message}</h6>
                   <Link to='/' className="error-page-btn" >Go To Home Page</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Error;