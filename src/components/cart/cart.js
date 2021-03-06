import React from "react";
import ShowcaseItem from "../showcase-item";

export default function Cart(props) {
  const { list, handleRemove, total } = props;

  return (
    <aside className="cart">
      <h2>Carrinho</h2>
      <h4>Total: R$ {total}</h4>
      {list.map(item => (
        <ShowcaseItem
          key={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          label="Remover do carrinho"
          handleClick={() => handleRemove(item.id)}
        />
      ))}
    </aside>
  );
}
