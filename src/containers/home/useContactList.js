import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { getContacts } from "../../context/actions/contacts";

export default () => {
  const {
    contactsState: {
      contacts: {
        loading,
        error,
        data,
      },
    },
    contactsDispatch: dispatch,
  } = useContext(GlobalContext);
  console.log("error", error);
  console.log("data", data);
  console.log("loading", loading);

  useEffect(() => {
    getContacts()(dispatch);
  }, []);

  return { loading, error, data };
};
