// sales router
const express = require("express");
const router = express.Router();
const { addSales } = require("../data/sales");

// sales 데이터 핸들링

// sales
// 전체 판매 기록 조회
router.get("/", async (req, res, next) => {
  try {
    const sales = await getSalesAll();
    sales.json({ sales });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return res.status(422).json({
      message: "sales post failed",
    });
  }
  try {
    await addSales(data);
    res.json({ message: "sales added!", status: 200 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
