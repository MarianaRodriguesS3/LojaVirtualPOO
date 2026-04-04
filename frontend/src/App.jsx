import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CartMessage from "./components/CartMessage";
import ProtectedRoute from "./routes/ProtectedRoute";

// Páginas
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import FinalizarCompra from "./pages/FinalizarCompra";
import StatusProduto from "./pages/StatusPedido";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ForgotPassword from "./pages/ForgotPassword";
import EditarCadastro from "./pages/EditarCadastro";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Aplica scroll automático para todas as rotas */}
      <Header />
      <CartMessage />

      <main>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/editar-cadastro" element={<EditarCadastro />} />

          {/* Rotas protegidas */}
          <Route path="/carrinho" element={<ProtectedRoute> <Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute> <Checkout /></ProtectedRoute>} />
          <Route path="/finalizar-compra" element={<ProtectedRoute><FinalizarCompra /></ProtectedRoute>} />
          <Route path="/status-pedido" element={<ProtectedRoute><StatusProduto /></ProtectedRoute>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;