import React from 'react'

function OrderProductDetailsEmboidery({ data }) {


    const embroidery = JSON.parse(data);
    console.log(embroidery)


    return (
        <>
            {
                embroidery?.length > 0 ? (<>
                    {
                        embroidery?.map((data, index) => {
                            return (<> <p>Type : {data?.type} <br />
                                IconPlacement : {data?.iconPlacement} <br/>
                                Price :{data?.price}
                            </p>
                             



                            </>)

                        })
                    }





                </>) : (<>

                    <h5>No Add On</h5>





                </>)
            }






























        </>
    )
}

export default OrderProductDetailsEmboidery