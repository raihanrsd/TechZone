import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setAuth}) => {

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
        try {
            const body = {email, password};
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            // console.log(parseRes);
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
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
            <h1 className="text-center m-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <p className="m-3 text-center"> If you don't have any account <Link to="/register">Register here</Link>.</p>
        </Fragment>
    );
}

export default Login;