import React, { useEffect, useState } from "react";
import { addToCartAction } from "../Redux/Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import imageURl from "../Api/ImageUrl";

import axios from "axios";
import BassURl from "../Api/Api";

function HomeProduct({ data, count }) {
  // add to cart and qty funcationality
  console.log(data)
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  function addtocart() {
    dispatch(addToCartAction(data, qty));
  }
  const cartreducerstate = useSelector((state) => state.addToCartReducer);
  const { cartItems } = cartreducerstate;


  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  console.log(countryData)

  // productColor

  const [colorCode, setcolorCode] = useState('');
  useEffect(() => {

    axios.get(`${BassURl}/product-color/1`).then((res) => {
      return (setcolorCode(res.data.data))
    })
  }, []); 
  console.log(colorCode)


  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="col mb-30">
        <div className="product__items new-product">
          <div className="product__items--thumbnail">
            <Link className="product__items--link" to={`/product-details/${data?.product_url}?color=${data?.color_url}`}>
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
            <Link
              className="product__add-to__cart--btn__style2"
              to={`/product-details/${data?.product_url}?color=${data?.color_url}`}>
                 <span className="product__items--content__subtitle" style={{ fontWeight: 900 }}>
              {data?.category_title_eng}
            </span> / <span className="product__items--content__subtitle">
              {data?.sub_category_title}
            </span> <br />
              <span className="add__to--cart__text">{data?.product_title_eng} - {data?.color_name}</span>
            </Link>

          </div>

        </div>
      </div>
    </>
  );
}

export default HomeProduct;
