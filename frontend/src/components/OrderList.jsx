import { currencyFormatter, headCount } from "../util/util";
import { useState, useRef, memo } from "react";
import { useParams } from "react-router-dom";
import { XCircleIcon, PlusIcon } from "@heroicons/react/20/solid";

import InputCounter from "./ui/InputCounter";
import Select from "../components/ui/Select";
import TotalScreen from "./TotalScreen";
import Modal from "./ui/Modal";
import { useEffect } from "react";
import { postFetchTableOrderList } from "../util/http";
import { useCallback } from "react";
import EtcAdd from "./ui/EtcAdd";
import Button from "./ui/Button";

// 주문 목록
const OrderList = memo(function OrderList({ data, onCurrentData }) {
  const params = useParams();
  const dialog = useRef(); // 주문확인
  const dialogCheck = useRef(); // 주문 완료
  const dialogEtc = useRef(); // 기타 추가
  const [orderlist, setOrderList] = useState(data);
  const [etcItem, setEtcItem] = useState();
  const [isEtcState, setIsEtcState] = useState(false);

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

  // etc 추가
  function handleEtcAdd() {
    dialogEtc.current.open();
    setIsEtcState(true);
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

  // etc 추가 시 orderList 를 업데이트 한다.
  useEffect(() => {
    if (etcItem) {
      const addEtc = {
        id: "etc" + (Math.random() * 999).toFixed(2),
        quantity: 1,
        ...etcItem,
      };
      setOrderList((prev) => {
        const etcUpdate = [...prev.foods, addEtc];
        return {
          ...prev,
          foods: etcUpdate,
        };
      });
    }
  }, [etcItem, setOrderList]);

  useEffect(() => {
    onCurrentData(() => orderlist);
  }, [orderlist, onCurrentData]);

  return (
    <>
      <Modal ref={dialog} title="Order" type="choice" onConfirm={handleConfirm}>
        주문하시겠습니까?
      </Modal>
      <Modal
        ref={dialogCheck}
        title="Success"
        type="confirm"
        onConfirm={handleConfirmOk}
      >
        주문이 완료되었습니다.
      </Modal>
      <Modal
        ref={dialogEtc}
        title="기타 추가"
        type="none"
        handleState={setIsEtcState}
      >
        <EtcAdd ref={dialogEtc} isState={isEtcState} currentData={setEtcItem} />
      </Modal>
      <div className="flex items-center pb-2">
        <strong className="block uppercase w-[130px]">
          Table No: {params.tableid}
        </strong>
        <div className="grow">
          인원수:
          <Select
            lists={headCount}
            onChangeCurrent={(hc) => handleChangeHeadCount(hc)}
            current={orderlist.hc}
          />
        </div>
        <div className="text-right">
          <Button className="flex items-center" onClick={handleEtcAdd}>
            <span>ETC</span> <PlusIcon className="size-4" />
          </Button>
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
      <div className="absolute bottom-0 bg-[#fff9f0] border-t-2 border-t-[#8b8b8b] h-[300px] w-full overflow-y-auto">
        <TotalScreen onProceed={openModal} data={orderlist} />
      </div>
    </>
  );
});
export default OrderList;
