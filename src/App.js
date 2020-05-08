import React from "react";
import "./styles.scss";
import EmojiShop from "./containers/emoji-shop/";
import { CartProvider } from "./contexts/cart";

export default function App() {
  return (
    <CartProvider>
      <EmojiShop />;
    </CartProvider>
  );
}
