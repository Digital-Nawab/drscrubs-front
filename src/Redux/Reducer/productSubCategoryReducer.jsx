

const initialState = {
    SubCatData: [],
    isLoading: false,
    error: null,
};

const productSubCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCT_BY_SUBCATEGORY_REQUEST":
            return { ...state, isLoading: true, error: null };
        case "FETCH_PRODUCT_BY_SUBCATEGORY_SUCCESS":
            return { ...state, SubCatData: action.payload, isLoading: false };
        case "FETCH_PRODUCT_BY_SUBCATEGORY_FAILURE":
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default productSubCategoryReducer;

  