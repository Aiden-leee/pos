import { useEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";

export default function InputCounter({
  count,
  onIncrease,
  onDecrease,
  onUpdateCount,
  min,
  max,
}) {
  const [currentCount, setCurrentCount] = useState(count);
  const InputRef = useRef();

  // input 현재 값
  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  // 현재 카운트 0 이면 1로 변환
  if (currentCount === 0) {
    setCurrentCount(1);
  }

  // 감소
  function handleDecrease() {
    setCurrentCount((current) => parseInt(current) - 1);

    onDecrease();
  }

  // 증가
  function handleIncrease() {
    setCurrentCount((current) => parseInt(current) + 1);

    onIncrease();
  }

  // 직접 변환 함수
  function onChangeCount(event) {
    const { value } = event.target;
    if (max < parseInt(value) || parseInt(value) < min) {
      setCurrentCount(1);
    } else {
      setCurrentCount(+value);
    }
  }

  // 공백 blur 로 확인
  function onChangeBlurCount(event) {
    const { value } = event.target;
    if (value === "") {
      setCurrentCount(1);
    }
    onUpdateCount(currentCount);
  }

  return (
    <>
      <div className={styles["ui-counter"]}>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
        <input
          type="number"
          ref={InputRef}
          min="1"
          max="99"
          value={currentCount}
          onChange={onChangeCount}
          onBlur={onChangeBlurCount}
        />
        <button type="button" onClick={handleIncrease}>
          +
        </button>
      </div>
    </>
  );
}
