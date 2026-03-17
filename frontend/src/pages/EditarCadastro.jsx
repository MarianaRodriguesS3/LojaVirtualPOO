import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cadastro.css";

function EditarCadastro() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  // Dados do usuário
  const [nome, setNome] = useState(user?.nome || "");
  const [cpf, setCpf] = useState(user?.cpf || "");
  const [cep, setCep] = useState(user?.cep || "");
  const [rua, setRua] = useState(user?.rua || "");
  const [numero, setNumero] = useState(user?.numero || "");
  const [bairro, setBairro] = useState(user?.bairro || "");
  const [cidade, setCidade] = useState(user?.cidade || "");
  const [estado, setEstado] = useState(user?.estado || "");
  const [email, setEmail] = useState(user?.email || "");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await api.put(`/usuario/editar/${user.id}`, {
        nome,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        email,
        password
      });

      setMessage("Cadastro atualizado com sucesso!");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar cadastro");
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Editar Cadastro</h1>

      <form className="cadastro-form" onSubmit={handleUpdate}>

        {/* Nome e CPF */}
        <div className="form-row">
          <label className="label-nome">
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label className="label-cpf">
            CPF:
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>
        </div>

        {/* Login */}
        <h3>Login</h3>

        <div className="form-row">
          <label className="label-email">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="form-row password-row">
          <label>
            Nova senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label>
            Confirmar senha:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>

        {/* Endereço */}
        <h3>Endereço</h3>

        <div className="form-row">
          <label className="label-cep">
            CEP:
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="label-rua">
            Rua:
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </label>

          <label className="label-numero">
            Número:
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>

          <label className="label-bairro">
            Bairro:
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="label-cidade">
            Cidade:
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </label>

          <label className="label-estado">
            Estado:
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Atualizar</button>
      </form>

      {message && <p className="cadastro-success">{message}</p>}
      {error && <p className="cadastro-error">{error}</p>}

      <button className="back-button" onClick={() => navigate("/login")}>
        Voltar
      </button>
    </div>
  );
}

export default EditarCadastro;