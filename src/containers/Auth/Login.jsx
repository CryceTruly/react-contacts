import React from "react";
import LoginComponent from "../../layout/Login";
import loginFormProps from "./loginFormProps";
// import   from "../../context/GlobalState";

const LoginContainer = (props) => {
  return <LoginComponent formProps={loginFormProps()} />;
};

export default LoginContainer;
