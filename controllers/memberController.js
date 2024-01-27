const Member = require("../models/Member");
let memberController = module.exports;

/* SIGNUP CONTROLLER */
memberController.signup = async (req, res) => {
  try{
    console.log("Post: cont/signup");
    const data = req.body;
    //console.log("body::: ", req.body);
    const member = new Member();
    const new_member = await member.signupData(data);

    res.send("done");
  } catch (err) {
    res.send("ERROR: This id or phone already has signedup");
    console.log(`ERROR, cont/signup, ${err.message}`);
  }
};

memberController.login = (req, res) => {
  res.send("This is login page");
};
memberController.logout = (req, res) => {
  res.send("This is logout page");
};