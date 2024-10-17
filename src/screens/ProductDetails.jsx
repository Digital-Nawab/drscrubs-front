import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/Carousel.css";
import Footer from "../components/Footer";
import {
  Link,
  json,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BassURl from "../Api/Api";
import imageURl from "../Api/ImageUrl";
import ColorCode from "../components/ColorCode";
import AddToCartPopup from "../Redux/Action/AddToCartPopup";
import { fetchProductById } from "../Redux/Action/getProductDetailByIdAction";
const ShoulderModal = lazy(() => import("../components/Modal/ShoulderModal"));
const AddEmbroideryModal = lazy(() =>
  import("../components/Modal/AddEmbroideryModal")
);
const SizeChartMen = lazy(() => import("../components/Modal/SizeChartMen"));
const SizeChartWomen = lazy(() => import("../components/Modal/SizeChartWomen"));
import ProductImage from "../components/ProductImage";
import { addToCartAction } from "../Redux/Action/CartAction";
import {
  addToEmboidary,
  deleteFromEmboidary,
} from "../Redux/Action/AddEmboidaryAction";
import ReviewForm from "../components/Review/ReviewForm";
import Review from "../components/Review/Review";
import "../App.css";

function TabPanel(props) {
  const { children, activeTab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {activeTab === index && <div>{children}</div>}
    </div>
  );
}

function ProductDetails({ initialReviews = [] }) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // get props data which come from link react-router-dom

  const location = useLocation();
  const colorName = location.state;
  const dispatch = useDispatch();

  // console.log(location)

  // Shoulder
  const [shoulderShow, SetShoulderShow] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (shoulderShow) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [shoulderShow]);

  function shoulderModel() {
    SetShoulderShow(true);
  }

  // Size Chart
  const [sizeChartMen, SetSizeChartMen] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (sizeChartMen) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [sizeChartMen]);

  function ChartMen() {
    SetSizeChartMen(true);
  }

  // Add Emboidery

  const [addEmboidery, setaddEmboidery] = useState(false);

  useEffect(() => {
    if (addEmboidery) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [addEmboidery]);

  function add_emboidery() {
    // console.log("hello");
    setaddEmboidery(true);
  }

  // increase size price funcationality

  const [sizePrice, setSizePrice] = useState("");

  useEffect(() => {
    axios.get(`${BassURl}/all-size`).then((res) => {
      setSizePrice(res.data.data);
    });
  }, []);

  // console.log(sizePrice);

  const [selectSize, setSelectSize] = useState("standard");
  // alert(selectSize);

  // form values & and funcationality
  let initialValues = {
    size: "",
    // customSize: {
    //   shoulder: "",
    //   chest: "",
    //   bust: "",
    //   underbust: "",
    //   waist: "",
    //   hip: "",
    //   upperArm: "",
    //   hsptobust: "",
    //   hpstowaist: "",
    //   hpstoknee: "",
    // },
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // console.log(formValues);
  };
  // console.log(formValues)

  // get Custome Size

  const [customeSize, setcustomeSize] = useState([]);

  const CustomehandleChange = (e) => {
    const { name, value } = e.target;
    setcustomeSize({
      ...customeSize,

      [name]: value,

      // [name]: value,
    });
    console.log(customeSize);
  };

  // console.log(customeSize, 'customeSize');
  // localStorage.setItem('customSize',customeSize);
  // // Nav Tabs

  // pricedata
  const [splitValues, setSplitValues] = useState([]);

  useEffect(() => {
    if (formValues?.size != "") {
      const parts = formValues?.size.split("-");
      setSplitValues(parts);
    } else {
      setSplitValues([]);
    }
  }, [formValues]);
  // console.log(splitValues[0]);

  const [addSizePrice, setAddSizePrice] = useState(0);
  console.log(addSizePrice);

  const sizePriceData = () => {
    sizePrice?.standard?.map((items, index) => {
      if (items?.title === splitValues[0]) {
        localStorage.setItem("add_sizr_price", JSON.stringify(items?.add_prce));
        return setAddSizePrice(items?.add_prce);
      }
    });
  };
  useEffect(() => {
    sizePriceData();
  }, [splitValues[0]]);
  // console.log(addSizePrice);

  const [activeTab, setActiveTab] = useState(1); // State to keep track of active tab

  // Function to handle tab click
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  // Add To Cart Product Funcationality
  // console.log(activeTab)

  // get params

  const { productUrl } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const term = queryParams.get("color");
  // const location = queryParams.get("location")

  // console.log(term);
  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  // console.log(countryData)

  useEffect(() => {
    const data = 1;
    dispatch(fetchProductById(productUrl, term));
  }, [dispatch, countryData]);

  const getProductById = useSelector((state) => state.productByID);
  console.log(getProductById);
  const { productDetails, isProductLoading, error } = getProductById;
  // console.log(productDetails?.data?.id);
  // getColor Api

  // get Code Api ==||===>||===>||===>

  const getEmbroideryData = JSON.parse(localStorage.getItem("emboidery"));

  // add to cart Funcationality

  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  const addtoemboidaryreducer = useSelector(
    (state) => state?.addemboidaryReducer
  );
  const { emboidary } = addtoemboidaryreducer;
  // find proudct  particular emboidary
  const filteredData = emboidary.filter(
    (item) => item?.pro_id == productDetails?.data?.id
  );
  // console.log(filteredData, "product");

  const emboidaryPrice =
    filteredData?.length > 0
      ? filteredData?.map((data) => {
          return data?.price;
        })
      : 0;
  // console.log(emboidaryPrice)

  let priceEmboidary = emboidaryPrice[0];
  // console.log(priceEmboidary)

  // price: productDetails?.data?.rupee,
  // dollar_price: productDetails?.data?.price,

  function addtocart(e) {
    e.preventDefault();

    console.log(Object.keys(customeSize).length);

    // Check if product has size availability
    if (productDetails?.data?.size_availability === "yes") {
      // If size is selected or custom size is provided
      if (formValues?.size.length > 0 || Object.keys(customeSize).length > 0) {
        // Prepare product data
        const productData = {
          title: productDetails?.data?.product_title_eng,
          color_name: productDetails?.data?.color_name,
          color_id: productDetails.data.color,
          sku_number: productDetails?.data?.sku_number,
          pro_id: productDetails?.data?.pro_id,
          image: productDetails?.data?.image,
          price_rupee: productDetails?.data?.product_price_rupee,
          price_doller: productDetails?.data?.product_price_dollar,
          gst_inr: productDetails?.data?.gst_inr,
          gst_us: productDetails?.data?.gst_us,
          qty: 1,
          deliver_fee: productDetails?.data?.delivery_charges_rupee,
          size: formValues?.size,
          customeSize: customeSize,
          emboidery: filteredData,
          emboidery_price: priceEmboidary,
        };

        console.log(productData);
        // Dispatch action to add to cart
        dispatch(addToCartAction(productData, qty, priceEmboidary));
        // Set popup open flag
        setIsPopupOpen(true);
      } else {
        // If size is not selected, show error message
        toast.error("Please select size");
      }
    } else if (productDetails?.data?.size_availability === "no") {
      // If size is not available
      // Prepare product data
      const productData = {
        title: productDetails?.data?.product_title_eng,
        color_name: productDetails?.data?.color_name,
        color_id: productDetails.data.color,
        sku_number: productDetails?.data?.sku_number,
        pro_id: productDetails?.data?.pro_id,
        image: productDetails?.data?.image,
        price_rupee: productDetails?.data?.product_price_rupee,
        price_doller: productDetails?.data?.product_price_dollar,
        gst_inr: productDetails?.data?.gst_inr,
        gst_us: productDetails?.data?.gst_us,
        qty: 1,
        deliver_fee: productDetails?.data?.delivery_charges_rupee,
        size: " ",
        customeSize: "",
        emboidery: "",
        emboidery_price: 0,
      };

      console.log(productData);

      // Dispatch action to add to cart
      dispatch(addToCartAction(productData, qty, priceEmboidary));
      // Set popup open flag
      setIsPopupOpen(true);
    }
  }

  const handleClosePopup = () => {
    // Close the popup by setting isPopupOpen to false
    setIsPopupOpen(false);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //console.log(isPopupOpen);
  // remove emboidery

  //   get dtate

  // const emboideryIcon= JSON.parse(localStorage.get('emboidery'));
  // const emboideryBoth= JSON.parse(localStorage.get('emboidery'));

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const deleteEmboidary = (item) => {
    dispatch(deleteFromEmboidary(item));
    localStorage.removeItem("cartItems");
    localStorage.removeItem("emboidary");
  };

  // get api

  const [standedSize, setStandedSize] = useState();
  const [customSizeApi, setCustomSizeApi] = useState();
  useEffect(() => {
    axios.get(`${BassURl}/all-size`).then((res) => {
      setStandedSize(res.data.data?.standard);
      setCustomSizeApi(res.data.data?.custom);
    });
  }, []);
  // encaspulating loop
  const elements = [];

  const renderLoop = (count) => {
    const elements = [];
    for (let i = 0; i <= count; i++) {
      elements.push(i);
    }
    return elements;
  };
  const dynamicValue = 100;

  const [reviews, setReviews] = useState(initialReviews);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    console.log(reviews);
  };

  const Capsettings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {isProductLoading ? (
        <>
          <div class="loader1">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          {/*  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }} */}

          <section className="product__details--section section--padding">
            <div className="container">
              <div className="row row-cols-lg-2 row-cols-md-2">
                <div className="col">
                  <div className="product__details--media">
                    <div className="product__media--preview ">
                      <div className="product__media--preview__items">
                        {productDetails?.gallery?.length > 0 ? (
                          <>
                            <ProductImage images={productDetails?.gallery} />
                          </>
                        ) : (
                          <>
                            <div className="text-center align-center d-flex">
                              <a
                                className="product__media--preview__items--link glightbox"
                                data-gallery="product-media-preview"
                                href={productDetails?.data?.image}
                              >
                                <img
                                  className="product__media--preview__items--img"
                                  src={`${imageURl}/${productDetails?.data?.image}`}
                                  alt="product-media-img"
                                  style={{ width: "100%" }}
                                />
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="product__details--info">
                    <form action="#">
                      <h2 className="product__details--info__title mb-15">
                        {productDetails?.data?.product_title_eng} -{" "}
                        {productDetails?.data?.color_name}
                      </h2>
                      <div className="product__details--info__price mb-10">
                        {countryData === "INR" ? (
                          <>
                            <span className="current__price">
                              ₹ {productDetails?.data?.product_price_rupee}
                            </span>
                          </>
                        ) : (
                          <>
                            <>
                              <span className="current__price">
                                ${productDetails?.data?.product_price_dollar}
                              </span>
                            </>
                          </>
                        )}
                      </div>
                      <div className="product__details--info__rating d-flex align-items-center mb-15">
                        <ul className="rating d-flex justify-content-center">
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                        </ul>
                        <span className="product__items--rating__count--number">
                          (24)
                        </span>
                      </div>
                      <p
                        className="product__details--info__desc mb-15"
                        dangerouslySetInnerHTML={{
                          __html: productDetails?.data?.product_properties,
                        }}
                      ></p>
                      <div className="product__variant">
                        <div className="product__variant--list mb-10">
                          <fieldset className="variant__input--fieldset">
                            <legend className="product__variant--title mb-8">
                              Colour : {productDetails?.data?.color_name}
                            </legend>
                            <ColorCode
                              color={productDetails?.available_color}
                              colorActive={productDetails?.data?.color_name}
                              colorImage={`${imageURl}/${productDetails?.data?.image}`}
                            />
                          </fieldset>
                        </div>

                        {productDetails?.data?.size_availability === "yes" ? (
                          <>
                            <div className="d-flex">
                              <span
                                className="select-label fnt-xs my-auto mr-md-4 mr-3"
                                style={{ fontWeight: "600" }}
                              >
                                Select Size :
                              </span>

                              <ul
                                className="nav nav-pills mb-3  d-flex justify-content-xl-between  size_option"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li
                                  className="nav-item size_padding"
                                  role="presentation"
                                >
                                  <a
                                    href=""
                                    className="nav-link nav-size active"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                    onClick={() => setSelectSize("standard")}
                                  >
                                    {" "}
                                    Standard Size
                                  </a>
                                  {/* <label>
                            <input
                              className="gx-5"
                              type="radio"
                              name="options"
                              id="option1"
                            />
                            Standard Size
                          </label> */}
                                </li>

                                <li className="nav-item" role="presentation">
                                  <a
                                    className="nav-link nav-size"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                    onClick={() => setSelectSize("custom")}
                                  >
                                    Custom Size
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                              <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                              >
                                <div className="row">
                                  <div className="col-md-10">
                                    <p className="text-des-s">
                                      Size charts vary across brands{" "}
                                      <a
                                        className="learn-link"
                                        href="javascript:void(0)"
                                        data-toggle="modal"
                                        data-target=".js-size-chart-modal-wrp"
                                        onClick={ChartMen}
                                      >
                                        size chart
                                      </a>
                                      .
                                    </p>
                                  </div>
                                </div>
                                <div className="measures-drop-wrp d-flex flex-md-wrap pt-3 pdt-size-select">
                                  {standedSize &&
                                    standedSize?.map((items) => {
                                      //const showSize = productDetails?.data?.product_type === items?.ptype || productDetails?.data?.product_type === "both";
                                      return (
                                        <>
                                          {/* {showSize && ( */}
                                          <div className="size text-center">
                                            {/* <span className="size-hd">
                                          {items?.title}
                                        </span> */}
                                            <span className="size-number">
                                              <input
                                                className="size-select"
                                                id={`size${items?.title}`}
                                                type="radio"
                                                name="size"
                                                value={`${items?.title}`}
                                                // checked={selectedOption === 'XS-0'}

                                                onChange={handleChange}
                                                defaultValue="XS-0"
                                              />
                                              <label
                                                className="size-number__label"
                                                htmlFor={`size${items?.title}`}
                                              >
                                                {items?.title}
                                              </label>
                                            </span>
                                          </div>
                                          {/* )}  */}
                                        </>
                                      );
                                    })}
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                              >
                                <p className="text-des">
                                  <a
                                    className="learn-link"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#howToMeasurePd"
                                  >
                                    How to Measure
                                  </a>
                                </p>
                                <p className="customFeeText fnt-xxs pt-2 less-than-three-orders-guest-only">
                                  Measurements to be provided in inches
                                </p>

                                <div className="row">
                                  <div className="col-12">
                                    <div
                                      className="measures-drop-wrp d-flex flex-wrap pt-4"
                                      id="mandatorySizeOptions"
                                    >
                                      {customSizeApi &&
                                        customSizeApi?.map((items, index) => {
                                          const showCustomSize =
                                            productDetails?.data
                                              ?.product_type === items?.ptype ||
                                            productDetails?.data
                                              ?.product_type === "both";

                                          return (
                                            <>
                                              {showCustomSize && (
                                                <div
                                                  className="drop-container mb-2 mb-md-3"
                                                  key={index}
                                                >
                                                  <div className="drop-title">
                                                    <span className="selection-label">
                                                      {items?.title}
                                                    </span>

                                                    <div className="select-style">
                                                      <div className="select_wrap">
                                                        <select
                                                          className="txt-gry-12 select_box selectized"
                                                          x-data-name={
                                                            items?.title
                                                          }
                                                          x-data-optional="false"
                                                          value={
                                                            customeSize.items
                                                              ?.title
                                                          }
                                                          onChange={
                                                            CustomehandleChange
                                                          }
                                                          name={items?.title}
                                                        >
                                                          <option
                                                            // disabled=""
                                                            onChange={
                                                              CustomehandleChange
                                                            }
                                                            selected="selected"
                                                          >
                                                            select
                                                          </option>
                                                          {renderLoop(
                                                            dynamicValue
                                                          ).map((element) => (
                                                            <option
                                                              value={element}
                                                            >
                                                              {element}"
                                                            </option>
                                                          ))}
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </>
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {
                                // console.log(selectSize)

                                selectSize == "standard" ? (
                                  <>
                                    {addSizePrice != 0 ? (
                                      <>
                                        <h6>
                                          Add Size Price :{" "}
                                          <span
                                            style={{
                                              color: "green",
                                              fontWeight: "600",
                                            }}
                                          >
                                            {" "}
                                            {addSizePrice}
                                          </span>
                                        </h6>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )
                              }
                            </div>
                            <hr />
                            <div className="row"></div>

                            <div className="select-Height d-flex align-items-center drop-container mb-2 mb-md-3">
                              <span className="select-label mr-4">
                                Your Height
                                <span className="d-flex heightFeet">
                                  (feet &amp; inches)
                                </span>
                              </span>
                              <div className="select-style select-style--height mt-0 heightSelectContainer">
                                <div className="select_wrap">
                                  <select
                                    className="txt-gry-12 select_box selectized"
                                    x-data-name="height"
                                  >
                                    <option
                                      disabled="disabled"
                                      selected="selected"
                                    >
                                      select
                                    </option>
                                    <option value="4.6">4'6"</option>
                                    <option value="4.7">4'7"</option>
                                    <option value="4.8">4'8"</option>
                                    <option value="4.9">4'9"</option>
                                    <option value="4.10">4'10"</option>
                                    <option value="4.11">4'11"</option>
                                    <option value={5.0}>5'0"</option>
                                    <option value="5.1">5'1"</option>
                                    <option value="5.2">5'2"</option>
                                    <option value="5.3">5'3"</option>
                                    <option value="5.4">5'4"</option>
                                    <option value="5.5">5'5"</option>
                                    <option value="5.6">5'6"</option>
                                    <option value="5.7">5'7"</option>
                                    <option value="5.8">5'8"</option>
                                    <option value="5.9">5'9"</option>
                                    <option value="5.10">5'10"</option>
                                    <option value="5.11">5'11"</option>
                                    <option value={6.0}>6'0"</option>
                                    <option value="6.1">6'1"</option>
                                    <option value="6.2">6'2"</option>
                                    <option value="6.3">6'3"</option>
                                    <option value="6.4">6'4"</option>
                                    <option value="6.5">6'5"</option>
                                    <option value="6.6">6'6"</option>
                                    <option value="6.7">6'7"</option>
                                    <option value="6.8">6'8"</option>
                                    <option value="6.9">6'9"</option>
                                    <option value="6.10">6'10"</option>
                                    <option value="6.11">6'11"</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <hr />

                            {localStorage.getItem("emboidary") ? (
                              filteredData.length > 0 ? (
                                filteredData?.map((item) => {
                                  return item?.pro_id ==
                                    productDetails?.data?.id ? (
                                    <>
                                      <div className="d-flex justify-content-between ">
                                        <label
                                          className="p-2"
                                          style={{
                                            textDecoration: "underline",
                                            padding: "5px",
                                          }}
                                        >
                                          <input
                                            className="m-2"
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                          />
                                          Added Emboidery
                                        </label>

                                        <div
                                          className="removeEmboidery"
                                          onClick={() => deleteEmboidary(item)}
                                        >
                                          <a title="remove">
                                            <i>
                                              {" "}
                                              <img
                                                className="w-50"
                                                src="/assets/img/remove.png"
                                                width={50}
                                                alt=""
                                                srcset=""
                                              />
                                            </i>
                                          </a>
                                        </div>
                                      </div>
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-md-12">
                                            {countryData === "INR" ? (
                                              <>
                                                {item?.icon ? (
                                                  <div className="row mt-3">
                                                    <div className="col col-md-2">
                                                      <div className="shadow">
                                                        <img
                                                          src={`${item?.icon}`}
                                                          alt="logo"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="col col-md-10">
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: item?.content,
                                                        }}
                                                      />
                                                      <div>
                                                        Type :- {item?.type}
                                                      </div>
                                                      <div>
                                                        Price :- ₹ {item?.price}
                                                      </div>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div className="row mt-3">
                                                    <div className="col col-md-6">
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: item?.content,
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="col col-md-6">
                                                      <div>
                                                        Type :- {item?.type}
                                                      </div>
                                                      <div>
                                                        Price :- ₹ {item?.price}
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                {item?.icon ? (
                                                  <div className="row mt-3">
                                                    <div className="col col-md-2">
                                                      <div className="shadow">
                                                        <img
                                                          src={`${item?.icon}`}
                                                          alt="logo"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="col col-md-10">
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: item?.content,
                                                        }}
                                                      />
                                                      <div>
                                                        Type :- {item?.type}
                                                      </div>
                                                      <div>
                                                        Price :- $ {item?.price}
                                                      </div>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div className="row mt-3">
                                                    <div className="col col-md-6">
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: item?.content,
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="col col-md-6">
                                                      <div>
                                                        Type :- {item?.type}
                                                      </div>
                                                      <div>
                                                        Price :- $ {item?.price}
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="product__variant--list mb-15 text-center">
                                        <Link
                                          className="variant__buy--now__btn primary__btn "
                                          style={{
                                            background: "#fff",
                                            color: "black",
                                            border: "1px solid black",
                                          }}
                                          onClick={add_emboidery}
                                        >
                                          Add Emboidery
                                        </Link>
                                      </div>
                                    </>
                                  );
                                })
                              ) : (
                                <>
                                  <div className="product__variant--list mb-15 text-center">
                                    <Link
                                      className="variant__buy--now__btn primary__btn "
                                      style={{
                                        background: "#fff",
                                        color: "black",
                                        border: "1px solid black",
                                      }}
                                      onClick={add_emboidery}
                                    >
                                      Add Emboidery
                                    </Link>
                                  </div>
                                </>
                              )
                            ) : (
                              <>
                                {" "}
                                <div className="product__variant--list mb-15 text-center">
                                  <Link
                                    className="variant__buy--now__btn primary__btn "
                                    style={{
                                      background: "#fff",
                                      color: "black",
                                      border: "1px solid black",
                                    }}
                                    onClick={add_emboidery}
                                  >
                                    Add Emboidery
                                  </Link>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        <div
                          className="product__variant--list mb-15 text-center mt-5"
                          onClick={addtocart}
                        >
                          <button className="variant__buy--now__btn primary__btn ">
                            Add To Cart
                          </button>
                          <div className="cart-icon">
                            <img
                              src="/assets/img/icon/1.jpg"
                              alt="Amazon Pay"
                            />
                            &nbsp;
                            <img src="/assets/img/icon/2.jpg" alt="GPay" />
                            &nbsp;
                            <img
                              src="/assets/img/icon/3.png"
                              alt="Master Cart"
                            />
                            &nbsp;
                            <img src="/assets/img/icon/4.jpg" alt="Mobikwik" />
                            &nbsp;
                            <img src="/assets/img/icon/5.png" alt="Rupay" />
                            &nbsp;
                            <img src="/assets/img/icon/6.jpg" alt="Visa" />
                            &nbsp;
                          </div>

                          {/* <AddToCartPopup 
                          isOpen={isPopupOpen} 
                          onClose={handleClosePopup} 
                          popupTitle={productDetails?.data?.product_title_eng}
                          popupPrice = {productDetails?.data?.product_price_rupee}
                          popupPriceDollar={productDetails?.data?.product_price_dollar}
                          popupImage ={`${imageURl}/${productDetails?.data?.image}`}
                          /> */}
                        </div>
                        {productDetails?.data?.interesting_facts ||
                        productDetails?.data?.storage_instructions ? (
                          <span
                            className="select-label fnt-xs my-auto mr-md-4 mr-3 mt-5"
                            style={{ fontWeight: "600" }}
                          >
                            Product Details :
                          </span>
                        ) : null}
                        <section
                          className="product__details--tab__section mt-5"
                          style={{ paddingTop: "20px !important" }}
                        >
                          <div className="container">
                            <div className="row row-cols-1">
                              <div className="col">
                                <ul className="product__details--tab d-flex">
                                  {productDetails?.data?.interesting_facts ? (
                                    <li
                                      className={`  nav-tab product__details--tab__list ${
                                        activeTab === 1 ? "active" : ""
                                      }`}
                                      onClick={() => handleTabClick(1)}
                                      data-toggle="tab"
                                      data-target="#description"
                                    >
                                      DETAILS
                                    </li>
                                  ) : null}

                                  {productDetails?.data
                                    ?.storage_instructions ? (
                                    <li
                                      className={`nav-tab product__details--tab__list ${
                                        activeTab === 2 ? "active" : ""
                                      }`}
                                      onClick={() => handleTabClick(2)}
                                      data-toggle="tab"
                                      data-target="#reviews"
                                    >
                                      FABRIC
                                    </li>
                                  ) : null}
                                </ul>
                                {productDetails?.data?.interesting_facts ||
                                productDetails?.data?.storage_instructions ? (
                                  <div className="product__details--tab__inner">
                                    <div className="tab_content">
                                      {activeTab === 1 && (
                                        <div
                                          id="description"
                                          className="tab_pane active show"
                                        >
                                          <div className="product__tab--content">
                                            <div className="product__tab--content__step">
                                              <p
                                                className="product__details--info__desc mb-15"
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    productDetails?.data
                                                      ?.interesting_facts,
                                                }}
                                              ></p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {activeTab === 2 ? (
                                        // If activeTab is 2, show product key features
                                        <p
                                          className="product__details--info__desc mb-15"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              productDetails?.data
                                                ?.storage_instructions,
                                          }}
                                        ></p>
                                      ) : null}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {shoulderShow ? (
            <Suspense
              fallback={
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              <ShoulderModal hide={SetShoulderShow} />
            </Suspense>
          ) : null}
          {sizeChartMen ? (
            <Suspense
              fallback={
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              {/* <SizeChartMen hide={SetSizeChartMen} /> */}
              {productDetails?.data?.product_for === "female" ? (
                <SizeChartWomen hide={SetSizeChartMen} />
              ) : productDetails?.data?.product_for === "male" ? (
                <SizeChartMen hide={SetSizeChartMen} />
              ) : null}
            </Suspense>
          ) : null}
          {addEmboidery ? (
            <Suspense
              fallback={
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              <AddEmbroideryModal
                data={productDetails}
                hide={setaddEmboidery}
              />
            </Suspense>
          ) : null}

          {/* <section className="reviews container mb-5">
            <div className="section__heading text-center mb-35">
              <h2 className="section__heading--maintitle style2">
                Customer Review
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-4 col-xl-4 col-12">
                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
              <div className="col-lg-8 col-xl-8 col-12">
                <Slider {...Capsettings}>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Review key={review.id} {...review} />
                    ))
                  ) : (
                    <p></p>
                  )}
                </Slider>
              </div>
            </div>
          </section>  */}

          <Footer />
        </>
      )}
    </>
  );
}

export default ProductDetails;
