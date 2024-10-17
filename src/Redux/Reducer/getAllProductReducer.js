const initialState = {
  allproducts: [],
  isProductLoading: false,
  error: null,
};

const allproductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCTS_REQUEST":
      return { ...state, isProductLoading: true, error: null };
    case "FETCH_ALL_PRODUCTS_SUCCESS":
      return { ...state, allproducts: action.payload, isProductLoading: false };
    case "FETCH_ALL_PRODUCTS_FAILURE":
      return { ...state, isProductLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default allproductsReducer;
