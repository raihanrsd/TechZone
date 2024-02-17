import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ErrorPage from "../ReUse/Error";

const Tracker = () => {
    const [tracker, setTracker] = useState(null);
    const tracker_id = useParams().tracker_id;
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
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
            } catch (err) {
                console.error(err.message);
            }
        };
        getTracker();
    }, [])


    if(!tracker){
        return null;
    }

    return(
        <Fragment>
            
            <div className="tracker-page-overlay">
                <div className="tracker-page-container">
                    <div className="tracker-heading">
                        <h2>Order Id: #{order.order_id}</h2>
                        <p className="estimated-delivery-date">Estimated Delivery Date: {formatDateString(tracker.estimated_delivery_date)}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Tracker;