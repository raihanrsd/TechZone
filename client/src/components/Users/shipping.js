import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditShippingForm from "./EditShippingForm";
import DeleteBox from "../ReUse/DeleteBox";

const ShippingPage = () =>{
    const [addresses, setAddresses] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [address, setAddress] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
       
            const getAddresses = async () => {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shipping_address`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                setAddresses(parseRes.addresses);
            };
            getAddresses();
        
    }, []);

    const handleEditShipping = (e) => {
        const address = addresses.find(address => address.address_id === e);
        // console.log(e, address);
        setAddress(address);
        setEditMode(!editMode);
    }

    const handleDelete = async (e) => {
        setDeleteMode(!deleteMode);
        // console.log("hoi hoi");
        const address = addresses.find(address => address.address_id === e);
        setAddress(address);
    }

    const closeDelete = () => {
        setDeleteMode(false);
    }
    const deleteAddress = async (e) => {
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shipping_address/${e}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes);
            if(parseRes.done){
                setAddresses(addresses.filter(address => address.address_id !== e));
                toast.success("Address deleted successfully");
            }
            else{
                toast.error("Address not deleted");
            }
            setDeleteMode(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleAdd = () => {
        setAddMode(!addMode);
        setAddress({
            address_id: "",
            _address: "",
            city: "",
            shipping_state: "",
            country: "",
            zip_code: "",
        });
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shipping_address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(address)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            if(parseRes.done){
                setAddresses([...addresses, parseRes.address]);
                toast.success("Address added successfully");
                setAddMode(false);
            }
            else{
                toast.error("Address not added");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shipping_address/${address.address_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(address)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            setAddress(parseRes.address);

            if(parseRes.done){
                setAddresses(addresses.map(address => {
                    if (address.id === address.id) {
                        address = parseRes.address;
                    }
                    return address;
                }));
                toast.success("Address updated successfully");
                setEditMode(false);
            }
            else{
                toast.error("Address not updated");
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }
    return (

        <Fragment>
            <div className="btn_bar">
                <h3>SHIPPING PAGE</h3>
                <button
                    style={{
                        width: "300px",
                        borderRadius: "10px",
                    }}
                    onClick={handleAdd}
                >Add New Shipping Address</button>
            </div>
            

            <div className="container">
                {
                    addresses.map(address => (
                        <div key={address.id} className="card">
                            <div className="card-body">
                                <div className="shipping-ind-div">
                                {
                                    address && 
                                    (
                                        <div>
                                            <h5 className="card-title">{address._address}</h5>
                                            <p className="card-text">{address.city}</p>
                                            <p className="card-text">{address.shipping_state}</p>
                                            <p className="card-text">{address.country}</p>
                                            <p className="card-text">{address.zip_code}</p>
                                        </div>
                                    )
                                }
                                
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}>
                                <button  className="btn btn-primary m-2" onClick={() => handleEditShipping(address.address_id)}>Edit</button>
                                <button  className="btn btn-danger m-2" onClick={() => handleDelete(address.address_id)}>Delete</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {editMode && <EditShippingForm  address={address} setAddress={setAddress} setEditMode={setEditMode} handleSubmit={handleSubmit} />}
                {deleteMode && <DeleteBox message={"Are you sure you want to delete this?"} deleteFunction={deleteAddress} id={address.address_id} closeDelete={closeDelete} />}
                {addMode && <EditShippingForm  address={address} setAddress={setAddress} setEditMode={setAddMode} handleSubmit={handleAddSubmit} />}
            </div>
        </Fragment>
    );
}

export default ShippingPage;