// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ForgotPassword from "./pages/ForgotPassword"; // 🔹 página esqueci minha senha
import CartMessage from "./components/CartMessage";
import ProtectedRoute from "./routes/ProtectedRoute"; // 🔹 proteção de rotas

function App() {
  return (
    <BrowserRouter>
      {/* Cabeçalho */}
      <Header />

      {/* Notificação de adição ao carrinho */}
      <CartMessage />

      <main>
        <Routes>
          {/* Página inicial - pública */}
          <Route path="/" element={<Home />} />

          {/* Página de Login - pública */}
          <Route path="/login" element={<Login />} />

          {/* Página de Cadastro - pública */}
          <Route path="/register" element={<Cadastro />} />

          {/* Página Esqueci minha senha - pública */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Carrinho - protegida */}
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
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;