import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal(
  { title, type, content, onConfirm, onReset },
  ref
) {
  const dialog = useRef();

  // button type
  // confirm : 확인 버튼만 있음
  // choice : 확인 버튼과 취소 버튼
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
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  // 여백 클릭시 닫기
  function handleClose(e) {
    if (e.target.nodeName === "DIALOG") {
      dialog.current.close();
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
      <div className="p-4 modal-content">
        <p>{content}</p>
      </div>

      <form
        method="dialog"
        onSubmit={onReset}
        className="flex justify-end px-4 py-2"
      >
        <div className="flex gap-2">{typeButton}</div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
