import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";


export const BookItSection = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [promptMessage, setPromptMessage] = useState("");
  const sectionStyle = {
    position: "absolute",
    top: 350,
    left: 690,
    width: "75%",
    height: "80%",
    background: `url(${require("../assests/9.png")})`,
    backgroundSize: "cover",
    padding: "20px", // Add some padding to the section
  };

  useEffect(() => {
    // Retrieve user details from local storage
    const token = localStorage.getItem("token");
    if (token) {
        // Decode the token to get user details
        const decodedToken = parseJwt(token);
        setUserDetails(decodedToken.userDetails);

        setPromptMessage(`Hello, ${decodedToken.userDetails.username}`);

    }
}, []);

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};


  return (
    <section style={sectionStyle} className="bookit">
      <div className="booking">
        <span>{promptMessage}</span>
    <br></br>
        <span>Enjoy</span>
        <h1>Happy Learning</h1>
        <br />
        <NavLink to="/courses" className="link">
        Start Learning
            {/* Courses */}
          </NavLink>
        {/* <a href="/courses">Start Learning</a> */}
      </div>
    </section>
  );
};
