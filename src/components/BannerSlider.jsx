import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imageURl from "../Api/ImageUrl";

// Define arrow components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#40436c', borderRadius: '50%' }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#40436c', borderRadius: '50%' }}
      onClick={onClick}
    >
      Prev
    </div>
  );
};

// Main BannerSlider component
function BannerSlider({ slider }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {slider?.map((slide, index) => (
        <div key={index}>
          <img
            src={`${imageURl}/${slide.slider_image}?w=1920`}
            srcSet={`${imageURl}/${slide.slider_image}?w=500 500w, ${imageURl}/${slide.slider_image}?w=1000 1000w, ${imageURl}/${slide.slider_image}?w=1920 1920w`}
            sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 1920px"
            width={1920}
            height={700}
            alt={`Slide ${index + 1}`}
            loading="lazy"
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      ))}
    </Slider>
  );
}

export default BannerSlider;
