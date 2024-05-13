const express = require("express");
const router = express.Router();

const { getAll } = require("../data/menu");
// /menu
router.get("/", async (req, res, next) => {
  try {
    const menu = await getAll();
    res.json({ menu });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
