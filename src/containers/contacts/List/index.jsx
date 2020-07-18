import React from "react";
import ContactList from "../../../layout/ContactList";
import useContactList from "./useContactList";

const HomeContainer = () => {
  return <ContactList data={useContactList()} />;
};

export default HomeContainer;
