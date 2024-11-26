const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Book = require("../books/book.model.js");
const Order = require("../orders/order.model.js");

// Functions to calculet admin status
router.get("/", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
 
    const tatolSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          tatolSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    const trendingBookCount = await Book.aggregate([
      { $match: { trending: true } },
      { $match: "trendingBookCount" },
    ]);
    const trendingBook =
      trendingBookCount.length > 0 ? trendingBookCount[0].trendingBookCount : 0;
    const totalBooks = await Book.countDocuments();

    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          totalSales: {
            $sum: "$totalPrice",
          },
          totalOrders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json({
      totalOrders,
      tatolSales: tatolSales[0].tatolSales,
      totalBooks,
      monthlySales,
      trendingBook,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


