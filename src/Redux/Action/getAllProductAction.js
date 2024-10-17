import axios from "axios";
import BassURl from "../../Api/Api";
// async thunk to fetch products
export const fetchAllProducts = () => async (dispatch) => {
  try {
    // Dispatch an action to indicate the start of the API request
    dispatch({ type: "FETCH_ALL_PRODUCTS_REQUEST" });

    // Call the API service to fetch products
    const products = await axios.get(`${BassURl}/all-product`).then((res) => {
      return res.data.data;
    });

    // Dispatch the success action with fetched data
    dispatch(fetchAllProductsSuccess(products)); 
  } catch (error) {
    // Dispatch the failure action with error message
    dispatch(fetchAllProductsFailure(error.message));
  }
};

export const fetchAllProductsSuccess = (products) => ({
  type: "FETCH_ALL_PRODUCTS_SUCCESS",
  payload: products,
});

export const fetchAllProductsFailure = (error) => ({
  type: "FETCH_ALL_PRODUCTS_FAILURE",
  payload: error,
});
