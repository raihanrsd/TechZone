import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvailableOrders = () =>{

    const [orders, setOrders] = useState([]);


    useEffect(() =>{
        const getOrderList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/DMorders/completed_orders`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                setOrders(parseRes.orders); 
            } catch (err) {
                console.error(err.message);
            }
        };

        getOrderList(); // Call the function to fetch products when the component mounts
    }, [])

    const changePaymentStatus = async (order_id) => {
        try{
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/DMorders/change_payment_status`, {
                method: "PUT",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify({order_id})
            });

            const parseRes = await response.json();
            if(parseRes.changed){
                toast.success(parseRes.message);
                setOrders(orders.filter(order => {
                    if(order.order_id !== order_id){
                        return order;
                    }
                    order.payment_status = !order.payment_status;
                    return order;
                }));
            }
            else{
                console.log(parseRes.message);
            }
        }catch(err){
            console.error(err.message);
        }
    }
    

    return (
        <Fragment>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Status</th>
                        <th>Delivery Date</th>
                        <th>Payment Method</th>
                        <th>Payment Status</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <Link to={`/order/${order.order_id}`}  > <td>{order.order_id}</td> </Link>
                            <td className={order.order_status.toLowerCase()}>{order.order_status}</td>
                            <td>{
                                moment(order.delivery_time).format('MMMM DD, YYYY hh:mm a')
                            }</td>
                            <td>{order.payment_method}</td>
                            <td className={order.payment_status ? 'paid' : 'not-paid'}>{order.payment_status ? 'Paid' : 'Not Paid'}</td>
                            <td>
                                {
                                    order.payment_method === 'Cash On Delivery' && order.order_status !== 'Cancelled'?
                                    <button className='btn btn-warning' onClick={()=>changePaymentStatus(order.order_id)}>Change Status</button> :
                                    
                                    order.order_status !== 'Cancelled'?
                                    <p>Payment Online</p>: <p>The order was cancelled</p>
                                }
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default AvailableOrders;