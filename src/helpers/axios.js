import axios from "axios";
import cogoToast from "cogo-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_BASE_URL;

export default (history = null) => {
  const userToken = localStorage.getItem("token");
  const baseURL = REACT_APP_API_URL;
  let headers = {};

  if (userToken) {
    headers.Authorization = "Bearer " + userToken;
  }
  const axiosInstance = axios.create({
    baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        if (history) {
          history.push("/auth/login");
          cogoToast.error("Your session expired,please login");
        } else {
          window.location = "/auth/login";
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};
