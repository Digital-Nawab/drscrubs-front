import React from 'react'
import { lazy } from "react";
import './ShippingDelivery.css';
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const ReturnsExchanges = () => {
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
                <h2 className="mt-5 mb-4 text-center">Refunds & Cancellations</h2>
              </div>
              {/* <h3 className='mb-2 text-center'>Return, Refund & Exchange Policy</h3> */}
              <h3 className='mb-2'>Let us walk you through the Return, Refund & Exchange process:-</h3>
              <ul>
                 <li> You can submit your return or exchange request within 7 days from the date of delivery via Our Support helpline Contact No :+91 87429 11972 or Emails us at support@drscrubs.in.</li>
                 <li> Our team shall review and approve your request within two working days</li>
                 <li> After reviewing your request, our team will organize pickup for the item. Our logistics partner will pick up the item within 7 working days.</li>
                 <li> In case our reverse pickup service is not available at your location, we request you to self-ship the product via any reliable courier service and we shall ship the exchange product to you or process your refund based on your request.</li>
                 <li> After receipt of your item at the warehouse, the item undergoes quality checks and refunds are initiated within 7-10 working days.</li>
                 <li> Please handover the product for which the returns / exchange request is placed.</li>
                 <li> Please note it usually takes 21 working days for the whole process. Looking forward to working with you through this process to help ensure a seamless experience!</li>
                 <li> Please Note: Returns and Refunds for items purchased during a sale period can be availed through store credit.</li>
                 <li> We request your patience during this journey, our team is working hard to process your request at the earliest. Please note that the exchange will depend on availability of the stock or we can notify once the exchange product required by you is in stock.</li>
                 <li> For any additional queries, please write to us at  <a href="support@drscrubs.in ">support@drscrubs.in</a> or Whatsapp us on +91 87429 11972.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ReturnsExchanges