import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializa o carrinho a partir do localStorage
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  const [notification, setNotification] = useState(null);

  // Salva carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona produto ao carrinho (tratando id + size)
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === product.size
    );

    let updatedCart;

    if (existingItem) {
      // Atualiza a quantidade e move para o início
      updatedCart = [
        { ...existingItem, quantity: existingItem.quantity + 1 },
        ...cartItems.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        ),
      ];
    } else {
      // Novo produto: adiciona no início
      updatedCart = [{ ...product, quantity: 1 }, ...cartItems];
    }

    setCartItems(updatedCart);

    // Notificação
    setNotification({ product });
  };

  // Remove produto específico (id + size)
  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter((item) => !(item.id === id && item.size === size)));
  };

  // Limpar carrinho
  const clearCart = () => setCartItems([]);

  // Atualizar quantidade específica
  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
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
