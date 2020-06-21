const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        auth: { ...state.auth, loading: true },
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        auth: {
          ...state.auth,
          error: null,
          loading: false,
          data: action.payload,
        },
      };

    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: action.payload,
        },
      };

    case "CLEAR_AUTH": {
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: null,
          data: null,
        },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
