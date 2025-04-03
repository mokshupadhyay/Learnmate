import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./CourseDetail.css";
import CourseContent from "./CourseContent";
import { Footer1 } from "./Footer1";

// Add a new styled component for the sticky header
const StickyHeader = styled.div`
  position: sticky;
  top: 140px;
  width: 440px; /*  Adjust the width of the sticky header */
  height: 440px;
  padding: 15px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 1; /* Ensure the sticky header is above other content */
  border-radius: 5px;
  margin-top: -340px;
  margin-left: 730px;
  background-color: #2d2f31;
`;

const StickyHeaderImage = styled.img`
  background: transparent;
  width: 440px;
  height: 250px;
`;

const CurrentPriceS = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-top: -10px;
`;

const BestsellerBadgeS = styled.div`
  background-color: lawngreen;
  color: #000;
  padding: 7px 20px;
  border-radius: 5px;
  font-weight: bolder;
  position: absolute;
  left: 38px;
  top: 38px;
`;

const BuyButtonSticky = styled.button`
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  margin-top: 20px;
`;

const CartButtonStickyAdd = styled.button`
background: rgb(76, 175, 80) no-repeat;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  margin-top: 10px;
`;

const CartButtonStickyRemove = styled.button`
  background: rgb(73, 71, 71) no-repeat;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  margin-top: 10px;
`;

const BuyButton = styled.button`
  background-color: #007bff;
  position: relative;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  margin-top: 20px;
  width: 150px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
`;

const AddCartButton = styled.button`
background: rgb(73, 71, 71) no-repeat;

  background: rgb(76, 175, 80) no-repeat;

  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  margin-top: 10px;
  width: 150px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
`;


const RemoveCartButton = styled.button`
background: #666 no-repeat;


  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  margin-top: 30px;
  width: 150px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
  position: relative;
  bottom: 0px;
`;

const DivD = styled.div`
  max-width: 2100px;
  margin: auto;
  padding-top: 100px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const H2 = styled.h2`
  margin-top: 60px;
  margin-bottom: 30px;
  font-family: var(--font-stack-heading-serif);
  font-weight: 700;
  color: black;
  text-align: initial;
  font-size: 2.5rem;
  line-height: 1.25;
  letter-spacing: -0.05rem;
`;

const Ppara = styled.p`
  text-decoration: solid;
  display: -webkit-box !important;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 650px;
  color: #2d2f31;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  font-size: 19px;
  white-space: normal;
`;

const PparaD = styled.p`
  text-decoration: solid;
  display: -webkit-box !important;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #2d2f31;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  font-size: 19px;
  white-space: normal;
  color: #fff;
  margin: 100px;
  text-align: justify;
  justify-content: space-between;
  margin-top: 30px;
`;

const HeaderD = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: 380px;
`;

const BestsellerBadge = styled.div`
  background-color: #ffd700;
  color: #000;margin-top: 10px;

  padding: 7px 20px;
  border-radius: 5px;
  font-weight: bolder;
  position: absolute;
  left: 125px;
  top: 190px;
`;

const CourseImage = styled.img`
  max-width: 1900px;
  width: 580px;
  height: 380px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: inherit;
  margin-left: 30px;
  margin-top: 30px;
`;

const CourseDetails = styled.div`
  font-size: 15px;
  margin-left: 70px;
`;

const CourseTitle = styled.h1`
  font-size: 35px;
  margin-top: 95px;
  margin-bottom: 10px;
  color: #fff;
`;

const Instructor = styled.div`


  font-family: var(--font-stack-text);
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.4;
  font-size: 0.97rem;
  margin-bottom: 0.4rem;
  white-space: nowrap;
  display: -webkit-box!important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity:0.8;
  text-overflow: ellipsis;
  white-space: normal;
  color: #fff;

`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RatingStars = styled.div`
  font-size: 20px;
  margin-right: 5px;
  color: #ffd700;
  margin: 0px;
`;

const RatingCount = styled.span`
  color: #666;
  color: #fff;
`;

const Pricing = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  color: #fff;
`;

const CurrentPrice = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
`;

const CutPrice = styled.div`
  color: #666;
  color: #fff;

  margin-left: 10px;
  text-decoration: line-through;
`;

const Description = styled.div`
  font-size: 16px;
  margin-top: -30px;
  padding-top: 30px;
`;

const hrs = styled.div`
  border: dotted grey 7px;
  border-bottom: none;
  width: 6%;
  margin: 100px auto;
  border-style: none;
  border-top-style: dotted;
  /* border-color: #EAF6F6;*/
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  font-family: var(--font-stack-heading-serif);
  font-weight: 700;
  color: black;
  text-align: initial;
  font-size: 2.5rem;
  line-height: 1.25;
  letter-spacing: -0.05rem;
