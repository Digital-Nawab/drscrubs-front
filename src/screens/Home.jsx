import React, { Suspense, useEffect, useRef, lazy, useState } from "react";
const BannerSlider = lazy(() => import("../components/BannerSlider"));
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { fetchProducts } from "../Redux/Action/getItemAction";
import BassURl from "../Api/Api";
import axios from "axios";
import imageURl from "../Api/ImageUrl";

import { addToCartAction } from "../Redux/Action/CartAction";
import HomeProduct from "../components/HomeProduct";
import CustomStyle from "../components/CustomStyle";
import { Link } from "react-router-dom";

import { fetchslider } from "../Redux/Action/getSliderAction";
import { fetchAllProducts } from "../Redux/Action/getAllProductAction";
import CategorySlider from "./CategorSlider";
import WomenProductSlider from "../components/WomenProductSlider";
import MenProductSlider from "../components/MenProductSlider";
import CapsProductSlider from "../components/CapsProductSlider";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {


  const dispatch = useDispatch();

  // Fetch data using Redux Thunk action
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Access data from Redux store
  const tags = useSelector((state) => state.products);
  const countryData = localStorage.getItem("currency");

  // Fetch data using React Query

  const { data, isLoading, isError } = useQuery("products", () => {
    return axios.get(`${BassURl}/all-tags`);
  });
  // Access fetched data

  // Access data from Redux store

  // const Skeleton = () => {
  //   return <div className="skeleton">{/* Skeleton content */}</div>;
  // };

  // api Call slider

  useEffect(() => {
    dispatch(fetchslider());
  }, [dispatch]);

  // Access data from Redux store
  const SliderData = useSelector((state) => state.sliders);
  const { slider, isSliderLoading, error } = SliderData;




  // fetch All Product

  // Fetch data using Redux Thunk action
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Access data from Redux store
  const allProducts = useSelector((state) => state.allproducts);
  const { allproducts, isProductLoading, } = allProducts;

  // console.log(allproducts);


  const [colorCode, setcolorCode] = useState('');
  useEffect(() => {

    axios.get(`${BassURl}/product-color/1`).then((res) => {
      return (setcolorCode(res.data.data))
    });

  }, [])
  // console.log(colorCode)

  // offer api 
  const [offer, setoffer] = useState('');
  useEffect(() => {

    axios.get(`${BassURl}/all-offers`).then((res) => {
      setoffer(res.data?.data)
    });
  }, []);
  //console.log(offer?.offer?.offer_pics)


  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const Capsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
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

  const [hospital, setHospital] = useState();
  useEffect(() => {
    axios.get(`${BassURl}/all-hospital`).then((res) => {
      setHospital(res.data?.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="main__content_wrapper">
        {isSliderLoading ? (
          <div className="skeleton-loader">
            <Skeleton height={300} />
            <Skeleton count={3} height={20} style={{ marginTop: '10px' }} />
          </div>
        ) : (
          <Suspense fallback={<Skeleton height={300} />}>
            <BannerSlider
              slider={slider.data}
              spaceBetween={30}
              slidesPerView={1}
            />
          </Suspense>
        )}


        <CategorySlider />


        <WomenProductSlider />

        <MenProductSlider />

        <CapsProductSlider />

        {/* End product section */}



        {/* Start banner section */}
        <section className="banner__section banner__discount section--padding color-scheme-2 bg-dark pt-10">
          <div className="container">
            {isLoading ? (
              <div className="banner__discount--inner position__relative">
                <div className="row row-cols-sm-2 row-cols-1">
                  <div className="col">
                    <div className="banner__items banner__discount--items position__relative">
                      <Skeleton height={436} width={548} />
                    </div>
                  </div>
                  <div className="col">
                    <div className="banner__items banner__discount--items position__relative">
                      <Skeleton height={436} width={548} />
                    </div>
                  </div>
                </div>
                <div className="banner__discount--content text-center">
                  <Skeleton count={1} height={20} style={{ marginBottom: '10px' }} />
                  <Skeleton count={1} height={30} width={200} />
                </div>
              </div>
            ) : (
              offer && offer.offer ? (
                <div className="banner__discount--inner position__relative">
                  <div className="row row-cols-sm-2 row-cols-1">
                    <div className="col">
                      <div className="banner__items banner__discount--items position__relative">
                        <a className="banner__items--thumbnail" href="">
                          <img
                            className="banner__items--thumbnail__img"
                            src={`${imageURl}${offer.offer.offer_pic}`}
                            width={548} height={436}
                            alt="banner-img" loading="lazy"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col">
                      <div className="banner__items banner__discount--items position__relative">
                        <a className="banner__items--thumbnail" href="">
                          <img
                            className="banner__items--thumbnail__img"
                            src={`${imageURl}${offer.offer.offer_pics}`}
                            width={548} height={436}
                            alt="banner-img" loading="lazy"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="banner__discount--content text-center">
                    <span className="banner__discount--content__subtitle">
                      {offer.offer.offer_eng}
                    </span>
                    <h2 className="banner__discount--content__title h3">
                      {offer.offer.discount} <br />
                    </h2>
                  </div>
                </div>
              ) : (
                <p>Data not found</p>
              )
            )}
          </div>
        </section>

        {/* End banner section */}


        <section className="banner__section banner__style2 section--padding color-scheme-2 pt-5 pb-5">
          <div className="section__heading text-center mb-35">
            <h2 className="section__heading--maintitle style2">Shop by Tags</h2>
          </div>
          <div className="container">
            <div className="row mb--n28">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div className="col-lg-4" key={index}>
                    <Skeleton height={206} />
                  </div>
                ))
              ) : (
                data?.data?.data?.map((item, index) => (
                  <div className="col-lg-4 shopByCategories" key={index}>
                    <div className={`banner__items position__relative ${hoveredItem === index ? 'zoom-in' : ''}`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}>
                      <a href={`/shop/${item?.tag_url}`} className="banner__items--thumbnail">
                        <img
                          className="banner__items--thumbnail__img banner__img--max__height"
                          src={`${imageURl}/${item?.tag_image}`}
                          width={360} height={206}
                          alt="banner-img" loading="lazy"
                        />
                        <div className="banner__items--content style2">
                          <h3 className="banner__items--content__title style2">{item?.tag_eng}</h3>
                          <span className="banner__items--content__link style2 btn btn-primary text-white">SHOP NOW</span>
                        </div>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="banner__section banner__style2 section--padding color-scheme-2 pt-5 pb-5">
          <div className="section__heading text-center mb-35">
            <h2 className="section__heading--maintitle style2">Hospitals</h2>
          </div>
          <div className="container">
            <div className="row mb--n28">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div className="col-lg-4" key={index}>
                      <Skeleton height={120} width={120} />
                    </div>
                  ))}
                </>
              ) : (
                <Slider {...Capsettings}>
                  {hospital?.map((item, index) => (
                    <div key={index}>
                      <img
                        loading="lazy"
                        src={`${imageURl}/${item.partner_logo}`}
                        width={120}
                        height={120}
                        alt={item.partner_name} // Consider adding an alt text for accessibility
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
