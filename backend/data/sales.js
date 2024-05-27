// 데이터 핸들링
const fs = require("node:fs/promises");
const path = require("node:path");
const { NotFoundError } = require("../utils/error");
const { dateFormatter } = require("../utils/util");

// db 경로
const dbPath = path.join(__dirname, "/sales.json");

// sale 데이터 가져오기
async function readData() {
  const data = await fs.readFile(dbPath, "utf8");
  const res = JSON.parse(data);
  return res;
}

// 데이터 쓰기
async function writeData(data) {
  await fs.writeFile(dbPath, JSON.stringify(data));
}

// sales 데이터 전체 조회
async function getSalesAll() {
  const data = await readData();
  if (!data) {
    throw new NotFoundError("Could not found any data");
  }
  return data;
}

// sales 데이터 추가
async function addSales(table) {
  // 전체 데이터
  const storeData = await readData();

  if (!table) {
    throw new NotFoundError("No data");
  }

  const addTable = {
    ...table,
    paydate: dateFormatter("yyyy/mm/dd h:m:s"),
  };
  storeData.sales.unshift(addTable);
  await writeData(storeData);
}

exports.getSalesAll = getSalesAll;
exports.addSales = addSales;
