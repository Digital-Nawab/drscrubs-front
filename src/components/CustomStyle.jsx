import React, { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function CustomStyle() {
  const [imageSrc, setImageSrc] = useState(
    "https://www.eshakti.com/images/CL0096807/CL0096807-Neckline-Boat.jpg?v=23031023"
  );
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleButtonClick = () => {
    setIsImageVisible(false);

    setTimeout(() => {
      setImageSrc(
        "https://www.eshakti.com/images/CL0096807/CL0096807-Neckline-High%20V.jpg?v=23031323"
      );
      setIsImageVisible(true);
    }, 100);
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container">
        <div className="shadow m-3">
          <div className="row">
            <div className="col-md-6">
              <ul style={{ display: "flex", listStyle: "none", margin: 0 }}>
                <li>
                  {" "}
                  <img
                    src="https://www.eshakti.com/images/CL0096807/CL0096807-SleeveType-Sleeveless_L.jpg?v=23031023"
                    alt
                  />
                </li>
                <li>
                  <img
                    id="neck-line"
                    src={imageSrc}
                    alt="Neck Line"
                    className={`body-anination ${
                      isImageVisible ? "visible" : "hidden"
                    }`}
                  />
                </li>
                <li>
                  <img
                    src="https://www.eshakti.com/images/CL0096807/CL0096807-SleeveType-Sleeveless_R.jpg?v=23031023"
                    alt
                  />
                </li>
              </ul>
              <ul style={{ display: "flex", listStyle: "none" }}>
                <li>
                  <img
                    src="https://www.eshakti.com/images/CL0096807/CL0096807-Length-As%20Shown.jpg?v=23031023"
                    alt
                  />
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <Slider {...settings}>
                <div className="" onClick={handleButtonClick}>
                  {" "}
                  <img
                    className="img-fluid"
                    id="change-image-btn"
                    src="https://www.eshakti.com/styling%20images/V%20Neck.jpg"
                    alt
                  />
                  <p style={{ fontSize: "1rem" }}>High V</p>
                </div>
                <div className="">
                  {" "}
                  <img
                    className="img-fluid"
                    src="https://www.eshakti.com/styling%20images/Wide%20V.jpg"
                    alt
                  />
                  <p style={{ fontSize: "1rem" }}>V Neck</p>
                </div>
                <div className="">
                  {" "}
                  <img
                    className="img-fluid"
                    src="https://www.eshakti.com/styling%20images/Deep%20V.jpg"
                    alt
                  />
                  <p style={{ fontSize: "1rem" }}>Wide V</p>
                </div>
                <div className="">
                  <img
                    className="img-fluid"
                    src="https://www.eshakti.com/styling%20images/Low%20v-neck,%20high%20back%20neck.jpg"
                    alt
                  />
                  <p style={{ fontSize: "1rem" }}>Deep V </p>
                </div>
                <div className="">
                  <img
                    className="img-fluid"
                    src="https://www.eshakti.com/styling%20images/High%20Scoop.jpg"
                    alt
                  />
                  <p style={{ fontSize: "1rem" }}>Low V neck hight back neck</p>
                </div>
              </Slider>

              {/* Swiper */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomStyle;
