import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";
import { fectaddress } from "./addressAction";

import { loginSuccess } from "./loginAction";
// Define action creator function for registering a user

export const registerUser = (userSignup) => {
  return (dispatch) => {
    dispatch(registerRequest());

    axios
      .post(`${BassURl}/signup`, userSignup)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(registerSuccess(res.data));
          if ("view-cart" === "view-cart") {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            toast.success("User registered successfully!");
            //alert("hello");
            navigate('/'); // Redirect to previous checkout page
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
        dispatch(registerFailure(error.message));
      });
  };
};

// Define action creator functions for registering request, success, and failure

export const registerRequest = () => ({
  type: "REGISTER_REQUEST",
});

export const registerSuccess = (userSignup) => ({
  type: "REGISTER_SUCCESS",
  payload: userSignup,
});

export const registerFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: error,
});
