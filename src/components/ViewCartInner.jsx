import React, { useEffect, useState } from "react";
import imageURl from "../Api/ImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, deleteFromCart } from "../Redux/Action/CartAction";
import store from "../Redux/Store";
import EmboideryAdded from "./EmboideryAdded";

function ViewCartInner({ data, countryData }) {
  //console.log(data);
  const dispatch = useDispatch();
  //console.log(countryData)

  // const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  // console.log(countryData)

  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  // get emboiderPrice

  let total = 0;
  data?.emboidery?.length > 0
    ? data.emboidery?.map((items) => {
      return (total += items?.price);
    })
    : "";

  // IncreaseQty
  const increaseQuantity = (item, qty) => {
    const newQty = qty + 1;
    const price = total * newQty;
    //console.log(price);

    //console.log(item, newQty);
    if (5 <= qty) {
      return;
    }
    const updatedItem = {
      ...item,
      qty: newQty,
    };
    dispatch(addToCartAction(updatedItem, newQty, price));
  };

  // decreaseQuantity

  const decreaseQuantity = (item, qty) => {
    const newQty = qty - 1;
    const price = total * newQty;
    //console.log(price);
    //console.log(item, newQty, price);
    if (1 >= qty) {
      return;
    }
    const updatedItem = {
      ...item,
      qty: newQty,
    };

    dispatch(addToCartAction(updatedItem, newQty, price));
  };

  //console.log(total);

  //   Sub total

  // const allTotal = total + subtotal;
  // console.log(allTotal);

  const embroideryPrice =
    data.emboidery.length > 0 ? data.emboidery[0].price : 0;
  const dataTotal = embroideryPrice * data.qty;
 // console.log(dataTotal);

  // cartItems.forEach((item) => {
  //     const embroideryPrice = item.emboidery.length > 0 ? item.emboidery[0].price : '';
  //     addOnData = embroideryPrice
  // });
  //  console.log(addOnData)

  const [customsize, setCustomsize] = useState()

  useEffect(()=>{
    if(data.customeSize.length != 0){
      const customsize = data.customeSize
      setCustomsize(customsize)
    }
  },[])

  return (
    <>
      <div className="card product">
        <div className="card-body p-4">
          <div className="row gy-3">
            <div className="col-6 col-md-2 col-sm-auto">
              <div className="avatar-lg h-100">
                <div className="avatar-title bg-danger-subtle rounded py-3">
                  <img
                    src={`${imageURl}/${data?.image}`}
                    alt=""
                    className="avatar-md-cart"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-sm">
              <h5 className="fs-3 lh-base mb-2">
                 {data?.title}
              </h5>
              <p className="fw-medium"> Color : <span>{data?.color_name}</span></p>

              {
                customsize? Object.entries(customsize).map(([key, value], index) => {
                  console.log(key, value, index);
                  return (
                    <span key={index} className="badge text-dark border bg-light" style={{ fontSize: '12px', lineHeight: '15px' }}>{key} : {value}</span>
                  )
                })
                :
                data?.size !=='' && (
                  <p className="fw-medium mb-4 badge text-dark border bg-light p-3">Size : <span>{data?.size}</span></p>
                )
              }

              
              <div className="input-step mt-3">
                <button type="button" 
                  className="minus" 
                  onClick={() => decreaseQuantity(data, data.qty)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="product-quantity"
                  value={data?.qty}
                  min={0}
                  max={100}
                  readOnly=""
                  data-counter=""
                />
                <button 
                  type="button" 
                  className="plus"
                  onClick={() => increaseQuantity(data, data.qty)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3 col-sm">
                {countryData === 'INR' ? (
                  <>
                    <span>
                      <b>
                        {" "}
                        {data?.emboidery?.length > 0 ? (
                          <EmboideryAdded emboideryData={data?.emboidery} />
                        ) : (
                          <p>No Add On</p>
                        )}{" "}
                      </b>
                    </span>
                  </>
                ) : countryData === 'USD' ? (
                  <>
                    <span>
                      <b>
                        {" "}
                        {data?.emboidery?.length > 0 ? (
                          <EmboideryAdded emboideryData={data?.emboidery} />
                        ) : (
                          <p>No Add On</p>
                        )}{" "}
                      </b>
                    </span>
                  </>
                ) : (
                  <>
                    Embroidery Added
                  </>
                )}
            </div>
            <div className="col-6 col-md-3 col-sm-auto">
              <div className="text-lg-end">
                <p className="text-muted mb-3 fs-12">Item Price:</p>
                 {countryData === 'INR' ? (
                    <>
                      <h5 className="fs-16">
                        <span className="product-price">₹ {data?.price_rupee}</span>
                      </h5>
                      {embroideryPrice > 0 && (
                        <>
                          <p className="text-muted mb-3 fs-12">Embroidery Price: </p>
                          <h5 className="fs-16">
                              <span>₹ {embroideryPrice}</span>
                          </h5>
                        </>
                      )}
                    </>
                  ) : countryData === 'USD' ? (
                    <>
                      <h5 className="fs-16">
                        <span className="product-price"> $ {data?.price_doller}</span>
                      </h5>
                      {embroideryPrice > 0 && (
                        <>
                          <p className="text-muted mb-3 fs-12">Embroidery Price: </p>
                          <h5 className="fs-16">
                              <span>$ {embroideryPrice}</span>
                          </h5>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="cart__price">  </span>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row align-items-center gy-3">
            <div className="col col-sm">
              <div className="d-flex flex-wrap my-n1">
                <div>
                  <button
                    className="d-block text-body p-1 px-2"
                    onClick={() => {
                      dispatch(deleteFromCart(data));
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg> 
                    &nbsp;&nbsp; Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="col col-sm-auto">
              <div className="d-flex align-items-center gap-2 text-muted">
                <div>Total :</div>
                {countryData === 'INR' ? (
                    <> 
                      <h5 className="fs-14 mb-0">
                        <span className="product-line-price"> ₹ {data?.price_rupee * data?.qty + dataTotal + (addSizePrice != null && addSizePrice !== 0 ? parseInt(addSizePrice) : 0)}</span>
                      </h5>
                      
                    </>
                  ) : countryData === 'USD' ? (
                    <>
                     <h5 className="fs-14 mb-0">
                        <span className="product-line-price"> $ {data?.price_doller * data?.qty + dataTotal + (addSizePrice != null && addSizePrice !== 0 ? parseInt(addSizePrice) : 0)}</span>
                      </h5>
                      
                    </>
                  ) : (
                    <></>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default ViewCartInner;
