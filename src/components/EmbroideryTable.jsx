import React from 'react'

function EmbroideryTable({ embroideryData }) {
    // Parse the embroidery data
    const embroideryList = JSON.parse(embroideryData);
    console.log(embroideryList)

    // Define table headers
    // const tableHeaders = ['Type', 'Icon Placement', 'Icon', 'Price', 'Upload'];
    // // Create table rows
    // const tableRows = embroideryList.map((embroidery, index) => (
    //     <tr key={index}>
    //         <td>{embroidery.type}</td>
    //         <td>{embroidery.iconPlacement}</td>
    //         <td>
    //             <img src={embroidery.icon} alt="Embroidery Icon" />
    //         </td>
    //         <td>{embroidery.price}</td>
    //         <td>{embroidery.upload}</td>
    //     </tr>
    // ));

    return (
        <>
            {
                embroideryList?.map((data, index) => {
                    return (<>
                        <ul>
                            <li style={{padding:'10px'}}>Type : {data?.type}</li>
                            <li style={{padding:'10px'}}>Icon Placement : {data?.iconPlacement}</li>
                            <li style={{padding:'10px'}}>Icon : <img src={data?.icon} alt="" style={{ width: "10%" }} /></li>
                           
                        </ul>
                    </>)
                })
            }
        </>
    )
}

export default EmbroideryTable