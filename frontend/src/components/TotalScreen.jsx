import { Link, useNavigate } from "react-router-dom";
import { currencyFormatter } from "../util/util";
import Button from "./ui/Button";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

function TotalScreen({ data, onProceed, type, isProceed }) {
  const navi = useNavigate();
  const [hasFoodsState, setHasFoodsState] = useState(false);

  // food 있는경우 payment 활성화
  useEffect(() => {
    if (data && data.foods.length > 0) {
      setHasFoodsState(true);
    }
  }, [data]);

  let buttonGroup = (
    <>
      <Link
        to=".."
        className="inline-block align-middle py-2 px-4 bg-pointLight rounded-lg border border-iconColor font-bold text-[#666] hover:text-[#333] hover:border-[#666]"
        title="back to page"
      >
        <ArrowUturnLeftIcon className="size-5" />
      </Link>
      <Button
        type="button"
        onClick={onProceed}
        className={`py-2 px-4 bg-active rounded-lg border border-iconColor font-bold text-[#666] hover:text-[#333] hover:border-[#666] ${
          !isProceed
            ? "bg-iconColor cursor-not-allowed hover:bg-iconColor border-none hover:text-borderColor text-borderColor"
            : ""
        }`}
        disabled={!isProceed ? true : false}
      >
        Proceed
      </Button>
      <Button
        type="button"
        onClick={() => navi("payments")}
        className={`py-2 px-4 bg-point rounded-lg border border-iconColor font-bold text-white hover:text-active hover:border-[#666] ${
          !hasFoodsState
            ? "bg-iconColor cursor-not-allowed hover:bg-iconColor border-none hover:text-borderColor text-borderColor"
            : ""
        }`}
        disabled={!hasFoodsState ? true : false}
      >
        Payment
      </Button>
    </>
  );

  // confirm 타입의 버튼 ( payment)
  // print 버튼 타입
  if (type === "confirm") {
    buttonGroup = (
      <div className="absolute bottom-0 w-full">
        <Button className="w-full bg-active text-default" onClick={onProceed}>
          Confirm Payments
        </Button>
      </div>
    );
  } else if (type === "print") {
    buttonGroup = (
      <div className="bottom-0 w-full flex flex-auto items-center gap-2">
        <Link
          to=".."
          className="inline-block align-middle py-2 px-4 bg-pointLight rounded-lg border border-iconColor font-bold text-[#666] hover:text-[#333] hover:border-[#666]"
          title="back to page"
        >
          <ArrowUturnLeftIcon className="size-5" />
        </Link>

        <Button
          className="w-full h-full bg-vacant hover:bg-[#0c851f] text-white"
          onClick={() => onProceed(data)}
        >
          Print Invoice
        </Button>
      </div>
    );
  }
  // total price
  const totalPrice =
    data &&
    data.foods.length > 0 &&
    data.foods.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

  return (
    <div className="relative h-full text-right">
      <ul className="p-4 h-[160px] overflow-y-auto box-border">
        {data &&
          data.foods.length > 0 &&
          data.foods.map((item) => (
            <li key={item.id}>
              {item.title} : {item.price} x {item.quantity}
            </li>
          ))}
      </ul>
      <div className="absolute bottom-0 w-full">
        <h2 className="p-4 font-bold border-t-2 border-dashed border-iconColor">
          Total Price : {currencyFormatter.format(totalPrice ? totalPrice : 0)}
          원
        </h2>
        <div className="flex justify-end gap-2 p-4 text-right">
          {buttonGroup}
        </div>
      </div>
    </div>
  );
}

export default TotalScreen;
