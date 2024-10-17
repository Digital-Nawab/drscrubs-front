import React from 'react'

function EmboideryAdded({ emboideryData }) {
    console.log(emboideryData);
    return (
        <>
            <h5 class="fs-4 lh-base mb-2">Emboidery logo</h5>
            
                {emboideryData?.map((data, index) => {
                    return (<>
                       {data?.icon ? (
                            <>
                            <p> <img src={data.icon} width="50px" alt="logo" /></p>
                            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                            </>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                        )}
                    </>)
                    })
                }
        </>
    )
}

export default EmboideryAdded;