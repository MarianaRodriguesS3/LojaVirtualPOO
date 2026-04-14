import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <section className="banner">
      <img 
        src={import.meta.env.BASE_URL + "logo.png"}
        alt="Logo Run Shoes" 
        className="banner-logo" 
      />
      
      {/* Div para agrupar os textos à direita */}
      <div className="banner-content">
        <h1 className="banner-title">Run Shoes!</h1>
        <p className="banner-subtitle">Explore nossos produtos incríveis.</p>
      </div>
    </section>
  );
}
export default Banner;