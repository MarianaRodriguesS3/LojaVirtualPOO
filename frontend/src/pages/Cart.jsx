import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity, userToken } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({}); // controle das checkboxes

  // Redireciona guest para a Home
  useEffect(() => {
    if (userToken === "guest") navigate("/", { replace: true });
  }, [userToken, navigate]);

  // Inicializa selectedItems quando cartItems mudarem
  useEffect(() => {
    const initialSelection = {};
    cartItems.forEach((item) => {
      // padrão: todos marcados
      initialSelection[`${item.id}-${item.size}-${item.name}`] = true;
    });
    setSelectedItems(initialSelection);
  }, [cartItems]);

  // Atualiza seleção de um produto
  const handleCheckboxChange = (key) => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Total considerando apenas produtos marcados
  const total = cartItems.reduce((acc, item) => {
    const key = `${item.id}-${item.size}-${item.name}`;
    return acc + (selectedItems[key] ? item.price * item.quantity : 0);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Seu carrinho está vazio 🛒</h2>
      </div>
    );
  }

  // Compra unitária de um item → redireciona para Checkout
  const handleBuySingle = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  // Finalizar compra → exibe alert, remove produtos marcados após confirmar
  const handleFinalizeCart = () => {
    const itemsToRemove = cartItems.filter((item) => {
      const key = `${item.id}-${item.size}-${item.name}`;
      return selectedItems[key];
    });

    if (itemsToRemove.length === 0) {
      alert("Nenhum produto selecionado para compra.");
      return;
    }

    // Mostra alert de sucesso
    alert("Compra finalizada com sucesso!");

    // Remove produtos marcados do carrinho APÓS clicar em OK
    itemsToRemove.forEach((item) => {
      removeFromCart(item.id, item.size || null, item.name);
    });
  };

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      {cartItems.map((item) => {
        const key = `${item.id}-${item.size}-${item.name}`;
        return (
          <div className="cart-item" key={key}>
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selectedItems[key] || false}
              onChange={() => handleCheckboxChange(key)}
              className="cart-checkbox"
            />

            <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} />

            <div className="cart-info">
              <h3>{item.name}</h3>
              {item.size && <p className="cart-size">Tamanho: {item.size}</p>}
              <p className="price">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="quantity-control">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.name, item.quantity - 1)
                }
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.name, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            <div className="cart-actions">
              <button className="btn-buy-single" onClick={() => handleBuySingle(item)}>
                Comprar
              </button>
              <button
                className="btn-remove"
                onClick={() => removeFromCart(item.id, item.size, item.name)}
              >
                Remover
              </button>
            </div>
          </div>
        );
      })}

      <div className="cart-total-section">
        <div className="total-content">
          <h2>Total: R$ {total.toFixed(2)}</h2>
          <div className="total-actions">
            {/* Finaliza apenas os itens selecionados */}
            <button className="btn-finalize" onClick={handleFinalizeCart}>
              Finalizar Compra
            </button>

            {/* Limpa todo o carrinho */}
            <button className="btn-clear" onClick={clearCart}>
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;