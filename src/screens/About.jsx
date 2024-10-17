import React from "react";
import { lazy } from "react";
import './About.css'
//import { FaBeer } from 'react-icons/fa';
// import Navbar from "../components/Navbar";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

function About() {
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
                    About Us
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ***************ROW-1*************** */}
        <section className="about__section section--padding mb-95 pt-10">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about__thumb">
                  <div className="">
                    <img
                      className="about__thumb--img border-radius-5 display-block w-100 h-25"
                      src="/assets/img/about-scrub1.jpg"
                      alt="about-thumb"
                    />
                  </div>

                </div>
              </div>
              <div className="col-lg-6">
                <div className="about__content">
                  <span className="about__content--subtitle text__secondary mb-10">
                    {" "}
                    About Dr Scrubs
                  </span>
                  <p>
                    Dr. Scrubs™ concept of designer and colourful yet perfect fit for Medical professionals was launched in 2012 by Design Resource India Private Limited, the pioneers of starting coloured medical clothing line in Indian Medical & Dental Industry.
                  </p>
                  <p>
                    Successfully establishing the Brand in Medical & Dental Industry and proud to have our ever-growing list of esteemed customers who showered their blessing to our product and due to them we have been able to reach today where we are!!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ************ROW-1 Finish************ */}


        {/* *************** NEW 2**************** */}
        <section className="about__section">
          <div className="container">
            <div className="row align-items-center">

              <div className="col-lg-6">
                <div className="about__content">
                  <p>

                    Under the dynamic leadership of Mr. Sachin Sharma (NIFT and MBA), our team's continuous efforts, guided by the blessings of our customers, have firmly established us in the Indian Medical & Dental community. Today, DR.SCRUBS extends its reach to countries like Australia, New Zealand, the US, and several European countries and Israel. We've garnered appreciation from leading medical practitioners in Delhi and across India during various conferences. A big thank you to all our visitors for contributing to our success!

                  </p>
                  <p>
                    In response to the transformative phase in Indian Medical Industry, we introduced our Professional Clothing Line, DR.SCRUBS, to grace Indian Medical Practitioners. DESIGN RESOURCE INDIA PRIVATE LIMITED made this decision in 2012. Our tagline since December 2012 is, "It's not just a white coat."
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about__thumb">
                  <div className="">
                    <img
                      className="about__thumb--img border-radius-5 display-block w-100 h-25"
                      src="/assets/img/about-scrub2.jpg"
                      alt="about-thumb"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ********NEW FINISH 2************* */}


        {/* ***************ROW-3*************** */}
        <section className="about__section section--padding mb-95">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="about__content">
                  <span className="about__content--subtitle text__secondary mb-10">
                    {" "}
                    Why to Use DR.SCRUBS:
                  </span>
                  <p>
                    <img src="/assets/img/check-mark.jpeg" className="icon" alt="" /> &nbsp;
                    DR.SCRUBS is made out from cotton & blended fabric, directly from the Source as per the International quality guidelines.
                  </p>
                  <p>
                    <img src="/assets/img/check-mark.jpeg" className="icon" alt="" /> &nbsp;
                    The other important aspect is the Fit, which follows your movements while at work and makes you feel comfortable.
                  </p>
                  <p>
                    <img src="/assets/img/check-mark.jpeg" className="icon" alt="" /> &nbsp;
                    The innovative introduction of fashion at work.
                  </p>
                  <p>
                    <img src="/assets/img/check-mark.jpeg" className="icon" alt="" /> &nbsp;
                    DR.SCRUBS is the First Brand one in India introducing colour and Fashionably Crafted Professional Clothing.
                  </p>
                  <p>
                    <img src="/assets/img/check-mark.jpeg" className="icon" alt="" /> &nbsp;
                    DR.SCRUBS is the First one in India to produce styles suitable for all body types. DR.SCRUBS also provides the tailor-made
                    solutions in styles as per the users' needs. We proudly announce to launch some more articles soon with more aesthetic and quality to further complete our range of DR.SCRUBS(Clinical Dresses) and Trends (Clinical and Administrative Staff), as per the feedback received in these years of retailing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ************ROW-3 Finish************ */}


        <section className="bg-gray" style={{ borderBottom: "1px solid black" }}>
          <div className="container">
            <div className="row">
              <h2 className="mt-5 text-center">OUR PHILOSOPHY</h2>
              <p className="text-justify">
                We have always aspired to create a company where talented
                individuals collaborate to deliver extraordinary results that
                reflect the values we place on diverse opinions, experiences and
                backgrounds. Our guiding principles are present in every
                decision and essential to our journey of becoming a responsible
                brand: Featuring elevated design, advanced fabrics, concierge
                service, a strong commitment to our people, and a responsibility
                to our environment.
              </p>
            </div>

            <div className="row p-5">
              <div className="col-lg-6">
                <div className="cards">
                  <img
                    src="/assets/img/fabric.jpg"  alt="Febric"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      {" "}
                      <span style={{ borderBottom: "1px solid black" }}>
                        Fabric
                      </span>{" "}
                    </h2>
                    <p className="cards-text">
                      When you put it on for the first time, you will feel the
                      difference. We have spent over ten years developing and
                      fine-tuning our proprietary fabric, and the countless
                      hours in research and testing is fundamental to the value
                      of our products. The result is cutting-edge performance
                      that enables our customer to excel at their work.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cards">
                  <img
                    src="/assets/img/fit.jpg"
                    alt="First Image"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      <span style={{ borderBottom: "1px solid black" }}>
                        Fit
                      </span>
                    </h2>
                    <p className="cards-text">
                      We have taken the traditional medical uniform and upgraded
                      it in every conceivable way. The result is a
                      sophisticated, tailored garment that exudes confidence and
                      professionalism. Gender-specific, slimming, and tasteful,
                      our uniforms provide a polished appearance paired with an
                      ideal range of motion.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-5">
                <div className="cards">
                  <img
                    src="/assets/img/function.jpg"
                    alt="First Image"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      <span style={{ borderBottom: "1px solid black" }}>
                        Function
                      </span>
                    </h2>
                    <p className="cards-text">
                      With years spent on research, development and testing, our
                      proprietary fabric technology keeps you cool, dry and
                      comfortable under pressure, with an exterior that repels
                      fluid, soil, and stains. Our innovative performance fabric
                      has the highest possible rating in the industry when
                      tested for strength, soil release, and fluid repellency,
                      which is why we proudly back up our warranty for a full
                      year. .
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-5">
                <div className="cards">
                  <img
                    src="/assets/img/embroidery.jpg"
                    alt="Embroidery"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      <span style={{ borderBottom: "1px solid black" }}>
                        Embroidery
                      </span>
                    </h2>
                    <p className="cards-text">
                      Wear your credentials proudly using our exceptional
                      in-house embroidery services. With an unrivaled level of
                      excellence and quality, our team of experts conveniently
                      provide custom name and title or logo embroidery for a
                      personalized, impressive uniform that speaks to your
                      professionalism and prestige.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                <a href="bulk-order" class="newsletter__popup--subscribe__btn">
                  GROUPS
                </a>
              </div>
              <div className="col-lg-3">
                <a href="bulk-order" class="newsletter__popup--subscribe__btn">
                  HOSPITALS
                </a>
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

export default About;
