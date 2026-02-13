import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"; // nova página
import CartMessage from "./components/CartMessage";

function App() {
  return (
    <BrowserRouter>
      {/* Cabeçalho */}
      <Header />

      {/* Notificação de adição ao carrinho */}
      <CartMessage />

      <main>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Carrinho global */}
          <Route path="/carrinho" element={<Cart />} />

          {/* Checkout do botão "Comprar" */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
