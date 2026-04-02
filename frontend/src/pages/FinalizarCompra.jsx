import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FinalizarCompra.css";
import AbaPix from "../components/AbaPix";
import AbaCartao from "../components/AbaCartao";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

export default function FinalizarCompra() {
  const location = useLocation();
  const { products } = location.state || {};
  const { removeFromCart } = useContext(CartContext);

  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    endereco: "",
  });

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

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/usuario/dados-usuario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;
        const enderecoCompleto = `${user.endereco?.rua || ""}, ${user.endereco?.numero || ""} - ${user.endereco?.bairro || ""} - ${user.endereco?.cidade || ""} - ${user.endereco?.estado || ""} - ${user.endereco?.cep || ""}`;

        setDados({
          nome: user.nome || "",
          cpf: user.cpf || "",
          endereco: enderecoCompleto,
        });
      } catch (err) {
        console.error("Erro ao carregar dados do usuário", err);
      }
    };

    carregarDadosUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  // --- FUNÇÃO DE FINALIZAÇÃO CORRIGIDA ---
  const finalizarPagamento = async () => {
    if (!abaAtiva) {
      exibirMensagem("Escolher forma de pagamento", "vermelho");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      // Objeto base da compra
      let payload = {
        produtos: products,
        total: totalGeral,
        formaPagamento: abaAtiva
      };

      // Se for cartão, valida e anexa os dados globais definidos na AbaCartao
      if (abaAtiva === "cartao") {
        const valido = window.validarCartao?.();
        if (!valido) return;

        payload.cartao = window.dadosAtuaisDoCartao;
        payload.salvarCartaoNoBanco = window.deveSalvarCartaoNoBanco;
      }

      // CHAMADA PARA O BACKEND (O que estava faltando!)
      const response = await api.post("/usuario/finalizar-compra", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.sucesso) {
        exibirMensagem("Compra finalizada com sucesso!", "verde");

        // Remove os produtos do carrinho local
        products.forEach((product) => {
          removeFromCart(product.id, product.size, product.name);
        });
      }
    } catch (err) {
      console.error("Erro ao processar compra:", err);
      exibirMensagem("Erro ao processar pagamento. Tente novamente.", "vermelho");
    }
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

      <div className="form">
        <h3>Dados do Cliente</h3>
        <label>Nome</label>
        <input name="nome" value={dados.nome} onChange={handleChange} />

        <label>CPF</label>
        <input name="cpf" value={dados.cpf} disabled />

        <label>Endereço</label>
        <input name="endereco" value={dados.endereco} onChange={handleChange} />
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