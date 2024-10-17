const initialState = {
    orderByIdDetails: [],
    isOrderByIdDetailsLoading: false,
    error: null,
};
const getorderbyclientbyid = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ALL_ORDER_BY_USER_ID_REQUEST":
            return { ...state, isOrderByIdDetailsLoading: true, error: null };
        case "FETCH_ALL_ORDER_BY_USER_ID_SUCCESS":
            return { ...state, orderByIdDetails: action.payload, isOrderByIdDetailsLoading: false };
        case "FETCH_ALL_ORDER_BY_USER_ID_FAILURE":
            return { ...state, isOrderByIdDetailsLoading: false, error: action.payload };
        default:
            return state;
    }
};
export default getorderbyclientbyid;
