import React, { Fragment,useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




const AdminAnalytics = () =>{
    const [chartData1, setChartData1] = useState(null);
    const [chartData2, setChartData2] = useState({});
    
    useEffect(() =>{
        const getChartData = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/analytics/product_date`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                console.log(parseRes.product_date.map(data => moment(data.date_sold).format('MMM Do')));
                console.log(parseRes.product_date.map(data => data.total_products_sold));
                setChartData1({
                    labels : parseRes.product_date.map(data => moment(data.date_sold).format('MMM Do')),

                    datasets : [
                        {
                            label: 'Products Sold',
                            data: parseRes.product_date.map(data => data.total_products_sold),
                            backgroundColor: 'rgba(75,192,192,0.6)'
                        }
                    ]
                })
            } catch (err) {
                console.error(err.message);
            }
        };

        getChartData(); // Call the function to fetch products when the component mounts
    }, []);

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

        {
            chartData1 && 
            <div style={{
                width: '600px',
                height: '600px'
            }}>
                <Bar data = {chartData1} options = {options} />
            </div>
        }
        {/* <Bar chartData = {chartData1} /> */}
    </Fragment>
  )

}

export default AdminAnalytics;