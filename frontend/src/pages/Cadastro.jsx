import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Máscaras
  const formatCpf = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    return v;
  };

  const formatCep = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
    return v;
  };

  const handleCpfChange = (e) => setCpf(formatCpf(e.target.value));
  const handleCepChange = (e) => setCep(formatCep(e.target.value));

  // Carregar dados iniciais do backend (CPF e endereço)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await api.get("/usuario/dados-iniciais");
        const user = res.data.user;

        setNome(user.nome || "");
        setEmail(user.email || "");
        setCpf(user.cpf ? formatCpf(user.cpf) : "");

        if (user.endereco) {
          setCep(user.endereco.cep || "");
          setRua(user.endereco.rua || "");
          setNumero(user.endereco.numero || "");
          setBairro(user.endereco.bairro || "");
          setCidade(user.endereco.cidade || "");
          setEstado(user.endereco.estado || "");
        }
      } catch (err) {
        console.error("Erro ao carregar dados iniciais", err);
      }
    };
    carregarDados();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!nome || !email) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email inválido");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Preencha a senha e confirmação");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const cpfNumeros = cpf.replace(/\D/g, "");
      const cepNumeros = cep.replace(/\D/g, "");

      await api.post("/usuario/register", {
        nome,
        cpf: cpfNumeros,
        email,
        password,
        endereco: { cep: cepNumeros, rua, numero, bairro, cidade, estado },
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form className="cadastro-form" onSubmit={handleRegister}>
        <div className="form-row">
          <label className="label-nome">Nome:<input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /></label>
          <label className="label-cpf">CPF:<input type="text" value={cpf} onChange={handleCpfChange} /></label>
        </div>

        <h3>Login</h3>
        <div className="form-row">
          <label className="label-email">Email:<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        </div>
        <div className="form-row password-row">
          <label>Senha:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <label>Confirmar senha:<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></label>
        </div>

        <h3>Endereço</h3>
        <div className="form-row">
          <label className="label-cep">CEP:<input type="text" value={cep} onChange={handleCepChange} /></label>
        </div>
        <div className="form-row">
          <label className="label-rua">Rua:<input type="text" value={rua} onChange={(e) => setRua(e.target.value)} /></label>
          <label className="label-numero">Número:<input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} /></label>
          <label className="label-bairro">Bairro:<input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} /></label>
        </div>
        <div className="form-row">
          <label className="label-cidade">Cidade:<input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} /></label>
          <label className="label-estado">Estado:<input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} /></label>
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {error && <p className="cadastro-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Cadastro;