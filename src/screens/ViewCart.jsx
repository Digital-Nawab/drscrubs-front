import React, { Suspense, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import imageURl from "../Api/ImageUrl";
import ViewCartInner from "../components/ViewCartInner";
import Footer from "../components/Footer";
import axios from "axios";
import BassURl from "../Api/Api";
import Addaddress from "../components/Modal/Addaddress";
import { Link, useLocation } from "react-router-dom";
import { registerGuest } from "../Redux/Action/guestAction";
import { order } from "../Redux/Action/OrderSuccessAction";
import "./Viewcart.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import MyContext from "../context/MyContext";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
//   LanguageSelect,
// } from "react-country-state-city";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
// import "react-country-state-city/dist/react-country-state-city.css";

function ViewCart() {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  useEffect(() => {
    //console.log(selectedCountry);
    //console.log(selectedCountry?.isoCode);
    //console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    first_name: "",
    phoneNumber: "",
    email: "",
    country: "",
    state: "",
    city: "",
    fullAddress: "",
    zip: "",
    errors: {
      first_name: "",
      phoneNumber: "",
      email: "",
      country: "",
      state: "",
      city: "",
      fullAddress: "",
      zip: "",
    },
  });

  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      try {
        const response = await axios.post(`${BassURl}/get-single-data`, {
          tab: "client",
          [name]: value,
        });
        //console.log(response.data.code === 200);
        if (response.data.code === 200) {
          setEmailExists(true);
          setErrorMessage("The email already exists. Please login.");
        } else {
          setEmailExists(false);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error checking email:", error);
        // Handle error state accordingly
      }
    } else if (name === "country") {
      fetchStates(value);
    } else if (name === "state") {
      fetchCities(value);
    }
  };

  const validateForm = () => {
   const zipRegExp = /^\d{6}$/;
   const generalZipRegExp = /^\d{5}$/;

    const {
      first_name,
      phoneNumber,
      email,
      country,
      state,
      city,
      fullAddress,
      zip,
    } = formData;

    const errors = {
      first_name: "",
      phoneNumber: "",
      email: "",
      country: "",
      state: "",
      city: "",
      fullAddress: "",
      zip: "",
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

    const phoneRegExp = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumber) {
      isValid = false;
      errors.phoneNumber = "Phone number is required";
    } else if (!phoneRegExp.test(phoneNumber)) {
      isValid = false;
      errors.phoneNumber = "Please enter a valid phone number";
    }
    
    if (!country) {
      isValid = false;
      errors.country = "Country is required";
    }
    if (!state) {
      isValid = false;
      errors.state = "State is required";
    }
    if (!city) {
      isValid = false;
      errors.city = "City is required";
    }

    if (!fullAddress) {
      isValid = false;
      errors.fullAddress = "Full Address is required";
    } else if (fullAddress.length < 5) {
      isValid = false;
      errors.fullAddress = "Please enter a valid address";
    }

    if (!zip) {
      isValid = false;
      errors.zip = "ZIP code is required";
    } else if (!zipRegExp.test(zip) && !generalZipRegExp.test(zip)) {
      isValid = false;
      errors.zip = "Please enter a valid ZIP code";
    }
    setFormData((prevState) => ({
      ...prevState,
      isValidForm: isValid,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));

    setTimeout(() => {
      setFormData((prevState) => ({
        ...prevState,
        errors: {
          first_name: "",
          phoneNumber: "",
          email: "",
          country: "",
          state: "",
          city: "",
          fullAddress: "",
          zip: "",
        },
      }));
    }, 3000);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setFormData((prevState) => ({ ...prevState, isValidForm: true }));
      //console.log(formData);
      dispatch(registerGuest(formData));
    }
  };

  const {
    first_name,
    email,
    phoneNumber,
    fullAddress,
    country,
    state,
    city,
    zip,
    errors,
  } = formData;

  const context = useContext(MyContext);
  const { sessionValue } = context;

  const [address, setAddress] = useState("");
  useEffect(() => {
    axios.get(`${BassURl}/user-address/${sessionValue?.id}`).then((res) => {
      setAddress(res.data);
    });
    //console.log(address);
  }, []);

  useEffect(() => {
    if (sessionValue) {
      axios.get(`${BassURl}/user-address/${sessionValue.id}`).then((res) => {
        setAddress(res.data);
      });
    }
  }, [sessionValue]);

  const [userAddress, setuserAddress] = useState();

  //console.log(userAddress);

  const [addAddress, setaddAddress] = useState(false);

  useEffect(() => {
    if (addAddress) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [addAddress]);

  function add_Address() {
    // console.log("hello");
    setaddAddress(true);
  }

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;
  const location = useLocation();
  //console.log(location);

  // currency check

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  //console.log(countryData);
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));
  const countryName = localStorage.getItem("selectedCountry");

  var grandTotal = 0;
  {
    cartItems.map((item, index) => {
      const embroideryPrice =
        item.emboidery.length > 0 ? item.emboidery[0].price : 0;
      return (grandTotal += embroideryPrice * item?.qty);
    });
  }
  //console.log(grandTotal)

  if (countryData === "INR") {
    var subtotal = cartItems?.reduce(
      (acc, item) => acc + item?.price_rupee * item?.qty,
      0
    );
  } else {
    var subtotal = cartItems?.reduce(
      (acc, item) => acc + item?.price_doller * item?.qty,
      0
    );
  }

  // const totalPrice = subtotal + grandTotal
  const [CheckOut, setCheckOut] = useState();
  useEffect(() => {}, []);
  const emboidery = JSON.parse(localStorage.getItem("emboidery"));
  const checkoutData = {
    data: cartItems,
    total: subtotal,
    emboidery: emboidery,
  };

  // Handle total price when emboidery added
  let login = JSON.parse(sessionStorage.getItem("userData"));
  //console.log(login);

  const VeiwCartstyle = {
    backgroundImage: `url("assets/img/view-cart.jpg")`,
    backgroundColor: "#00000082",
    backgroundBlendMode: "overlay",
    width: "100%",
  };

  const proceedTOCheckOut = () => {
    const orderData = {
      client_id: sessionValue?.id,
      address_id: 0,
      product_count: cartItems.length,
      emboidery_price: grandTotal,
      size_price: 0,
      coupon_amount: 0,
      coupon_code: 0,
      delivery_fee: 0,
      addon_amount: 0,
      currency: countryData,
      bill_amount: parseInt(subtotal) + parseInt(grandTotal),
      paid_amount: parseInt(subtotal) + parseInt(grandTotal),
      payment_method: "online",
      razorpay_order_id: "",
      razorpay_payment_id: "",
      payment_status: "",
      country: countryName,
      order_instructions: "",
      products: cartItems,
    };
    dispatch(order(orderData));
    //console.log(orderData);
    //return false;
  };

  return (
    <>
      <Navbar />
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
        <section
          className="breadcrumb__section breadcrumb__bg"
          style={VeiwCartstyle}
        >
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    Shopping Cart
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex justify-content-center">
                    <li className="breadcrumb__content--menu__items">
                      <a className="text-white" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">Shopping Cart</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}

        <section className="cart-section">
          <div className="container">
            <div className="row product-list justify-content-center">
              <div className="col-md-12">
                <div className="d-flex align-items-center mb-4">
                  <h3 className="mb-3 flex-grow-1 fw-medium">Shopping Cart</h3>
                </div>
              </div>
              <div className="col-lg-7">
                {cartItems &&
                  cartItems?.map((item) => {
                    //console.log(item);

                    return (
                      <ViewCartInner
                        countryData={countryData}
                        data={item}
                        key={item.id}
                      />
                    );
                  })}
                {/* <div className="continue__shopping d-flex justify-content-between text-center mb-4">
                    <a className="continue__shopping--link text-white primary__btn" href="/">
                      Continue shopping
                    </a>
                </div> */}
                {!sessionValue && (
                  <div className="sticky-side-div">
                    <div className="card overflow-hidden">
                      <div className="card-header border-bottom-dashed">
                        <h5 className="card-title mb-0 fs-15">Order Summary</h5>
                      </div>

                      <div className="card-body pt-4">
                        <div className="cart__note mb-20">
                          <h3 className="cart__note--title">Note</h3>
                          <p className="cart__note--desc">
                            Add special instructions for your seller...
                          </p>
                          <textarea
                            className="cart__note--textarea border-radius-5"
                            defaultValue={""}
                          />
                        </div>
                        <div className="table-responsive table-card">
                          <table className="table table-border mb-0 fs-15">
                            {countryData === "INR" ? (
                              <>
                                <tbody>
                                  <tr>
                                    <td>Sub Total :</td>
                                    <td className="text-end cart-subtotal">
                                      ₹{" "}
                                      {subtotal +
                                        grandTotal +
                                        (addSizePrice != null &&
                                        addSizePrice !== 0
                                          ? parseInt(addSizePrice)
                                          : 0)}
                                    </td>
                                  </tr>

                                  <tr className="total-btn-tr">
                                    <th>Total :</th>
                                    <td className="text-end">
                                      <span className="fw-semibold cart-total">
                                        ₹{" "}
                                        {subtotal +
                                          grandTotal +
                                          (addSizePrice != null &&
                                          addSizePrice !== 0
                                            ? parseInt(addSizePrice)
                                            : 0)}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </>
                            ) : (
                              <>
                                <tbody>
                                  <tr>
                                    <td>Sub Total :</td>
                                    <td className="text-end cart-subtotal">
                                      ${" "}
                                      {subtotal +
                                        grandTotal +
                                        (addSizePrice != null &&
                                        addSizePrice !== 0
                                          ? parseInt(addSizePrice)
                                          : 0)}
                                    </td>
                                  </tr>
                                  <tr className="fs-2">
                                    <th>Total :</th>
                                    <td className="text-end">
                                      <span className="fw-semibold cart-total">
                                        ${" "}
                                        {subtotal +
                                          grandTotal +
                                          (addSizePrice != null &&
                                          addSizePrice !== 0
                                            ? parseInt(addSizePrice)
                                            : 0)}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </>
                            )}
                          </table>
                        </div>
                        {/* end table-responsive */}
                      </div>
                    </div>
                    <div className="hstack gap-2 justify-content-end">
                      {/* <button type="button" className="btn btn-hover btn-danger">
                      Continue Shopping
                    </button> */}
                    </div>
                  </div>
                )}
              </div>
              {/*end col*/}
              <div className="col-lg-5">
                {!sessionValue && (
                  <div className="checkout-wrapper">
                    <div className="account-section billing-section box-shadows">
                      <h3 className="wrapper-heading mb-5">
                        Guest Login{" "}
                        {/* <a
                          className="cart__summary--footer__btn primary__btn checkout mt-3 btn-sm float-right"
                          href="/login"
                        >
                          Login
                        </a> */}
                        <Link
                          className="cart__summary--footer__btn primary__btn checkout mt-3 btn-sm float-right"
                          to="/login"
                          state={{ prevPath: location.pathname }}
                        >
                          Login
                        </Link>
                      </h3>

                      {/* <h4 className="mb-4"><a  href="/login">Login</a> or Register for faster payment.</h4> */}
                      <div className="review-form">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="review-form-name">
                                <label htmlFor="fname" className="form-label">
                                  Full Name*
                                </label>
                                <input
                                  type="text"
                                  id="fname"
                                  name="first_name"
                                  className="form-control"
                                  placeholder="Full Name"
                                  value={first_name}
                                  onChange={handleChange}
                                />
                                {errors.first_name && (
                                  <p className="error">{errors.first_name}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="review-form-name">
                                <label htmlFor="mobile" className="form-label">
                                  Phone*
                                </label>
                                <PhoneInput
                                  className=""
                                  country={"in"}
                                  value={phoneNumber}
                                  onChange={(value, country) =>
                                    handleChange(
                                      {
                                        target: { name: "phoneNumber", value },
                                      },
                                      country
                                    )
                                  }
                                />
                                {errors.phoneNumber && (
                                  <p className="error">{errors.phoneNumber}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <label htmlFor="email" className="form-label">
                                Email*
                              </label>
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleChange}
                              />
                              {emailExists && (
                                <p style={{ color: "red" }}>{errorMessage}</p>
                              )}
                              {errors.email && (
                                <p className="error">{errors.email}</p>
                              )}
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="review-form-name address-form">
                                <label htmlFor="address" className="form-label">
                                  Address*
                                </label>
                                <textarea
                                  id="address"
                                  name="fullAddress"
                                  className="form-control"
                                  placeholder="Enter your Address"
                                  rows={2}
                                  cols={50}
                                  value={fullAddress}
                                  onChange={handleChange}
                                ></textarea>
                                {errors.fullAddress && (
                                  <p className="error">{errors.fullAddress}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="review-form-name">
                                <label htmlFor="country" className="form-label">
                                  Country*
                                </label>
                                <Select
                                    options={Country.getAllCountries()}
                                    getOptionLabel={(options) => {
                                      return options["name"];
                                    }}
                                    getOptionValue={(options) => {
                                      return options["name"];
                                    }}
                                    placeholder="Select Country"
                                    value={selectedCountry}
                                    onChange={(item) => {
                                      setSelectedCountry(item);
                                      //console.log(item);
                                      setFormData({
                                        ...formData,
                                        country: item.name + "-" + item.isoCode,
                                        country_code: item.isoCode,
                                      });
                                    }}
                                  />
                                {formData.errors.country && (
                                  <p className="error">
                                    {formData.errors.country}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="review-form-name">
                                <label htmlFor="state" className="form-label">
                                  State*
                                </label>
                                <Select
                                  options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  placeholder="Select State"
                                  value={selectedState}
                                  onChange={(item) => {
                                    setSelectedState(item);
                                    //console.log(item);
                                    setFormData({
                                      ...formData,
                                      state: item.name + "-" + item.isoCode,
                                      state_code: item.isoCode,
                                    });
                                  }}
                                />
                                {formData.errors.state && (
                                  <p className="error">
                                    {formData.errors.state}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="review-form-name">
                                <label htmlFor="city" className="form-label">
                                  City*
                                </label>
                                <Select
                                  options={City.getCitiesOfState(
                                    selectedState?.countryCode,
                                    selectedState?.isoCode
                                  )}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  placeholder="Select City"
                                  value={selectedCity}
                                  onChange={(item) => {
                                    setSelectedCity(item);
                                    setFormData({
                                      ...formData,
                                      city: item.name,
                                    });
                                  }}
                                />
                                {formData.errors.city && (
                                  <p className="error">
                                    {formData.errors.city}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="review-form-name">
                                <label htmlFor="number" className="form-label">
                                  Postcode / ZIP*
                                </label>
                                <input
                                  type="number"
                                  id="number"
                                  name="zip"
                                  className="form-control"
                                  placeholder="Postcode / ZIP"
                                  value={zip}
                                  onChange={handleChange}
                                />
                                {errors.zip && (
                                  <p className="error">{errors.zip}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="cart__summary--footer__btn primary__btn checkout mt-3"
                              >
                                Proceed to Checkout
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {sessionValue && (
                  <div className="sticky-side-div">
                    <div className="card overflow-hidden">
                      <div className="card-header border-bottom-dashed">
                        <h5 className="card-title mb-0 fs-15">Order Summary</h5>
                      </div>

                      <div className="card-body pt-4">
                        <div className="cart__note mb-20">
                          <h3 className="cart__note--title">Note</h3>
                          <p className="cart__note--desc">
                            Add special instructions for your seller...
                          </p>
                          <textarea
                            className="cart__note--textarea border-radius-5"
                            defaultValue={""}
                          />
                        </div>
                        <div className="table-responsive table-card">
                          <table className="table table-border mb-0 fs-15">
                            {countryData === "INR" ? (
                              <>
                                <tbody>
                                  <tr>
                                    <td>Sub Total :</td>
                                    <td className="text-end cart-subtotal">
                                      ₹ {subtotal}
                                    </td>
                                  </tr>

                                  <tr className="total-btn-tr">
                                    <th>Total :</th>
                                    <td className="text-end">
                                      <span className="fw-semibold cart-total">
                                        ₹{" "}
                                        {subtotal +
                                          grandTotal +
                                          (addSizePrice != null &&
                                          addSizePrice !== 0
                                            ? parseInt(addSizePrice)
                                            : 0)}
                                      </span>
                                    </td>
                                  </tr>
                                  <button
                                    className="cart__summary--footer__btn primary__btn checkout mt-3"
                                    onClick={proceedTOCheckOut}
                                  >
                                    Proceed to Checkout
                                  </button>
                                </tbody>
                              </>
                            ) : (
                              <>
                                <tbody>
                                  <tr>
                                    <td>Sub Total :</td>
                                    <td className="text-end cart-subtotal">
                                      $ {subtotal}
                                    </td>
                                  </tr>
                                  <tr className="fs-2">
                                    <th>Total :</th>
                                    <td className="text-end">
                                      <span className="fw-semibold cart-total">
                                        ${" "}
                                        {subtotal +
                                          grandTotal +
                                          (addSizePrice != null &&
                                          addSizePrice !== 0
                                            ? parseInt(addSizePrice)
                                            : 0)}
                                      </span>
                                    </td>
                                  </tr>
                                  <button
                                    className="cart__summary--footer__btn primary__btn checkout mt-3"
                                    onClick={proceedTOCheckOut}
                                  >
                                    Proceed to Checkout
                                  </button>
                                </tbody>
                              </>
                            )}
                          </table>
                        </div>
                        {/* end table-responsive */}
                      </div>
                    </div>
                    <div className="hstack gap-2 justify-content-end">
                      {/* <button type="button" className="btn btn-hover btn-danger">
                      Continue Shopping
                    </button> */}
                    </div>
                  </div>
                )}
                {/* end sticky */}
              </div>
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>

        {/* Start product section */}

        {/* End product section */}
        {/* Start brand logo section */}

        {/* End brand logo section */}
        {/* Start shipping section */}
        <section className="shipping__section2 shipping__style3 section--padding p-5">
          <div className="container">
            <div className="shipping__section2--inner shipping__style3--inner d-flex justify-content-between">
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping1.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">
                    Shipping
                  </h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping2.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">
                    Payment
                  </h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping3.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">
                    Return
                  </h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping4.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">
                    Support
                  </h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {addAddress ? (
        <Suspense
          fallback={
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Addaddress hide={setaddAddress} />
        </Suspense>
      ) : null}

      <Footer />
    </>
  );
}

export default ViewCart;
