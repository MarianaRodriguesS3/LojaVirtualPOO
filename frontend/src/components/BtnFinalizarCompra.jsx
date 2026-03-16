import React from "react";
import "./BtnFinalizarCompra.css";

export default function BtnFinalizarCompra({
  onClick,
  disabled = false,
  texto = "Finalizar Compra",
}) {
  return (
    <button
      className="btn-finalize"
      onClick={onClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}