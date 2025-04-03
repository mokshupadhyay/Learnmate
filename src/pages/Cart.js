import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';
import '../components/cart.css'; // Import the CSS file used in the course page;
import "../Assets/delete.png"

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserDetails(decodedToken.userDetails);
      fetchCartItems(decodedToken.userDetails.login_id);
      fetchCartDetails(decodedToken.userDetails.login_id);
    } else {
      setLoading(false); // Set loading to false if user is not logged in
    }
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const fetchCartItems = (userId) => {
    setLoading(true);
    fetch(`http://localhost:3001/cart-items/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching cart items");
        setLoading(false);
      });
  };

  const fetchCartDetails = (userId) => {
    setLoading(true);
    fetch(`http://localhost:3001/cart-items/${userId}/cart`)
      .then((response) => response.json())
      .then((data) => {
        setCartDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching cart details");
        setLoading(false);
      });
  };

  const removeFromCart = (cartItemId, userId) => {
    fetch(`http://localhost:3001/cart/remove/${cartItemId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchCartItems(userId);
      fetchCartDetails(userId);
    })
    .catch(error => {
      console.error('Error removing course from cart:', error);
      setError("Error removing course from cart");
    });
  };
  
  if (!loading && !userDetails) {
    return (
      <div className="message-container2">
           <div className='msg'>
           You are not logged in. 

           <div style={{textalign: "center"}}>
            <NavLink style={{fontfamily: "var(--font-stack-heading)" , fontweight: "700" ,fontsize: "10px", color: "#5624d0", border: "none", background: "transparent", display: "block",    textDecoration: "none",
}} to="/signup">Signup</NavLink>
        </div> 

        
        </div>
        </div>
      
      
    );
  } 
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="message-container error-message">Error: {error}</div>;
  if (cartDetails.length === 0) {
    return (
     
        <div className="message-container1">
           <div   className='msg'>
        Your cart is empty.
        <div style={{textalign: "center"}}>
            <NavLink style={{fontfamily: "var(--font-stack-heading)" , fontweight: "700" ,fontsize: "10px", color: "#5624d0", border: "none", background: "transparent", display: "block",    textDecoration: "none",
}} to="/courses">Start Shopping</NavLink>
        </div> 
        </div>
      
      </div>
      
    );
  } // Show message if cart is empty

  return (
    <div className="cart-page">
      <h2 className="headingcourse">Cart</h2>
      <div className="course-list1cart">
        {cartDetails.map((detail, index) => (
          <div>
          <Link className="linkcoursecart" to={`/courses/${detail.course_id}` } >
          <div key={index} className="course-cardcart">
            <div className="course-imagecart">
              <img src={detail.poster} className="courseimgcart" alt="Course Image" />
            </div>
            <div className="course-detailscart">
              <h3 className="course-titlecart">
                <Link to={`/courses/${detail.course_id}`} className="coursename">{detail.course_name}</Link>
              </h3>
              <div className="course-instructor">LearnMate, Inc.</div>
              <div className="course-rating">
                <span className="rating-count">({detail.rating} ratings)</span>
              </div>
              <div className="course-pricing">
                <div className="current-price">₹{detail.current_price}</div>
                <div className="cut-price">₹{detail.actual_price}</div>
              </div>
            </div>
          </div>
          {detail.best_seller === 1 && (
                <div className="bestseller-badgecart">Bestseller</div>
                )}
          </Link>
            <div className="cart-action">
              <button className="cartbtn" onClick={() => removeFromCart(detail.course_id, userDetails.login_id)}>Remove from Cart</button>
            </div>

          </div>
        )
        )}
      </div>
    </div>
  );
}

export default Cart;
