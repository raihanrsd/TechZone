import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserImg from '../../image/user.png';



const DMAnalytics = ({user_data, setShowDeliveryMan}) =>{
    return (
        <Fragment>
            <div className="cancel-form-overlay" >
                <div className="cancel-form-container">

                    <h1 className='cancel-box-heading' style={{ marginBottom: '0px'}}>Assigned Delivery Man</h1>
                    <hr style={{
                        marginBottom: '0px',
                    }}></hr>
                    {   user_data? 
                        <div className='assigned-box-content'>
                        {
                            user_data.profile_img === 'user.png'?
                            <img src={UserImg} className='profile-img' />:
                            <img src={UserImg} className='profile-img' /> 
                        }
                        <hr></hr>
                        <div className='assigned-box-content-item'>
                            <p>Username: {user_data.username}</p>
                        </div>
                        <div className='assigned-box-content-item'>
                            <p>Full Name: {user_data.full_name}</p>
                        </div>
                        <div className='assigned-box-content-item'>
                            <p>Email: {user_data.email}</p>
                        </div>
                        <div className='assigned-box-content-item'>
                            <p>Contact No: {user_data.contact_no}</p>
                        </div>
                    </div> :
                    <div className='assigned-box-content'>
                        No Delivery Man Has Been Assigned
                    </div>
                    
                    }

                <div className='btn_bar'>
                    <button type="button" className='cancel-box-button' onClick={() => setShowDeliveryMan(false)} >Close</button>
                    
                </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DMAnalytics;