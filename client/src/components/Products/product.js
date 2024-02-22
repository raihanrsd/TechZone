import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./product.css";
import { addToCart } from "../Cart/cartUtils";
import ReviewComponent from "./review";
import ReviewList from "./ReviewList";
import QaAddComponent from "./QA_Add";
import QaListComponent from "./QA_List";


const Product = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [display, setDisplay] = useState(true);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [specs, setSpecs] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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
    initialSlide: 0,
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
        setTotalPrice(parseFloat(parseRes.product.price));
      } catch (err) {
        console.error(err.message);
      }
    };

    // Fetch reviews from your API
    const fetchReviews = async () => {
        try {
          const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/review/${id}`);
          const data = await response.json();
          setReviews(data);
          console.log('reviews', data);
        } catch (error) {
          console.error('Error fetching reviews:', error.message);
        }
      };

      const fetchQuestions = async () => {
        try {
          const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/qa/question/${id}`);
          const data = await response.json();
          setQuestions(data.questions);
          console.log('questions', data);

        } catch (error) {
          console.error('Error fetching questions:', error.message);
        }
      }
  
    getProduct();
    fetchReviews();
    fetchQuestions();
  }, [id]);

  const onQuestionSubmit = async(question) => {
    try{
        const body = {
            question: question.question,
            product_id: question.product_id,
        }
        const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/qa/question`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
            },
            body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
        setQuestions(parseRes.questions);
        toast.success("Question added successfully");
    }catch(err){
      console.error(err.message);
    }
  }


  
  
  useEffect(() => {
    if (product && product.specs) {
      const spec_map = {};
      const selectedSpecsArray = [];
      for (const spec of product.specs) {
        if (!spec_map[spec.attribute_name]) {
          spec_map[spec.attribute_name] = [];
        }
        spec_map[spec.attribute_name].push(spec);
        if (spec.base_spec) {
          selectedSpecsArray.push(spec);
        }
      }
      if(selectedSpecs.length === 0){
        setSelectedSpecs((prevSelectedSpecs) => [
            ...prevSelectedSpecs,
            ...selectedSpecsArray,
          ]);
      }
      
      setSpecs(spec_map);
    //   console.log('selecte dspecs', selectedSpecsArray);
    //   console.log('selecte dspecs', selectedSpecs);
    }
  }, [product]);

  useEffect(() => {
    // This will run whenever selectedSpecs changes
    console.log('selectedSpecs updated:', selectedSpecs);
  
    // Perform any additional actions here...
  
  }, [selectedSpecs]);
  

//   useEffect(() => {
//     console.log(specs);
//   }, [specs]);

//   useEffect(() => {
//     console.log("Updated totalPrice:", totalPrice);
//   }, [totalPrice]);

  const addToCartFunc = async (id, specs) => {
    addToCart(id, 1, specs);
    toast.success("Product added to Cart")
  }

  const handleSpecAdd = (specName, spec_id) => {
    let previous_price = 0;
    const updatedSpecs = selectedSpecs.map((spec) => {
        //console.log(specName, spec);
        

        if (spec.attribute_name !== specName) {
            // Check if the current spec does not match the one to be updated
            return spec; // Keep the other specs unchanged
        }
       
        previous_price = parseFloat(spec.price_increase);
        
        
        // Return null or any value since this spec should be removed
        return spec;
    });
    
    // Filter out null values

    const filteredUpdatedSpecs = updatedSpecs.filter((spec) => spec.attribute_name !== specName);
    
    // Add the new spec with the given spec_id and specName
    const newSpec = specs[specName].find((spec) => spec.id === spec_id && spec.attribute_name === specName);
    setTotalPrice(totalPrice + parseFloat(newSpec.price_increase) - previous_price);
    setSelectedSpecs([...filteredUpdatedSpecs, newSpec]);
    console.log('change-done');
  }

  const onReviewSubmit = async(review) => {
    try{
        const body = {
            review: review.comment,
            rating: review.rating,
            product_id: review.product_id,
        }
        const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/review`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
            },
            body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
        setReviews(parseRes.reviews);
        toast.success("Review added successfully");
    }catch(err){
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <div className="product-main-div">
        {product ? (
            
          <div className="product-div" key={product.id}>
            <div className='product-inner-main-div'>
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

              <div className="price-pills">
                <div className="price-pill">
                  Price: <b>BDT{product.price}</b>{" "}
                </div>
                <div className="price-pill">
                  {" "}
                  Regular Price: <b>BDT{product.previous_price}</b>
                </div>
                <div className="price-pill">
                  {" "}
                  Stock:{" "}
                  <b>{product.product_status ? "In Stock" : "out of Stock"}</b>
                </div>
                <div className="price-pill">
                  {" "}
                  Product Code: <b>{product.id}</b>
                </div>
                <div className="price-pill">
                  {" "}
                  Brand: <b>{product.category_name}</b>
                </div>
              </div>
              <div className="price-pills"></div>

              <p className="card-text">{product.description}</p>

              {/* {product.specs.map((spec) => {
                return (
                  <p className="card-text">
                    {spec.attribute_name}: {spec._value}
                  </p>
                );
              })} */}

            
            </div>
            </div>
            <div className='product-page-lower-div'>
            <div className='review-div'>
                <ReviewComponent product_id={id} onReviewSubmit={onReviewSubmit} /> 
                <ReviewList reviews={reviews} product_id={id} setReview={setReviews} />
                <QaAddComponent product_id={id} onQuestionSubmit={onQuestionSubmit} />
                <QaListComponent questions={questions} product_id={id} />
            </div>
            <div className='spec-div'>
              <h2>Choose Your Configuration</h2>
              {specs ?
                Object.entries(specs).map(([specName, specArray]) => (
                    <Fragment>
                    <h4>{specName}</h4>
                  <div key={specName} className='individual-spec'>
                    
                    {specArray.map((s, index) => (
                        <div className={`spec-box ${selectedSpecs && selectedSpecs.some((selectedSpec) => selectedSpec.id === s.id) ? 'active' : ''}`} onClick={() => handleSpecAdd(s.attribute_name, s.id)}>
                      <p key={index} className="spec-value">
                        {s._value}
                      </p>
                      <p>+{s.price_increase}</p>
                      </div>
                    ))}
                  </div>
                  </Fragment>
                )) : null} 
                <div className='buy-div'>
                <h2>Buy Now</h2>
                <button className='btn btn-primary' onClick={() => addToCartFunc(product.id, selectedSpecs)}>Add to Cart</button>
                Total Price: <b>BDT {totalPrice}</b>
                </div>
            </div>
            

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
