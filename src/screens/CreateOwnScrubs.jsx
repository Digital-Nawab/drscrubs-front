import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreateOwnScrubs() {
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
                    Make Your Own Scrubs
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact__section section--padding">
          <div className="container">
            {/* <div className="section__heading text-center mb-40">
              <h2 className="section__heading--maintitle">Get In Touch</h2>
            </div> */}
            <div className="main__contact--area position__relative">
              <div className="contact__form">
                <h3 className="contact__form--title mb-40">Contact Me</h3>
                <form className="contact__form--inner" action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label classname="contact__form--label" htmlfor="input1">
                          Gender
                          <span classname="contact__form--label__star">*</span>
                        </label>


                        <select className="contact__form--input">
                          <option value="">Select</option>
                          <option value="option1">Men</option>
                          <option value="option2">Women</option>

                        </select>



                        {/* <input
                          className="contact__form--input"
                          name="firstname"
                          id="input1"
                          placeholder="Your First Name"
                          type="text"
                        /> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label classname="contact__form--label" htmlfor="input1">
                          Fabric Type
                          <span classname="contact__form--label__star">*</span>
                        </label>


                        <select className="contact__form--input">
                          <option value="">Select</option>
                          <option value="option1">2 Way Stretchable </option>
                          <option value="option2">2 way Strechable (+Rs 1,200.00)</option>

                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-6">

                      <div className="d-flex">
                        <span
                          className="select-label fnt-xs my-auto mr-md-4 mr-3"
                          style={{ fontWeight: "600" }}
                        >
                          Select Size :
                        </span>

                        <ul
                          className="nav nav-pills mb-3  d-flex justify-content-xl-between  size_option"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li
                            className="nav-item size_padding"
                            role="presentation"
                          >
                            <a
                              href=""
                              className="nav-link active"
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              {" "}
                              Standard Size
                            </a>
                            {/* <label>
                            <input
                              className="gx-5"
                              type="radio"
                              name="options"
                              id="option1"
                            />
                            Standard Size
                          </label> */}
                          </li>
                          <li className="nav-item" role="presentation">
                            <a
                              className="nav-link"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="pills-profile"
                              aria-selected="false"
                            >
                              Custome Size
                            </a>
                          </li>
                        </ul>
                      </div>








                      {/* <div className="contact__form--list mb-20">
                        <label className="contact__form--label" htmlFor="input3">
                          Phone Number{" "}
                          <span className="contact__form--label__star">*</span>
                        </label>
                        <input
                          className="contact__form--input"
                          name="number"
                          id="input3"
                          placeholder="Phone number"
                          type="text"
                        />
                      </div> */}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="contact__form--list mb-20">
                        <label className="contact__form--label" htmlFor="input4">
                          Email <span className="contact__form--label__star">*</span>
                        </label>
                        <input
                          className="contact__form--input"
                          name="email"
                          id="input4"
                          placeholder="Email"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="contact__form--list mb-15">
                        <label className="contact__form--label" htmlFor="input5">
                          Write Your Message{" "}
                          <span className="contact__form--label__star">*</span>
                        </label>
                        <textarea
                          className="contact__form--textarea"
                          name="message"
                          id="input5"
                          placeholder="Write Your Message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="contact__form--btn primary__btn" type="submit">
                    Submit Now
                  </button>
                </form>
              </div>
              {/* <div className="contact__info border-radius-5">
                <img src="/assets/img/scrubs.webp" alt="" />

              </div> */}
            </div>
          </div>
        </section>





      </main>
      <Footer />
    </>
  );
}

export default CreateOwnScrubs;
