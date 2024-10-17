import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BassURl from '../Api/Api';
import imageURl from '../Api/ImageUrl';
import OrderProductDetailsEmboidery from './OrderProductDetailsEmboidery';

function OrderProductDetails() {
    const { order_id } = useParams();
    //console.log(order_id);

    const [OrderData, setOrderData] = useState('');
    // https://drscrubsadmin.digitalnawab.com/api/user/order-item/DSO-231
    useEffect(() => {
        axios.get(`${BassURl}/user/order-item/${order_id}`).then((res) => {
            setOrderData(res.data)

        }).catch((error) => {
            console.log(error)
        })
    }, []);
    //console.log(OrderData);
    const Client_id = JSON.parse(localStorage.getItem("userData"));




    const [orderInvoice, setOrderInvoice] = useState('');
    useEffect(() => {

        axios.get(`${BassURl}/user/order-invoice/${order_id}`).then((res) => {
            setOrderInvoice(res.data.data.order);
            //console.log(res.data.data.order);
        })

    }, []);
    //console.log(orderInvoice);



    return (
        <>

            <Navbar />
            <main className="main__content_wrapper">
                <section className="breadcrumb_section breadcrumb__about_bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__content--title text-white mb-25">
                                        Order Details

                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {
                OrderData && OrderData?.code === 200 ? (<>
                    <div className="container mt-4 p-5">
                        {/* start page title */}
                        {/* end page title */}
                        <div>
                            {/* start page title */}

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        {/* <div className="card-header">
                                            <div className="d-flex">
                                                <h5 className="card-title flex-grow-1 mb-0">Delivery Address</h5>
                                            </div>
                                        </div> */}
                                        <div className="card-body p-4">
                                            <div className='row'>
                                                <div className='col-md-5'>
                                                    <h4 className="card-title flex-grow-1 mb-2">Delivery Address</h4>
                                                    <h6 className="fs-14 mb-1">{orderInvoice.first_name} </h6>
                                                    <p>{orderInvoice.locality} {orderInvoice.address} {orderInvoice.city} {orderInvoice.zip} <br/> 
                                                     {orderInvoice.state} {orderInvoice.country}
                                                    </p>
                                                </div>
                                                <div className='col-md-5'>
                                                    <h4 className="card-title flex-grow-1 mb-2">Contact Detail</h4>
                                                    <p><i className="fa fa-envelope align-middle text-muted fs-16 me-2" aria-hidden="true" /> {orderInvoice.email}</p>
                                                    <p><i className="fa fa-phone me-2 align-middle text-muted fs-16" aria-hidden="true" /> {orderInvoice.mobile}</p>
                                                </div>
                                                <div className='col-md-2'>
                                                    {/* <h4 className="card-title flex-grow-1 mb-2">More actions</h4>
                                                    <p>
                                                    <a
                                                        href={/invoice/${order_id}}
                                                        target="_blank"
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        <i className="ri-download-2-fill align-middle me-1" /> Invoice
                                                    </a>
                                                    </p> */}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            {/* end page title */}
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="d-flex align-items-center">
                                                <h5 className="card-title flex-grow-1 mb-0">
                                                    Order ID : { order_id }
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive table-card">
                                                <table className="table table-nowrap align-middle table-borderless mb-0">
                                                    <thead className="table-light text-muted">
                                                        <tr>
                                                            <th scope="col">Product Details</th>
                                                            <th scope="col">Item Price</th>
                                                            <th scope="col">Add On</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col" className="text-end">
                                                                Total Amount
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            OrderData?.data?.map((items, index) => {
                                                                return (<>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex">
                                                                                <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                                                                                    <img
                                                                                        src={`${imageURl}/${items?.product_image}`}
                                                                                        alt=""
                                                                                        className="img-fluid d-block"
                                                                                    />
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-3">
                                                                                    <h5 className="fs-15">

                                                                                        {items?.product_name}

                                                                                    </h5>
                                                                                    {items?.color && (
                                                                                    <p className="text-muted mb-0">
                                                                                        Color : <span className="fw-medium">{items?.color}</span>
                                                                                    </p>
                                                                                    )}
                                                                                    {items?.size !=='""' && (
                                                                                    <p className="text-muted mb-0">
                                                                                        Size : <span className="fw-medium">{items?.size}</span>
                                                                                    </p>
                                                                                    )}
                                                                                   
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>{items?.item_currency === "INR" ? '₹' : '$'} {items?.price}</td>
                                                                        <td>{

                                                                            <OrderProductDetailsEmboidery data={items?.emboidery} />
                                                                        }</td>
                                                                        <td>{items?.qty}</td>
                                                                        <td className="fw-medium text-end">{items?.item_currency === "INR" ? '₹' : '$'} {items?.total_price}</td>
                                                                    </tr>
                                                                </>)
                                                            })
                                                        }
                                                        <tr className="border-top border-top-dashed">
                                                            <td colSpan={3} />
                                                            <td colSpan={2} className="fw-medium p-0">
                                                                <table className="table table-borderless mb-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Sub Total :</td>
                                                                            <td className="text-end">{orderInvoice.currency === "INR" ? '₹' : '$'}  {OrderData?.data?.reduce((acc, curr) => acc + parseFloat(curr.total_price), 0)} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Shipping Charge :</td>
                                                                            <td className="text-end">{orderInvoice.currency === "INR" ? '₹' : '$'}  {orderInvoice.delivery_fee}</td>
                                                                        </tr>
                                                                        {orderInvoice.coupon_amount && (
                                                                            <tr>
                                                                                <td>Coupon Discount :</td>
                                                                                <td className="text-end">{orderInvoice.currency === "INR" ? '₹' : '$'}  {orderInvoice.coupon_amount}</td>
                                                                            </tr>
                                                                        )}
                                                                        <tr className="border-top border-top-dashed">
                                                                            <th scope="row">Total :</th>
                                                                            <th className="text-end">{orderInvoice.currency === 'INR' ? '₹' : '$'} {orderInvoice.paid_amount}</th>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            
                        </div>
                        {/* container-fluid */}
                    </div>
                </>) : (<>

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 text-center mt-5">
                                <img
                                    src="/assets/img/dataImage/nodata.webp"
                                    alt=""
                                    srcset=""
                                />
                                <h2>No Data Found</h2>
                            </div>
                        </div>
                    </div>
                </>)
            }
            <Footer />
        </>
    )
}

export default OrderProductDetails;