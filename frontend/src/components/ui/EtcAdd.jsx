import { BackspaceIcon } from "@heroicons/react/24/outline";
import { forwardRef, useEffect, useState } from "react";
import { currencyFormatter } from "../../util/util";
import Button from "./Button";

// isState 상위 컴포넌트의 상태에 따라 EtcAdd 의 상태를 핸들링 하는 경우 사용
function handleCurrentData() {}
const EtcAdd = forwardRef(function EtcAdd(
  { isState = false, currentData = handleCurrentData },
  ref
) {
  const [currentValues, setCurrentValues] = useState({
    title: "",
    price: "0",
  });
  const { title, price } = currentValues;

  // 상태 값 전체 초기화
  function initValue() {
    setCurrentValues({
      title: "",
      price: "0",
    });
  }

  // 상위 컴포넌트에 데이터 전달
  function addData() {
    if (currentValues.title === "" || currentValues.price === "0") {
      alert("입력값을 전부 입력해주세요");
      return false;
    }
    currentValues.price = +currentValues.price;
    currentData(currentValues);
    ref.current.close();
  }

  // 가격 초기화
  function handleClear() {
    setCurrentValues((prev) => ({ ...prev, price: "0" }));
  }

  // 기타 명칭 입력
  function handleEtcName(event) {
    const { value } = event.target;
    setCurrentValues((prev) => ({ ...prev, title: value }));
  }

  // 가격 입력
  function handleNumber(num) {
    setCurrentValues((prev) => {
      if (
        (prev.price === "0" && num === "00") ||
        (prev.price === "0" && num === "0")
      ) {
        return prev;
      }
      const newPrice = prev.price === "0" ? num : prev.price + num;
      return { ...prev, price: newPrice };
    });
  }

  // 가격 삭제
  function handleNumberDelete() {
    setCurrentValues((prev) => {
      if (prev.price === "0") return prev;
      const newPrice = prev.price.length === 1 ? "0" : prev.price.slice(0, -1);
      return { ...prev, price: newPrice };
    });
  }

  useEffect(() => {
    if (!isState) {
      initValue();
    }
  }, [isState]);

  let btnStyle = "p-3 bg-defaultBg hover:bg-borderColor";
  return (
    <div className="py-2 pb-0">
      <div className="max-w-[300px]">
        <input
          type="text"
          value={title}
          onChange={handleEtcName}
          placeholder="기타 입력"
          className="w-full p-4 mb-2 text-right border rounded-md border-iconColor focus:outline-2"
        />
        <input
          type="text"
          value={`${currencyFormatter.format(price)} 원`}
          onChange={handleNumber}
          className="w-full p-4 mb-2 text-right border rounded-md cursor-pointer border-iconColor focus:outline-2"
          readOnly
        />
      </div>
      <div className="grid grid-cols-3 gap-1 w-full max-w-[300px]">
        <button className={btnStyle} onClick={() => handleNumber("1")}>
          1
        </button>
        <button className={btnStyle} onClick={() => handleNumber("2")}>
          2
        </button>
        <button className={btnStyle} onClick={() => handleNumber("3")}>
          3
        </button>
        <button className={btnStyle} onClick={() => handleNumber("4")}>
          4
        </button>
        <button className={btnStyle} onClick={() => handleNumber("5")}>
          5
        </button>
        <button className={btnStyle} onClick={() => handleNumber("6")}>
          6
        </button>
        <button className={btnStyle} onClick={() => handleNumber("7")}>
          7
        </button>
        <button className={btnStyle} onClick={() => handleNumber("8")}>
          8
        </button>
        <button className={btnStyle} onClick={() => handleNumber("9")}>
          9
        </button>
        <div className="grid w-full grid-cols-4 col-span-3 gap-1">
          <button className={btnStyle} onClick={() => handleNumber("00")}>
            00
          </button>
          <button className={btnStyle} onClick={() => handleNumber("0")}>
            0
          </button>
          <button className={btnStyle} onClick={handleClear}>
            Clear
          </button>
          <button
            className={`${btnStyle} text-center bg-`}
            onClick={handleNumberDelete}
          >
            <span className="inline-block align-middle">
              <BackspaceIcon className=" size-5" />
            </span>
          </button>
        </div>
      </div>
      <div className="pt-3 text-right">
        <Button onClick={addData}>ADD</Button>
      </div>
    </div>
  );
});

export default EtcAdd;
