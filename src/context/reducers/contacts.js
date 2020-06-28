export default (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT_START":
      return {
        ...state,
        addContact: {
          ...state.contacts.addContact,
          loading: true,
        },
      };
    case "ADD_CONTACT_SUCCESS":
      return {
        ...state,
        addContact: {
          ...state.contacts.addContact,
          loading: false,
          data: action.payload,
        },
      };

    case "ADD_CONTACT_ERROR":
      return {
        ...state,
        addContact: {
          ...state.contacts.addContact,
          loading: false,
          error: action.payload,
        },
      };

    case "GET_CONTACTS_START":
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: true,
        },
      };

    case "GET_CONTACTS_SUCCESS":
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          data: action.payload,
        },
      };

    case "GET_CONTACTS_ERROR":
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          error: action.payload,
        },
      };

    case "DELETE_CONTACT_START":
      return {
        ...state,
        deleteContact: {
          ...state.contacts.deleteContact,
          loading: true,
        },
      };

    case "DELETE_CONTACT_SUCCESS":
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

    case "DELETE_CONTACT_ERROR":
      return {
        ...state,
        deleteContact: {
          ...state.contacts.deleteContact,
          loading: false,
          error: action.payload,
        },
      };

    case "STAR_CONTACT_START":
      return {
        ...state,
        starContact: {
          ...state.contacts.starContact,
          loading: true,
        },
      };

    case "STAR_CONTACT_SUCCESS":
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

    case "STAR_CONTACT_ERROR":
      return {
        ...state,
        starContact: {
          ...state.contacts.starContact,
          loading: false,
          error: action.payload,
        },
      };

    case "EDIT_CONTACT_START":
      return {
        ...state,
        editContact: {
          ...state.contacts.editContact,
          loading: true,
        },
      };

    case "EDIT_CONTACT_SUCCESS":
      console.log("action.payload", action.payload);
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

    case "EDIT_CONTACT_ERROR":
      return {
        ...state,
        editContact: {
          ...state.contacts.editContact,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
