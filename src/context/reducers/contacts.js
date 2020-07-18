import initialContactsState from "../initialStates/initialContactsState";
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
  LOGOUT_USER_OUT,
} from "../../constants/actionTypes";

const getNextData = (payload, prev) => {
  if (prev) {
    return [payload, ...prev];
  } else {
    return payload;
  }
};

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT_START:
      return {
        ...state,
        addContact: {
          ...state.contacts.addContact,
          loading: true,
        },
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          data: getNextData(action.payload.data, state.contacts.data),
        },
        addContact: {
          ...state.contacts.addContact,
          loading: false,
          data: action.payload,
        },
      };

    case ADD_CONTACT_ERROR:
      return {
        ...state,
        addContact: {
          ...state.contacts.addContact,
          loading: false,
          error: action.payload,
        },
      };

    case GET_CONTACTS_START:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: true,
          error: null,
        },
      };

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          data: action.payload,
        },
      };

    case GET_CONTACTS_ERROR:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          error: action.payload,
        },
      };

    case DELETE_CONTACT_START:
      return {
        ...state,
        deleteContact: {
          ...state.contacts.deleteContact,
          loading: true,
        },
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        deleteContact: {
          ...state.contacts.deleteContact,
          loading: false,
          data: action.payload,
        },

        contacts: {
          ...state.contacts,
          data: state.contacts.data.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };

    case DELETE_CONTACT_ERROR:
      return {
        ...state,
        deleteContact: {
          ...state.contacts.deleteContact,
          loading: false,
          error: action.payload,
        },
      };

    case STAR_CONTACT_START:
      return {
        ...state,
        starContact: {
          ...state.contacts.starContact,
          loading: true,
        },
      };

    case STAR_CONTACT_SUCCESS:
      return {
        ...state,
        starContact: {
          ...state.contacts.starContact,
          loading: false,
          data: action.payload,
        },

        contacts: {
          ...state.contacts,
          data: state.contacts.data.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
      };

    case STAR_CONTACT_ERROR:
      return {
        ...state,
        starContact: {
          ...state.contacts.starContact,
          loading: false,
          error: action.payload,
        },
      };

    case EDIT_CONTACT_START:
      return {
        ...state,
        editContact: {
          ...state.contacts.editContact,
          loading: true,
        },
      };

    case EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        editContact: {
          ...state.contacts.editContact,
          loading: false,
          data: action.payload,
        },

        contacts: {
          ...state.contacts,
          data: state.contacts.data.map((item) =>
            item.id === action.payload.data.id ? action.payload.data : item
          ),
        },
      };

    case CLEAR_EDIT_CONTACT:
      return {
        ...state,
        editContact: {
          ...state.contacts.editContact,
          loading: false,
          data: null,
        },
        addContact: {
          ...state.contacts.addContact,
          loading: false,
          data: null,
        },
      };

    case SEARCH_CONTACTS:
      const userText = action.payload.replace("+", "").toLowerCase();
      return {
        ...state,
        contacts: {
          ...state.contacts,
          isSearchActive: !!action.payload.length ? [] : false,
          foundContacts: state.contacts.data.filter((item) => {
            try {
              return (
                item.first_name.toLowerCase().search(userText) !== -1 ||
                item.last_name.toLowerCase().search(userText) !== -1 ||
                item.phone_number.toLowerCase().search(userText) !== -1 ||
                item.country_code
                  .replace("+")
                  .toLowerCase()
                  .search(userText) !== -1
              );
            } catch (error) {
              return [];
            }
          }),
        },
      };

    case EDIT_CONTACT_ERROR:
      return {
        ...state,
        editContact: {
          ...state.contacts.editContact,
          loading: false,
          error: action.payload,
        },
      };

    case LOGOUT_USER_OUT: {
      return {
        ...state,
        contacts: initialContactsState,
      };
    }

    default:
      return state;
  }
};
