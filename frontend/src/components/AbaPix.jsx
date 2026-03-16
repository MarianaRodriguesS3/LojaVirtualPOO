import React from "react";
import boletoImg from "../assets/boletobancario.jpg";
import qrcodeImg from "../assets/qrcode.jpg";
import "./AbaPix.css";

export default function AbaPix({ tipo }) {
  if (tipo === "pix") {
    return (
      <div className="painel">
        <h3>Pagamento via Pix</h3>

        <img
          src={qrcodeImg}
          alt="QR Code Pix"
          className="qr"
        />

        <div className="pix-chave">
          <input value="chavepix@exemplo.com" readOnly />

          <button
            onClick={() =>
              navigator.clipboard.writeText("chavepix@exemplo.com")
            }
          >
            Copiar chave
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="painel">
      <h3>Boleto Bancário</h3>
      <img src={boletoImg} alt="Boleto" className="boleto" />
    </div>
  );
}