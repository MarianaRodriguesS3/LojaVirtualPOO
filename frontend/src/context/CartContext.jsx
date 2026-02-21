import React, { createContext, useState, useEffect } from "react";

// Cria o contexto
export const CartContext = createContext();

// Provider que vai envolver a aplicação
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  // Função para pegar o usuário logado
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    return user?.id || null;
  };

  // Carrega carrinho do localStorage por usuário
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      const stored = localStorage.getItem(`cart_${userId}`);
      setCartItems(stored ? JSON.parse(stored) : []);
    }
  }, []);

  // Salva carrinho sempre que mudar
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Atualiza carrinho quando usuário loga
  useEffect(() => {
    const handleLogin = () => {
      const userId = getUserId();
      const stored = localStorage.getItem(`cart_${userId}`);
      setCartItems(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("userLoggedIn", handleLogin);
    return () => window.removeEventListener("userLoggedIn", handleLogin);
  }, []);

  // Funções do carrinho
  const addToCart = (product) => {
    const existing = cartItems.find(
      (item) => item.id === product.id && item.size === product.size
    );
    let updatedCart;

    if (existing) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    setNotification({ product });
  };

  const removeFromCart = (id, size) =>
    setCartItems(cartItems.filter((item) => !(item.id === id && item.size === size)));

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        notification,
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};