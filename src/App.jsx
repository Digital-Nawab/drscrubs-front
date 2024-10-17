import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import ProtectedRoute from "./Routes/ProtectedRoutes";
import CategoryByMen from "./components/CategoryByMen";
import GetIPaddress from "./components/getIPaddress";
import Testimonial from "./components/Testimonial";
import MyState from "./context/MyState";
// import AddEmbroidery from "./components/AddEmbroidery";
// import OrderProductDetails from "./screens/OrderProductDetails";
const Gallery = lazy(() => import("./screens/Gallery"));
const SignupPage = lazy(() => import("./screens/SignupPage"));
const ProductDetails = lazy(() => import("./screens/ProductDetails"));
const CategoryProduct = lazy(() => import("./components/CategoryProduct"));
const About = lazy(() => import("./screens/About"));
const ContactUs = lazy(() => import("./components/ContactUs"));
// const Home = lazy(() => import("./Screens/Home"));
const Home = lazy(() => import("./screens/Home"));
// const CreateYourOwnScrub = lazy(() => import("./screens/CreateOwnScrubs"));
const Login = lazy(() => import("./screens/Login"));
const Dashboard = lazy(() => import("./screens/ProfileDasboard"));
const Faq = lazy(() => import("./screens/Faq"));
const SizeGuid = lazy(() => import("./screens/SizeGuid"));
const ViewCart = lazy(() => import("./screens/ViewCart"));
const CheckOut = lazy(() => import("./screens/CheckOut"));
const OrderSucess = lazy(() => import("./screens/OrderSucess"));
const Invoice = lazy(() => import("./screens/Invoice"));
const Recent = lazy(() => import("./screens/ShopByRecent"));
// const TopSelling = lazy(() => import("./screens/TrendingProduct"));
const Collection = lazy(() => import("./screens/Collection"));
const ShopByColor = lazy(() => import("./components/ShopByColorMen"));
// const ShopByColorWomen = lazy(() => import("./components/ShopByWomen"));
const AllAboutUs = lazy(() => import("./screens/Allaboutus"));
// const CategoryByMen =lazy(()=>import("./components/CategoryByMen"));
const AddEmbroidery = lazy(() => import("./components/AddEmbroidery"));
const OrderProductDetails = lazy(() => import("./screens/OrderProductDetails"));
const CustomOrder = lazy(() => import("./screens/CustomOrder"));
const PrivacyPolicy = lazy(() => import("./screens/PrivacyPolicy"));
const TermConditions = lazy(() => import("./screens/TermConditions"));
const ReturnsExchanges = lazy(() => import("./screens/ReturnsExchanges"));
const BulkOrder = lazy(() => import("./screens/BulkOrder"));
const ShippingDelivery = lazy(() => import("./screens/ShippingDelivery"));
const ShopByCategory = lazy(() => import("./screens/ShopByCategory"));
const ProfileComponent = lazy(() => import("./screens/ProfileComponent"));
const ForgetPassword = lazy(() => import("./screens/ForgotPassword"));
const ResetPassword = lazy(() => import("./screens/ResetPassword"));
function App() {
  return (
    <MyState>
      <BrowserRouter>
        <Suspense
          fallback={
            <div id="preloader">
              <div id="ctn-preloader" className="ctn-preloader">
                <div className="animation-preloader">
                  <div className="spinner" />
                  <div className="txt-loading">
                    <span data-text-preloader="L" className="letters-loading">
                      L
                    </span>
                    <span data-text-preloader="O" className="letters-loading">
                      O
                    </span>
                    <span data-text-preloader="A" className="letters-loading">
                      A
                    </span>
                    <span data-text-preloader="D" className="letters-loading">
                      D
                    </span>
                    <span data-text-preloader="I" className="letters-loading">
                      I
                    </span>
                    <span data-text-preloader="N" className="letters-loading">
                      N
                    </span>
                    <span data-text-preloader="G" className="letters-loading">
                      G
                    </span>
                  </div>
                </div>
                <div className="loader-section section-left" />
                <div className="loader-section section-right" />
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile-component" element={<ProfileComponent />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="reset-password/:token/:id"
              element={<ResetPassword />}
            />
            <Route path="/faq" element={<Faq />} />
            <Route
              path="/product-details/:productUrl?"
              element={<ProductDetails />}
            />
            {/* <ProtectedRoute path='/user-dashboard' element={<Dashboard />} /> */}
            <Route
              path="/user-dashboard"
              element={<ProtectedRoute Component={Dashboard} />}
            />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/view-cart" element={<ViewCart />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/ip-address" element={<GetIPaddress />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/bulk-order" element={<BulkOrder />} />
            <Route path="/term-conditions" element={<TermConditions />} />
            <Route
              path="/refunds-cancellations"
              element={<ReturnsExchanges />}
            />
            <Route
              path="/shipping-delivery-policy"
              element={<ShippingDelivery />}
            />
            <Route
              path="/shop-by-category/:category_url/:gender?"
              element={<ShopByCategory />}
            />
            <Route
              path="/collection/:cat_url/:gender?"
              element={<CategoryProduct />}
            />
            <Route
              path="/collection/men/:men_cat_url"
              element={<CategoryByMen />}
            />
            <Route path="/size-guid" element={<SizeGuid />} />
            <Route
              path="/check-out"
              element={<ProtectedRoute Component={CheckOut} />}
            />
            <Route
              path="/order-success"
              element={<ProtectedRoute Component={OrderSucess} />}
            />
            <Route
              path="/invoice/:order_id"
              element={<ProtectedRoute Component={Invoice} />}
            />
            <Route path="/emboderiy" element={<AddEmbroidery />} />
            <Route path="/shop/:url/:gender?" element={<Recent />} />
            <Route path="/about/:url" element={<Collection />} />
            <Route path="/category-product" element={<Collection />} />
            <Route
              path="/shop-by-color/:color_url/:gender?"
              element={<ShopByColor />}
            />
            {/* <Route
            path="/shop-by-color/:color_url"
            element={<ShopByColorWomen />}
          /> */}
            <Route path="/about-us/:url" element={<AllAboutUs />} />
            <Route
              path="/order-details/:order_id"
              element={<OrderProductDetails />}
            />
            <Route path="/custom-order" element={<CustomOrder />} />
            <Route path="/testimonial" element={<Testimonial />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MyState>
  );
}

export default App;