`;

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  // alignItems: 'center',
  padding: "30px",
};

const linkStyle = {
  color: "black",
  textDecoration: "inherit",
};

const languageSelectorContainerStyle = {
  marginRight: "-150px",
  position: "relative", // Add position relative to enable positioning of the dropdown
};

const languageSelectorStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "2px solid #fff", // Add a border for better visibility
  backgroundColor: "#333", // Background color for the selector
  color: "#fff", // Text color
  cursor: "pointer",
  marginLeft: "30px",
};

const buttonContainerStyle = {
  marginLeft: "30px",
};

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [cartStatus, setCartStatus] = useState({}); // Object to store cart status for each course

  const [favoriteStatus, setFavoriteStatus] = useState({}); // Object to store favorite status for each course

  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user details
      const decodedToken = parseJwt(token);
      setUserDetails(decodedToken.userDetails);

      // Fetch cart items for the user
      fetchCartItems(decodedToken.userDetails.login_id);
    }
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    // Fetch basic course information
    fetch(`http://localhost:3001/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((error) => {
        console.error("Error fetching basic course details:", error);
      });
  }, [id]);

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

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (courseId) => {
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
        fetchCartItems(userDetails.login_id);
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
        // Fetch all cart items after removal
        fetchCartItems(userDetails.login_id);
      })
      .catch((error) =>
        console.error("Error removing course from cart:", error)
      );
  };

  return (
    <div>
      <DivD>
        <Container>
          <div className="headercourse">
            <HeaderD>
              {course && course.best_seller === 1 && (
                <BestsellerBadge>Bestseller</BestsellerBadge>
              )}
              {course && <CourseImage src={course.poster} alt="Course" />}
              <CourseDetails>
                {course && <CourseTitle>{course.course_name}</CourseTitle>}
                {course && (
                  <Instructor>{course.instructor_name}</Instructor>
                )}
                {course && (
                  <Rating>
                    <RatingStars>{renderStars(course.rating)}</RatingStars>
                    <RatingCount>({course.total_ratings} ratings)</RatingCount>
                  </Rating>
                )}
                {course && (
                  <Pricing>
                    <CurrentPrice>₹{course.current_price}</CurrentPrice>
                    {course.actual_price && (
                      <CutPrice>₹{course.actual_price}</CutPrice>
                    )}
                  </Pricing>
                )}
                <BuyButton>Buy this Course </BuyButton>
                {cartStatus[course.course_id] ? (
                <RemoveCartButton  onClick={() => removeFromCart(course.course_id)} >Remove from Cart</RemoveCartButton>):( <AddCartButton onClick={() => handleAddToCart(course.course_id)}> Add to Cart</AddCartButton>)}
              </CourseDetails>
            </HeaderD>
            {course && (
              <Description>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "35px",
                  }}
                >
                  Description
                </h2>
                <PparaD>{course.long_description}</PparaD>
              </Description>
            )}
          </div>

          <hr />

          {course && (
            <div>
              <H2>Course Details</H2>
              <Ppara>Overview: {course.overview}</Ppara>
              <Ppara>Course Length: {course.course_length}</Ppara>
              <Ppara>Course Sections: {course.course_sections}</Ppara>
              <Ppara>Course Lectures: {course.course_lectures}</Ppara>
              <Ppara>Course Language: {course.course_language}</Ppara>
              <Ppara>Actual Price: ₹{course.actual_price}</Ppara>
              <Ppara>Current Price: ₹{course.current_price}</Ppara>
              <Ppara>Review: {course.review}</Ppara>
              <Ppara>Rating: {course.rating}</Ppara>
              <Ppara>Total Ratings: {course.total_ratings}</Ppara>
            </div>
          )}
          <div>
            <div className="course-details-wrapper">
              {/* Sticky Header */}
              <StickyHeader>
                {course && course.best_seller === 1 && (
                  <BestsellerBadgeS>Bestseller</BestsellerBadgeS>
                )}
                <StickyHeaderImage src={course.poster} alt="Course" />
                {course && (
                  <Instructor >{course.instructor_name}</Instructor>
                )}
                {course && (
                  <Rating>
                    <RatingStars>{renderStars(course.rating)}</RatingStars>
                    <RatingCount>({course.total_ratings} ratings)</RatingCount>
                  </Rating>
                )}
                <CurrentPriceS>₹{course.current_price}</CurrentPriceS>
                <BuyButtonSticky>Buy Now</BuyButtonSticky>
                {cartStatus[course.course_id] ? (
                <CartButtonStickyRemove  onClick={
                  () => 
                removeFromCart(course.course_id)} >
                  Remove from Cart
                  </CartButtonStickyRemove>):
                  ( <CartButtonStickyAdd onClick={
                    () => handleAddToCart(course.course_id)}>
                       Add to Cart
                       </CartButtonStickyAdd>)}
              </StickyHeader>
              <hrs />

              <PageTitle>Course Page</PageTitle>
              <CourseContent courseId={course.course_id} />
              <div className="spaceforborder"></div>
              <hrs />

              <div className="borderbox">
                <div className="course-description">
                  <div className="section requirements">
                    <h2>Requirements</h2>
                    <ul>
                      <li>
                        No programming experience needed - I'll teach you
                        everything you need to know
                      </li>
                      <li>A computer with access to the internet</li>
                      <li>No paid software required</li>
                      <li>
                        I'll walk you through, step-by-step how to get all the
                        software installed and set up
                      </li>
                    </ul>
                  </div>

                  <div className="section description">
                    <h2>Description</h2>
                    <p>
                      Welcome to the Complete Web Development Bootcamp, the only
                      course you need to learn to code and become a full-stack
                      web developer. With 150,000+ ratings and a 4.8 average, my
                      Web Development course is one of the HIGHEST RATED courses
                      in the history of LearnMate!
                    </p>
                    <p>
                      At 65+ hours, this Web Development course is without a
                      doubt the most comprehensive web development course
                      available online. Even if you have zero programming
                      experience, this course will take you from beginner to
                      mastery.
                    </p>
                    {/* Add the rest of your description content here */}
                  </div>

                  <div className="section who-this-course-is-for">
                    <h2>Who this course is for:</h2>
                    <ul>
                      <li>
                        If you want to learn to code through building fun and
                        useful projects, then take this course.
                      </li>
                      <li>
                        If you want to start your own startup by building your
                        own websites and web apps.
                      </li>
                      <li>
                        If you are a seasoned programmer, then take this course
                        to get up to speed quickly with the latest frameworks
                        and NodeJS.
                      </li>
                      <li>
                        If you want to take ONE COURSE and learn everything you
                        need to know about web development, take this course.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </DivD>
      <Footer1 />
    </div>
  );
}
export default CourseDetail;
