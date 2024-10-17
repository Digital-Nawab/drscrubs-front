import axios from "axios";
import BassURl from "../../Api/Api";
// async thunk to fetch products
export const fetchProductById = (productId ,term) => async (dispatch) => {
    // console.log(term)
    try {
        // Dispatch an action to indicate the start of the API request
        dispatch({ type: "FETCH_PRODUCT_BY_ID_REQUEST" });

        // Call the API service to fetch products
        const products = await axios.get(`${BassURl}/product-details/${productId}?color=${term}`).then((res) => {
            return res.data.data;
        });

        // Dispatch the success action with fetched data
        dispatch(fetchProductByIdSuccess(products));
    } catch (error) {
        // Dispatch the failure action with error message
        dispatch(fetchProductByIdFailure(error.message));
    }
};

export const fetchProductByIdSuccess = (products) => ({
    type: "FETCH_PRODUCT_BY_ID_SUCCESS",
    payload: products,
});

export const fetchProductByIdFailure = (error) => ({
    type: "FETCH_PRODUCT_BY_ID_FAILURE",
    payload: error,
});
