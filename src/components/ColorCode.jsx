import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BassURl from '../Api/Api';
import imageURl from "../Api/ImageUrl";

function ColorCode({ colorActive, color }) {
    // console.log(color)




    // const [colorCode, setcolorCode] = useState('');
    // useEffect(() => {

    //     axios.get(`${BassURl}/product-details/${color}`).then((res) => {
    //         return (setcolorCode(res.data.data))
    //     })
    // }, []);
    // console.log(colorCode);





    return (
        <>

            {color && color?.map((items, index) => {

                if (items?.color_name === colorActive) {
                    return (<>

                        <input
                            className="color-red"
                            id="color-red1"
                            name="color"
                            type="radio"
                            defaultChecked=""
                        />
                        <label
                            className="variant__color--value color-active red"
                            htmlFor="color-red1"
                            title={`${items?.color_name}`}
                        >
                            <a href={`/product-details/${items?.product_url}?color=${items?.color_url}`} target="_blank" className="">
                                {/* <i className="fa fa-2x fa-circle" style={{ color: `${items?.image}`, border: '1px solid black', borderRadius: "50% 50%" }}>

                                </i> */}
                                <img src={`${imageURl}/${items?.image}`} style={{width:'80px', height:'44px'}} alt=""/>
                            </a>
                        </label >
                    </>)


                } else {
                    return (<>


                        <input
                            className=""
                            id="color-red1"
                            name="color"
                            type="radio"
                            defaultChecked=""
                        />
                        <label
                            className="variant__color--value color-red red"
                            htmlFor="color-red1"
                            title={`${items?.color_name}`}
                        >
                            <a href={`/product-details/${items?.product_url}?color=${items?.color_url}`} >
                                {/* <i className="fa fa-2x fa-circle" style={{ color: `${items?.color_code}`, border: '1px solid black', borderRadius: "50% 50%" }}></i> */}
                                <img src={`${imageURl}/${items?.image}`} alt=""/>

                            </a>
                        </label>

                    </>)

                }






            })}



        </>
    )
}

export default ColorCode