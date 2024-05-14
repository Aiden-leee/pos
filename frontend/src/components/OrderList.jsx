import { currencyFormatter, headCount } from "../util/util";
import { useState, useRef, memo } from "react";
import { useParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/20/solid";
import InputCounter from "./ui/InputCounter";
import Select from "../components/ui/Select";
import TotalScreen from "./TotalScreen";
import Modal from "./ui/Modal";
import { useEffect } from "react";
import { postFetchTableOrderList } from "../util/http";
import { useCallback } from "react";

// 주문 목록
const OrderList = memo(function OrderList({ data, onCurrentData }) {
  const params = useParams();
  const dialog = useRef();
  const dialogCheck = useRef();
  const [orderlist, setOrderList] = useState(data);

  // 수량 증가
  function handleIncrease(food) {
    setOrderList((prev) => {
      food.quantity = food.quantity += 1;
      return { ...prev };
    });
  }

  // 수량 감소
  function handleDecrease(food) {
    setOrderList((prev) => {
      food.quantity = food.quantity -= 1;
      return { ...prev };
    });
  }

  // 수량 직접 변환 업데이트
  function handleUpdate(food, quantity) {
    setOrderList((prev) => {
      food.quantity = quantity;
      return { ...prev };
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

  // 인원수 변경
  function handleChangeHeadCount(hc) {
    setOrderList((prev) => {
      return { ...prev, hc };
    });
  }

  // 모달 컨펌
  const handleConfirm = useCallback(
    async function handleConfirm() {
      // 주문된 목록을 업데이트 시킨다.
      const response = await postFetchTableOrderList(orderlist, params.tableid);
      dialog.current.close();
      if (response.status === 200) {
        dialogCheck.current.open();
      }
    },
    [orderlist, params.tableid]
  );

  // 주문 모달 닫기
  function handleConfirmOk() {
    dialogCheck.current.close();
  }

  useEffect(() => {
    onCurrentData(() => orderlist);
  }, [orderlist, onCurrentData]);

  return (
    <>
      <Modal
        ref={dialog}
        title="Order"
        content="주문하시겠습니까?"
        type="choice"
        onConfirm={handleConfirm}
      />
      <Modal
        ref={dialogCheck}
        title="Success"
        content="주문이 완료되었습니다."
        type="confirm"
        onConfirm={handleConfirmOk}
      ></Modal>
      <div className="flex justify-between">
        <strong className="block pb-2 uppercase">
          Table No: {params.tableid}
        </strong>
        <div>
          인원수:
          <Select
            lists={headCount}
            onChangeCurrent={(hc) => handleChangeHeadCount(hc)}
            current={orderlist.hc}
          />
        </div>
      </div>
      <ul className="h-full mb-4 overflow-auto">
        {orderlist &&
          orderlist.foods.map((food, index) => (
            <li
              key={food.id}
              className="odd:bg-pointLight relative before:content-[''] before:absolute before:left-0 before:block before:w-[3px] before:h-full before:bg-point"
            >
              <div className="flex py-2">
                <span className="basis-[10%] text-center">{index + 1}</span>
                <div className="px-3 basis-2/5">{food.title}</div>
                <div className="px-2 basis-1/5">
                  {currencyFormatter.format(food.price)}
                </div>
                <div className="text-center basis-1/5">
                  <InputCounter
                    count={food.quantity}
                    onIncrease={() => handleIncrease(food)}
                    onDecrease={() => handleDecrease(food)}
                    onUpdateCount={(quantity) => handleUpdate(food, +quantity)}
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
