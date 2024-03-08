import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import DeleteBox from '../ReUse/DeleteBox';
import PromoEdit from './PromoEdit';




const AdminPromos = () =>{
    const [promos, setPromos] = useState([]);
    const [promoForm, setPromoForm] = useState({
        promoName: '',
        promoDiscount: '',
        promoStatus: '',
        promoStartDate: new Date(),
        promoEndDate: new Date()
    });

    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    useEffect(() =>{
        const getPromoList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/promo/get_promos`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                
                const parseRes = await response.json();

                if(parseRes.authorized){
                    setPromos(parseRes.promos);
                    console.log(parseRes);
                }
                else{
                    toast.error(parseRes.message);
                }
                
            } catch (err) {
                console.error(err.message);
            }
        };

        getPromoList(); // Call the function to fetch products when the component mounts
    }, [])

    const closeEdit = () =>{
        setEditMode(false);
        setSelectedPromo(null);
    }


    const showEdit = (promo) => {
        setSelectedPromo(promo);
        setEditMode(true);
        
    }

    const handleChange = (date, name) => {
        setPromoForm({ ...promoForm, [name]: date });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/promo/add_promo`, {
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(promoForm)
            });

            const parseRes = await response.json();
            if(parseRes.added){
                toast.success(parseRes.message);
                setPromos([...promos, parseRes.promo]);
                setPromoForm({
                    promoName: '',
                    promoDiscount: '',
                    promoStatus: '',
                    promoStartDate: new Date(),
                    promoEndDate: new Date()
                });
            }
            else{
                toast.error(parseRes.message);
            }
        }catch(err){
            console.error(err.message);
        }
    }

    const deleteFunc = (promo) => {
        
        setSelectedPromo(promo);
        setDeleteMode(true);

        
    }

    const handleDelete = async (promo_name) => {
        try {
          const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/promo/delete_promo`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', token: localStorage.token },
            body: JSON.stringify({ promo_name }),
          });
    
          const parseRes = await response.json();
          if (parseRes.deleted) {
            toast.success(parseRes.message);
            setPromos(promos.filter((promo) => promo.promo_name !== promo_name));
            setDeleteMode(false);
            setSelectedPromo(null);
          } else {
            toast.error(parseRes.message);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

      const closeDelete = () =>{
        setDeleteMode(false);
        setSelectedPromo(null);
      }
    return (
        <Fragment>
            <div className='admin-promos-div'>
            <div className='add-promo-div'>
            <form onSubmit={handleSubmit} className='promo-form'>
            <input
              type='text'
              id='promoName'
              name='promoName'
              placeholder='Promo Name'
              value={promoForm.promoName}
              onChange={(e) => handleChange(e.target.value, 'promoName')}
              required
            />

            <input
              type='number'
              id='promoDiscount'
              name='promoDiscount'
              placeholder='Promo Discount'
              value={promoForm.promoDiscount}
              max='100'
              onChange={(e) => handleChange(e.target.value, 'promoDiscount')}
              required
            />

            <input
              type='text'
              id='promoStatus'
              name='promoStatus'
              placeholder='Promo Status'
              value={promoForm.promoStatus}
              onChange={(e) => handleChange(e.target.value, 'promoStatus')}
              required
            />

            <label htmlFor='promoEndDate'>Promo Start Date:</label>
            <DatePicker
              id='promoStartDate'
              selected={promoForm.promoStartDate}
              onChange={(date) => handleChange(date, 'promoStartDate')}
              required
            />

            <label htmlFor='promoEndDate'>Promo End Date:</label>
            <DatePicker
              id='promoEndDate'
              selected={promoForm.promoEndDate}
              onChange={(date) => handleChange(date, 'promoEndDate')}
              required
            />

            <button type='submit' className='promo-form-button'>Add Promo</button>
          </form>
            </div>

            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Promo Name</th>
                        <th>Promo Discount</th>
                        <th>Promo Status</th>
                        <th>Promo Start Date</th>
                        <th>Promo End Date</th>
                        <th>Edit Promo</th>
                        <th>Delete Promo</th>
                    </tr>


                </thead>
                <tbody>
                    {
                        promos && promos.map(promo => {
                            return (
                                <tr key={promo.promo_name}>
                                    <td>{promo.promo_name}</td>
                                    <td>{promo.promo_discount}</td>
                                    <td>{promo.promo_status}</td>
                                    <td>{moment(promo.promo_start_date).format('YYYY-MM-DD')}</td>
                                    <td>{moment(promo.promo_end_date).format('YYYY-MM-DD')}</td>
                                    <td><button className='btn btn-primary' onClick={() => showEdit(promo)} >Edit</button></td>
                                    <td><button className='btn btn-danger' onClick={() => deleteFunc(promo)} >Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            </div>

            {
                deleteMode && selectedPromo && <DeleteBox message={'Are you sure you want to delete this?'} id={selectedPromo.promo_name} deleteFunction={handleDelete} closeDelete={closeDelete}   />
            }

            {
                 selectedPromo && <PromoEdit  closeEdit={closeEdit} promo={selectedPromo} setPromos={setPromos} promos={promos} />
            }
        </Fragment>
    )
}

export default AdminPromos;