import { useState, useContext, useEffect } from "react";
import { register } from "../../context/actions/auth";
import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from "react-router-dom";

export default () => {
  const [form, setForm] = useState({});
  const { authState: state, authDispatch: dispatch } = useContext(
    GlobalContext
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const { loading, error, data } = state.auth;
  const history = useHistory();

  // const isEmpty = (field) => field && field === "";

  useEffect(() => {
    if (data) {
      history.push("/auth/login");
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
    register(form)(dispatch);
  };
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const registerFormValid =
    !form?.username?.length ||
    !form?.firstName?.length ||
    !form?.email?.length ||
    !form?.lastName?.length ||
    !form.password ||
    !form.password.length;

  return {
    form,
    setForm,
    onChange,
    onSubmit,
    loading,
    registerFormValid,
    fieldErrors,
  };
};
