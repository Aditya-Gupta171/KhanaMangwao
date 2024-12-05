import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState(""); // State for search functionality

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFoodItem(data[0] || []); // Array of food items
        setFoodCat(data[1] || []); // Array of food categories
      } else {
        console.error("Error fetching data from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Navbar Section */}
      <Navbar />

      {/* Carousel Section */}
      <Carousal search={search} setSearch={setSearch} />

      {/* Food Categories Section */}
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id}>
              <h3 className="mt-4">{category.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="col-md-4">
                        <Card
                          foodItem={filteredItem}
                          options={filteredItem.options || {}}
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-center">No items in this category</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">No Categories Found</div>
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
