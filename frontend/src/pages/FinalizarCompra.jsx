import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./FinalizarCompra.css";

// Importando boleto
import boletoImg from "../assets/boletobancario.jpg";

export default function FinalizarCompra() {
    const location = useLocation();
    const { product } = location.state || {};

    const [dados, setDados] = useState({
        nome: "João da Silva",
        cpf: "123.456.789-00",
        endereco: "Rua Exemplo, 123 - Centro - São Paulo",
    });

    const [cartao, setCartao] = useState({
        numero: "4111111111111111",
        validade: "12/30",
        cvv: "123",
    });

    const [abaAtiva, setAbaAtiva] = useState(null);
    const [mensagem, setMensagem] = useState({ texto: "", cor: "" });

    const handleChange = (e) => setDados({ ...dados, [e.target.name]: e.target.value });
    const handleCartaoChange = (e) => setCartao({ ...cartao, [e.target.name]: e.target.value });

    const toggleAba = (tipo) => setAbaAtiva((prev) => (prev === tipo ? null : tipo));

    const total = product ? (product.price * product.quantity).toFixed(2) : "0.00";

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

    if (!product)
        return (
            <div className="container">
                <h2>Nenhum produto selecionado.</h2>
            </div>
        );

    // Renderiza os quadradinhos do cartão agrupados de 4
    const renderCartao = () => {
        const grupos = [];
        const numeros = cartao.numero.split("");

        for (let i = 0; i < numeros.length; i += 4) {
            const grupo = numeros.slice(i, i + 4);
            grupos.push(
                <div key={i} className="grupo-quadradinhos">
                    {grupo.map((n, idx) => (
                        <div key={idx} className="num-quadradinho">{n}</div>
                    ))}
                </div>
            );
        }

        return grupos;
    };

    return (
        <div className="container">
            <h2>Finalizar Compra</h2>

            {/* Resumo do pedido */}
            <div className="cart-item checkout-layout-grid">
                <div className="checkout-col-image">
                    <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
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
                <label>Nome</label>
                <input name="nome" value={dados.nome} onChange={handleChange} />

                <label>CPF</label>
                <input name="cpf" value={dados.cpf} disabled />

                <label>Endereço</label>
                <input name="endereco" value={dados.endereco} onChange={handleChange} />
            </div>

            {/* Seleção de pagamento */}
            <div className="tabs">
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
                                <label>Validade</label>
                                <input name="validade" value={cartao.validade} onChange={handleCartaoChange} />
                            </div>
                            <div className="campo-cvv">
                                <label>CVV <span className="info">?</span></label>
                                <input name="cvv" value={cartao.cvv} onChange={handleCartaoChange} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="finalizar" onClick={handleFinalizar}>Finalizar Compra</button>

            {mensagem.texto && (
                <p className={`mensagem ${mensagem.cor}`}>{mensagem.texto}</p>
            )}
        </div>
    );
}