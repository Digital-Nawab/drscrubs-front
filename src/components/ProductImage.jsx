import React, { useState } from 'react'
import imageURl from '../Api/ImageUrl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";

function ProductImage({ images }) {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} />
    );
    const settings = {
        dots: false,
        infinite: false,
        loop: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 3,
        initialSlide: 0,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        slidesToScroll: 1,
    };
    const [mainImage, setmainImage] = useState(images[0]);
    //console.log(images)
    
    return (
        <>
            <div className="container">
                <div className="row ">
                    <div className="col-lg-12">
                        <img src={`${imageURl}/${mainImage?.image_url}`} alt="" srcset="" />
                    </div>

                    {/* <div className="col">
                        <div className="product__details--media">
                        <img src={`${imageURl}/${mainImage?.image_url}`} alt="" srcset="" />

                           
                        </div>
                    </div> */}

                    <div className="col-lg-12 mt-5">
                        <Slider {...settings}>

                            {images?.map((data, index) => {
                                return (<>
                                    <div className="product__media--nav__items" style={{ width: '80px !important' }} onClick={() => setmainImage(data)}>
                                        <img style={{ margin: "0 auto" }} className="product__media--nav__items--img" src={`${imageURl}/${data?.image_url}`} alt="" srcset="" key={index} />
                                    </div>
                                </>)
                            })}



                        </Slider>
                    </div>

                </div>
            </div>





        </>
    )
}

export default ProductImage