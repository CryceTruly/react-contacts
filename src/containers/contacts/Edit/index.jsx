import React, { useState, useEffect, useRef, useContext } from "react";
import EditModal from "../../../layout/Edit";
import { GlobalContext } from "../../../context/GlobalState";
import { editContact } from "../../../context/actions/contacts";
import cogoToast from "cogo-toast";

const EditContactContainer = ({ setContact, contact, open, setOpen }) => {
  const [form, setForm] = useState({});
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const [fieldErrors, setFieldErrors] = useState({});
  console.log("form", form);

  const {
    contactsState: {
      contacts,
      editContact: { loading, data },
    },
    contactsDispatch: dispatch,
  } = useContext(GlobalContext);

  console.log("contacts", contacts.data);
  console.log("data", data);

  useEffect(() => {
    if (data) {
      cogoToast.success("Contact updated");
      setContact(data.data);
      setOpen(false);
    }
  }, [data]);

  useEffect(() => {
    if (contact) {
      setForm({
        ...form,
        contactPicture: contact.contact_picture,
        firstName: contact.first_name,
        phoneNumber: contact.phone_number,
        lastName: contact.last_name,
        countryCode: contact.country_code,
      });
    }
  }, []);

  const newContactFormValid =
    !form?.firstName?.length ||
    !form?.countryCode?.length ||
    !form?.lastName?.length ||
    !form.phoneNumber?.length;

  const inputRef = useRef(null);

  const [localURL, setLocalURL] = useState(null);

  const onImageChange = (e) => {
    e.persist();

    const fileURL = e.target.files[0];

    setForm({ ...form, contactPicture: fileURL });

    setLocalURL(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = () => {
    setFieldErrors(null);
    editContact(localURL ? true : false, contact.id, form)(dispatch);
  };

  return (
    <EditModal
      open={open}
      setOpen={setOpen}
      formProps={{
        onChange,
        newContactFormValid,
        loading,
        fieldErrors,
        form,
        onSubmit,
        inputRef,
        localURL,
        onImageChange,
      }}
    />
  );
};

export default EditContactContainer;
