import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { currencyFormatter } from "../util/util";
import { getFetchTableOrderList } from "../util/http";

// 테이블 상태 현황
const tableInfo = [
  { id: 1, status: "OCCUPIED", color: "occupied", active: false },
  { id: 2, status: "VACANT", color: "vacant", active: false },
  { id: 3, status: "ORDERHOLD", color: "orderHold", active: false },
];

// 테이블 목록
function TableLists({ tables }) {
  const color = {
    occupied: "bg-occupied",
    vacant: "bg-vacant",
    orderHold: "bg-orderHold",
  };

  return (
    <ul className="grid grid-cols-4 gap-4">
      {tables.map((table) => (
        <li key={table.id} className="border border-borderColor rounded-xl">
          <Link to={`menu/${table.id}`} className="h-48">
            <div className="relative">
              <div
                className={`${
                  color[table.status]
                } rounded-t-xl py-1 px-2 text-sm flex justify-between text-white font-bold`}
              >
                <span className="uppercase">{table.id}</span>
                <span>
                  {table.hc}명 / {currencyFormatter.format(table.price)}원
                </span>
              </div>
              <div className="relative h-48 text-center bg-center bg-no-repeat bg-auto bg-tableImage">
                <ul className="absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] w-full overflow-y-auto max-h-28">
                  {table.foods.length > 0 &&
                    table.foods.map((food) => {
                      return (
                        <li key={food.id}>
                          <div>
                            <strong>
                              {food.title} x {food.quantity}
                            </strong>
                          </div>
                        </li>
                      );
                    })}
                </ul>
                <div className="absolute text-sm right-2 bottom-2">
                  {table.foods.length > 0
                    ? table.updated
                      ? table.updated
                      : table.date
                    : false}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 테이블
function Tables() {
  const { tables } = useLoaderData();
  const bullet = {
    occupied: "before:bg-occupied",
    vacant: "before:bg-vacant",
    orderHold: "before:bg-orderHold",
  };
  return (
    <div className="food-table">
      <div className="pb-4 mb-4 border-b-2 border-borderColor">
        <ul className="flex gap-3">
          {tableInfo.map((info) => (
            <li key={info.id}>
              <span
                className={`relative inline-block pl-[14px] before:content-normal before:absolute before:left-0 before:top-1/2 before:w-[10px] before:h-[10px] before:translate-y-[-5px] ${
                  bullet[info.color]
                } before:rounded-full`}
              >
                {info.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Suspense fallback={<p>loading..</p>}>
        <Await resolve={tables}>
          {(loadTables) => <TableLists tables={loadTables} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default Tables;

// table 데이터 조회
async function loadTables() {
  return getFetchTableOrderList();
}

export function loader() {
  return defer({
    tables: loadTables(),
  });
}
