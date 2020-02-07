import React, { Component } from "react";
import ShowcaseItem from "./showcase-item";
import SearchField from "./search-field";
import "./styles.scss";
import Cart from "./cart/cart";

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
        <div className="header">
          <h1 className="header-title">Emoji Shop</h1>
          <SearchField
            handleSearch={this.handleSearch.bind(this)}
            value={this.state.filterText}
            placeholder="Buscar..."
          />
        </div>
        <div style={{ display: "flex" }}>
          <div className="showcase">
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
          <Cart
            list={this.state.cart}
            handleRemove={this.handleRemove.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
