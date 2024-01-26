const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is HomePage");
});


router.get("/community", (req, res) => {
  res.send("This is Community Page");
});


router.get("/menu", (req, res) => {
  res.send("This is Menu Page");
});


module.exports = router;