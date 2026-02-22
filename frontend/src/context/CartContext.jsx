import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem("cart_user_id") || "guest";
  });

  const [cartItems, setCartItems] = useState(() => {
    const activeId = localStorage.getItem("cart_user_id") || "guest";
    const stored = localStorage.getItem(`cartItems_${activeId}`);
    return stored ? JSON.parse(stored) : [];
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem(`cartItems_${userToken}`, JSON.stringify(cartItems));
  }, [cartItems, userToken]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.name === product.name
      );

      if (existingItem) {
        const filteredCart = prev.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.size === product.size &&
              item.name === product.name
            )
        );

        return [
          { ...existingItem, quantity: existingItem.quantity + 1 },
          ...filteredCart,
        ];
      }

      return [{ ...product, quantity: 1 }, ...prev];
    });

    setNotification({ product });
  };

  const updateUserToken = (newUserId) => {
    const nextId = newUserId || "guest";
    const currentId = userToken;

    localStorage.setItem(`cartItems_${currentId}`, JSON.stringify(cartItems));

    setCartItems([]);

    const storedTargetItems = JSON.parse(
      localStorage.getItem(`cartItems_${nextId}`) || "[]"
    );

    let finalCart;
    if (nextId !== "guest" && currentId === "guest") {
      const guestItems = [...cartItems];
      const userItems = [...storedTargetItems];

      guestItems.forEach((gItem) => {
        const existsIndex = userItems.findIndex(
          (uItem) =>
            uItem.id === gItem.id &&
            uItem.size === gItem.size &&
            uItem.name === gItem.name
        );

        if (existsIndex > -1) {
          const existingInUser = userItems.splice(existsIndex, 1)[0];
          userItems.unshift({
            ...existingInUser,
            quantity: existingInUser.quantity + gItem.quantity,
          });
        } else {
          userItems.unshift(gItem);
        }
      });
      finalCart = userItems;
    } else {
      finalCart = storedTargetItems;
    }

    localStorage.setItem("cart_user_id", nextId);
    setUserToken(nextId);
    setCartItems(finalCart);
  };

  const removeFromCart = (id, size, name) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.id === id && i.size === size && i.name === name))
    );
  };

  const updateQuantity = (id, size, name, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.name === name
          ? { ...i, quantity: newQty }
          : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const logout = () => updateUserToken("guest");

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        notification,
        setNotification,
        userToken,
        updateUserToken,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};