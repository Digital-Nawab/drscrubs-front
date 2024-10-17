import React, { useState } from "react";
import '../components/Modal/Footer.css'
import BassURl from "../Api/Api";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
function Footer() {

  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BassURl}/newsletter`, { email });

      if (response.data.code === 200) {
        toast.success(response.data.msg);
        setSubmissionStatus('Success');
      } else {
        toast.error(response.data.msg);
        setSubmissionStatus('Error');
      }
      setEmail('');
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('There was a problem with the request:', error);
      setSubmissionStatus('Error');
    }
  };
  return (
    <> 
      <footer className="footer__section bg__black color-scheme-2">
        <div className="container">
          <div className="main__footer d-flex justify-content-between row">
            <div className="col-md-3">
              <h2 className="footer__widget--title text-ofwhite h3">
                About Us
                <button
                  className="footer__widget--button"
                  aria-label="footer widget button"
                >
                  <svg
                    className="footer__widget--title__arrowdown--icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.355"
                    height="8.394"
                    viewBox="0 0 10.355 6.394"
                  >
                    <path
                      d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                      transform="translate(-6 -8.59)"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </h2>
              <div className="footer__widget--inner">
                <p className="footer__widget--desc text-ofwhite mb-20">
                   Dr. Scrubs™ concept of designer and colourful yet perfect fit for Medical professionals was launched in 2012 by Design Resource India Private Limited, the pioneers of starting coloured medical clothing line in Indian Dental Industry.
                </p>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="footer__widget">
                <h2 className="footer__widget--title text-ofwhite h3">
                  Useful Link
                  <button
                    className="footer__widget--button"
                    aria-label="footer widget button"
                  >
                    <svg
                      className="footer__widget--title__arrowdown--icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.355"
                      height="8.394"
                      viewBox="0 0 10.355 6.394"
                    >
                      <path
                        d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </h2>
                <ul className="footer__widget--menu footer__widget--inner">
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/about-us">
                        About Us
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/bulk-order">
                      Bulk Order
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/contact-us">
                      Contact Us
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/gallery">
                      Community Stories
                      </Link>
                    </li>
                    {/* <li className="footer__widget--menu__list">
                      <a className="footer__widget--menu__text" href="/custom-order">
                      Custom Order
                      </a>
                    </li> */}
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="footer__widget">
                <h2 className="footer__widget--title text-ofwhite h3">
                  My Account
                  <button
                    className="footer__widget--button"
                    aria-label="footer widget button"
                  >
                    <svg
                      className="footer__widget--title__arrowdown--icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.355"
                      height="8.394"
                      viewBox="0 0 10.355 6.394"
                    >
                      <path
                        d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </h2>
                <ul className="footer__widget--menu footer__widget--inner">
                  <li className="footer__widget--menu__list">
                    <Link className="footer__widget--menu__text" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="footer__widget--menu__list">
                    <Link className="footer__widget--menu__text" to="/sign-up">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer__widget">
                  <h2 className="footer__widget--title text-ofwhite h3">
                     Policies
                    <button
                      className="footer__widget--button"
                      aria-label="footer widget button"
                    >
                      <svg
                        className="footer__widget--title__arrowdown--icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.355"
                        height="8.394"
                        viewBox="0 0 10.355 6.394"
                      >
                        <path
                          d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                          transform="translate(-6 -8.59)"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </h2>
                  <ul className="footer__widget--menu footer__widget--inner">
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/privacy-policy">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/term-conditions">
                      Terms & Conditions
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/shipping-delivery-policy">
                        Shipping & Delivery Policy
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" to="/refunds-cancellations">
                          Refunds/Cancellations
                      </Link>
                    </li>
                  </ul>
              </div>
            </div>
            <div className="col-md-3">
              <h2 className="footer__widget--title text-ofwhite h3">
                Newsletter
                <button
                  className="footer__widget--button"
                  aria-label="footer widget button"
                >
                  <svg
                    className="footer__widget--title__arrowdown--icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.355"
                    height="8.394"
                    viewBox="0 0 10.355 6.394"
                  >
                    <path
                      d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                      transform="translate(-6 -8.59)"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </h2>
              <div className="footer__widget--inner">
                {/* <p className="footer__widget--desc text-ofwhite m-0">
                  Fill their seed open meat. Sea you <br /> great Saw image stl
                </p> */}
                <div className="newsletter__subscribe">
                    <form className="newsletter__subscribe--form" onSubmit={handleSubmit}>
                      <label>
                        <input
                          className="newsletter__subscribe--input"
                          placeholder="Email Address"
                          type="email"
                          value={email}
                          onChange={handleInputChange}
                        />
                      </label>
                      <button
                        className="newsletter__subscribe--button"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </form>
                    {/* <Toaster position="top-right" /> */}
                  </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom d-flex justify-content-between align-items-center">
            <p className="copyright__content text-ofwhite m-0">
              Copyright © {new Date().getFullYear()}
              <a className="copyright__content--link" href="/">
                &nbsp; Dr Scrubs
              </a>{" "}
              . All Rights Reserved by Design Resource India Pvt Ltd
            </p>

            <div className="footer__social">
                  <ul className="social__shear d-flex">
                    <li className="social__shear--list">
                      <Link
                        className="social__shear--list__icon"
                        target="_blank"
                        to="https://www.facebook.com/drscrubsofficial"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7.667"
                          height="16.524"
                          viewBox="0 0 7.667 16.524"
                        >
                          <path
                            data-name="Path 237"
                            d="M967.495,353.678h-2.3v8.253h-3.437v-8.253H960.13V350.77h1.624v-1.888a4.087,4.087,0,0,1,.264-1.492,2.9,2.9,0,0,1,1.039-1.379,3.626,3.626,0,0,1,2.153-.6l2.549.019v2.833h-1.851a.732.732,0,0,0-.472.151.8.8,0,0,0-.246.642v1.719H967.8Z"
                            transform="translate(-960.13 -345.407)"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="visually-hidden">Facebook</span>
                      </Link>
                    </li>
                    <li className="social__shear--list">
                      <Link
                        className="social__shear--list__icon"
                        target="_blank"
                        to="https://www.instagram.com/drscrubs_official/"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.497"
                          height="16.492"
                          viewBox="0 0 19.497 19.492"
                        >
                          <path
                            data-name="Icon awesome-instagram"
                            d="M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z"
                            transform="translate(0.004 -1.492)"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="visually-hidden">Instagram</span>
                      </Link>
                    </li>
                  </ul>
                </div>
           </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
