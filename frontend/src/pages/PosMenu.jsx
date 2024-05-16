import { Await, defer, useParams, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import { Suspense, useState, useContext } from "react";
import CardList from "../components/CardList";
import OrderList from "../components/OrderList";
import { getFetchFoods, getFetchTableDetailOrderList } from "../util/http";
import FoodCartContext from "../store/FoodContext";

// 포스 화면
function PosMenu() {
  const { foods, table } = useRouteLoaderData("table-id");
  const params = useParams();
  const [orderList, setOrderList] = useState([]); // 주문 목록
  const foodCtx = useContext(FoodCartContext);

  return (
    <>
      <PageContent title="Foods">
        <div className="flex flex-row flex-auto flex-grow h-full">
          <div className="p-5 overflow-y-auto border basis-3/5 border-borderColor snap-y rounded-l-xl">
            <Suspense fallback={<p>loading..</p>}>
              <Await resolve={foods}>
                {(loadFoods) => (
                  <CardList
                    data={loadFoods}
                    onCurrentData={(data) => setOrderList(data)}
                    orderData={orderList}
                  ></CardList>
                )}
              </Await>
            </Suspense>
          </div>
          <div className="p-5 overflow-y-auto bg-white border basis-2/5 border-borderColor border-l-transparent rounded-r-xl">
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
