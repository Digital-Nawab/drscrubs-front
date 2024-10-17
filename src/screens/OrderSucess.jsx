import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

function OrderSucess() {
    const order_id = JSON.parse(localStorage.getItem('pay-order'));
    console.log(order_id)
    return (
        <>

            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <img className='w-25' src="/assets/order.gif" alt="" />
                    </div>
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h3>Your order has been processed successfully</h3>
                            <h5 className='p-2'>
                                Your order number is {order_id}
                            </h5>
                            <p>You will receive an email confirmation shortly.</p>
                        </div>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="text-center">
                            {/* <h3>    <Link to={`/invoice/${order_id}`} style={{ textDecoration: "underline" }}><i className="fa fa-download" aria-hidden="true" />
                                Invoice
                            </Link>
                            </h3> */}
                            <div class="product__variant--list mb-15 text-center p-3 "><a  href="/" class="variant__buy--now__btn primary__btn ">CONTINUE SHOPPING</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderSucess