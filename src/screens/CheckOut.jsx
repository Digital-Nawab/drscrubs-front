import React, { Suspense, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import imageURl from "../Api/ImageUrl";
import axios from "axios";
import BassURl from "../Api/Api";
import Addaddress from "../components/Modal/Addaddress";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { order } from "../Redux/Action/OrderSuccessAction";
import { fectaddress } from "../Redux/Action/addressAction";
import EditAddress from "../components/Modal/EditAddress";
import moment from "moment";
import MyContext from "../context/MyContext";
function CheckOut() {
  const [deliverCharge, setDeliverCharge] = useState("");

  useEffect(() => {
    axios
      .get(`${BassURl}/charges/85543bff8d3c1b5abd149ee6dd454021`)
      .then((res) => {
        setDeliverCharge(res.data.data);
      });

    console.log(deliverCharge);
  }, []);

  const sessionValue = JSON.parse(sessionStorage.getItem("userData"));
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fectaddress());
  }, [dispatch]);

  useEffect(() => {
    axios.get(`${BassURl}/user-address/${sessionValue?.id}`).then((res) => {
      setAddress(res.data);
    });
  }, []);

  //console.log(address);

  const handleDeleteAddress = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this address?"
      );
      if (!confirmDelete) return;

      // Show confirmation toast
      toast("Deleting address...", { type: "info" });

      await axios.post(`${BassURl}/delete-address/${id}`);
      setAddress(id);
      dispatch(fectaddress());

      // Show toast message for successful deletion
      toast.success("Address deleted successfully!");
    } catch (error) {
      //console.error('Error deleting address:', error.message);
      // Show toast message for error
      toast.error(`Error deleting address: ${error.message}`);
    }
  };

  const [editingAddress, setEditingAddress] = useState(null);

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  const handleUpdateAddress = (updatdAddress) => {
    if (updatdAddress) {
      // Update the address in the Redux store or perform any necessary actions
      dispatch({ type: "UPDATE_ADDRESS", payload: updatdAddress });
    }
    setEditingAddress(null); // Close the edit modal
  };

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const addSize = JSON.parse(localStorage.getItem("add_sizr_price"));
  const countryName = localStorage.getItem("selectedCountry");

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;
  // subtotal
  //console.log(cartItems);

  if (countryData === "INR") {
    var subtotal = cartItems?.reduce(
      (acc, item) => acc + item?.price_rupee * item?.qty,
      0
    );
  } else {
    var subtotal = cartItems?.reduce(
      (acc, item) => acc + item?.price_doller * item?.qty,
      0
    );
  }

  var grandTotal = 0;
  {
    cartItems.map((item, index) => {
      const embroideryPrice =
        item.emboidery.length > 0 ? item.emboidery[0].price : 0;
      //console.log(embroideryPrice);
      return (grandTotal += embroideryPrice * item?.qty);
    });
  }

  const [userAddress, setuserAddress] = useState();

  const [addAddress, setaddAddress] = useState(false);

  useEffect(() => {
    if (addAddress) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [addAddress]);

  function add_Address() {
    // //console.log("hello");
    setaddAddress(true);
  }

  // check Validation

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    let valid = true;

    if (!privacyPolicyChecked) {
      toast.error("You must accept the Privacy Policy");
      valid = false;
      window.location.href = "/view-cart";
    } else {
      window.location.href = "/view-cart";
    }

    if (!valid) {
      return;
    }
  };

  const [radioValue, setRadioValue] = useState();
  const onChange = (ev) => {
    //save your value here with state variable
    // //console.log(ev.target.value);
    setRadioValue(ev.target.value);
  };

  const [coupon, setCoupon] = useState([]);
  useEffect(() => {
    axios.get(`${BassURl}/all-coupons`).then((res) => {
      setCoupon(res.data.data.coupons);
    });
  }, []);

  // //console.log(coupon);

  const currentDate = moment().format("YYYY-MM-DD");
  //console.log(currentDate);

  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [couponUses, setCouponUses] = useState("");

  const [discount, setDiscount] = useState("");

  console.log(discount);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCouponClick = (couponCode, coupon_uses) => {
    setSelectedCoupon(couponCode);
    setCouponUses(coupon_uses);
  };

  const handleCouponChange = (event) => {
    setSelectedCoupon(event.target.value);
  };

  const handleCouponSubmit = async (event) => {
    event.preventDefault();

    const data = {
      coupon_currency: countryData,
      coupon_uses: couponUses,
      user_id: sessionValue.id,
      total_price: OrderData.bill_amount,
      coupon_code: selectedCoupon,
    };

    try {
      const response = await axios.post(`${BassURl}/check-coupons`, data);
      //console.log(response.data);
      setDiscount(response.data.discount_amount);
      setErrorMessage();
      setSuccessMessage("Coupon applied successfully!");

      // Remove success message after 3000ms
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      //console.log(error);
      setErrorMessage("Failed to apply the coupon. Please try again.");
      setSuccessMessage("");

      // Remove error message after 3000ms
      setTimeout(() => {
        setErrorMessage("");
      }, 300);
    }
  };

  const order_id = JSON.parse(localStorage.getItem("order"));

  const [OrderData, setOrderData] = useState("");
  const [OrderItem, setOrderItem] = useState("");

  const [EmbroideryData, setEmbroideryData] = useState("");
  console.log(EmbroideryData);

  useEffect(() => {
    axios
      .get(`${BassURl}/user/cart-details/${order_id}`)
      .then((res) => {
        setOrderData(res.data.data.order);
        setOrderItem(res.data.data.order_item);
        console.log(res.data.data);
        const Data = res.data.data.order_item.map((item) =>
          JSON.parse(item.emboidery)
        );
        setEmbroideryData(Data[0]);
      })
      .catch((error) => {
        //console.log(error)
      });
  }, []);
  console.log(OrderData);
  console.log(OrderItem);

  // useEffect(()=>{
  //   OrderItem.map((data)=>{
  //     if (data.status == "card") {
  //       //  const embroidery = JSON.parse(data.embroidery);
  //       if (data?.size.length > 10) {
  //         var customeSize = JSON.parse(data.size)
  //         console.log(customeSize);
  //       }
  //     }
  //   })
  // },[])

  const [EmbroideryPrice, setEmbroideryPrice] = useState("");
  // //console.log(EmbroideryPrice);
  const [ItemPrice, setItemPrice] = useState("");

  const [subTotal, setSubTotal] = useState();

  useEffect(() => {
    if (OrderData) {
      //console.log("Orderdata",typeof(OrderData[0].emboidery_price));
      //console.log("Orderdata",OrderData[0].price);
      // const embpPrice = parseInt(OrderData[0].emboidery_price)
      // const price = parseInt(OrderData[0].price)
      //console.log(embpPrice);
      // setSubTotal(embpPrice + price)
      //console.log(subTotal);
    }
  }, [OrderData]);
  // console.log(grandTotal);

  const totalPrice = subTotal;
  //const totalPrice = discount && discount > 0 ? subtotal + grandTotal - discount : subtotal + grandTotal;
  //return false;

  let delivery_fee;
  if (countryData === "INR") {
    if (totalPrice >= deliverCharge.min_Rprice) {
      delivery_fee = deliverCharge.max_charge_inr; // If totalPrice is greater than or equal to 1000
    } else {
      delivery_fee = deliverCharge.min_charge_inr; // If totalPrice is less than 1000
    }
  } else {
    if (totalPrice >= deliverCharge.min_Dprice) {
      delivery_fee = deliverCharge.max_charge_usd; // If totalPrice is greater than or equal to 1000
    } else {
      delivery_fee = deliverCharge.min_charge_usd; // If totalPrice is less than 1000
    }
  }

  console.log(order_id);

  const final_price =
    parseInt(OrderData.bill_amount) +
    parseInt(delivery_fee) -
    (discount && discount > 0 ? parseInt(discount) : 0);
  console.log(final_price);
  // const [finalPrice, setFinalPrice] = useState()
  // setFinalPrice(final_price)

  var coupon_amount = 0;

  const context = useContext(MyContext);
  const { payment } = context;

  // order CheckOut
  const checkOut = () => {
    if (!userAddress) {
      toast.error("Please select/add an address before placing the order.");
      return;
    }
    const orderData = {
      order_id: order_id,
      address_id: parseInt(userAddress),
      coupon_amount: discount,
      currency: countryData,
      coupon_code: selectedCoupon,
      delivery_fee: delivery_fee,
      bill_amount: OrderData.bill_amount,
      paid_amount: final_price,
      payment_method: "online",
      razorpay_order_id: "",
      razorpay_payment_id: "",
      payment_status: "",
      country: countryName,
    };

    console.log(orderData);

    let options = {
      //key: "rzp_test_iyiX1aDGtp5l3c",
      key: "rzp_live_vX7HFJhQditrWg",
      amount: orderData.paid_amount * 100,
      currency: orderData.currency === "INR" ? "INR" : "USD",
      name: "Dr Scrubs",
      description: "Production",
      handler: (response) => {
        if (response?.razorpay_payment_id != null) {
          //console.log("Razorpay Payment ID:", response);
          orderData.razorpay_payment_id = response.razorpay_payment_id;
          orderData.payment_status = "success";
          payment(orderData);

          // const Data = {
          //   order_id: order_id,
          //   address_id: parseInt(userAddress),
          //   coupon_amount: discount,
          //   currency: countryData,
          //   coupon_code: selectedCoupon,
          //   delivery_fee: delivery_fee,
          //   bill_amount: OrderData.bill_amount,
          //   paid_amount: final_price,
          //   payment_method: 'online',
          //   razorpay_order_id: "",
          //   razorpay_payment_id: response.razorpay_payment_id,
          //   payment_status: "success",
          //   country: countryName,
          // };
          // payment(Data);
        }
      },
      prefill: {
        name: address.first_name + address.last_name,
        email: address?.email,
        contact: address?.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#000",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Navbar />
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <section className="checkout-section-2 section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-lg-7">
              <div className="left-sidebar-checkout">
                <div className="checkout-detail-box">
                  <ul>
                    <li>
                      {/* <div className="checkout-icon text-center">
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                          style={{ lineHeight: "40px" }}
                        />`
                      </div> */}
                      <div className="checkout-box">
                        <div className="d-flex justify-content-between">
                          <div className="checkout-title">
                            <h4>Delivery Address</h4>
                          </div>
                          <div className="checkout-title">
                            <button
                              class="checkout__discount--code__btn primary__btn border-radius-5"
                              type="submit"
                              onClick={add_Address}
                            >
                              + Add New Address
                            </button>
                          </div>
                        </div>

                        <div className="checkout-detail">
                          <div className="row g-4">
                            {address?.code === 200 ? (
                              address?.data?.map((item) => {
                                return (
                                  <>
                                    <div className="col-xl-6  col-lg-6 col-md-6 p-3">
                                      <div class="card">
                                        <div class="card-header">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="jack"
                                            id="flexRadioDefault1"
                                            onClick={(e) =>
                                              setuserAddress(item?.id)
                                            }
                                          />
                                          &nbsp;&nbsp;{item?.temp_name}
                                          <span className="product-labels start-auto end-0">
                                            <span className="lbl-checkout pr-label1">
                                              {" "}
                                              {item?.type}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="seller-info mb-2">
                                          <div className="address-box bg-block">
                                            <div className="top d-flex-justify-center justify-content-between">
                                              {/* <h5 className="m-0">{item?.temp_name}</h5> */}
                                            </div>
                                            <div className="middle">
                                              <div className="address mb-2 text-muted">
                                                <address className="m-0">
                                                  {item?.locality}{" "}
                                                  {item?.address} <br />{" "}
                                                  {item?.city} {item?.state}{" "}
                                                  <br />
                                                  {item?.zip} {item?.country}{" "}
                                                  <br />
                                                  Mobile : {item?.temp_mobile}
                                                </address>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {editingAddress && (
                                        <EditAddress
                                          address={editingAddress}
                                          onUpdate={handleUpdateAddress}
                                        />
                                      )}
                                    </div>
                                  </>
                                );
                              })
                            ) : (
                              <>
                                <h1>Data No Found</h1>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <>
                <div className="wrapper">
                  <h3>Order Summary</h3>
                  <div className="group">
                    <div class="row">
                      <tbody>
                        {countryData == "INR" ? (
                          <>
                            {OrderItem?.length > 0 ? (
                              OrderItem &&
                              OrderItem?.map((data) => {
                                console.log("INR", data);

                                console.log(data);
                                if (data.status == "card" && data.size != null) {
                                  //  const embroidery = JSON.parse(data.embroidery);
                                  if (data?.size.length > 10 || data?.size === "null") {
                                    var customeSize = JSON.parse(data.size);
                                    console.log(customeSize);
                                  }
                                }
                                // console.log(data.size);
                                return (
                                  <>
                                    <div className="row border-bottom">
                                      <div className="col-md-3 item-img">
                                        <img
                                          src={`${imageURl}/${data?.product_image}`}
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        className="col-md-4 item-details"
                                        style={{
                                          overflow: "hidden",
                                        }}
                                      >
                                        <span className="item-title">
                                          {data?.product_name}
                                        </span>
                                        {customeSize ? (
                                          Object.entries(customeSize).map(
                                            ([key, value], index) => {
                                              console.log(key, value, index);
                                              return (
                                                <span
                                                  key={index}
                                                  className="badge text-dark border bg-light"
                                                  style={{
                                                    fontSize: "10px",
                                                    lineHeight: "15px",
                                                  }}
                                                >
                                                  {key}: {value}
                                                </span>
                                              );
                                            }
                                          )
                                        ) : (
                                          <span className="item-size badge text-dark border bg-light p-1">
                                            {data?.size}
                                          </span>
                                        )}

                                        <span className="item-qty">
                                          Qty : {data?.qty}
                                        </span>
                                      </div>
                                      <div className="col-md-2">
                                        {/* {EmbroideryData.length > 0 && (
                                          <div className="embroidery-details">
                                            {EmbroideryData.map((emb, index) => (
                                              <div key={index} className="embroidery-item">
                                                <img src={emb.icon}  width="50px" height="50px" />
                                                <span className="embroidery-placement" dangerouslySetInnerHTML={{ __html: emb.content }}></span>
                                              </div>
                                            ))}
                                          </div>
                                        )} */}
                                      </div>
                                      <div className="col-md-3 item-price">
                                        <span className="price-border mb-3">
                                          ₹ {data?.price}
                                        </span>
                                        {data?.emboidery_price != 0 && (
                                          <span className="price-border">
                                            ₹ {data?.emboidery_price}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                            ) : (
                              <>
                                <h1>No data Found</h1>
                              </>
                            )}
                          </>
                        ) : countryData == "USD" ? (
                          <>
                            {OrderItem?.length > 0 ? (
                              OrderItem &&
                              OrderItem?.map((data) => {
                                console.log("USD", data);
                                return (
                                  <>
                                    <tr className="border-bottom">
                                      <td className="item-img">
                                        <img
                                          src={`${imageURl}/${data?.product_image}`}
                                          alt=""
                                        />
                                      </td>
                                      <td className="item-details">
                                        <span className="item-title">
                                          {data?.product_name}
                                        </span>
                                        <span className="item-size">
                                          {data?.size}
                                        </span>
                                        <span className="item-qty">
                                          Qty : {data?.qty}
                                        </span>
                                      </td>
                                      <td>
                                        {/* {EmbroideryData.length > 0 && (
                                                  <div className="embroidery-details">
                                                    {EmbroideryData.map((emb, index) => (
                                                      <div key={index} className="embroidery-item">
                                                        <img src={emb.icon}  width="50px" height="50px" />
                                                        <span className="embroidery-placement" dangerouslySetInnerHTML={{ __html: emb.content }}></span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                )} */}
                                      </td>
                                      <td className="item-price">
                                        <span className="price-border mb-3">
                                          $ {data?.total_price}
                                        </span>
                                        {data?.emboidery_price != 0 && (
                                          <span className="price-border">
                                            $ {data?.emboidery_price}
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <>
                                <h1>No data Found</h1>
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </div>
                  </div>

                  {coupon.map((item, key) =>
                    item.min_purchase <=
                      parseInt(OrderData.bill_amount) +
                      parseInt(delivery_fee) +
                      (addSizePrice != null && addSizePrice !== 0
                        ? parseInt(addSizePrice)
                        : 0) &&
                      item.start_date <= currentDate &&
                      item.coupon_currency === countryData ? (
                      <span
                        className="border p-2 badge bg-success shadow"
                        onClick={() =>
                          handleCouponClick(item.coupon_code, item.coupon_uses)
                        }
                      >
                        {item.coupon_code}
                      </span>
                    ) : null
                  )}

                  <div className="checkout__discount--code mt-3">
                    <form className="d-flex" onSubmit={handleCouponSubmit}>
                      <input
                        type="hidden"
                        name="coupon_currency"
                        value={countryData}
                      />
                      <input
                        type="hidden"
                        name="coupon_uses"
                        value={couponUses}
                      />
                      <input
                        type="hidden"
                        name="user_id"
                        value={sessionValue.id}
                      />
                      <input
                        type="hidden"
                        name="total_price"
                        value={
                          parseInt(OrderData.bill_amount) +
                          parseInt(delivery_fee) +
                          (addSizePrice != null && addSizePrice !== 0
                            ? parseInt(addSizePrice)
                            : 0)
                        }
                      />
                      <input
                        className="checkout__discount--code__input--field border-radius-5"
                        placeholder="Gift card or discount code"
                        type="text"
                        value={selectedCoupon}
                        onChange={handleCouponChange}
                        name="coupon_code"
                      />
                      <button
                        className="checkout__discount--code__btn primary__btn border-radius-5"
                        type="submit"
                        disabled={!selectedCoupon}
                      >
                        Apply
                      </button>
                    </form>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                    {successMessage && (
                      <p className="success-message text-success">
                        {successMessage}
                      </p>
                    )}
                  </div>

                  <table className="mt-4 mb-4">
                    <tbody>
                      {countryData == "INR" ? (
                        <>
                          <tr className="border-bottom">
                            <td className="item-qty p-3">Subtotal</td>
                            <td className="item-price">
                              ₹ {OrderData.bill_amount}
                            </td>
                          </tr>
                          <tr></tr>
                          {discount > 0 && (
                            <tr className="border-bottom">
                              <td className="item-qty p-3">Discount</td>
                              <td className="item-price">
                                - ₹ {parseInt(discount)}
                              </td>
                            </tr>
                          )}
                          <tr></tr>
                          <tr className="border-bottom">
                            <td className="item-qty p-3">Shipping</td>
                            <td
                              className="item-price p-3"
                              style={{
                                color: delivery_fee == 0 ? "green" : "",
                              }}
                            >
                              {" "}
                              {delivery_fee == 0 ? "Free" : `₹ ${delivery_fee}`}
                            </td>
                          </tr>
                          <tr></tr>

                          <tr className="border-bottom">
                            <td
                              style={{ fontSize: 17 }}
                              className="item-qty p-3"
                            >
                              Total
                            </td>
                            <td
                              style={{ fontSize: 17 }}
                              className="item-price p-3"
                            >
                              ₹{" "}
                              {parseInt(OrderData.paid_amount) +
                                parseInt(delivery_fee) -
                                (discount && discount > 0
                                  ? parseInt(discount)
                                  : 0)}
                            </td>
                          </tr>
                          <tr></tr>
                        </>
                      ) : countryData == "USD" ? (
                        <>
                          <tr>
                            <td className="item-qty">Subtotal</td>
                            <td className="item-price">
                              $ {OrderData.bill_amount}
                            </td>
                          </tr>
                          <tr></tr>
                          {discount > 0 && (
                            <tr className="border-bottom">
                              <td className="item-qty p-3">Discount</td>
                              <td className="item-price">
                                - $ {parseInt(discount)}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="item-qty">Shipping</td>
                            <td
                              className="item-price"
                              style={{
                                color: delivery_fee == 0 ? "green" : "",
                              }}
                            >
                              {" "}
                              {delivery_fee == 0 ? "Free" : `$ ${delivery_fee}`}
                            </td>
                          </tr>
                          <tr></tr>

                          <tr>
                            <td style={{ fontSize: 17 }} className="item-qty">
                              Total
                            </td>
                            <td style={{ fontSize: 17 }} className="item-price">
                              ${" "}
                              {parseInt(OrderData.paid_amount) +
                                parseInt(delivery_fee) -
                                (discount && discount > 0
                                  ? parseInt(discount)
                                  : 0)}
                            </td>
                          </tr>
                          <tr></tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  <div className="group">
                    <button className="btn-checkout" onClick={checkOut}>
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </section>

      {addAddress ? (
        <Suspense
          fallback={
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Addaddress hide={setaddAddress} />
        </Suspense>
      ) : null}

      <Footer />
    </>
  );
}

export default CheckOut;
