import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowUserProducts from './showUserProducts';


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [products, setProducts] = useState([]);


    const onClickLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("Logout Successfully");
    }

    async function getName() {
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/`, {
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

    useEffect(() =>{
        const getFeaturedProduct = async() =>{
            try{
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/featured_product/price/5`,{
                    method: "GET",
                    headers: {token: localStorage.token}
                });

                const parseRes = await response.json();
                console.log(parseRes.products);
                setProducts(parseRes.products);
            }
            catch(err){
                console.log(err.message)
            }
        }

        getFeaturedProduct();
    }, [])


    return (
        <Fragment>
            <div className='nav_bar'>
                <h1>Content</h1>
            </div>
            <h1 className="text-center m-5">Dashboard, {name}</h1>
            <button onClick={onClickLogout} className="btn btn-primary">Logout</button>
            <Link to='/search' >Search</Link>
            <ShowUserProducts
                products={products}
                setProducts={setProducts}
            />
        </Fragment>
    );
};

export default Dashboard;


