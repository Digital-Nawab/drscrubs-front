import axios from "axios";
import BassURl from "../../Api/Api";
// async thunk to fetch products
export const fetchProductBySubCategroy = (subCatID) => async (dispatch) => {
    console.log(subCatID)
    try {
        // Dispatch an action to indicate the start of the API request
        dispatch({ type: "FETCH_PRODUCT_BY_SUBCATEGORY_REQUEST" });

        // Call the API service to fetch products
        const subCatgory = await axios.get(`${BassURl}/product-by-sub-category/women/${subCatID}`).then((res) => {
          
                return res.data;

       

        });
        console.log(subCatgory);

        // Dispatch the success action with fetched data
        dispatch(fetchProductBySubCategroySuccess(subCatgory));
    } catch (error) {
        // Dispatch the failure action with error message
        dispatch(fetchProductBySubCategroyFailure(error.message));
    }
};

export const fetchProductBySubCategroySuccess = (subCatgory) => ({
    type: "FETCH_PRODUCT_BY_SUBCATEGORY_SUCCESS",
    payload: subCatgory,
});

export const fetchProductBySubCategroyFailure = (error) => ({
    type: "FETCH_PRODUCT_BY_SUBCATEGORY_FAILURE",
    payload: error,
});




