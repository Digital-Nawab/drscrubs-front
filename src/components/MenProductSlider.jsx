import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../Redux/Action/getAllProductAction";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import imageURl from "../Api/ImageUrl";

const MenProductSlider = () => {
    const dispatch = useDispatch();
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const allProducts = useSelector((state) => state.allproducts);
    const { allproducts, isProductLoading } = allProducts;

    useEffect(() => {
        dispatch(fetchAllProducts('male'));
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const maleProducts = allproducts.filter(product => 
        product.product_for === 'male' && 
        !(product.sub_category_title === 'Printed Cap' || product.sub_category_title === 'Plain Cap')
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: viewportWidth >= 768 ? 5 : 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                }
            }
        ]
    };

    return (
        <section className="product__section color-scheme-2 pt-5 bg-gray">
            <div className="container">
                <div className="section__heading text-center mb-35">
                    <h2 className="section__heading--maintitle style2">Men</h2>
                </div>
                <div className="product__section--inner">
                    {isProductLoading ? (
                        <Slider {...settings}>
                            {[...Array(viewportWidth >= 768 ? 5 : 2)].map((_, index) => (
                                <div className="col mb-30" key={index}>
                                    <Skeleton height={400} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        maleProducts.length > 0 && (
                            <Slider {...settings}>
                                {maleProducts.map((item, index) => (
                                    <div className="col mb-30" key={index}>
                                        <div className="product__items new-product">
                                            <div className="product__items--thumbnail">
                                                <Link className="product__items--link" to={`/product-details/${item.product_url}?color=${item.color_url}`}>
                                                    <img
                                                        className="product__items--img product__primary--img"
                                                        src={`${imageURl}/${item.image}`} 
                                                        width={200} 
                                                        height={400}
                                                        alt="product-img" 
                                                        loading="lazy"
                                                    />
                                                </Link>
                                                <Link
                                                    className="product__add-to__cart--btn__style2"
                                                    to={`/product-details/${item.product_url}?color=${item.color_url}`}>
                                                    <span className="product__items--content__subtitle" style={{ fontWeight: 900 }}>
                                                        {item.category_title_eng}
                                                    </span> / 
                                                    <span className="product__items--content__subtitle">
                                                        {item.sub_category_title}
                                                    </span> <br />
                                                    <span className="add__to--cart__text">{item.product_title_eng} - {item.color_name}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default MenProductSlider;
