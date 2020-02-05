import React from "react";

export default function ShowcaseItem(props) {
  const { name, image, price, handleClick, label } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: 200,
        margin: 10,
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 5
      }}
    >
      <img width={50} alt={name} src={image} />
      <h3>{name}</h3>
      <span>R$ {price}</span>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
}
