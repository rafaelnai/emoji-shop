import React, { createContext, useState } from "react";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {}
});

function CartProvider(props) {
  const [cart, setCart] = useState([]);

  const addToCart = product => setCart([...cart, product]);
  const removeFromCart = id => setCart(cart.filter(item => item.id !== id));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
