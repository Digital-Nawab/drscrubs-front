import React from "react";
import { motion } from "framer-motion";

function ShoulderModal({ hide }) {
  function Hidden() {
    hide(false);
  }

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
            <div className="newsletter__popup--thumbnail">
              <div className="text-center mt-3">
                <h3>How to Measure ?</h3>
              </div>

              <img
                className="newsletter__popup--thumbnail__img display-block"
                src="https://www.eshakti.com/images/MHTM_Shoulder-to-Shoulder.jpg"
                alt="newsletter-popup-thumb"
              />
            </div>
            <div className="newsletter__popup--box__right">
              <div className="info-wrp pl-md-4 ml-md-2 pt-4 pt-md-0">
                <h5 id="measureName">Shoulder</h5>
                <p className="sub-text" id="measureText">
                  This is one that may be easier with the help of a friend.
                  Measure across your upper back from the tip of one shoulder to
                  the tip of the other. Try not to hunch over.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ShoulderModal;
