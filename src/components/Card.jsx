import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";
const Card = ({ foodItem }) => {
  // Extract options and ensure it's the first object in the array
  const priceOptions = foodItem.options && foodItem.options.length > 0 
  ? Object.keys(foodItem.options[0]) 
  : [];
  
  const priceRef =useRef()
  const [qty,setQty]=useState(1)
  const [size,setSize] =useState("");
  let dispatch=useDispatchCart();
  const handleAddToCart =async ()=>{
    await dispatch(type:"ADD",id:foodItem)
  }

let finalPrice = qty*parseInt(options[size]);
useEffect(()=>{
  setSize(priceRef.current.value)
},[])
  return (
    <div className="card m-2" style={{ width: "20rem", maxHeight: "500px", overflow: "hidden" }}>
      <img
        src={foodItem.img}
        className="card-img-top"
        alt={foodItem.name}
        style={{ objectFit: "cover", height: "120px" }}
      />

      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text">{foodItem.description}</p>

        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <select className="form-select bg-success text-white" style={{ width: "45%" }}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="form-select bg-success text-white" ref={priceRef} style={{ width: "45%" }}>
              {priceOptions.length > 0 ? (
                priceOptions.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))
              ) : (
                <option disabled>No options available</option>
              )}
            </select>
          </div>
          <div className="text-center mt-2 fw-bold">
            ${finalPrice}/-
          </div>
        </div>
        <hr></hr>
        <button className={"btn btn-success justify-center ms-1"} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
