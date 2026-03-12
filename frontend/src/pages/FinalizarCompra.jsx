import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./FinalizarCompra.css";
import boletoImg from "../assets/boletobancario.jpg";

export default function FinalizarCompra() {
  const location = useLocation();
  const { product } = location.state || {};

  // Refs para inputs do cartão e validade
  const inputsRef = useRef([]);
  const mesRef = useRef(null);
  const anoRef = useRef(null);
  const cvvRef = useRef(null);

  // Estados
  const [dados, setDados] = useState({
    nome: "João da Silva",
    cpf: "123.456.789-00",
    endereco: "Rua Exemplo, 123 - Centro - São Paulo",
  });

  const [cartao, setCartao] = useState({
    numero: "4111111111111111",
    mes: "12",
    ano: "30",
    cvv: "123",
  });

  const [abaAtiva, setAbaAtiva] = useState(null);
  const [mensagem, setMensagem] = useState({ texto: "", cor: "" });

  // Manipulação dos dados pessoais
  const handleChange = (e) =>
    setDados({ ...dados, [e.target.name]: e.target.value });

  // Manipulação do CVV
  const handleCartaoChange = (e) =>
    setCartao({ ...cartao, [e.target.name]: e.target.value });

  // Atualiza os dígitos do número do cartão no índice indicado
  const atualizarNumero = (index, valor) => {
    const numeros = cartao.numero.padEnd(16, " ").split("");
    numeros[index] = valor;
    setCartao({ ...cartao, numero: numeros.join("").trimEnd() });
  };

  // Tratamento do teclado para sobrescrever e navegar entre caixinhas do cartão
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

  // Renderiza os inputs do cartão agrupados de 4 em 4
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

  // Alterna abas de pagamento
  const toggleAba = (tipo) =>
    setAbaAtiva((prev) => (prev === tipo ? null : tipo));

  const total = product
    ? (product.price * product.quantity).toFixed(2)
    : "0.00";

  const exibirMensagem = (texto, cor) => {
    setMensagem({ texto, cor });
    setTimeout(() => setMensagem({ texto: "", cor: "" }), 3000);
  };

  const handleFinalizar = () => {
    if (!abaAtiva) {
      exibirMensagem("Escolher forma de pagamento", "vermelho");
      return;
    }
    exibirMensagem("Compra finalizada", "verde");
  };

  if (!product) {
    return (
      <div className="container">
        <h2>Nenhum produto selecionado.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Finalizar Compra</h2>

      {/* Resumo do pedido */}
      <div className="cart-item checkout-layout-grid">
        <div className="checkout-col-image">
          <img
            src={`http://localhost:5000/images/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="checkout-col-info">
          <h3>{product.name}</h3>
          <p><strong>Tamanho:</strong> {product.size}</p>
          <p><strong>Quantidade:</strong> {product.quantity}</p>
          <p className="price">R$ {total}</p>
        </div>
      </div>

      {/* Dados do comprador */}
      <div className="form">
        <h3>Dados Pessoais</h3>
        <label>Nome</label>
        <input name="nome" value={dados.nome} onChange={handleChange} />

        <label>CPF</label>
        <input name="cpf" value={dados.cpf} disabled />

        <label>Endereço</label>
        <input name="endereco" value={dados.endereco} onChange={handleChange} />
      </div>

      {/* Seleção de pagamento */}
      <div className="tabs">
        <h3>Forma de Pagamento</h3>
        <button
          className={abaAtiva === "pix" ? "selecionado" : ""}
          onClick={() => toggleAba("pix")}
        >Pix</button>
        <button
          className={abaAtiva === "boleto" ? "selecionado" : ""}
          onClick={() => toggleAba("boleto")}
        >Boleto</button>
        <button
          className={abaAtiva === "cartao" ? "selecionado" : ""}
          onClick={() => toggleAba("cartao")}
        >Cartão</button>
      </div>

      {/* Aba Pix */}
      {abaAtiva === "pix" && (
        <div className="painel">
          <h3>Pagamento via Pix</h3>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pix-ficticio"
            alt="QR Code Pix"
            className="qr"
          />
          <div className="pix-chave">
            <input value="chavepix@exemplo.com" readOnly />
            <button onClick={() => navigator.clipboard.writeText("chavepix@exemplo.com")}>
              Copiar chave
            </button>
          </div>
        </div>
      )}

      {/* Aba Boleto */}
      {abaAtiva === "boleto" && (
        <div className="painel">
          <h3>Boleto Bancário</h3>
          <img src={boletoImg} alt="Boleto" className="boleto" />
        </div>
      )}

      {/* Aba Cartão */}
      {abaAtiva === "cartao" && (
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
                  name="mes"
                  maxLength="2"
                  value={cartao.mes}
                  onChange={(e) => {
                    let valor = e.target.value.replace(/\D/g, "");
                    if (valor.length > 2) {
                      const excess = valor.slice(2, 3);
                      valor = valor.slice(0, 2);
                      setCartao((prev) => ({
                        ...prev,
                        mes: valor,
                        ano: excess + prev.ano,
                      }));
                      anoRef.current?.focus();
                    } else {
                      setCartao((prev) => ({ ...prev, mes: valor }));
                      if (valor.length === 2) anoRef.current?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key >= "0" &&
                      e.key <= "9" &&
                      cartao.mes.length === 2
                    ) {
                      e.preventDefault();
                      setCartao((prev) => ({ ...prev, ano: e.key }));
                      anoRef.current?.focus();
                    }
                  }}
                />
                <span className="barra-validade">/</span>
                <input
                  ref={anoRef}
                  className="validade-input"
                  name="ano"
                  maxLength="2"
                  value={cartao.ano}
                  onChange={(e) => {
                    let valor = e.target.value.replace(/\D/g, "");
                    if (valor.length > 2) valor = valor.slice(0, 2);
                    setCartao((prev) => ({ ...prev, ano: valor }));
                    if (valor.length === 0) mesRef.current?.focus();
                    else if (valor.length === 2) cvvRef.current?.focus();
                  }}
                />
              </div>

              <div className="campo-cvv">
                <label>CVV:</label>
                <input
                  ref={cvvRef}
                  name="cvv"
                  value={cartao.cvv}
                  onChange={handleCartaoChange}
                />
                <span className="info">?</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button className="finalizar" onClick={handleFinalizar}>
        Finalizar Compra
      </button>

      {mensagem.texto && (
        <p className={`mensagem ${mensagem.cor}`}>{mensagem.texto}</p>
      )}
    </div>
  );
}