const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/khanamangao");
    console.log("DB connected successfully");

    // Fetching food items
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();
    global.food_items = foodItemsData;

    // Fetching food categories
    const foodCategoryCollection = mongoose.connection.db.collection("foodcategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();
    global.foodCategory = foodCategoryData;

    //  console.log(global.food_items, global.foodCategory); // Check if the data is being set correctly
  } catch (e) {
    console.error("Error connecting to MongoDB or fetching data:", e);
  }
};

module.exports = mongoDB;
