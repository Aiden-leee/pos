import axios from "axios";
import { json } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 주문 메뉴들
export async function getFetchFoods() {
  try {
    const response = await instance.get("/menu");
    const resData = response.data;
    return resData.menu;
  } catch (error) {
    console.log(error);
  }
}

// 테이블 전체 주문&현황
export async function getFetchTableOrderList() {
  try {
    const response = await instance.get("/tables");
    const resData = await response.data;
    return resData.tables;
  } catch (error) {
    console.log(error);
  }
}

// 테이블 번호 상세 조회
export async function getFetchTableDetailOrderList(id) {
  try {
    const response = await instance.get(`/tables/${id}`);
    const resData = await response.data;
    return resData.table;
  } catch (error) {
    console.log(error);
  }
}

// 테이블 주문 추가 수정
export async function postFetchTableOrderList(orderList, tableid) {
  try {
    const response = await instance.patch("/tables/" + tableid, {
      foods: orderList,
    });

    if (response.status !== 200) {
      throw json(
        { message: "could not fetch( postFetchTableOrderList )" },
        { status: 500 }
      );
    } else {
      const resData = await response.data;
      //console.log(resData);
      return resData;
    }
  } catch (error) {
    console.log(error);
  }
}

// 테이블 결제 요청 후 초기화
export async function updateTableClear(tid) {
  try {
    const response = await instance.patch(`/tables/clear/${tid}`, {
      ttt: 1,
    });
    if (response.status !== 200) {
      throw json(
        {
          message: "could not fetch( updateTableClear )",
        },
        { status: 500 }
      );
    } else {
      const resData = await response.data;
      return resData;
    }
  } catch (error) {
    console.log(error);
  }
}

// 결제 요청
export async function actionPayments(table) {
  try {
    const response = await instance.post("/sales", table);
    if (response.status !== 200) {
      throw json(
        {
          message: "could not post",
        },
        { status: 500 }
      );
    } else {
      const resData = await response.data;
      return resData;
    }
  } catch (error) {
    console.log(error);
  }
}

// sales 목록
export async function getSales() {
  try {
    const response = await instance.get("/sales");
    const resData = response.data;
    return resData.sales;
  } catch (error) {
    console.log(error);
  }
}
