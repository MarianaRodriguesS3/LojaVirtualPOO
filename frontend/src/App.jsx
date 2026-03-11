import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import FinalizarCompra from "./pages/FinalizarCompra"; // <-- import da nova página
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ForgotPassword from "./pages/ForgotPassword";
import EditarCadastro from "./pages/EditarCadastro";
import CartMessage from "./components/CartMessage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Cabeçalho */}
      <CartMessage /> {/* Notificação de adição ao carrinho */}

      <main>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/editar-cadastro" element={<EditarCadastro />} />

          {/* Carrinho - protegido */}
          <Route
            path="/carrinho"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Checkout - protegido */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Finalizar Compra - protegido */}
          <Route
            path="/finalizar-compra"
            element={
              <ProtectedRoute>
                <FinalizarCompra />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;