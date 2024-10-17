import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";
// Define action creator function for login a user

export const loginUser = (userLogin, navigate, location) => {
  console.log(location);
  //return;
  return (dispatch) => {
    dispatch(loginRequest());

    dispatch(loginSuccess(userLogin));
    //console.log(userLogin);
    axios
      .post(`${BassURl}/login`, userLogin)
      .then((res) => {
        //(location.state && location.state.from === "check-out")
        if (res.data.code === 200) {
          // Redirect logic based on previous page
          if ("view-cart" === "view-cart") {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            //alert("hello");
             // Redirect to previous checkout page
             if(location?.state?.prevPath=="/view-cart"){
              window.location.href= '/view-cart'
             }
             else{
              navigate("/");
             }
          } else {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            navigate("/"); // Redirect to home page
          }

          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 1000);
        } else if (res.data.code === 400) {
          toast.error(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
};

// Define action creator functions for login request, success, and failure

export const loginRequest = () => ({
  type: "LOGIN_REQUEST",
});

export const loginSuccess = (userLogin) => ({
  type: "LOGIN_SUCCESS",
  payload: userLogin,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
