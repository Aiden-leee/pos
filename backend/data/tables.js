// 데이터 핸들링 파일
const fs = require("node:fs/promises");
const { NotFoundError } = require("../utils/error");

// 테이블 데이터 가져오기
async function readData() {
  const data = await fs.readFile("./db.json");
  const res = JSON.parse(data);
  return res.tables;
}

// 데이터 쓰기
async function writeData(data) {
  return fs.writeFile("./db.json", JSON.stringify(data));
}

// 데이터 전체 조회
async function getTableAll() {
  const data = await readData();
  console.log(data);
  if (!data) {
    throw new NotFoundError("Could not found any data");
  }
  return data;
}

// 테이블 상세 조회
async function getTableDetail(id) {
  const data = await readData();

  if (!data) {
    throw new NotFoundError("Could not found any data");
  }
  const tableOne = data.find((item) => item.id === id);
  return tableOne;
}

// 테이블의 음식 수정
// id : table의 id,
// data : 해당 테이블의 주문된 음식
async function updateFoodOfTable(id, data, hc) {
  // 전체 데이터
  const allData = await fs.readFile("./db.json");
  const res = JSON.parse(allData);
  // 기존 테이블 데이터를 가져옴
  const storeData = await readData();

  // 해당 테이블의 인덱스
  const targetIndex = storeData.findIndex((item) => item.id === id);

  // 해당 테이블 없는 경우 에러
  if (targetIndex < 0) {
    throw new NotFoundError("Could not find table for id " + id);
  }

  // 해당 테이블의 foods 업데이트
  storeData[targetIndex].foods = [...data];
  const totalPrice = storeData[targetIndex].foods.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  // total price 업데이트
  storeData[targetIndex].price = totalPrice;

  // status => occupied 업데이트
  storeData[targetIndex].status = "occupied";

  // hc(인원수) => 업데이트
  storeData[targetIndex].hc = hc;

  // 전체 db 업데이트
  res.tables = storeData;
  console.log("----------------------");
  console.log(res);
  await writeData(res);
}

// 테이블 주문 삭제

exports.getTableAll = getTableAll;
exports.updateFoodOfTable = updateFoodOfTable;
exports.getTableDetail = getTableDetail;
