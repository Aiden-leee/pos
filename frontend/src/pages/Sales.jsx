import { Suspense, useState } from "react";
import PageContent from "../components/PageContent";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { getSales } from "../util/http";
import History from "../components/History";
import { currencyFormatter } from "../util/util";
import TotalScreen from "../components/TotalScreen";

function Sales() {
  const { sales } = useRouteLoaderData("sales");
  const salesData = sales.sales;
  const [historyItems, setHistoryItems] = useState();

  // 선택된 sales 목록
  function handleSelectHistory(item) {
    setHistoryItems(() => item);
  }

  // print 함수
  function handlePrint(item) {
    if (item) {
      alert("영수증을 출력합니다.");
    } else {
      alert("Sales 목록을 선택해주세요.");
    }
  }

  return (
    <>
      <PageContent title="Sales">
        <div className="flex flex-row flex-auto h-full bg-white">
          <div className="p-5 overflow-y-auto border basis-3/5 border-borderColor snap-y rounded-l-xl">
            <Suspense fallback={<p>loading..</p>}>
              <Await resolve={salesData}>
                {(loadSales) => (
                  <History data={loadSales} selectItem={handleSelectHistory} />
                )}
              </Await>
            </Suspense>
          </div>
          <div className="p-5 overflow-y-auto border basis-2/5 border-borderColor border-l-transparent rounded-r-xl">
            <div className="relative h-full">
              <div className="order flex-none h-full pb-[320px]">
                <h3 className="font-bold text-xl pb-3 flex justify-between">
                  <span>OrderID: #{historyItems && historyItems.tid}</span>
                  <span className="text-lg">
                    인원수: {historyItems ? historyItems.hc : 0}
                  </span>
                </h3>

                <ul className="h-full mb-4 overflow-auto">
                  {!historyItems && (
                    <li className="text-center py-6  border-b-[1px] border-b-borderColor">
                      <span>Sales 목록을 클릭해주세요.</span>
                    </li>
                  )}

                  {historyItems &&
                    historyItems.foods.map((item, index) => (
                      <li
                        key={item.id}
                        className="odd:bg-pointLight relative before:content-[''] before:absolute before:left-0 before:block before:w-[3px] before:h-full before:bg-point"
                      >
                        <div className="flex py-2">
                          <span className="basis-[10%] text-center">
                            {index + 1}
                          </span>
                          <span className="basis-2/6">{item.title}</span>
                          <span className="px-2 basis-2/5">
                            {currencyFormatter.format(item.price)} x{" "}
                            {item.quantity}
                          </span>
                          <span className="basis-1/6">
                            {currencyFormatter.format(
                              item.price * item.quantity
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="absolute bottom-0 bg-[#fff9f0] border-t-2 border-t-[#8b8b8b] h-[300px] w-full overflow-y-auto">
                  <TotalScreen
                    type="print"
                    data={historyItems}
                    onProceed={handlePrint}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}

export default Sales;

async function loadSales() {
  return getSales();
}

export async function loader() {
  return defer({
    sales: await loadSales(),
  });
}
