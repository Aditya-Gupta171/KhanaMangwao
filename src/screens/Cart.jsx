import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return <div className="text-center m-5 fs-3">Your Cart is Empty!</div>;
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.ok) {
        dispatch({ type: "DROP" });
        alert("Order Placed Successfully!");
      } else {
        alert("Error in placing order. Please try again!");
      }
    } catch (error) {
      console.error("Error in checkout:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.size}</td>
              <td>₹{item.price}</td>
              <td>
                <button
                  onClick={() => dispatch({ type: "REMOVE", index })}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fs-4">Total Price: ₹{totalPrice}</div>
      <button className="btn btn-success mt-3" onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
}
