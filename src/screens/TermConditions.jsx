import React from 'react'
import { lazy } from "react";
import './TermConditions.css';
// import HomeSlider from '../screens/HomeSlider';
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));


const TermConditions = () => {
  return (
    <>
      <Navbar />

      {/* <div> 
      <img src="public\assets\img\banner\banner-1.webp" alt="" />
    </div> */}

      {/* <div
          className="counterup__banner--section counterup__banner__bg2"
          id="funfactId"
        >
          <div className="container">
            <div className="row row-cols-1 align-items-center">
              <div className="col-lg-12 text-center">
                <div className="counterup__banner--inner position__relative ">
                  <div className="counterup__banner--items text-center">
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div> */}


      <div className="breadcrumb__section breadcrumb__about_bg"></div>
      <div className="container">
        <div className='section-title'>
          <div className='row'>
            <div className='col-md-1'></div>
            <div className="col-md-10">
              <div className='privacy-text'>
                <h2 className="breadcrumb__content-title text-black mt-3 mb-4 text-center">Terms and Conditions</h2>
              </div>
              <div className='privacy-text mt-2'></div>
              <p className='md-1-let'>
                This website is operated by Design Resource India Pvt Ltd. Throughout the site, the terms “we”, “us” and “our” refer to Design Resource India Pvt Ltd offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here. 
              </p>
              <p className='md-1-let'>
                By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content. 
              </p>
              <p className='md-1-let'> 
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service. 
              </p>
              <p className='md-1-let'> 
                Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes. 
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
    <Footer />
    </>
  )
}

export default TermConditions;