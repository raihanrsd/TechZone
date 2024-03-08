import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Info from "./user_home";
import OrderList from "./orders";
import WishList from "./wishlist";
import Shipping from "./shipping";

import "./user_styles.css";
import PageFooter from "../ReUse/PageFooter";

const UserPage = ({isAuthenticated}) =>{
    const [activeTab, setActiveTab] = useState('info');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
      <Fragment>
          <div className="container" style={{
            marginTop: '100px',
          }}>    
            <div>
              {activeTab === 'info' && <Info  />}
              {activeTab === 'orderList' && <OrderList />}
              {activeTab === 'wishlist' && <WishList isAuthenticated={isAuthenticated} />}
              {activeTab === 'shippingAddress' && <Shipping />}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '20px',
              marginTop: '20px'
            }}>
              <button className="user_page_btn1" onClick={() => handleTabClick('info')}>Personal Information</button>
              <button className="user_page_btn2" onClick={() => handleTabClick('orderList')}>Order List</button>
              <button className="user_page_btn3" onClick={() => handleTabClick('wishlist')}>Wishlist</button>
              <button className="user_page_btn4" onClick={() => handleTabClick('shippingAddress')}>Shipping Address</button>
            </div>
          </div>

          <PageFooter />
      </Fragment>
      );
}

export default UserPage;