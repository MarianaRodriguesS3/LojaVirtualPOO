import React, { createContext, useEffect, useState } from "react";

// Cria o contexto do carrinho
export const CartContext = createContext();

// Provider que envolve a aplicação
export function CartProvider({ children }) {
  // Estado do carrinho (persistido)
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 🔥 Novo estado para o card de notificação
  const [notification, setNotification] = useState(null);

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona produto ao carrinho
  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    // 🔥 Dispara o card lateral
    setNotification({
      product: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: product.size || "Único",
      },
    });

    // Fecha automaticamente após 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  // Remove produto
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Limpa carrinho
  function clearCart() {
    setCartItems([]);
  }

  // Atualiza quantidade
  function updateQuantity(id, quantity) {
    if (quantity <= 0) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        notification,   // 🔥 agora usamos notification
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
