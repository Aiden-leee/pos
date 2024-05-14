import { currencyFormatter } from "../util/util";

// 메뉴 목록
function CardList({ data, orderData, onCurrentData }) {
  // 메뉴 클릭시 추가
  function onAddItem(item, id) {
    const exist = orderData.foods.some((food) => food.id === id);
    let updated;
    if (exist) {
      updated = orderData.foods.map((food) => {
        if (food.id === id) {
          food.quantity = food.quantity += 1;
        }
        return food;
      });
    } else {
      orderData.foods.push({ ...item, quantity: 1 });
    }
    onCurrentData(updated);
  }

  return (
    <ul className="grid grid-cols-4 gap-4">
      {data.map((list) => (
        <li
          key={list.id}
          className="bg-white rounded-lg cursor-pointer outline outline-0 hover:outline-1 hover:outline-point"
          onClick={() => onAddItem(list, list.id)}
        >
          <div className="text-center">
            <div className="image-box w-full">
              <img
                src={`http://localhost:3000/${list.image}`}
                alt=""
                className="object-cover h-36 w-full rounded-t-lg"
              />
            </div>
            <div className="py-2">
              <h2>{list.title}</h2>
              <span className="font-bold">
                {currencyFormatter.format(list.price)}원
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CardList;
