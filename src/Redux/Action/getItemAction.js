// const BassURl = `https://drscrubsadmin.digitalnawab.com/api`;
// export default BassURl;

import axios from "axios";
import BassURl from "../../Api/Api"
// async thunk to fetch products
export const fetchProducts = () => async (dispatch) => {
  try {
    // Dispatch an action to indicate the start of the API request
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });

    // Call the API service to fetch products
    const tags = await axios.get(`${BassURl}/all-tags`).then((res) => {
      return res.data;
    });

    // Dispatch the success action with fetched data
    dispatch(fetchProductsSuccess(tags));
  } catch (error) {
    // Dispatch the failure action with error message
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductsSuccess = (products) => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: "FETCH_PRODUCTS_FAILURE",
  payload: error,
});
