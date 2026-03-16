import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./FinalizarCompra.css";
import AbaPix from "../components/AbaPix";
import AbaCartao from "../components/AbaCartao";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";

export default function FinalizarCompra() {
  const location = useLocation();
  const { product } = location.state || {};

  const [mensagem, setMensagem] = useState({ texto: "", cor: "" });
  const [abaAtiva, setAbaAtiva] = useState(null);

  const exibirMensagem = (texto, cor) => {
    setMensagem({ texto, cor });
    setTimeout(() => setMensagem({ texto: "", cor: "" }), 3000);
  };

  const toggleAba = (tipo) =>
    setAbaAtiva((prev) => (prev === tipo ? null : tipo));

  const total = product
    ? (product.price * product.quantity).toFixed(2)
    : "0.00";

  const finalizarPagamento = () => {
    if (!abaAtiva) {
      exibirMensagem("Escolher forma de pagamento", "vermelho");
      return;
    }

    if (abaAtiva === "cartao") {
      const valido = window.validarCartao?.();
      if (!valido) return;
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

      <div className="tabs">
        <h3>Forma de Pagamento</h3>
        <button
          className={abaAtiva === "pix" ? "selecionado" : ""}
          onClick={() => toggleAba("pix")}
        >
          Pix
        </button>
        <button
          className={abaAtiva === "boleto" ? "selecionado" : ""}
          onClick={() => toggleAba("boleto")}
        >
          Boleto
        </button>
        <button
          className={abaAtiva === "cartao" ? "selecionado" : ""}
          onClick={() => toggleAba("cartao")}
        >
          Cartão
        </button>
      </div>

      {(abaAtiva === "pix" || abaAtiva === "boleto") && <AbaPix tipo={abaAtiva} />}
      {abaAtiva === "cartao" && <AbaCartao exibirMensagem={exibirMensagem} />}

      {/* Alinha o botão à direita */}
      <div className="finalizar-btn-wrapper">
        <BtnFinalizarCompra onClick={finalizarPagamento} />
      </div>

      {mensagem.texto && (
        <p className={`mensagem ${mensagem.cor}`}>
          {mensagem.texto}
        </p>
      )}
    </div>
  );
}