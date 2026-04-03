import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import "./StatusPedido.css";

// Passos do pedido
const steps = [
  { label: "Pedido Realizado", icon: "🛒" },
  { label: "Pagamento Confirmado", icon: "💲" },
  { label: "Pedido Enviado", icon: "📦" },
  { label: "Pedido em Trânsito", icon: "🚚" },
  { label: "Pedido Entregue", icon: "📬" },
];

export default function StatusPedido() {
  const [currentStep, setCurrentStep] = useState(0);
  const [products, setProducts] = useState([]);

  // Avança a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Busca os produtos do pedido
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Aqui você pode alterar a rota para pegar apenas os produtos do pedido
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="status-pedido-container">
      <h2>Status do Pedido</h2>

      {/* Stepper */}
      <div className="stepper-container">
        <div className="stepper">
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            return (
              <div key={index} className="step">
                <div className={`circle ${isActive ? "active" : ""}`}>
                  {isActive && index < currentStep ? "✔" : step.icon}
                </div>
                <p className={`label ${isActive ? "active" : ""}`}>
                  {step.label}
                </p>
                {index < steps.length - 1 && (
                  <div
                    className={`line ${index < currentStep ? "active" : ""}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="products-status-container">
        <h3>Outros produtos que você pode gostar</h3>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}