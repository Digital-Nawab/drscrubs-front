import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = (props) => {

  const { Component } = props;
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.userLogin.isAuthenticated);
  //console.log("hello")
  console.log(isAuthenticated);

  useEffect(() => {
    let login = sessionStorage.getItem('userData');
    console.log(login);
    if (!login) {
      navigate('/login');
    }

  })

  return (<>

    <Component />



  </>)
};
export default ProtectedRoute;