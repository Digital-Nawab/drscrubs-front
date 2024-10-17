import React from "react";
import { useParams } from "react-router-dom";
import { lazy } from "react";
// import Navbar from "../components/Navbar";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

function Allaboutus() {
  const { url } = useParams();
  return (
    <>
      <Navbar />
      <main className="main__content_wrapper">
        <section className="breadcrumb__section breadcrumb__about_bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    {url}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about__section section--padding mb-95">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="about__content text-center">
                  <img className="w-50" src="/assets/img/notfound.png" alt="" srcset="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order */}
        <div
          className="counterup__banner--section counterup__banner__bg2"
          id="funfactId"
        >
          <div className="container">
            <div className="row row-cols-1 align-items-center">
              <div className="col">
                <div className="counterup__banner--inner position__relative d-flex align-items-center justify-content-between">
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      YEARS OF <br />
                      FOUNDATION
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={50}
                    >
                      50
                    </span>
                  </div>
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      SKILLED TEAM <br />
                      MEMBERS{" "}
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={100}
                    >
                      100
                    </span>
                  </div>
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      HAPPY <br />
                      CUSTOMERS
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={80}
                    >
                      80
                    </span>
                  </div>
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      MONTHLY <br />
                      ORDERS
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={70}
                    >
                      70
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ borderBottom: "1px solid black" }}>
          <div className="container-fluid">
            <div className="row text-center">
              <h2 className="mt-5">GROUPS & PARTNERSHIPS</h2>
              <span className="mt-3">
                As one of the first medical uniform manufacturers to sell
                direct, we can provide competitive rates, personalizations,
                custom products and extremely rapid lead times. We are the
                exclusive provider of lab coats for the largest integrated
                healthcare system in the world and can extend the same level of
                services and products to organizations of any size.
              </span>
            </div>
          </div>

          <div className="container">
            <div className="row p-5">
              <div className="col-lg-3"></div>
              <div className="col-lg-3">
                <button class="newsletter__popup--subscribe__btn">
                  GROUPS
                </button>
              </div>
              <div className="col-lg-3">
                <button class="newsletter__popup--subscribe__btn">
                  HOSPITALS
                </button>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Allaboutus;
