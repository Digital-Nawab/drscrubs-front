import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function CustomColor({ color }) {
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const options = color?.map((value) => ({ value, label: value?.color_name }));

  const handleColorSelectChange = (selectedColors) => {
    setSelectedColors(selectedColors);
  };
   
 console.log(options)


  return (
    <>
   
   



      <Select
        isMulti
        options={options}
        value={selectedColors}
        onChange={handleColorSelectChange}
      />




    </>





  );
}

export default CustomColor;