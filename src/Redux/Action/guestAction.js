import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";
import { loginSuccess } from "./loginAction";
export const registerGuest = (userGuest) => {
  console.log(userGuest);
  return (dispatch) => {

    dispatch(guestUserRequest());

    axios
      .post(`${BassURl}/guest-checkout`, userGuest)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(guestUserSuccess(res.data));
          if ("view-cart" === "view-cart") {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            //alert("hello");
            // navigate(-1); // Redirect to previous checkout page
            window.location.href = '/view-cart'
          } else {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            navigate("/"); // Redirect to home page
          }
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        dispatch(guestUserFailure(error.message));
      });
  };
};

// Define action creator functions for registering request, success, and failure

export const guestUserRequest = () => ({
  type: "GUESTUSER_REQUEST",
});

export const guestUserSuccess = (userGuest) => ({
  type: "GUESTUSER_SUCCESS",
  payload: userGuest,
});

export const guestUserFailure = (error) => ({
  type: "GUESTUSER_FAILURE",
  payload: error,
});
