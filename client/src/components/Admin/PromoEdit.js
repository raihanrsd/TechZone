import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

const PromoEdit = ({ closeEdit, promo, setPromos, promos }) => {
  const initialFormState = {
    promoName: promo.promo_name,
    promoDiscount: promo.promo_discount,
    promoStatus: promo.promo_status,
    promoStartDate: promo.promo_start_date,
    promoEndDate: promo.promo_end_date,
  };

  const [promoForm, setPromoForm] = React.useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoForm({ ...promoForm, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setPromoForm({ ...promoForm, [name]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/promo/update_promo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', token: localStorage.token },
        body: JSON.stringify(promoForm),
      });

      const parseRes = await response.json();
      if (parseRes.updated) {
        toast.success(parseRes.message);
        setPromoForm(initialFormState);
        setPromos((prevPromos) =>
                prevPromos.map((promo) =>
                promo === parseRes.promo ? parseRes.promo : promo
        )
  );
        closeEdit();
      } else {
        toast.error(parseRes.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="edit-form-overlay">
        <div className="edit-form-container">
          <form onSubmit={handleSubmit} className="promo-form">
            <input
              type="text"
              id="promoName"
              name="promoName"
              placeholder="Promo Name"
              value={promoForm.promoName}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              id="promoDiscount"
              name="promoDiscount"
              placeholder="Promo Discount"
              value={promoForm.promoDiscount}
              max="100"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              id="promoStatus"
              name="promoStatus"
              placeholder="Promo Status"
              value={promoForm.promoStatus}
              onChange={handleChange}
              required
            />

            <label htmlFor="promoStartDate">Promo Start Date:</label>
            <DatePicker
              id="promoStartDate"
              selected={promoForm.promoStartDate}
              onChange={(date) => handleDateChange(date, 'promoStartDate')}
              required
            />

            <label htmlFor="promoEndDate">Promo End Date:</label>
            <DatePicker
              id="promoEndDate"
              selected={promoForm.promoEndDate}
              onChange={(date) => handleDateChange(date, 'promoEndDate')}
              required
            />

            <button type="submit" className='promo-form-button'>Edit Promo</button>
          </form>

          <div className="btn_bar">
            <button className="promo-form-button" onClick={() => closeEdit()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PromoEdit;
