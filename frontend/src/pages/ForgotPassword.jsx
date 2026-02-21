// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css"; // mantém o mesmo estilo do login

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/forgot-password", { email }); // rota backend que você vai criar depois
      setMessage("Email de redefinição enviado! Verifique sua caixa de entrada.");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao enviar email");
    }
  };

  return (
    <div className="login-container">
      <h1>Esqueci minha senha</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar email</button>
      </form>
      {message && <p className="login-success">{message}</p>}
      {error && <p className="login-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/login")}>
        Voltar
      </button>
    </div>
  );
}

export default ForgotPassword;