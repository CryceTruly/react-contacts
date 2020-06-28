import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { getContacts } from "../../../context/actions/contacts";

export default () => {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const {
    contactsState: { contacts },
    contactsDispatch: dispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    getContacts()(dispatch);
  }, []);

  const onItemClicked = (contact) => {
    setOpen(true);
    setContact(contact);
  };

  return {
    contacts,
    detail: { open, contact, onItemClicked, setContact, setOpen },
  };
};
