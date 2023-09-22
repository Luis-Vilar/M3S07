import { useState, useEffect } from "react";
import { useNavigate , Link} from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { PiEnvelopeLight, PiArrowFatRightBold } from "react-icons/pi";
import Api from "../../api/Api.jsx";
import imagemEolicaSolar from "../../assets/LoginImagem/imagemeolicasolar.png";
import imagemLogo from "../../assets/LoginImagem/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cadastro.css";

const CadastroUsuario = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const response = Api.get("api/v1/usuario");
    setData(response.data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = Api.post("api/v1/usuario", {
      name,
      email,
      password,
    })
      .then((response) => {
        alert(`Usuário cadastrado com sucesso! ${response.data.message}`);
        // Redirecione para a página de login após um breve atraso
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })

      .catch((error) => {
        // Se houver algum erro com a solicitação, exiba o erro
        alert(`Erro ao cadastrar o usuário! ${error.response.data.message}`);
      });
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
              <img src={imagemLogo} alt="logo solar energy" />
            </div>
            <div className="header-text mb-4 text-center">
              <p className="saudacao">Faça seu cadastro</p>
            </div>
            <div className="col-md-12">
              <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <PiArrowFatRightBold />
                    </span>
                    <input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome"
                      className="form-control"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
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
                      placeholder="Crie sua senha"
                      className="form-control"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="actions">
                    <button type="submit" className="login-btn">
                      Cadastrar
                    </button>
                  </div>
                  <div className="message">{message}</div>
                  <div className="return">
                    <p>
                      Voltar para <Link to="/">Login</Link>
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

export default CadastroUsuario;
