import axios from "axios";
import BassURl from "../../Api/Api";
const userData = JSON.parse(sessionStorage.getItem("userData"));
// async thunk to fetch ADDRESS
export const fectaddress = () => async (dispatch) => {
    try {
        // Dispatch an action to indicate the start of the API request
        dispatch({ type: "FETCH_ADDRESS_REQUEST" });

        // Call the API service to fetch ADDRESS
        const address = await axios.get(`${BassURl}/user-address/${userData?.id}`).then((res) => {
            return res.data.data;
        });

        // Dispatch the success action with fetched data

        console.log(address);
        dispatch(fectaddressSuccess(address));
    } catch (error) {
        // Dispatch the failure action with error message
        dispatch(fectaddressFailure(error.message));
    }
};

export const fectaddressSuccess = (address) => ({
    type: "FETCH_ADDRESS_SUCCESS",
    payload: address,
});

export const fectaddressFailure = (error) => ({
    type: "FETCH_ADDRESS_FAILURE",
    payload: error,
});
