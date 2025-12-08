import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CssBaseline, TextField, Box } from '@mui/material';
import { Layout, StyledButton } from './styles';
import { GET_ACTIVITIES } from '../FeedGeral';

const ADD_ACTIVITY = gql`
  mutation AddActivity(
    $time: String!,
    $type: String!,
    $distance: String!,
    $calories: String!,
    $bpm: String!,
    $user: String!,
    $userImage: String!,
    $imageUrl: String!
  ) {
    addActivity(
      time: $time,
      type: $type,
      distance: $distance,
      calories: $calories,
      bpm: $bpm,
      user: $user,
      userImage: $userImage,
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;

export function Publicar() {

  const [formState, setFormState] = useState({
    time: '',
    type: '',
    distance: '',
    calories: '',
    bpm: '',
    user: '',
    userImage: '',
    imageUrl: ''
  });

  const [addActivity] = useMutation(ADD_ACTIVITY, {
    variables: formState,
    refetchQueries: [{ query: GET_ACTIVITIES }]
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addActivity();
    setFormState({
      time: '',
      type: '',
      distance: '',
      calories: '',
      bpm: '',
      user: '',
      userImage: '',
      imageUrl: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  return (
    <Layout>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <h2>Publicar treino</h2>
        <TextField
          fullWidth
          label="URL da Imagem da Atividade"
          variant="outlined"
          margin="normal"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="URL da Imagem do Usuário"
          variant="outlined"
          margin="normal"
          name="userImage"
          value={formState.userImage}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Distância (km)"
          variant="outlined"
          margin="normal"
          name="distance"
          value={formState.distance}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Calorias (kcal)"
          variant="outlined"
          margin="normal"
          name="calories"
          value={formState.calories}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Batimentos (BPM)"
          variant="outlined"
          margin="normal"
          name="bpm"
          value={formState.bpm}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledButton type="submit" variant="contained" color="primary">
            Enviar
          </StyledButton>
          <StyledButton type="reset" variant="outlined" color="secondary" onClick={() => setFormState({
            time: '',
            type: '',
            distance: '',
            calories: '',
            bpm: '',
            user: '',
            userImage: '',
            imageUrl: ''
          })
          }
          >
            Limpar
          </StyledButton>
        </Box>
      </form>
    </Layout>
  );
}
