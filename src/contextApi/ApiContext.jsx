import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };


  const NewAddCard = (product, quantity = 1) => {
    updateCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const ItemRemove = (productId) => {
    updateCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      ItemRemove(productId);
      return;
    }

    updateCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const priceAfterDiscount = item.price * (1 - (item.discountPercentage || 0) / 100);
      return total + priceAfterDiscount * item.quantity;
    }, 0);
  };

  const IncressQuantity = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };


  const cartContextValue = {
    cart,
    NewAddCard,
    ItemRemove,
    updateQuantity,
    getCartTotal,
    IncressQuantity,
  };


  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;