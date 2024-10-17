// Define initial state for the user slice of the store
import { toast } from "react-hot-toast";

const initialState = {


    orderData: null,
    userLoading: false,
    error: null,
};

// Define reducer function for the user slice of the store

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ORDER_REQUEST":
            return {
                ...state,
                userLoading: true,
                error: null,
            };
        case "ORDER_SUCCESS":
            return {
                ...state,
                orderData: action.payload,

                userLoading: false,
            };
        case "ORDER_FAILURE":
            return {
                ...state,
                error: action.payload,
                userLoading: false,
            };
        default:
            return state;
    }
};

export default orderReducer;
