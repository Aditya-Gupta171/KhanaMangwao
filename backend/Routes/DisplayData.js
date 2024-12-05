const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    if (!global.food_items || !global.foodCategory) {
      return res.status(500).json({ error: "Data not available yet" });
    }

    res.json([global.food_items, global.foodCategory]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
