import React, { useState } from 'react'
import './BulkOrder.css'
import { lazy } from "react";
import { Toaster, toast } from "react-hot-toast";
import  axios  from "axios";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import BassURl from '../Api/Api';
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const BulkOrder = () => {
   const [bulkData, setBulkData] = useState({
      name : '',
      email: '',
      mobile: '',
      city : '',
      subject: 'Bulk Order Page Enquiry',
      message: ''
   })

   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setBulkData(preState => ({
          ...preState,
          [name] : value
      }));

      setErrors(preState => ({
        ...preState,
        [name] : ''
      }));
   };

   const BulkOrderSubmit = async (e) => {
      e.preventDefault();
      const errors = {};
      if (!bulkData.name.trim()) {
        errors.name = 'Name is required';
      }
      if (!bulkData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(bulkData.email)) {
        errors.email = 'Invalid email address';
      }
      if (!bulkData.city.trim()) {
        errors.city = 'City is required';
      }
      if (!bulkData.message.trim()) {
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
    const response = await axios.post(`${BassURl}/enquiry`, bulkData);
    console.log('Form submitted successfully:', response.data.code);
    if (response.data.code === 200) {
      // Show success message using toast
      toast.success('Form submitted successfully');
      setBulkData({
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
      {/* <div
        className="counterup__banner--section counterup__banner__bg2"
        id="funfactId"
      >
        <div className="container">
          <div className="row row-cols-1 align-items-center">
            <div className="col-lg-12 text-center">
              <div className="counterup__banner--inner position__relative ">
                <div className="counterup__banner--items text-center">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


    <div className='container'>
        <div className='row'>
            {/* <div className='col-5'>
                <h1>Just follow these steps:</h1>
            </div> */}
            <div className='col-12'>
            <section className="contact__section section--padding">
              <div className="container">
                {/* <div className="section__heading text-center mb-40">
                  <h2 className="section__heading--maintitle">Get In Touch</h2>
                </div> */}
                <div className="main__contact--area position__relative">
                  <div className="contact__form">
                    <h3 className="contact__form--title mb-40">Bulk Order Form</h3>
                    <form className="contact__form--inner" onSubmit={BulkOrderSubmit}>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="contact__form--list mb-20">
                            <input
                              className="contact__form--input"
                              name="subject"
                              value={bulkData.subject}
                              placeholder="Your subject"
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
                              id="input1"
                              placeholder="Your Name"
                              value={bulkData.name}
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
                              htmlFor="input4"
                            >
                              Email{" "}
                              <span className="contact__form--label__star">*</span>
                            </label>
                            <input
                              className="contact__form--input"
                              name="email"
                              id="input4"
                              placeholder="Email"
                              value={bulkData.email}
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
                              htmlFor="input3"
                            >
                              Phone Number{" "}
                              <span className="contact__form--label__star">*</span>
                            </label>
                            {/* <input
                              className="contact__form--input"
                              name="mobile"
                              id="input3"
                              placeholder="Phone number"
                              value={bulkData.mobile}
                              type="text"
                              onChange={handleChange}
                            /> */}
                            <PhoneInput
                              className=""
                              country={'in'} 
                              value={bulkData.mobile} 
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
                              City{" "}
                              <span className="contact__form--label__star">*</span>
                            </label>
                            <input
                              className="contact__form--input"
                              name="city"
                              id="input4"
                              placeholder="City"
                              value={bulkData.city}
                              type="city"
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
                              Requirements{" "}
                              <span className="contact__form--label__star">*</span>
                            </label>
                            <textarea
                              className="contact__form--textarea"
                              name="message"
                              id="input5"
                              value={bulkData.message}
                              placeholder="Requirements*"
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



                  {/* **************************** */}




                  <div className="contact__info border-radius-6">
                    <div className="contact__info--items">
                      <h3 className="contact__form--title mb-40">Just follow these steps:</h3>
                      <div className='card mb-3'>
                      <div className="contact__info--items__inner d-flex">
                        <div className="contact__info--content">
                            <div className='card-header'>
                            <h5 className="contact__info--content__title mb-1">
                        Step 1
                      </h5>
                            </div>
                            <div className='card-body'>
                            <p className="contact__info--content__desc text-black">
                            Change the design through a range <br />
                            Fill the form completely so that we can accurately identify your unique needs and requirements.
                          </p>
                            </div>
                        </div>
                      </div>
                      </div>                  
                    </div>

                    <div className='card mb-3'>
                    <div className="contact__info--items">
                      <div className='card-header'>
                      <h5 className="contact__info--content__title mb-1">
                        Step 2
                      </h5>
                      </div>
                      <div className='card-body'>
                      <div className="contact__info--items__inner d-flex">
                        <div className="contact__info--content">
                          <p className="contact__info--content__desc text-black">
                            {" "}
                            Fill the form completely so that we can accurately identify your unique needs and requirements.
                          </p>
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>

                    <div className='card mb-3'>
                    <div className="contact__info--items">
                        <div className='card-header'>
                        <h5 className="contact__info--content__title mb-1 text-black">
                        Step 3
                      </h5>
                        </div>
                      <div className='card-body'>
                      <div className="contact__info--items__inner d-flex">
                        <div className="contact__info--content">
                          <p className="contact__info--content__desc text-black">
                            {" "}
                            Be ready to discuss your specific requirements with our Sleep Experts and receive tailored solutions that perfectly align with your objectives.
                          </p>
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
        </div>
    </div>

{/* ************************************** */}
    <Footer />
    </>
  )
}

export default BulkOrder