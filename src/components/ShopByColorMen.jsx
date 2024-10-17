import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar";
import { Link, useParams ,useLocation } from "react-router-dom";
import imageURl from "../Api/ImageUrl";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BassURl from "../Api/Api";

function ShopByColorMen() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gender = queryParams.get('gender');
    // Track Active Tab
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };
    // get params Id
    const { color_url } = useParams();
    const countryData = JSON.parse(localStorage.getItem("currencyTop"));
    const [ShopByProductColor, setShopByProductColor] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [apiStatus, setApiStatus] = useState(null);
    const [Category, setCategory] = useState([]);
  
    useEffect(() => {
      axios.get(`${BassURl}/all-categories-and-sub-category`).then((res) => {
        setCategory(res.data.data.category);
       });
    }, []);
  
    
    
    const [color, setColor] = useState();
    let urlTemp = `${BassURl}/product-color/${color_url}/${gender}`;

    useEffect(() => {

        axios.get(`${urlTemp}`)
            .then((res) => {
                if (res.data.code === 200) {
                    setShopByProductColor(res.data.data);
                    setColor(res.data.color);
                    setApiStatus('success');
                } else {
                    setApiStatus('error');
                }
            })
            .catch(() => {
                setApiStatus('error');
            });


    }, []);
    
   const [selectedCategories, setSelectedCategories] = useState([]);

   const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      setSelectedCategories(selectedCategories.filter(category => category !== categoryName));
    }
  };

  const filteredProducts = ShopByProductColor.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category_title_eng);
      const productNameMatch = searchTerm === '' || 
        product.product_title_eng.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_title_eng.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && productNameMatch;
    });

    const ColorStyle = {    
      backgroundImage : `url("/assets/img/about-us-final.jpeg")`,
      backgroundColor : '#00000082',
      backgroundBlendMode : 'overlay'
  
    }
  return (
        <>


            <Navbar />
            <section className="breadcrumb__section breadcrumb__bg" style={ColorStyle}>
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="breadcrumb__content text-center">
                                <h1 className="breadcrumb__content--title text-white mb-25">
                                {color?.color_name}
                                </h1>
                                <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                    <li className="breadcrumb__content--menu__items">
                                        <a className="text-white" href="/">
                                            Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb__content--menu__items">
                                        <span className="text-white">Color</span>
                                    </li>
                                    <li className="breadcrumb__content--menu__items">
                                        <span className="text-white">{color?.color_name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop__section section--padding">
                <div className="container">
                    <div className="shop__header bg__gray--color d-flex align-items-center justify-content-between mb-30">
                        <button
                            className="widget__filter--btn d-flex d-lg-none align-items-center"
                            data-offcanvas=""
                        >
                            <svg
                                className="widget__filter--btn__icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={28}
                                    d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"
                                />
                                <circle
                                    cx={336}
                                    cy={128}
                                    r={28}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={28}
                                />
                                <circle
                                    cx={176}
                                    cy={256}
                                    r={28}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={28}
                                />
                                <circle
                                    cx={336}
                                    cy={384}
                                    r={28}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={28}
                                />
                            </svg>
                            <span className="widget__filter--btn__text">Filter</span>
                        </button>
                      </div>
                    <div className="row">
                       <div className="col-xl-3 col-lg-4">
                        <div className="product__view--mode__list product__view--search d-none d-lg-block m-0">
                            <form className="product__view--search__form" action="#">
                              <label>
                                <input
                                  className="product__view--search__input border-0"
                                  placeholder="Search by"
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  style={{ border: " 2px solid #000 !important" }}
                                />
                              </label>
                              
                            </form>
                          </div>
                          <div className="shop__sidebar--widget widget__area d-none d-lg-block filterby-tags">
                            <div className="single__widget widget__bg">
                              <ul className="widget__form--check">
                                {Category && Category.map((item, key) => (
                                    <li key={key} className="mb-3">
                                      <label>
                                        <input
                                          type="checkbox"
                                          value={item.category_title_eng}
                                          onChange={handleCategoryChange}
                                          checked={selectedCategories.includes(item.category_title_eng)}
                                        />
                                        &nbsp; {item.category_title_eng}
                                      </label>
                                    </li>
                                  ))}
                              
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className="shop__product--wrapper">
                                <div className="tab_content">
                                    <div id="product_grid" className="tab_pane active show">
                                        <div className="product__section--inner product__grid--inner">
                                            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">

                                                {apiStatus === 'success' ? (
                                                    filteredProducts.length > 0 ? (
                                                        <>
                                                            {filteredProducts.map((data) => (
                                                               <div className="col mb-30">
                                                               <div className="product__items new-product" >
                                                                 <div className="product__items--thumbnail">
                                                                   <a
                                                                     className="product__items--link"
                                                                     href={`/product-details/${data?.product_url}?color=${data?.color_url}`}
                                                                   >
                                                                     <img
                                                                       className="product__items--img product__primary--img"
                                                                       src={`${imageURl}/${data?.image}`}
                                                                       alt="product-img"
                                                                     />
                                                                     
                                                                   </a>
                                                                   <Link
                                                                     className="product__add-to__cart--btn__style2"
                                                                     to={`/product-details/${data?.product_url}?color=${data?.color_url}`}>
                                                                       <span className="product__items--content__subtitle" style={{ fontWeight: 900 }}>
                                                                     {data?.category_title_eng}
                                                                   </span> / <span className="product__items--content__subtitle">
                                                                     {data?.sub_category_title}
                                                                   </span> <br />
                                                                     <span className="add__to--cart__text">{data?.product_title_eng} - {data?.color_name}</span>
                                                                   </Link>
                                                                 </div>
                                                               </div>
                                                             </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-lg-12 col-md-12 text-center mt-5">
                                                                        <img
                                                                            src="/assets/img/dataImage/nodata.webp"
                                                                            alt=""
                                                                            srcset=""
                                                                        />
                                                                        {/* <h2>No Data Found</h2> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                ) : apiStatus === 'error' ? (
                                                    // Error occurred while fetching data
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-lg-12 col-md-12 text-center mt-5">
                                                                <img
                                                                    src="/assets/img/dataImage/nodata.webp"
                                                                    alt=""
                                                                    srcset=""
                                                                />
                                                                {/* <h2>No  Found</h2> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Loading state or initial render
                                                    <h6 className="text-center">Loading.....</h6>
                                                  )}
                                                { }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ShopByColorMen