import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Header.css";
import "../Assets/LM1.png"; // Import the logo image
import UserDetails from "./UserDetails"; // Import the UserDetails component
import { useCart } from "../context/CartContext";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolledUp, setScrolledUp] = useState(true);
  const [showCartItems, setShowCartItems] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showUserDetails, setShowUserDetails] = useState(false); // New state for UserDetails visibility
  const [cartIsEmpty, setCartIsEmpty] = useState(false); // New state for cart empty status
  const { cartItemsCount, cartDetails } = useCart();

  const dropdownRef = useRef(null);

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = parseJwt(token);
      setIsLoggedIn(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    cartDetails.forEach((item) => {
      totalPrice += parseFloat(item.current_price); // Convert to float before adding
    });
    setTotalPrice(totalPrice);
    setCartIsEmpty(cartItemsCount === 0);
  }, [cartDetails, cartItemsCount]);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const scrolledUpNow = currentScrollPos < prevScrollPos;
    const scrolledDownNow = currentScrollPos > prevScrollPos;

    setScrolledUp(scrolledUpNow);
    setVisible(scrolledUpNow || !scrolledDownNow);

    setPrevScrollPos(currentScrollPos);
  };

  const handleCartHover = () => {
    setShowCartItems(true);
  };

  const handleCartLeave = () => {
    setShowCartItems(false);
  };

  const handleUserHover = () => {
    setShowUserDetails(true);
  };

  const handleUserLeave = () => {
    setShowUserDetails(false);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img
            className="learnmate"
            src={require("../Assets/LM1.png")}
            alt="LearnMate Logo"
          />
          <div className="logoname">LearnMate</div>
        </div>
        <div className="menu">
          <NavLink to="/" className="link" end>
            Home
          </NavLink>
          <NavLink to="/courses" className="link">
            Courses
          </NavLink>
          <NavLink to="/contact" className="link">
            Contact
          </NavLink>
          <NavLink to="/about" className="link">
            About
          </NavLink>
        </div>

        <div className="registeer">
          <NavLink
            to="/cart"
            onMouseEnter={handleCartHover}
            onMouseLeave={handleCartLeave}
            className="link"
            style={{ color: "white" }}
          >
            <AiOutlineShoppingCart />
            {cartItemsCount > 0 && (
              <span
                className="cart-items-count"
                style={{
                  background: "#ed07e5",
                  color: "#ffffff",
                  width: "auto",
                  fontSize: "15px",
                  padding: "3px 5px",
                  borderRadius: "15px",
                  position: "relative",
                  top: "-5px",
                  right: "-6px",
                  fontWeight: "bolder",
                }}
              >
                {cartItemsCount}
              </span>
            )}
            {showCartItems && (
              <div className="cart-items-containerout">
                {cartIsEmpty ? (
                  <div className="empty-cart-message">
                    {" "}
                    Your Cart is empty
                    <div style={{ textAlign: "center" }}>
                      <NavLink
                        style={{
                          fontFamily: "var(--font-stack-heading)",
                          fontWeight: "700",
                          fontSize: "10px",
                          color: "#5624d0",
                          border: "none",
                          background: "transparent",
                          display: "block",
                          textDecoration: "none",
                        }}
                        to="/courses"
                      >
                        Start Shopping
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="cart-items-containerin">
                      {cartDetails.map((item, index) => (
                        <div key={index} className="cart-item">
                          <img src={item.poster} alt={item.course_name} />
                          <div className="cart-item-details">
                            <p className="cart-item-name">
                              {item.course_name.length > 30
                                ? `${item.course_name.substring(0, 20)}...`
                                : item.course_name}
                            </p>
                            <p className="cart-item-price">
                              Price: ₹{item.current_price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="shadtop">
                      <div className="total-price">Total: ₹{totalPrice}</div>
                      <NavLink
                        to="/cart"
                        onClick={handleCartLeave}
                        className="go-to-cart-button"
                      >
                        Go to Cart
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            )}
          </NavLink>
          {isLoggedIn ? (
            <div
              onMouseEnter={handleUserHover}
              onMouseLeave={handleUserLeave}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
              ref={dropdownRef}
            >
              <FiUser
                style={{
                  fontSize: "24px",
                  color: "gray",
                  background: "ghostwhite",
                  width: "130px",
                  height: "42.9px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              />
              {showUserDetails && <UserDetails />}
            </div>
          ) : (
            <NavLink
              to="/signup"
              className="link"
              style={{ color: "white", width: "130px" }}
            >
              Sign-up/Sign-in
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
