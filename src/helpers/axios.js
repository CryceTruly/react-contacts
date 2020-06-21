import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_BASE_URL;

const userToken = localStorage.getItem("token");
const baseURL = REACT_APP_API_URL;
const headers = {};

if (userToken) {
  headers.Authorization = "Bearer " + userToken;
}
const axiosInstance = axios.create({
  baseURL,
  headers,
});
export default axiosInstance;
