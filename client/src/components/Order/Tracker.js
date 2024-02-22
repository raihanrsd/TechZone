import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorPage from "../ReUse/Error";
import CheckedIcon from "../../image/checked.png";
import ProcessIcon from "../../image/process.png";
import ExpressDelivery from "../../image/express-delivery.png";
import CargoShip from "../../image/cargo-ship.png";
import House from "../../image/house.png";



const Tracker = () => {
    const [tracker, setTracker] = useState(null);
    const tracker_id = useParams().tracker_id;
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [dateChange, setDateChange] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    function formatDateString(originalDateString) {
        const originalDate = new Date(originalDateString);
      
        // Options for formatting the date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      
        // Creating a new formatted date string
        const formattedDateString = originalDate.toLocaleDateString('en-US', options);
      
        return formattedDateString;
    }
    useEffect(() => {
        const getTracker = async () => {
            try {
                const response = await fetch(
                    `http://localhost:${process.env.REACT_APP_SERVER_PORT}/tracker/${tracker_id}`,
                    {
                        method: "GET",
                        headers: { token: localStorage.token },
                    }
                );

                const parseRes = await response.json();

                if(parseRes.isAuthorized === false){
                    toast.error("You are not authorized to view this page");
                    return(
                        <ErrorPage message={parseRes.message} />
                    );
                
                }
                setOrder(parseRes.order);
                setUser(parseRes.user);
                setTracker(parseRes.tracker);
                setCurrentUser(parseRes.current_user);
                setSelectedDate(new Date(parseRes.tracker.estimated_delivery_date));
            } catch (err) {
                console.error(err.message);
            }
        };
        getTracker();
    }, [])


    const handleDatePickerChange = async (date) => {
        
        try{
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/tracker`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({estimated_delivery_date: date, id: tracker.tracker_id})
            });

            const parseRes = await response.json();
            if(parseRes.isAuthorized === false){
                toast.error("You are not authorized to view this page");
                return(
                    <ErrorPage message={parseRes.message} />
                );
            }
            setSelectedDate(date);
            setDateChange(true);
            toast.success(parseRes.message);
        }
        catch(err){
            console.error(err.message);
        }
    }

    const handleProgressChange =  async(value) => {
        console.log(currentUser.staff_status);
        if(currentUser.staff_status !== 'admin' && currentUser.staff_status !== 'delivery_man'){
            return;
        }
        if(tracker.progress === value){
            return;
        }
        
        console.log("comes here");
        try{
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/tracker`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({progress: value, tracker_id: tracker.tracker_id})
            });

            const parseRes = await response.json();
            if(parseRes.isAuthorized === false){
                toast.error("You are not authorized to view this page");
                return(
                    <ErrorPage message={parseRes.message} />
                );
            }
            
            console.log(parseRes);
            setTracker({...tracker, progress: value});
            toast.success(parseRes.message);
        }
        catch(err){
            console.error(err.message)
        }
    }

    if(!tracker){
        return null;
    }

    return(
        <Fragment>
            
            <div className="tracker-page-overlay">
                <div className="tracker-page-container">
                    <div className="tracker-heading">
                     <Link to={`/order/${order.order_id}`} className='order-heading' ><h2>Order Id: #{order.order_id}</h2></Link>
                        <p className="estimated-delivery">Estimated Delivery Date: {
                        currentUser.staff_status === 'admin' || currentUser.staff_status === 'delivery_man' ?
                            <DatePicker selected={selectedDate} onChange={handleDatePickerChange} />
                            :
                            formatDateString(tracker.estimated_delivery_date)
                        }</p>
                        
                    </div>

                    <div className="progress-bar-div">
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{width: tracker.progress + '%'}}>
                                
                            </div>
                            
                        </div>
                        <div className='progress-icon-div'>
                            <div className='progress-icon-inner-div'>
                            <div onClick={() => handleProgressChange(0)} >
                                <img src={CheckedIcon} alt="checked" className="progress-bar-icon" />
                            </div>
                            <div onClick={() => handleProgressChange(33)} >
                            {
                                tracker.progress >= 33 ?
                                <div>
                                    <img src={CheckedIcon} alt="checked" className="progress-bar-icon" />
                                </div> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill progress-bar-icon" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            }
                            </div>

                            <div onClick={() => handleProgressChange(66)} >
                            {
                                tracker.progress >= 66 ?
                                <div>
                                    <img src={CheckedIcon} alt="checked" className="progress-bar-icon" />
                                </div> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill progress-bar-icon" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            }
                            
                            </div>

                            <div onClick={() => handleProgressChange(100)} >
                            {
                                tracker.progress == 100 ?
                                <div>
                                    <img src={CheckedIcon} alt="checked" className="progress-bar-icon" />
                                </div> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill progress-bar-icon" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            }
                            </div>

                            
                            </div>
                        </div>

                        <div className='status-icon-div'>
                            <div className='status-icon-inner-div'>
                                <div>
                                <img src={ProcessIcon} alt="process" className="status-icon" />
                                <p>Processing Order</p>
                                </div>


                                <div>
                                <img src={CargoShip} alt="process" className="status-icon" />
                                <p>Order Shipped</p>
                                </div>
                                <div>
                                <img src={ExpressDelivery} alt="process" className="status-icon" />
                                <p>Order En Route</p>
                                </div>
                            
                                

                                <div>
                                    <img src={House} alt="process" className="status-icon" />
                                    <p>Order Delivered</p>
                                </div>
                            </div>
                        </div>  
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Tracker;