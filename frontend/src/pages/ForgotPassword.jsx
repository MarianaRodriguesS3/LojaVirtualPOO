// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Informe o email cadastrado");
      return;
    }

    try {
      // Chama a API para verificar se o email existe
      const response = await api.post("/usuario/verificar-email", { email });

      const user = response.data.user;

      // Se encontrou, redireciona para EditarCadastro enviando dados do usuário
      navigate("/editar-cadastro", { state: { user } });
    } catch (err) {
      // Se a API retornar erro 400 ou 404 → email não cadastrado
      setError(err.response?.data?.message || "Email não cadastrado");
    }
  };

  return (
    <div className="login-container">
      <h1>Esqueci minha senha</h1>
      <form className="login-form" onSubmit={handleContinue}>
        <input
          type="email"
          placeholder="Email cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Continuar</button>
      </form>
      {error && <p className="login-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/login")}>
        Voltar
      </button>
    </div>
  );
}

export default ForgotPassword;