const initialState = {
    address: [],
    isAddressLoading: false,
    error: null,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ADDRESS_REQUEST":
            return { ...state, isAddressLoading: true, error: null };
        case "FETCH_ADDRESS_SUCCESS":
            return { ...state, address: action.payload, isAddressLoading: false };
        case "FETCH_ADDRESS_FAILURE":
            return { ...state, isAddressLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default addressReducer;
