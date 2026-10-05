// src/ContextFiles/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart data from local storage when user changes
  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart-${user.id}`)) || [];
      setCart(storedCart);
    }
  }, [user]);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const itemExists = prevCart.find(cartItem => cartItem._id === item._id);
      if (itemExists) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) } // Ensure quantity is at least 1
          : item
      )
    );
  };

  const calculateTotals = () => {
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0);
    const totalCoffees = cart.reduce((total, item) => total + item.quantity, 0);
    return { totalAmount, totalCoffees };
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, calculateTotals, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
