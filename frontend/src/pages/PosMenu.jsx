import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import PageContent from "../components/PageContent";
import {
  Suspense,
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import CardList from "../components/CardList";
import OrderList from "../components/OrderList";
import Modal from "../components/ui/Modal";
import TotalScreen from "../components/TotalScreen";
import {
  getFetchFoods,
  getFetchTableDetailOrderList,
  getFetchTableOrderList,
  postFetchTableOrderList,
} from "../util/http";
import FoodCartContext from "../store/FoodContext";

// 포스 화면
function PosMenu() {
  const { foods, table } = useLoaderData();
  const params = useParams();
  const [orderList, setOrderList] = useState([]); // 주문 목록

  const [hasFoods, setHasFoods] = useState(false); // 주문된 음식 유무

  const foodCtx = useContext(FoodCartContext);

  // 이미 있는 주문 불러오기
  // const loadOrderedList = useCallback(
  //   function loadOrderedList() {
  //     if (hasFoods) {
  //       setOrderList(() => table.foods);
  //       setHc(() => table.hc);
  //     }
  //   },
  //   [table.foods, hasFoods, table.hc]
  // );

  // useEffect(() => {
  // 주문된 음식이 있는 경우 데이터 가져오기
  // setHasFoods(table.foods.length > 0 ? true : false);
  // loadOrderedList();
  //}, [hasFoods, table.foods, loadOrderedList]);

  return (
    <>
      <PageContent title="Foods">
        <div className="flex flex-auto flex-row flex-grow h-full">
          <div className="basis-3/5 border border-borderColor p-5 snap-y overflow-y-auto">
            <Suspense fallback={<p>loading..</p>}>
              <Await resolve={foods}>
                {(loadFoods) => (
                  <CardList
                    data={loadFoods}
                    onCurrentData={(data) => setOrderList(data)}
                  ></CardList>
                )}
              </Await>
            </Suspense>
          </div>
          <div className="basis-2/5 border border-borderColor border-l-transparent bg-white p-5 overflow-y-auto">
            <div className="relative h-full">
              <div className="order flex-none h-full pb-[320px]">
                <Suspense fallback={<p>loading...</p>}>
                  <Await resolve={table}>
                    {(loadTable) => (
                      <OrderList
                        data={loadTable}
                        no={params.tableid}
                        onCurrentData={(data) => setOrderList(data)}
                      />
                    )}
                  </Await>
                </Suspense>
                {/* <Suspense fallback={<p>loading...</p>}>
                  <Await resolve={foodCtx.items}>
                    {(loadTable) => (
                      <OrderList
                        data={loadTable}
                        no={params.tableid}
                        onCurrentData={(data) => setOrderList(data)}
                      />
                    )}
                  </Await>
                </Suspense> */}
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}

export default PosMenu;

async function loadFood() {
  // 메뉴 전체 조회
  return getFetchFoods();
}

async function loadTableDetailOrderList({ params }) {
  const id = params.tableid;

  // 해당 테이블 주문&조회
  return getFetchTableDetailOrderList(id);
}

export async function loader({ params }) {
  return defer({
    foods: await loadFood(),
    table: await loadTableDetailOrderList({ params }),
  });
}