import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuario/register", { nome, email, password, confirmPassword });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="login-container">
      <h1>Cadastro</h1>
      <form className="login-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p className="login-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/")}>
        Voltar
      </button>
    </div>
  );
}

export default Cadastro;