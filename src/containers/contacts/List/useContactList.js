import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { getContacts } from "../../../context/actions/contacts";
import { useHistory } from "react-router-dom";

export default () => {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const history = useHistory();
  const {
    contactsState: { contacts },
    contactsDispatch: dispatch,
  } = useContext(GlobalContext);

  const fetchContacts = () => {
    getContacts(history)(dispatch);
  };

  useEffect(() => {
    if (!contacts.data) {
      fetchContacts();
    }
  }, []);

  const onItemClicked = (contact) => {
    setOpen(true);
    setContact(contact);
  };

  return {
    contacts,
    fetchContacts,
    detail: { open, contact, onItemClicked, setContact, setOpen },
  };
};
