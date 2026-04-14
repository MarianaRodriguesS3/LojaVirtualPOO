import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import api from "../services/api";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [semNumero, setSemNumero] = useState(false); 
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Máscaras de Formatação
  const formatCpf = (value) => {
    let v = String(value).replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    return v;
  };

  const formatCep = (value) => {
    let v = String(value).replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
    return v;
  };

  // Handlers de Mudança
  const handleCpfChange = (e) => setCpf(formatCpf(e.target.value));

  const handleCepChange = (e) => {
    const novoCep = formatCep(e.target.value);
    setCep(novoCep);
    if (novoCep.replace(/\D/g, "").length === 8) {
      consultarCep(novoCep);
    }
  };

  const handleSemNumeroChange = (e) => {
    const checked = e.target.checked;
    setSemNumero(checked);
    if (checked) setNumero(""); // Limpa o campo ao marcar S/N
  };

  // Consulta à API ViaCEP para quando o usuário editar o CEP vindo do Back
  const consultarCep = async (valorCep) => {
    const cepLimpo = valorCep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = response.data;
        if (!data.erro) {
          setRua(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
          setEstado(data.uf || "");
          setError("");
          if (!semNumero) document.getElementById("input-numero").focus();
        } else {
          setError("CEP não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  // Carregar dados aleatórios do Backend ao iniciar (Mantém o número original)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await api.get("/usuario/dados-iniciais");
        const user = res.data.user;
        
        setNome(user.nome || "");
        setEmail(user.email || "");
        setCpf(user.cpf ? formatCpf(user.cpf) : "");

        if (user.endereco) {
          setCep(formatCep(user.endereco.cep || ""));
          setRua(user.endereco.rua || "");
          setBairro(user.endereco.bairro || "");
          setCidade(user.endereco.cidade || "");
          setEstado(user.endereco.estado || "");
          
          // RECEBE O NÚMERO DO BACKEND AQUI
          if (user.endereco.numero === "S/N") {
            setSemNumero(true);
            setNumero("");
          } else {
            setSemNumero(false);
            setNumero(user.endereco.numero || "");
          }
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

    const numeroFinal = semNumero ? "S/N" : numero;

    if (!nome || !email || !password || (!numeroFinal && !semNumero)) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      await api.post("/usuario/register", {
        nome,
        cpf: cpf.replace(/\D/g, ""),
        email,
        senha: password,
        endereco: { 
          cep: cep.replace(/\D/g, ""), 
          rua, 
          numero: numeroFinal, 
          bairro, 
          cidade, 
          estado 
        },
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
          <label className="label-cep">
            CEP:<input type="text" value={cep} onChange={handleCepChange} onBlur={(e) => consultarCep(e.target.value)} />
          </label>
        </div>
        
        <div className="form-row">
          <label className="label-rua">Rua:<input type="text" value={rua} onChange={(e) => setRua(e.target.value)} /></label>
          
          <div className="label-numero-container">
            <label className="label-numero">
              Número:
              <input 
                id="input-numero" 
                type="text" 
                value={numero} 
                // REGRA: Ao editar, aceita apenas números. O valor inicial vem do useEffect.
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setNumero(val);
                }} 
                disabled={semNumero} 
                placeholder={semNumero ? "S/N" : ""}
              />
            </label>
            <label className="checkbox-sn">
              <input type="checkbox" checked={semNumero} onChange={handleSemNumeroChange} />
              S/N
            </label>
          </div>

          <label className="label-bairro">Bairro:<input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} /></label>
        </div>

        <div className="form-row">
          <label className="label-cidade">Cidade:<input type="text" value={cidade} readOnly /></label>
          <label className="label-estado">Estado:<input type="text" value={estado} readOnly /></label>
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {error && <p className="cadastro-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Cadastro;