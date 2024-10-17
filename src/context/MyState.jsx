import React, { useEffect, useState } from 'react'
import MyContext from './MyContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BassURl from '../Api/Api';
import toast from 'react-hot-toast';

function MyState(props) {
   const [sessionValue, setSessionValue] = useState()
   useEffect(()=>{
    const value = JSON.parse(sessionStorage.getItem("userData"));
    setSessionValue(value);
   },[])


   const payment = (orderData)=>{
    console.log(orderData);
    axios
      .post(`${BassURl}/payment`, orderData)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
        
          window.localStorage.setItem(
            "pay-order",
            JSON.stringify(res.data.order_id)
          );
          window.localStorage.removeItem('cartItems')
          window.localStorage.removeItem('emboidary')
          setTimeout(() => {
            window.location.href = "/order-success";
          }, 300);
        } else if (res.data.code === 400) {
          toast.error(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        toast.error("error");

        // dispatch(orderFailure(error.msg));
      });
   }

   


   

return (
    <MyContext.Provider value={{sessionValue , payment }}>
       {props.children}
    </MyContext.Provider>
  )
}

export default MyState