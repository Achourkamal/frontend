import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';

// Try to load the cart from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : { list: [], total: 0 };
};

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(), // Initialize cart state with data from localStorage
  }
});

export default store;
