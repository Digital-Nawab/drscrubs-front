import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BassURl from "../Api/Api";
import imageURl from "../Api/ImageUrl";

function CategorySlider() {
    const [cateSlider, setCateSlider] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BassURl}/all-categories-and-sub-category`);
                setCateSlider(response.data.data.category || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleMouseEnter = (key) => setHoveredItem(key);
    const handleMouseLeave = () => setHoveredItem(null);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <section className="banner__section banner__style2 section--padding color-scheme-2 pt-10">
            <div className="section__heading text-center mb-35">
                <h2 className="section__heading--maintitle style2">
                    Shop by Categories
                </h2>
            </div>
            <div className="container">
                <div className="row mb--n28 justify-content-center">
                    <div className="col-md-8">
                        {isLoading ? (
                            <Slider {...sliderSettings}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index}>
                                        <div className="banner__items position__relative">
                                            <Skeleton height={230} />
                                            <div className="banner__items--content style2">
                                                <Skeleton count={1} height={20} style={{ marginBottom: '10px' }} />
                                                <Skeleton count={1} height={30} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : cateSlider.length > 0 ? (
                            <Slider {...sliderSettings}>
                                {cateSlider.map((item, key) => (
                                    <div key={key}>
                                        <div
                                            className={`banner__items position__relative ${hoveredItem === key ? 'zoom-in' : ''}`}
                                            onMouseEnter={() => handleMouseEnter(key)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Link to={`/shop-by-category/${item.category_url}`} className="banner__items--thumbnail">
                                                <img
                                                    className="banner__items--thumbnail__img banner__img--max__height"
                                                    src={`${imageURl}/${item.category_image}`}
                                                    srcSet={`${imageURl}/${item.category_image}`}
                                                    width={403}
                                                    height={230}
                                                    alt={item.category_title_eng}
                                                    loading="lazy"
                                                />
                                                <div className="banner__items--content style2">
                                                    <h3 className="banner__items--content__title style2">
                                                        {item.category_title_eng}
                                                    </h3>
                                                    <span className="banner__items--content__link style2 btn btn-primary text-white">
                                                        SHOP NOW
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No categories found</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategorySlider;
