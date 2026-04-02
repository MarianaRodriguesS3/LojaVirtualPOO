import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import "./Cadastro.css";

function EditarCadastro() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [semNumero, setSemNumero] = useState(false); // Regra S/N
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
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

  // Carregar dados do usuário ao abrir a página
  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setCpf(user.cpf ? formatCpf(user.cpf) : "");
      setEmail(user.email || "");

      if (user.endereco) {
        setCep(user.endereco.cep ? formatCep(user.endereco.cep) : "");
        setRua(user.endereco.rua || "");
        setBairro(user.endereco.bairro || "");
        setCidade(user.endereco.cidade || "");
        setEstado(user.endereco.estado || "");
        
        // Regra para tratar o número vindo do banco
        if (user.endereco.numero === "S/N") {
          setSemNumero(true);
          setNumero("");
        } else {
          setSemNumero(false);
          setNumero(user.endereco.numero || "");
        }
      }
    }
  }, [user]);

  // Função para buscar CEP (quando o usuário editar)
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
    if (checked) setNumero(""); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const numeroFinal = semNumero ? "S/N" : numero;

    if (!nome || !email) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    if (password && password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await api.put(`/usuario/editar/${user.id}`, {
        nome,
        cpf: cpf.replace(/\D/g, ""),
        email,
        password: password || undefined,
        endereco: {
          cep: cep.replace(/\D/g, ""),
          rua,
          numero: numeroFinal,
          bairro,
          cidade,
          estado,
        },
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
        <div className="form-row">
          <label className="label-nome">
            Nome:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label className="label-cpf">
            CPF:
            <input type="text" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} />
          </label>
        </div>

        <h3>Login</h3>
        <div className="form-row">
          <label className="label-email">
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>

        <div className="form-row password-row">
          <label>
            Nova senha:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Confirmar senha:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
        </div>

        <h3>Endereço</h3>
        <div className="form-row">
          <label className="label-cep">
            CEP:
            <input type="text" value={cep} onChange={handleCepChange} onBlur={(e) => consultarCep(e.target.value)} />
          </label>
        </div>

        <div className="form-row">
          <label className="label-rua">
            Rua:
            <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} />
          </label>

          <div className="label-numero-container">
            <label className="label-numero">
              Número:
              <input
                id="input-numero"
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
                disabled={semNumero}
                placeholder={semNumero ? "S/N" : ""}
              />
            </label>
            <label className="checkbox-sn">
              <input type="checkbox" checked={semNumero} onChange={handleSemNumeroChange} />
              S/N
            </label>
          </div>

          <label className="label-bairro">
            Bairro:
            <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
          </label>
        </div>

        <div className="form-row">
          <label className="label-cidade">
            Cidade:
            <input type="text" value={cidade} readOnly />
          </label>
          <label className="label-estado">
            Estado:
            <input type="text" value={estado} readOnly />
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