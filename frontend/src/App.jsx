import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartMessage from "./components/CartMessage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <CartMessage />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
