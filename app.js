console.log("Ready to start Web server");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = require("./router");

//MONGO DB connection
const db = require("./server");
const mongoose = require("mongoose");

//1-Entry Code
app.use(express.static("public")); //open Public folder for requested users
app.use(express.json()); //Converst from json format to Object
app.use(express.urlencoded({ extended: true})); //to access requested post from HTML form


//2-Session Code

//3-Views Code
app.set("views/", "views");//views folder path that we created
app.set("view engine", "ejs");

//4-Router related Code
//app.use("/resto", router_bssr); //This is router for clients
app.use("/", router); //This is router for admin and restaurant user's

module.exports = app;