import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CancelOrderBox = ({order_id, setCancelOrder}) =>{
    const reasons = [
        'Changed Mind',
        'Found Better Deal',
        'Financial Issues',
        'Shipping Delays',
        'Product Unavailability',
        'Unsatisfactory Product Information',
        'Unresponsive Seller',
        'Unresponsive Delivery Man',
        'Unresponsive Customer Service',
        'Bad Behavior of Delivery Man',
        'Order Mistake',
        'Change in Circumstances',
        'Technical Issues',
        'Quality Concerns',
        'Personal Reasons',
        'Others'
    ]

    const [reasonText, setReasonText] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e, order_id) => {
        try{
            e.preventDefault();
            if(reason === ''){
                toast.error("Please select a reason");
                return;
            }
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/get_order/cancel_order/${order_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify({reason: reason , reasonText: reasonText})
            });

            const parseRes = await response.json();
            if(parseRes.isAuthorized){
                toast.success(parseRes.message);
                window.location = "/DMorders";
            }
            else{
                console.log(parseRes.message);
            }
            setCancelOrder(false);
        }
        catch(err){
            console.error(err.message);
        }
    }

    return (
        <Fragment>

            <div className="cancel-form-overlay" >
                <div className="cancel-form-container">

            <h1 className='cancel-box-heading'>Please State Your Reason</h1>

            <form className='cancel-form' onSubmit={(e) => handleSubmit(e, order_id)}>
                <div>
                    <select onChange={(e) => {
                        setReason(e.target.value)
                        }}
                        className='cancel-select'>
                        <option value="">Select a Reason</option>
                        {reasons.map((reason, index) => (
                            <option key={index} value={reason}>{reason}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <textarea 
                        placeholder="Write your reason here"
                        value={reasonText}
                        className='cancel-textarea'
                        onChange={(e) => setReasonText(e.target.value)}
                    />
                </div>
                <div className='btn_bar'>
                    <button type="submit" className='cancel-box-button cancel' >Cancel Order</button>
                    <button type="button" className='cancel-box-button' onClick={() => setCancelOrder(false)}>Close</button>
                </div>
            </form>
            </div>
            </div>
        </Fragment>
    )
}

export default CancelOrderBox;

