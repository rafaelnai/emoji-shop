import React, { useState, useEffect, useContext } from "react";
import ShowcaseItem from "../../components/showcase-item";
import SearchField from "../../components/search-field";
import "../../styles.scss";
import Cart from "../../components/cart/cart";
import { CartContext } from "../../contexts/cart";

function EmojiShop() {
  const [products, setProducts] = useState([]);
  const [filteredText, setFilteredText] = useState("");
  const [total, setTotal] = useState(0);

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/rafaelnai/demo/products")
      .then((request) => request.json())
      .then((res) => setProducts(res));
  }, []);

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price, 0).toFixed(2));
  }, [cart]);

  const handleSearch = (e) => setFilteredText(e.target.value);

  const isFilteredItem = (value) => {
    const query = value.toLowerCase();
    const text = filteredText.toLowerCase();
    const queryInText = query.indexOf(text) === -1;

    return !(text && queryInText);
  };

  return (
    <main className="main">
      <section>
        <header className="header">
          <h1 className="header-title">Emoji Shop</h1>
          <SearchField
            handleSearch={handleSearch}
            value={filteredText}
            placeholder="Buscar..."
          />
        </header>
        <div className="showcase">
          {products.map(
            (product) =>
              isFilteredItem(product.name) && (
                <ShowcaseItem
                  key={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  handleClick={() => addToCart(product)}
                  label="Adicionar ao carrinho"
                />
              )
          )}
        </div>
      </section>
      <Cart list={cart} handleRemove={removeFromCart} total={total} />
    </main>
  );
}

export default EmojiShop;
