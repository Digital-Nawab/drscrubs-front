import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import BassURl from '../Api/Api';
import imageURl from '../Api/ImageUrl';
import './Invoice.css';

function Invoice() {
    const { order_id } = useParams();
    const [orderInvoice, setOrderInvoice] = useState('');
    const [embroidery, setEmbroidery] = useState('');
    const countryData = JSON.parse(localStorage.getItem('currencyTop')); 

    useEffect(() => {
        axios.get(`${BassURl}/user/order-invoice/${order_id}`).then((res) => {
            setOrderInvoice(res.data.data);
            console.log(res.data.data.order);
            const embroideryData = res.data.data.order_item.map((item) => JSON.parse(item.emboidery));
            setEmbroidery(embroideryData);
        });
    }, [order_id]);
    
    // console.log(orderInvoice);
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div id="invoice">
                <div className="invoice overflow-auto">
                    <div style={{ minWidth: 600 }}>
                        <header>
                            <div className="row">
                                <div className="col">
                                    <a target="_blank" href="/">
                                        <h2>DRSCRUBS</h2>
                                    </a>
                                </div>
                                <div className="col company-details">
                                    <h2 className="name">
                                        <a target="_blank" href="/">
                                            Design Resource India Pvt Ltd
                                        </a>
                                    </h2>
                                    <div>
                                        Tapasya Corp heights, Sales office at Ground floor, Sector 126, Noida, Uttar Pradesh 201303.
                                    </div>
                                    <div>Phone no.: +918287589790</div>
                                    <div>Email: drscrubscustomercare@gmail.com</div>
                                    <div>GSTIN: 09AAECD3279P1ZZ</div>
                                </div>
                            </div>
                        </header>
                        <main>
                            <div className="row contacts">
                                <div className="col invoice-to">
                                    <div className="text-gray-light">INVOICE TO:</div>
                                    <h2 className="to">
                                        {orderInvoice?.order?.first_name} {orderInvoice?.order?.last_name}
                                    </h2>
                                    <div className="address">{orderInvoice?.order?.location}</div>
                                    <div>{orderInvoice?.order?.locality}</div>
                                    <div>{orderInvoice?.order?.address}</div>
                                    <div>Contact No.: {orderInvoice?.order?.mobile}</div>
                                    <div className="email">
                                        <a href={`mailto:${orderInvoice?.order?.email}`}>{orderInvoice?.order?.email}</a>
                                    </div>
                                </div>
                                <div className="col invoice-details">
                                    <h1 className="invoice-id">INVOICE</h1>
                                    <h4 className="text-muted">
                                        Invoice no: {orderInvoice?.order?.invoice_id}
                                        <br />
                                        Date: {orderInvoice?.order?.date_time}
                                        <br />
                                        Razorpay Payment ID: {orderInvoice?.order?.razorpay_payment_id}
                                    </h4>
                                </div>
                            </div>
                            <table border={0} cellSpacing={0} cellPadding={0}>
                                <thead>
                                    <tr>
                                        <th>Sl.</th>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Product name</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Embroidery Price</th>
                                        <th className="text-center">Embroidery Icon</th>
                                        <th className="text-center">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderInvoice?.order_item?.map((data, index) => (
                                        <tr key={index}>
                                            <td className="no text-center">{index + 1}</td>
                                            <td className="text-center">
                                                <img src={`${imageURl}/${data?.product_image}`} width="60px" alt={data?.product_name} />
                                            </td>
                                            <td className="text-center unit">{data?.product_name}</td>
                                            <td className="text-center qty">{data?.qty}</td>
                                            <td className="text-center qty">
                                                {data.item_currency === 'INR' ? `₹ ${data?.price}` : `$ ${data?.price}`}
                                            </td>
                                            <td className="text-center qty">
                                                {data?.emboidery_price === '0'
                                                    ? 'no-data'
                                                    : data.item_currency === 'INR'
                                                    ? `₹ ${data?.emboidery_price}`
                                                    : `$ ${data?.emboidery_price}`}
                                            </td>
                                            <td className="text-center qty">
                                                {embroidery.map((item, embIndex) => (
                                                    <div key={embIndex} style={{ marginBottom: '10px' }}>
                                                        {data.emboidery === '""' ? 'no-data' : <img src={item?.icon} width="30px" alt="Embroidery Icon" />}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="text-center total">
                                                {data.item_currency === 'INR' ? `₹ ${data?.total_price}` : `$ ${data?.total_price}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5} />
                                        <td colSpan={2} className="text-right">Subtotal</td>
                                        <td className="text-right">
                                            {countryData === 'INR' ? `₹ ${orderInvoice?.order?.bill_amount}` : `$ ${orderInvoice?.order?.bill_amount}`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} />
                                        <td colSpan={2} className="text-right">Delivery Fee</td>
                                        <td className="text-right">
                                            {countryData === 'INR' ? `₹ ${orderInvoice?.order?.delivery_fee}` : `$ ${orderInvoice?.order?.delivery_fee}`}
                                        </td>
                                    </tr>
                                    {orderInvoice?.order?.coupon_amount && (
                                        <tr>
                                            <td colSpan={5} />
                                            <td colSpan={2} className="text-right">Coupon Amount</td>
                                            <td className="text-right">
                                                {countryData === 'INR' ? `- ₹ ${orderInvoice?.order?.coupon_amount}` : `- $ ${orderInvoice?.order?.coupon_amount}`}
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan={5} />
                                        <td colSpan={2} className="text-right">Total</td>
                                        <td className="text-right">
                                            {countryData === 'INR' ? `₹ ${orderInvoice?.order?.paid_amount}` : `$ ${orderInvoice?.order?.paid_amount}`}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </main>
                    </div>
                </div>
                <div className="print-button-container text-center">
                    <button onClick={handlePrint} className="btn btn-primary">Print Invoice</button>
                </div>
            </div>
        </>
    );
}

export default Invoice;
