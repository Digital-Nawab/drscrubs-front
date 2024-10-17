import React, { useEffect, useState } from "react";
import BannerSlider from "../components/BannerSlider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../Redux/Action/authAction";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import './Login.css';

function SignupPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
   // using Distach and use selector
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignup);

  // Signup Form
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    isValidForm: false,
    errors: {
      first_name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false); // add state for show/hide password
  const [showConfirmPassword, setConfirmPassword] = useState(false); // add state for show/hide confrim password




  // toggle show/hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setConfirmPassword(prevState => !prevState);
  };



  const handleChange = (e, country) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    if (name === 'phoneNumber') {
      // Handle phone number change
      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: fieldValue,
        errors: {
          ...prevState.errors,
          phoneNumber: '',
        },
      }));
    } else {
      // Handle other input changes
      setFormData((prevState) => ({
        ...prevState,
        [name]: fieldValue,
        errors: {
          ...prevState.errors,
          [name]: '',
        },
      }));
    }
  };

  const validateForm = () => {
    // Regular expression for Indian phone number validation
    // const phoneRegExp = /^((\+|0{0,2})91(\s|-)?)?[789]\d{9}$/;
    // Regular expression for password validation
    //const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d).{6,16}$/;
    const {
      first_name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      termsAccepted,
    } = formData;
    const errors = {
      first_name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    };
    let isValid = true;

    if (!first_name) {
      isValid = false;
      errors.first_name = "Username is required";
    }

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      errors.email = "Please enter a valid email address";
    }

    // if (!phoneNumber) {
    //   isValid = false;
    //   errors.phoneNumber = "Phone Number is required";
    // } else if (!phoneRegExp.test(phoneNumber)) {
    //   isValid = false;
    //   errors.phoneNumber = "Please enter a valid Indian phone number";
    // }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (!passwordRegExp.test(password)) {
      isValid = false;
      errors.password =
        // "Password must contain at least 8 characters with at least one letter and one number";
        "Password must be between 6 and 16 characters and contain at least one letter and one number";
    }

    if (!confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      isValid = false;
      errors.confirmPassword = "Passwords do not match";
    }

    if (!termsAccepted) {
      isValid = false;
      errors.termsAccepted = "Please accept the terms and conditions";
    }

    setFormData((prevState) => ({
      ...prevState,
      isValidForm: isValid,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));

    return isValid;
  };

  // Here i




  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setFormData((prevState) => ({ ...prevState, isValidForm: true }));
      console.log(formData);
      dispatch(registerUser(formData));
      
    }
  };

  const {
    first_name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    termsAccepted,
    isValidForm,
    errors,
  } = formData;


  const style = {    
    backgroundImage : `url("assets/img/about-us-final.jpeg")`,
    backgroundColor : '#00000082',
    backgroundBlendMode : 'overlay'
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbar />

      <main className="main__content_wrapper">
        <section className="breadcrumb__section breadcrumb__bg" style={style}>
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    Sign-Up
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="signup-section">
          <div className="container">
            <div className="login-register pt-2">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                  <div className="inner h-100">
                    <form onSubmit={handleSubmit} className="customer-form">
                      <h3 className="text-center mb-4">
                        Register here if you are a new customer
                      </h3>
                      <div className="form-row">
                        <div className="form-group col-12">
                          <input
                            className="form-control"
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={handleChange}
                            placeholder="Full Name"
                          />
                          {errors.first_name && (
                            <p className="error">{errors.first_name}</p>
                          )}
                        </div>
                        <div className="form-group col-12">
                          <PhoneInput
                            className=""
                            country={'in'} 
                            value={phoneNumber} 
                            onChange={(value, country) =>
                              handleChange(
                                { target: { name: 'phoneNumber', value } },
                                country
                              )
                            } // Handle phone number change
                          />
                          {/* {errors.phoneNumber && (
                            <p className="error">{errors.phoneNumber}</p>
                          )} */}
                        </div>
                        <div className="form-group col-12">
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                          />
                          {errors.email && (
                            <p className="error">{errors.email}</p>
                          )}
                        </div>
                        <div className="form-group col-12" style={{ height: '60px' }}>
                          <input
                            className="form-control"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                          />
                          <span className="showPassword" onClick={handleTogglePassword}>
                            {showPassword ? (
                              <i class="fa fa-eye" aria-hidden="true"></i>
                            ) : (
                              <i class="fa fa-eye-slash" aria-hidden="true"></i>
                            )}
                          </span>
                          {errors.password && (
                            <p className="error">{errors.password}</p>
                          )}
                        </div>
                        <div className="form-group col-12" style={{ height: '60px' }}>
                          <input
                            className="form-control"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                          />
                          <span className="showPassword" onClick={handleToggleConfirmPassword}>
                            {showConfirmPassword ? (
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            ) : (
                              <i className="fa fa-eye-slash" aria-hidden="true"></i>
                            )}
                          </span>
                          {errors.confirmPassword && (
                            <span className="error">{errors.confirmPassword}</span>
                          )}
                        </div>
                        <div className="form-group col-12">
                            <div className="login-remember-forgot d-flex justify-content-between align-items-center mb-4">
                              <div className="remember-check customCheckbox1">
                                  <input
                                      className="checkbox"
                                      id="check1"
                                      type="checkbox"
                                      name="termsAccepted"
                                      checked={termsAccepted}
                                      onChange={handleChange}
                                      required
                                  />
                                  
                                   &nbsp; I have read and agree to the terms & conditions
                                  {errors.termsAccepted && (
                                <p className="error">{errors.termsAccepted}</p>
                                  )}
                              </div>
                            </div>
                        </div>
                        <div className="form-group col-12 mb-0">
                          <input
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                            value="Register"
                          />
                        </div>
                      </div>
                    </form>
                    {/* <div className="login-divide">
                      <span className="login-divide-text">OR</span>
                    </div>
                    <p className="text-center text-muted mb-3">Or Sign up with</p>
                    <div className="login-social d-flex-justify-center">
                      <a
                        className="social-link facebook rounded-5 d-flex-justify-center"
                        href="#"
                      >
                        <i className="icon anm anm-facebook-f me-2" /> Facebook
                      </a>
                      <a
                        className="social-link google rounded-5 d-flex-justify-center"
                        href="#"
                      >
                        <i className="icon anm anm-google-plus-g me-2" /> Google
                      </a>
                    </div> */}
                    <div className="login-signup-text mt-4 mb-2 text-center text-muted">
                      Already have an account?{' '}
                      <a href="/login" className="btn-link">
                        Login now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       
      </main>
      <Footer />
    </>
  );
}

export default SignupPage;
