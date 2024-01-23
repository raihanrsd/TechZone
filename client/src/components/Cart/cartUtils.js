// cartUtils.js
export const addToCart = (productId, quantity) => {
    const cart = getCart() || {};
    cart[productId] = (cart[productId] || 0) + quantity;
    updateCart(cart);
  };
  
  export const getCart = () => {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : null;
  };
  
  export const updateCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };


  export const removeFromCart = (productId) => {
    const cart = getCart() || {};
    console.log(cart, productId);
    delete cart[productId];
    console.log(cart, productId)
    updateCart(cart);
  }

  
