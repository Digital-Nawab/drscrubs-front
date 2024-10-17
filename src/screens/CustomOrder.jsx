import React, { Suspense, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeProduct from '../components/HomeProduct'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Action/getItemAction';
import axios from 'axios';
import BassURl from '../Api/Api';
import { useQuery } from 'react-query';
import { fetchAllProducts } from '../Redux/Action/getAllProductAction';
import { fetchslider } from '../Redux/Action/getSliderAction';
import CustomOrderProduct from './CustomOrderProduct';
import { Link } from 'react-router-dom';
import imageURl from '../Api/ImageUrl';
import { Toaster } from 'react-hot-toast';
import CustomOrderProductModal from '../components/Modal/CustomOrderProductModal';


function CustomOrder() {

    const dispatch = useDispatch();

    // Fetch data using Redux Thunk action
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Access data from Redux store
    const tags = useSelector((state) => state.products);
    const countryData = localStorage.getItem("currency");

    // Fetch data using React Query

    const { data, isLoading, isError } = useQuery("products", () => {
        return axios.get(`${BassURl}/all-tags`);
    });
    // Access fetched data

    // Access data from Redux store

    const Skeleton = () => {
        return <div className="skeleton">{/* Skeleton content */}</div>;
    };

    // api Call slider

    useEffect(() => {
        dispatch(fetchslider());
    }, [dispatch]);

    // Access data from Redux store
    const SliderData = useSelector((state) => state.sliders);
    const { slider, isSliderLoading, error } = SliderData;
    // fetch All Product

    // Fetch data using Redux Thunk action
    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // Access data from Redux store
    const allProducts = useSelector((state) => state.allproducts);
    const { allproducts, isProductLoading, } = allProducts;

    // console.log(allproducts);


    const [colorCode, setcolorCode] = useState('');
    useEffect(() => {

        axios.get(`${BassURl}/product-color/1`).then((res) => {
            return (setcolorCode(res.data.data))
        });

    }, [])
    // console.log(colorCode)

    // Size Chart
    // const [customOrder, SetcustomOrder] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    // update body class when Show changes
    useEffect(() => {
        if (isPopupVisible) {
            document.body.classList.add("overlay__active");
        } else {
            document.body.classList.remove("overlay__active");
        }
    }, [isPopupVisible]);

    const handlePopupDisplay = (product) => {
        setSelectedProduct(product);
        setPopupVisibility(true);
    };

    const handlePopupClose = () => {
        setPopupVisibility(false);
    };



    const [customOrderModalOpen, SetCustomOrderModalOpen] = useState(false);
    // update body class when Show changes
    useEffect(() => {
        if (customOrderModalOpen) {
            document.body.classList.add("overlay__active");
        } else {
            document.body.classList.remove("overlay__active");
        }
    }, [customOrderModalOpen]);


    function OpenCustomModal(product) {
        console.log(product, 'popup')
        SetCustomOrderModalOpen(true);
    }

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
                                        Custom Order
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="">
                        <div className="row">

                            <div className="col-lg-8">
                                <section className="product__section section--padding color-scheme-2 pt-0">
                                    <div className="container-fluid">
                                        <div className="section__heading text-center mb-35">
                                            <h2 className="section__heading--maintitle style2 mt-3">
                                                Look like a Superhero
                                            </h2>
                                        </div>
                                        <div className="product__section--inner">
                                            <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
                                                {
                                                    isProductLoading ? (<>
                                                        <div className="" role="">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </>) : (

                                                        <>

                                                            {allproducts &&
                                                                allproducts?.map((product, index) => {

                                                                    return (
                                                                        <>
                                                                            <div key={index}>
                                                                                <Suspense
                                                                                    fallback={
                                                                                        <>

                                                                                        </>
                                                                                    }
                                                                                >
                                                                                    <CustomOrderProduct key={product?.id} product={product} onClick={() => OpenCustomModal(product)} />

                                                                                </Suspense>
                                                                            </div>
                                                                        </>
                                                                    );
                                                                })}



                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="col-lg-4 white-bg">
                                <div>
                                    <div className="EmptyCart text-center mt-5">
                                        <h4 className="EmptyCartPara m-2"><u> Add Some Custom Order To Your Cart</u></h4>


                                        <img
                                            src="/assets/img/no-cart.gif"
                                            className="EmptyCartImg"
                                            alt=""

                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        <Footer />
    </>
    )
}

export default CustomOrder