import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCart, clearCart } from "../Cart/cartUtils";

const Checkout = ({setAuth, setReRender, reRender}) => {
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    shippingState: "",
    zipCode: "",
    country: "",
  });
  const [selectedProducts, setSelectedProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [deliveryLocation, setDeliveryLocation] = useState("insideDhaka");
  const [cart, setCart] = useState(getCart());
  const [shippingAddressId, setShippingAddressId] = useState();

   const handlePlaceOrder = async () => {
    // Place order logic here
    // Send the order details to the server
    // Redirect to the order details page
    // e.preventDefault();
    try {
        console.log("Comes to place order function")
      const body = {
        payment_method: paymentMethod,
        delivery_charge: deliveryCharge,
        total_price: totalPrice - discount + deliveryCharge,
        promo_name: promoCode === ""? 'none' : promoCode,
        discount_amount: discount,
        _address: shippingAddress.address,
        city: shippingAddress.city,
        shipping_state: shippingAddress.shippingState,
        zip_code: shippingAddress.zipCode,
        country: shippingAddress.country,
        product_map: selectedProducts,
        cart: cart,
        address_id: shippingAddressId
      };


      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes) {
        toast.success(`Order placed successfully. Your Order id is ${parseRes.order.order_id}`);
        // Redirect to the order details page
        clearCart();
        setCart(getCart());
        setReRender(!reRender);
        navigate("/");
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error(err.message);
    }
   }

  // Function to handle promo code apply button click
  const handleApplyPromoCode = async () => {
    // Apply promo code logic here
    // Update the discount state based on the applied promo code
    // Recalculate the total price
    try {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/promo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify({ promo_name: promoCode }),
        }
      );

      const parseRes = await response.json();
      const promo = parseRes.promo;
      console.log(promo);
      if (promo) {
        setDiscount(promo.promo_discount * totalPrice / 100);
        toast.success("Promo code applied successfully");
      } else {
        toast.error("Invalid promo code");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to handle delivery location change
  const handleDeliveryLocationChange = (location) => {
    if (location === "insideDhaka") {
      setDeliveryCharge(0);
      setDeliveryLocation(location);
    } else if (location === "outsideDhaka") {
      setDeliveryCharge(500);
        setDeliveryLocation(location);
    }
  };


  const onChange = e => {
    setShippingAddress({...shippingAddress, [e.target.name]: e.target.value})
    setShippingAddressId(-1);
    console.log("Comes to change function")
    console.log(shippingAddressId);
  }
  // Function to handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };



  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const body = {
          product_id_list: Object.keys(cart),
        };
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/products/cart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
            body: JSON.stringify(body),
          }
        );



        const parseRes = await response.json();
        const prods = parseRes.products;

        const address_response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/shipping_address`, {
            method: "GET",
            headers: { token: localStorage.token },
        });

        const address_parseRes = await address_response.json();
        const shipping_addresses = address_parseRes.addresses;
        if(shipping_addresses){
            setShippingAddresses(shipping_addresses);
        }

        const product_map = {};
        console.log(prods);
        prods.forEach((product) => {
          // Assuming product.id is the unique identifier
          product_map[product.id] = product;
        });

        setSelectedProducts((prevProducts) => ({
          ...prevProducts,
          ...product_map,
        }));
        // console.log(products);
      } catch (error) {
        console.error(error.message);
      }
    };

    // console.log(Object.keys(getCart()));
    getAllProducts();
  }, [cart]);

  const changeFormData = (e) => {
    console.log("enter the dragon");
    const index = e.target.value;
    
    if(index === ""){
        setShippingAddress({
            address: "",
            city: "",
            shippingState: "",
            zipCode: "",
            country: "",
        });
        setShippingAddressId(-1);
        return;
    }
    if (shippingAddresses && shippingAddresses.length > 0) {
        const shippingAddress = {
            city: shippingAddresses[index].city,
            shippingState: shippingAddresses[index].shipping_state,
            zipCode: shippingAddresses[index].zip_code,
            country: shippingAddresses[index].country,
            address: shippingAddresses[index]._address,
        }
        setShippingAddress(shippingAddress);
        setShippingAddressId(parseInt(shippingAddresses[index].address_id));
        console.log(shippingAddressId);
        // console.log(shippingAddresses[index].address_id);
    }
  }

  useEffect(() => {
    // Calculate total price only if products are available

    let total = 0;
    if (selectedProducts) {
      console.log("These are all the products");
      console.log(selectedProducts);

      Object.keys(cart).forEach((product_id) => {
        console.log(product_id);
        const product = selectedProducts[product_id];
        let price = product.price;
        console.log("price");
        console.log(price);
        if (product) {
          cart[product_id].forEach((info) => {
            if (info && info.spec) {
              info.spec.forEach((spec) => {
                // Check if both price and quantity are present in the info object
                price += spec.price_increase;
              });
            }
            total += price * info.quantity;
          });
        }
      });
      setTotalPrice(total);
    }
  }, [selectedProducts]);

  return (
    <Fragment>
        <div className="m-5">
            <h1>Checkout</h1>
        </div>
        <div className="container">
            {shippingAddresses.length > 0 ? (
                <select
                    id="shippingAddress"
                    className="form-control"
                    value={shippingAddress.id}
                    onChange={(e) => changeFormData(e)}
                >
                    <option value="">Select a shipping address</option>
                    {shippingAddresses.map((address, index) => (
                        <option key={address.id} value={index}>
                            {address._address}, {address.city}, {address.zipCode}
                        </option>
                    ))}
                </select>
            ) : (
                <p>No shipping addresses available</p>
            )}
        </div>
      <form className="container">
        <label htmlFor="address">Address:</label>
        <input required
            type="text"
            id="address"
            placeholder="Address"
            name="address"
            value={shippingAddress.address}
            className="form-control"
            onChange={(e) =>
                onChange(e)
            }
        />
        <label htmlFor="city">City:</label>
        <input required
          type="text"
          id="city"
          placeholder="City"
            name="city"
          value={shippingAddress.city}
          className="form-control"
          onChange={(e) =>
            onChange(e)
          }
        />
        <label htmlFor="shippingState">Shipping State:</label>
        <input required
          type="text"
          id="shippingState"
          placeholder="Shipping State"
            name="shippingState"
          value={shippingAddress.shippingState}
          className="form-control"
          onChange={(e) =>
            onChange(e)
          }
        />
        <label htmlFor="zipCode">Zip Code:</label>
        <input required
          type="text"
          id="zipCode"
          placeholder="Zip Code"
            name="zipCode"
          value={shippingAddress.zipCode}
          className="form-control"
          onChange={(e) =>
            onChange(e)
          }
        />
        <label htmlFor="country">Country:</label>
        <input required
          type="text"
          id="country"
          placeholder="Country"
            name="country"
          className="form-control"
          value={shippingAddress.country}
          onChange={(e) =>
            onChange(e)
          }
        />
      </form>

      <div className="container">
        <div className="container">
          <div className="row">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                Object.keys(cart).length > 0 &&
                selectedProducts &&
                Object.keys(selectedProducts).length > 0 ? (
                  Object.keys(cart).map((product_id) => {
                    const product = selectedProducts[product_id];

                    // Check if the product exists
                    if (!product) {
                      console.error(`Product with ID ${product_id} not found.`);
                      return null; // or handle the missing product as needed
                    }

                    return cart[product_id].map((info, index) => {
                      if (!info) {
                        console.error(
                          `Info for product with ID ${product_id} at index ${index} is undefined.`
                        );
                        return null; // or handle the missing info as needed
                      }
                      // console.log(info);
                      return (
                        <tr key={`${product_id}-${index}`}>
                          <td>
                            <div className="cart-img-div">
                              {selectedProducts[product_id].images[0] ? (
                                <img
                                  src={
                                    `http://localhost:${process.env.REACT_APP_SERVER_PORT}` +
                                    selectedProducts[product_id].images[0]
                                      .image_url
                                  }
                                  className="card-img-top"
                                  alt="..."
                                />
                              ) : (
                                <img
                                  src="/images/Product/test.png"
                                  className="card-img-top"
                                  alt="..."
                                />
                              )}
                            </div>
                          </td>
                          <td>
                            {selectedProducts[product_id].product_name}
                            <div
                              style={{
                                maxHeight: "100px",
                                overflowY: "scroll",
                                backgroundColor: "white",
                              }}
                            >
                              <h5>Specs: </h5>
                              {info.specs &&
                                info.specs.map((spec) => (
                                  <span
                                    className="card-text"
                                    key={`${spec.id}_${index}`}
                                  >
                                    {spec._value} &nbsp;
                                  </span>
                                ))}
                            </div>
                          </td>
                          <td>
                            <p>{info.quantity}</p>
                          </td>
                          <td>BDT {selectedProducts[product_id].price}</td>
                        </tr>
                      );
                    });
                  })
                ) : (
                  <h2>No Products</h2>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <label>Total Price:</label>
          <div>
            <p>Product Price: BDT{totalPrice}</p>
            <p>Discount: BDT{discount}</p>
            <p>Delivery Charge: BDT{deliveryCharge}</p>
            <p>Total: BDT{totalPrice - discount + deliveryCharge}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <form>
          <label htmlFor="promoCode">Promo Code:</label>
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleApplyPromoCode();
            }}
          >
            Apply Promo Code
          </button>
        </form>

        <div className="container">
          <label>Delivery Location:</label>
          <div>
            <input
              type="radio"
              id="insideDhaka"
              name="deliveryLocation"
              value="insideDhaka"
              checked={deliveryLocation === "insideDhaka"}
              onChange={() => handleDeliveryLocationChange("insideDhaka")}
            />
            <label htmlFor="insideDhaka">Inside Dhaka</label>
          </div>
          <div>
            <input
              type="radio"
              id="outsideDhaka"
              name="deliveryLocation"
              value="outsideDhaka"
              checked={deliveryLocation === "outsideDhaka"}
              onChange={() => handleDeliveryLocationChange("outsideDhaka")}
            />
            <label htmlFor="outsideDhaka">Outside Dhaka</label>
          </div>
        </div>
        <div>
          <label>Payment Method:</label>
          <div>
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="Online Payment"
              checked={paymentMethod === "Online Payment"}
              onChange={() => handlePaymentMethodChange("Online Payment")}
            />
            <label htmlFor="creditCard">Online Payment</label>
          </div>
          <div>
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="Cash On Delivery"
              checked={paymentMethod === "Cash On Delivery"}
              onChange={() => handlePaymentMethodChange("Cash On Delivery")}
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
        </div>
      </div>
      <button
        type="button"
        {...cart && cart.length == 0 ? "disabled" : ""}
        onClick={()=>handlePlaceOrder()}
        className='btn btn-primary'
      >Place Order</button>
    </Fragment>
  );
};

export default Checkout;
