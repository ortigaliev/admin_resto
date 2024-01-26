console.log("Ready to start Web server");
const express = require("express");
const res = require("express/lib/response");
const app = express();

//MONGO DB connection
const db = require("./server").db();
const mongodb = require("mongodb");

//1-Entry Code
app.use(express.static("public")); //open Public folder for requested users
app.use(express.json()); //Converst from json format to Object
app.use(express.urlencoded({ extended: true})); //to access requested post from HTML form


//2-Session Code

//3-Views Code
app.set("views", "views");//views folder path that we created
app.set("view engine", "ejs");

//4-Router related Code
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  const new_plan = req.body.plan;
  db.collection("aim").insertOne({ plan: new_plan}, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);
  });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("aim").deleteOne({_id: new mongodb.ObjectId(id)},
  function (err, data) {
    res.json({ state: "success"});
  }
  );
});

app.post("/edit-item", (req, res) => {
  const data = req.body;
  console.log(data);
  db.collection("aim").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },
    { $set: { reja: data.new_input } },
    function (err, data) {
      res.json({state: "success"});
    }
  );
});

app.post("/delete-all", (req, res) => {
  if(req.body.delete_all) {
    db.collection("aim").deleteMany(function () {
      res.json({ state: "Are you sure to delete all?"});
    });
  }
});

app.get("/", function(req, res){
  console.log("user entered /");
  db.collection("aim").find().toArray((err, data) => {
    if (err) {
      console.log(err);
      res.end("Something went wrong");
    } else {
      res.render("plan", {items: data});
    }
  });
});


module.exports = app;