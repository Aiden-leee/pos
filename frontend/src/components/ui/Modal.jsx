import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

/*
// 모달 
  title 모달의 타이틀
  type 모달의 타입 
      // confirm : 확인 버튼만 있음
      // choice : 확인 버튼과 취소 버튼
  handleState 모달의 상태함수 사용시   
  onConfirm 모달 컨펌 이벤트 함수 
  onReset 모달 초기화 (닫기)
*/
// handleState 초기함수
function handleStateinit() {}
const Modal = forwardRef(function Modal(
  { children, title, type, handleState = handleStateinit, onConfirm, onReset },
  ref
) {
  const dialog = useRef();

  // button type
  let typeButton;
  if (type === "confirm") {
    typeButton = (
      <>
        <Button type="button" onClick={onConfirm}>
          Confirm
        </Button>
      </>
    );
  } else if (type === "choice") {
    typeButton = (
      <>
        <Button type="button" onClick={onConfirm}>
          Confirm
        </Button>
        <Button>Cancel</Button>
      </>
    );
  } else if (type === "none") {
    typeButton = "";
  }

  // 상위 컴포넌트에서 접근하여 이벤트 처리
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
        handleState(true);
      },
      close() {
        dialog.current.close();
        handleState(false);
      },
    };
  });

  // 여백 클릭시 닫기
  function handleClose(e) {
    if (e.target.nodeName === "DIALOG") {
      dialog.current.close();
      handleState(false);
    }
  }

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onReset}
      onClick={handleClose}
      className="rounded-lg ui-modal min-w-80"
    >
      <h2 className="px-4 py-2 font-bold bg-point text-active">{title}</h2>
      <div className="p-4 modal-content">{children}</div>
      {typeButton !== "" && (
        <form
          method="dialog"
          onSubmit={onReset}
          className="flex justify-end px-4 py-2"
        >
          <div className="flex gap-2">{typeButton}</div>
        </form>
      )}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
