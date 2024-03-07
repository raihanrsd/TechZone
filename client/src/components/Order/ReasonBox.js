import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ReasonBox = ({reason, reasonText, setShowReasonBox}) =>{
    return (
        <Fragment>

            <div className="cancel-form-overlay" >
                <div className="cancel-form-container">

                <h1 className='cancel-box-heading' style={{
                    color: "#f44336"
                }}>Cancellation Reason</h1>
                <div className='assigned-box-content' >
                    <div className='assigned-box-content-item'>
                        <p>Reason: <span style={{
                            color: '#f44336'
                        }}>{reason}</span> </p>
                    </div>
                    <div className='assigned-box-content-item'>
                        <p>{reasonText}</p>
                    </div>

                </div>

                <div className='btn_bar'>
                    <button type="button" className='cancel-box-button' onClick={() => setShowReasonBox(false)} >Close</button>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default ReasonBox;

