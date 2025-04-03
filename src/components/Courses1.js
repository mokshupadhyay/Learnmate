import React, { useEffect, useState } from "react";
import { Link,Route,useNavigate } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import "./Courses.css";
// import { Footer1 } from "./Footer1";
import { useCart } from '../context/CartContext';
import SearchButton from "../pages/searchButton";

function CourseSection({
  sectionName,
  initialVisibleCourses,
  loadMoreIncrement,
  fetchDataEffect,
  courses,
  listclass=true,
  showSearchBar = true,
  colindex=5
  
  // searchResults,
}) {
  // const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(initialVisibleCourses);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const { updateCartItemsCount, updateCartDetails } = useCart();
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Object to store favorite status for each course
  const [cartStatus, setCartStatus] = useState({}); // Object to store cart status for each course
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  // const colindex=5;

  
  
  
  
  useEffect(() => {
    
    fetchDataEffect();
  });

    
  useEffect(() => {
    // Retrieve user details from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user details
      const decodedToken = parseJwt(token);
      setUserDetails(decodedToken.userDetails);
      
      // Fetch cart items for the user
      fetchCartItems(decodedToken.userDetails.login_id);
      fetchCartDetails(decodedToken.userDetails.login_id)
      
    }
  }, []);
  
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  
  const fetchCartItems = (userId) => {
    // Fetch cart items for the user
    fetch(`http://localhost:3001/cart-items/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const cartStatusUpdate = {};
        data.forEach((item) => {
          cartStatusUpdate[item.product_id] = true;
        });
        setCartStatus(cartStatusUpdate);
        
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
    };
    
    const fetchCartDetails = (userId) => {
      fetch(`http://localhost:3001/cart-items/${userId}/cart`)
      .then((response) => response.json())
      .then((data) => {
        updateCartDetails(data); // Update cart details using context
      })
      .catch((error) => {
        console.error("Error fetching showcart :", error);
        
      });
    };

    


  const filterCourses = () => {
    if (!searchQuery.trim()) {
      return courses;
    }
    const searchTerms = searchQuery.trim().toLowerCase().split(" ");
    return courses.filter((course) => {
      return searchTerms.every((term) => {
        return (
          (course.course_name && course.course_name.toLowerCase().includes(term)) ||
          (course.description && course.description.toLowerCase().includes(term)) ||
          (course.tags && course.tags.some((tag) => tag.toLowerCase().includes(term)))
          );
        });
      });
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClass = i < Math.round(rating) ? "star-filled" : "star-empty";
      stars.push(
        <span key={i} className={starClass}>
          &#9733;
        </span>
      );
    }
    return stars;
  };
  
  const loadMoreCourses = () => {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + loadMoreIncrement);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCourses = filterCourses();
  
  
  const handleAddToCart = (courseId) => {
    if (!userDetails || !userDetails.login_id) {
      // Redirect to /cart if userDetails or userDetails.login_id is null
      
      navigate("/cart");
      
      // window.location.href = "/cart";
      return;
    }
    
    // Add course to cart
    fetch("http://localhost:3001/add_to_cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userDetails.login_id,
        product_id: courseId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add course to cart");
        }
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [courseId]: true,
        }));
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        // Fetch all cart items after addition
        
        updateCartItemsCount(prevCount => prevCount + 1);
        
        fetchCartItems(userDetails.login_id);
        //debugger;
        //updateCartDetails(data); // Update cart details using context
        fetchCartDetails(userDetails.login_id);
      })
      .catch((error) => {
        console.error("Error adding course to cart:", error);
      });
  };

  const removeFromCart = (courseId) => {
    // Remove course from cart
    fetch(`http://localhost:3001/cart/remove/${courseId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [courseId]: false,
        }));
        updateCartItemsCount(prevCount => prevCount - 1);
        
        // Fetch all cart items after removal
        fetchCartItems(userDetails.login_id);
        fetchCartDetails(userDetails.login_id);
        // updateCartDetails(data); // Update cart details using context
      })
      .catch((error) =>
        console.error("Error removing course from cart:", error)
      );
  };

  

  const handleFavorite = (courseId) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [courseId]: !prevStatus[courseId], // Toggle favorite status for the clicked course
    }));
  };

  
  return (
    <div>
      <h1 className="headingcourse">{sectionName}</h1>
      {showSearchBar && (
        <SearchButton
        onSearch={handleSearch}
        suggestions={["Suggestion 1", "Suggestion 2", "Suggestion 3"]}
        />
        )}
      <div
      //  className="course-list1"
      className={listclass ? "course-list1" : "course-list"}       
       >
        {filteredCourses.slice(0, visibleCourses).map((course, index) => (
          <div
            className="course-card"
            key={course.id}
            onMouseEnter={() => setHoveredCourse(course)}
            onMouseLeave={() => setHoveredCourse(null)}
          >
            <Link className="linkcourse" to={`/courses/${course.course_id}`}>
              <div className="course-image">
                <img src={course.poster} alt="Course Image" />
              </div>
              <div className="course-details">
                <h3 className="course-title">
                  <a className="coursename">{course.course_name}</a>
                </h3>
                <div className="course-instructor">LearnMate, Inc.</div>
                <div className="course-rating">
                  {renderStars(course.rating)}
                  <span className="rating-count">
                    ({course.rating} ratings)
                  </span>
                </div>
                <div className="course-pricing">
                  <div className="current-price">
                    ₹{course.current_price}{" "}
                    <span className="cut-price">₹{course.actual_price}</span>
                  </div>
                </div>
              </div>
              {course.best_seller === 1 && (
                <div className="bestseller-badge">Bestseller</div>
              )}
            </Link>
            {hoveredCourse && hoveredCourse.id === course.id && (
              <div
                className="course-hover-details"
                style={{
                  position: "absolute",
                  top: "-80px",
                  opacity: "1",
                  left:
                    index % colindex === 3 || index % colindex === 4
                      ? "-372px"
                      : "calc(100% + 10px)",
                  right: index % colindex === 3 || index % colindex === 4 ? "auto" : "-320px",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  border: "1px solid #dddddd",
                  borderRadius: "0px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  zIndex: "2",
                  width: "20rem",
                  minHeight: "20rem",
                  height:"auto",
                  // height: "auto",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  filter: "blur(0px)",
                }}
              >
                <div
                  style={{
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"baseline",
                    // alignItems: "center",
                  }}
                >
                  <Link
                    className="linkcourse"
                    to={`/courses/${course.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-stack-heading)",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "-.02rem",
                        fontSize: "1.9rem",
                        maxWidth: "36em",
                        transition: "color 0.3s",
                      }}
                      className="course-name"
                    >
                      {course.course_name}
                    </p>
                  </Link>
                  <div
                    className="course-instructor"
                    style={{ marginBottom: "10px", marginLeft: "-206px" }}
                  >
                    LearnMate, Inc.
                  </div>
                  <p style={{ marginBottom: "10px", marginLeft: "-118px" }}>
                    <strong>Course Rating:</strong> {course.rating} (
                    {course.rating_count} ratings)
                  </p>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontFamily: "var(--font-stack-text)",
                      fontWeight: 400,
                      lineHeight: 1.4,
                      fontSize: "1.1rem",
                      color: "#2d2f31",
                    }}
                  >
                    <strong>Description:</strong>{" "}
                    {course.long_description.split(" ").slice(0, 30).join(" ")}{" "}
                    {course.long_description.split(" ").length > 25 && (
                      <span>...</span>
                    )}
                  </p>
                  <div style={{ display: "flex", margin: "auto" }}>
                    {cartStatus[course.course_id] ? (
                      <button
                        style={{
                          alignItems: "center",
                          padding: "8px 20px",
                          backgroundColor: "rgb(73, 71, 71)",
                          color: "white",
                          border: "none",
                          borderRadius: "0px",
                          cursor: "pointer",
                          width: "150px",
                          height: "50px",
                        }}
                        onClick={() => removeFromCart(course.course_id)}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        style={{
                          alignItems: "center",
                          padding: "8px 20px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "0px",
                          cursor: "pointer",
                          width: "150px",
                          height: "50px",
                        }}
                        onClick={() => handleAddToCart(course.course_id)}
                      >
                        Add to Cart
                      </button>
                    )}

                    <a onClick={() => handleFavorite(course.id)}>
                      {favoriteStatus[course.id] ? (
                        <BiHeart
                          style={{
                            border: "1px solid",
                            borderRadius: "50%",
                            marginLeft: "5px",
                            fontSize: "2rem",
                            padding: "0.7rem",
                            color: "black",
                            background: "rgb(255, 0, 255)",
                          }}
                        />
                      ) : (
                        <BiHeart
                          style={{
                            border: "1px solid",
                            borderRadius: "50%",
                            marginLeft: "5px",
                            fontSize: "2rem",
                            padding: "0.7rem",
                            color: "black",
                            background: "var(--color-gray-500)",
                          }}
                        />
                      )}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {courses.length > visibleCourses && (
        <button className="loadmore" onClick={loadMoreCourses}>
          Load More
        </button>
      )}
      {/* <Footer1 /> */}
    </div>
  );
}

export default CourseSection;
