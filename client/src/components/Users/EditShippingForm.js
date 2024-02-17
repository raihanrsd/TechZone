import React, {Fragment, useState, useEffect } from 'react';
import { toast } from "react-toastify";

const EditShippingForm = ({ address, setAddress, setEditMode, handleSubmit }) => {
    
    

    const handleClose = () => {
        setEditMode(false);
    }

    return (
        <Fragment>
            <div className="edit-form-overlay">
                <div className="edit-form-container">
                <h1>Edit Address</h1>
                <button className="btn btn-danger close-button" onClick={handleClose}>
                    X
                </button>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control my-3" id="address" value={address._address} onChange={e => setAddress({ ...address, _address: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control my-3" id="city" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input type="text" className="form-control my-3" id="state" value={address.shipping_state} onChange={e => setAddress({ ...address, shipping_state: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control my-3" id="country" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip_code">Zip Code</label>
                            <input type="text" className="form-control" id="zip_code" value={address.zip_code} onChange={e => setAddress({ ...address, zip_code: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default EditShippingForm;