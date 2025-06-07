import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../service/Login";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await loginUser({ email: userName, password });

      localStorage.setItem("authToken", response.token);
      navigate("/chat");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="top-bar">
          <img src="AutBot_Logo.png" alt="Logo" />
          <button className="botao-inicio">AutBot</button>
          <button
            className="botao-cadastre"
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Cadastre-se
          </button>
          <button className="botao-cadastre" onClick={() => navigate("/tutorial")}>Tutorial</button>
        </div>

        <div className="main-login">
          <div className="left-login">
            <h1>
              Bem-vindo ao AutBot!
              <br />
              Seu apoio acessível sobre TEA
            </h1>
            <img src="AutBot_Image.png" alt="AutBot" />
          </div>

          <div className="right-login">
            <div className="card-login">
              <h1>LOGIN</h1>

              {error && <p className="error-message">{error}</p>}

              <div className="textfield">
                <label htmlFor="usuario">E-mail</label>
                <input
                  type="text"
                  name="usuario"
                  placeholder="Digite seu e-mail"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="textfield">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="botao-login">Login</button>
              <button
                type="button"
                className="botao-esqueci-senha"
                onClick={() => navigate('/forgot-password')}
              >
                Esqueci minha senha
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
