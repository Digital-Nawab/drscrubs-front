import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
const SizeChartWomen = ({ hide }) => {
    function Hidden() {
        hide(false);
    }

    const getProductById = useSelector((state) => state.productByID);
    console.log(getProductById);
    const { productDetails, isProductLoading, error } = getProductById;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 5, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="newsletter__popup newsletter__show"
        data-animation="slideInUp"
      >
        <div id="boxes" className="newsletter__popup--inner">
          <button
            className="newsletter__popup--close__btn"
            aria-label="search close button"
            onClick={Hidden}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </button>
          <div className="box newsletter__popup--box d-flex align-items-center">
            <div
              className="newsletter__popup--thumbnail w-100"
              style={{ padding: "23px" }}
            >
              <div className="col-12">
                <div className="text-center mt-3">
                   <div className="card">
                     <div className="card-body">

                     
                      <img src="/assets/img/women.jpg" width="100%" alt="women-top"/>
                      
                     </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default SizeChartWomen;