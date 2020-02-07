import React from "react";

export default function ShowcaseItem(props) {
  const { name, image, price, handleClick, label } = props;

  return (
    <div className="showcase-item">
      <img width={50} alt={name} src={image} />
      <h3>{name}</h3>
      <span>R$ {price}</span>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
}
