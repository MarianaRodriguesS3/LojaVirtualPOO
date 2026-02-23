// src/pages/EditarCadastro.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function EditarCadastro() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recebe os dados do usuário via state
  const user = location.state?.user;

  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validação de senha mínima de 8 caracteres
    if (password && password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      return;
    }

    // Confirmação de senha
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await api.put(`/usuario/editar/${user.id}`, {
        nome,
        email,
        password,
      });

      setMessage("Cadastro atualizado com sucesso!");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar cadastro");
    }
  };

  return (
    <div className="login-container">
      <h1>Editar Cadastro</h1>
      <form className="login-form" onSubmit={handleUpdate}>
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
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Atualizar</button>
      </form>
      {message && <p className="login-success">{message}</p>}
      {error && <p className="login-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/login")}>
        Voltar
      </button>
    </div>
  );
}

export default EditarCadastro;