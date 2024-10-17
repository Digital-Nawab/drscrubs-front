import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./EditAddress.css";
import BassURl from "../../Api/Api";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
// import {
//     CitySelect,
//     CountrySelect,
//     StateSelect,
//     LanguageSelect,
//   } from "react-country-state-city";
//   import "react-country-state-city/dist/react-country-state-city.css";

import { Country, State, City } from "country-state-city";
import Select from "react-select";

const EditAddress = ({ address, onUpdate }) => {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [updateAddress, setUpdateAddress] = useState({ ...address });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to update the address
      const response = await axios.post(
        `${BassURl}/update-address`,
        updateAddress
      );
      // Call the onUpdate callback with the updated address data
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating address:", error.message);
    }
  };

  return (
    <Modal show={true} onHide={() => onUpdate(null)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group  mt-3">
                <PhoneInput
                  className=""
                  country={"in"}
                  value={updateAddress.temp_mobile}
                  onChange={(value, country) =>
                    handleChange(
                      { target: { name: "temp_mobile", value } },
                      country
                    )
                  }
                />
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
                  value={updateAddress.temp_name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group  mt-3">
                <div className="form-group  mt-3">
                  <select
                    className="form-control address contact__form--input"
                    name="type"
                    value={updateAddress.type}
                    onChange={handleChange}
                  >
                    <option value="">Select Address Type</option>
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group  mt-3 mb-3">
                <input
                  type="text"
                  className="form-control address contact__form--input"
                  id="address"
                  name="locality"
                  value={updateAddress.locality}
                  onChange={handleChange}
                  required
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                placeholder="Select Country"
                value={selectedCountry || (updateAddress.country && {
                  name: updateAddress.country.split('-')[0],
                  isoCode: updateAddress.country.split('-')[1],
                })}
                onChange={(item) => {
                  setSelectedCountry(item);
                  //console.log(item);
                  setUpdateAddress({
                    ...updateAddress,
                    country: item.name + "-" + item.isoCode,
                    country_code: item.isoCode,
                  });
                  setSelectedState(null);
                  setSelectedCity(null);
                }}
              />
            </div>
            <div className="col-md-6">
              <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                placeholder="Select State"
                value={selectedState || (updateAddress.state && {
                  name: updateAddress.state.split('-')[0],
                  isoCode: updateAddress.state.split('-')[1],
                })}
                onChange={(item) => {
                  setSelectedState(item);
                  //console.log(item);
                  setUpdateAddress({
                    ...updateAddress,
                    state: item.name + "-" + item.isoCode,
                    state_code: item.isoCode,
                  });
                  setSelectedCity(null);
                }}
              />
            </div>
            <div className="col-md-6">
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
                value={selectedCity || (updateAddress.city && {
                  name: updateAddress.city,
                })}
                onChange={(item) => {
                  setSelectedCity(item);
                  setUpdateAddress({
                    ...updateAddress,
                    city: item.name,
                  });
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="form-group  mt-3">
                <input
                  type="text"
                  className="form-control address contact__form--input"
                  id="pincode"
                  name="zip"
                  value={updateAddress.zip}
                  onChange={handleChange}
                  placeholder="Pincode"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn-primary mt-3 btn-sm">
            Update
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAddress;
