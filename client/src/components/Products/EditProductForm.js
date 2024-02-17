// EditForm.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const EditForm = ({ product, onClose, onSubmit }) => {
  const [editedData, setEditedData] = useState({
    product_name: product.product_name,
    price: product.price,
    previous_price: product.previous_price,
    product_description: product.product_description,
    product_exerpt: product.product_exerpt,
    category_id: product.category_id,
    product_img: product.product_img,
    visibility_status: product.visibility_status,
    discount_status: product.discount_status,
    discount: product.discount,
    product_status: product.product_status,
    specs: product.specs,
    id: product.id
    // Add other fields based on your product structure
  });

  const [allCategories, setAllCategories] = useState([]);

        // Fetch categories when component mounts
        useEffect(() => {
            const fetchCategories = async () => {
                try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/categories`);
                const categories = await response.json();
                setAllCategories(categories);
                } catch (error) {
                    console.error(error.message);
                }
            };

            fetchCategories();
    }, []);

    const specifySpecs = (specs) => {
        const newSpecs = specs.map((spec) => ({
          ...spec,
          new_info: false,
        }));
        return newSpecs;
    }
    
    useEffect(() => {
        setEditedData((prevData) => ({
          ...prevData,
          specs: specifySpecs(product.specs),
        }));
    }, []);

    const handleAddSpec = () => {
        setEditedData((prevData) => ({
          ...prevData,
          specs: [...prevData.specs, {id:uuidv4(), attribute_name: '', _value: '', price_increase: '', stock: '', sold: '', base_spec: false, new_info: true }],
        }));
      };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        console.log(name, newValue);
        setEditedData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
  };

    const handleSpecChange = (index, e) => {
        const { name, type, checked, value } = e.target;
        const updatedSpecs = [...editedData.specs];
    
        if (type === 'checkbox') {
          updatedSpecs[index][name] = checked;
        } else {
          updatedSpecs[index][name] = value;
        }
    
        setEditedData((prevData) => ({
          ...prevData,
          specs: updatedSpecs,
        }));
    }

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the editedData if needed
    onSubmit(editedData);
    onClose();
  };

  const handleRemoveSpec = (index) => {
    setEditedData((prevData) => {
        const newSpecs = [...prevData.specs];
        newSpecs.splice(index, 1);
        console.log(newSpecs)
        return { ...prevData, specs: newSpecs };
    });
};

  return (
    <div className="edit-form-overlay">
        <div className="edit-form-container">
        <h1>Edit Product</h1>
        <button className="btn btn-danger close-button" onClick={handleClose}>
          X
        </button>
      <form onSubmit={handleSubmit}>
        {/* Add form fields here */}
        <label>Product Name:</label>
        <input
          type="text"
          name="product_name"
          value={editedData.product_name}
          className='form-control my-3'
          onChange={handleChange}
        />
        <label>Product Price:</label>
        <input
          type="number"
          name="price"
          value={editedData.price}
          className='form-control my-3'
          onChange={handleChange}
        />
        <label>Product Previous Price:</label>
        <input
          type="number"
          name="previous_price"
          value={editedData.previous_price}
          className='form-control my-3'
          onChange={handleChange}
        />

        <label>Product Description:</label>
        <input
          type="text"
          name="product_description"
          value={editedData.product_description}
          className='form-control my-3'
          onChange={handleChange}
        />

        <label>Product Exerpt:</label>
        <input
          type="text"
          name="product_description"
          value={editedData.product_exerpt}
          className='form-control my-3'
          onChange={handleChange}
        />

        <label>
                Category:
                <select
                    name="category_id"
                    value={editedData.category_id}
                    onChange={(e) => handleChange(e)}
                >
                <option value="">Select a Category</option>
            {allCategories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                {category.category_name}
                </option>
            ))}
            </select>
        </label>
        <label>Visibility Status: </label>
        <input type="checkbox" name="visibility_status" className='m-2' value={editedData.visibility_status} checked={editedData.visibility_status} onChange={e => handleChange(e)} />
        <label>Discount Status: </label>
        <input type="checkbox" name="discount_status" className='m-2' value={editedData.discount_status} checked={editedData.discount_status} onChange={e => handleChange(e)} />
        <label>Product Status: </label>
        <input type="checkbox" name="product_status" className='m-2' value={editedData.product_status} checked={editedData.product_status} onChange={e => handleChange(e)} />

        <label>Discount:</label>
        <input
          type="number"
          name="discount"
          value={editedData.discount}
          className='form-control my-3'
          onChange={handleChange}
        />

        {editedData.specs.map((spec, index) => (
        <div key={spec.id}>
            <h4>Specification: {index + 1}</h4>
            <label>Attribute Name: </label>
            <input
            type="text"
            name={'attribute_name'}
            value={spec.attribute_name}
            placeholder="Attribute Name"
            className="form-control my-3"
            onChange={(e) => handleSpecChange(index, e)}
            />
            <label>Value: </label>
            <input
            type="text"
            name={'_value'}
            value={spec._value}
            placeholder="Value"
            className="form-control my-3"
            onChange={(e) => handleSpecChange(index, e)}
            />

            <label>Price Increase: </label>
            <input
            type="number"
            name={'price_increase'}
            value={spec.price_increase}
            placeholder="Price Increase"
            className="form-control my-3"
            onChange={(e) => handleSpecChange(index, e)}
            />

            <label>Stock: </label>
            <input
            type="number"
            name={'stock'}
            value={spec.stock}
            placeholder="Stock"
            className="form-control my-3"
            onChange={(e) => handleSpecChange(index, e)}
            />
            
            <label>Sold: </label>
            <input
            type = "number"
            name={'sold'}
            value={spec.sold}
            placeholder="Sold"
            className="form-control my-3"
            onChange={(e) => handleSpecChange(index,e)}
            />

            <label>Base Spec: </label>
            <input
                type="checkbox"
                name={'base_spec'}
                value={spec.base_spec}
                checked={spec.base_spec}
                placeholder="Sold"
                className="m-3"
                onChange={(e) => handleSpecChange(index, e)}
            />

            <button type="button" onClick={() => handleRemoveSpec(index)} className="btn btn-danger btn-block">
                Delete
            </button>   
        </div>

        ))}

        
        <div className='btn_bar'>
            <button type="button" className="btn btn-primary" onClick={handleAddSpec}>
                Add Specification
            </button>
            <button type="submit" className="btn btn-success" >Submit</button>
        </div>
        
        
      </form>
    </div>
    </div>
  );
};

export default EditForm;
