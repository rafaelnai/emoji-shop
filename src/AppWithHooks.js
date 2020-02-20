import React, { useState, useEffect } from "react";
import ShowcaseItem from "./showcase-item";
import SearchField from "./search-field";
import "./styles.scss";
import Cart from "./cart/cart";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/rafaelnai/demo/products")
      .then(request => request.json())
      .then(res => setProducts(res));

    setTotal(cart.reduce((acc, item) => (acc += item.price), 0).toFixed(2));
  }, [cart]);

  const handleClick = product => setCart([...cart, product]);
  const handleRemove = id => setCart(cart.filter(item => item.id !== id));
  const handleSearch = e => setFilterText(e.target.value);
  const isFilteredItem = query =>
    !(
      filterText && query.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    );

  return (
    <div>
      <header className="header">
        <h1 className="header-title">Emoji Shop</h1>
        <SearchField
          handleSearch={handleSearch}
          value={filterText}
          placeholder="Buscar..."
        />
      </header>
      <main className="main">
        <div className="showcase">
          {products.map(
            product =>
              isFilteredItem(product.name) && (
                <ShowcaseItem
                  key={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  handleClick={() => handleClick(product)}
                  label="Adicionar ao carrinho"
                />
              )
          )}
        </div>
        <Cart total={total} list={cart} handleRemove={handleRemove} />
      </main>
    </div>
  );
}
