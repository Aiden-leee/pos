// tables router
const express = require("express");
const router = express.Router();

// 테이블 데이터 핸들링
const {
  getTableAll,
  updateFoodOfTable,
  getTableDetail,
} = require("../data/tables");

// /tables
// 전체 테이블 조회
router.get("/", async (req, res, next) => {
  try {
    const tables = await getTableAll();
    res.json({ tables });
  } catch (error) {
    next(error);
  }
});

// 테이블 상세 조회
router.get("/:id", async (req, res, next) => {
  try {
    const table = await getTableDetail(req.params.id);
    res.json({ table });
  } catch (error) {
    next(error);
  }
});

// tables/:id
// 해당 테이블의 foods 수정
router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  try {
    await updateFoodOfTable(req.params.id, data.foods, data.hc);
    res.json({ message: "table updated", tables: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
