import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { PiEnvelopeLight } from "react-icons/pi";
import Api from "../../api/Api.jsx";
import imagemEolicaSolar from "../../assets/LoginImagem/imagemeolicasolar.png";
import imagemLogo from "../../assets/LoginImagem/logo.png";
import "./LoginPage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Mensagem de sucesso
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    // Usuário autenticado com sucesso
    localStorage.setItem("token", token);
    // Exiba a mensagem de sucesso
    setMessage("Usuário autenticado com sucesso.");
    // Redirecione para a página de dashboard após um breve atraso
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faça uma chamada para a API para autenticar o usuário usando Axios
      const response = await Api.post("api/v1/login", {
        email,
        password,
      });

      if (response.status === 200) {
        handleLoginSuccess(response.data.token);
      } else {
        setMessage(
          "Acesso negado. Verifique dados de e-mail e senha e tente novamente."
        );

        setTimeout(() => {
          setMessage("");
        }, 2000); 
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro ao realizar o login.");
    }
  };

  return (
    <div className="box-container">
      <div className="row">
        <div className="col-md-6 left-box">
          <div className="featured-img">
            <img
              src={imagemEolicaSolar}
              alt="imagem de um sistema solar com um sistema eolico"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center right-box">
          <div className="row align-items-center">
            <div className="col-md-12 d-flex justify-content-center align-items-center logo">
              <img
                src={imagemLogo}
                alt="logo solar energy"
              />
            </div>
            <div className="header-text mb-4 text-center">
              <p className="saudacao">Seja bem vindo</p>
            </div>
            <div className="col-md-12">
              <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <PiEnvelopeLight />
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="E-mail"
                      className="form-control"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FiLock />
                    </span>
                    <input
                      id="password"
                      type="password"
                      placeholder="Senha"
                      className="form-control"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="actions">
                    <button type="submit" className="login-btn">
                      Entrar
                    </button>
                  </div>
                  <div className="message">{message}</div>
                  <div className="cadastre">
                    <p>
                      Não tem uma conta? <Link to="/cadastro-usuario">Cadastre-se</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
