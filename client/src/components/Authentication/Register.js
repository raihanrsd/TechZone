import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import "../css/login.css";
import logo from "../../image/login.png";

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirmed_password: "",
        contact_no: "",
        profile_img: "",
        full_name: "",
        gender: "",
        staff_status: ""
    });

    const {username, email, password, confirmed_password, contact_no, profile_img, full_name, gender, staff_status} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if (password !== confirmed_password) {
                alert("Passwords do not match");
            }
            const body = {username, email, password, contact_no, profile_img, full_name, gender, staff_status};
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            // console.log(parseRes);

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                // console.log("Registered Successfully")
                toast.success("You are Registered Successfully");
            }
            else{
                setAuth(false);
                console.log(parseRes);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div class="container d-flex justify-content-center align-items-center min-vh-100">

            <div class="row border rounded-5 p-3 bg-white shadow box-area">


            <div class="col-md-6 right-box">
                <div class="row align-items-center">
                    <div class="header-text mb-4">
                            <h2>Welcome To TechZone</h2>
                            <p>The journey to becoming a TopG begins now</p>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" name="username" placeholder="Username" className="form-control form-control-lg bg-light fs-6" value={username} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" name="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" value={email} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" name="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" value={password} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" name="confirmed_password" placeholder="Confirmed Password" className="form-control form-control-lg bg-light fs-6" value={confirmed_password} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" name="contact_no" placeholder="Contact No." className="form-control form-control-lg bg-light fs-6" value={contact_no} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" name="profile_img" placeholder="Profile Image" className="form-control form-control-lg bg-light fs-6" value={profile_img} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                    <input type="text" name="full_name" placeholder="Full Name"className="form-control form-control-lg bg-light fs-6" value={full_name} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                    <input type="text" name="gender" placeholder="Gender" className="form-control form-control-lg bg-light fs-6" value={gender} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-3">
                    <input type="text" name="staff_status" placeholder="Staff Status" className="form-control form-control-lg bg-light fs-6" value={staff_status} onChange={e => onChange(e)} />
                    </div>

                    <div class="input-group mb-3">
                        <button class="btn btn-lg btn-primary w-100 h-100 fs-6" onClick={onSubmitForm}>Register</button>
                    </div>
                    <div class="row">
                        <small> If you already have an account <Link to="/login">Login here</Link>.</small>
                    </div>
                </div>
            </div> 

            
            <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#103cbe'}}>
                <div class="featured-image mb-3">
                <img src={logo} class="img-fluid" style={{ width: '250px' }}/>
                </div>
                <p class="text-white fs-2" style={{fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}>Indroduce Yourself</p>
                <small class="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: 'Courier New, Courier, monospace'}}>Make your Daily Digital Consumption a Bliss</small>
            </div> 

            </div>
            </div> 
        </Fragment>
    );
}

export default Register;













// previous code
{/* <h1 className='text-center m-5'>Register</h1>
<form onSubmit={onSubmitForm}>
    <input type="text" name="username" placeholder="Username" className="form-control my-3" value={username} onChange={e => onChange(e)} />
    <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
    <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
    <input type="password" name="confirmed_password" placeholder="Confirmed Password" className="form-control my-3" value={confirmed_password} onChange={e => onChange(e)} />
    <input type="text" name="contact_no" placeholder="Contact No." className="form-control my-3" value={contact_no} onChange={e => onChange(e)} />
    <input type="text" name="profile_img" placeholder="Profile Image" className="form-control my-3" value={profile_img} onChange={e => onChange(e)} />
    <input type="text" name="full_name" placeholder="Full Name" className="form-control my-3" value={full_name} onChange={e => onChange(e)} />
    <input type="text" name="gender" placeholder="Gender" className="form-control my-3" value={gender} onChange={e => onChange(e)} />
    <input type="text" name="staff_status" placeholder="Staff Status" className="form-control my-3" value={staff_status} onChange={e => onChange(e)} />
    <button className="btn btn-success btn-block">Submit</button>
</form>
<p className="m-3 text-center"> If you already have an account <Link to="/login">Login here</Link>.</p> */}