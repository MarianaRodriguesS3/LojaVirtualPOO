import axios from "axios";

// Cria instância do axios apontando para o backend
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Adiciona automaticamente o token JWT nos headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respostas com erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o token expirou ou não autorizado, desloga
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Função helper para obter os dados do usuário logado
export const getUsuarioLogado = async () => {
  try {
    const res = await api.get("/usuario/dados-usuario");
    return res.data.user; // retorna o objeto user do backend
  } catch (err) {
    console.error("Erro ao buscar dados do usuário logado:", err);
    return null;
  }
};

export default api;