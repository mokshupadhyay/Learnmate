
import React from 'react';

function UserStatus() {
  // Check if token exists in local storage
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; // Convert token presence to boolean

  return isLoggedIn ? <p>User is logged in</p> : <p>User is not logged in</p>;
}

export default UserStatus;
