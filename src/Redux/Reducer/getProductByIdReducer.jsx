const initialState = {
    productDetails: [],
    isProductLoading: false,
    error: null,
  };
  
  const productByIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_PRODUCT_BY_ID_REQUEST":
        return { ...state, isProductLoading: true, error: null };
      case "FETCH_PRODUCT_BY_ID_SUCCESS":
        return { ...state, productDetails: action.payload, isProductLoading: false };
      case "FETCH_PRODUCT_BY_ID_FAILURE":
        return { ...state, isProductLoading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default productByIdReducer;
  