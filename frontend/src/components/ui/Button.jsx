import React from "react";

function Button({ children, type = "submit", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="py-1 px-2 border border-iconColor hover:bg-defaultBg rounded-md"
    >
      {children}
    </button>
  );
}

export default Button;
