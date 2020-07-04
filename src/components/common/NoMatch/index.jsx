import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>You are lost</h3>
      <p>Quick Links to help you find your way</p>
      <Link to="/">Home</Link>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Sign up</Link>
    </div>
  );
};

export default NotFound;
