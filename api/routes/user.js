const express = require("express");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const JWT_KEY = process.env.JWT_KEY;
    const user = await User.login(email, password);

    const userToHash = { email: user.email };
    const token = jwt.sign(userToHash, JWT_KEY, { expiresIn: "30m" });

    res.cookie("stock-site-token", token);
    res.status(200).json({ email: email, auth: true });
  } catch (error) {
    res.status(400).json({ error: error.message, auth: false, token: null });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
