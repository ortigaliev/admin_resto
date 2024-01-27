const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");

/* **********************
*        BSSR EJS       *
*************************/

//Restaurant releted router

router_bssr.get("/signup",restaurantController.getSignupMyRestaurant);//signup router
router_bssr.post("/signup",restaurantController.signupProcess);//signup router

router_bssr.get("/login", restaurantController.getLoginMyRestaurant);//login router
router_bssr.post("/login", restaurantController.loginProcess);//login router

router_bssr.get("/logout", restaurantController.logout);//logout router


module.exports = router_bssr;