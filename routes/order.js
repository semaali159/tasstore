const express = require("express");
const router = express.Router();
const { addOrder } = require("../controller/order");
// const { verifyTokenAndCustomer } = require("../middleware/verifyToken");
router.post("/", addOrder);
module.exports = router;
