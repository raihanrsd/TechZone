import React from "react";
import { Link } from "react-router-dom";

import "../css/PageFooter.css";

const PageFooter = () => {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">
              This is where innovation meets convenience! Prioritizing your needs, we
              offer premium gadgets and electronics. Our commitment includes
              providing a user-friendly environment and a reliable payment
              gateway system. With our top-quality products,...
              <Link
                    to="/about"
                    style={{ color: 'lightblue', margin: '7px',textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#007FFF'}
                    onMouseLeave={(e) => e.target.style.color = 'lightblue'}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Read More
                </Link>
            </p>            
          </div>
          <div class="col-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links ">
              <li>
                <a href="#">Website Design</a>
              </li>
              <li>
                <a href="#">UI Design</a>
              </li>
              <li>
                <a href="#">Web Development</a>
              </li>
              <li>
                <a href="#">Video Editor</a>
              </li>
              <li>
                <a href="#">Theme Creator</a>
              </li>
              <li>
                <a href="#">Templates</a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Contribute</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        <hr class="small" />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-12">
            <p class="copyright-text">
              Copyright © 2024 All Rights Reserved by 
              <Link
                    to="https://www.facebook.com/profile.php?id=100014861868150"
                    style={{ color: 'lightblue', margin: '7px',textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#007FFF'}
                    onMouseLeave={(e) => e.target.style.color = 'lightblue'}
                >
                    Abhishek Roy
                </Link>
              and 
              <Link
                    to="https://www.facebook.com/raihan.rashid.75685"
                    style={{ color: 'lightblue', margin: '7px',textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#007FFF'}
                    onMouseLeave={(e) => e.target.style.color = 'lightblue'}
                >
                    Raihan Rashid
                </Link>
            </p>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <ul class="social-icons">
              <li>
                <a class="facebook" href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a class="twitter" href="#">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a class="dribbble" href="#">
                  <i class="fab fa-dribbble"></i>
                </a>
              </li>
              <li>
                <a class="linkedin" href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;

// import React from "react";
// import { Link } from "react-router-dom";

// const PageFooter = () => {
//   return (
//     <footer className="bg-dark text-light p-4">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4">
//             <h5>About Us</h5>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//               pulvinar nunc a mi efficitur, eget euismod tortor ultrices.
//             </p>
//             <p>
//               Learn more about us <Link to="/about">here</Link>.
//             </p>
//           </div>
//           <div className="col-md-4">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled d-flex flex-row"> {/* Apply flexbox classes */}
//                 <li className="me-3"> {/* Add margin between list items */}
//                 <Link to="/">Home</Link>
//                 </li>
//                 <li className="me-3"> {/* Add margin between list items */}
//                 <Link to="/products">Products</Link>
//                 </li>
//                 <li>
//                 <Link to="/about">About Us</Link>
//                 </li>
//             </ul>
//             </div>

//           <div className="col-md-4 text-md-end">
//             <h5>Contact Us</h5>
//             <p>Email: info@example.com</p>
//             <p>Phone: +1 (555) 123-4567</p>
//           </div>
//         </div>
//         <hr className="my-4" />
//         <div className="row">
//           <div className="col text-center">
//             <p>&copy; 2024 Your Company. All rights reserved.</p>
//           </div>
//         </div>
//         <div className="row mt-3">
//           <div className="col-md-6 text-md-start">
//             <p>Name: Abhishek Roy</p>
//             <p>ID: 2105033</p>
//           </div>
//           <div className="col-md-6 text-md-end">
//             <p>Name: Raihan Rashid</p>
//             <p>ID: 2105046</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default PageFooter;
