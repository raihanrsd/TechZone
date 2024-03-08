import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPopup from './UserPopup';


const AllAdmins = () =>{
    const [deliveryMen, setDeliveryMen] = useState([]);
    
    
    const [current_admin, setCurrentAdmin] = useState({});
    const [selectedMan, setSelectedMan] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() =>{
        const getAdminList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/all/delivery_man`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                if(parseRes.authorized){
                    setDeliveryMen(parseRes.delivery_man);
                    setCurrentAdmin(parseRes.current_admin);
                }
                else{
                    toast.error(parseRes.message);
                }   
                
            } catch (err) {
                console.error(err.message);
            }
        };

        getAdminList(); // Call the function to fetch products when the component mounts

    }, []);

    const showPopUpFunc = (Man) => {
        setShowPopup(true);
        setSelectedMan(Man);
    }

    const closePopUp = () => {
        setShowPopup(false);
        setSelectedMan(null);
    }
    
    return (
        <Fragment>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>DeliveryMan ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Hire Date</th>
                        <th>Is Employed</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryMen && deliveryMen.map(Man => (
                        <tr key={Man.user_id}>
                            <td><a onClick={() => showPopUpFunc(Man)} 
                                style={{
                                    cursor: 'pointer',
                                    color: '#8f6ec5'
                                }}
                            >{Man.user_id}</a></td>
                            <td>{Man.full_name}</td>
                            <td>{Man.email}</td>
                            <td>{Man.salary}</td>
                            <td>{moment(Man.hiring_date).format('MMMM DD, YYYY')}</td>
                            <td className={Man.salary > 0? 'paid' : 'not-paid'}><p >{Man.salary > 0 ? 'Employed': 'Fired'}</p></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                showPopup && selectedMan &&  <UserPopup close={closePopUp} user_data={selectedMan} />
            }
        </Fragment>
    )
}

export default AllAdmins;