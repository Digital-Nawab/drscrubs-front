import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Slider from "react-slick";
import BassURl from "../../Api/Api";
import imageURl from "../../Api/ImageUrl";
import axios from "axios";
import { addToEmboidary } from "../../Redux/Action/AddEmboidaryAction";

function AddEmbroideryModal({ hide, data }) {
  function Hidden() {
    hide(false);
  }
  const dispatch = useDispatch();
  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  //console.log(countryData)

  const [content, setContent] = useState('');
  console.log(content);
  
  const [hasTyped, setHasTyped] = useState(false);
  const [formData, setFormData] = useState({
    pro_id: data?.data?.id,
    price: 250,
    type: 'Name',
    myname: "",
    secondLine: "",
    namePlacemnet: "Left Chest",
    color: "",
    font: "",
    content: content,
  });

  let Iconprice = countryData === 'INR' ? 500 : 7;
  let Rupess = countryData === 'INR' ? 250 : 4;

  // let iconPrice = 0
  // const Iconprice = countryData === 'INR' ? (<>{(iconPrice += 500)}</>) : (iconPrice += 7);
  // let RupesPrice = 0;
  // let Rupess = countryData === 'INR' ? (RupesPrice += 250) : (RupesPrice += 4);
  // console.log(Rupess)

  const [iconLogo, setIconLogo] = useState({
    pro_id: data?.data?.pro_id,
    type: 'logo',
    iconPlacement: "Right Chest",
    icon: "",
    price: Iconprice,
    upload: "",
    content: content,
  });

 
  const [logos, setLogos] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState('');
  const [file, setFile] = useState(null);
  const [is_public, setIsPublic] = useState('Y');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await axios.get(`${BassURl}/all-emboidery`);
      setLogos(response.data.data);
    } catch (error) {
      console.error('Error fetching logos', error);
    }
  };

  const handleChange = (value) => {
    setContent(value);
    setFormData((prevData) => ({ ...prevData, content: value }));
    setIconLogo((prevData) => ({ ...prevData, content: value }));
    if (!hasTyped) {
      setHasTyped(true);
    }
  };
  
  const handleIconLogoChange = (event) => {
    const { name, value } = event.target;
    setIconLogo({
      ...iconLogo,
      [name]: value,
    });
  };

  const saveData = (e) => {
    e.preventDefault();
    dispatch(addToEmboidary(formData));
    hide(false);
  };

  const iconLogoSave = (e) => {
    e.preventDefault();
    const iconData = {
      ...iconLogo,
      price: Rupess,
    };
    dispatch(addToEmboidary(iconData));
    hide(false);
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onPrivacyChange = (event) => {
    setIsPublic(event.target.value);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('is_public', is_public);

    try {
      const response = await axios.post(`${BassURl}/user-emboidery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.msg);
      setTimeout(() => {
        setMessage('');
      }, 3000);
      fetchLogos();
    } catch (error) {
      setMessage('Error uploading file');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      ['code-block'],
      [{ 'align': [] }],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'font',
    'align',
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: (index) => setSelectedLogo(logos[index]),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
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
        <div id="boxes" className="newsletter__popup--inner  addEmboidery">
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
          <div className="box newsletter__popup--box d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                 <h3 className="mt-4 mb-4"> EMBROIDERY </h3>
                </div>
                <div className="col-lg-6 mobile_view_emboidery text-center">
                 <div className="row" style={{ position: "sticky", top: "0", textAlign: 'left' }}>
                    <div className="col-lg-12 mt-2">
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        name="content"
                      />
                    </div>
                    <div className="col-lg-12 mt-5">
                      {hasTyped && (
                        <p className="mt-3">
                          ₹ {Rupess}
                        </p>
                      )}
                    </div>
                  </div>

                </div>
                <div className="col-lg-6 mt-2">
                  <div className="visual-logo ">
                    {

                      iconLogo?.icon === '' ? (
                        <>
                          <div className="logo-line-1" data-bind="i18n: 'A LOGO'">
                            A LOGO
                          </div>
                          <div
                            className="logo-line-2"
                            data-bind="i18n: 'Logo is placed on your chest on your anatomical right side.'"
                          >
                            Logo is placed on your chest on your anatomical right side.
                          </div>
                        </>) : (<>

                          <div className="logo-line-1" data-bind="i18n: 'A LOGO'">
                            <img src={iconLogo.icon} width="80px" alt="" />
                          </div>
                        </>)
                    }
                    <div class="logo-image-shirt">
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-2">
                <Slider {...settings}>
                    {logos.map((logo, index) => (
                      <li key={index}>
                        <input type="hidden" name="img" onChange={
                          handleIconLogoChange 
                        } value={`${imageURl}/${logo.logo}`} />
                        <input
                          type="radio"
                          name="icon"
                          value={`${imageURl}/${logo.logo}`}
                          checked={iconLogo.icon === `${imageURl}/${logo.logo}`}
                          onChange={
                            handleIconLogoChange 
                          }
                          defaultChecked={false}
                          id={`cb${index + 1}`}
                        />
                        <label
                          htmlFor={`cb${index + 1}`}
                          className="cb1"
                        >
                          <img src={`${imageURl}/${logo.logo}`} alt={`Logo ${index}`} />
                        </label>
                      </li>
                    ))}
                  </Slider>
                </div>
                <div className="col-lg-12">
                  <div className="shop__sidebar--widget widget__area d-lg-block">   
                    <div className="single__widget widget__bg">
                      <div>
                        <div className="col-lg-12">
                        <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="contact__form--list mb-20">
                                  <label
                                    className="contact__form--label"
                                    htmlFor="input2"
                                  >
                                  </label>

                                  <div className="row">
                                     <span style={{color:'green'}}>Size : 60 * 60px Max =500KB</span>
                                    <div className="col-lg-6">
                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            onChange={onFileChange}
                                            className="custom-file-input"
                                            id="customFile"
                                          />
                                          <label
                                            className="custom-file-label"
                                            htmlFor="customFile"
                                          >
                                          <i class="fa fa-upload" aria-hidden="true"></i>  Either PNG Or JPG/JPEG
                                          </label>
                                        </div>
                                      </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex p-2">
                                            <input type="radio"
                                             value="Y"
                                             checked={is_public === 'Y'}
                                             onChange={onPrivacyChange}
                                            />
                                            <label htmlFor="html">&nbsp;Public</label> &nbsp;&nbsp;
                                            <input type="radio"
                                              value="N"
                                              checked={is_public === 'N'}
                                              onChange={onPrivacyChange}
                                            />
                                            <label htmlFor="css">&nbsp;Private</label>
                                          </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <button className="contact__form--btn primary__btn" onClick={onFileUpload}>Add Custom Logo</button>
                                    </div>
                                    <p style={{color: 'green'}}>{message}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          <form
                            onSubmit={iconLogoSave}
                            className="contact__form--inner"
                          >
                            
                            <button
                              className="contact__form--btn primary__btn mt-3 text-center m-auto"
                              onClick={iconLogoSave}
                            >
                              ADD
                            </button>
                          </form>
                        </div>
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

export default AddEmbroideryModal;
