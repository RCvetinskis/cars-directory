const Car = require("../models/Car");

exports.hello = (req, res) => {
  res.json({ message: "Hello from Node backend!" });
};
