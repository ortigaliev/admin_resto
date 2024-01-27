const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");

/* **********************
*        BSSR EJS       *
*************************/

//Restaurant releted router

router_bssr
  .get("/signup",restaurantController.getSignupMyRestaurant)//signup router
  .post("/signup",restaurantController.signupProcess);//signup router

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)//login router
  .post("/login", restaurantController.loginProcess);//login router

router_bssr.get("/logout", restaurantController.logout);//logout router

router_bssr.get("/check-me", restaurantController.checkSession);//

router_bssr.get("/products/menu", restaurantController.getMyRestaurantData);


module.exports = router_bssr;