import { Link } from "react-router-dom";
import { currencyFormatter } from "../util/util";
import Button from "./ui/Button";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

function TotalScreen({ data, onProceed, type }) {
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
        onClick={onProceed}
        className="py-2 px-4 bg-active rounded-lg border border-iconColor font-bold text-[#666] hover:text-[#333] hover:border-[#666]"
      >
        Proceed
      </Button>
      <Link
        to={`payments`}
        className="py-2 px-4 bg-point rounded-lg border border-iconColor font-bold text-white hover:text-active hover:border-[#666]"
      >
        Payment
      </Link>
    </>
  );
  if (type === "confirm") {
    buttonGroup = (
      <div className="absolute bottom-0 w-full">
        <Button className="w-full bg-active text-default hover:text-">
          Confirm Payments
        </Button>
      </div>
    );
  }
  // total price
  const totalPrice =
    data.foods.length > 0 &&
    data.foods.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

  return (
    <div className="relative h-full text-right">
      <ul className="p-4">
        {data.foods.length > 0 &&
          data.foods.map((item) => (
            <li key={item.id}>
              {item.title} : {item.price} x {item.quantity}
            </li>
          ))}
      </ul>
      <div className="absolute bottom-0 w-full">
        <h2 className="p-4 font-bold border-t-2 border-dashed border-iconColor">
          Total Price : {currencyFormatter.format(totalPrice)} 원
        </h2>
        <div className="flex justify-end gap-2 p-4 text-right">
          {buttonGroup}
        </div>
      </div>
    </div>
  );
}

export default TotalScreen;
