import axios from "axios";
import { json } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:4000",
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
export async function postFetchTableOrderList(orderList, tableid, hc) {
  try {
    const response = await instance.patch("/tables/" + tableid, {
      foods: orderList,
      hc,
    });

    if (!response.ok) {
      throw json(
        { message: "could not fetch( postFetchTableOrderList )" },
        { status: 500 }
      );
    } else {
      const resData = await response.data;
      return { message: resData.message, status: true };
    }
  } catch (error) {
    console.log(error);
  }
}
