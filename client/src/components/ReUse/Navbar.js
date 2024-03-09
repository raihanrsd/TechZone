import { React, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../ReUse/Notification";
import { getTotalItems } from "../Cart/cartUtils";

import "../css/Navbar.css";

const Navbar = ({
  isAuthenticated,
  setAuth,
  cartCounter,
  reRender,
  setIsAdmin,
  setIsDeliveryMan,
  isAdmin,
  isDeliveryMan,
}) => {
  //console.log('isAuthenticated navbar', isAuthenticated)

  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/notifications`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          }
        );

        const parseRes = await response.json();
        console.log(parseRes);
        setNotifications(parseRes.notifications);
        setUnreadNotifications(parseRes.unread);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (isAuthenticated) {
      getNotifications(); // Call the function to fetch notifications when the component mounts
    }
  }, [reRender]);
  const onClickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    setIsAdmin(false);
    setIsDeliveryMan(false);
    toast.info("Logout Successfully");
  };

  const handleShowNotification = async () => {
    setShowNotification(!showNotification);
    try {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/notifications/seen`,
        {
          method: "PUT",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      console.log(parseRes);
      setUnreadNotifications(0);
      setNotifications(parseRes.notifications);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [showNotification, setShowNotification] = useState(false);
  if (isAdmin || isDeliveryMan) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
        <div>
          <nav>
          {isAuthenticated ? (
              <ul class="nav-bar"> 
                {/* <li class='logo'><a href='#'><img src='./images/logo.png'/></a></li> */}
                <Link
                  to="/"
                  className="nav-link"
                  style={{
                    display: "flex",
                  }}
                >
                  <i
                    className="fa-brands fa-slack fa-2x"
                    style={{ color: "white", padding: "10px" }}
                  ></i>
                  <div className="navbar-brand" style={{ color: "white", fontSize: "20px", padding: "10px"}}>TechZone</div>
                </Link>

                <input type="checkbox" id="check" />
                <span class="menu">
                  <li>
                  <Link
                      to="/cart"
                      className="nav-link"
                      style={{ position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    
                    }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-cart3"
                        viewBox="0 0 16 16"
                        className="nav-bar-icons"
                        style={{ marginTop: "0px" }}
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                      </svg>
                      {cartCounter === 0 ? null : (
                        <span className="cart-counter" style={{
                          top: "-12px"
                        }}>{cartCounter}</span>
                      )}
                    </Link>
                  </li>
                  <li>
                  <Link style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  
                  }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-bell"
                        viewBox="0 0 16 16"
                        className="nav-bar-icons"
                        onClick={() => handleShowNotification()}
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                      </svg>
                      {unreadNotifications === 0 ? null : (
                        <span className="cart-counter">{unreadNotifications}</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/filter" className="nav-link">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/user" className="nav-link">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={onClickLogout} className="btn class-Button" style={{backgroundColor: "lightcoral",color: "white", marginTop: "3px"}}>
                      Logout
                    </button>
                  </li>
                  <label for="check" class="close-menu">
                    <i class="fas fa-times"></i>
                  </label>
                </span>
                <label for="check" class="open-menu">
                  <i class="fas fa-bars"></i>
                </label>
              </ul>
                    ) : (
              <ul class="nav-bar">
                  <Link
                  to="/"
                  className="nav-link"
                  style={{
                    display: "flex",
                  }}
                >
                  <i
                    className="fa-brands fa-slack fa-2x"
                    style={{ color: "white", padding: "10px" }}
                  ></i>
                  <div className="navbar-brand" style={{ color: "white", fontSize: "20px", padding: "10px"}}>TechZone</div>
                </Link>

                <input type="checkbox" id="check" />
                <span class="menu">
                  <li>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/filter" className="nav-link">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                <label for="check" class="close-menu">
                    <i class="fas fa-times"></i>
                  </label>
                </span>
                <label for="check" class="open-menu">
                  <i class="fas fa-bars"></i>
                </label>
              </ul>

              )}
          </nav>
        { showNotification && (
            <Notification
              isAuthenticated={isAuthenticated}
              notifications={notifications}
            />
        )}
      </div>
    </Fragment>
  );
};

export default Navbar;

{/* <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
     <div className="container">
      <Link
        to="/"
        className="nav-link"
        style={{
          display: "flex",
        }}
      >
        <i
          className="fa-brands fa-slack fa-2x"
          style={{ color: "white", padding: "10px" }}
        ></i>
        <div className="navbar-brand">TechZone</div>
      </Link> 
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-bs-target="#navbarSupportedContent"
        data-bs-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isAuthenticated ? (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item nav-icons-div">
               <Link
                to="/cart"
                className="nav-link"
                style={{ position: "relative" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-cart3"
                  viewBox="0 0 16 16"
                  className="nav-bar-icons"
                  style={{ marginTop: "2px" }}
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                {cartCounter === 0 ? null : (
                  <span className="cart-counter">{cartCounter}</span>
                )}
              </Link> 
            </li>
            <li className="nav-item nav-icons-div">
              {/* <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-bell"
                  viewBox="0 0 16 16"
                  className="nav-bar-icons"
                  onClick={() => handleShowNotification()}
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
                {unreadNotifications === 0 ? null : (
                  <span className="cart-counter">{unreadNotifications}</span>
                )}
              </Link> 
            </li>
            <li className="nav-item">
              <Link to="/techProducts" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={onClickLogout} className="btn btn-outline-light">
                Logout
              </button>
            </li> }
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/techProducts" className="nav-link">
                Products
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  </nav>
  {showNotification && (
    <Notification
      isAuthenticated={isAuthenticated}
      notifications={notifications}
    />
  )}
</div>; */}
