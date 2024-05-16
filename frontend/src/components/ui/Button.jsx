import React from "react";

function Button({ children, type = "submit", onClick, className, ...props }) {
  let classes =
    "px-2 py-1 border rounded-md border-iconColor hover:bg-defaultBg";
  if (className) {
    classes = `${classes} ${className}`;
  }
  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
