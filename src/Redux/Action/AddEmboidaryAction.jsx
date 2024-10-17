export const addToEmboidary = (emboidary) => (dispatch, getState) => {
    let emboideryData = [emboidary];
    console.log(emboidary)

    
    // const cartItem = {
    //   title: product?.data?.product_title_eng,
    //   id: product?.data?.id,
    //   price: product?.data?.rupee,
    //   image: product?.data?.image,
    //   qty: qty,
    // };
    dispatch({ type: "ADD_EMBOIDARY", payload: emboidary });
    window.localStorage.setItem(
        "emboidary",
        JSON.stringify(getState().addemboidaryReducer?.emboidary)
    );
};

export const deleteFromEmboidary = (item) => (dispatch, getState) => {
    console.log(item)
    dispatch({ type: "DELETE_EMBOIDARY", payload: item });
    window.localStorage.setItem(
        "emboidary",
        JSON.stringify(getState().addemboidaryReducer?.emboidary)
    );
};

  // SERVICE CART FUNCTIONLITY
