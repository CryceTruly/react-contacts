import Axios from "../../helpers/axios";

export const loginUser = ({ username, password }) => (dispatch) => {
  dispatch({
    type: "LOGIN_START",
  });
  Axios.post(`/auth/login`, {
    username,
    password,
  })
    .then((res) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { data: res.data, status: res.status },
      });
    })
    .catch((err) => {
      const error = err.response ? err.response.data.detail : "Network Error";
      dispatch({
        type: "LOGIN_ERROR",
        payload: error,
      });
    });
};
export const clearAuthState = () => (dispatch) => {
  dispatch({
    type: "CLEAR_AUTH",
  });
};

export const register = ({
  firstName: first_name,
  lastName: last_name,
  email,
  password,
  username,
}) => (dispatch) => {
  dispatch({
    type: "REGISTER_START",
  });
  Axios.post(`/auth/register`, {
    first_name,
    last_name,
    email,
    password,
    username,
  })
    .then((res) => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { data: res.data, status: res.status },
      });
    })
    .catch((err) => {
      dispatch({
        type: "REGISTER_ERROR",
        payload: err.response ? err.response.data : "Network Error",
      });
    });
};
export const logout = () => (dispatch) => {};
export const getContacts = () => (dispatch) => {};

export default { register, loginUser, getContacts, logout };
