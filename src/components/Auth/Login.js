import React from "react";

function Login({ loginData, setLoginData, handleLoginSubmit, message }) {
  return (
    <div className="form-value" id="login-form">
      <div>
        <h2>Login</h2>
        <img
          className="learnmatesignup"
          src={require("../../Assets/LM1.png")}
          alt=""
        />
      </div>
      <form onSubmit={handleLoginSubmit}>
        <div className="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            type="text"
            name="loginUsername"
            value={loginData.loginUsername}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                loginUsername: e.target.value,
              })
            }
            required
          />
          <label htmlFor="loginUsername">Username</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="loginPassword"
            value={loginData.loginPassword}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                loginPassword: e.target.value,
              })
            }
            required
          />
          <label htmlFor="loginPassword">Password</label>
        </div>
        
        {/* Include additional form fields if needed */}
        {/* Example: */}
        {/* <div className="inputbox">...</div> */}
        
        <div className="login sticky-buttons">
          <div className="error">{message}</div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
