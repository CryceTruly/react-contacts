import React from "react";
import NewContact from "../../../layout/NewContact";
import useForm from "./useForm";

const ContactsContainer = () => {
  return <NewContact formProps={useForm()} />;
};

export default ContactsContainer;
