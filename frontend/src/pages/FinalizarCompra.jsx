import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FinalizarCompra.css";
import AbaPix from "../components/AbaPix";
import AbaCartao from "../components/AbaCartao";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import { CartContext } from "../context/CartContext";

export default function FinalizarCompra() {
  const location = useLocation();
  const { products } = location.state || {};
  const { removeFromCart } = useContext(CartContext);

  // Dados do cliente
  const [dados, setDados] = useState({
    nome: "João da Silva",
    cpf: "123.456.789-00",
    endereco: "Rua Exemplo, 123 - Centro - São Paulo",
  });

  const handleChange = (e) =>
    setDados({ ...dados, [e.target.name]: e.target.value });

  const [mensagem, setMensagem] = useState({ texto: "", cor: "" });
  const [abaAtiva, setAbaAtiva] = useState(null);

  const exibirMensagem = (texto, cor) => {
    setMensagem({ texto, cor });
    setTimeout(() => setMensagem({ texto: "", cor: "" }), 3000);
  };

  const toggleAba = (tipo) =>
    setAbaAtiva((prev) => (prev === tipo ? null : tipo));

  const totalGeral = products
    ? products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2)
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

    // Remove os produtos do carrinho
    products.forEach((product) => {
      removeFromCart(product.id, product.size, product.name);
    });
  };

  if (!products || products.length === 0) {
    return (
      <div className="container">
        <h2>Nenhum produto selecionado.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Finalizar Compra</h2>

      {/* Lista de produtos */}
      {products.map((product, index) => {
        const total = (product.price * product.quantity).toFixed(2);
        return (
          <div className="cart-item checkout-layout-grid" key={index}>
            <div className="checkout-col-image">
              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="checkout-col-info">
              <h3>{product.name}</h3>
              {product.size && <p><strong>Tamanho:</strong> {product.size}</p>}
              <p><strong>Quantidade:</strong> {product.quantity}</p>
              <p className="price">R$ {total}</p>
            </div>
          </div>
        );
      })}

      <h3>Total do pedido: R$ {totalGeral}</h3>

      {/* Dados do cliente */}
      <div className="form">
        <h3>Dados do Cliente</h3>
        <label>Nome</label>
        <input name="nome" value={dados.nome} onChange={handleChange} />

        <label>CPF</label>
        <input name="cpf" value={dados.cpf} disabled />

        <label>Endereço</label>
        <input name="endereco" value={dados.endereco} onChange={handleChange} />
      </div>

      {/* Abas de pagamento */}
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