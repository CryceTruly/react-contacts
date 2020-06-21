import Axios from "../../helpers/axios";

export const createContact = ({
  countryCode: country_code,
  firstName: first_name,
  lastName: last_name,
  phoneNumber: phone_number,
  contactPicture: contact_picture,
  is_favorite,
}) => (dispatch) => {
  dispatch({
    type: "ADD_CONTACT_START",
  });
  Axios.post(`${process.env.REACT_APP_API_BASE_URL}/contacts/`, {
    country_code,
    first_name,
    last_name,
    phone_number,
    contact_picture,
    is_favorite,
  })
    .then((res) => {
      dispatch({
        type: "ADD_CONTACT_SUCCESS",
        payload: { data: res.data, status: res.status },
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CONTACT_ERROR",
        payload: err.response ? err.response.data : "Network Error",
      });
    });
};

export const getContacts = () => (dispatch) => {
  dispatch({
    type: "GET_CONTACTS_START",
  });
  Axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts/`)
    .then((res) => {
      dispatch({
        type: "GET_CONTACTS_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_CONTACTS_ERROR",
        payload: err.response ? err.response.data : "Network Error",
      });
    });
};
