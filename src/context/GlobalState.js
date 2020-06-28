import React, { createContext, useReducer } from "react";
import reducers from "./reducers/index";
import auth from "./reducers/auth";
import contactsReducer from "./reducers/contacts";

// Initial state
const initialState = {
  auth: {
    error: null,
    data: null,
    loading: false,
  },
};
const initialContacts = {
  contacts: {
    error: null,
    data: null,
    loading: false,
  },

  addContact: {
    error: null,
    data: null,
    loading: false,
  },
  deleteContact: {
    error: null,
    data: null,
    loading: false,
  },

  starContact: {
    error: null,
    data: null,
    loading: false,
  },
  editContact: {
    error: null,
    data: null,
    loading: false,
  },
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, initialState);
  const [contactsState, contactsDispatch] = useReducer(
    contactsReducer,
    initialContacts
  );

  // Actions

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        contactsDispatch,
        contactsReducer,
        contactsState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
