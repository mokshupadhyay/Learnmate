import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useTitle } from "../hooks/useTitle";
import { BookItSection } from "../components/BookItSection";
import Featured from "./Featured";
import Bestseller from "./Bestseller";

import { Footer1 } from "./Footer1";
import Recommended from "./Recommended";
const headerStyle = {
  width: "100%",
  height: "100vh",
  // backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))",
  backgroundSize: "cover",
  fontFamily: "sans-serif",
  position: "relative", // Add this to allow the z-index to work
};

const backgroundImageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `url(${require("../assests/39.png")})`,
  backgroundSize: "cover",
  zIndex: -1,
};

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [promptMessage, setPromptMessage] = useState("");

  useEffect(() => {
    // Retrieve user details from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user details
      const decodedToken = parseJwt(token);
      setUserDetails(decodedToken.userDetails);

      setPromptMessage(`Hello, ${decodedToken.userDetails.username}!`);
    }
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page after logout
    window.location.href = "/signup"; // Redirect to login page
  };
  return (
    <>
      <header style={headerStyle}>
        <div style={backgroundImageStyle}></div>
        <BookItSection />
      </header>

      <Featured />
      <Recommended />
      <Bestseller />

      <Footer1 />
    </>
  );
}

export default Home;
