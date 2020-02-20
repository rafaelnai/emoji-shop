import React, { Component } from "react";
import ShowcaseItem from "../../components/showcase-item";
import SearchField from "../../components/search-field";
import "../../styles.scss";
import Cart from "../../components/cart/cart";

class EmojiShop extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      filterText: "",
      cart: [],
      total: 0
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cart !== prevState.cart) {
      this.setState({
        total: this.state.cart
          .reduce((acc, item) => acc + item.price, 0)
          .toFixed(2)
      });
    }
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
      <main className="main">
        <section>
          <header className="header">
            <h1 className="header-title">Emoji Shop</h1>
            <SearchField
              handleSearch={this.handleSearch.bind(this)}
              value={this.state.filterText}
              placeholder="Buscar..."
            />
          </header>
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
        </section>
        <Cart
          list={this.state.cart}
          handleRemove={this.handleRemove.bind(this)}
          total={this.state.total}
        />
      </main>
    );
  }
}

export default EmojiShop;
