import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeSlider.css'


function HomeSlider(){

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
  };

  const arrowStyles = {
      width: '50px',  // Adjust the width as needed
      height: '50px', // Adjust the height as needed
  };
  return(
      <>
          <Slider {...settings}>
          <div>
              <img src="assest\images\banner1.jpg"  width="100%" alt="Slide 1" />
          </div>
          <div>
              <img src="assest\images\banner1.jpg"  width="100%" alt="Slide 2" />
          </div>
          {/* <div>
              <img src="assest/revolution/images/slider-6-04.jpg"  width="100%" alt="Slide 3" />
          </div> */}
          {/* Add more slides with images as needed */}
      </Slider>

      <style>{`
              .slick-prev,
              .slick-next {
                  width: ${arrowStyles.width};
                  height: ${arrowStyles.height};
              }
          `}</style>
 
     </>
   )
} 

export default HomeSlider