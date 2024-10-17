import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { Link, useParams } from "react-router-dom";
import imageURl from "../Api/ImageUrl";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BassURl from "../Api/Api";

function CategoryByMen() {

  // Track Active Tab
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  // get params Id
  const { men_cat_url } = useParams();
  const countryData = JSON.parse(localStorage.getItem("currencyTop"));

  const [shopByRecent, setShopByRecent] = useState([]);

  const [sortBy, setSortBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState(null);
  useEffect(() => {

    axios.get(`${BassURl}/product-by-sub-category/men/${men_cat_url}`)
      .then((res) => {
        if (res.data.code === 200) {
          setShopByRecent(res.data.data);
          setApiStatus('success');
        } else {
          setApiStatus('error');
        }
      })
      .catch(() => {
        setApiStatus('error');
      });


  }, []);
  console.log(shopByRecent)

  useEffect(() => {
    filterProducts();
  }, [shopByRecent, sortBy, searchTerm, minPrice, maxPrice]);

  const filterProducts = () => {
    const sortedProducts = sortProducts(shopByRecent, sortBy);

    const filtered = sortedProducts.filter(
      (product) =>
        product.product_title_eng
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "all":
        // No sorting applied, display products in their original order
        break;
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.product_price_rupee - b.product_price_rupee);
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.product_price_rupee - a.product_price_rupee);
        break;
      case "aToZ":
        sortedProducts.sort((a, b) =>
          a.product_title_eng.localeCompare(b.product_title_eng)
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  };








  // const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(fetchProductBySubCategroy(cat_url));

  // }, [dispatch]);

  // const subCategory = useSelector((state) => state.subCategoryId);
  // const { SubCatData, isLoading, error } = subCategory;
  console.log(filteredProducts);





  return (
    <>

      <Navbar />
      <section className="breadcrumb__section breadcrumb__bg">
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <div className="breadcrumb__content text-center">
                <h1 className="breadcrumb__content--title text-white mb-25">
                  Category
                </h1>
                <ul className="breadcrumb__content--menu d-flex justify-content-center">

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop__section section--padding">
        <div className="container-fluid">
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
            <div className="product__view--mode d-flex align-items-center">
              <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                {/* <label className="product__view--label">Prev Page :</label> */}
              </div>
              <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                <label className="product__view--label">Sort By :</label>
                <div className="select shop__header--select">
                  <select
                    className="product__view--select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="priceLowToHigh">
                      Sort by Low to High Price
                    </option>
                    <option value="aToZ">Sort by High to Low Price</option>
                    <option value="aToZ">Sort by Name (A to Z)</option>
                  </select>
                </div>
              </div>

              <div className="product__view--mode__list product__view--search d-none d-lg-block">
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
                  <button
                    className="product__view--search__btn"
                    aria-label="shop button"
                    type="submit"
                  >
                    <svg
                      className="product__view--search__btn--svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22.51"
                      height="20.443"
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
                  </button>
                </form>
              </div>
            </div>
            {/* <p className="product__showing--count">Showing 1–9 of 21 results</p> */}
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                <div className="single__widget widget__bg">
                  <h2 className="widget__title h3">Two-spirit</h2>
                  <ul className="widget__form--check">
                    <li className="widget__form--check__list">
                      <label
                        className="widget__form--check__label"
                        htmlFor="check1"
                      >
                        Men
                      </label>
                      <input
                        className="widget__form--check__input"
                        id="check1"
                        name="check"
                        type="checkbox"
                      />
                      <span className="widget__form--checkmark" />
                    </li>
                    <li className="widget__form--check__list">
                      <label
                        className="widget__form--check__label"
                        htmlFor="check2"
                      >
                        Womwen
                      </label>
                      <input
                        className="widget__form--check__input"
                        id="check2"
                        name="check"
                        type="checkbox"
                      />
                      <span className="widget__form--checkmark" />
                    </li>
                  </ul>
                </div>
                <div className="single__widget price__filter widget__bg">
                  <h2 className="widget__title h3">Filter By Price</h2>
                  <label>
                    <input
                      className="w-100 range-input "
                      type="range"
                      min="0"
                      max="1000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    />
                  </label>
                  <form className="price__filter--form" action="#">
                    <div className="price__filter--form__inner mb-15 d-flex align-items-center">
                      <div className="price__filter--group">
                        <label
                          className="price__filter--label"
                          htmlFor="Filter-Price-GTE2"
                        >
                          From
                        </label>
                        <div className="price__filter--input border-radius-5 d-flex align-items-center">
                          <span className="price__filter--currency">₹</span>
                          <label>
                            <input
                              disabled
                              className="price__filter--input__field border-0"
                              name="filter.v.price.lte"
                              type="number"
                              min={0}
                              // placeholder={250.0}
                              value={minPrice}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="price__divider">
                        <span>-</span>
                      </div>
                      <div className="price__filter--group">
                        <label
                          className="price__filter--label"
                          htmlFor="Filter-Price-LTE2"
                        >
                          To
                        </label>
                        <div className="price__filter--input border-radius-5 d-flex align-items-center">
                          <span className="price__filter--currency">₹</span>
                          <label>
                            <input
                              disabled
                              className="price__filter--input__field border-0"
                              name="filter.v.price.lte"
                              type="number"
                              min={0}
                              // placeholder={250.0}
                              value={maxPrice}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className="price__filter--btn primary__btn"
                      type="submit"
                    >
                      Filter
                    </button>
                  </form>
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
                                  <div className="product__items ">
                                    <div className="product__items--thumbnail">
                                      <Link
                                        className="product__items--link"
                                        to={`/product-details/${data?.product_url}`}
                                      >
                                        <img
                                          className="product__items--img product__primary--img"
                                          src={`${imageURl}/${data?.image}`}
                                          alt="product-img"
                                        />
                                        <img
                                          className="product__items--img product__secondary--img"
                                          src={`${imageURl}/${data?.image}`}
                                          alt="product-img"
                                        />
                                      </Link>
                                      <div className="product__badge">
                                        <span className="product__badge--items sale">
                                          Sale
                                        </span>
                                      </div>
                                    </div>
                                    <div className="product__items--content text-center">
                                      <span
                                        className="product__items--content__subtitle"
                                        style={{ fontWeight: 900 }}
                                      >
                                        {data?.category_title_eng}
                                      </span>{" "}
                                      /{" "}
                                      <span className="product__items--content__subtitle">
                                        {data?.sub_category_title}
                                      </span>
                                      <h3 className="product__items--content__title h4">
                                        <Link to={`/product-details/${data?.product_url}`}>
                                          {data?.product_title_eng} -{" "}
                                          {data?.color_name}
                                        </Link>
                                      </h3>
                                      <div className="product__items--price">
                                        {countryData && countryData === "INR" ? (
                                          <>
                                            <span className="current__price">
                                              ₹ {data?.product_price_rupee}
                                            </span>
                                          </>
                                        ) : countryData === "USD" ? (
                                          <>
                                            <span className="current__price">
                                              $ {data?.product_price_dollar}
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span className="current__price">
                                              $ {data?.product_price_dollar}
                                            </span>
                                          </>
                                        )}

                                        {/* <span className="price__divided" /> */}
                                        {/* <span className="old__price">$78</span> */}
                                      </div>
                                      <ul className="product__items--action d-flex">
                                        <li className="product__items--action__list">
                                          <Link
                                            to={`/product-details/${data?.product_url}`}
                                            className="product__items--action__btn add__to--cart"
                                            href="cart.html"
                                          >
                                            <svg
                                              className="product__items--action__btn--svg"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="25.51"
                                              height="23.443"
                                              viewBox="0 0 512 512"
                                            >
                                              <path
                                                d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={32}
                                              />
                                              <circle
                                                cx={256}
                                                cy={256}
                                                r={80}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeMiterlimit={10}
                                                strokeWidth={32}
                                              />
                                            </svg>

                                            <span
                                              className="add__to--cart__text"
                                              style={{ padding: "5px" }}
                                            >
                                              {" "}
                                              Quick Shop
                                            </span>
                                          </Link>
                                        </li>
                                      </ul>
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
                                    <h2>No Data Found</h2>
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
                                <h2>No  Found</h2>
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

export default CategoryByMen