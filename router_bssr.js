const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");

/* **********************
*        BSSR EJS       *
*************************/

//Restaurant releted router

/* router_bssr.get("/", restaurantController.home); */

router_bssr
  .get("/signup",restaurantController.getSignupMyRestaurant)//signup router
  .post("/signup",restaurantController.signupProcess);//signup router

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)//login router
  .post("/login", restaurantController.loginProcess);//login router

router_bssr.get("/logout", restaurantController.logout);//logout router

router_bssr.get("/check-me", restaurantController.checkSession);//


//Product releted routers
router_bssr.get("/products/menu", restaurantController.getMyRestaurantData);
router_bssr
  .post("/products/create",restaurantController.validateAuthRestaurant,
    uploader_product.array("product_images", 5),
    productController.addNewProduct);

router_bssr.post("/product/edit/:id",
    restaurantController.validateAuthRestaurant,productController.updateChosenProduct);


module.exports = router_bssr;