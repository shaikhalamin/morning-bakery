import React, { useState } from "react";
import EachRow from "./EachRow";

const busSitData = [
  [
    {
      sitNo: "A1",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
    {
      sitNo: "A2",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
    {
      sitNo: "A3",
      price: 266,
      isSelected: false,
      isBooked: false,
    },
    {
      sitNo: "A4",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
    {
      sitNo: "A5",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
  ],
  [
    {
      sitNo: "B1",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
    {
      sitNo: "B2",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
    {
      sitNo: "B3",
      price: 266,
      isSelected: false,
      isBooked: false,
    },
    {
      sitNo: "B4",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
    {
      sitNo: "B5",
      price: 266,
      isSelected: true,
      isBooked: false,
    },
  ],
];

const SitPlanning = () => {
  const [sitData, setSitData] = useState(busSitData);

  const handleEachSitClick = (data:any):void=>{
    console.log("received in parent component",data)
  }

  return (
    <div>
      {sitData.length > 0 &&
        sitData.map((sitArray, index) => {
          return (
            <>
              <EachRow sitArray={sitArray} parentIndex={index} key={index} onChildClick={handleEachSitClick} />
            </>
          );
        })}
    </div>
  );
};

export default SitPlanning;
