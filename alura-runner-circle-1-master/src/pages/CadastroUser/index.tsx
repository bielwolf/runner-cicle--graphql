import { useState } from 'react';
import {
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { ButtonLogin, LoginCard, LoginContainer, LoginContainerImage } from './styles';
import Logo from '../../assets/loginForm/Logo.svg';
import Runnner from '../../assets/loginForm/RunnerCircle.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../apolloClient'; 

export function CadastroUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const [register, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      navigate('/');
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!acceptTerms) {
      alert('You must accept the terms and conditions!');
      return;
    }
    try {
      await register({ variables: { email, password } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginCard>
      <LoginContainer>
        <Typography
          variant="h5"
          style={{ fontWeight: 'bold', fontSize: '2rem' }}
          gutterBottom
        >
          Cadastro
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <FormLabel>Confirmar Senha</FormLabel>
          <TextField
            label="Confirmar Senha"
            color="secondary"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
            }
            label="Eu aceito os termos e condições"
          />
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
          <ButtonLogin type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </ButtonLogin>
        </form>
      </LoginContainer>
      <LoginContainerImage>
        <img
          src={Logo}
          alt="Logo"
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '180px',
          }}
        />
        <img
          src={Runnner}
          alt="Runnner"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '0%',
            transform: 'translateX(-50%)',
            width: '400px',
          }}
        />
      </LoginContainerImage>
    </LoginCard>
  );
}