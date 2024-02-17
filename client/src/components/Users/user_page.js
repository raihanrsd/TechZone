import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Info from "./user_home";
import OrderList from "./orders";
import WishList from "./wishlist";
import Shipping from "./shipping";
import "./user_styles.css";

const UserPage = ({isAuthenticated}) =>{
    const [activeTab, setActiveTab] = useState('info');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container" style={{
          marginTop: '100px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}>
            <button className="user_page_btn" onClick={() => handleTabClick('info')}>Personal Information</button>
            <button className="user_page_btn" onClick={() => handleTabClick('orderList')}>Order List</button>
            <button className="user_page_btn" onClick={() => handleTabClick('wishlist')}>Wishlist</button>
            <button className="user_page_btn" onClick={() => handleTabClick('shippingAddress')}>Shipping Address</button>
          </div>
    
          <div>
            {activeTab === 'info' && <Info  />}
            {activeTab === 'orderList' && <OrderList />}
            {activeTab === 'wishlist' && <WishList isAuthenticated={isAuthenticated} />}
            {activeTab === 'shippingAddress' && <Shipping />}
          </div>

          
        </div>
      );
}

export default UserPage;