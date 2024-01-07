import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");

    const onClickLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("Logout Successfully");
    }

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            setName(parseRes.full_name);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getName();
    }, []);


    return (
        <Fragment>
            <h1 className="text-center m-5">Dashboard, {name}</h1>
            <button onClick={onClickLogout} className="btn btn-primary">Logout</button>
        </Fragment>
    );
};

export default Dashboard;


