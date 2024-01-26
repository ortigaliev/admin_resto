const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");


//Member realted routers
router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);


//Others
router.get("/community", (req, res) => {
  res.send("This is Community Page");
});


router.get("/menu", (req, res) => {
  res.send("This is Menu Page");
});


module.exports = router;