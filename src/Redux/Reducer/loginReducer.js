// Define initial state for the user slice of the store
import { toast } from "react-hot-toast";

const initialState = {
  name: "auth",
  isAuthenticated: false,
  userLogin: null,
  userLoading: false,
  error: null,
};

// Define reducer function for the user slice of the store

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        userLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userLogin: action.payload,
        isAuthenticated: true,
        userLoading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: action.payload,
        userLoading: false,
      };
    default:
      return state;
  }
};

export default userLoginReducer;
