import { currencyFormatter } from "../util/util";

// 메뉴 목록
function CardList({ data, onCurrentData }) {
  // menu 추가
  // function onAddItem(item, id) {
  //   onCurrentData((prevItems) => {
  //     const updatedItems = prevItems.map((prev) => {
  //       if (prev.id === id) {
  //         // 기존 아이템의 경우 수량을 증가시킴
  //         return { ...prev, quantity: prev.quantity + 1 };
  //       }
  //       return prev;
  //     });

  //     if (!updatedItems.some((prev) => prev.id === id)) {
  //       // 새로운 아이템인 경우 추가
  //       updatedItems.push({ ...item, quantity: 1 });
  //     }

  //     return updatedItems;
  //   });
  // }

  return (
    <ul className="grid grid-cols-4 gap-4">
      {data.map((list) => (
        <li
          key={list.id}
          className="bg-white rounded-lg cursor-pointer outline outline-0 hover:outline-1 hover:outline-point"
          //onClick={() => onAddItem(list, list.id)}
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
