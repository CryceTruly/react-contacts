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
        contacts: {
          ...state.contacts,
          loading: true,
        },
      };

    case "DELETE_CONTACT_SUCCESS":
      return {
        ...state,

        loading: false,
        data: action.payload,
      };

    case "DELETE_CONTACT_ERROR":
      return {
        ...state,

        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
