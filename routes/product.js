const express = require("express");
const router = express.Router();
const product = require("../controller/product");
const {
  // verifyTokenAndBuyer,
  verifyToken,
} = require("../middleware/verifyToken");
router.post("/", product.addProduct);
router.get("/", verifyToken, product.getAllProduct);
router.get("/:id", verifyToken, product.getProductById);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);
module.exports = router;
