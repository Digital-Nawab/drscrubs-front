import React, {useState, useEffect} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import BassURl from "../Api/Api";
import { Toaster, toast } from "react-hot-toast";
import  axios  from "axios";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
function ContactUs() {

  const [contactData, setContactData] = useState({
    name:'',
    email: '',
    mobile:'',
    subject:'Contact Us Page Enquiry',
    city :'',
    message:'',
  });

  const [errors, setErrors] = useState({});

 const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear previous error message when input value changes
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  };

  const contactFormSubmit = async (e) => {
    e.preventDefault();
      const errors = {};
      if (!contactData.name.trim()) {
        errors.name = 'Name is required';
      }
      if (!contactData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(contactData.email)) {
        errors.email = 'Invalid email address';
      }
      if (!contactData.city.trim()) {
        errors.city = 'City is required';
      }
      if (!contactData.message.trim()) {
        errors.message = 'Message is required';
      }
      // If there are errors, set them and prevent form submission
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setTimeout(() => {
          setErrors({});
        }, 3000);
      } else {
       
      }
    try{
      const response = await axios.post(`${BassURl}/enquiry`, contactData);
      console.log('Form submitted successfully:', response.data.code);
      if (response.data.code === 200) {
        // Show success message using toast
        toast.success('Form submitted successfully');
        setContactData({
          name : '',
          email: '',
          mobile: '',
          city : '',
          subject: '',
          message: ''
        });
      } else {
        // Show error message using toast
        toast.error('Error submitting form');
      }
    }catch(error){
      console.error('Error Submitting Form', error);

      toast.error('Error submitting Form');
    }
  }

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const style = {    
    color : 'red',
  }



  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbar />
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
        <section className="breadcrumb__section breadcrumb__about_bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    Contact Us
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex justify-content-center">
                    <li className="breadcrumb__content--menu__items">
                      <a className="text-white" href="index.html">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">Contact Us</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start contact section */}
        <section className="contact__section section--padding">
          <div className="container">
            <div className="section__heading text-center mb-40">
              <h2 className="section__heading--maintitle">Get In Touch</h2>
            </div>
            <div className="main__contact--area position__relative">
              <div className="contact__form">
                <h3 className="contact__form--title mb-40">Contact Me</h3>
                <form className="contact__form--inner" onSubmit={contactFormSubmit}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="contact__form--list mb-20">
                        <input
                          className="contact__form--input"
                          name="subject"
                          value={contactData.subject}
                          placeholder="Your Name"
                          type="hidden"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label
                          className="contact__form--label"
                          htmlFor="input1"
                        >
                          Name{" "}
                          <span className="contact__form--label__star">*</span>
                        </label>
                        <input
                          className="contact__form--input"
                          name="name"
                          value={contactData.name}
                          placeholder="Your Name"
                          type="text"
                          onChange={handleChange}
                        />
                        {errors.name && <span className="error-message" style={style}>{errors.name}</span>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label
                          className="contact__form--label"
                          htmlFor="input3"
                        >
                          Phone Number{" "}
                          <span className="contact__form--label__star">*</span>
                        </label>
                        <PhoneInput
                            className=""
                            country={'in'} 
                            value={contactData.mobile} 
                            onChange={(value, country) =>
                              handleChange(
                                { target: { name: 'mobile', value } },
                                country
                              )
                            } 
                          />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label
                          className="contact__form--label"
                          htmlFor="input4"
                        >
                          Email{" "}
                          <span className="contact__form--label__star">*</span>
                        </label>
                        <input
                          className="contact__form--input"
                          name="email"
                          id="input4"
                          value={contactData.email}
                          placeholder="Email"
                          type="email"
                          onChange={handleChange}
                        />
                        {errors.email && <span className="error-message" style={style}>{errors.email}</span>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label
                          className="contact__form--label"
                          htmlFor="input2"
                        >
                          City{" "}
                        </label>
                        <input
                          className="contact__form--input"
                          name="city"
                          id="input2"
                          value={contactData.city}
                          placeholder="City"
                          type="text"
                          onChange={handleChange}
                        />
                        {errors.city && <span className="error-message" style={style}>{errors.city}</span>}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="contact__form--list mb-15">
                        <label
                          className="contact__form--label"
                          htmlFor="input5"
                        >
                          Write Your Message{" "}
                          {/* <span className="contact__form--label__star">*</span> */}
                        </label>
                        <textarea
                          className="contact__form--textarea"
                          name="message"
                          id="input5"
                          value={contactData.message}
                          placeholder="Write Your Message"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="contact__form--btn primary__btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="contact__info border-radius-5">
                <div className="contact__info--items">
                  <h3 className="contact__info--content__title text-white mb-15">
                    Contact Us
                  </h3>
                  <div className="contact__info--items__inner d-flex">
                    <div className="contact__info--content">
                      <p className="contact__info--content__desc text-white">
                        {/* Change the design through a range <br />{" "} */}
                        <a href="tel:+918076356808"> <img src="assets/img/call.png" width="30px"/>&nbsp;&nbsp; +918076356808</a> <br/>{" "}
                        <a href="https://wa.me/+918287589790" target="_blank"><img src="assets/img/wp.png" width="30px"/>&nbsp;&nbsp; +918287589790</a>{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="contact__info--items">
                  <h3 className="contact__info--content__title text-white mb-15">
                    Email Address
                  </h3>
                  <div className="contact__info--items__inner d-flex">
                    <div className="contact__info--content">
                      <p className="contact__info--content__desc text-white">
                        {" "}
                        <a href="mailto:drscrubscustomercare@gmail.com">
                        <img src="assets/img/email.png" width="30px"/> drscrubscustomercare@gmail.com
                        </a>{" "}
                        <br />{" "}
                        <a href="mailto:sachinsharma@designresourceindia.com"><img src="assets/img/email.png" width="30px"/> sachinsharma@designresourceindia.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="contact__info--items">
                  <h3 className="contact__info--content__title text-white mb-15">
                    Office Location
                  </h3>
                  <div className="contact__info--items__inner d-flex">
                    <div className="contact__info--icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31.57"
                        height="31.13"
                        viewBox="0 0 31.57 31.13"
                      >
                        <path
                          id="ic_account_balance_24px"
                          d="M5.323,14.341V24.718h4.985V14.341Zm9.969,0V24.718h4.985V14.341ZM2,32.13H33.57V27.683H2ZM25.262,14.341V24.718h4.985V14.341ZM17.785,1,2,8.412v2.965H33.57V8.412Z"
                          transform="translate(-2 -1)"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="contact__info--content">
                      <p className="contact__info--content__desc text-white">
                        {" "}
                        Tapasya Corp heights, Sales office at Ground floor, Sector 126, Noida, Uttar Pradesh 201303.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="contact__info--items">
                  <h3 className="contact__info--content__title text-white mb-15">
                    Follow Us
                  </h3>
                  <ul className="contact__info--social d-flex">
                    <li className="contact__info--social__list">
                      <a
                        className="contact__info--social__icon"
                        target="_blank"
                        href="https://www.facebook.com/Dr.Scrubs9"
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
                      </a>
                    </li>
                    <li className="contact__info--social__list">
                      <a
                        className="contact__info--social__icon"
                        target="_blank"
                        href="https://www.instagram.com/drscrubscustomercare/"
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
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End contact section */}
        {/* Start contact map area */}
        <div className="contact__map--area section--padding pt-0">
          <iframe
            className="contact__map--iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9623058285783!2d77.3390001761952!3d28.540852688236683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce678523aaaab%3A0xad0310271266c2fc!2sTapasya%20Corp%20Heights!5e0!3m2!1sen!2sin!4v1702300620259!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
          
        </div>
        {/* End contact map area */}
        {/* Start brand logo section */}
        {/* <div className="brand__logo--section bg__secondary section--padding">
          <div className="container-fluid">
            <div className="row row-cols-1">
              <div className="col">
                <div className="brand__logo--section__inner d-flex justify-content-center align-items-center">
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img display-block"
                      src="assets/img/logo/brand-logo1.png"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img display-block"
                      src="assets/img/logo/brand-logo2.png"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img display-block"
                      src="assets/img/logo/brand-logo3.png"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img display-block"
                      src="assets/img/logo/brand-logo4.png"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img display-block"
                      src="assets/img/logo/brand-logo5.png"
                      alt="brand logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End brand logo section */}
        {/* Start shipping section */}
        <section className="shipping__section2 shipping__style3 section--padding">
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
        {/* End shipping section */}
      </main>
      <Footer/>
    </>
  );
}

export default ContactUs;
