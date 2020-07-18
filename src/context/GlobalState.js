import React, { createContext, useReducer } from "react";
import auth from "./reducers/auth";
import contactsReducer from "./reducers/contacts";
import initialContactsState from "./initialStates/initialContactsState";
import initialAuthState from "./initialStates/initialAuthState";

// Create context
export const GlobalContext = createContext({});

// Provider component
export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, initialAuthState);
  const [contactsState, contactsDispatch] = useReducer(
    contactsReducer,
    initialContactsState
  );

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
