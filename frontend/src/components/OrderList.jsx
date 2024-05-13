import { currencyFormatter, headCount } from "../util/util";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/20/solid";
import FoodCartContext from "../store/FoodContext";
import InputCounter from "./ui/InputCounter";
import Select from "../components/ui/Select";
import { memo } from "react";
import TotalScreen from "./TotalScreen";
import Modal from "./ui/Modal";
import { postFetchTableOrderList } from "../util/http";
import { useRef } from "react";

// 주문 목록
const OrderList = memo(function OrderList({ data, onCurrentData }) {
  const params = useParams();
  const [orderlist, setOrderList] = useState(data);
  const dialog = useRef();
  const dialogCheck = useRef();

  // 수량 증가
  function handleIncrease(idx) {
    setOrderList((prev) => {
      return { ...prev, quantity: (orderlist.foods[idx].quantity += 1) };
    });
  }

  // 수량 감소
  function handleDecrease(idx) {
    setOrderList((prev) => {
      if (prev.foods[idx].quantity > 1) {
        return { ...prev, quantity: (orderlist.foods[idx].quantity -= 1) };
      }
    });
  }

  // 수량 직접 변환 업데이트
  function handleUpdate(idx, quantity) {
    //data[idx].quantity = quantity;
    setOrderList((prev) => {
      if (prev.foods[idx].quantity > 0) {
        return { ...prev, quantity: +quantity };
      }
    });
  }

  // 목록 삭제
  function handleRemoveItem(id) {
    const removed = orderlist.foods.filter((food) => food.id !== id);
    setOrderList((prev) => {
      return { ...prev, foods: removed };
    });
  }

  // 모달 활성화
  function openModal() {
    dialog.current.open();
  }

  // 모달 컨펌
  async function handleConfirm() {
    // 주문된 목록을 업데이트 시킨다.
    // const response = await postFetchTableOrderList(
    //   orderList,
    //   params.tableid,
    //   hc
    // );
    // console.log(response);
    dialog.current.close();
  }

  function onCloseModal() {
    dialogCheck.current.close();
  }

  // // context 에 담겼는지 유무
  // useEffect(() => {
  //   setIsLoad(true);
  //   return () => {
  //     setIsLoad(false);
  //   };
  // }, [foodsCtx.items]);

  // // db 데이터를 context 에 담아서 출력해준다.
  // useEffect(() => {
  //   foodsCtx.loadItem(data);

  //   return () => foodsCtx.clearCart();
  // }, []);
  console.log(orderlist);

  return (
    <>
      <Modal
        ref={dialog}
        title="Order"
        content="주문하시겠습니까?"
        onConfirm={handleConfirm}
      />
      <Modal
        ref={dialogCheck}
        title="Success"
        content="주문이 완료되었습니다."
        onConfirm={onCloseModal}
      ></Modal>
      <div className="flex justify-between">
        <strong className="uppercase block pb-2">
          Table No: {params.tableid}
        </strong>
        <div>
          인원수:
          <Select
            lists={headCount}
            //onChangeCurrent={setHc}
            current={orderlist.hc}
          />
        </div>
      </div>
      <ul className="mb-4 overflow-auto h-full">
        {orderlist &&
          orderlist.foods.map((food, index) => (
            <li
              key={food.id}
              className="odd:bg-pointLight relative before:content-[''] before:absolute before:left-0 before:block before:w-[3px] before:h-full before:bg-point"
            >
              <div className="py-2 flex">
                <span className="basis-[10%] text-center">{index + 1}</span>
                <div className="basis-2/5 px-3">{food.title}</div>
                <div className="basis-1/5 px-2">
                  {currencyFormatter.format(food.price)}
                </div>
                <div className="basis-1/5 text-center">
                  <InputCounter
                    count={food.quantity}
                    onIncrease={() => handleIncrease(index)}
                    onDecrease={() => handleDecrease(index)}
                    onUpdateCount={(quantity) => handleUpdate(index, +quantity)}
                    min="1"
                    max="99"
                  />
                </div>
                <span className="basis-[10%] text-center">
                  <XCircleIcon
                    className="w-6 h-6 fill-iconColor inline-block cursor-pointer hover:fill-[#b0b0b0]"
                    onClick={() => handleRemoveItem(food.id)}
                  />
                </span>
              </div>
            </li>
          ))}
      </ul>
      <div className="sub-total absolute bottom-0 bg-[#fff9f0] border-t-2 border-t-[#8b8b8b] h-[300px] w-full overflow-y-auto">
        <TotalScreen onProceed={openModal} data={orderlist} />
      </div>
    </>
  );
});
export default OrderList;
