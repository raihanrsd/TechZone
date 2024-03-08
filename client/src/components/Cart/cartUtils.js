// cartUtils.js
export const addToCart = (productId, quantity, specs) => {
    const cart = getCart();
    // console.log("inside add to cart");
    if (cart[productId] == null) {
        cart[productId] = [];
    }

    // console.log("entries");

    // Add a new entry to the cart
    cart[productId].push({ specs, quantity });

    updateCart(cart);
};
  
  export const getCart = () => {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : {};
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

  export const removeSpecFromCart = (productId, specIndex) => {
    const cart = getCart();

    if (cart[productId]) {
        // Remove the entry with the specified index
        cart[productId].splice(specIndex, 1);

        // If there are no more specs for the product, remove the product entry
        if (cart[productId].length === 0) {
            delete cart[productId];
        }
        updateCart(cart);
    }

    
};

export const getTotalItems = () => {
  const cart = getCart();
  return Object.values(cart).reduce((acc, product) => acc + product.length, 0);
}

export const clearCart = () => {
  const cart = {};
  updateCart(cart);
}

  
