import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FinalizarCompra.css";
import AbaPix from "../components/AbaPix";
import AbaCartao from "../components/AbaCartao";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import axios from "axios";

export default function FinalizarCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = location.state || {};
  const { removeFromCart } = useContext(CartContext);

  const numeroRef = useRef(null); // 🔥 ref para foco automático

  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    cep: "",
    numero: "",
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

  // 🔥 FORMATA CEP
  const formatCep = (value) => {
    let v = String(value).replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
    return v;
  };

  // 🔥 CONSULTA CEP
  const consultarCep = async (valorCep) => {
    const cepLimpo = valorCep.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

        const data = response.data;

        if (!data.erro) {
          const enderecoCompleto = `${data.logradouro || ""} - ${
            data.bairro || ""
          } - ${data.localidade || ""} - ${data.uf || ""}`;

          setDados((prev) => ({
            ...prev,
            endereco: enderecoCompleto,
          }));
        } else {
          exibirMensagem("CEP não encontrado", "vermelho");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  // 🔥 HANDLE CEP COM AUTO-FOCUS
  const handleCepChange = (e) => {
    const valorFormatado = formatCep(e.target.value);

    setDados((prev) => ({
      ...prev,
      cep: valorFormatado,
    }));

    const cepLimpo = valorFormatado.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
      consultarCep(valorFormatado);

      // 🔥 foco automático no número
      setTimeout(() => {
        numeroRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/usuario/dados-usuario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;

        const enderecoCompleto = `${user.endereco?.rua || ""} - ${
          user.endereco?.bairro || ""
        } - ${user.endereco?.cidade || ""} - ${
          user.endereco?.estado || ""
        }`;

        setDados({
          nome: user.nome || "",
          cpf: user.cpf || "",
          endereco: enderecoCompleto,
          cep: formatCep(user.endereco?.cep || ""),
          numero: user.endereco?.numero || "",
        });
      } catch (err) {
        console.error("Erro ao carregar dados do usuário", err);
      }
    };

    carregarDadosUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero") {
      const onlyNumbers = value.replace(/\D/g, "");
      setDados((prev) => ({ ...prev, numero: onlyNumbers }));
      return;
    }

    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const finalizarPagamento = async () => {
    if (!abaAtiva) {
      exibirMensagem("Escolher forma de pagamento", "vermelho");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      let payload = {
        produtos: products,
        total: totalGeral,
        formaPagamento: abaAtiva,
        endereco: {
          descricao: `${dados.endereco}, ${dados.numero}`,
          cep: dados.cep.replace(/\D/g, ""),
        },
      };

      if (abaAtiva === "cartao") {
        const valido = window.validarCartao?.();
        if (!valido) return;

        payload.cartao = window.dadosAtuaisDoCartao;
        payload.salvarCartaoNoBanco = window.deveSalvarCartaoNoBanco;
      }

      const response = await api.post("/usuario/finalizar-compra", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.sucesso) {
        exibirMensagem("Compra finalizada com sucesso!", "verde");

        products.forEach((product) => {
          removeFromCart(product.id, product.size, product.name);
        });

        setTimeout(() => {
          navigate("/status-pedido", {
            state: {
              produtos: products,
              total: totalGeral,
              etapa: 0,
            },
          });
        }, 1000);
      }
    } catch (err) {
      console.error("Erro ao processar compra:", err);
      exibirMensagem(
        "Erro ao processar pagamento. Tente novamente.",
        "vermelho"
      );
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
              {product.size && (
                <p>
                  <strong>Tamanho:</strong> {product.size}
                </p>
              )}
              <p>
                <strong>Quantidade:</strong> {product.quantity}
              </p>
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
        <div className="endereco-grid">
          <input
            name="cep"
            placeholder="CEP"
            value={dados.cep}
            onChange={handleCepChange}
          />

          <input
            ref={numeroRef}
            name="numero"
            placeholder="Nº"
            value={dados.numero}
            onChange={handleChange}
          />

          <input
            name="endereco"
            placeholder="Rua, bairro, cidade..."
            value={dados.endereco}
            onChange={handleChange}
          />
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

      {(abaAtiva === "pix" || abaAtiva === "boleto") && (
        <AbaPix tipo={abaAtiva} />
      )}

      {abaAtiva === "cartao" && (
        <AbaCartao exibirMensagem={exibirMensagem} />
      )}

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