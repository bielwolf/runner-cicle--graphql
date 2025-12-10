import { useState } from "react";
import {
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import {
  ButtonLogin,
  LoginCard,
  LoginContainer,
  LoginContainerImage,
} from "./styles";
import Logo from "../../assets/loginForm/Logo.svg";
import Runnner from "../../assets/loginForm/RunnerCircle.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../apolloClient";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const { data } = await login({ variables: { email, password } });
      localStorage.setItem('token', data.login);
      navigate("/feed");
    } catch (err) {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <LoginCard>
      <LoginContainer>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", fontSize: "2rem" }}
          gutterBottom
        >
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <FormLabel>E-mail</FormLabel>
        <TextField
          color="secondary"
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Senha</FormLabel>
        <TextField
          label="Senha"
          color="secondary"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Lembrar-me"
        />
        <ButtonLogin onClick={handleLogin} disabled={loading}>Login</ButtonLogin>
        <NavLink to="/userRegister">
          <span>Cadastre-se</span>
        </NavLink>
      </LoginContainer>
      <LoginContainerImage>
        <img
          src={Logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "180px",
          }}
        />
        <img
          src={Runnner}
          alt="Runnner"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "0%",
            transform: "translateX(-50%)",
            width: "400px",
          }}
        />
      </LoginContainerImage>
    </LoginCard>
  );
}