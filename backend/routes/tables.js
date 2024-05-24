// tables router
const express = require("express");
const router = express.Router();

// 테이블 데이터 핸들링
const {
  getTableAll,
  updateFoodOfTable,
  getTableDetail,
  updateTableClear,
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
    await updateFoodOfTable(req.params.id, data.foods);
    res.json({ message: "table updated", data, status: 200 });
  } catch (error) {
    next(error);
  }
});

// /tables/:tid/clear
// 결제 후에 테이블 초기화
router.patch("/clear/:tid", async (req, res, next) => {
  try {
    await updateTableClear(req.params.tid);
    res.json({ message: "table update clear", status: 200 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
