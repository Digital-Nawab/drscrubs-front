import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { addToCartReducer } from "./Reducer/CartReducer";
import productsReducer from "./Reducer/getItemReducer";
import sliderReducer from "./Reducer/getSliderReducer";
import usersignupReducer from "./Reducer/authReducer";
import userGuestReducer from "./Reducer/guestReducer";
import userLoginReducer from "./Reducer/loginReducer";
import addressReducer from "./Reducer/addressReducer";
import allproductsReducer from "./Reducer/getAllProductReducer";
import productByIdReducer from "./Reducer/getProductByIdReducer";
import productSubCategoryReducer from "./Reducer/productSubCategoryReducer";
import { addemboidaryReducer } from "./Reducer/AddEmboidaryReducer";
import orderReducer from "./Reducer/OrderSuccessReducer";
import getorderbyclientbyid from "./Reducer/GetOrderByClinetReducer";

// Create the Redux store using the userReducer and applying the thunk middleware

const finalReducer = combineReducers({
  addToCartReducer: addToCartReducer,
  products: productsReducer,
  sliders: sliderReducer,
  userSignup: usersignupReducer,
  userGuest: userGuestReducer,
  userLogin: userLoginReducer,
  userAddress: addressReducer,
  allproducts: allproductsReducer,
  productByID: productByIdReducer,
  subCategoryId: productSubCategoryReducer,
  addemboidaryReducer: addemboidaryReducer,
  orderReducer: orderReducer,
  getorderbyclientbyid: getorderbyclientbyid,
});

const cartItems = JSON.parse(localStorage.getItem("cartItems"))
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const emboidary = JSON.parse(localStorage.getItem("emboidary"))
  ? JSON.parse(localStorage.getItem("emboidary"))
  : [];
const order = JSON.parse(localStorage.getItem("order"))
  ? JSON.parse(localStorage.getItem("order"))
  : [];

const initialState = {
  addToCartReducer: { cartItems: cartItems },
  addemboidaryReducer: { emboidary: emboidary },
  orderReducer: { order: order },
};
const Store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default Store;
