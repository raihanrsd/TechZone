import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminPromos = () =>{
    const [promos, setPromos] = useState([]);
    const [promoForm, setPromoForm] = useState({
        promoName: '',
        promoDiscount: '',
        promoStatus: '',
        promoStartDate: '',
        promoEndDate: ''
    });

    useEffect(() =>{
        const getPromoList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/promo/get_promos`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                
                const parseRes = await response.json();

                if(parseRes.authorized){
                    setPromos(parseRes.promos);
                }
                else{
                    toast.error(parseRes.message);
                }
                
            } catch (err) {
                console.error(err.message);
            }
        };

        getPromoList(); // Call the function to fetch products when the component mounts
    }, [])

    return (
        <Fragment>
            <div className='admin-promos-div'>
            <div className='add-promo-div'>
            <form onSubmit={handleSubmit}>
            <label htmlFor='promoName'>Promo Name:</label>
            <input type='text' id='promoName' name='promoName' value={promoForm.promoName} onChange={handleChange} required />

            <label htmlFor='promoDiscount'>Promo Discount:</label>
            <input type='number' id='promoDiscount' name='promoDiscount' value={promoForm.promoDiscount} max='100' onChange={handleChange} required />

            <label htmlFor='promoStatus'>Promo Status:</label>
            <input type='text' id='promoStatus' name='promoStatus' value={promoForm.promoStatus} onChange={handleChange} required />

            <label htmlFor='promoStartDate'>Promo Start Date:</label>
            <input type='date' id='promoStartDate' name='promoStartDate' value={promoForm.promoStartDate} onChange={handleChange} required />

            <label htmlFor='promoEndDate'>Promo End Date:</label>
            <input type='date' id='promoEndDate' name='promoEndDate' value={promoForm.promoEndDate} onChange={handleChange} required />

            <button type='submit'>Add Promo</button>
          </form>
            </div>

            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Promo Name</th>
                        <th>Promo Discount</th>
                        <th>Promo Status</th>
                        <th>Promo Start Date</th>
                        <th>Promo End Date</th>
                    </tr>


                </thead>
            </table>

            </div>
        </Fragment>
    )
}

export default AdminPromos;