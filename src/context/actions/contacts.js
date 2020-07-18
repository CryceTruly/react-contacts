import Axios from "../../helpers/axios";
import { storage } from "../../firebase";
import {
  ADD_CONTACT_START,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  DELETE_CONTACT_START,
  GET_CONTACTS_ERROR,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_ERROR,
  STAR_CONTACT_START,
  STAR_CONTACT_SUCCESS,
  STAR_CONTACT_ERROR,
  EDIT_CONTACT_START,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_ERROR,
  CLEAR_EDIT_CONTACT,
  SEARCH_CONTACTS,
} from "../../constants/actionTypes";
import { COULD_NOT_CONNECT_ERROR } from "../../constants/api";
import { FIREBASE_CONTACT_STORAGE_REF } from "../../constants/firebase";

export const createContact = ({
  countryCode: country_code,
  firstName: first_name,
  lastName: last_name,
  phoneNumber: phone_number,
  contactPicture: contact_picture,
  isFavorite: is_favorite,
}) => (dispatch) => {
  dispatch({
    type: ADD_CONTACT_START,
  });

  const saveToBackend = (new_picture = null) => {
    const no_pic_payload = {
      country_code,
      first_name,
      last_name,
      phone_number,
      is_favorite,
    };
    Axios()
      .post(
        `/contacts/`,
        new_picture ? no_pic_payload : { ...no_pic_payload, new_picture }
      )
      .then((res) => {
        dispatch({
          type: ADD_CONTACT_SUCCESS,
          payload: { data: res.data, status: res.status },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_CONTACT_ERROR,
          payload: err.response ? err.response.data : COULD_NOT_CONNECT_ERROR,
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
          // gets the functions from storage references the image storage in firebase by the children
          const url = await storage
            .ref(FIREBASE_CONTACT_STORAGE_REF)
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

export const getContacts = (history) => (dispatch) => {
  dispatch({
    type: GET_CONTACTS_START,
  });
  Axios(history)
    .get(`/contacts/`)
    .then((res) => {
      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CONTACTS_ERROR,
        payload: err.response ? err.response.data : COULD_NOT_CONNECT_ERROR,
      });
    });
};

export const deleteContact = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CONTACT_START,
  });
  Axios()
    .delete(`/contacts/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_CONTACT_SUCCESS,
        payload: { status: res.status, id },
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CONTACT_ERROR,
        payload: err.response ? err.response.data : COULD_NOT_CONNECT_ERROR,
      });
    });
};

export const starContact = (favorite, id) => (dispatch) => {
  dispatch({
    type: STAR_CONTACT_START,
  });
  Axios()
    .patch(`/contacts/${id}`, {
      is_favorite: !favorite,
    })
    .then((res) => {
      dispatch({
        type: STAR_CONTACT_SUCCESS,
        payload: { status: res.status, id, ...res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: STAR_CONTACT_ERROR,
        payload: err.response ? err.response.data : COULD_NOT_CONNECT_ERROR,
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
    isFavorite: is_favorite,
  }
) => (dispatch) => {
  dispatch({
    type: EDIT_CONTACT_START,
  });

  const saveToBackend = (contact_picture = null) => {
    console.log("new_picture", contact_picture);

    const no_pic_payload = {
      country_code,
      first_name,
      last_name,
      phone_number,
      is_favorite,
    };

    Axios()
      .put(
        `/contacts/${id}`,
        contact_picture
          ? { ...no_pic_payload, contact_picture: contact_picture }
          : no_pic_payload
      )
      .then((res) => {
        dispatch({
          type: EDIT_CONTACT_SUCCESS,
          payload: { data: res.data, status: res.status },
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_CONTACT_ERROR,
          payload: err.response ? err.response.data : COULD_NOT_CONNECT_ERROR,
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
            .ref(FIREBASE_CONTACT_STORAGE_REF)
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
export const clearEdit = () => (dispatch) => {
  return dispatch({
    type: CLEAR_EDIT_CONTACT,
  });
};

export const searchContacts = (searchText) => (dispatch) => {
  return dispatch({
    type: SEARCH_CONTACTS,
    payload: searchText,
  });
};
