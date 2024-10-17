import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Collection() {

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
                                    <select
                                        className="product__view--select"
                                       
                                    >
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
                                            // value={searchTerm}
                                            // onChange={(e) => setSearchTerm(e.target.value)}
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
                                            // value={minPrice}
                                            // onChange={(e) => setMinPrice(parseInt(e.target.value))}
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
                                                            // value={minPrice}
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
                                                            // value={maxPrice}
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

export default Collection