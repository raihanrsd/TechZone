import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import laptop from "../../image/laptop.png";
import phone from "../../image/Iphone.jpg";
import headphone from "../../image/headset5.jpg";
import "../css/product.css";

const ProductCard = (props) => {
    
    const { item } = props;

    let categoryImage;

    // Select image based on Parent_Category
    switch (item.Parent_Category) {
        case "Laptop":
            categoryImage = laptop;
            break;
        case "SmartPhone":
            categoryImage = phone;
            break;
        case "Headgear":
            categoryImage = headphone;
            break;
        default:
            // Default image if category not matched
            categoryImage = laptop;
            break;
    }


    // const sliderSettings = {
    //     dots: true,
    //     infinite: false,
    //     slidesToShow: item.images.length,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     pauseOnHover: true,
    //     initialSlide: 0,
    // };

    return (
        <div className="product-card" style={{backgroundColor: 'lavender' , width: '26rem', height: '32rem', padding : 10, borderRadius: 10}}>
            {/* <Slider {...sliderSettings}>
                {item.images.map((image, index) => (
                    <img key={index} className="product-image" src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}${image.image_url}`} alt="Product" />
                ))}
            </Slider> */}

            {categoryImage && (
                <img className="product-card-img-top" src={categoryImage} alt="Card image" style={{ width: '100%' ,height: '14rem', borderRadius: 10, padding:'0.5rem'}} />
            )}

            <div className="product-details">
                <h3 className="product-title" style={{height: '2.1rem',fontWeight : 700, fontSize : 18}}> {item.product_name}</h3>
                <hr/>
                <b><p className="product-excerpt" style={{height: '2.1rem'}} >{item.product_exerpt}</p></b>
                <p className="product-description" style={{height: '2.1rem'}} >{item.product_description}</p>
                {/* <div className="product-specs">
                    <ul>
                        {item.specs.map((spec, index) => (
                            spec.base_spec ? <li key={index} className="spec">{spec.attribute_name}: {spec._value}</li> : null
                        ))}
                    </ul>
                </div> */}
                <div className="product-footer">
                <hr/>
                <h5 className="text-danger text-center" style={{fontWeight : 700, fontSize : 26, margin : 0}}>${props.item.price}</h5>
                    {/* <button className="btn btn-warning btn-purchase"><FaShoppingCart /> Purchase</button> */}
                <hr/>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
// 