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
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/DMorders/available_orders`, {
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

    const acceptOrder = async (order_id) => {
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/DMorders/accept_order`, {
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify({order_id})
            });

            const parseRes = await response.json();
            if(parseRes.accepted){
                toast.success(parseRes.message);
                setOrders(orders.filter(order => order.order_id !== order_id));
            }
            else{
                console.log(parseRes.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                        <th>Address</th>
                        <th>Accept</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <Link to={`/order/${order.order_id}`}  > <td>{order.order_id}</td> </Link>
                            <td> BDT {order.total_price}</td>
                            <td>{
                                moment(order.date_added).format('MMMM DD, YYYY')
                            }</td>
                            <td>{order._address + ', ' +order.city + ', ' + order.zip_code}</td>
                            <td><button className="btn btn-success" onClick={()=>acceptOrder(order.order_id)}>Accept</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default AvailableOrders;