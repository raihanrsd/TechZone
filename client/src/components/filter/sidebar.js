import React, { Fragment,useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slider';
import axios from 'axios';

import './filter-css/sidebar.css';

export default function Sidebar({products, setProducts, searchInput, sortBy, sortOrder, Category}) {
    
    const [isLoading, setIsLoading] = useState(true);

    // Search Elements
    const [maxPrice, setMaxPrice] = useState(null); 
    const [categories, setCategories] = useState([]); 
    const [attributes, setAttributes] = useState({});

    // all filters
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [values, setValues] = useState([0, maxPrice]);
    
    // all usestates regarding dropdowns 
    const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(true);
    const [isDropdownPriceOpen, setIsDropdownPriceOpen] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState({});

    // all functions regarding dropdowns
    const toggleDropdown = () => {
        setIsDropdownCategoryOpen(!isDropdownCategoryOpen);
    };
    const toggleDropdownPrice = () => {
        setIsDropdownPriceOpen(!isDropdownPriceOpen); // Toggle the visibility of price dropdown
    };        
    const toggleDropdownAttribute = (attributeName) => {
        setIsDropdownOpen({...isDropdownOpen, [attributeName]: !isDropdownOpen[attributeName]});

        // isDropdownOpen[attributeName] = !isDropdownOpen[attributeName];
        // setIsDropdownOpen(isDropdownOpen);
    }

    // filter API
    const updateProduct = async () => {
        try {
            const categoryParams = selectedCategories.join('&category=');
            const attributesParams = JSON.stringify(selectedAttributes);

            const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/allFilter`, {
                params: {
                    category: categoryParams,
                    minPrice: values[0],
                    maxPrice: values[1],
                    search: searchInput,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    attributes: attributesParams
                }
            });

            console.log(response.data);
            console.log("we are filtering by price");

            setProducts(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        updateProduct();
    }, [values, selectedCategories, searchInput, sortBy, sortOrder, selectedAttributes]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/category`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                const categoryData = await categoryResponse.json();
                setCategories(categoryData);

                const maxPriceResponse = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/maxPrice`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                const maxPriceData = await maxPriceResponse.json();

                setMaxPrice(parseInt(maxPriceData));
                setValues([values[0], parseInt(maxPriceData)]);
                // setSelectedCategories([...selectedCategories,Category]);
                updateProduct()

                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/attribute`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                const data = await response.json();
                
                // Create a new object to update the state
                let updatedAttributes = {};
                let updatedSelectedAttributes = {};
                let updatedIsDropdownOpen = {};
    
                data.forEach((attr) => {
                    const attrName = attr.attribute_name.trim();
                    const attrValue = attr._value;
                    
                    const attrCategory = attr.category_name;
    
                    if(!updatedAttributes[attrName]){
                        updatedAttributes[attrName] = [];
                        updatedSelectedAttributes[attrName] = [];
                        updatedIsDropdownOpen[attrName] = true;
                    }
                    if(attrValue !== null || attrValue !== ""){
                        updatedAttributes[attrName].push({attrValue, attrCategory});
                    }
                    
                    // updatedAttributes[attrName].push(attrValue);
                });
                
                setAttributes(updatedAttributes);
                setSelectedAttributes(updatedSelectedAttributes);
                setIsDropdownOpen(updatedIsDropdownOpen);
                
                console.log("we are fetching the attributes");
                console.log(attributes);
    
                setIsLoading(false); // Move this here to ensure it is set only after setting the state
            } catch (error) {
                console.error(error.message);
            }
        };
    
        fetchAttributes();
    }, []);
    

    // on category checkbox change
    const handleCategoryChange = (category) => {
        const index = selectedCategories.indexOf(category);
        if (index === -1) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            const updatedCategories = [...selectedCategories];
            updatedCategories.splice(index, 1);
            setSelectedCategories(updatedCategories);
        }

        console.log(selectedCategories);
    };
    const handleValuesChange = (newValues) => {
        setValues(newValues);
    } 
    // const handleAttributeChange = (attributeName, attrValue) => {
    //     setSelectedAttributes(prevAttributes => {
    //         const updatedAttributes = { ...prevAttributes }; // Create a copy of the previous state
    //         const index = updatedAttributes[attributeName].indexOf(attrValue);
    //         if (index === -1) {
    //             updatedAttributes[attributeName] = [...updatedAttributes[attributeName], attrValue]; // Add the value if it doesn't exist
    //         } else {
    //             updatedAttributes[attributeName] = updatedAttributes[attributeName].filter(value => value !== attrValue); // Remove the value if it exists
    //         }
    //         return updatedAttributes; // Return the updated state
    //     });
    // };
    const handleAttributeChange = (attributeName, attrValue, categoryName) => {
        console.log(attributes);
        console.log(selectedAttributes);

        setSelectedAttributes(prevAttributes => {
            const updatedAttributes = { ...prevAttributes }; // Create a copy of the previous state
            const index = updatedAttributes[attributeName].findIndex(attr => attr.attrValue === attrValue && attr.attrCategory === categoryName);
            
            if (index === -1) {
                updatedAttributes[attributeName] = [...updatedAttributes[attributeName], { attrValue: attrValue, attrCategory: categoryName }]; // Add the value if it doesn't exist
            } else {
                updatedAttributes[attributeName] = updatedAttributes[attributeName].filter(attr => !(attr.attrValue === attrValue && attr.attrCategory === categoryName)); // Remove the value if it exists
            }
            return updatedAttributes; // Return the updated state
        });
    };
    
    

    // const isPreviousDropdownOpen = (attributeName) => {
    //     // console.log("we are checking if the previous dropdown is open");
    //     // console.log(attributeName);

    //     const attributeKeys = Object.keys(isDropdownOpen);
    //     const attributeIndex = attributeKeys.indexOf(attributeName);
    
    //     if (attributeIndex === -1) {
    //         return false;
    //     }
    //     if(attributeIndex === 0){
    //         return isDropdownPriceOpen;
    //     }

    
    //     const previousAttributeName = attributeKeys[attributeIndex - 1];
    //     // console.log(previousAttributeName);
        
    //     // console.log(isDropdownOpen[previousAttributeName]);
    //     // console.log("-----------------------------------------------");
    //     return isDropdownOpen[previousAttributeName];
    // }

    // function implemented to give the margins to the dropdowns non dynamically, their should be a better way to do this
    const marginSize = (attribute) =>
    {
        // if(attribute === "Battery Capacity")
        // {
        //     return 60;
        // }
        // else if(attribute === "Camera")
        // {
        //     return 190;
        // }
        // else if(attribute === "Color")
        // {
        //     return 670;
        // }
        // else if(attribute === "Connectivity")
        // {
        //     return 90;
        // }
        // else if(attribute === "Display")
        // {
        //     return 440;
        // }
        // else if(attribute === "Noise Cancellation")
        // {
        //     return 90;
        // }
        // else if(attribute === "Processor")
        // {
        //     return 570;
        // }
        // else if(attribute === "RAM")
        // {
        //     return 160;
        // }
        // else if(attribute === "Storage")
        // {
        //     return 370;
        // }
    }

    if(isLoading || maxPrice === null){
        return (
            <Fragment>
            <div>Loading...</div>
            {
                console.log("hi loading")
            }
            </Fragment>
        );
    }

    return(
        <Fragment>
            <div className="side-box">
                <div className="side-box-category">
                    <div className="dropdown">
                        <button className="dropdown-toggle" onClick={() => toggleDropdown()}>
                            Category
                        </button>
                        <div className={`dropdown-content ${isDropdownCategoryOpen ? 'show' : ''}`}>
                            {categories.map(category => (
                                <label key={category.category_id} style={{ marginLeft: '0.5rem', fontSize: '18px' }}>
                                    <input
                                        type="checkbox"
                                        value={category.category_name}
                                        checked={selectedCategories.includes(category.category_name)}
                                        onChange={() => handleCategoryChange(category.category_name)}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    {category.category_name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="side-box-price" >
                    <div className="dropdown"> {/* Price dropdown */}
                        <button className="dropdown-toggle" onClick={toggleDropdownPrice}>
                            Price Range
                        </button>
                        <div className={`dropdown-content ${isDropdownPriceOpen ? 'show' : ''}`}>
                            <div className="slider-container">                                
                                <Slider
                                    className="slider"
                                    value={values}
                                    onChange={handleValuesChange}
                                    min={0}
                                    max={maxPrice}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <input
                                            type="number"
                                            value={values[0]}
                                            onChange={(e) => {
                                                const newValue = Math.max(0, +e.target.value); // Ensure value is not negative
                                                handleValuesChange([newValue, values[1]]);
                                            }}
                                            style={{ width: "70px", background: "#ececec" ,height: "30px", textAlign: "center", verticalAlign: "middle", border:'0' , borderRadius: '20px'}}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            value={values[1]}
                                            onChange={(e) => {
                                                let newValue = Math.max(0, +e.target.value); // Ensure value is not negative
                                                newValue = Math.min(newValue, maxPrice); // Ensure value does not exceed maxPrice
                                                handleValuesChange([values[0], newValue]);
                                            }}
                                            style={{ width: "70px", background: "#ececec"  ,height: "30px", textAlign: "center", verticalAlign: "middle", border:'0' ,borderRadius: '20px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* {Object.keys(attributes).map(attributeName => (
                    <div className={attributeName} style={{  marginBottom: isDropdownOpen[attributeName] ? marginSize(attributeName) : '0px' }}>
                        <div className="dropdown"> 
                            <button className="dropdown-toggle" 
                                    onClick={(e) => {
                                                e.stopPropagation(); 
                                                toggleDropdownAttribute(attributeName);
                                            }}>
                                {attributeName}
                            </button>
                            <div className={`dropdown-content ${isDropdownOpen[attributeName] ? 'show' : ''}`} >
                                {attributes[attributeName].map((attrValue, index) => (
                                    <label key={index} style={{ marginLeft: '0.5rem', fontSize: '18px' }}>
                                        <input
                                            type="checkbox"
                                            value={attrValue}
                                            checked={selectedAttributes[attributeName].includes(attrValue)}
                                            onChange={() => handleAttributeChange(attributeName, attrValue)}
                                            style={{ marginRight: '0.5rem' }}
                                        />
                                        {attrValue}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>    
            ))} */}
            {Object.keys(attributes).map(attributeName => (
                // Check if the attribute is related to the selected categories
                selectedCategories.some(category => 
                    attributes[attributeName].some(attr => attr.attrCategory === category)
                ) && (
                    <div className={attributeName} style={{ marginBottom: isDropdownOpen[attributeName] ? marginSize(attributeName) : '0px' }}>
                        <div className="dropdown"> 
                            <button className="dropdown-toggle" 
                                    onClick={(e) => {
                                                e.stopPropagation(); 
                                                toggleDropdownAttribute(attributeName);
                                            }}>
                                {attributeName}
                            </button>
                            <div className={`dropdown-content ${isDropdownOpen[attributeName] ? 'show' : ''}`} >
                                {/* Filter the attributes based on the selected categories */}
                                {attributes[attributeName].filter(attr => selectedCategories.includes(attr.attrCategory)).map((attr, index) => (
                                    <label key={index} style={{ marginLeft: '0.5rem', fontSize: '18px' }}>
                                        <input
                                            type="checkbox"
                                            value={attr.attrValue}
                                            checked={selectedAttributes[attributeName].some(att => att.attrValue === attr.attrValue && att.attrCategory === attr.attrCategory)}
                                            onChange={() => handleAttributeChange(attributeName, attr.attrValue, attr.attrCategory)}
                                            style={{ marginRight: '0.5rem' }}
                                        />
                                        {
                                            // If the attribute is related to multiple categories, display the category name
                                            attributes[attributeName].filter(a => a.attrValue === attr.attrValue).length > 1 ? 
                                            `${attr.attrValue} (${attr.attrCategory})` : attr.attrValue 
                                        }
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>    
                )
            ))}

            </div>
        </Fragment>
    );
}
