const fs = require("node:fs/promises");
const { NotFoundError } = require("../utils/error");

// 데이터 가져오기
async function readData() {
  // utf8 로 설정하지 않으면 buffer 형태로 출력됨
  // string 형태 -> parse 해준다
  const data = await fs.readFile("./db.json", "utf8");
  const res = JSON.parse(data);
  return res.foods;
}

// 데이터 전체 조회
async function getAll() {
  const data = await readData();
  if (!data) {
    throw new NotFoundError("Could not find any events.");
  }
  return data;
}

exports.getAll = getAll;
