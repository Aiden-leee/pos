import { currencyFormatter } from "../util/util";

function TotalScreen({ data, onProceed }) {
  // total price
  const totalPrice = data.foods.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  return (
    <div className="relative h-full text-right">
      <ul className="p-4">
        {data.foods.map((item) => (
          <li key={item.id}>
            {item.title} : {item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 w-full">
        <h2 className="p-4 font-bold border-dashed border-t-2 border-iconColor">
          Total Price : {currencyFormatter.format(totalPrice)} 원
        </h2>
        <div className="text-right p-4">
          <button
            onClick={onProceed}
            className="py-2 px-4 bg-active rounded-lg border border-iconColor font-bold text-[#666] hover:text-[#333] hover:border-[#333]"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default TotalScreen;
