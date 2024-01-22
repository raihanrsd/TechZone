import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () =>{
    const [formData, setFormData] = useState({
        "category_name": "",
        "category_description": "",
        "category_img": "",
        "visibility_status": false,
        "parent_category_id" : null,
    })
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/categories", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                // console.log(parseRes);
                setCategories(parseRes);
            } catch (err) {
                console.error(err.message);
            }
        };

        getCategories(); // Call the function to fetch products when the component mounts
    }, []);


    const { category_name, category_description, category_img, visibility_status, parent_category_id } = formData;

    const onChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        console.log(name, newValue);
        setFormData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      }
    

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {category_name, category_description, category_img, visibility_status, parent_category_id};
            const response = await fetch("http://localhost:5000/admin/add/category", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if(parseRes.addStatus){
                toast.success("Category Added Successfully");
            }
            else{
                toast.error(parseRes.message);
            }
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className='text-center m-5'>Add Category</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="category_name" placeholder="Category Name" className="form-control my-3" value={category_name} onChange={e => onChange(e)} />
                <input type="text" name="category_description" placeholder="Category Description" className="form-control my-3" value={category_description} onChange={e => onChange(e)} />
                <input type="text" name="category_img" placeholder="Category Image" className="form-control my-3" value={category_img} onChange={e => onChange(e)} />
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="visibility_status" checked={visibility_status} onChange={e => onChange(e)} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Visibility Status
                    </label>
                </div>
                <select className="form-select" name="parent_category_id" aria-label="Default select example" onChange={e => onChange(e)}>
                    <option selected>Parent Category</option>
                    {categories.map(category => (
                        <option value={category.category_id} key={category.category_id}>{category.category_name}</option>
                    ))}
                </select>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    )
}

export default AddCategory;