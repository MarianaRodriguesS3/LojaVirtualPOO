import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Importamos a função que lida com a troca segura de carrinhos
  const { updateUserToken } = useContext(CartContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Chamada à API
      const res = await api.post("/usuario/login", { email, password });

      // 2. SEGURANÇA: Usamos o ID do usuário (ou email) para isolar o carrinho
      // Isso impede que o carrinho de um usuário vaze para outro.
      const userIdentifier = res.data.user.id || res.data.user.email;

      // 3. Atualiza o contexto (Limpa o estado anterior e carrega o do novo usuário)
      updateUserToken(userIdentifier.toString());

      // 4. Salva credenciais no localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.user));

      // 5. Marcação de login recente
      sessionStorage.setItem("loginRecente", "true");

      // 6. Evento para atualizar Header
      window.dispatchEvent(new Event("userLoggedIn"));

      // 7. Redireciona para home
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
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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