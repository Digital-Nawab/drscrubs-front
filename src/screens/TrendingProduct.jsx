import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BassURl from '../Api/Api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import imageURl from '../Api/ImageUrl';
import { Link } from 'react-router-dom';

function TrendingProduct() {

    const [trendingProduct, setTrendingProduct] = useState('');
    useEffect(() => {

        axios.get(`${BassURl}/product-by-tag/top-selling`).then((res) => {
            setTrendingProduct(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);




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
                                    <li className="breadcrumb__content--menu__items">
                                        <a className="text-white" href="index.html">
                                            Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb__content--menu__items">
                                        <span className="text-white"></span>
                                    </li>
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
                                    <select className="product__view--select">
                                        <option selected="" value={1}>
                                            Sort by latest
                                        </option>
                                        <option value={2}>Sort by popularity</option>
                                        <option value={3}>Sort by newness</option>
                                        <option value={4}>Sort by rating </option>
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
                                                    <span className="price__filter--currency">$</span>
                                                    <label>
                                                        <input
                                                            className="price__filter--input__field border-0"
                                                            name="filter.v.price.gte"
                                                            type="number"
                                                            placeholder={0}
                                                            min={0}
                                                            max={250.0}
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
                                                    <span className="price__filter--currency">$</span>
                                                    <label>
                                                        <input
                                                            className="price__filter--input__field border-0"
                                                            name="filter.v.price.lte"
                                                            type="number"
                                                            min={0}
                                                            placeholder={250.0}
                                                            max={250.0}
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

                                <div className="single__widget widget__bg">
                                    <h2 className="widget__title h3">Brands</h2>
                                    <ul className="widget__tagcloud">
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Jacket
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Women
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Oversize
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Cotton{" "}
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Shoulder{" "}
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Winter
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Accessories
                                            </a>
                                        </li>
                                        <li className="widget__tagcloud--list">
                                            <a className="widget__tagcloud--link" href="/">
                                                Dress{" "}
                                            </a>
                                        </li>
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
                                                {
                                                    trendingProduct?.code === 200 ? (

                                                        trendingProduct.data?.map((data) => {
                                                            return (
                                                                <>
                                                                    <div className="col mb-30">
                                                                        <div className="product__items ">
                                                                            <div className="product__items--thumbnail">
                                                                                <a
                                                                                    className="product__items--link"
                                                                                    href="product-details.html"
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
                                                                                </a>
                                                                                <div className="product__badge">
                                                                                    <span className="product__badge--items sale">
                                                                                        Sale
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="product__items--content text-center">

                                                                                <span className="product__items--content__subtitle" style={{ fontWeight: 900 }}>
                                                                                    {data?.category_title_eng}
                                                                                </span> / <span className="product__items--content__subtitle">
                                                                                    {data?.sub_category_title}
                                                                                </span>
                                                                                <h3 className="product__items--content__title h4">
                                                                                    <a href="/product-details">{data?.product_title_eng} - {data?.color_name}</a>
                                                                                </h3>

                                                                                <div className="product__items--price">
                                                                                    <span className="current__price">
                                                                                        {data?.rupee}
                                                                                    </span>
                                                                                    {/* <span className="price__divided" /> */}
                                                                                    {/* <span className="old__price">$78</span> */}
                                                                                </div>

                                                                                <ul className="product__items--action d-flex">
                                                                                    <li className="product__items--action__list">
                                                                                        <a
                                                                                            className="product__items--action__btn add__to--cart"

                                                                                        >
                                                                                            <svg
                                                                                                className="product__items--action__btn--svg"
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="22.51"
                                                                                                height="20.443"
                                                                                                viewBox="0 0 14.706 13.534"
                                                                                            >
                                                                                                <g transform="translate(0 0)">
                                                                                                    <g>
                                                                                                        <path
                                                                                                            data-name="Path 16787"
                                                                                                            d="M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z"
                                                                                                            transform="translate(0 -463.248)"
                                                                                                            fill="currentColor"
                                                                                                        />
                                                                                                        <path
                                                                                                            data-name="Path 16788"
                                                                                                            d="M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z"
                                                                                                            transform="translate(-1.191 -466.622)"
                                                                                                            fill="currentColor"
                                                                                                        />
                                                                                                        <path
                                                                                                            data-name="Path 16789"
                                                                                                            d="M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z"
                                                                                                            transform="translate(-2.875 -466.622)"
                                                                                                            fill="currentColor"
                                                                                                        />
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                            <span className="add__to--cart__text">
                                                                                                {" "}
                                                                                                + Add to cart
                                                                                            </span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="product__items--action__list">

                                                                                    </li>
                                                                                    <li className="product__items--action__list">
                                                                                        <Link
                                                                                            className="product__items--action__btn"
                                                                                            data-open="modal1"
                                                                                            to={`/product-details/${data?.product_url}`}
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
                                                                                            <span className="visually-hidden">
                                                                                                Quick View
                                                                                            </span>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );

                                                        })
                                                    ) : (
                                                        <>
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-lg-12 col-md-12 text-center mt-5">
                                                                        <img src="/assets/img/dataImage/nodata.webp" alt="" srcset="" />
                                                                        <h2>No Data Found</h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>

                                                    )
                                                }

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

export default TrendingProduct