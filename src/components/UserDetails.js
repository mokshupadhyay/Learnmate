import React, { useState, useEffect } from 'react';
import './UserDetail.css'; // Import the CSS file

function UserDetails() {
    const [userDetails, setUserDetails] = useState(null);

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem("token");
        // Redirect to login page after logout
        window.location.href = '/signup'; // Redirect to login page
    };

    // Simulate fetching user details from local storage
    useEffect(() => {
        // Retrieve user details from local storage
        const token = localStorage.getItem("token");
        if (token) {
            // Decode the token to get user details
            const decodedToken = parseJwt(token);
            setUserDetails(decodedToken.userDetails);
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
        <div className="dropdown-menu">
            <div className="dropdown-item dropdown-item-user">
                {userDetails && (
                    <div className="user-detail">
                        <div className="id"><strong>User id : {userDetails.login_id}</strong></div>
                        <div className="uname"><strong>Username : {userDetails.username}</strong></div>
                        <div className="fname"><strong>Full Name : {userDetails.full_name}</strong></div>
                        <div className="mail"><strong>Email : </strong>{userDetails.email}</div>

                        {userDetails.phone_number && (
                            <div className='phn'><strong>Phone Number : </strong> {userDetails.phone_number}</div>
                        )}
                        {userDetails.address && (
                            <div className='address'><strong>Address : </strong> {userDetails.address}</div>
                        )}
                        {/* Display user password */}
                        <div className='password'><strong>Password : </strong> {userDetails.password}</div>
                    </div>
                )}
                <div className="clearfix"></div>
            </div>
            <div className="grid-menu">
                {/* Your grid menu items */}
                <div className="clearfix"></div>
            </div>
            <ab className="dropdown-item text-right text-white" href="/">
                {userDetails && (
                    <button className='btnuser' onClick={handleLogout}>Logout</button>
                )}
                <i className="fas fa-arrow-right ml-2 mr-1"></i>
            </ab>
        </div>
    );
}

export default UserDetails;
