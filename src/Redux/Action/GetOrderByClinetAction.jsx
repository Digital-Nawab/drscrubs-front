import axios from "axios";
import BassURl from "../../Api/Api";
// async thunk to fetch products
export const fetchOrderById = (clientId) => async (dispatch) => {
    //console.log(clientId)
   
    try {
        // Dispatch an action to indicate the start of the API request
        dispatch({ type: "FETCH_ALL_ORDER_BY_USER_ID_REQUEST" });

        // Call the API service to fetch products
        const order = await axios.get(`${BassURl}/user/my-order/${clientId}`).then((res) => {
            return res?.data?.data;
        });
        //console.log(order)

        // Dispatch the success action with fetched data
        dispatch(fetchOrderByIdSuccess(order));
    } catch (error) {
        // Dispatch the failure action with error message
        dispatch(fetchOrderByIdFailure(error.message));
    }
};

export const fetchOrderByIdSuccess = (order) => ({
    type: "FETCH_ALL_ORDER_BY_USER_ID_SUCCESS",
    payload: order,
});

export const fetchOrderByIdFailure = (error) => ({
    type: "FETCH_ALL_ORDER_BY_USER_ID_FAILURE",
    payload: error,
});
