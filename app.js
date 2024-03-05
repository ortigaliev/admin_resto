console.log("Ready to start Web server");
const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const cookieParser = require("cookie-parser");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);//mongodb ni storege hosil qilishga yordam beradi
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});


//1-Entry Code
app.use(express.static("public")); //open Public folder for requested users
app.use(express.json()); //Converst from json format to Object
app.use(express.urlencoded({ extended: true})); //to access requested post from HTML form
app.use(cookieParser());


//2-Session Code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30 minuts
    },
    store: store,
    resave: true,
    saveUnInitialized: true,
  })
);

app.use(function(req, res, next){
  res.locals.member = req.session.member;
  next();
});

//3-Views Code
app.set("views", "views");//views folder path that we created
app.set("view engine", "ejs");

//4-Router related Code
app.use("/resto", router_bssr); //This is router for clients
app.use("/", router); //This is router for admin and restaurant user's

module.exports = app;