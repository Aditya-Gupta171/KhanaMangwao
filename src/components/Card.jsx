import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = ({ foodItem }) => {
  // Initialize price options from the food item
  const priceOptions =
    foodItem.options && foodItem.options.length > 0
      ? Object.keys(foodItem.options[0])
      : [];

  const priceRef = useRef(); // To get the default size option on first render
  const [qty, setQty] = useState(1); // Default quantity
  const [size, setSize] = useState(""); // Selected size
  const dispatch = useDispatchCart(); // To handle cart actions
  const cartData = useCart(); // For checking existing cart items

  // Set the default size when price options are available
  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(priceOptions[0]); // Set the default size to the first option
    }
  }, [priceOptions]);

  // Handle adding item to the cart
  const handleAddToCart = async () => {
    if (!size) {
      alert("Please select a size.");
      return;
    }

    // Find if the same item with the same size already exists in the cart
    const existingItem = cartData.find(
      (item) => item.id === foodItem._id && item.size === size
    );

    // Calculate the final price based on the selected size and quantity
    const finalPrice = qty * parseInt(foodItem.options[0][size]);

    // If the item already exists in the cart, update it
    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        qty: qty + existingItem.qty, // Add the new quantity to the existing one
        price: finalPrice,
        size,
      });
    } else {
      // If the item doesn't exist, add a new item to the cart
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        qty,
        size,
        price: finalPrice,
        img: foodItem.img,
      });
    }
    alert(`${foodItem.name} added to cart successfully!`);
  };

  // Calculate the final price when size or qty changes
  const finalPrice = size ? qty * parseInt(foodItem.options[0][size]) : 0;

  return (
    <div
      className="card m-2"
      style={{ width: "20rem", maxHeight: "500px", overflow: "hidden" }}
    >
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
            {/* Quantity Selector */}
            <select
              className="form-select bg-success text-white"
              style={{ width: "45%" }}
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size Selector */}
            <select
              className="form-select bg-success text-white"
              ref={priceRef}
              style={{ width: "45%" }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mt-2 fw-bold">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
