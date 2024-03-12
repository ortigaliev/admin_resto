const assert = require("assert");
const Order = require("../models/Order");

let orderController = module.exports;
const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistakes");

orderController.createOrder = async (req, res) => {
  try {
    console.log(`POST: cont/createOrder`);
    assert.ok(req.member, Definer.auth_err5);

    const order = new Order();
    const result = await order.createOrderData(req.member, req.body);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createOrder, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

orderController.getMyOrders = async (req, res) => {
  try {
    console.log(`POST: cont/getMyOrders`);
    assert.ok(req.member, Definer.auth_err5);

    const order = new Order();
    const result = await order.getMyOrdersData(req.member, req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMyOrders, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
