const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret ="djuwe6bwyehfeevc7sdjkj";


// Create User Route
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword  = await bcrypt.hash(req.body.password , salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location, // Updated: Ensure location matches frontend
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// Login User Route
router.post("/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if(!pwdCompare){
        return res.status(400).json({errors:"try logging with correct credentals"})
      }   
      const data={
        user:{
          id:userData.id,
        },
      }
      
      const authToken=jwt.sign(data,jwtSecret);
      
      return res.json({ success: true,authToken:authToken })
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
  }
);

module.exports = router;

