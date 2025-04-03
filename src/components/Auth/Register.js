import React from "react";

function Register({ formData, setFormData, handleRegisterSubmit, message }) {
  return (
    <div className="form-value" id="registar-form">
      <div>
        <h2>Register</h2>
        <img
          className="learnmatesignup"
          src={require("../../Assets/LM1.png")}
          alt=""
        />
      </div>

      <form onSubmit={handleRegisterSubmit}>
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <label htmlFor="fullName">Full Name</label>
        </div>
        <div className="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="inputbox">
          <ion-icon name="phone-portrait-outline"></ion-icon>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            required
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
        <div className="inputbox">
          <ion-icon name="home-outline"></ion-icon>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        
        <div className="login sticky-buttons">
          <div className="error">{message}</div>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
