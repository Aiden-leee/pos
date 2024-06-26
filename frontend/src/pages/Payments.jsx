import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import PageContent from "../components/PageContent";
import TotalScreen from "../components/TotalScreen";
import { currencyFormatter } from "../util/util";
import { actionPayments, updateTableClear } from "../util/http";

function Payments() {
  const { table } = useRouteLoaderData("table-id");
  const navi = useNavigate();
  // 결제
  async function handlePayments() {
    const res = await actionPayments(table);
    if (res.status === 200) {
      alert("결제가 완료되었습니다.");
      console.log(table.tid);
      const updated = await updateTableClear(table.tid);
      if (updated.status === 200) {
        navi("/");
      }
    }
  }

  return (
    <>
      <PageContent title="Payments" className="max-w-[768px] m-auto">
        <div className="h-full gap-4">
          <article className="h-full basis-3/5 border-borderColor rounded-l-xl">
            <div className="flex justify-between items-center bg-white border-b-[1px] rounded-t-xl border-b-borderColor">
              <h3 className="px-4 py-2 font-bold">ORDER ID: #{table.tid}</h3>
              <span className="inline-block px-2 mr-4 ">
                <Link
                  to=".."
                  className="inline-block align-middle"
                  title="back to page"
                >
                  <ArrowUturnLeftIcon className="size-5" />
                </Link>
              </span>
            </div>
            <div className="p-4 h-[calc(100%-40px)] overflow-y-auto bg-white snap-y">
              <div className="relative flex-none h-full pb-[320px]">
                <ul className="h-full mb-4 overflow-auto">
                  {table.foods.length > 0 &&
                    table.foods.map((food, idx) => (
                      <li
                        key={food.id}
                        className="odd:bg-pointLight flex justify-between border-b-borderColor border-b-[1px] py-2 "
                      >
                        <span className="px-4 min-w-[50px]">{idx + 1}</span>
                        <span className="basis-4/6">
                          {food.title} ({currencyFormatter.format(food.price)})
                        </span>
                        <span className="basis-2/6">x{food.quantity}</span>
                        <span className="basis-1/6">
                          {currencyFormatter.format(food.price * food.quantity)}
                        </span>
                      </li>
                    ))}
                </ul>

                <div className="absolute bottom-0 flex flex-col w-full bg-[#fff9f0] border-t-2 border-t-[#8b8b8b] h-[300px] overflow-y-auto">
                  <article className="relative h-full">
                    <div className="absolute bottom-0 bg-[#fff9f0] border-t-2 border-t-[#8b8b8b] h-[300px] w-full overflow-y-auto">
                      <TotalScreen
                        data={table}
                        type="confirm"
                        onProceed={handlePayments}
                      />
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </article>
        </div>
      </PageContent>
    </>
  );
}

export default Payments;
