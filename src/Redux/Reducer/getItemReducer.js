const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, products: action.payload, isLoading: false };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default productsReducer;