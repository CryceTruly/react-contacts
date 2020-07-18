import { useState, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { useHistory } from "react-router-dom";
import { createContact, clearEdit } from "../../../context/actions/contacts";

export default () => {
  const [form, setForm] = useState({ isFavorite: false });
  const { contactsState: state, contactsDispatch: dispatch } = useContext(
    GlobalContext
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const { loading, error, data } = state.addContact;
  const history = useHistory();
  const formIsHalfFilledOut =
    Object.values(form).filter((item) => item !== "").length > 1 && !data;

  useEffect(() => {
    if (data) {
      history.push("");
      clearEdit()(dispatch);
    }
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
    formIsHalfFilledOut,
  };
};
