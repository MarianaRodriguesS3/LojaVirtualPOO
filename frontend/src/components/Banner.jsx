import React from "react";
import "../App.css";
import "./Banner.css";

function Banner({ products }) {
 
  return (
    <section className="banner">
      <h1 className="banner-title">Bem-vindo à nossa loja virtual!</h1>
      <p className="banner-subtitle">Explore nossos produtos incríveis.</p>
    </section>
  );
}

export default Banner;
