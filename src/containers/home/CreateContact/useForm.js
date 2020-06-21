import { useState, useContext, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import { createContact } from "../../../context/actions/contacts";

export default () => {
  const [form, setForm] = useState({});
  const { contactsState: state, contactsDispatch: dispatch } = useContext(
    GlobalContext
  );
  const [fieldErrors, setFieldErrors] = useState({});
  console.log("state", state);
  const { loading, error, data } = state.addContact;
  const history = useHistory();
  console.log("form", form);

  // const isEmpty = (field) => field && field === "";

  useEffect(() => {
    if (data) {
      history.push("");
    }
    // clearAuthState();
  }, [data]);

  useEffect(() => {
    if (error) {
      for (const item in error) {
        setFieldErrors({ ...fieldErrors, [item]: error[item][0] });
      }
    }
  }, [error]);

  const onSubmit = () => {
    //loginUser(form)();
    // history.push("/");
    setFieldErrors(null);
    createContact(form)(dispatch);
  };
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const newContactFormValid =
    !form?.contactPicture?.length ||
    !form?.firstName?.length ||
    !form?.countryCode?.length ||
    !form?.lastName?.length ||
    !form.phoneNumber?.length;

  return {
    form,
    setForm,
    onChange,
    onSubmit,
    loading,
    newContactFormValid,
    fieldErrors,
  };
};
