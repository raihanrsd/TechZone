import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const AddProducts = () =>{
    const [formData, setFormData] = useState({
        product_name: '',
        price: '',
        previous_price: '',
        product_description: '',
        product_exerpt: '',
        category_id: '',
        product_img: '',
        visibility_status: false,
        discount_status: true,
        discount: '',
        product_status: false,
        specs: [],
      });

      const [allCategories, setAllCategories] = useState([]);

        // Fetch categories when component mounts
        useEffect(() => {
            const fetchCategories = async () => {
                try {
                const response = await fetch('http://localhost:5000/categories');
                const categories = await response.json();
                setAllCategories(categories);
                } catch (error) {
                    console.error(error.message);
                }
            };

            fetchCategories();
        }, []);

      const { product_name, price, previous_price, product_description, product_exerpt, category_id, product_img, visibility_status, discount_status, discount, product_status, specs } = formData;

      const onChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        console.log(name, newValue);
        setFormData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      };
      

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {product_name, price, previous_price, product_description, product_exerpt, category_id, product_img, visibility_status, discount_status, discount, product_status, specs};
            const response = await fetch("http://localhost:5000/admin/add/product", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            if(parseRes.addStatus){
                toast.success("Product Added Successfully");
                window.location.reload();
            }
            else {
                console.log(parseRes);
                toast.error("Product was not added");
            }
        } catch (err) {
            console.error(err.message);
        }


    }

    const handleAddSpec = () => {
        setFormData((prevData) => ({
          ...prevData,
          specs: [...prevData.specs, {id:uuidv4(), attribute_name: '', _value: '', price_increase: '', stock: '', sold: '', base_spec: false }],
        }));
      };

      const handleSpecChange = (index, e) => {
        const { name, type, checked, value } = e.target;
        const updatedSpecs = [...formData.specs];
    
        if (type === 'checkbox') {
          updatedSpecs[index][name] = checked;
        } else {
          updatedSpecs[index][name] = value;
        }
    
        setFormData((prevData) => ({
          ...prevData,
          specs: updatedSpecs,
        }));
      };

      const handleRemoveSpec = (index) => {
        setFormData((prevData) => {
            const newSpecs = [...prevData.specs];
            newSpecs.splice(index, 1);
            console.log(newSpecs)
            return { ...prevData, specs: newSpecs };
        });
    };

      

    return (
        <Fragment>
            <div className="container m-5">

            </div>
            <h1 className="text-center m-5">Add Products</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="product_name" placeholder="Product Name" className="form-control my-3" value={product_name} onChange={e => onChange(e)} />
                <input type="Number" name="price" placeholder="Price" className="form-control my-3" value={price} onChange={e => onChange(e)} />
                <input type="Number" name="previous_price" placeholder="Previous Price" className="form-control my-3" value={previous_price} onChange={e => onChange(e)} />
                <input type="text" name="product_description" placeholder="Product Description" className="form-control my-3" value={product_description} onChange={e => onChange(e)} />
                <input type="text" name="product_exerpt" placeholder="Product Exerpt" className="form-control my-3" value={product_exerpt} onChange={e => onChange(e)} />
                <label>
                Category:
                <select
                    name="category_id"
                    value={category_id}
                    onChange={(e) => onChange(e)}
                >
                <option value="">Select a Category</option>
                    {allCategories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                        </option>
                    ))}
                    </select>
                </label>
                <input type="text" name="product_img" placeholder="Product Image" className="form-control my-3" value={product_img} onChange={e => onChange(e)} />
                <label>Visibility Status: </label>
                <input type="checkbox" name="visibility_status" className='m-2' value={visibility_status} checked={visibility_status} onChange={e => onChange(e)} />
                <label>Discount Status: </label>
                <input type="checkbox" name="discount_status" className='m-2' value={discount_status} checked={discount_status} onChange={e => onChange(e)} />
                <label>Product Status: </label>
                <input type="checkbox" name="product_status" className='m-2' value={product_status} checked={product_status} onChange={e => onChange(e)} />
                <input type="Number" name="discount" placeholder="Discount" className="form-control my-3" value={discount} onChange={e => onChange(e)} />
                
                <label>
  <h2>Specifications:</h2>
  {formData.specs.map((spec, index) => (
  <div key={spec.id}>
<h4>Specification: {index + 1}</h4>
    <input
      type="text"
      name={'attribute_name'}
      value={spec.attribute_name}
      placeholder="Attribute Name"
      className="form-control my-3"
      onChange={(e) => handleSpecChange(index, e)}
    />
    <input
      type="text"
      name={'_value'}
      value={spec.value}
      placeholder="Value"
      className="form-control my-3"
      onChange={(e) => handleSpecChange(index, e)}
    />
    <input
      type="number"
      name={'price_increase'}
      value={spec.price_increase}
      placeholder="Price Increase"
      className="form-control my-3"
      onChange={(e) => handleSpecChange(index, e)}
    />

<input
      type="number"
      name={'stock'}
      value={spec.stock}
      placeholder="Stock"
      className="form-control my-3"
      onChange={(e) => handleSpecChange(index, e)}
/>
<input
      type="number"
      name={'sold'}
      value={spec.sold}
      placeholder="Sold"
      className="form-control my-3"
      onChange={(e) => handleSpecChange(index, e)}
/>
<label>Base Spec: </label>
<input
      type="checkbox"
      name={'base_spec'}
      value={spec.base_spec}
      placeholder="Sold"
        className="m-3"
      onChange={(e) => handleSpecChange(index, e)}
/>
<button type="button" onClick={() => handleRemoveSpec(index)} className="btn btn-danger btn-block">
                Delete
            </button>
  </div>
))}
  <button type="button" className="btn btn-primary btn-block" onClick={handleAddSpec}>
    Add Specification
  </button>
</label>

                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    );
}

export default AddProducts;