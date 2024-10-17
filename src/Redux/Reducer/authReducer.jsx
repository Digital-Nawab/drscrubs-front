

// Define initial state for the user slice of the store
import { toast } from "react-hot-toast";

const initialState = {

    userSignup: null,
    userLoading: false,

    error: null,
};

// Define reducer function for the user slice of the store

const usersignupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {
                ...state,
                userLoading: true,
                error: null,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                userSignup: action.payload,
                userLoading: false,
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                error: action.payload,
                userLoading: false,
            };
        default:
            return state;
    }
};


export default usersignupReducer


