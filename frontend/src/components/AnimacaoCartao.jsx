import React from "react";
import "./AnimacaoCartao.css";

export default function AnimacaoCartao({ cvv }) {
  return (
    <div className="cartao-mini-anim">

      <div className="cartao-flip">

        <div className="cartao-frente">
          <div className="chip"></div>
        </div>

        <div className="cartao-verso">

          <div className="tarja-preta"></div>

          <div className="area-cvv">

            <span className="cvv-numeros">{cvv}</span>

            <svg className="cvv-ellipse-svg" viewBox="0 0 70 30">

              <ellipse
                cx="35"
                cy="15"
                rx="32"
                ry="12"
                className="ellipse-anim"
              />

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}