// 데이터 핸들링 파일
const fs = require("node:fs/promises");
const { v4: generateId } = require("uuid");
const { NotFoundError } = require("../utils/error");
const { dateFormatter } = require("../utils/util");
const path = require("node:path");

// db 경로
const dbPath = path.join(__dirname, "/db.json");

// 테이블 데이터 가져오기
async function readData() {
  const data = await fs.readFile(dbPath);
  const res = JSON.parse(data);
  return res.tables;
}

// 데이터 쓰기
async function writeData(data) {
  return fs.writeFile(dbPath, JSON.stringify(data));
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

// 테이블의 음식 수정 추가
// tid : 초기 0 값 - uuid 로 생성
// id : table의 id, ( t1, t2, t3 ...)
// data : 해당 테이블의 주문된 음식
async function updateFoodOfTable(id, data) {
  // 전체 데이터
  const allData = await fs.readFile(dbPath);
  const res = JSON.parse(allData);
  // 기존 테이블 데이터를 가져옴
  const storeData = await readData();

  console.log(storeData);
  console.log(id);
  console.log("--".repeat(5));

  console.log(data);
  console.log("===============================");
  // 해당 테이블의 인덱스
  const targetIndex = storeData.findIndex((item) => item.id === id);

  // 해당 테이블 없는 경우 에러
  if (targetIndex < 0) {
    throw new NotFoundError("Could not find table for id " + id);
  }

  // 해당 테이블의 foods 업데이트
  storeData[targetIndex].foods = [...data.foods];
  const totalPrice = storeData[targetIndex].foods.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  // tid 생성
  if (data.tid === 0) {
    const genid = generateId();
    const uuid = genid.substring(0, 8);
    storeData[targetIndex].tid = `${id}-${uuid}`;
  }

  // total price 업데이트
  storeData[targetIndex].price = totalPrice;

  // status => occupied 업데이트
  storeData[targetIndex].status = "occupied";

  // hc(인원수) => 업데이트
  storeData[targetIndex].hc = data.hc;

  // 날짜 업데이트
  if (
    storeData[targetIndex].date === undefined ||
    storeData[targetIndex].date === ""
  ) {
    storeData[targetIndex].date = dateFormatter("yyyy/mm/dd h:m:s");
  } else {
    storeData[targetIndex].updated = dateFormatter("yyyy/mm/dd h:m:s");
  }

  // 전체 db 업데이트
  res.tables = storeData;
  console.log("----------------------");
  console.log(res);
  await writeData(res);
}

// 결제 요청 후 table 초기화
async function updateTableClear(tid) {
  // 전체 데이터
  const allData = await fs.readFile(dbPath);
  const res = JSON.parse(allData);

  // 데이터 가져오기
  const storeData = await readData();

  // 해당 테이블의 인덱스
  const targetIndex = storeData.findIndex((item) => item.tid === tid);

  // 해당 테이블 없는 경우 에러
  if (targetIndex < 0) {
    throw new NotFoundError("Could not find table for tid " + tid);
  }
  storeData[targetIndex].tid = 0;
  storeData[targetIndex].status = "vacant";
  storeData[targetIndex].hc = 0;
  storeData[targetIndex].price = 0;
  storeData[targetIndex].foods = [];
  storeData[targetIndex].date = "";
  delete storeData[targetIndex].updated;
  delete storeData[targetIndex].paydate;

  res.tables = storeData;
  await writeData(res);
}

exports.getTableAll = getTableAll;
exports.updateFoodOfTable = updateFoodOfTable;
exports.getTableDetail = getTableDetail;
exports.updateTableClear = updateTableClear;
