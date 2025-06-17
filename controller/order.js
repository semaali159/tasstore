const db = require("../models");
const asynchandler = require("express-async-handler");
const sequelize = require("../config/connection");
const addOrder = asynchandler(async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    console.log(req.user.id);

    const order = await db.Order.create(
      {
        customerId: req.user.id,
        totalAmount: 0,
      },
      { transaction }
    );
    console.log(order);

    let totalAmount = 0;
    const products = req.body.products;
    console.log(products);

    if (products && products.length > 0) {
      const orderProducts = [];

      for (const product of products) {
        const productId = product.id.trim();
        console.log(productId);

        const productData = await db.Product.findByPk(productId, {
          transaction,
        });

        if (!productData) {
          await transaction.rollback();
          return res
            .status(404)
            .json({ error: `Product with ID ${productId} not found` });
        }

        totalAmount += productData.price * product.quantity;

        orderProducts.push({
          orderId: order.id,
          productId: productId,
          quantity: product.quantity,
        });
      }

      await db.OrderProduct.bulkCreate(orderProducts, { transaction });
    } else {
      await transaction.rollback();
      return res.status(400).json({ error: "No products provided" });
    }

    order.totalAmount = totalAmount;
    await order.save({ transaction });

    await transaction.commit();

    const orderWithDetails = await db.Order.findByPk(order.id, {
      include: [
        {
          model: db.Product,
          as: "products",
          through: { attributes: ["quantity"] },
          attributes: ["id", "name", "price"],
        },
      ],
    });

    return res.status(201).json({
      message: "Order added successfully",
      order: orderWithDetails,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding order:", error);
    return res.status(500).json({ error: "Failed to add order" });
  }
});

module.exports = { addOrder };
