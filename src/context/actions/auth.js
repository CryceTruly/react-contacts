import Axios from "../../helpers/axios";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_AUTH,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_USER_OUT,
  REGISTER_START,
} from "../../constants/actionTypes";
import { COULD_NOT_CONNECT_ERROR } from "../../constants/api";

export const loginUser = ({ username, password }) => (dispatch) => {
  dispatch({
    type: LOGIN_START,
  });
  Axios()
    .post(`/auth/login`, {
      username,
      password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data?.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data: res.data, status: res.status },
      });
    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.detail
        : COULD_NOT_CONNECT_ERROR;
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    });
};
export const clearAuthState = () => (dispatch) => {
  dispatch({
    type: CLEAR_AUTH,
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
    type: REGISTER_START,
  });
  Axios()
    .post(`/auth/register`, {
      first_name,
      last_name,
      email,
      password,
      username,
    })
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { data: res.data, status: res.status },
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response ? err.response.data : COULD_NOT_CONNECT_ERROR,
      });
    });
};
export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_USER_OUT,
    payload: history,
  });
  history.push("/auth/login");
};

export default { register, loginUser, logout };
