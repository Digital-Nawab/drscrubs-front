import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartSlider from "./CartSlider";
import SignupModel from "./SignupModel";
import { useQuery } from "react-query";
import axios from "axios";
import BassURl from "../Api/Api";
import GetIPaddress from "./getIPaddress";
import { motion } from "framer-motion";
import Flag from "react-world-flags";

function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsNavHidden(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show Cart Slider
  const [show, setShow] = useState(false);
  function onShow() {
    setShow(true);
  }
  // Show Login Model
  const [loginShow, SetLoginShow] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (loginShow) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [loginShow]);
  function loginModelShow() {
    SetLoginShow(true);
  }
  // total number of item in cart

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  // country code
  // Show Login Model
  const [countryShow, setCountryShow] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (countryShow) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [countryShow]);

  function countryModelShow() {
    setCountryShow(true);
  }



  //  get  coutry using user ipaddress
  const [country, setCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {

    const hasVisitedBefore = localStorage.getItem("visitedBefore");
    if (!hasVisitedBefore) {
      setShowModal(true);
      localStorage.setItem("visitedBefore", true);
    }
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      setSelectedCountry(storedCountry);
      setCountry(storedCountry);
      setCurrency(getCurrency(storedCountry));
      fetchCountryFlag(storedCountry);
    } else {
      fetchCountry();
    }
  }, []);

  const fetchCountry = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const retrievedCountry = response.data.country_name;
      setSelectedCountry(retrievedCountry);
      setCountry(retrievedCountry);
      setCurrency(getCurrency(retrievedCountry));
      fetchCountryFlag(retrievedCountry);
      localStorage.setItem("selectedCountry", retrievedCountry);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrency = (country) => {
    return country === "India" ? "INR" : "USD";
  };
  localStorage.setItem("currencyTop", JSON.stringify(currency));

  const handleCountryChange = (event) => {
    const newSelectedCountry = event.target.value;
    const newCurrency = getCurrency(newSelectedCountry);
    setSelectedCountry(newSelectedCountry);
    setCountry(newSelectedCountry);
    setCurrency(getCurrency(newSelectedCountry));
    fetchCountryFlag(newSelectedCountry);
    localStorage.setItem("selectedCountry", newSelectedCountry);
    localStorage.setItem("currencyTop", JSON.stringify(newCurrency));
    setTimeout(() => {
      window.location.reload();
      handleModalClose(false);
    }, 1000);
  };

  const fetchCountryFlag = async (countryName) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${countryName}?fullText=true`
      );
      const countryData = response.data[0];
      setCountryCode(countryData.alpha2Code);
    } catch (error) {
      console.log(error);
    }
  };

  // update body class when Show changes
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("offCanvas__minicart_active");
    } else {
      document.body.classList.remove("offCanvas__minicart_active");
    }
  }, [showModal]);

  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  // console.log(countryData);

  // console.log(userData);

  const logOut = () => {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    window.location.reload();
  };
  const [openMobile, setopenMobile] = useState(false);
  useEffect(() => {
    if (openMobile) {
      document.body.classList.add("mobile_menu_open");
    } else {
      document.body.classList.remove("mobile_menu_open");
    }
  }, [openMobile]);

  function openMobileMenu() {
    setopenMobile(true);
  }

  // all tags api here

  const { data, isLoading, isError } = useQuery("tags", () => {
    return axios.get(`${BassURl}/all-tags`);
  });

  // create category

  const [Category, setCategory] = useState([]);

  const [subCategory, setsubCategory] = useState([]);
  useEffect(() => {
    axios.get(`${BassURl}/all-categories-and-sub-category`).then((res) => {
      setCategory(res.data.data.category);
      setsubCategory(res.data.data.sub_category);
    });
  }, []);

  // console.log(subCategory, "hello");
  const filteredCategories = Category.filter(
    category => category.category_for === 'female' || category.category_for === 'unisex'
  );

  // filterCategoriesMen

  const filteredCategoriesmen = Category.filter(
    category => category.category_for === 'male' || category.category_for === 'unisex'
  );
  const filteredCategoriesUnisex = Category.filter(
    category => category.category_for === 'unisex'
  );

  //  State to manage the active class and display style
  const [isActive, setIsActive] = useState(false);
  const handleClickActive = () => {
    setIsActive(!isActive);
  };

  const [womeHomeActive, setWomeHomeActive] = useState(false);
  const handleWomenClickActive = () => {
    setWomeHomeActive(!womeHomeActive);
  }

  const [innerSubMenuActive, setInnerSubMenuActive] = useState(false);
  const handleInnerSubMenuClick = () => {
    setInnerSubMenuActive(!innerSubMenuActive);
  };

  const [menSubMenuActive, setMenSubMenuActive] = useState(false);

  const handleMenClickActive = () => {
    setMenSubMenuActive(!menSubMenuActive);
  };

  const [MenHomeActive, setMenHomeActive] = useState(false);
  const handleMenHomeClickActive = () => {
    setMenHomeActive(!MenHomeActive);
  }

  const [innerMenSubMenuActive, setinnerMenSubMenuActive] = useState(false);

  const handleInnerMenSubMenuClick = () => {
    setinnerMenSubMenuActive(!innerMenSubMenuActive);
  }

  return (
    <>
      <GetIPaddress />
      <header className="header__section color-scheme-2">
        <div className="header__topbar bg__secondary">
          <div className="container">
            <div className="header__topbar--inner d-flex align-items-center justify-content-between">
              <div className="header__shipping">
                <p className="header__shipping--text text-white">
                  <img src="/assets/img/email.png" srcSet="/assets/img/email.png" width={25} height={25} alt="email" /> drscrubscustomercare@gmail.com | <Link to="https://wa.me/+918287589790" target="_blank"><img src="/assets/img/wp.png" srcSet="/assets/img/wp.png" width={25} height={25} alt="whatsApp" /> +918287589790</Link> | <Link to="tel:+918076356808"> <img src="/assets/img/call.png" srcSet="/assets/img/call.png" width={25} height={25} alt="mobile" /> +918076356808</Link>
                </p>
              </div>
              <div className="language__currency d-none d-lg-block">
                <ul className="d-flex align-items-center">
                  <li className="header__shipping--text text-white">
                    <img
                      className="header__shipping--text__icon"
                      src="/assets/img/icon/bus.png" srcSet="/assets/img/icon/bus.png" width={19} height={13}
                      alt="bus-icon"
                    />
                    {userData && userData != null ? (
                      <>
                        {" "}
                        <Link to="/user-dashboard" className="trackYourOrder">
                          Track Your Order
                        </Link>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Link to="/login" className="trackYourOrder">
                          Track Your Order
                        </Link>
                      </>
                    )}
                  </li>

                  <li
                    className="language__currency--list"
                    onClick={handleModalOpen}
                  >
                    {country ? (
                      <>
                        <Link className="account__currency--link text-white">
                          {country && (
                            <Flag
                              code={countryCode}
                              fallback={<span>Country Flag</span>}
                              height="30"
                              width="30"
                            />
                          )}

                          <span style={{ padding: "10px" }}>{country}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.797"
                            height="9.05"
                            viewBox="0 0 9.797 6.05"
                          >
                            <path
                              d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                              transform="translate(-6 -8.59)"
                              fill="currentColor"
                              opacity="0.7"
                            />
                          </svg>
                        </Link>
                        {/*
                        <img src={country?.country_flag} alt="Country Flag" />
                        <p>Currency: {country.currencies[0]}</p> */}
                      </>
                    ) : (
                      <p>Loading country information...</p>
                    )}
                    <div className="dropdown__currency">
                      <ul>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CAD
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CNY
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            EUR
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            GBP
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`main__header header__sticky ${isNavHidden ? " main__header header__sticky  sticky" : ""
            }`}
        >
          <div className="container">
            <div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
              <div
                className="offcanvas__header--menu__open"
                onClick={openMobileMenu}
              >
                <Link
                  className="offcanvas__header--menu__open--btn"
                  data-offcanvas=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon offcanvas__header--menu__open--svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                      d="M80 160h352M80 256h352M80 352h352"
                    />
                  </svg>
                  <span className="visually-hidden">Menu Open</span>
                </Link>
              </div>
              <div className="main__logo">
                <h1 className="main__logo--title">
                  <Link className="main__logo--link" to="/">
                    {/* <img
                      className="main__logo--img"
                      src="assets/img/logo/nav-log2.png"
                      alt="logo-img"
                    /> */}
                    <h2>Dr Scrubs</h2>
                    <b style={{ fontSize: '13px' }}>Feel The New Feeling</b>
                  </Link>
                </h1>
              </div>
              <div className="header__menu d-none d-lg-block">
                <nav className="header__menu--navigation">
                  <ul className="d-flex">
                    <li className="header__menu--items mega__menu--items">
                      <Link className="header__menu--link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link className="header__menu--link" to="/about-us">
                        About Us
                      </Link>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/"
                      >
                        Men
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Men Home
                          </span>
                          <ul className="header__mega--sub__menu">
                            {data?.data?.data?.map((item) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li" key={item?.id}>
                                    <Link
                                      className="header__mega--sub__menu--title"
                                      to={`/shop/${item?.tag_url}/male`}
                                    >
                                      {item?.tag_eng}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                        {filteredCategoriesmen &&
                          filteredCategoriesmen?.map((item) => {
                            return (
                              <>
                                <li className="header__mega--menu__li" style={{ width: "calc(100%/6)" }} key={item?.id || item?.category_title_eng}>
                                  <span className="header__mega--subtitle">
                                    {item?.category_title_eng}
                                  </span>
                                  <ul className="header__mega--sub__menu">
                                    {subCategory?.map((data) => {
                                      if (data?.category_id === item?.id) {
                                        return (
                                          <>
                                            <li className="header__mega--sub__menu_li" key={data?.id || data?.sub_category_title}>
                                              <Link
                                                className="header__mega--sub__menu--title"
                                                to={`/collection/${data?.sub_category_url}/male`}
                                              >
                                                {data?.sub_category_title}
                                              </Link>
                                            </li>
                                          </>
                                        );
                                      }
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}
                       </ul>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/"
                      >
                        Women
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Women Home
                          </span>
                          <ul className="header__mega--sub__menu">
                            {data?.data?.data?.map((item) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li" key={item?.id}>
                                    <Link
                                      className="header__mega--sub__menu--title"
                                      to={`/shop/${item?.tag_url}/female`}
                                    >
                                      {item?.tag_eng}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                        {filteredCategories &&
                          filteredCategories?.map((item) => {
                            return (
                              <>
                                <li className="header__mega--menu__li" key={item?.id}>
                                  <span className="header__mega--subtitle">
                                    {item?.category_title_eng}
                                  </span>
                                  <ul className="header__mega--sub__menu">
                                    {subCategory?.map((data) => {
                                      if (data?.category_id === item?.id) {
                                        return (
                                          <>
                                            <li className="header__mega--sub__menu_li" key={data?.id}>
                                              <Link
                                                className="header__mega--sub__menu--title"
                                                to={`/collection/${data?.sub_category_url}/female`}
                                              >
                                                {data?.sub_category_title}
                                              </Link>
                                            </li>
                                          </>
                                        );
                                      }
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/"
                      >
                        Unisex
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Unisex Home
                          </span>
                          <ul className="header__mega--sub__menu">
                            {data?.data?.data?.map((item) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li" key={item?.id}>
                                    <Link
                                      className="header__mega--sub__menu--title"
                                      to={`/shop/${item?.tag_url}`}
                                    >
                                      {item?.tag_eng}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                        {filteredCategoriesUnisex &&
                          filteredCategoriesUnisex?.map((item) => {
                            return (
                              <>
                                <li className="header__mega--menu__li" key={item?.id}>
                                  <span className="header__mega--subtitle">
                                    {item?.category_title_eng}
                                  </span>
                                  <ul className="header__mega--sub__menu">
                                    {subCategory?.map((data) => {
                                      if (data?.category_id === item?.id) {
                                        return (
                                          <>
                                            <li className="header__mega--sub__menu_li" key={data?.id}>
                                              <Link
                                                className="header__mega--sub__menu--title"
                                                to={`/collection/${data?.sub_category_url}`}
                                              >
                                                {data?.sub_category_title}
                                              </Link>
                                            </li>
                                          </>
                                        );
                                      }
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link className="header__menu--link" to="/bulk-order">
                        Bulk Order
                      </Link>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link className="header__menu--link" to="/testimonial">
                        Testimonial
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header__account header__account2">
                <ul className="d-flex">
                  <li className="header__account--items header__account2--items header__account--search__items d-sm-none">
                    <Link
                      className="header__account--btn search__open--btn"
                      data-offcanvas=""
                    >
                      <svg
                        className="header__search--button__svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26.51"
                        height="23.443"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                          d="M338.29 338.29L448 448"
                        />
                      </svg>
                      <span className="visually-hidden">search btn</span>
                    </Link>
                  </li>
                  {userData && userData != null ? (
                    <>
                      <li className="right-side onhover-dropdown" style={{ marginRight: "28px" }}>
                        <Link to="/user-dashboard">
                          <div className="delivery-login-box">
                            <div className="delivery-detail">
                              <h6>{userData?.first_name} </h6>
                            </div>
                            <svg className="menu__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12" height="7.41" viewBox="0 0 12 7.41"><path d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z" transform="translate(-6 -8.59)" fill="currentColor" opacity="0.7"></path></svg>
                          </div>
                        </Link>
                        <div className="onhover-div onhover-div-login">
                          <ul className="user-box-name">
                            <li className="product-box-contain pb-2">
                              <i />
                              <Link to="/user-dashboard">Dashboard</Link>
                            </li>

                            <li className="product-box-contain">
                              <Link onClick={logOut}>Log Out</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="header__account--items header__account2--items">
                        <Link className="header__account--btn" to="/login">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26.51"
                            height="23.443"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                            />
                            <path
                              d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                              fill="none"
                              stroke="currentColor"
                              strokeMiterlimit={10}
                              strokeWidth={32}
                            />
                          </svg>
                          <span className="visually-hidden">Account</span>
                        </Link>
                      </li>
                    </>
                  )}


                  <li className="header__account--items header__account2--items">
                    <Link
                      className="header__account--btn minicart__open--btn"
                      data-offcanvas=""
                      onClick={onShow}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26.51"
                        height="23.443"
                        viewBox="0 0 14.706 13.534"
                      >
                        <g transform="translate(0 0)">
                          <g>
                            <path
                              data-name="Path 16787"
                              d="M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z"
                              transform="translate(0 -463.248)"
                              fill="currentColor"
                            />
                            <path
                              data-name="Path 16788"
                              d="M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z"
                              transform="translate(-1.191 -466.622)"
                              fill="currentColor"
                            />
                            <path
                              data-name="Path 16789"
                              d="M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z"
                              transform="translate(-2.875 -466.622)"
                              fill="currentColor"
                            />
                          </g>
                        </g>
                      </svg>
                      <span className="items__count style2">
                        {cartItems && cartItems.length}
                      </span>
                    </Link>
                  </li>
                  <li
                    className="language__currency--list mobile_ViewCountry"
                    onClick={handleModalOpen}
                  >
                    {country ? (
                      <>
                        <Link className="account__currency--link text-white">
                          {country && (
                            <Flag
                              code={countryCode}
                              fallback={<span>Country Flag</span>}
                              height="30"
                              width="30"
                            />
                          )}

                          {/* <span style={{ padding: "10px" }}>{country}</span> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.797"
                            height="9.05"
                            viewBox="0 0 9.797 6.05"
                          >
                            <path
                              d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                              transform="translate(-6 -8.59)"
                              fill="currentColor"
                              opacity="0.7"
                            />
                          </svg>
                        </Link>
                      </>
                    ) : (
                      <p>Loading country information...</p>
                    )}
                    <div className="dropdown__currency">
                      <ul>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CAD
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CNY
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            EUR
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            GBP
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Start Offcanvas header menu */}
        <div
          className={`${openMobile
            ? "offcanvas__header color-scheme-2 open"
            : "offcanvas__header color-scheme-2"
            }`}
        >
          <div className="offcanvas__inner">
            <div className="offcanvas__logo">
              <Link className="offcanvas__logo_link" href="/">
                {/* <img
                  src="assets/img/logo/nav-log2.png"
                  alt="Grocee Logo"
                  width={158}
                  height={36}
                /> */}
                <h2>Dr Scrubs</h2>
              </Link>
              <button
                className="offcanvas__close--btn"
                data-offcanvas=""
                onClick={() => setopenMobile(false)}
              >
                close
              </button>
            </div>
            <nav className="offcanvas__menu">
              <ul className="offcanvas__menu_ul">
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="/">
                    Home
                  </a>
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="/about-us">
                    About Us
                  </a>
                </li>
                <li className="offcanvas__menu_li" onClick={handleMenClickActive}>
                  <Link className="offcanvas__menu_item" href="#">
                    Men
                  </Link>
                  <ul
                    className="offcanvas__sub_menu" style={{ display: menSubMenuActive || MenHomeActive || innerMenSubMenuActive ? "block" : "none" }}
                  // style={{ boxSizing: "border-box", display: "none" }}
                  >
                    <li className="offcanvas__sub_menu_li" onClick={handleMenHomeClickActive}>
                      <Link href="javascript:void(0)" className="offcanvas__sub_menu_item">
                        Men Home
                      </Link>
                      <ul
                        className="offcanvas__sub_menu"
                        style={{ boxSizing: "border-box", display: menSubMenuActive || MenHomeActive || innerMenSubMenuActive ? 'block' : 'none' }}
                      >
                        {data?.data?.data?.map((item) => {
                          return (
                            <>

                              <li className="offcanvas__sub_menu_li" key={item?.id}>
                                <a
                                  className="offcanvas__sub_menu_item"
                                  href={`/shop/${item?.tag_url}/male`}
                                >
                                  {item?.tag_eng}
                                </a>
                              </li>

                            </>
                          );
                        })}
                      </ul>
                      <button className={`offcanvas__sub_menu_toggle ${MenHomeActive ? "active" : ""}`} />
                    </li>
                    {filteredCategoriesmen &&
                      filteredCategoriesmen?.map((item) => {
                        return (
                          <>
                            <li className="offcanvas__sub_menu_li" onClick={handleInnerMenSubMenuClick}  key={item?.id}>
                              <a href="javascript:void(0)" className="offcanvas__sub_menu_item">
                                {item?.category_title_eng}
                              </a>
                              <ul
                                className="offcanvas__sub_menu"
                                style={{ boxSizing: "border-box", display: innerMenSubMenuActive ? 'block' : 'none' }}
                              >

                                {subCategory?.map((data) => {
                                  if (data?.category_id === item?.id) {
                                    return (
                                      <>

                                        <li className="offcanvas__sub_menu_li" key={data?.id}>
                                          <a
                                            className="offcanvas__sub_menu_item"
                                            href={`/collection/${data?.sub_category_url}/male`}
                                          >
                                            {data?.sub_category_title}
                                          </a>
                                        </li>
                                      </>
                                    );
                                  }
                                })}
                              </ul>
                              <button className={`offcanvas__sub_menu_toggle ${innerMenSubMenuActive ? 'active' : ''}`} />
                            </li>
                          </>
                        );
                      })}
                  </ul>
                  <button className={`offcanvas__sub_menu_toggle ${menSubMenuActive ? "active" : ""}`} />
                </li>
                <li className="offcanvas__menu_li" onClick={handleClickActive} >
                  <Link className="offcanvas__menu_item" href="javascript:void(0)">
                    Women
                  </Link>
                  <ul
                    className="offcanvas__sub_menu"
                    style={{ boxSizing: "border-box", display: isActive || womeHomeActive || innerSubMenuActive ? 'block' : 'none' }}
                  >
                    <li className="offcanvas__sub_menu_li" onClick={handleWomenClickActive}>
                      <Link href="javascript:void(0)" className="offcanvas__sub_menu_item">
                        Women Home
                      </Link>
                      <ul
                        className="offcanvas__sub_menu"
                        style={{ boxSizing: "border-box", display: womeHomeActive ? 'block' : 'none' }}
                      >

                        {data?.data?.data?.map((item) => {
                          return (
                            <>

                              <li className="offcanvas__sub_menu_li" key={item?.id}>
                                <a
                                  className="offcanvas__sub_menu_item"
                                  href={`/shop/${item?.tag_url}/female`}
                                >
                                  {item?.tag_eng}
                                </a>
                              </li>

                            </>
                          );
                        })}
                      </ul>
                      <button className={`offcanvas__sub_menu_toggle ${womeHomeActive ? "active" : ""}`} />
                    </li>

                    {filteredCategories &&
                      filteredCategories?.map((item) => {
                        return (
                          <>
                            <li className="offcanvas__sub_menu_li" onClick={handleInnerSubMenuClick} key={item?.id}>
                              <Link href="javascript:void(0)" className="offcanvas__sub_menu_item">
                                {item?.category_title_eng}
                              </Link>
                              <ul
                                className="offcanvas__sub_menu"
                                style={{ boxSizing: "border-box", display: innerSubMenuActive ? 'block' : 'none' }}
                              >

                                {subCategory?.map((data) => {
                                  if (data?.category_id === item?.id) {
                                    return (
                                      <>

                                        <li className="offcanvas__sub_menu_li" key={data?.id}>
                                          <a
                                            className="offcanvas__sub_menu_item"
                                            href={`/collection/${data?.sub_category_url}/female`}
                                          >
                                            {data?.sub_category_title}
                                          </a>
                                        </li>
                                      </>
                                    );
                                  }
                                })}
                              </ul>
                              <button className={`offcanvas__sub_menu_toggle ${innerSubMenuActive ? 'active' : ''}`} />
                            </li>
                          </>
                        );
                      })}
                  </ul>
                  <button className={`offcanvas__sub_menu_toggle ${isActive ? 'active' : ''}`} />
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="/bulk-order">
                    Bulk Order
                  </a>
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="/testimonial">
                    Testimonial
                  </a>
                </li>
                {/* <li className="offcanvas__menu_li">
                  <Link className="offcanvas__menu_item" href="/custom-order">
                  Custom Order
                  </Link>
                </li> */}
              </ul>
              <div className="offcanvas__account--items">
                <a
                  className="offcanvas__account--items__btn d-flex align-items-center"
                  href="/login"
                >
                  <span className="offcanvas__account--items__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.51"
                      height="19.443"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                      />
                      <path
                        d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                      />
                    </svg>
                  </span>
                  <span className="offcanvas__account--items__label">
                    Login / Register
                  </span>
                </a>
              </div>
              <div className="language__currency">
                <ul className="d-flex align-items-center">
                  <li
                    className="language__currency--list"
                    onClick={handleModalOpen}
                  >
                    {country ? (
                      <>
                        <Link className="account__currency--link text-white">
                          {country && (
                            <Flag
                              code={countryCode}
                              fallback={<span>Country Flag</span>}
                              height="30"
                              width="30"
                            />
                          )}

                          <span style={{ padding: "10px" }}>{country}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.797"
                            height="9.05"
                            viewBox="0 0 9.797 6.05"
                          >
                            <path
                              d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                              transform="translate(-6 -8.59)"
                              fill="currentColor"
                              opacity="0.7"
                            />
                          </svg>
                        </Link>
                      </>
                    ) : (
                      <p>Loading country information...</p>
                    )}
                    <div className="dropdown__currency">
                      <ul>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CAD
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CNY
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            EUR
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            GBP
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="language__currency--list">

                    <div className="offcanvas__account--currency__submenu">
                      <ul>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CAD
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            CNY
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            EUR
                          </Link>
                        </li>
                        <li className="currency__items">
                          <Link className="currency__text" href="#">
                            GBP
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/* End Offcanvas header menu */}
        {/* Start Offcanvas stikcy toolbar */}

      </header>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 1 }}
          animate={{ opacity: 5, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="newsletter__popup newsletter__show"
          data-animation="slideInUp"
        >
          <button
            className="newsletter__popup--close__btn"
            aria-label="search close button"
            onClick={handleModalClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </button>
          <div id="boxes" className="newsletter__popup--inner">

            <div className="box newsletter__popup--box d-flex align-items-center">
              <div
                className="country-modal__content"
                style={{ overflowX: "hidden" }}
              >
                <div className="row">
                  <div className="container">
                    <div className="col-lg-12 m-5">
                      <ul id="countrylist">
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="united-states"
                            value="us"
                            checked={selectedCountry === "us"}
                            onChange={handleCountryChange}
                            defaultValue="us"
                          />
                          <label htmlFor="united-states">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/unitedstatesofamerica.svg"
                              src="/assets/img/flag/unitedstatesofamerica.svg" width={30} height={20}
                              alt="united-states"
                            />
                            United States
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            value="Argentina"
                            checked={selectedCountry === "ar"}
                            onChange={handleCountryChange}
                            defaultValue="Argentina"
                            id="argentina"
                          />
                          <label htmlFor="argentina">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/argentina.svg"
                              src="/assets/img/flag/argentina.svg" width={30} height={20}
                              alt="argentina"
                            />
                            Argentina
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="australia"
                            value="Australia"
                            checked={selectedCountry === "au"}
                            onChange={handleCountryChange}
                          />
                          <label htmlFor="australia">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/australia.svg"
                              src="/assets/img/flag/australia.svg" width={30} height={20}
                              alt="australia"
                            />
                            Australia
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="belgium"
                            value="belgium"
                            checked={selectedCountry === "be"}
                            onChange={handleCountryChange}
                            defaultValue="belgium"
                          />
                          <label htmlFor="belgium">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/belgium.svg"
                              src="/assets/img/flag/belgium.svg" width={30} height={20}
                              alt="belgium"
                            />
                            Belgium
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="brazil"
                            value="Brazil"
                            checked={selectedCountry === "br"}
                            onChange={handleCountryChange}
                            defaultValue="brazil"
                          />
                          <label htmlFor="brazil">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/brazil.svg"
                              src="/assets/img/flag/brazil.svg" width={30} height={20}
                              alt="brazil"
                            />
                            Brazil
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="canada"
                            value="canada"
                            checked={selectedCountry === "ca"}
                            onChange={handleCountryChange}
                            defaultValue="canada"
                          />
                          <label htmlFor="canada">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/canada.svg"
                              src="/assets/img/flag/canada.svg" width={30} height={20}
                              alt="canada"
                            />
                            Canada
                          </label>
                        </li>

                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="denmark"
                            value="denmark"
                            checked={selectedCountry === "dk"}
                            onChange={handleCountryChange}
                            defaultValue="denmark"
                          />
                          <label htmlFor="denmark">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/denmark.svg"
                              src="/assets/img/flag/denmark.svg" width={30} height={20}
                              alt="denmark"
                            />
                            Denmark
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="finland"
                            value="finland"
                            checked={selectedCountry === "fi"}
                            onChange={handleCountryChange}
                            defaultValue="finland"
                          />
                          <label htmlFor="finland">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/finland.svg"
                              src="/assets/img/flag/finland.svg" width={30} height={20}
                              alt="finland"
                            />
                            Finland
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="france"
                            value="france"
                            checked={selectedCountry === "fr"}
                            onChange={handleCountryChange}
                            defaultValue="france"
                          />
                          <label htmlFor="france">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/france.svg"
                              src="/assets/img/flag/france.svg" width={30} height={20}
                              alt="france"
                            />
                            France
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="germany"
                            value="germany"
                            checked={selectedCountry === "de"}
                            onChange={handleCountryChange}
                            defaultValue="germany"
                          />
                          <label htmlFor="germany">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/germany.svg"
                              src="/assets/img/flag/germany.svg" width={30} height={20}
                              alt="germany"
                            />
                            Germany
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="greece"
                            value="greece"
                            checked={selectedCountry === "gr"}
                            onChange={handleCountryChange}
                            defaultValue="greece"
                          />
                          <label htmlFor="greece">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/greece.svg"
                              src="/assets/img/flag/greece.svg" width={30} height={20}
                              alt="greece"
                            />
                            Greece
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="hong kong"
                            value="HongKong"
                            checked={selectedCountry === "hk"}
                            onChange={handleCountryChange}
                            defaultValue="hong kong"
                          />
                          <label htmlFor="hong kong">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/hongkong.svg"
                              src="/assets/img/flag/hongkong.svg" width={30} height={20}
                              alt="hong kong"
                            />
                            Hong Kong
                          </label>
                        </li>
                        <li
                          id="indiacountry"
                          className="indiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="india"
                            value="India"
                            checked={selectedCountry === "inr"}
                            onChange={handleCountryChange}
                            defaultValue="india"
                          />
                          <label htmlFor="india">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/india.svg"
                              src="/assets/img/flag/india.svg" width={30} height={20}
                              alt="india"
                            />
                            India
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="italy"
                            value="Italy"
                            checked={selectedCountry === "it"}
                            onChange={handleCountryChange}
                            defaultValue="italy"
                          />
                          <label htmlFor="italy">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/italy.svg"
                              src="/assets/img/flag/italy.svg" width={30} height={20}
                              alt="italy"
                            />
                            Italy
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="japan"
                            value="Japan"
                            checked={selectedCountry === "jp"}
                            onChange={handleCountryChange}
                            defaultValue="japan"
                          />
                          <label htmlFor="japan">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/japan.svg"
                              src="/assets/img/flag/japan.svg" width={30} height={20}
                              alt="japan"
                            />
                            Japan
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="mexico"
                            value="Mexico"
                            checked={selectedCountry === "mx"}
                            onChange={handleCountryChange}
                            defaultValue="mexico"
                          />
                          <label htmlFor="mexico">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/mexico.svg"
                              src="/assets/img/flag/mexico.svg" width={30} height={20}
                              alt="mexico"
                            />
                            Mexico
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="netherlands"
                            value="Netherlands"
                            checked={selectedCountry === "nl"}
                            onChange={handleCountryChange}
                            defaultValue="netherlands"
                          />
                          <label htmlFor="netherlands">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/netherlands.svg"
                              src="/assets/img/flag/netherlands.svg" width={30} height={20}
                              alt="netherlands"
                            />
                            Netherlands
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="newzealand"
                            value="New Zealand"
                            checked={selectedCountry === "nz"}
                            onChange={handleCountryChange}
                            defaultValue="newzealand"
                          />
                          <label htmlFor="newzealand">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/newzealand.svg"
                              src="/assets/img/flag/newzealand.svg" width={30} height={20}
                              alt="newzealand"
                            />
                            New Zealand
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="poland"
                            value="Poland"
                            checked={selectedCountry === "pl"}
                            onChange={handleCountryChange}
                            defaultValue="poland"
                          />
                          <label htmlFor="poland">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/poland.svg"
                              src="/assets/img/flag/poland.svg" width={30} height={20}
                              alt="poland"
                            />
                            Poland
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="portugal"
                            value="Portugal"
                            checked={selectedCountry === "pt"}
                            onChange={handleCountryChange}
                            defaultValue="portugal"
                          />
                          <label htmlFor="portugal">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/portugal.svg"
                              src="/assets/img/flag/portugal.svg" width={30} height={20}
                              alt="portugal"
                            />
                            Portugal
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="qatar"
                            value="Qatar"
                            checked={selectedCountry === "qa"}
                            onChange={handleCountryChange}
                            defaultValue="qatar"
                          />
                          <label htmlFor="qatar">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/qatar.svg"
                              src="/assets/img/flag/qatar.svg" width={30} height={20}
                              alt="qatar"
                            />
                            Qatar
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="saudi-arabia"
                            value="Saudi-arabia"
                            checked={selectedCountry === "sa"}
                            onChange={handleCountryChange}
                            defaultValue="saudi arabia"
                          />
                          <label htmlFor="saudi-arabia">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/saudiarabia.svg"
                              src="/assets/img/flag/saudiarabia.svg" width={30} height={20}
                              alt="saudi-arabia"
                            />
                            Saudi Arabia
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="singapore"
                            value="singapore"
                            checked={selectedCountry === "sg"}
                            onChange={handleCountryChange}
                            defaultValue="singapore"
                          />
                          <label htmlFor="singapore">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/singapore.svg"
                              src="/assets/img/flag/singapore.svg" width={30} height={20}
                              alt="singapore"
                            />
                            Singapore
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="south-korea"
                            value="south-korea"
                            checked={selectedCountry === "south-korea"}
                            onChange={handleCountryChange}
                            defaultValue="south korea"
                          />
                          <label htmlFor="south-korea">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/southkorea.svg"
                              src="/assets/img/flag/southkorea.svg" width={30} height={20}
                              alt="south-korea"
                            />
                            South Korea
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="spain"
                            value="spain"
                            checked={selectedCountry === "es"}
                            onChange={handleCountryChange}
                            defaultValue="spain"
                          />
                          <label htmlFor="spain">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/spain.svg"
                              src="/assets/img/flag/spain.svg" width={30} height={20}
                              alt="spain"
                            />
                            Spain
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="sweden"
                            value="sweden"
                            checked={selectedCountry === "ae"}
                            onChange={handleCountryChange}
                            defaultValue="spain"
                          />
                          <label htmlFor="sweden">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/sweden.svg"
                              src="/assets/img/flag/sweden.svg" width={30} height={20}
                              alt="sweden"
                            />
                            Sweden
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="uae"
                            defaultValue="uae"
                          />
                          <label htmlFor="uae">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/uae.svg"
                              src="/assets/img/flag/uae.svg" width={30} height={20}
                              alt="uae"
                            />
                            UAE
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="united-kingdom"
                            defaultValue="united kingdom"
                            checked={selectedCountry === "gb"}
                            onChange={handleCountryChange}
                          />
                          <label htmlFor="united-kingdom">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/unitedkingdom.svg"
                              src="/assets/img/flag/unitedkingdom.svg" width={30} height={20}
                              alt="united-kingdom"
                            />
                            United Kingdom
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {show ? <CartSlider hide={setShow} /> : null}
      {loginShow ? <SignupModel hide={SetLoginShow} /> : null}
    </>
  );
}

export default Navbar;
