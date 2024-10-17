export const addToCartAction =
  (product, qty, emboidaryPrice) => (dispatch, getState) => {
    console.log("cart data", product);
    console.log(product);
    // const newEmboidery = product?.emboidery_price * qty;
    const cartItem = {
      title: product?.title,
      product_name: product?.title,
      sku_number: product?.sku_number,
      //deliver_fee: product?.deliver_fee,
      color_id: product?.color_id,
      pro_id: product?.pro_id,
      // price: product?.price,
      price_rupee: product?.price_rupee,
      price_doller: product?.price_doller,
      gst_inr: product?.gst_inr,
      gst_us: product?.gst_us,
      image: product?.image,
      product_image: product?.image,
      emboidery: product?.emboidery,
      emboidery_price: product?.emboidery_price,
      color_name: product?.color_name,
      qty: qty,
      size_price: 0,
      size: product?.size,
      customeSize: product?.customeSize,
    };

    console.log(cartItem, "add item items");
    // console.log(cartItem)
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
    window.localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().addToCartReducer?.cartItems)
    );
  };

export const deleteFromCart = (item) => (dispatch, getState) => {
  console.log(item);
  dispatch({ type: "DELETE_FROM_CART", payload: item });
  window.localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCartReducer?.cartItems)
  );
};

// SERVICE CART FUNCTIONLITY
