import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import "./SignupPage.css"; // Importing CSS

function Signup() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    loginUsername: "",
    loginPassword: "",
  });

  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLoginFormVisible((prevState) => !prevState);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Add registration logic here
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Example fetch request
    fetch("http://localhost:3001/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setMessage("Registration failed. Please try again.");
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Submit the login form
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // Store the token in local storage
          localStorage.setItem("token", data.token);
          // Redirect to home page after login
          window.location.href = '/'; // Redirect to home page or dashboard
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setMessage("Login failed. Please try again.");
      });
  };

  return (
    <sectionn> {/* Changed from <section> */}
      <div className="form-box" id="form-box">
        {isLoginFormVisible ? (
          <Login
            loginData={loginData}
            setLoginData={setLoginData}
            handleLoginSubmit={handleLoginSubmit}
            message={message}
          />
        ) : (
          <Register
            formData={formData}
            setFormData={setFormData}
            handleRegisterSubmit={handleRegisterSubmit}
            message={message}
          />
        )}
      </div>
      <div className="registar">
        <p>
          {isLoginFormVisible
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span href="#" onClick={toggleForm}>
            {isLoginFormVisible ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </sectionn> 
  );
}

export default Signup;
