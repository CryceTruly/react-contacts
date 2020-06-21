import React from "react";
import Register from "../../layout/Register";
import registerFormProps from "./registerFormProps";

const RegisterContainer = () => {
  return <Register formProps={registerFormProps()} />;
};

export default RegisterContainer;
