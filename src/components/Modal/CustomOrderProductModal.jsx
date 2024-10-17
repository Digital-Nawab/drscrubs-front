import React, { Suspense, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import BassURl from '../../Api/Api';
import imageURl from '../../Api/ImageUrl';
import ColorCode from '../ColorCode';
import axios from 'axios';
import AddEmbroideryModal from './AddEmbroideryModal';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import CustomColor from './CustomColor';

import { addToCartAction } from "../../Redux/Action/CartAction";

import { useDispatch, useSelector } from "react-redux";

function CustomOrderProductModal({ hide, data }) {
    const countryData = JSON.parse(localStorage.getItem('currencyTop'));
    console.log(data)
    const dispatch = useDispatch();
    function Hidden() {
        hide(false);
    }
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
    const [qty, setQty] = useState(1);
    const [standedSize, setStandedSize] = useState();
    const [customSizeApi, setCustomSizeApi] = useState();
    const [selectedColor, setSelectedColor] = useState(null);

     const addtoemboidaryreducer = useSelector(
        (state) => state?.addemboidaryReducer
      );
      const { emboidary } = addtoemboidaryreducer;
      // find proudct  particular emboidary
      const filteredData = emboidary.filter((item) => item?.pro_id == popupData?.data?.id);
      // console.log(filteredData, "product");
    
      const emboidaryPrice = filteredData?.length > 0 ? (filteredData?.map((data) => { return (data?.price) })) : 0;
      // console.log(emboidaryPrice)
    
    
    
    let priceEmboidary = emboidaryPrice[0]

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
    const [selectSize, setSelectSize] = useState('standard');

    const [customeSize, setcustomeSize] = useState([]);
    
    const CustomehandleChange = (e) => {
        const { name, value } = e.target;
        setcustomeSize({
            ...customeSize,

            [name]: value,

            // [name]: value,
        });
        // console.log(formValues);
    };

    console.log(customeSize, 'customeSize');
    // localStorage.setItem('customSize',customeSize);
    // // Nav Tabs

    // Popup Data 
    const [popupData, setoPupData] = useState();


    useEffect(() => {
        axios.get(`${BassURl}/product-details/${data}?color=''`).then((res) => {
            setoPupData(res.data?.data)
        })

    }, []);

    console.log(popupData, 'popup DAta')
   
    function addtocart(e) {
        e.preventDefault();
        // window.scrollTo(0, 0);
        //console.log(productDetails?.data?.size_availability);
        
        if(popupData?.data?.size_availability == "yes"){
          if (formValues?.size != "" || customeSize != "") {
            // Valid selection, proceed with form submission
            if (countryData === 'INR') {
              const productData = {
                title: popupData?.data?.product_title_eng,
                color_name: popupData?.data?.color_name,
                color_id: popupData.data.color,
                sku_number: popupData?.data?.sku_number,
                pro_id: popupData?.data?.pro_id,
                image: popupData?.data?.image,
                price: popupData?.data?.product_price_rupee,
                qty: 1,
                deliver_fee: popupData?.data?.delivery_charges_rupee,
                size: formValues?.size,
                customeSize: customeSize,
                emboidery: filteredData,
                emboidery_price: priceEmboidary,
              };
              dispatch(addToCartAction(productData, qty, priceEmboidary));
            } else if (countryData === "USD") {
              const productData = {
                title: popupData?.data?.product_title_eng,
                sku_number: popupData?.data?.sku_number,
                color_name: popupData?.data?.color_name,
                color_id: popupData?.data?.color,
                id: popupData?.data?.id,
                image: popupData?.data?.image,
                price: popupData?.data?.product_price_dollar,
                pro_id: popupData?.data?.pro_id,
                qty: 1,
                deliver_fee: popupData?.data?.delivery_charges_doller,
                size: formValues?.size,
                customeSize: customeSize,
                emboidery: filteredData,
                emboidery_price: priceEmboidary,
              };
              dispatch(addToCartAction(productData, qty, priceEmboidary));
            } else {
              toast.error("Please select Your Country ");
            }
      
           
          } else {
            // No selection, display an error message or take appropriate action
            toast.error("Please select size");
          }
        }else if(popupData?.data?.size_availability == "no"){
          if (countryData === 'INR') {
            const productData = {
              title: popupData?.data?.product_title_eng,
              color_name: popupData?.data?.color_name,
              color_id: popupData.data.color,
              sku_number: popupData?.data?.sku_number,
              pro_id: popupData?.data?.pro_id,
              image: popupData?.data?.image,
              price: popupData?.data?.product_price_rupee,
              qty: 1,
              deliver_fee: popupData?.data?.delivery_charges_rupee,
              size: "",
              customeSize: "",
              emboidery: "",
              emboidery_price: 0,
            };
            dispatch(addToCartAction(productData, qty, priceEmboidary));
          } else if (countryData === "USD") {
            const productData = {
              title: popupData?.data?.product_title_eng,
              sku_number: popupData?.data?.sku_number,
              color_name: popupData?.data?.color_name,
              color_id: popupData?.data?.color,
              id: popupData?.data?.id,
              image: popupData?.data?.image,
              price: popupData?.data?.product_price_dollar,
              pro_id: popupData?.data?.pro_id,
              qty: 1,
              deliver_fee: popupData?.data?.delivery_charges_doller,
              size: "",
              customeSize: "",
              emboidery: "",
              emboidery_price: 0,
            };
            dispatch(addToCartAction(productData, qty, priceEmboidary));
          } else {
            toast.error("Please select Your Country ");
          }
        }
        
      };
      




    // pricedata
    const [splitValues, setSplitValues] = useState([]);

    useEffect(() => {
        if (formValues?.size != '') {
            const parts = formValues?.size.split('-');
            setSplitValues(parts);
        } else {
            setSplitValues([]);
        }
    }, [formValues]);
    console.log(splitValues[0]);

    const [addSizePrice, setAddSizePrice] = useState(0)




    useEffect(() => {
        axios.get(`${BassURl}/all-size`).then((res) => {
            setStandedSize(res.data.data?.standard);
            setCustomSizeApi(res.data.data?.custom);
        });
    }, []);


    const renderLoop = (count) => {
        const elements = [];
        for (let i = 0; i <= count; i++) {
            elements.push(i);
        }
        return elements;
    };
    const dynamicValue = 100;



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

    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
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
                <div id="boxes" className="newsletter__popup--inner" style={{ height: '80vh', width: "60vw" }}>
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
                            <div className="row row-cols-lg-2 row-cols-md-2">
                                <div className="col-4">
                                    <div className="product__details--media">
                                        <img
                                            className="product__media--preview__items--img"
                                            src={`${imageURl}${popupData?.data?.image}`}
                                            alt="product-media-img"
                                        />

                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="product__details--info">
                                        <form action="#">
                                            <h2 className="product__details--info__title mb-15">
                                                {popupData?.data?.product_title_eng}
                                            </h2>
                                            <div className="product__details--info__price mb-10">
                                                {
                                                    countryData === 'INR' ? (<>

                                                        <span className="current__price">
                                                            ₹ {popupData?.data?.product_price_rupee}
                                                        </span>
                                                    </>) : (<>
                                                        <>
                                                            <span className="current__price">
                                                                ${popupData?.data?.product_price_dollar}
                                                            </span>
                                                        </>
                                                    </>)
                                                }


                                            </div>

                                            <p className="product__details--info__desc mb-15" dangerouslySetInnerHTML={{
                                                __html: popupData?.data?.product_properties,
                                            }}>

                                            </p>
                                            <div className="product__variant">
                                                <div className="product__variant--list mb-10">
                                                    <fieldset className="variant__input--fieldset">
                                                        <legend className="product__variant--title mb-8">
                                                        Colour : {popupData?.data?.color_name}
                                                        </legend>

                                                        <CustomColor
                                                            color={popupData?.available_color}

                                                        />
                                                    </fieldset>
                                                </div>

                                                <div className="product__variant--list quantity d-flex align-items-center mb-20">
                                                    <div className="quantity__box">

                                                        <legend className="product__variant--title mb-8">
                                                            Qty  :
                                                        </legend>
                                                        <input type="number" />

                                                    </div>
                                                </div>
                                                {popupData?.data?.size_availability === 'yes' ? (
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
                                                                className="nav-link active"
                                                                id="pills-home-tab"
                                                                data-bs-toggle="pill"
                                                                data-bs-target="#pills-home"
                                                                type="button"
                                                                role="tab"
                                                                aria-controls="pills-home"
                                                                aria-selected="true"
                                                                onClick={() => setSelectSize('standard')}
                                                            >
                                                                {" "}
                                                                Standard Size
                                                            </a>

                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a
                                                                className="nav-link"
                                                                id="pills-profile-tab"
                                                                data-bs-toggle="pill"
                                                                data-bs-target="#pills-profile"
                                                                type="button"
                                                                role="tab"
                                                                aria-controls="pills-profile"
                                                                aria-selected="false"
                                                                onClick={() => setSelectSize('custom')}
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
                                                                    return (
                                                                        <>




                                                                            <div className="size text-center">
                                                                                <span className="size-hd">
                                                                                    {items?.title}
                                                                                </span>
                                                                                <span className="size-number">
                                                                                    <input
                                                                                        className="size-select"
                                                                                        id={`size${items?.start_value}`}
                                                                                        type="radio"
                                                                                        name="size"
                                                                                        value={`${items?.title}-${items?.start_value}`}
                                                                                        // checked={selectedOption === 'XS-0'}

                                                                                        onChange={handleChange}
                                                                                        defaultValue="XS-0"
                                                                                    />
                                                                                    <label
                                                                                        className="size-number__label"
                                                                                        htmlFor={`size${items?.start_value}`}
                                                                                    >
                                                                                        {items?.start_value}
                                                                                    </label>
                                                                                </span>
                                                                                <span className="size-number">
                                                                                    <input
                                                                                        className="size-select"
                                                                                        id={`size${items?.end_value}`}
                                                                                        type="radio"
                                                                                        name="size"
                                                                                        value={`${items?.title}-${items?.end_value}`}
                                                                                        // checked={selectedOption === 'XS-2'}
                                                                                        onChange={handleChange}
                                                                                        ADD TEXT EMBROIDERY                                                    defaultValue="XS-2"
                                                                                    />
                                                                                    <label
                                                                                        className="size-number__label"
                                                                                        htmlFor={`size${items?.end_value}`}
                                                                                    >
                                                                                        {items?.end_value}
                                                                                    </label>
                                                                                </span>
                                                                            </div>

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
                                                                            return (
                                                                                <>
                                                                                    <div className="drop-container mb-2 mb-md-3">
                                                                                        <div className="drop-title">
                                                                                            <span className="selection-label">
                                                                                                {items?.title}
                                                                                            </span>


                                                                                            <div className="select-style">
                                                                                                <div className="select_wrap">
                                                                                                    <select
                                                                                                        className="txt-gry-12 select_box selectized"
                                                                                                        x-data-name={items?.title}
                                                                                                        x-data-optional="false"
                                                                                                        value={
                                                                                                            customeSize.items?.title
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
                                                                                                            <option value={element}>
                                                                                                                {element}"
                                                                                                            </option>
                                                                                                        ))}

                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            );
                                                                        })}
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        // console.log(selectSize)

                                                        selectSize == 'standard' ? (<>
                                                            {
                                                                addSizePrice != 0 ? (<>

                                                                    <h6>Add Size Price : <span style={{ color: "green", fontWeight: "600" }}> {addSizePrice}</span></h6>
                                                                </>) : (<></>)
                                                            }
                                                        </>) : (<></>)
                                                    }
                                                    
                                                </div>
                                                <hr />

                                                {localStorage.getItem("emboidary") ? (
                                                    filteredData.length > 0 ? (
                                                        filteredData?.map((item) => {
                                                            return item?.pro_id == popupData?.data?.id ? (
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

                                                                                {
                                                                                    countryData === 'INR' ? (<>

                                                                                        <div>Type :- {item?.type}</div>
                                                                                        <div>First name :- {item?.myname}</div>
                                                                                        <div>
                                                                                            secondLine :- {item?.secondLine}
                                                                                        </div>
                                                                                        <div>
                                                                                            Placemnet :- {item?.namePlacemnet}``
                                                                                        </div>
                                                                                        <div>Price :- ₹ {item?.price}</div>


                                                                                    </>) : (<>

                                                                                        <div>Type :- {item?.type}</div>
                                                                                        <div>First name :- {item?.myname}</div>
                                                                                        <div>
                                                                                            secondLine :- {item?.secondLine}
                                                                                        </div>
                                                                                        <div>
                                                                                            Placemnet :- {item?.namePlacemnet}
                                                                                        </div>
                                                                                        <div>Price :- $ {item?.price}</div>



                                                                                    </>)
                                                                                }

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
                                                ) : null}

                                                <div className="product__variant--list mb-15">

                                                    <button
                                                        className="variant__buy--now__btn primary__btn"
                                                        onClick={addtocart}
                                                    >
                                                        Buy it now
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="quickview__social d-flex align-items-center mb-15">
                                                <label className="quickview__social--title">Social Share:</label>
                                                <ul className="quickview__social--wrapper mt-0 d-flex">
                                                    <li className="quickview__social--list">
                                                        <a
                                                            className="quickview__social--icon"
                                                            target="_blank"
                                                            href="https://www.facebook.com"
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
                                                    <li className="quickview__social--list">
                                                        <a
                                                            className="quickview__social--icon"
                                                            target="_blank"
                                                            href="https://twitter.com"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16.489"
                                                                height="13.384"
                                                                viewBox="0 0 16.489 13.384"
                                                            >
                                                                <path
                                                                    data-name="Path 303"
                                                                    d="M966.025,1144.2v.433a9.783,9.783,0,0,1-.621,3.388,10.1,10.1,0,0,1-1.845,3.087,9.153,9.153,0,0,1-3.012,2.259,9.825,9.825,0,0,1-4.122.866,9.632,9.632,0,0,1-2.748-.4,9.346,9.346,0,0,1-2.447-1.11q.4.038.809.038a6.723,6.723,0,0,0,2.24-.376,7.022,7.022,0,0,0,1.958-1.054,3.379,3.379,0,0,1-1.958-.687,3.259,3.259,0,0,1-1.186-1.666,3.364,3.364,0,0,0,.621.056,3.488,3.488,0,0,0,.885-.113,3.267,3.267,0,0,1-1.374-.631,3.356,3.356,0,0,1-.969-1.186,3.524,3.524,0,0,1-.367-1.5v-.057a3.172,3.172,0,0,0,1.544.433,3.407,3.407,0,0,1-1.1-1.214,3.308,3.308,0,0,1-.4-1.609,3.362,3.362,0,0,1,.452-1.694,9.652,9.652,0,0,0,6.964,3.538,3.911,3.911,0,0,1-.075-.772,3.293,3.293,0,0,1,.452-1.694,3.409,3.409,0,0,1,1.233-1.233,3.257,3.257,0,0,1,1.685-.461,3.351,3.351,0,0,1,2.466,1.073,6.572,6.572,0,0,0,2.146-.828,3.272,3.272,0,0,1-.574,1.083,3.477,3.477,0,0,1-.913.8,6.869,6.869,0,0,0,1.958-.546A7.074,7.074,0,0,1,966.025,1144.2Z"
                                                                    transform="translate(-951.23 -1140.849)"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                            <span className="visually-hidden">Twitter</span>
                                                        </a>
                                                    </li>
                                                    <li className="quickview__social--list">
                                                        <a
                                                            className="quickview__social--icon"
                                                            target="_blank"
                                                            href="https://www.instagram.com"
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
                                                    <li className="quickview__social--list">
                                                        <a
                                                            className="quickview__social--icon"
                                                            target="_blank"
                                                            href="https://www.youtube.com"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16.49"
                                                                height="11.582"
                                                                viewBox="0 0 16.49 11.582"
                                                            >
                                                                <path
                                                                    data-name="Path 321"
                                                                    d="M967.759,1365.592q0,1.377-.019,1.717-.076,1.114-.151,1.622a3.981,3.981,0,0,1-.245.925,1.847,1.847,0,0,1-.453.717,2.171,2.171,0,0,1-1.151.6q-3.585.265-7.641.189-2.377-.038-3.387-.085a11.337,11.337,0,0,1-1.5-.142,2.206,2.206,0,0,1-1.113-.585,2.562,2.562,0,0,1-.528-1.037,3.523,3.523,0,0,1-.141-.585c-.032-.2-.06-.5-.085-.906a38.894,38.894,0,0,1,0-4.867l.113-.925a4.382,4.382,0,0,1,.208-.906,2.069,2.069,0,0,1,.491-.755,2.409,2.409,0,0,1,1.113-.566,19.2,19.2,0,0,1,2.292-.151q1.82-.056,3.953-.056t3.952.066q1.821.067,2.311.142a2.3,2.3,0,0,1,.726.283,1.865,1.865,0,0,1,.557.49,3.425,3.425,0,0,1,.434,1.019,5.72,5.72,0,0,1,.189,1.075q0,.095.057,1C967.752,1364.1,967.759,1364.677,967.759,1365.592Zm-7.6.925q1.49-.754,2.113-1.094l-4.434-2.339v4.66Q958.609,1367.311,960.156,1366.517Z"
                                                                    transform="translate(-951.269 -1359.8)"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                            <span className="visually-hidden">Youtube</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>



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
                        // data={productDetails}
                        hide={setaddEmboidery}
                    />
                </Suspense>
            ) : null}












        </>
    )
}

export default CustomOrderProductModal