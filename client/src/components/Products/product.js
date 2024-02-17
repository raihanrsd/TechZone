import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./product.css";

const Product = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(600);

  const [specs, setSpecs] = useState([]);

  const CustomPrevArrow = (props) => {
    return (
      <button
        {...props}
        className="slick-prev"
        style={{ left: "75px", zIndex: 1 }}
      >
        Previous
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    return (
      <button
        {...props}
        className="slick-next"
        style={{ right: "0", zIndex: 1 }}
      >
        Next
      </button>
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    swipeToSlide: true,
    waitForAnimate: false,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/product/${id}`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        setProduct(parseRes.product);
        const spec_map = {};
        // console.log('comes here');
        for (const spec of product.specs) {
          if (!spec_map[spec.attribute_name]) {
            spec_map[spec.attribute_name] = [];
          }
          // console.log(spec.attribute_name, spec);
          spec_map[spec.attribute_name].push(spec);
        }

        setSpecs(spec_map);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProduct();
  }, []);

  return (
    <Fragment>
      <div className="product-main-div">
        {product ? (
          <div className="product-div" key={product.id}>
            <div
              className="slider-container"
              style={{
                width: 50 + "vw",

                display: display ? "block" : "none",
              }}
            >
              <Slider {...settings}>
                {product.images &&
                  product.images.map((image, index) => (
                    <div key={index} className="slider-image-container">
                      <img
                        src={
                          `http://localhost:${process.env.REACT_APP_SERVER_PORT}` +
                          image.image_url
                        }
                        className="slider-image"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
            <div className="product-info-div">
              <h1 className="card-title">{product.product_name}</h1>
              
                        
              <p className="product-description">
                {product.product_description}
              </p>

              <div className='price-pills'>
                <div className="price-pill">Price: <b>BDT{product.price}</b> </div>
                <div className='price-pill'> Regular Price: <b>BDT{product.previous_price}</b></div>
                <div className='price-pill'> Stock: <b>{product.product_status?'In Stock': 'out of Stock'}</b></div>
                <div className='price-pill'> Product Code: <b>{product.id}</b></div>
                <div className='price-pill'> Brand: <b>{product.category_name}</b></div>
                
              </div>
              <div className='price-pills'>
                
              </div>
                        
              <p className="card-text">{product.description}</p>
              
              <p className="card-text">Stock: {product.category_name}</p>
              {product.specs.map((spec) => {
                return (
                  <p className="card-text">
                    {spec.attribute_name}: {spec._value}
                  </p>
                );
              })}
            </div>
          </div>
        ) : (
          <h1>Product not found</h1>
        )}
      </div>
    </Fragment>
  );
};

export default Product;
