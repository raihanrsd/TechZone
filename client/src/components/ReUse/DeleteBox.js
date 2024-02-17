import React, { Fragment, useState, useEffect } from "react";


const DeleteBox = ({message, deleteFunction, id, closeDelete}) => {


    return(
        <Fragment>
            <div className="delete-form-overlay" >
                <div className="delete-form-container">
                    <h6>{message}</h6>
                    <div className="btn_bar">
                        <button className="delete-btn" onClick={() => deleteFunction(id)}>Yes</button>
                        <button className="not-delete-btn" onClick={closeDelete}>No</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteBox;