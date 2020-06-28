import React from "react";
import ContactList from "../../../layout/ContactList";
import useContactList from "./useContactList";

const HomeContainer = () => {
  console.log("useContactList()", useContactList());
  return <ContactList data={useContactList()} />;
};

export default HomeContainer;
