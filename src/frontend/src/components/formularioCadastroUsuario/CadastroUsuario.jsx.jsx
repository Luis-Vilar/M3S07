import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { PiEnvelopeLight,PiArrowFatRightBold } from "react-icons/pi";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Cadastro.css";

const CadastroUsuario = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get("http://localhost:3000/api/v1/usuario")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
      
        axios
          .post("http://localhost:3000/api/v1/usuario", { name, email, password })
          .then((response) => {
            alert("Cadastro realizado com sucesso!");
            navigate("/");
          })
          .catch((error) => {
            if (error.response && error.response.status === 403) {
                // Se a resposta da API for um status 403 (Forbidden) com a mensagem de erro,
                // exiba a mensagem de erro retornada pela API
                alert(`Erro ao cadastrar usuário! ${error.response.data.message}`);
              } else {
                // Outros erros não relacionados à validação da senha
                alert("Erro ao cadastrar usuário! Por favor, tente novamente.");
              }
          });
      };
      

    return (
        <div className="box-container">
            <div className="row">
                <div className="col-md-6 left-box">
                    <div className="featured-img">
                        <img src="../src/assets/LoginImagem/imagemeolicasolar.png  " alt="imagem de um sistema solar com um sistema eolico" />
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center right-box">
                    <div className="row align-items-center">
                        <div className="col-md-12 d-flex justify-content-center align-items-center logo">
                            <img
                                src="../src/assets/LoginImagem/logo.png"
                                alt="logo solar energy"
                            />
                        </div>
                        <div className="header-text mb-4 text-center">
                            <p className="saudacao">Faça seu cadastro</p>
                        </div>
                        <div className="col-md-12">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <PiArrowFatRightBold  />
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
                                            <PiEnvelopeLight  />
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
                                    <div className="message">
                                        {message}
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroUsuario;
