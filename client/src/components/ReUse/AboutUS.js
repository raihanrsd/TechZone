import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../css/AboutUS.css";
import webLogo from "../../image/WebLOGO.png";
import abhishek from "../../image/abhishek.jpg";
import raihan from "../../image/raihan.png";

import PageFooter from "./PageFooter";

import { MdMobileFriendly } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

export default function AboutUS() {
  return (
    <Fragment>
      <div
        className="container darkShadow"
        style={{
          height: "600px",
          marginTop: "130px",
          backgroundColor: "lavender",
          borderRadius: 20,
        }}
      >
        <div className="heading">
          <h1>
            <u>About Us</u>
          </h1>
        </div>

        <div className="content">
          <div className="title">
            <h2> Welcome To TechZone </h2>
            <p>
              This is where innovation meets convenience! Prioritizing your needs, we
              offer premium gadgets and electronics. Our commitment includes
              providing a user-friendly environment and a reliable payment
              gateway system. With our top-quality products, we aim to elevate
              your daily life, enabling you to lead a smart and innovative
              lifestyle. We are confident that Techzone will be a positive
              addition to your technological experience.
            </p>
            <button className="homeButton"> Discover </button>
          </div>

          <div
            className="imageSection "
            style={{ height: "362px", width: "362px", borderRadius: 23 }}
          >
            <img
              src={webLogo}
              alt="Web Logo"
              className="webLogo darkShadow"
              style={{ height: "350px", width: "350px", borderRadius: 20 }}
            />
          </div>
        </div>
      </div>

        <div className="boxContainer">
            <div className="box">
                <MdMobileFriendly style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> User Friendly Interface </p>
            </div>
            <div className="box">
                <TbTruckDelivery style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> Ontime Delivery </p>
            </div>
            <div className="box">
                <FaLaptopCode style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> top Quality Products </p>
            </div>
            <div className="box">
                <FaMoneyCheckAlt style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> Cash On delivery </p>
            </div>
        </div>

        <div className="boxContainer">
            <div className="box">
                <MdOutlineDiscount style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> Exclusive Discount </p>
            </div>
            <div className="box">
                <RiCustomerService2Line style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> Customer Service </p>
            </div>
            <div className="box">
                <FaRegCheckCircle style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> Enrich Stock </p>
            </div>
            <div className="box">
                <MdRateReview style={{height: "200px", width: "200px" , marginLeft: "40px", marginTop: "20px"}}/>
                <p> Unfiltered Review </p>
            </div>
        </div>
        
        <div className="container text-center darkShadow"  style={{height: "80px", width: "auto", backgroundColor: "lavender", borderRadius: 20, marginBottom:"20px"}}>   
            <h2> Contributors </h2>
        </div>
        <div className="container contributorsContainer darkShadow" style={{height: "500px", width: "auto", backgroundColor: "lavender", borderRadius: 20, marginBottom:"50px"}}>
            <div className="contributor1" style={{height: "250px", width: "auto", display: "flex", marginTop:"10px", marginBottom: "10px"}}>
                <img
                    src={abhishek}
                    alt="Contributor 1"
                    className="contributorImage"
                    style= {{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        border: "2px solid black",
                        marginLeft: "20px",
                        objectFit: "cover"
                    }}
                />
                <div className="contributorInfo" style={{marginLeft: "350px", marginTop: "70px"}}>
                    <h3>Abhishek Roy</h3>
                    <p> ID : 2105033 </p>
                </div>
            </div>
            <div className="contributor2" style={{height: "250px", width: "auto", display: "flex"}}>
                <img
                    src={raihan}
                    alt="Contributor 2"
                    className="contributorImage"
                    style= {{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        border: "2px solid black",
                        marginLeft: "20px",
                        objectFit: "cover"
                    }}
                />
                <div className="contributorInfo" style={{marginLeft: "350px", marginTop: "50px"}}>
                    <h3>Raihan Rashid (RSD) </h3>
                    <p> ID : 2105046 </p>
                </div>
            </div>
        </div>

      <PageFooter />
    </Fragment>
  );
}
