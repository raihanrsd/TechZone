import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorPage from "../ReUse/Error";


const OrderList = () =>{
    const [orders, setOrders] = useState([]);
    useEffect(() =>{
        const getOrderList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/info/user/order`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();

                if(parseRes.orderFound){
                    setOrders(parseRes.orders);
                    // toast.success("Orders fetched successfully");
                }
                
                
            } catch (err) {
                console.error(err.message);
            }
        };

        getOrderList(); // Call the function to fetch products when the component mounts
    }, []);

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1
        const year = dateObject.getFullYear();
        return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
      };

      

    
    

    return (
        <Fragment>
            <h1>ORDER LIST</h1>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <Link to={`/order/${order.order_id}`} > <td>{order.order_id}</td> </Link>
                            <td> BDT {order.total_price}</td>
                            <td>{
                                formatDate(order.date_added)
                            }</td>
                            <td className={order.payment_status ? 'paid' : 'not-paid'}>{order.payment_status ? 'Paid' : 'Not Paid'}</td>
                            <td className={order.order_status.toLowerCase()}>{order.order_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default OrderList;