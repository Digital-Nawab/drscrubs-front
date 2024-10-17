import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
//   LanguageSelect,
// } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
import "../../App.css";


function Addaddress({ hide }) {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  // const [countryid, setCountryid] = useState(0);
  // const [stateid, setstateid] = useState(0);

  function Hidden() {
    hide(false);
  }
  const sessionValue = JSON.parse(sessionStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    temp_name: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    temp_mobile: "",
    locality: "",
    type: "",
    country_code: "",
    state_code: "",
  });


  const handleChange = (e, country) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (name === "phoneNumber") {
      // Handle phone number change
      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: fieldValue,
        errors: {
          ...prevState.errors,
          phoneNumber: "",
        },
      }));
    } else {
      // Handle other input changes
      setFormData((prevState) => ({
        ...prevState,
        [name]: fieldValue,
        errors: {
          ...prevState.errors,
          [name]: "",
        },
      }));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      ...formData.name,
      [name]: value,
    });
    

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${formData?.zip}`
      );
      const { city, state } = response.data;
      setCity(city);
      setState(state);
    } catch (error) {
      console.log(error);
    }
  };


  const validateForm = () => {
    const zipRegExp = /^\d{6}$/;
    const generalZipRegExp = /^\d{5}$/;

    const {
      temp_name,
      temp_mobile,
      
      country,
      state,
      city,
      locality,
      zip,
      type
    } = formData;

    const errors = {
      temp_name: "",
      temp_mobile: "",
      
      country: "",
      state: "",
      city: "",
      locality: "",
      zip: "",
      type: ""
    };
    let isValid = true;

    if (!temp_name) {
      isValid = false;
      errors.temp_name = "Username is required";
    }

    

    const phoneRegExp = /^\+?[1-9]\d{1,14}$/;
    if (!temp_mobile) {
      isValid = false;
      errors.temp_mobile = "Phone number is required";
    } else if (!phoneRegExp.test(temp_mobile)) {
      isValid = false;
      errors.temp_mobile = "Please enter a valid phone number";
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
    if (!type) {
      isValid = false;
      errors.type = "Type is required";
    }

    if (!locality) {
      isValid = false;
      errors.locality = "Full Address is required";
    } else if (locality.length < 5) {
      isValid = false;
      errors.locality = "Please enter a valid address";
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
          
          country: "",
          state: "",
          city: "",
          fullAddress: "",
          zip: "",
        },
      }));
    }, 3000);
    console.log(isValid);
    return isValid;
  };



  const saveAddress = () => {
    //console.log(formData)
    let newAddress = {
      temp_name: formData.temp_name,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zip: formData.zip,
      temp_mobile: formData.temp_mobile,
      locality: formData.locality,
      type: formData.type,
      client_id: sessionValue.id,
      country_code: formData.country_code,
      state_code: formData.state_code,
    };

    const isValid = validateForm();
    console.log(isValid);
    if (isValid) {
      axios.post(`${BassURl}/new-address`, newAddress).then((res) => {
        if (res.data.code === 200) {
          toast.success(res?.data?.msg);
          console.log(res?.data?.msg);
          setTimeout(() => {
            window.location.href = "/user-dashboard";
          }, 800);
          hide(false);
          window.location.reload(true);
        }
        else {
          toast.error(res?.data?.msg);
          console.log(res?.data?.msg);
        }
      }).catch((err) => {
        toast.error(err?.message);

        console.log(err.message);
      });
    }


  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 5, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="newsletter__popup newsletter__show"
        data-animation="slideInUp"
      >
        <div
          id="boxes"
          className="newsletter__popup--inner"
          style={{ width: "500px" }}
        >
          <button
            className="newsletter__popup--close__btn"
            aria-label="search close button"
            onClick={Hidden}
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
          <div className="box newsletter__popup--box  align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="checkout__page--area">
                    <div className="container">
                      <div className="checkout__page--inner ">
                        <main className="main__content_wrapper">
                          <form action="#" className="address-form">
                            <div className="checkout__content--step section__shipping--address">
                              <div className="section__header mb-3">
                                <h3 className="section__header--title">
                                  Shipping Address Details{" "}
                                </h3>
                              </div>
                              <div className="section__shipping--address__content">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group  mt-3">
                                      <PhoneInput
                                        className=""
                                        country={"in"}
                                        value={formData.temp_mobile}
                                        onChange={(value, country) =>
                                          handleChange(
                                            {
                                              target: {
                                                name: "temp_mobile",
                                                value,
                                              },
                                            },
                                            country
                                          )

                                        } // Handle phone number change
                                      />
                                      {formData?.errors?.temp_mobile && (
                                        <p className="error">{formData?.errors?.temp_mobile}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group  mt-3">
                                      {/* <label htmlFor="first_name">Full Name *</label> */}
                                      <input
                                        type="text"
                                        className="form-control address contact__form--input"
                                        id="full_name"
                                        required
                                        name="temp_name"
                                        value={formData.temp_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter Name"
                                      />
                                      {formData?.errors?.temp_name && (
                                        <p className="error">{formData?.errors?.temp_name}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group  mt-3">
                                      <div className="form-group  mt-3">
                                        {/* <label htmlFor="country">Address Type </label> */}
                                        <select
                                          className="form-control address contact__form--input"
                                          name="type"
                                          value={formData.type}
                                          onChange={handleInputChange}
                                        >
                                          <option value="">
                                            Select Address Type
                                          </option>
                                          <option value="home">Home</option>
                                          <option value="office">Office</option>
                                          <option value="other">Other</option>
                                        </select>
                                        {formData?.errors?.type && (
                                        <p className="error">{formData?.errors?.type}</p>
                                      )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group  mt-3">
                                      {/* <label htmlFor="address">Full Address *</label> */}
                                      <input
                                        type="text"
                                        className="form-control address contact__form--input"
                                        id="address"
                                        name="locality"
                                        value={formData.locality}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter address"
                                      />
                                      {formData?.errors?.locality && (
                                        <p className="error">{formData?.errors?.locality}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6 mt-3">
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
                                        console.log(item);
                                        setFormData({
                                          ...formData,
                                          country: item.name + "-" + item.isoCode,
                                          country_code: item.isoCode,
                                        });
                                      }}
                                    />
                                    {formData?.errors?.country && (
                                        <p className="error">{formData?.errors?.country}</p>
                                      )}
                                  </div>
                                  <div className="col-md-6 mt-3">
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
                                        console.log(item);
                                        setFormData({
                                          ...formData,
                                          state: item.name + "-" + item.isoCode,
                                          state_code: item.isoCode,
                                        });
                                      }}
                                    />
                                    {formData?.errors?.state && (
                                        <p className="error">{formData?.errors?.state}</p>
                                      )}
                                  </div>
                                  <div className="col-md-6 mt-3">
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
                                        console.log(item);
                                        setFormData({
                                          ...formData,
                                          city: item.name + "-" + item.stateCode,
                                          city_code: item.isoCode,
                                        });
                                      }}
                                    />
                                    {formData?.errors?.city && (
                                        <p className="error">{formData?.errors?.city}</p>
                                      )}
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group  mt-3">
                                      {/* <label htmlFor="pincode">Pincode *</label> */}
                                      <input
                                        type="text"
                                        className="form-control address contact__form--input"
                                        id="pincode"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        placeholder="Pincode"
                                      />
                                      {formData?.errors?.zip && (
                                        <p className="error">{formData?.errors?.zip}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="checkout__content--step__footer text-center align-items-center mb-3">
                              <a
                                className="continue__shipping--btn primary__btn text-captolize border-radius-5"
                                onClick={saveAddress}
                              >
                                Add Address
                              </a>
                            </div>
                          </form>
                        </main>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Addaddress;
