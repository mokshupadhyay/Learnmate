// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);  
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };


    

    const fetchCartItems = (userId) => {
      fetch(`http://localhost:3001/cart-items/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCartItemsCount(data.length);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    };

    const fetchCartDetails = (userId) => {
      fetch(`http://localhost:3001/cart-items/${userId}/cart`)
        .then((response) => response.json())
        .then((data) => {
          setCartDetails(data); // Update cart details using context'
          // fetchCartDetails(userId)
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching showcart :", error);

        });
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);

      fetchCartItems(decodedToken.userDetails.login_id);
      fetchCartDetails(decodedToken.userDetails.login_id)




    }
  }, []);

  const updateCartItemsCount = (count) => {
    setCartItemsCount(count);
  };

  const updateCartDetails = (details) => {
    setCartDetails(details);
  };

  return (
    <CartContext.Provider value={{ cartItemsCount, cartDetails, updateCartItemsCount, updateCartDetails}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
