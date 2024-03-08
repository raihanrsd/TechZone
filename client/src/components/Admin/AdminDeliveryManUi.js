
import React, { Fragment,useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./admin.css"
import UserImg from "../../image/user.png";

import ErrorPage from '../ReUse/Error';
import AvailableOrders from './AvailableOrders';
import DMAnalytics from './DMAnalytics';
import AssignedOrders from './AssignedOrders';
import CompletedOrders from './CompletedOrders';
import DMProfile from './DMProfile';
import AdminAnalytics from './AdminAnalytics';
import AddProducts from './AddProduct';
import ShowProducts from '../Products/showAllProducts';
import ShowAllCategories from '../Products/showAllCategories';
import AddCategory from './AddCategories';
import AllOrders from './AllOrders';
import AdminPromos from './AdminPromos';
import AllAdmins from './AllAdmins';
import NoticeBoard from './NoticeBoard';
import AllUsers from './AllUsers';
import AllDeliveryMan from './AllDeliveryMan';


const AdminDeliveryManUi = ({isAdmin, isDeliveryMan, setAuth, setIsAdmin, setIsDeliveryMan}) =>{
    const [user, setUser] = useState({});
    const [pageState, setPageState] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const getUser = async () => {
            try {
                if(isDeliveryMan){
                    const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/delivery_man`, {
                        method: "GET",
                        headers: { token: localStorage.token }
                    });
                    const parseRes = await response.json();
                    console.log(parseRes);
                    if(!parseRes.verified){
                        toast.error("You aren't authorized to view this page");

                    }
                    setUser(parseRes.info);
                }
                else if(isAdmin){

                }
                else{
                    return <ErrorPage message={"You aren't authorized to view that page."} />
                }
                
            } catch (err) {
                console.error(err.message);
            }
        };
        getUser();
    }, [])

    const changePageState = (state) => {
        console.log("comes here");
        setPageState(state);

    }

    const logOut = async() =>{
        setAuth(false);
        setIsAdmin(false);
        setIsDeliveryMan(false);
    }


    return (
        <Fragment>
            <div className='main-div'>
                <div className='bar-div'>
                    <div className='overlay'></div>
                    {
                        isDeliveryMan &&
                        (   
                            <Fragment>
                            <div className='bar-content-div'>
                            <h2 className='dashboard-heading'>Delivery Man Dashboard</h2>
                            <hr className='bar-div-hr'></hr>
                            
                            <img src={UserImg} className='profile-img' />
                            
                            <h2 className='profile-heading'>{user.username}</h2>
                            <hr className='bar-div-hr'></hr>
                            <button className='bar-buttons' onClick={() => changePageState(1)}>
                                Analytics
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(2)}>
                                Available Orders
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(3)}>
                                Assigned Orders
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(4)}>
                                Completed Orders 
                            </button>
                            <button className='bar-buttons' onClick={() => navigate('/messages')}>
                                Messages
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(5)}>
                                Profile
                            </button>
                            <button className='bar-buttons' onClick={() => logOut()}>
                                Log Out
                            </button>
                            </div>
                            </Fragment>
                        ) ||
                        isAdmin && (
                            <Fragment>
                            <div className='bar-content-div'>
                            <h2 className='dashboard-heading'>Admin Dashboard</h2>
                            <hr className='bar-div-hr'></hr>
                            
                            <img src={UserImg} className='profile-img' />
                            
                            <h2 className='profile-heading'>{user.username}</h2>
                            <hr className='bar-div-hr'></hr>
                            <button className='bar-buttons' onClick={() => changePageState(1)}>
                                Analytics
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(2)}>
                                Products
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(3)}>
                                Categories
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(4)}>
                                Orders
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(5)}>
                                Promos
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(6)}>
                                Notice Board
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(7)}>
                                Admins
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(8)}>
                                Delivery Man
                            </button>
                            <button className='bar-buttons' onClick={() => changePageState(9)}>
                                Customer
                            </button>
                            <button className='bar-buttons' onClick={() => logOut()}>
                                Log Out
                            </button>
                            </div>
                            </Fragment>

                        )
                    }
                </div>
                <div className='content-div'>
                    {
                        isAdmin && (
                            pageState === 1 && <AdminAnalytics /> ||
                            pageState === 2 && <Fragment>
                                    <AddProducts />
                                    <ShowProducts />
                                 </Fragment> ||
                            pageState === 3 && <Fragment> 
                                    <AddCategory />
                                    <ShowAllCategories />
                                </Fragment> ||
                            pageState === 4 && <AllOrders /> ||
                            pageState === 5 && <AdminPromos /> ||
                            pageState === 6 && <NoticeBoard /> ||
                            pageState === 7 && <AllAdmins /> ||
                            pageState === 8 && <AllDeliveryMan /> ||
                            pageState === 9 && <AllUsers />
                            
                        )
                    }

{
                        isDeliveryMan && (
                            pageState === 1 && <AdminAnalytics /> ||
                            pageState === 2 && <AvailableOrders /> ||
                            pageState === 3 && <AssignedOrders /> ||
                            pageState === 4 && <CompletedOrders /> ||
                            pageState === 5 && <DMProfile />
                        )
                    }
                </div>
            </div>
        </Fragment>
    )

}

export default AdminDeliveryManUi;