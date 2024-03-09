import React, { Fragment,useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Card from '../filter/product-card';



const AdminAnalytics = () =>{
    const [chartData1, setChartData1] = useState(null);
    const [chartData2, setChartData2] = useState(null);
    const [chartData3, setChartData3] = useState(null);
    const [chartData4, setChartData4] = useState(null);
    const [chartData5, setChartData5] = useState(null);
    
    const [productNumber, setProductNumber] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const [bestSellingProducts, setBestSellingProducts] = useState(null);
    const [bestSellingProduct, setBestSellingProduct] = useState(null);
    const [topWishlistedProducts, setTopWishlistedProducts] = useState(null);
    const [topWishlistedProduct, setTopWishlistedProduct] = useState(null);
    const [topRatedProducts, setTopRatedProducts] = useState(null);
    const [topRatedProduct, setTopRatedProduct] = useState(null);
    const [mostValuedUser, setMostValuedUser] = useState(null);
    const [mostActiveUser, setMostActiveUser] = useState(null);
    useEffect(() =>{
        const getChartData = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/product_date`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                let product_sold = 0;
                parseRes.product_date.map(data => {
                    product_sold += parseInt(data.total_products_sold);
                });
                setProductNumber(product_sold);
                setChartData1({
                    labels : parseRes.product_date.map(data => moment(data.date_sold).format('MMM Do')),

                    datasets : [
                        {
                            label: 'Products Sold',
                            data: parseRes.product_date.map(data => data.total_products_sold),
                            backgroundColor: ['#8f6ec5', '#682e7e']
                        }
                    ]
                })
            } catch (err) {
                console.error(err.message);
            }
        };

        getChartData(); // Call the function to fetch products when the component mounts
    }, []);


    useEffect(() => {
        const getChartData = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/order_date`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
        
                const parseRes = await response.json();
                console.log(parseRes);
        
                if (parseRes.order_date && parseRes.order_date.length > 0) {
                    let total_ord = 0;
                    parseRes.order_date.forEach(data => {
                        total_ord += parseInt(data.total_orders);
                    });
                    setOrderNumber(total_ord);
        
                    setChartData2({
                        labels: parseRes.order_date.map(data => moment(data.date_ordered).format('MMM Do')),
                        datasets: [
                            {
                                label: 'Products Sold',
                                data: parseRes.order_date.map(data => data.total_orders),
                                backgroundColor: ['#8f6ec5', '#682e7e']
                            }
                        ]
                    });
                } else {
                    // Handle the case where order_date is undefined or empty
                    console.log('No data available');
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        

        getChartData(); 
    }, []);

    useEffect(() => {
        const getChartData = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/price_date`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
    
                const parseRes = await response.json();
                console.log(parseRes);
    
                if (parseRes.price_date && parseRes.price_date.length > 0) {
                    setTotalEarned(parseRes.price_date[parseRes.price_date.length - 1].cumulative_earned_amount);
    
                    setChartData3({
                        labels: parseRes.price_date.map(data => moment(data.date_sold).format('MMM Do')),
                        datasets: [
                            {
                                label: 'Daily Earned',
                                data: parseRes.price_date.map(data => data.daily_earned_amount),
                                yAxisID: 'y-axis-1',
                                backgroundColor: '#8f6ec5',
                            },
                            {
                                label: 'Cumulative Earned',
                                data: parseRes.price_date.map(data => data.cumulative_earned_amount),
                                yAxisID: 'y-axis-2',
                                backgroundColor: '#682e7e',
                            },
                        ],
                    });
                    
                } else {
                    console.log('No data available');
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        const getBestSellingProducts = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/best_selling_products`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                if(parseRes.authorized){
                    setBestSellingProducts(parseRes.best_selling);
                    setBestSellingProduct(parseRes.best_product);
                }
                else{
                    toast.error(parseRes.message);
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        const getTopWishlistedProducts = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/top_wishlisted_products`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                if(parseRes.authorized){
                    setTopWishlistedProducts(parseRes.top_wishlisted);
                    setTopWishlistedProduct(parseRes.top);
                }
                else{
                    toast.error(parseRes.message);
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        const getTopRatedProducts = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/top_rated_products`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                if(parseRes.authorized){
                    setTopRatedProducts(parseRes.top_rated);
                    setTopRatedProduct(parseRes.top);
                }
                else{
                    toast.error(parseRes.message);
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        const getChartData1 = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/most_valuable_users`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                setMostValuedUser(parseRes.most_valuable_user);
                
                setChartData4({
                    labels: parseRes.most_valuable_users.map(data => data.username),
                    datasets: [
                        {
                            label: 'Money Spent',
                            data: parseRes.most_valuable_users.map(data => data.cumulative_value),
                            backgroundColor: ['#8f6ec5', '#682e7e']
                        }
                    ]
                });
            } catch (err) {
                console.error(err.message);
            }
        }

        const getMostActiveUsers = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/most_active_users`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                setMostActiveUser(parseRes.most_active_user);
                
                setChartData5({
                    labels: parseRes.most_active_users.map(data => data.username),
                    datasets: [
                        {
                            label: 'Points',
                            data: parseRes.most_active_users.map(data => data.points),
                            backgroundColor: ['#8f6ec5', '#682e7e']
                        }
                    ]
                });
            } catch (err) {
                console.error(err.message);
            }
        }

        getBestSellingProducts();

        getTopRatedProducts();
    
        getChartData();

        getChartData1();

        getMostActiveUsers();

        getTopWishlistedProducts();
    }, []);
    
    const options3 = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM Do',
                    },
                },
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                position: 'left',
            },
        },
    };
    
    

    const options = {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      };

      
  return (
    <Fragment>
        <h1>Analytics</h1>

        <div className='product-sold-div'>

        {
            chartData1 && 
            <div style={{
                width: '600px',
            }}>
                <Bar data = {chartData1} options = {options} />
            </div>
        }

        <div className='product-sold-box'>
            <h2>Product Sold This Month</h2>
            <p>{productNumber}</p>
        </div>
        </div>

        <div className='order-sold-div'>

        <div className='product-sold-box'>
            <h2>Orders This Month</h2>
            <p>{orderNumber}</p>
        </div>
            <div style={{
                width: '600px'
            }}>
                {
                    chartData2 && <Line data={chartData2} option={options} />
                }
            </div>
        </div>
        {/* <Bar chartData = {chartData1} /> */}

        <div className='order-sold-div'>
            
            <div style={{ width: '600px'}}>
                {chartData3 && <Line data={chartData3} options={options} />}
            </div>
            <div className='product-sold-box'>
                <h2>Total Earned This Month</h2>
                 <p style={{
                    fontSize: '30px'
                 }}>BDT {totalEarned}</p>
            </div>
        </div>

        <div className='order-sold-div'>
            
            <div style={{ width: '600px', textAlign: 'center'}}>
                <h2 >Best Selling Products</h2>
            <table className='order-table' style={{
                maxHeight: '700px',
                overflowY: 'scroll'
            }}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Max Sold</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {bestSellingProducts && bestSellingProducts.map(product => (
                        <tr key={product.product_id}>
                            <Link to={`/product/${product.product_id}`} > <td>{product.product_id}</td> </Link>
                            <td>{product.product_name}</td>
                            <td>{
                                product.max_sold
                            }</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className=''>
                <h2>Best Selling Product</h2>
                {bestSellingProduct &&
                    <Card item={bestSellingProduct} key={bestSellingProduct.id} setCartCounter={''} />
                }
            </div>
        </div>



        <div className='order-sold-div'>
        <div className=''>
                <h2>Most Liked Product</h2>
                {topWishlistedProduct &&
                    <Card item={topWishlistedProduct} key={topWishlistedProduct.id} setCartCounter={''} />
                }
            </div>
            <div style={{ width: '600px', textAlign: 'center'}}>
                <h2 >Top Wishlisted Products</h2>
            <table className='order-table' style={{
                maxHeight: '700px',
                overflowY: 'scroll'
            }}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Wish Count</th>
            
                    </tr>
                </thead>
                <tbody>
                    {topWishlistedProducts && topWishlistedProducts.map(product => (
                        <tr key={product.product_id}>
                            <Link to={`/product/${product.product_id}`} > <td>{product.product_id}</td> </Link>
                            <td>{product.product_name}</td>
                            <td>{
                                product.wish_count
                            }</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>

        <div className='order-sold-div'>
        
            <div style={{ width: '600px', textAlign: 'center'}}>
                <h2 >Top Rated Products</h2>
            <table className='order-table' style={{
                maxHeight: '700px',
                overflowY: 'scroll'
            }}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Average Rating</th>
            
                    </tr>
                </thead>
                <tbody>
                    {topRatedProducts && topRatedProducts.map(product => (
                        <tr key={product.product_id}>
                            <Link to={`/product/${product.product_id}`} > <td>{product.product_id}</td> </Link>
                            <td>{product.product_name}</td>
                            <td>{
                                parseFloat(product.avg_rating).toFixed(2)
                            }</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className=''>
                <h2>Top Rated Product</h2>
                {topRatedProduct &&
                    <Card item={topRatedProduct} key={topRatedProduct.id} setCartCounter={''} />
                }
            </div>
        </div>



        <div className='order-sold-div'>
            <div className='product-sold-box'>
                <h2>Most Valued User</h2>
                 <p style={{
                    fontSize: '30px'
                 }}>{mostValuedUser && mostValuedUser.full_name}</p>
            </div>
            <div style={{ width: '600px'}}>
                {
                    chartData4 && <Bar data={chartData4} options={options} />
                }
            </div>
            
        </div>

        <div className='order-sold-div'>
            <div style={{ width: '600px'}}>
                {
                    chartData5 && <Bar data={chartData5} options={options} />
                }
            </div>
            <div className='product-sold-box'>
                <h2>Most Active User</h2>
                 <p style={{
                    fontSize: '30px'
                 }}>{mostActiveUser && mostActiveUser.full_name}</p>
            </div>
            
            
        </div>
    </Fragment>
  )

}

export default AdminAnalytics;