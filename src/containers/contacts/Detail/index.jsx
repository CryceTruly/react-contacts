import React from "react";
import ContactDetail from "../../../layout/ContactDetail";

const ContactDetailContainer = (props) => {
  console.log("props", props);
  return <ContactDetail {...props} />;
};

export default ContactDetailContainer;
