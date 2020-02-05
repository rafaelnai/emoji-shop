import React, { Component } from "react";
import ShowcaseItem from "./showcase-item";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      filterText: null,
      cart: []
    };
  }

  componentDidMount() {
    fetch("https://my-json-server.typicode.com/rafaelnai/demo/products")
      .then(request => request.json())
      .then(res =>
        this.setState({
          products: res
        })
      );
  }

  handleClick(product) {
    this.setState({
      cart: [...this.state.cart, product]
    });
  }

  handleRemove(id) {
    this.setState({
      cart: this.state.cart.filter(item => item.id !== id)
    });
  }

  handleSearch(e) {
    this.setState({
      filterText: e.target.value
    });
  }

  isFilteredItem(query) {
    return !(
      this.state.filterText &&
      query.toLowerCase().indexOf(this.state.filterText.toLowerCase()) === -1
    );
  }

  render() {
    return (
      <div>
        <h1>Emoji Shop</h1>
        <input
          onChange={this.handleSearch.bind(this)}
          type="search"
          placeholder="Buscar..."
          value={this.state.filterText || ""}
        />
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: "80vw" }}>
            {this.state.products.map(
              product =>
                this.isFilteredItem(product.name) && (
                  <ShowcaseItem
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    handleClick={() => this.handleClick(product)}
                    label="Adicionar ao carrinho"
                  />
                )
            )}
          </div>
          <div
            style={{
              position: "fixed",
              right: 30,
              height: "70vh",
              overflow: "auto",
              top: 110,
              border: "1px solid #ccc",
              padding: 15,
              borderRadius: 5,
              textAlign: "center",
              width: 250
            }}
          >
            <h2>Carrinho</h2>
            {this.state.cart.map(item => (
              <ShowcaseItem
                key={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                label="Remover do carrinho"
                handleClick={() => this.handleRemove(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
