import Axios from "../../helpers/axios";
import { storage } from "../../firebase";

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

  const saveToBackend = (contact_picture = null) => {
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

  if (contact_picture) {
    storage
      .ref(`/images/${contact_picture.name}`)
      .put(contact_picture)
      .on(
        "state_changed",
        (snapShot) => {},
        async (err) => {
          //catches the errors
          return err;
        },
        async () => {
          // gets the functions from storage refences the image storage in firebase by the children
          const url = await storage
            .ref("images")
            .child(contact_picture.name)
            .getDownloadURL();

          if (url) {
            saveToBackend(url);
          }
        }
      );
  } else {
    saveToBackend();
  }
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

export const deleteContact = (id) => (dispatch) => {
  dispatch({
    type: "DELETE_CONTACT_START",
  });
  Axios.delete(`${process.env.REACT_APP_API_BASE_URL}/contacts/${id}`)
    .then((res) => {
      dispatch({
        type: "DELETE_CONTACT_SUCCESS",
        payload: { status: res.status, id },
      });
    })
    .catch((err) => {
      dispatch({
        type: "DELETE_CONTACT_ERROR",
        payload: err.response ? err.response.data : "Network Error",
      });
    });
};

export const starContact = (favorite, id) => (dispatch) => {
  dispatch({
    type: "STAR_CONTACT_START",
  });
  Axios.patch(`${process.env.REACT_APP_API_BASE_URL}/contacts/${id}`, {
    is_favorite: !favorite,
  })
    .then((res) => {
      dispatch({
        type: "STAR_CONTACT_SUCCESS",
        payload: { status: res.status, id, ...res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: "STAR_CONTACT_ERROR",
        payload: err.response ? err.response.data : "Network Error",
      });
    });
};

export const editContact = (
  upload,
  id,
  {
    countryCode: country_code,
    firstName: first_name,
    lastName: last_name,
    phoneNumber: phone_number,
    contactPicture: contact_picture,
    is_favorite,
  }
) => (dispatch) => {
  dispatch({
    type: "EDIT_CONTACT_START",
  });

  const saveToBackend = (contact_picture = null) => {
    Axios.put(`${process.env.REACT_APP_API_BASE_URL}/contacts/${id}`, {
      country_code,
      first_name,
      last_name,
      phone_number,
      contact_picture,
      is_favorite,
    })
      .then((res) => {
        dispatch({
          type: "EDIT_CONTACT_SUCCESS",
          payload: { data: res.data, status: res.status },
        });
      })
      .catch((err) => {
        dispatch({
          type: "EDIT_CONTACT_ERROR",
          payload: err.response ? err.response.data : "Network Error",
        });
      });
  };

  if (upload) {
    storage
      .ref(`/images/${contact_picture.name}`)
      .put(contact_picture)
      .on(
        "state_changed",
        (snapShot) => {},
        async (err) => {
          //catches the errors
          return err;
        },
        async () => {
          // gets the functions from storage refences the image storage in firebase by the children
          const url = await storage
            .ref("images")
            .child(contact_picture.name)
            .getDownloadURL();

          if (url) {
            saveToBackend(url);
          }
        }
      );
  } else {
    saveToBackend();
  }
};
