import React from "react";

export function Button({ status, outStatus, onClick }) {
  const buttonWrapperStyle = {
    width: "206px",
    height: "177px",
    borderRadius: "6px",
    boxSizing: "border-box",
    border: "1px solid #18A0FB",
    background: outStatus ? "#11C158" : "#F51010",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#18A0FB",
    fontSize: "20px",
    cursor: "pointer"
  };

  const text = status ? "on" : "off";
  return (
    <div onClick={onClick} style={buttonWrapperStyle}>
      {text}
    </div>
  );
}
