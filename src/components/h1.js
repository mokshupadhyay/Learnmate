// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import { FiUser } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import "./Header.css";
// import "../Assets/LM1.png"; // Import the logo image
// import UserDetails from "./UserDetails"; // Import the UserDetails component

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const [scrolledUp, setScrolledUp] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartItemsCount, setCartItemsCount] = useState(0);
//   const [showCartItems, setShowCartItems] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartDetails, setCartDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);


//   const dropdownRef = useRef(null);

//   // Function to parse JWT token
//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   // Function to fetch cart items count
//   const fetchCartItems = (userId) => {
//     setLoading(true);
//     fetch(`http://localhost:3001/cart-items/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCartItems(data);
//         setCartItemsCount(data.length);
        
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError("Error fetching cart items");
//         setLoading(false);
//       });
//   };
//   // Calculate total price of items in the cart
// useEffect(() => {
//   let totalPrice = 0;
//   cartDetails.forEach((item) => {
//     totalPrice += parseFloat(item.current_price); // Convert to float before adding
//   });
//   console.log("Cart Details:", cartDetails);
//   console.log("Total Price:", totalPrice);
//   setTotalPrice(totalPrice);
// }, [cartDetails]);


//   const handleScroll = () => {
//     const currentScrollPos = window.pageYOffset;
//     const scrolledUpNow = currentScrollPos < prevScrollPos;
//     const scrolledDownNow = currentScrollPos > prevScrollPos;

//     setScrolledUp(scrolledUpNow);
//     setVisible(scrolledUpNow || !scrolledDownNow);

//     setPrevScrollPos(currentScrollPos);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [prevScrollPos, visible]);

//   useEffect(() => {
//     // Function to close dropdown when clicking outside of it
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

  

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     let interval;
  
//     if (token) {
//       const decodedToken = parseJwt(token);
//       setIsLoggedIn(true);
  
//       fetchCartDetails(decodedToken.userDetails.login_id);
//       fetchCartItems(decodedToken.userDetails.login_id);
  
//       // Set up interval to fetch cart items every second
//       interval = setInterval(() => {
//         fetchCartItems(decodedToken.userDetails.login_id);
//       }, 1000);
  
//       // Set up interval to update showCartItems every second
//       interval = setInterval(() => {
//         setShowCartItems(true);
//       }, 1000);
//     } else {
//       setLoading(false); // Set loading to false if user is not logged in
//     }
  
//     return () => clearInterval(interval); // Cleanup function to clear interval
//   }, []);
  
  
  

//   const fetchCartDetails = (userId) => {
//     setLoading(true);
//     fetch(`http://localhost:3001/cart-items/${userId}/cart`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCartDetails(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError("Error fetching cart details");
//         setLoading(false);
//       });
//   };

// // Calculate total price of items in the cart


//   const removeFromCart = (cartItemId, userId) => {
//     fetch(`http://localhost:3001/cart/remove/${cartItemId}`, {
//       method: 'DELETE',
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.message);
//       fetchCartItems(userId);
//       fetchCartDetails(userId);
//     })
//     .catch(error => {
//       console.error('Error removing course from cart:', error);
//       setError("Error removing course from cart");
//     });
//   };

//   const handleCartHover = () => {
//     setShowCartItems(true);
//   };

//   const handleCartLeave = () => {
//     setShowCartItems(false);
//   };


  

//   return (
//     <header
//       style={{
//         top: visible ? "0" : "-100px",
//         transition: "top 0.3s",
//         position: "fixed",
//         width: "100%",
//         zIndex: "100",
//         pointerEvents: visible ? "auto" : "none",
//       }}
//     >
//       <nav>
//         <div className="logo">
//           <img
//             className="learnmate"
//             src={require("../Assets/LM1.png")}
//             alt="LearnMate Logo"
//           />
//           <div className="logoname">LearnMate</div>
//         </div>
//         <div className="menu">
//           <NavLink to="/" className="link" end>
//             Home
//           </NavLink>
//           <NavLink to="/courses" className="link">
//             Courses
//           </NavLink>
//           <NavLink to="/contact" className="link">
//             Contact
//           </NavLink>
//           <NavLink to="/about" className="link">
//             About
//           </NavLink>
//         </div>

//         <div className="registeer">
//           <NavLink to="/cart" onMouseEnter={handleCartHover}
//             onMouseLeave={handleCartLeave} className="link" style={{ color: "white" }}>
//             <AiOutlineShoppingCart />
//             {(cartItemsCount > 0 && <span
//   className="cart-items-count"
//   style={{
//     background: "#ed07e5",
//     color: "#ffffff",
//     width: "auto",
//     fontSize: "16px",
//     padding: "4px 9px",
//     borderRadius: "15px",
//     position: "relative",
//     top: "-5px",
//     right: "-6px",
//     fontWeight: "bolder"
//   }}
// >
//   {cartItemsCount}
// </span>
// )} {showCartItems && (
//   <div className="cart-items-container">
//     {cartDetails.map((item, index) => (
//       <div key={index} className="cart-item">
//         <img src={item.poster} alt={item.course_name} />
//         <div className="cart-item-details">
//           <p className="cart-item-name">{item.course_name}</p>
//           <p className="cart-item-price">Price: ₹{item.current_price}</p>
        
//         </div>
//         {/* <button className="cart-item-remove" onClick={() => removeFromCart(item.course_id, userDetails.login_id)}>Remove</button> */}
//       </div>
//     ))}
//     <div className="total-price">
//       Total: ₹{totalPrice}
//     </div>
//     <NavLink to="/cart" className="go-to-cart-button">Go to Cart</NavLink>
//   </div>
// )}
//           </NavLink>
//           {isLoggedIn ? (
//             <div style={{ position: "relative" }} ref={dropdownRef}>
//               <FiUser
//                 style={{
//                   fontSize: "24px",
//                   color: "gray",
//                   background: "ghostwhite",
//                   width: "130px",
//                   height: "42.9px",
//                   borderRadius: "100%",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//               />
//               {dropdownOpen && <UserDetails />}
//             </div>
//           ) : (
//             <NavLink
//               to="/signup"
//               className="link"
//               style={{ color: "white", width: "130px" }}
//             >
//               Sign-up/Sign-in
//             </NavLink>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;
