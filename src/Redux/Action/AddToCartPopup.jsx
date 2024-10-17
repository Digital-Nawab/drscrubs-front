import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddToCartPopup = ({ isOpen, onClose, popupTitle, popupPrice, popupImage,popupPriceDollar }) => {
    const countryData = JSON.parse(localStorage.getItem('currencyTop'));
    //console.log(countryData);
    useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        onClose(); 
      }, 8000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose, popupTitle, popupPrice, popupImage, popupPriceDollar]);

  return (
    <>
      {isOpen && (
        <div className="updated-modal-overlay">
          <div className="add-to-cart-popup right-side">
            <div className="row align-items-center">
                <div className="col-md-4 p-0">
                   <img src={popupImage} alt="" style={{ width:"50px", hight:'50px', margin:'0 auto' }}/>
                </div>
                <div className="col-md-8 p-0">
                <h5 className="p-0 m-0 text-white" style={{ color: '#2e3257', fontSize:'14px'}}> Product added to cart</h5>
                <p className="p-0 m-0 text-white" style={{ fontSize:'12px'}}> {popupTitle}</p>
                </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCartPopup;
