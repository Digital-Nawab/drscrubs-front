import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";

// Define action creator function for login a user

export const order = (orderData) => {
  //console.log(orderData);
  return (dispatch) => {
    dispatch(orderRequest());

    dispatch(orderSuccess(orderData));

    axios
      .post(`${BassURl}/checkout`, orderData)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
        
          window.localStorage.setItem(
            "order",
            JSON.stringify(res.data.order_id)
          );
          window.localStorage.removeItem('cartItems')
          window.localStorage.removeItem('emboidary')
          window.location.href = "/check-out";
        } else if (res.data.code === 400) {
          toast.error(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        dispatch(orderFailure(error.msg));
      });
  };
};

// Define action creator functions for login request, success, and failure

export const orderRequest = () => ({
  type: "ORDER_REQUEST",
});

export const orderSuccess = (orderData) => ({
  type: "ORDER_SUCCESS",
  payload: orderData,
});

export const orderFailure = (error) => ({
  type: "ORDER_FAILURE",
  payload: error,
});
