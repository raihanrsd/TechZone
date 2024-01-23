import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
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
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/register`, {
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
            <h1 className='text-center m-5'>Register</h1>
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
            <p className="m-3 text-center"> If you already have an account <Link to="/login">Login here</Link>.</p>
        </Fragment>
    );
}

export default Register;