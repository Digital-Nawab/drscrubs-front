// Define initial state for the user slice of the store
import { toast } from "react-hot-toast";

const initialState = {
    userGuest: null,
    userLoading: false,
    error: null,
};

const userGuestReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GUESTUSER_REQUEST':
            return {
                ...state,
                userLoading: true,
                error: null,
            };
        case 'GUESTUSER_SUCCESS':
            return {
                ...state,
                userGuest: action.payload,
                userLoading: false,
            };
        case 'GUESTUSER_FAILURE':
            return {
                ...state,
                error: action.payload,
                userLoading: false,
            };
        default:
            return state;
    }
};


export default userGuestReducer;


