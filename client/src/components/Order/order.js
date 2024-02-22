import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ErrorPage from "../ReUse/Error";
import LoadingIndicator from "../ReUse/LoadingIndicator";
import "./order.css";

const OrderPage = ({ isAuthenticated }) => {
  const [order, setOrder] = useState(null);
  const [product_info, setProductInfo] = useState(null);
  const [tracker, setTracker] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const { order_id } = useParams();
  const navigate = useNavigate();

  function formatDateString(originalDateString) {
    const originalDate = new Date(originalDateString);
  
    // Options for formatting the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
    // Creating a new formatted date string
    const formattedDateString = originalDate.toLocaleDateString('en-US', options);
  
    return formattedDateString;
  }
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/get_order/${order_id}`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          }
        );

        const parseRes = await response.json();
        console.log(parseRes);

        if(!parseRes.isAuthorized){
            navigate("/");
          return;
        }
        setOrder(parseRes.order);
        setProductInfo(parseRes.product_info);
        setTracker(parseRes.tracker);
        setUser(parseRes.user);
        
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };
    getOrder();
  }, [order_id, navigate]);

  useEffect(() => {
    console.log('this is product info', product_info)
  }, [product_info]);

  if (loading) {
    return <LoadingIndicator />; // Render loading indicator while data is being fetched
  }

  if (!order) {
    return null; // or loading indicator
  }

  return (
    <Fragment>
      <div className="order-heading-div">
        <h1 className="order-heading">Order ID: #{order.order_id}</h1>
        
        <div className="btn-div">
            <Link to={`/tracker/${tracker.tracker_id}`}> <button className="btn btn-primary order-button">Tracker</button></Link>
            <button className="btn btn-danger order-button">Cancel Order</button>
        </div>
      </div>

      <div className="status-div">
        <p className="order-date">Order Date: {formatDateString(order.date_added)}</p>
        <p className="estimated-delivery">Estimated Delivery Date: {formatDateString(tracker.estimated_delivery_date)}</p>
        <p className={order.order_status} style={{marginLeft: 'auto'}}>Order Status: {order.order_status}</p>
      </div>

      <div className="order-main-div">
        <div className="order-upper-main-div">
          <div className="order-product-div">
            <h3 className='heading'>Products</h3>
            {product_info &&
              product_info.map((product, index) => {
                console.log(product);
                return (
                  // {pro.product_name}
                  
                  <div className="order-product-info-div">
                    <div className="order-product-image-div">
                    {
                        product.product && product.product.images ?
                        <img src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}` + product.product.images[0].image_url} className="order-product-image"
                        width="200px" height="300px" alt="..." />:
                        <img src="/images/Product/test.png" className="order-product-image"
                        width="200px"  alt="..." />
                    }
                      
                    </div>
                    <div className="order-product-details-div">
                      <div className="order-product-inner-1">
                        <h2>{product.product.product_name}</h2>
                        <p>{product.spec_description}</p>
                      </div>
                      <div className="order-product-inner-2">
                        <h3>BDT {product.price}</h3>
                        <p>Qty: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="order-info-div">
            <div className="order-info">
              <h3 className="heading">Customer Information</h3>
              <div className="order-info-inner">
                <div>
                    <p>Name: </p>
                    <p>Email: </p>
                    <p>Contact No: </p>
                </div>
                <div>
                    <p>{user.full_name}</p>
                    <p>{user.email}</p>
                    <p>{user.contact_no}</p>
                </div>
              </div>
            </div>
            <div className="order-info">
            <h3 className="heading">Total Cost</h3>
              <div className="order-info-inner">
                <div>
                    <p>Applied Promo: </p>
                    <p>Total: </p>
                    <p>Discount: </p>
                    <p>Delivery Charge: </p>
                    <p>Grand Total: </p>
                </div>
                <div>
                    <p>{order.promo_name ? order.promo_name: 'None'}</p>
                    <p>BDT {order.total_price}</p>
                    <p>BDT {order.discount_amount}</p>
                    <p>BDT {order.delivery_charge}</p>
                    <p>BDT { parseFloat(order.total_price) + parseFloat(order.delivery_charge) - parseFloat(order.discount_amount) }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-lower-main-div">
          <div className="order-lower-info">
          <div className="order-info"
            style={{
                display: "block",

            }}
          >
              <h3 className="heading">Shipping & Billing Address</h3>
              <p>{order._address}</p>
              <p>{order.city}, {order.shipping_state}, {order.zip_code}</p>
              <p>{order.country}</p>
            </div>
          </div>
          <div className="order-lower-info">
          <div className="order-info">
              <h3 className="heading">Payment Information</h3>
              <div className="order-info-inner">
                <div>
                    <p>Payment Method: </p>
                    <p>Transaction Id: </p>
                    <p>Payment Status: </p>
                </div>
                <div>
                    <p>{order.payment_method}</p>
                    <p>{order.transaction_id ?? 'none'}</p>
                    <p className={order.payment_status? 'Delivered': 'Cancelled'}>{order.payment_status ? 'Paid' : 'Not Paid'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderPage;
