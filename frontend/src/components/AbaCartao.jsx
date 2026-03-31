import React, { useState, useRef, useEffect } from "react";
import "./AbaCartao.css";
import AnimacaoCartao from "./AnimacaoCartao";
import api from "../services/api";

export default function AbaCartao({ exibirMensagem }) {
  const inputsRef = useRef([]);
  const mesRef = useRef(null);
  const anoRef = useRef(null);
  const cvvRef = useRef(null);

  const [cartao, setCartao] = useState({
    numero: Array(16).fill(""),
    mes: "",
    ano: "",
    cvv: "",
  });

  const [salvarCartao, setSalvarCartao] = useState(false);
  const [mostrarDica, setMostrarDica] = useState(false);

  useEffect(() => {
    carregarCartao();
  }, []);

  useEffect(() => {
    window.validarCartao = validarCartao;
    window.deveSalvarCartaoNoBanco = salvarCartao;
    window.dadosAtuaisDoCartao = {
      numero: cartao.numero.join(""),
      mes: cartao.mes,
      ano: cartao.ano,
      cvv: cartao.cvv,
    };

    return () => {
      delete window.validarCartao;
      delete window.deveSalvarCartaoNoBanco;
      delete window.dadosAtuaisDoCartao;
    };
  }, [cartao, salvarCartao]);

  const carregarCartao = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/usuario/cartao", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const dados = res.data;
      if (dados && dados.numero) {
        const numerosArray = dados.numero.padEnd(16, " ").split("").map((n) => (n === " " ? "" : n));
        setCartao({
          numero: numerosArray,
          mes: dados.mes || "",
          ano: dados.ano || "",
          cvv: dados.cvv || "",
        });
      }
    } catch (err) {
      console.error("Erro ao carregar cartão:", err);
    }
  };

  // --- LÓGICA DO NÚMERO ---
  const atualizarNumero = (index, valor) => {
    const numeros = [...cartao.numero];
    numeros[index] = valor;
    setCartao((prev) => ({ ...prev, numero: numeros }));
  };

  const handleKeyDownNumero = (e, index) => {
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      atualizarNumero(index, e.key);
      if (index < 15) inputsRef.current[index + 1]?.focus();
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      atualizarNumero(index, "");
      if (index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  // --- LÓGICA DE NAVEGAÇÃO E REGRAS DE CAMPO ---

  const handleMesChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    
    // Regra: Se o primeiro dígito for entre 2 e 9, vira "0X" e pula pro Ano
    if (valor.length === 1 && parseInt(valor) > 1) {
      valor = "0" + valor;
      setCartao(prev => ({ ...prev, mes: valor }));
      anoRef.current?.focus();
      return;
    }

    setCartao(prev => ({ ...prev, mes: valor }));
    if (valor.length === 2) anoRef.current?.focus();
  };

  const handleValidadeKeyDown = (e, campoAtual) => {
    if (e.key === "Backspace") {
      if (campoAtual === "ano" && cartao.ano === "") {
        mesRef.current?.focus();
      } else if (campoAtual === "cvv" && cartao.cvv === "") {
        anoRef.current?.focus();
      }
    }
  };

  // --- VALIDAÇÃO FINAL ---
  const validarCartao = () => {
    const { numero, mes, ano, cvv } = cartao;
    const numeroStr = numero.join("");
    
    // 1. Número Completo
    if (numeroStr.length !== 16) {
      exibirMensagem("Número do cartão incompleto", "vermelho");
      return false;
    }

    // 2. Mês Válido (01-12)
    const mesInt = parseInt(mes);
    if (!mes || mesInt < 1 || mesInt > 12) {
      exibirMensagem("Mês de validade inválido", "vermelho");
      return false;
    }

    // 3. Ano e Vencimento
    const dataAtual = new Date();
    const anoAtualCurto = parseInt(dataAtual.getFullYear().toString().slice(-2));
    const mesAtual = dataAtual.getMonth() + 1;
    const anoDigitado = parseInt(ano);

    if (!ano || ano.length < 2) {
      exibirMensagem("Ano de validade incompleto", "vermelho");
      return false;
    }

    if (anoDigitado < anoAtualCurto) {
      exibirMensagem("Cartão com validade vencida", "vermelho");
      return false;
    }

    if (anoDigitado === anoAtualCurto && mesInt < mesAtual) {
      exibirMensagem("Cartão com validade vencida", "vermelho");
      return false;
    }

    // 4. CVV
    if (cvv.length < 3) {
      exibirMensagem("CVV incompleto (mínimo 3 dígitos)", "vermelho");
      return false;
    }

    return true;
  };

  const renderCartao = () => {
    const grupos = [];
    for (let i = 0; i < 16; i += 4) {
      const grupo = cartao.numero.slice(i, i + 4);
      grupos.push(
        <div key={i} className="grupo-quadradinhos">
          {grupo.map((n, idx) => {
            const index = i + idx;
            return (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="num-quadradinho"
                value={n}
                readOnly
                onKeyDown={(e) => handleKeyDownNumero(e, index)}
              />
            );
          })}
        </div>
      );
    }
    return grupos;
  };

  return (
    <div className="painel">
      <h3>Cartão de Crédito</h3>
      <div className="cartao-inputs-container">
        
        <div className="cartao-inputs">{renderCartao()}</div>
        
        <div className="linha-cvv-validade">
          <div className="campo-validade">
            <label>Validade:</label>
            <input
              ref={mesRef}
              className="validade-input"
              maxLength="2"
              placeholder="MM"
              value={cartao.mes}
              onChange={handleMesChange}
            />
            <span className="barra-validade">/</span>
            <input
              ref={anoRef}
              className="validade-input"
              maxLength="2"
              placeholder="AA"
              value={cartao.ano}
              onKeyDown={(e) => handleValidadeKeyDown(e, "ano")}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, "");
                setCartao((prev) => ({ ...prev, ano: valor }));
                if (valor.length === 2) cvvRef.current?.focus();
              }}
            />
          </div>

          <div className="campo-cvv">
            <label>CVV:</label>
            <input
              ref={cvvRef}
              maxLength="3"
              placeholder="***"
              value={cartao.cvv}
              onKeyDown={(e) => handleValidadeKeyDown(e, "cvv")}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, "").slice(0, 3);
                setCartao(prev => ({ ...prev, cvv: valor }));
              }}
            />
            <div className="cvv-info-wrapper">
              <span className="info" onClick={() => { setMostrarDica(true); setTimeout(() => setMostrarDica(false), 4000); }}>?</span>
              {mostrarDica && <AnimacaoCartao cvv={cartao.cvv} />}
            </div>
          </div>
        </div>

        <div className="salvar-cartao">
          <label>
            <input
              type="checkbox"
              checked={salvarCartao}
              onChange={(e) => setSalvarCartao(e.target.checked)}
            />
            Salvar cartão para compras futuras
          </label>
        </div>
      </div>
    </div>
  );
}