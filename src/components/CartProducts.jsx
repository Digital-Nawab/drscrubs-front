import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, deleteFromCart } from "../Redux/Action/CartAction";
import imageURl from "../Api/ImageUrl";

function CartProducts({ item }) {
  const cartreducerstate = useSelector((state) => state.addToCartReducer);
  const dispatch = useDispatch();
  //console.log(item)

  const getProductById = useSelector((state) => state.productByID);
  const { productDetails, isProductLoading, error } = getProductById;

  const { cartItems } = cartreducerstate;

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));
  console.log(addSizePrice)


  return (
    <>
      <div className="minicart__product--items d-flex">
        <div className="minicart__thumb">
          <a href="/view-cart">
            <img src={`${imageURl}/${item?.image}`} alt="prduct-img" />
          </a>
        </div>
        <div className="minicart__text">
          <h3 className="minicart__subtitle h4">
            <a href="/view-cart">{item?.title}</a>
          </h3>
          <span className="color__variant">
            <b>Color:</b> {item?.color_name}
          </span>
          <div className="minicart__price">
            {countryData === "INR" ? (<>

              <span className="current__price"> ₹ {item?.price_rupee}</span>


            </>) : (<>
              <span className="current__price"> $ {item?.price_doller}</span>


            </>)}


          </div>

          <div className="">
            {
              item?.emboidery?.length > 0 ? (<>
                <label htmlFor="">

                  <input type="checkbox" checked />
                  Emboidery : {item?.emboidery?.map((data) => {
                    return (<><span style={{ color: "green" }}>{data?.price}</span></>)
                  })}


                </label>
              </>) : ('')
            }

            
            {addSizePrice != null && addSizePrice != 0 ? (
            <>
            <label htmlFor="">

              <input type="checkbox" checked />
              &nbsp;&nbsp; AddSizePrice : <span style={{ color: "green" }}>{addSizePrice}</span>

            </label>
            </>
            ) : (
              
              <></>
            )
            }

            {/* <span className="old__price">$140.00</span> */}
          </div>
          <div className="minicart__text--footer d-flex align-items-center">
            <button
              className="minicart__product--remove"
              onClick={() => {
                dispatch(deleteFromCart(item));
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg> 
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProducts;
