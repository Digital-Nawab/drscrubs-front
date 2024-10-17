import React from 'react'
import { lazy } from "react";
import './ShippingDelivery.css';
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const ShippingDelivery = () => {
  return (
    
    <>
      <Navbar />
      <div
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
      </div>


      <div className="container mb-5 shipping-policy">
        <div className='section-title'>
          <div className='row'>
            <div className='col-md-1'></div>
            <div className="col-md-10">
              <div className='privacy-text'>
                <h2 className="mt-5 mb-5 text-center">Shipping Policy</h2>
              </div> 
                <ul>
                    <li> Once our system processes your order, your products are put together carefully and packaged after which the shipment goes through a final round of quality check, and is handed over to our trusted delivery partner.</li>
                    <li> Our delivery partners then bring the package to you at the earliest possibility.</li>
                    <li> Dr Scrubs ships throughout India! (Kindly check serviceability of your location at the time of checkout) </li>
                    <li> Once your order has been dispatched, you will receive an email with the details of the tracking number and the courier company that is processing your order.</li>
                    <li> You can track the status of your package after 24 hours, once your order is dispatched from our warehouse.</li>
                    <li> We usually dispatch most orders within 2 business days (excluding Sundays and public holidays)</li>
                    <li> In case a Customer books an order of multiple Products in one transaction, Dr Scrubs India would endeavour to ship all Products together. If a Customer places multiple Products orders in single transaction, then such order will be shipped to a single shipping address but if Customer wishes to ship the order to different addresses, then separate orders should be placed.</li>
                    <li> Dr Scrubs India reserve all the rights to cancel, delay, or recall the order from delivery of the Products, if any fraud is suspected.</li>
                    <li> Dr Scrubs India will make 2 (two) attempts to deliver the Product after which the order will be cancelled and notification to the same effect shall be sent to the Customer. Dr Scrubs India will refund the charged amount on the Order after deducting the shipping charges as per Dr Scrubs India policy.</li>
                    <li> Title to the Products and all risk of loss passes to the Customer upon delivery of the Product to the Customer.</li>
                    <li> Dr Scrubs India will not be responsible for any loss or damage caused to the products during customer’s possession</li>
                    <li> A flat charge of INR 199 is charged for orders within Delhi & NCR region and INR 299 for other cities shall be levied on all orders below the checkout value of INR 2000.</li>
                    <li> Free shipping across India will be auto-applied to all orders exceeding the checkout value of INR 2000. </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    
    </>
  )
}

export default ShippingDelivery