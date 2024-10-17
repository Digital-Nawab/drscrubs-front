import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../Redux/Action/CartAction';
import axios from 'axios';
import BassURl from '../Api/Api';
import { Toaster } from 'react-hot-toast';
import imageURl from '../Api/ImageUrl';
import { Link } from 'react-router-dom';
import CustomOrderProductModal from '../components/Modal/CustomOrderProductModal';

function CustomOrderProduct({ product }) {

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    function addtocart() {
        dispatch(addToCartAction(data, qty));
    }
    const cartreducerstate = useSelector((state) => state.addToCartReducer);
    const { cartItems } = cartreducerstate;


    const countryData = JSON.parse(localStorage.getItem("currencyTop"));
    console.log(countryData)

    // productColor

    // const [colorCode, setcolorCode] = useState('');
    // useEffect(() => {

    //     axios.get(`${BassURl}/product-color/1`).then((res) => {
    //         return (setcolorCode(res.data.data))
    //     })
    // }, []);
    // console.log(colorCode)

    // Size Chart
    const [customOrderModalOpen, SetCustomOrderModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // update body class when Show changes
    useEffect(() => {
        if (customOrderModalOpen) {
            document.body.classList.add("overlay__active");
        } else {
            document.body.classList.remove("overlay__active");
        }
    }, [customOrderModalOpen]);


    function OpenCustomModal() {
        SetCustomOrderModalOpen(true);
    }

    return (
        <>

            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <div className="col mb-30">
                <div className="product__items new-product">
                    <div className="product__items--thumbnail">
                        <a className="product__items--link" onClick={OpenCustomModal}>
                            <img
                                className="product__items--img product__primary--img"
                                src={`${imageURl}/${product?.image}`}
                                alt="product-img"
                            />
                            <img
                                className="product__items--img product__secondary--img"
                                src={`${imageURl}/${product?.image}`}
                                alt="product-img"
                            />
                        </a>
                        {/* <div className="product__badge">
                            <span className="product__badge--items sale">Sale</span>
                        </div> */}
                        <Link
                            className="product__add-to__cart--btn__style2" style={{minHeight:'60px',height:'60px'}}
                            onClick={OpenCustomModal}
                        >

                            <span className="add__to--cart__text">
                                <Link className='productClick' onClick={OpenCustomModal}>{product?.product_title_eng} - {product?.color_name}</Link>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>


            {customOrderModalOpen ? (
                <Suspense
                    fallback={
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                >
                    <CustomOrderProductModal
                        data={product?.product_url}
                        hide={SetCustomOrderModalOpen}
                    />
                </Suspense>
            ) : null}





        </>
    )
}

export default CustomOrderProduct