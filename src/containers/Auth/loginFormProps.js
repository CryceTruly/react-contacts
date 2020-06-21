import { useState, useContext, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import { loginUser, clearAuthState } from "../../context/actions/auth";
import { GlobalContext } from "../../context/GlobalState";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";

export default () => {
  const [form, setForm] = useState({});
  const [authError, setAuthError] = useState(null);
  const [registerMsg, setRegisterMsg] = useState(null);
  const { authState: state, authDispatch: dispatch } = useContext(
    GlobalContext
  );
  const { loading, error, data } = state.auth;
  const history = useHistory();
  useEffect(() => {
    if (data?.status === 201) {
      setRegisterMsg(`Account Created for  ${data.data?.username}`);
      setForm({ ...form, username: data.data?.username });
    }
    if (data?.status === 200) {
      cogoToast.success(`Welcome  ${data.data?.user.username}`, {
        hideAfter: 10,
      });
      localStorage.setItem("token", data.data?.token);
      history.push("/");
    }
    clearAuthState()(dispatch);
  }, [data]);

  useEffect(() => {
    if (error) {
      setAuthError(error);
      clearAuthState()(dispatch);
    }
  }, [error]);

  const onSubmit = () => {
    setAuthError(null);
    setRegisterMsg(null);
    loginUser(form)(dispatch);
  };
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const loginFormInvalid =
    !form?.username?.length || !form.password || !form.password.length;

  return {
    form,
    setForm,
    onChange,
    onSubmit,
    authError,
    registerMsg,
    loading,
    loginFormInvalid,
  };
};
