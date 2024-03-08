import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../css/login.css";
import logo from "../../image/login.png";
import bg from "../../image/bg.png";
import googleLogo from "../../image/google.png";

const Login = ({setAuth, setIsAdmin, setIsDeliveryMan}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log(process.env.REACT_APP_SERVER_PORT)
        try {
            const body = {email, password};
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                setIsAdmin(parseRes.isAdmin);
                setIsDeliveryMan(parseRes.isDeliveryMan);
                // console.log("Login Successfully")
                
                toast.success("Logged in Successfully");
            }
            else {
                setAuth(false);
                console.log(parseRes);
                toast.error(parseRes);
            }

            

            // toast.success("Logged in Successfully");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            

            <div class="container d-flex justify-content-center align-items-center min-vh-100" >
            

            <div class="row border rounded-5 p-3 bg-white shadow box-area">

            
            
            <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#103cbe'}}>
                <div class="featured-image mb-3">
                <img src={logo} class="img-fluid" style={{ width: '250px' }}/>
                </div>
                <p class="text-white fs-2" style={{fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}>Be Verified</p>
                <small class="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: 'Courier New, Courier, monospace'}}>Enrich your Daily life with our Exquisite Collection</small>
            </div> 

            
            
            <div class="col-md-6 right-box">
                <div class="row align-items-center">
                    <div class="header-text mb-4">
                            <h2>Hello, Again</h2>
                            <p>Lets Start Grinding</p>
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" name="email" placeholder="Email Adress" className="form-control form-control-lg bg-color fs-6" value={email} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-1">
                        <input type="password" name="password" placeholder="Password" className="form-control form-control-lg bg-color fs-6" value={password} onChange={e => onChange(e)} />
                    </div>
                    <div class="input-group mb-5 d-flex justify-content-between">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="formCheck"/>
                            <label for="formCheck" class="form-check-label text-secondary"><small>Remember Me</small></label>
                        </div>
                        <div class="forgot">
                            <small><a href="#">Forgot Password?</a></small>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <button class="btn btn-lg btn-primary w-100 h-100 fs-6" onClick={onSubmitForm}>Login</button>
                    </div>
                    <div class="input-group mb-3">
                        <button class="btn btn-lg btn-light w-100 h-100 fs-6"><img src={googleLogo} style={{ width: '20px' }} className="me-2"/><small>Sign In with Google</small></button>
                    </div>
                    <div class="row">
                        <small>Don't have account? <Link to="/register">Register here</Link>.</small>
                    </div>
                </div>
            </div> 

            </div>
            </div>
        </Fragment>
    );
}

export default Login;



    



    // previous code
    // <h1 className="text-center m-5">Login</h1>
    // <form onSubmit={onSubmitForm}>
    //     <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
    //     <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
    //     <button className="btn btn-success btn-block">Submit</button>
    // </form>
    // <p className="m-3 text-center"> If you don't have any account <Link to="/register">Register here</Link>.</p>