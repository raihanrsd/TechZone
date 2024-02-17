import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCart,
  removeFromCart,
  updateCart,
  removeSpecFromCart,
} from "./cartUtils";

const Cart = ({isAuthenticated}) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const [products, setProducts] = useState();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const body = {
          product_id_list: Object.keys(getCart()),
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

        const product_map = {};
        console.log(prods);
        prods.forEach((product) => {
          // Assuming product.id is the unique identifier
          product_map[product.id] = product;
        });

        console.log(product_map);

        setProducts((prevProducts) => ({
          ...prevProducts,
          ...product_map,
        }));
        // console.log(products);
        console.log("This is the current cart");
        console.log(cart);
      } catch (error) {
        console.error(error.message);
      }
    };

    // console.log(Object.keys(getCart()));
    getAllProducts();
  }, []);

  // Use another useEffect to handle logic dependent on updated state
  useEffect(() => {
    // Calculate total price only if products are available

    let total = 0;
    if (products) {
      console.log("These are all the products");
      console.log(products);
      // console.log(prods);
      console.log(products[14]);
      // console.log("This is quantity list inside")
      // console.log(quantity);
      Object.keys(cart).forEach((product_id) => {
        console.log(product_id);
        const product = products[product_id];
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
  }, [products]);

  const onChange = (e, product_id, index) => {
    let max_addable_qty = 100;
    for (const spec of cart[product_id][index].specs) {
      if (spec.stock < max_addable_qty) {
        max_addable_qty = parseInt(spec.stock);
      }
      console.log(spec.stock);
    }

    const new_qty = e.target.value;
    if (new_qty > max_addable_qty) {
      toast.error(`The maximum quantity you can add is ${max_addable_qty}`);
      return;
    }
    const old_qty = cart[product_id][index].quantity;

    // Find the product with the matching product_id
    const product = products[product_id];

    if (product) {
      let price = product.price;
      cart[product_id][index].specs.map((spec) => {
        //console.log(spec);
        price += parseFloat(spec.price_increase);
      });
      const total = totalPrice + price * (new_qty - old_qty);

      // Update the total price
      setTotalPrice(total);

      // Update the quantity in the cart
      cart[product_id][index].quantity = new_qty;
      setCart(cart);

      // Update the cart on the server or perform other actions
      updateCart(cart);
    } else {
      console.error(`Product with ID ${product_id} not found.`);
    }
  };

  const handleCheckoutClick = () => {
    try{
      if(!isAuthenticated){
        toast.message("Please login to proceed to checkout");
        navigate("/login");
        return;
      }
      for (const product_id in cart) {
        const uniqueSpecs = [];
        // console.log("comes here now");
  
        for (const info of cart[product_id]) {
          const isDuplicate =  uniqueSpecs.some((uniqueSpec) => {
            console.log(JSON.stringify(uniqueSpec.specs));
            console.log(JSON.stringify(info.specs));
            return JSON.stringify(uniqueSpec.specs) === JSON.stringify(info.specs);
          });
  
          console.log(isDuplicate);
          console.log(uniqueSpecs);

          if (!isDuplicate) {
            uniqueSpecs.push(info);
          } else {
            console.log("comes here yahoo");
            for (const uniqueSpec of uniqueSpecs) {
              if (JSON.stringify(uniqueSpec.specs) === JSON.stringify(info.specs)) {
                uniqueSpec.quantity = parseInt(uniqueSpec.quantity) + parseInt(info.quantity);
              }
            }
          }
        }
        cart[product_id] = uniqueSpecs;
        setCart(cart);
        updateCart(cart);
        if(cart && Object.keys(cart).length > 0){
          navigate("/checkout");
        }
        
      }
    }
    catch(err){
      console.error(err.message);
    }
    
  };

  const removeProduct = (product_id, index) => {
    const qty = cart[product_id][index].quantity;
    const product = products[product_id];

    if (product) {
      let price = product.price;

      // Iterate over the specs and update the price
      cart[product_id][index].specs.forEach((spec) => {
        price += parseFloat(spec.price_increase);
      });

      const total = totalPrice - qty * price;

      // Remove the specific item from the cart
      cart[product_id].splice(index, 1);
      removeSpecFromCart(product_id, index);
      setTotalPrice(total);
      setCart(cart);
    } else {
      console.error(`Product with ID ${product_id} not found.`);
    }
  };

  const updateSpec = (product_id, index) => {};

  return (
    <Fragment>
      <h1
        style={{
          marginTop: "100px",
        }}
      >
        Cart
      </h1>
      <div className="container">
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
              Object.keys(cart).length > 0 &&
              products &&
              Object.keys(products).length > 0 ? (
                Object.keys(cart).map((product_id) => {
                  const product = products[product_id];

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
                            {products[product_id].images[0] ? (
                              <img
                                src={
                                  `http://localhost:${process.env.REACT_APP_SERVER_PORT}` +
                                  products[product_id].images[0].image_url
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
                          {products[product_id].product_name}
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
                                <p
                                  className="card-text"
                                  key={`${spec.id}_${index}`}
                                >
                                  {spec.attribute_name}: {spec._value}
                                </p>
                              ))}
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="quantity"
                            min="1"
                            max="100"
                            value={info.quantity}
                            onChange={(e) => onChange(e, product_id, index)}
                          />
                        </td>
                        <td>{products[product_id].price}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeProduct(product_id, index)}
                          >
                            Remove
                          </button>

                          <button
                            className="btn btn-primary"
                            onClick={() => updateSpec(product_id, index)}
                          >
                            Update Spec
                          </button>
                        </td>
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

      <div className="container">
        <div className="row">
          <h2>Total Price: {totalPrice}</h2>
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckoutClick}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
