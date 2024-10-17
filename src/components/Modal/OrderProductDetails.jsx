import React from 'react';
import { motion } from "framer-motion";
import imageURl from '../../Api/ImageUrl';
import EmbroideryTable from '../EmbroideryTable';

function OrderProductDetails({ hide, data }) {
    function Hidden() {
        hide(false);
    }
    console.log(data)





    return (
        <>

            <motion.div
                initial={{ opacity: 0, y: 1 }}
                animate={{ opacity: 5, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="newsletter__popup newsletter__show"
                data-animation="slideInUp"
            >
                <div id="boxes" className="newsletter__popup--inner orderProductDiv">
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
                    <div className="box newsletter__popup--box">

                        <div className="">
                            <div className="dashboard-order text-center">
                                <div className="title p-4">
                                    <h3>My Orders History</h3>
                                </div>
                                <div className="container">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="panel1">

                                                    <div className="panel-body1 table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Product Name</th>
                                                                    <th>Size</th>
                                                                    <th>emboidery</th>
                                                                    <th>Total Price</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    data?.map((item, index) => {
                                                                        return (<>

                                                                            <tr>
                                                                                <td>{index + 1}</td>
                                                                                <td>
                                                                                    <div className="user_icon">
                                                                                        <img className='' src={`${imageURl}/${item?.product_image}`} alt="" />
                                                                                    </div>
                                                                                    {item?.product_name}
                                                                                </td>
                                                                                <td>{item?.size}</td>
                                                                                <td>
                                                                                    <EmbroideryTable embroideryData={item?.emboidery} />
                                                                                </td>
                                                                                <td>
                                                                                    {item?.total_price}
                                                                                </td>
                                                                                <td>


                                                                                    {
                                                                                        item?.status === 'deliver' ? (<>


                                                                                            <span class="label label-success">Deliver</span>



                                                                                        </>)

                                                                                            :


                                                                                            (<></>)
                                                                                    }


                                                                                </td>
                                                                            </tr>


                                                                        </>)
                                                                    })
                                                                }





                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
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

export default OrderProductDetails