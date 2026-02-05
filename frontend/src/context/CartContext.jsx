import React, { createContext, useEffect, useState } from "react";

// Cria o contexto do carrinho
export const CartContext = createContext();

// Provider que vai envolver a aplicação
export function CartProvider({ children }) {
  // Estado do carrinho
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Estado para mensagens globais (ex: "Produto adicionado")
  const [message, setMessage] = useState("");

  // Salva o carrinho no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona produto ao carrinho
  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Se o produto já existe, aumenta a quantidade
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Se não existe, adiciona novo produto com quantidade 1
      return [...prev, { ...product, quantity: 1 }];
    });

    // Dispara mensagem de sucesso
    setMessage(`Produto "${product.name}" adicionado ao carrinho ✅`);
    setTimeout(() => setMessage(""), 2000); // some depois de 2s
  }

  // Remove um produto do carrinho
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Limpa todo o carrinho
  function clearCart() {
    setCartItems([]);
  }

  // Atualiza a quantidade de um produto
  function updateQuantity(id, quantity) {
    if (quantity <= 0) return; // evita quantidade negativa
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  // Valor fornecido pelo contexto
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        message,
        setMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
