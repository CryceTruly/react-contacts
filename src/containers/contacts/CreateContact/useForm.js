import { useState, useContext, useEffect, useRef } from "react";
//import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import { createContact } from "../../../context/actions/contacts";
import uploadTofirebase from "./uploadTofirebase";

export default () => {
  const [form, setForm] = useState({});
  const { contactsState: state, contactsDispatch: dispatch } = useContext(
    GlobalContext
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const { loading, error, data } = state.addContact;
  const history = useHistory();
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
    setFieldErrors(null);
    createContact(form)(dispatch);
  };

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const inputRef = useRef(null);

  const [localURL, setLocalURL] = useState("");

  const onImageChange = (e) => {
    e.persist();

    const fileURL = e.target.files[0];

    setForm({ ...form, contactPicture: fileURL });

    setLocalURL(URL.createObjectURL(e.target.files[0]));
  };

  const newContactFormValid =
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
    inputRef,
    localURL,
    onImageChange,
  };
};
