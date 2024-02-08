const Definer = require("../lib/mistakes");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");
let restaurantController = module.exports;
const assert = require("assert");

restaurantController.home = (req, res) => {
  try{
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) =>{
  try{
    console.log("GET: cont/getMyRestaurantProducts");
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", {restaurant_data: data});
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantProducts, ${err.message}`);
    res.redirect("/resto");
  }
}

restaurantController.getSignupMyRestaurant = async (req, res) =>{
  try{
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
}

restaurantController.signupProcess = async (req, res) => {
  try{
    console.log("POST: cont/signupProcess");
    assert.ok(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert.ok(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//login controller
restaurantController.getLoginMyRestaurant = async (req, res) =>{
  try{
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, const/getLogInMyRestaurant, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

restaurantController.loginProcess = async (req, res) => {
  try{
    console.log("POST: cont/loginProcess");
    const data = req.body,
    member = new Member(),
    result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN" ? res.redirect("/resto/all-restaurant")
      : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//loguot controller
restaurantController.logout = (req, res) => {
  try{
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch(err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message});
  }
};

//Validate AUTH Restaurant
restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail", message: "Only authenticated members with restaurant type",
    });
};

//check-me controller
restaurantController.checkSession = (req, res) => {
  if (req.session?.member){
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated"});
  }
};

//Admin user controll logic.
restaurantController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    req.member = req.session.member;
    next();
  } else {
    const html = `<script>
                    alert('Admin page: Permission denied!');
                    window.location.replace('/resto');
                  </script>`;
    res.end(html);
  }
};

//All restaurants control panel for admin
restaurantController.getAllRestaurants = async (req, res) => {
  try {
    console.log("GET cont/getAllRestaurants");
    const restaurant =new Restaurant();
    const restaurants_data = await restaurant.getAllRestaurantsData();
    console.log("restaurants_data:", restaurants_data);
    res.render("all-restaurants", {restaurants_data: restaurants_data });

  } catch (err) {
    console.log(`ERROR, cont/getAllRestaurants, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.updateRestaurantByAdmin = async (req, res) =>{
try{
  console.log("GET cont/updateRestaurantByAdmin");
  const restaurant =new Restaurant();
  const result = await restaurant.updateRestaurantByAdminData(req.body);
  await res.json({ state: "success", data: result });
} catch(err) {
  console.log(`ERROR, cont/updateRestaurantByAdmin, ${err.message}`);
  res.json({ state: "fail", message: err.message });
}
};