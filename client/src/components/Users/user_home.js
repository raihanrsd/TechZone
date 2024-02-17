import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    contact_no: "",
    profile_img: "",
    full_name: "",
    gender: "",
    staff_status: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/info/user`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          }
        );

        const parseRes = await response.json();
        // console.log(parseRes);
        setUser(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    };

    getUser();
  }, []);

  const handleUpdate = async () => {
    setEditMode(!editMode);
  }

  const handleCancel = () => {
    setEditMode(!editMode);
  }

  const handleSubmit = async() =>{
    try{
        console.log(user);
        const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/info/user`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            token: localStorage.token
            },
            body: JSON.stringify(user)
        });
    
        const parseRes = await response.json();
        console.log(parseRes);
        if(!parseRes.uniqueViolation){
            toast.success("User info updated successfully");
            // setUser(parseRes.user);
        }
        else{
            toast.error("Username or email or contact_no already exists");
            // const response = await fetch(
        }
        // console.log(parseRes);
        setUser(parseRes.user);
        setEditMode(!editMode);
    }
    catch(err){
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center mt-5">User Profile</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={user?.username|| ''}
              readOnly={!editMode}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
              readOnly={!editMode}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_no">Contact No</label>
            <input
              type="text"
              className="form-control"
              id="contact_no"
              value={user.contact_no}
              readOnly={!editMode}
              onChange={(e) => setUser({ ...user, contact_no: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              value={user.full_name}
              readOnly={!editMode}
              onChange={(e) => setUser({ ...user, full_name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            
              <select
                className='form-control'
                disabled={!editMode}
                id="gender"
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
          </div>
          {
            editMode && (
                <div className='form-group btn_div'>
                <button type="button" className="normalbtn" onClick={handleSubmit}>Submit</button>
                <button type="button" className="cancelbtn" onClick={handleCancel}>Cancel</button>
                </div>
            )
          }
          
        </form>
      </div>

        <div className="container" >
            {
                !editMode && <button onClick={handleUpdate}>Update Info</button>
            }
            
        </div>
    </Fragment>
  );
};

export default UserPage;
