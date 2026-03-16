import React, { useState, useRef, useEffect } from "react";
import "./AbaCartao.css";
import AnimacaoCartao from "./AnimacaoCartao";

export default function AbaCartao({ exibirMensagem }) {
  const inputsRef = useRef([]);
  const mesRef = useRef(null);
  const anoRef = useRef(null);
  const cvvRef = useRef(null);

  const [cartao, setCartao] = useState({
    numero: "4111111111111111",
    mes: "12",
    ano: "30",
    cvv: "123",
  });

  const [mostrarDica, setMostrarDica] = useState(false);

  useEffect(() => {
    window.validarCartao = validarCartao;
    return () => delete window.validarCartao;
  });

  const mostrarDicaCVV = () => {
    setMostrarDica(true);
    setTimeout(() => setMostrarDica(false), 4000);
  };

  const atualizarNumero = (index, valor) => {
    const numeros = cartao.numero.padEnd(16, " ").split("");
    numeros[index] = valor;
    setCartao({ ...cartao, numero: numeros.join("").trimEnd() });
  };

  const handleKeyDown = (e, index) => {
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

  const renderCartao = () => {
    const grupos = [];
    const numeros = cartao.numero.padEnd(16, " ").split("");

    for (let i = 0; i < 16; i += 4) {
      const grupo = numeros.slice(i, i + 4);

      grupos.push(
        <div key={i} className="grupo-quadradinhos">
          {grupo.map((n, idx) => {
            const index = i + idx;

            return (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="num-quadradinho"
                value={n.trim()}
                onKeyDown={(e) => handleKeyDown(e, index)}
                readOnly
              />
            );
          })}
        </div>
      );
    }

    return grupos;
  };

  const validarCartao = () => {
    if (cartao.numero.length !== 16) {
      exibirMensagem("Número do cartão incompleto", "vermelho");
      return false;
    }

    const mesNum = parseInt(cartao.mes);
    const anoNum = parseInt(cartao.ano);

    if (mesNum < 1 || mesNum > 12) {
      exibirMensagem("Mês da validade deve ser entre 01 e 12", "vermelho");
      return false;
    }

    if (anoNum <= 25) {
      exibirMensagem("Cartão expirado", "vermelho");
      return false;
    }

    if (cartao.cvv.length !== 3) {
      exibirMensagem("CVV deve ter 3 dígitos", "vermelho");
      return false;
    }

    return true;
  };

  const handleCVV = (e) => {
    let valor = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCartao({ ...cartao, cvv: valor });
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
              value={cartao.mes}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, "");
                if (valor.length > 2) valor = valor.slice(0, 2);

                setCartao((prev) => ({ ...prev, mes: valor }));
                if (valor.length === 2) anoRef.current?.focus();
              }}
            />

            <span className="barra-validade">/</span>

            <input
              ref={anoRef}
              className="validade-input"
              maxLength="2"
              value={cartao.ano}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, "").slice(0, 2);
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
              value={cartao.cvv}
              onChange={handleCVV}
            />

            <div className="cvv-info-wrapper">
              <span className="info" onClick={mostrarDicaCVV}>?</span>

              {mostrarDica && <AnimacaoCartao cvv={cartao.cvv} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}