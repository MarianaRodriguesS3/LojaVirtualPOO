import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Alterado de "/auth/login" para "/usuario/login"
      const res = await api.post("/usuario/login", { email, password });

      // Salva token e usuário no localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.user));

      // Marca login recente para mostrar boas-vindas
      sessionStorage.setItem("loginRecente", "true");

      // Dispara evento para Header atualizar imediatamente
      window.dispatchEvent(new Event("userLoggedIn"));

      // Redireciona para home
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Erro no login");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      {error && <p className="login-error">{error}</p>}

      <div className="login-links">
        <Link to="/register">Não possuo cadastro</Link>
        <Link to="/forgot-password">Esqueci minha senha</Link>
      </div>

      <Link className="back-button" to="/">
        Voltar
      </Link>
    </div>
  );
}

export default Login;