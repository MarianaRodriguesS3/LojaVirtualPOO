import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section footer-logo-name" onClick={() => navigate("/")}>
                    <img src="/logo.png" alt="Logo Run Shoes" className="footer-logo"/>
                    <span className="footer-store-name">Run Shoes</span>
                    <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
                </div>

                <div className="footer-section">
                    <h4>Links</h4>
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/carrinho")}>Carrinho</button>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>

                <div className="footer-section">
                    <h4>Contato</h4>
                    <a href="https://github.com/MarianaRodriguesS3" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13 -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52 .28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36 -1.01.08-2.1 0 0 .67-.21 2.2.82a7.54 7.54 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07 -1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        Github
                    </a>
                    <a href="https://www.linkedin.com/in/mariana-rodrigu3s/" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2 -8.212c.837 0 1.358-.554 1.358-1.248-.015-.708-.521-1.248-1.342 -1.248-.821 0-1.358.54-1.358 1.248 0 .694.521 1.248 1.327 1.248h.015zm4.908 8.212V9.359c0-.216.016-.432.08-.586.176-.432.576-.879 1.247-.879.88 0 1.232.664 1.232 1.637v3.013h2.4V9.25c0-2.22-1.183-3.25-2.764-3.25 -1.274 0-1.845.7-2.165 1.188h.016v-1.023H6.651c.03.664 0 7.225 0 7.225h2.4z"/>
                        </svg>
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;